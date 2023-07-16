function getUserFromMention(mentionedUser) {
	if(!mentionedUser) return "Error: No specified user!"
	if(mentionedUser.startsWith('<@') && mentionedUser.endsWith('>')) {
		mention = mentionedUser.slice(2, -1)
		if(mention.startsWith("!")) mention.slice(1)
	}
}

module.exports = { getUserFromMention }
