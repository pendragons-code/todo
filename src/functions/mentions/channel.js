function getChannelFromMention(mentionedChannel) {
	if(!mentionedChannel) return
	if(mentionedChannel.startsWith("#")) {
		mention = mention.slice(1, 0)
		return bot.channels.cache.get(mention)
	}
}

module.exports = { getChannelFromMention }
