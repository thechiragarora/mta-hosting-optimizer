import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import statusCodes from '../constant/statusCodes';
import codeMessages from '../constant/codeMessages';

export default (schemaToValidateAgainst: Joi.Schema, validationType: 'body' | 'query' | 'params') =>
    (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schemaToValidateAgainst.validate(req[validationType]);
        if (error) {
            const { BAD_REQUEST } = statusCodes;
            res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: error.message || codeMessages[BAD_REQUEST] })
        } else {
            req[validationType] = value;
            next();
        }
    };