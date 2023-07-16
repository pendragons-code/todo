const { EmbedBuilder } = require("discord.js")
const { Default, Decoration, BotConfig } = require("../../../../config.json")
module.exports = {
	name: "help",
	aliases: ["commands"],
	category: "core",
	desc: "Sends list of commands on this bot!",
	utilisation: "help <category/command name>",
	async execute(messageCreate, args, prefix) {
		const individialCommand = bot.messageCommands.filter(x => x)
		const individialCommandByCategory = bot.messageCommands.map(u => u.category)
		let commandCategoryArray = []
		for(categoryName of individialCommandByCategory) {
			if(!commandCategoryArray.includes(categoryName)) commandCategoryArray.push(categoryName)
		}
		const helpEmbed = new EmbedBuilder()
		helpEmbed.setTitle(`${Decoration.Title.first} Commands help center! ${Decoration.Title.second}`)
		helpEmbed.setColor(Default.DefaultEmbedColor)
		helpEmbed.setDescription(`Prefix is ${prefix}! This bot has ${individialCommand.size} commands!`)
		helpEmbed.setFooter({ text: Default.DefaultFooterText })
		helpEmbed.setURL(BotConfig.BotSite)
		helpEmbed.setTimestamp()
		if(!args[0]) {
			helpEmbed.addFields(
				{ name: "Available categories!", value: "`" + prefix + "help <category>`\n\n`" + commandCategoryArray.join("`, `") + "`", inline: true }
			)
			return messageCreate.channel.send({ embeds: [helpEmbed] })
		}
		if(commandCategoryArray.includes(args[0])) {
			let categorySpecificCommands = bot.messageCommands.filter(commands => commands.category === args[0])
			helpEmbed.addFields(
				{ name: "Available commands!", value: "`" + categorySpecificCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true }
			)
			return messageCreate.channel.send({ embeds: [helpEmbed] })
			// I'm too tired and stupid to figure out a way to reduce the pop up of return messageCreate.channel.send({ embeds: [embed] })
		}
		const searchCommand = bot.messageCommands.get(args.join(" ").toLowerCase()) || bot.messageCommands.find(x => x.aliases && x.aliases.includes(args.join().toLowerCase()))
		if(!searchCommand) return messageCreate.channel.send("I did not find this command!")
		helpEmbed.addFields(
			{ name: "Name", value: searchCommand.name, inline: true },
			{ name: "Category", value: searchCommand.category, inline: true },
			{ name: "Alias(es)", value: searchCommand.aliases.length < 1 ? "None" : searchCommand.aliases.join(", "), inline: true },
			{ name: "Utilisation", value: searchCommand.utilisation, inline: true },
			{ name: "Description", value: searchCommand.desc }
		)
		return messageCreate.channel.send({ embeds: [helpEmbed] })
	}
}
