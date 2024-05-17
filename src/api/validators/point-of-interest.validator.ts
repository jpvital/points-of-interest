import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AllowedErrorCode, CustomError } from '../../utils/error';
import { createPointOfInterestDto } from '../dto/point-of-interest-dto';

const pointOfInterestSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
});

export const validatePointOfInterest = (pointOfInterest: createPointOfInterestDto) => pointOfInterestSchema.validate(pointOfInterest);

export const validatePointOfInterestMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const { error } = validatePointOfInterest(req.body);
    if (error) {
        next(new CustomError(AllowedErrorCode.VALIDATION_ERROR, error.details[0].message))
    }
}

export default pointOfInterestSchema;