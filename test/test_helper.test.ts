import mongoose = require('mongoose'); 
import {ENV} from '../src/environments/environment';
import { LOGGER } from '../src/util/logger';

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect(`${ENV.mongo.url}:${ENV.mongo.port}/${ENV.mongo.db}`);
    mongoose.connection
        .once('open', () => { done();})
        .once('error', (error) => {
            LOGGER.warning('warning', error);
        });
});

afterEach((done) => {
    const {users} = mongoose.connection.collections;
    users.drop(() => {
        done();
    });
})