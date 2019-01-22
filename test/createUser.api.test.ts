import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import { User, IUserModel } from "../src/model/user.model";
import * as userService from '../src/services/user.service';
import { LOGGER } from '../src/util/logger';
import { Cypher } from '../src/util/cypher';

chai.use(chaiHttp);
const expect = chai.expect;
const cypher = new Cypher();

describe('user API POST Tests', () => {
    const usrData = {
        "email": "D.O.GeeVz@gmail.com",
        "firstName": "Diego",
        "lastName": "Belmont",
        "roleId": 1
    }

    afterEach(done => {
        User.deleteOne({email: usrData.email})
            .then(() => {
                done();
            });
    });

    it('should be json', () => {
        return chai.request(app).post('/user').set("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=").send(usrData)
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should be succesfull', () => {
        return chai.request(app).post('/user').set("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=").send(usrData)
            .then(res => {
                expect(res.body.message).to.eql("user created successfully");
            });
    });

    it('should save on DB', () => {
        return chai.request(app).post('/user').set("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=").send(usrData)
            .then(res => {
                User.findById(res.body.id)
                    .then(fetched => {
                        expect(fetched.email).to.eql('D.O.GeeVz@gmail.com');
                    })
            })
    });

    it('should get the user from DB by it\'s ID', () => {
        userService.createUser(usrData)
            .then((generatedUsr) => {
                LOGGER.info(generatedUsr.id);
                const encId = cypher.encrypt(generatedUsr.id);
                const url =`/user/${encId}`;
                LOGGER.info(url);
                chai.request(app).get(url).set("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=")
                    .then(res => {
                        expect(res.body._id).to.eql(generatedUsr.id);
                    })
                    .catch((err) => {
                        LOGGER.error(err);
                    })
            })
         
    });



});