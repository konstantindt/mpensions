import Joi from 'joi';

export const listPensionsParameterSchema = Joi.object({
  likeId: Joi.string().pattern(/^[a-zA-Z\d-]+$/).min(3).max(36),
  likePotName: Joi.string().pattern(/^[\w\s\-,.;:()]+$/).min(3).max(50),
  gtAmount: Joi.number().precision(2).min(0),
  ltAmount: Joi.number().precision(2).greater(0),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1),
});
