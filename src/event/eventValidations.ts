import { body } from "express-validator";

export const eventValidations = [
    body("name")
        .isString()
        .notEmpty(),
    body("max_persons")
        .isNumeric()
        .notEmpty(),
    body("start_date")
        .isDate()
        .notEmpty(),
    body("end_date")
        .isDate()
        .notEmpty(),
    body("year")
        .isNumeric()
        .notEmpty(),
    body("price")
        .isNumeric()
        .notEmpty(),
];