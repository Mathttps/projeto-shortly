import joi from "joi"

export const urlValid = joi.object({
    url:joi.string().uri().required()
})
