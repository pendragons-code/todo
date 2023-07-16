module.exports = {
	apps: [{
		name: "todo bot",
		script: "./src/loaders/bot.js",
		env_production: {
			NODE_ENV: "production"
		},
		env_development: {
			NODE_ENV: "development"
		},
		watch_delay: 1000,
		ignore_watch: ["node_modules"],
		max_memory_restart: "3G",
		out_file: "./logfile.txt",
		error_file: "./errorfile.txt"
	}]
}
