const { readdirSync } = require("fs")
console.log("[Events]: Started loading!")
const EventDirs = readdirSync("./src/events")
for(dirs of EventDirs) {
	const perEventFile = readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"))
	for(file of perEventFile) {
		const event = require(`../events/${dirs}/${file}`)
		console.log(`Loading events: ${file} from ${dirs}!`)
		bot.on(file.replace(".js", ""), event.bind(null, bot))
		delete require.cache[require.resolve(`../events/${dirs}/${file}`)]
	}
}
console.log("[Events]: Done loading!")
