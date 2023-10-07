import joi from "joi";

export const userLoginValidator = joi.object({
  mobile: joi
    .string()
    .required(),
  password: joi.string().required(),
});

export const contactUsValidator = joi.object({
  name: joi.string().max(20),
  mobile: joi
    .string()
    .required(),
  message: joi.string().max(1500).required(),
  captchaToken: joi.string().required(),
});
