const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todo",
	aliases: [],
	category: "utility",
	desc: "A command that helps you manage you ToDo list.",
	utilisation: "todo add <task>\ntodo remove <task number>\ntodo set <task number>\ntodo reset all\ntodo show <all/task number>",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let toDoEmbed = new EmbedBuilder()
		const currentSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos = 0
		if(currentSetOfTODOs !== null) numberOfTodos = currentSetOfTODOs.length
		toDoEmbed.setFooter({ text: Default.DefaultFooterText })
		toDoEmbed.setColor(Default.DefaultEmbedColor)
		toDoEmbed.setURL(BotConfig.BotSite)
		toDoEmbed.setTimestamp()
		let firstArgumentAsInt
		if(!isNaN(args[1])) firstArgumentAsInt = parseInt(args[1]) //so it does not try to parse int from "all"
		switch(args[0]) {
			// Honestly can do this better, will get around to it one day

			case "show":
				if(numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				if(args[1] === "all"){
					let resultForToDoShowAllDescription = ""
					for(let i = 0; i < currentSetOfTODOs.length; ++i) resultForToDoShowAllDescription += `[${i+1}] ${currentSetOfTODOs[i]}\n`
					toDoEmbed.setTitle("Showing all current tasks!")
					toDoEmbed.setDescription("```" + resultForToDoShowAllDescription + "```")
					return messageCreate.channel.send({ embeds: [toDoEmbed] })
				}
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.args.invalid)
				if(firstArgumentAsInt < 1 || currentSetOfTODOs.length < (firstArgumentAsInt - 1)) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				toDoEmbed.setTitle(`Showing task ${firstArgumentAsInt}!`)
				toDoEmbed.setDescription("```" + `[${firstArgumentAsInt}] ` + currentSetOfTODOs[`${firstArgumentAsInt - 1}`] + "```")
				messageCreate.channel.send({ embeds: [toDoEmbed] })
				break
			case "add":
				if(currentSetOfTODOs !== null && currentSetOfTODOs.length === 29) return messageCreate.channel.send("You have reached the maximum number of tasks.") // I may add a pagination system sometime soon.
				if(currentSetOfTODOs !== null && currentSetOfTODOs.join("v").replace(" ", "v").length + args.slice(1).join("v").length > 2000) return messageCreate.channel.send("Adding this task exceeds the 2000 characted limit!")
				// im too stupid and i did this because the thing would just crash if you query for something that is null, so i run a check first
				await db.push(`todos_${messageCreate.author.id}`, args.slice(1).join(" "))
				.catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				.then(() => {
					toDoEmbed.setTitle(`Added task ${numberOfTodos + 1}`)
					toDoEmbed.setDescription("```"+ `[${numberOfTodos + 1}] ${args.slice(1).join(" ")}` +"```")
					return messageCreate.channel.send({ embeds: [toDoEmbed] })
				})
				break

			case "remove":
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any ToDos!")
				if(numberOfTodos < firstArgumentAsInt || firstArgumentAsInt < 1) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				await db.pull(`todos_${messageCreate.author.id}`, currentSetOfTODOs[number - 1])
				.catch((error) => {
					console.error(error)
					console.log(messageCreate.content)
					return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
				})
				.then(() => {
					return messageCreate.channel.send(`ToDo ${firstArgumentAsInt} removed!`)
				})
				break

			case "set":
				if(!args[2]) return messageCreate.channel.send(reject.UserFault.args.missing)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("Your ToDos is empty!")
				if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid) // the firstArgumentAsInt does not reject if the arguments are isNaN true
				if((firstArgumentAsInt - 1) > currentSetOfTODOs.length || firstArgumentAsInt < 1) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
				if((currentSetOfTODOs.join("v").replace(" ", "v").length + args.slice(2).join("v")) > 2000) return messageCreate.channel.send("The task you are adding will exceed the 2000 character limit!")
				if(currentSetOfTODOs[`${args[1] - 1}`].includes(args.slice(2).join(" "))) return messageCreate.channel.send("You cannot change the task to the same thing.")
				await currentSetOfTODOs.splice(parseInt(args[1]-1), 1, args.slice(2).join(" "))
				await db.set(`todos_${messageCreate.author.id}`, currentSetOfTODOs)
				toDoEmbed.setTitle(`Updating task ${firstArgumentAsInt}!`)
				let updatedSetOfTODOs = await db.get(`todos_${messageCreate.author.id}`)
				toDoEmbed.setDescription("```Changed " + firstArgumentAsInt + " to " + updatedSetOfTODOs[`${firstArgumentAsInt-1}`] + "```")
				messageCreate.channel.send({ embeds: [toDoEmbed] })
				break
			default:
				return messageCreate.channel.send(reject.UserFault.args.invalid)
		}
	}
}
