
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { MongoMemoryServer } from 'mongodb-memory-server';
import Server from '../Server';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import statusCodes from '../libs/constant/statusCodes';

describe('Hosting', () => {
    // jest.setTimeout(60000);
    const server = new Server();
    const app = server.bootstrap();
    const request = supertest(app);
    let mongoUri;
    let mongoServer;
    beforeAll(async () => {
        // creating db connection
        mongoServer = await MongoMemoryServer.create();
        mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, (err) => {
            if (err) {
              console.log('ERROR CONNECTING TESTING DB', err);
            }
          });
        return;
    });
    afterAll(() => {
        // closing db connection
        mongoose.disconnect();
        mongoServer.stop();
    } );
    // beforeEach(async () => {
    //     const result = await request.post('/api/hosting/add-mock-hostings');
    //     console.log('result', result.body);
    //     return;
    // });
    // afterEach(async () => {
    //     await mongoose.connection.dropDatabase();
    //     return;
    // });
    describe('Success Scenario', () => {
        test.only('Should get all the inefficient hostings default params used', async () => {
            try {
                const res = await request.get('/api/hosting/inefficient-hostings');
                console.log('::::: res ::::;', res.body, res.status, typeof res.status);
                expect(res.status).toEqual(statusCodes.SUCCESS);
                console.log('after::')
            } catch(err) {
                console.log(':::::; ERROR ::::::;', err);
            }
        }, 30000);
        it.skip('Should get all the inefficient hostings limit, skip custom value used', async (done) => {
            try {
                const res = await request.get('/api/hosting/inefficient-hostings?limit=1&skip=1');
                console.log('::::: res ::::;', res.body, res.status, typeof res.status);
                expect(res.status).toEqual(statusCodes.SUCCESS);
                console.log('after::')
                done();
            } catch(err) {
                console.log(':::::; ERROR ::::::;', err);
            }
        })
    });

    describe.skip('Failure Scenario', () => {
        it('Should get all the inefficient hostings default params used', async () => {
            try {
                const res = await request.get('/api/hosting/inefficient');
                console.log('::::: res ::::;', res.body, res.status, typeof res.status);
                expect(res.status).toEqual(statusCodes.SUCCESS);
                console.log('after::')
            } catch(err) {
                console.log(':::::; ERROR ::::::;', err);
            }
        });
    })

});