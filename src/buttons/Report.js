const { EmbedBuilder } = require("discord.js")
const { BotConfig, Default } = require("../../config.json")
module.exports = async ({ bot, interactionCreate }) => {
	const embed = new EmbedBuilder()
	embed.setURL(BotConfig.BotSite)
	embed.setTitle("Report errors here!")
	embed.setDescription("Contact the creator directly: \nPENDRAGON#8785\n@pendragonscode")
	embed.setColor(Default.DefaultEmbedColor)
	embed.setFooter({ text: Default.DefaultFooterText })
	return interactionCreate.reply({ embeds: [embed], ephemeral: true })
}
