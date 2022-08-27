import { Router } from 'express';
import { hostingController } from '../controller';
import { inefficientHostingsParams } from './validators/hosting';
import requestValidator from '../libs/middleware/requestValidator';

const hostingRouter = Router();
/**
 * @swagger
 * /hosting/inefficient-hostings:
 *  get:
 *   tags: [Hosting]
 *   description: Get Inefficient hostings
 *   summary: Get Inefficient hostings
 *   parameters:
 *      - in: query
 *        name: limit
 *        required: false
 *        description: Numeric limit
 *        schema:
 *         type: integer
 *         minimum: 1
 *         default: 10
 *      - in: query
 *        name: skip
 *        required: false
 *        description: Numeric skip
 *        schema:
 *          type: integer
 *          minimum: 0
 *          default: 0
 *   responses:
 *     200:
 *       type:
 *         object
 */
hostingRouter.get('/inefficient-hostings', requestValidator(inefficientHostingsParams, 'query'), hostingController.getInefficientHostings);

/**
 * @swagger
 * /hosting/add-mock-hostings:
 *  post:
 *   tags: [Hosting]
 *   description: Add Mock Hostings in Db
 *   summary: Add Mock Hostings in Db
 *   responses:
 *     200:
 *       description: Ok
 */
hostingRouter.post('/add-mock-hostings', hostingController.addMockHostings);

export default hostingRouter;


