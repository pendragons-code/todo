const { QuickDB } = require("quick.db")
global.db = new QuickDB({ filePath: "database/database.sqlite" })
console.log("[DB service]: Started!")
// data back up code here
