import { ErrorRequestHandler, response } from "express";
import { ValidationError } from "yup";

interface validationErrors {
    [key: string]: string[];
}

const ValidationErrorHandler: ErrorRequestHandler = (err: ValidationError, req, res, next) => {
    let errors: validationErrors = {};

    err.inner.forEach(error => {
        errors[error.path] = error.errors;
    })

    return res.status(400).json({
        message: "Validation Error",
        errors
    })
}

export default ValidationErrorHandler;