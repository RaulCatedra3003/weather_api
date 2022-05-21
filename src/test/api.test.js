const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should()
chai.use(chaiHttp)

describe('Api test', () => {
  // Test the api runs correctly
  describe('GET /', () => {
    it('Should get API working', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.text.should.be.eq('API working')
          done()
        })
    })
  })

  describe( 'GET /weather/', () => {
    it('Should get weather data', (done) => {
      chai.request(server)
        .get('/weather?coor=9.86,76.52')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          res.body.data.should.have.property('hourly')
          res.body.data.hourly.should.be.a('array')
          res.body.data.hourly.length.should.be.eq(48)
          res.body.data.should.have.property('daily')
          res.body.data.daily.should.be.a('array')
          res.body.data.daily.length.should.be.eq(8)
          done()
        })
    })

    it('Should get 400 if coor are not ok', (done) => {
      chai.request(server)
        .get(`/weather?coor=,76.52`)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.should.be.eq('Invalid parameters')
          done();
        })
    })
  })
})


