const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var location = require("./db");

const port = 8000;
const app = express();

//set up body parsers
app.use(bodyParser.json());

//Extend url parser urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

//set up cross origin
app.use(cors());

//Get the current homepage
app.get('/', (req, res) =>{
    res.status(200).send({
        success: true,
        message: "Welcome to residents API"
    });
});

//create new locations
app.post('/locations', async (req, res)=>{
    const {name, femalePopulation, malePopulation } = req.body;
    if(!name || !femalePopulation || !malePopulation ) {
        res.status(400).send({
            success: false,
            message: "Name, female population and male population required"
        });
    };
    const totalPopulation = femalePopulation + malePopulation;
    try{
        const locationDetails = await Location.create({
            name: name,
            totalfemale: femalePopulation,
            totalmale: malePopulation,
            total: totalPopulation
        });
        res.status(201).send({
            success: true,
            message: "location created successfully.",
            locationDetails
        });
    }catch(err){
        res.status(500).json(err)
    }
});