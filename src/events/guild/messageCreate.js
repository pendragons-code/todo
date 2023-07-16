const { Default, BotConfig } = require("../../../config.json")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const reject = require("../../../assets/responseComponents/rejection.json")
const PermissionList = require("../../../assets/responseComponents/permission.json")

module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokensecurity").execute(messageCreate)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	let editMode = await db.get("editMode")
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let BlackListedUser = await db.get(`blacklisted_${messageCreate.author.id}`)
	// call antiswear here
	// made it separate so it is easier to mod and can be called by other events!
	if(dbPrefix === null) dbPrefix = Default.DefaultPrefix
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${BotConfig.BotID}>`	
	if(messageCreate.content.indexOf(prefix) !== 0) return
	if(BlackListedUser === "yes") return messageCreate.channel.send(reject.UserFault.privilege.BlackListedUser)
	if(editMode == "on" && messageCreate.author.id !== BotConfig.BotOwnerID) return messageCreate.channel.send(reject.BotDownTime.editMode)
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(!cmd) return
	const commandDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
	const categoryDisable = await db.get(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`)
	try {
		if(cmd.category === "over18" && messageCreate.channel.nsfw) return messageCreate.channel.send("This command can only work in an nsfw channel!")
		if(commandDisable === "disabled" || categoryDisable === "disabled") return messageCreate.channel.send(reject.UserFault.privilege.DisabledCommand)
		if(cmd.maxArgs && args[cmd.maxArgs + 1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(cmd.minPerms) for(let i = 0; i < cmd.minPerms.length; ++i) if(!messageCreate.member.permissions.has(cmd.minPerms[i])) {
			let MissingPermissionName = PermissionList[cmd.minPerms[i]]
			if(Array.isArray(cmd.minPerms[i])) {
				let MissingPermissionName = ""
				for(let perArray = 0; perArray < cmd.minPerms[i].length; ++perArray) {
					let MissingPermissionNameFromAndLogic = PermissionList[cmd.minPerms[i][perArray]]
					MissingPermissionName + `\`${MissingPermissionNameFromAndLogic}\``
					if(cmd.minPerms[i][perArray + 1]) MissingPermissionName + ", "
				}
			}
			return messageCreate.channel.send(`${reject.UserFault.privilege.MissingPermissions} ${MissingPermissionName}`)
		}
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		if(cmd.category === "creator" && messageCreate.author.id !== BotConfig.BotOwnerID) return messageCreate.channel.send(reject.UserFault.privilege.CreatorOnly)
		cmd.execute(messageCreate, args, prefix)
		await db.add(`cmdsRan_${messageCreate.author.id}`, 1)
	} catch(errorInMessageCreate) {
		console.error(errorInMessageCreate)
		console.error(`+++\n${messageCreate.content}\n+++`)
		return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
	}
}
