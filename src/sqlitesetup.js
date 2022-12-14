var path = require("path");
var dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

//set env for db
dotenv.config();
const env = process.env.NODE_ENV

//sqlite database path for development and test
const developmentDbPath = path.resolve(_dirname, "dev.db");
const testDbPath = path.resolve(_dirname, "test.db");
const dbPath = env === "test"? testDbPath : developmentDbPath;

//set sequelize set up
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath
});

//authenticate connection to db
sequelize.authenticate().then(()=>{
    console.log("Connection had been established successfully")
}).catch(err=>{
    console.log("Unable to connect to database and error is ${err}")
});

sequelize.sync().done();

exports = module.exports = sequelize;