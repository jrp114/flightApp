import Joi from 'joi';

function validateForm(obj) {
  const schema = {
    first_name: Joi.string().min(3).max(60).required(),
    last_name: Joi.string().min(3).max(60).required(),
    bags: Joi.number().required(),
    flight_number: Joi.required(),
  }
  return Joi.validate(obj, schema);
}

export default validateForm;
