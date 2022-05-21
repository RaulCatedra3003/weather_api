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
})
