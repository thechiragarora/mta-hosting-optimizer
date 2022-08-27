import { NextFunction, Request, Response } from 'express';
import statusCodes from '../constant/StatusCodes';
import codeMessages from '../constant/codeMessages';

export default (req: Request, res: Response, next: NextFunction) => {
    const result = {
        message: codeMessages[statusCodes.NOT_FOUND],
        status: statusCodes.NOT_FOUND ,
        timestamp: new Date(),
    }
    res.status(result.status).json(result);
};
