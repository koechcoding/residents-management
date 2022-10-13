const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

//set up chai
chai.should();
chai.use(chaiHttp);

describe("App tests", ()=>{

    const locationData = {
        name: "Kapsowar",
        femalePopulation: 345,
        malePopulation: 259
    }

    it("should return main page /", (done) =>{
        chai.request(app)
           .get('/')
           .end((err, res)=>{
            res.should.have.status(200);
            done();
           });
    });

    it("should create new location", (done)=>{
        const newLocationdata ={
            name: "Chebiemit",
            femalePopulation: 120,
            malePopulation: 68
        }
        chai.request(app)
            .post("/locations")
            .set('content-type', 'application/json')
            .send(newLocationData)
            .end((err, res)=>{
                res.should.have.status(201);
                done();
            });
    });

    it("should return 400 when body items are missing", (done)=>{
        const newLocationData = {
            name: "",
            femalePopulation: 34,
            malePopulation: 67
        }
        chai.request(app)
            .post('/locations')
            .set('content-type', 'application/json')
            .send(newLocationData)
            .end((err, res)=>{
                res.should.have.status(400);
                done();
            });
    });

    it('should return all locations and population', (done)=>{
        //create a new contact
    })
})