import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AllowedErrorCode, ApiError } from '../../utils/error';
import { CreatePointOfInterestDto } from '../dto/point-of-interest-dto';

const pointOfInterestSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    status: Joi.string().valid('ONLINE', 'OFFLINE').required(),
    scheduleId: Joi.number().required(),
    pumps: Joi.array().items()
});

export const validatePointOfInterest = (pointOfInterest: CreatePointOfInterestDto) => pointOfInterestSchema.validate(pointOfInterest);

export const validatePointOfInterestMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const { error } = validatePointOfInterest(req.body);
    if (error) {
        next(new ApiError(AllowedErrorCode.VALIDATION_ERROR, error.details[0].message))
    }
    else { next(); }
}

export default pointOfInterestSchema;