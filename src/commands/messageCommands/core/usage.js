const { EmbedBuilder } = require("discord.js")
const { cpuUsage } = require("os-utils")
const { Default, BotConfig } = require("../../../../config.json")
module.exports = {
	name: "usage",
	aliases: ["-u"],
	category: "core",
	utilisation: "usage",
	desc: "Sends you system and project usage within the docker container the bot is running in!", //In my case I am running this in a docker instance
	async execute(messageCreate, args, prefix) {
		cpuUsage(async function(toEmbedCpuUsage) {
			const usageEmbed = new EmbedBuilder()
			usageEmbed.setColor(Default.DefaultEmbedColor)
			usageEmbed.setDescription(projectUsage(toEmbedCpuUsage))
			usageEmbed.setTitle("Jasbot's Usage!")
			usageEmbed.setURL(BotConfig.BotSite)
			usageEmbed.setTimestamp()
			usageEmbed.setFooter({ text: Default.DefaultFooterText })
			return messageCreate.channel.send({ embeds: [usageEmbed] })
		})
	}
}
