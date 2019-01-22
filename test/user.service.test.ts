import { User, IUserModel } from "../src/model/user.model";
import * as userService from '../src/services/user.service';
import * as roleService from '../src/services/role.service';
import * as assert from 'assert';

import {} from 'mocha';
import { IUser } from "../src/interfaces/user.interface";
import { LOGGER } from "../src/util/logger";

describe('save user to DB', () => {
    const newUserData: IUser = {
        email: "D.O.GeeVz@gmail.com",
        firstName: "Diego",
        lastName: "Belmont",
    };

    afterEach(done => {
        User.deleteOne({email: newUserData.email})
            .then(() => {
                done();
            });
    });

    it('creates a user in DB', (done) => {
        const newUser: IUserModel = new User(newUserData);
        userService.createUser(newUser)
            .then((savedUsr) => {
                assert(savedUsr.email === newUserData.email);
                User.findOne({email: newUserData.email})
                    .then((found) => {
                        assert(found.email === newUser.email );
                        done();
                    });
            });
    });

    it('create a user in DB with role', (done) => {
        let newUser: IUserModel;
        roleService.readRole(1).then((fetchedRole) => {
            this.newUserData = newUserData;
            this.newUserData['role'] = fetchedRole;
            newUser  = new User(newUserData);
            userService.createUser(newUser)
                .then((savedUsr) => {
                    assert(savedUsr.email === newUserData.email);
                    User.findOne({email: newUserData.email}).populate('role')
                        .then((found) => {
                            assert(found.email === newUserData.email );
                            assert(found.role.name === "Admin");
                            done();
                        });
                });
            });
        })
    
        
});

describe('read user from DB', () => {
    const newUserData: IUser = {
        email: "D.O.GeeVz@gmail.com",
        firstName: "Diego",
        lastName: "Belmont"
    };
    beforeEach(done => {
        const userToCreate = new User(newUserData);
        userToCreate.save()
            .then(() => {
                done();
            })
    });
    afterEach(done => {
        User.deleteOne({email: newUserData.email})
            .then(() => {
                done();
            });
    });
    it('should read a created user from the DB', (done) => {
        userService.readUsers({email: newUserData.email})
            .then((fetchedUser => {
                assert(fetchedUser[0].email === newUserData.email);
                done();
            }))
    })
})