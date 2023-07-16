const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "unicodecon",
	aliases: [],
	category: "utility",
	desc: "A command that helps you convert certain expressions into unicode variants.",
	utilisation: "<help/sqrt/cubert/fourthrt/^x (superscript)/!^x (subscript)/fractions>",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args.slice(1).join(" ").length > 2000) return messageCreate.channel.send("The character limit is 2000, try breaking the thing into chunks for me! Thank you!")
		let acceptedArgs = ["help", "sqrt", "cubert", "fourthrt", "^x", "!^x", "fractions"]
		// if i wanna do more than 1 paradigm at once, remember to do !^x before ^x
		if(!acceptedArgs.includes(args[0])) return messageCreate.channel.send(reject.UserFault.args.invalid)
		// there are a few ways to do this, i can stack .replaceAlls and that would probably work ngl
		switch(args[0]) {
			case "help":
				messageCreate.channel.send("`" + acceptedArgs.join("`, `") + "`")
				break
			case "sqrt":
				messageCreate.channel.send(args.slice(1).join(" ").replaceAll("sqrt", "√"))
				break
			case "cubert":
				messageCreate.channel.send(args.slice(1).join(" ").replaceAll("cubert", "∛"))
				break
			case "fourthrt":
				messageCreate.channel.send(args.slice(1).join(" ").replaceAll("fourthrt", "∜"))
				break
			case "^x":
				messageCreate.channel.send(args.slice(1).join(" ").replaceAll("^0", "⁰").replaceAll("^1", "¹").replaceAll("^2", "²").replaceAll("^3", "³").replaceAll("^4", "⁴").replaceAll("^5", "⁵").replaceAll("^6", "⁶").replaceAll("^7", "⁷").replaceAll("^8", "⁸").replaceAll("^9", "⁹").replaceAll("^+", "⁺").replaceAll("^-", "⁻").replaceAll("^=", "⁼").replaceAll("^(", "⁽").replaceAll("^)", "⁾").replaceAll("^n", "ⁿ").replaceAll("^i", "ⁱ").replaceAll("^h", "ʰ").replaceAll("^j", "ʲ").replaceAll("^s", "ˢ").replaceAll("^t", "ᵗ").replaceAll("^u", "ᵘ").replaceAll("^v", "ᵛ").replaceAll("^w", "ʷ").replaceAll("^x", "ˣ").replaceAll("^y", "ʸ").replaceAll("^z", "ᶻ"))
				break
			case "!^x":
				messageCreate.channel.send(args.slice(1).join(" ").replaceAll("!^0", "₀").replaceAll("!^1", "₁").replaceAll("!^2", "₂").replaceAll("!^3", "₃").replaceAll("!^4", "₄").replaceAll("!^5", "₅").replaceAll("!^6", "₆").replaceAll("!^7", "₇").replaceAll("!^8", "₈").replaceAll("!^9", "₉").replaceAll("!^+", "₊").replaceAll("!^-", "₋").replaceAll("!^=", "₌").replaceAll("!^(", "₍").replaceAll("!^)", "₎").replaceAll("!^a", "ₐ").replaceAll("!^e", "ₑ").replaceAll("!^o", "ₒ").replaceAll("!^i", "ᵢ").replaceAll("!^j", "ⱼ").replaceAll("!^k", "ₖ").replaceAll("!^l", "ₗ").replaceAll("!^m", "ₘ").replaceAll("!^n", "ₙ").replaceAll("!^p", "ₚ").replaceAll("!^s", "ₛ").replaceAll("!^t", "ₜ"))
				break
			case "fractions":
				messageCreate.channel.send("https://lights0123.com/fractions/")
				break
		}
	}
}
