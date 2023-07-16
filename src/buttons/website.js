const { BotConfig, Default } = require("../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = async ({bot, interactionCreate}) => {
	const embed = new EmbedBuilder()
	embed.setTitle("List of useful sites!")
	embed.setURL(BotConfig.BotSite)
	embed.addFields(
		{ name: "Portfolio", value: "[Click Me!](https://pendragonscode.xyz)" }
	)
	embed.setColor(Default.DefaultEmbedColor)
	embed.setTimestamp()
	embed.setFooter({ text: Default.DefaultFooterText })
	return interactionCreate.reply({ embeds: [embed], ephemeral: true })
}
