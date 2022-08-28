import { Request, Response, NextFunction } from 'express';
import statusCodes from '../constant/statusCodes';
import codeMessages from '../constant/codeMessages';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    const { message, status } = err;
    const result = {
        message: message || codeMessages[status] || codeMessages[statusCodes.INTERNAL_SERVER_ERROR],
        status: status || statusCodes.INTERNAL_SERVER_ERROR,
        timestamp: new Date(),
    }
    res.status(result.status).json(result);
};
