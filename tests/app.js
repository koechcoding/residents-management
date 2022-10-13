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

    it('should return all locations and populations', (done) => {
        // Create a new contact
        chai.request(app)
            .post('/locations')
            .set('content-type', 'application/json')
            .send(locationData)
            .end();
        // Return contacts
        chai.request(app)
            .get('/locations')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
    
    it('should return single locations and its population', (done)=>{
        chai.request(app)
           .get('/location/1')
           .end((err, res)=>{
            res.should.have.status(200);
            done();
           })
    });

    it('should return 404 when location is not available', (done)=>{
        chai.request(app)
           .get('location/100')
           .end((err, res)=>{
            res.should.have.status(404);
            done();
           })
    });

    it('should update single location data', (done)=>{
        //create a new contact
        const dataUpdate = {
            name: "nairobi",
            femalePopulation: 670,
            malePopulation: 346
        }
        chai.request(app)
           .put('/locations/1')
           .set('content-type', "applocation/json")
           .send(dataUpdate)
           end((err, res) =>{
            res.should.have.status(200);
            done();
           })
    });

    it("should return 404 when updating unavailable location", (done)=>{
        const dataUpdate ={
            name: "Nairobi",
            femalePopulation: 325,
            malePopulation: 234
        }
        chai.request(app)
           .put('/location/10')
           .set('content-type', 'application/json')
           .send(dataUpdate)
           .end((err, res)=>{
             res.should.have.status(404);
             done();
           })
    });

    it("should delete/remove a single location", (done)=>{
        chai.request(app)
           .delete('/location/1')
           .end((err, res)=>{
              res.should.have.status(200);
              done();
           })
    });

    it('should return 404 when location to delete is not available', (done)=>{
        chai.request(app)
          .delete('/locations/1')
          .end((err, res)=>{
            res.should.have.status(404);
            done();
          })
    });
});