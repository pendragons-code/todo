const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log("[messageCommands]: Starting loading!")
bot.messageCommands = new Collection()
let messageCommandDirs = readdirSync("./src/commands/messageCommands")
for(dirs of messageCommandDirs) {
	const perMessageCommandFile = readdirSync(`./src/commands/messageCommands/${dirs}`).filter(file => file.endsWith(".js"))
	for(file of perMessageCommandFile) {
		const command = require(`../commands/messageCommands/${dirs}/${file}`)
		console.log(`Loading messageCommands: ${file} from ${dirs}!`)
		bot.messageCommands.set(command.name.toLowerCase(), command)
		delete require.cache[require.resolve(`../commands/messageCommands/${dirs}/${file}`)]
	}
}
console.log("[messageCommands]: Done loading!")
