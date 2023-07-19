const {PermissionsBitField} = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "clear",
	aliases: [],
	category: "utility",
	desc: "A command that clears messages",
	utilisation: "clear <amt>\n note that amt does not include the message you are sending, it will +1. Also if the number provided is not an interger, it will parse it out!",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.numbers.missing)
		if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		let amtOfMessagesToDelete = parseInt(args[1])
		if(args[1] > 100 || amtOfMessagesToDelete < 1) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		messageCreate.delete()
		messageCreate.channel.bulkDelete()
		.catch((error) => {
			console.log(error)
			console.error(error)
			console.error(messageCreate.content)
			return messageCreate.channel.send("Some messages older than 2 weeks may not be deleted!").then(errorAlert => errorAlert.delete(3000))
		})
	}
}
