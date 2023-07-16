const { PermissionBitField, PermissionsBitField } = require("discord.js")
const { Default } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "prefix",
	aliases: [],
	category: "core",
	desc: "Changes the bot prefix!",
	utilisation: "prefix <new prefix>",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(Default.DefaultBannedWords.includes(args[0])) return messageCreate.channel.send("We do not allow you to associate this word with the bot!")
		// It should not run, but it might, the logic here is that the message with vulgar should already be deleted should such a thing happens. But you never know.
		await db.set(`prefix_${messageCreate.guild.id}`, args[0])
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
		return messageCreate.channel.send(`Prefix has been changed to ${args[0]}!`)
	}
}
