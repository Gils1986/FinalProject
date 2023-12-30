import Joi from "joi";

export function formikValidateUsingJoi(formValidateSchema) {
  return function validate(values) {
    const schema = Joi.object(formValidateSchema);

    const { error } = schema.validate(values, { abortEarly: false });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const detail of error.details) {
      const errorKey = detail.path[0];
      errors[errorKey] = detail.message;
    }
    return errors;
  };
}
