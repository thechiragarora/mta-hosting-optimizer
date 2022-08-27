import * as Joi from 'joi';

const inefficientHostingsParams = Joi.object({
    limit: Joi.number().integer()
      .min(1)
      .default(10),
    skip: Joi.number().integer()
      .min(0)
      .default(0),
  });

export { inefficientHostingsParams };