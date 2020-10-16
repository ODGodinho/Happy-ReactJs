import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import ValidationErrorHandler from "./ValidationErrorHandler";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {    
        
        return ValidationErrorHandler(err, req, res, next);
    }
    
    console.error(err);
    return res.status(500).json({message: "Internal server Error"});
}

export default errorHandler;