const Joi = require('joi');

async function validateRequest(input){
// Joi schema
const schema = {
  body: Joi.object({
    startDate: Joi.date().iso().raw().required(),
    endDate:   Joi.date().iso().raw().required(),
    minCount:  Joi.number().required(),
    maxCount:  Joi.number().required(),
  })
};

schema.validate(input, schema, (err, value) => {
  if (err) {
    return { status: 404, error: err };
  }
  else {
    return true;
  }
 });
}

validateRequest({});

module.exports = {
  validateRequest
};