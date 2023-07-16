const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log("[utils]: Starting loading!")
bot.utils = new Collection()
let utilDirs = readdirSync("./src/utils")
// I for some reason thought that this was a promise, i forgot that I'm not using promise fs like an older project. bad habits die hard
for(dirs of utilDirs) {
	const perUtilFile = readdirSync(`./src/utils/${dirs}`).filter(file => file.endsWith(".js"))
	for(file of perUtilFile) {
		const util = require(`../utils/${dirs}/${file}`)
		bot.utils.set(util.name.toLowerCase(), util)
		console.log(`Loading util: ${file} from ${dirs}!`)
		delete require.cache[require.resolve(`../utils/${dirs}/${file}`)]
	}
}
