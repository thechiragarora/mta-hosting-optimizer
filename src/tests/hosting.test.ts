
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { MongoMemoryServer } from 'mongodb-memory-server';
import Server from '../Server';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import statusCodes from '../libs/constant/statusCodes';
import codeMessages from '../libs/constant/codeMessages';
import Database from '../libs/Database';
import { HostingController } from '../controller/hostingController';
import { HostingService } from '../service';
import * as sinon from 'sinon';

describe('Hosting', () => {
    const server = new Server();
    const app = server.bootstrap();
    const request = supertest(app);
    let mongoUri;
    let mongoServer;
    beforeAll(async () => {
        // creating db connection
        mongoServer = await MongoMemoryServer.create();
        mongoUri = await mongoServer.getUri();
        await Database.open(mongoUri);
        return;
    });
    afterAll(async () => {
        // closing db connection
        await Database.disconnect();
        mongoServer.stop();
    });
    beforeEach(async () => {
        await request.post('/api/hosting/add-mock-hostings');
    });
    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });
    describe('Success Scenario', () => {
        test('Should get all the inefficient hostings default params used', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings');
            expect(res.status).toEqual(statusCodes.SUCCESS);
            expect(res.body.message).toEqual(codeMessages[statusCodes.SUCCESS]);
        });
        it('Should get all the inefficient hostings limit, skip custom value used', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings?limit=1&skip=1');
            expect(res.status).toEqual(statusCodes.SUCCESS);
            expect(res.body.message).toEqual(codeMessages[statusCodes.SUCCESS]);
        });
        it('health check', async () => {
            const res = await request.get('/health-check');
            expect(res.text).toEqual('i am ok')
        });
        it('create hosting controller instance', async () => {
            HostingController.getInstance();
        });
    });

    describe('Failure Scenario', () => {
        it('should get bad request error for wrong limit type', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings?limit=abc');
            expect(res.status).toEqual(statusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual("\"limit\" must be a number");
        });
        it('should get bad request error for wrong skip type', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings?skip=abc');
            expect(res.status).toEqual(statusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual("\"skip\" must be a number");
        });
        it('should get bad request error for wrong limit value', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings?limit=-1');
            expect(res.status).toEqual(statusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual("\"limit\" must be greater than or equal to 1");
        });
        it('should get bad request error for wrong skip type', async () => {
            const res = await request.get('/api/hosting/inefficient-hostings?skip=-1');
            expect(res.status).toEqual(statusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual("\"skip\" must be greater than or equal to 0");
        });
        it('should get route not found error', async () => {
            const res = await request.get('/api/hosting/abc');
            expect(res.status).toEqual(statusCodes.NOT_FOUND);
            expect(res.body.message).toEqual(codeMessages[statusCodes.NOT_FOUND]);
        });
        it('should throw error while connecting wrong mongo url', async () => {
            try {
                await Database.open('mongod://abc');
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
            }
        });
        it('should get internal server error for ineffient hostings api', async () => {
            const sandboxHostingService = sinon.stub(HostingService.prototype, 'aggregate');
            const errorMessage = 'something went wrong';
            sandboxHostingService.throws(new Error(errorMessage));
            const res = await request.get('/api/hosting/inefficient-hostings');
            expect(res.body.status).toEqual(statusCodes.INTERNAL_SERVER_ERROR);
            expect(res.body.message).toEqual(errorMessage);
            sandboxHostingService.restore();
        });

        it('should get internal server error for adding mock data api', async () => {
            const sandboxHostingService = sinon.stub(HostingService.prototype, 'createAll');
            const errorMessage = 'something went wrong';
            sandboxHostingService.throws(new Error(errorMessage));
            const res = await request.post('/api/hosting/add-mock-hostings');
            expect(res.body.status).toEqual(statusCodes.INTERNAL_SERVER_ERROR);
            expect(res.body.message).toEqual(errorMessage);
            sandboxHostingService.restore();
        });
        it('should get internal server with default error message', async () => {
            const sandboxHostingService = sinon.stub(HostingService.prototype, 'createAll');
            sandboxHostingService.throws(new Error());
            const res = await request.post('/api/hosting/add-mock-hostings');
            expect(res.body.status).toEqual(statusCodes.INTERNAL_SERVER_ERROR);
            expect(res.body.message).toEqual(codeMessages[statusCodes.INTERNAL_SERVER_ERROR]);
        });
        it('should run server without configuration provided', async () => {
            server.run();
        });

    });

});