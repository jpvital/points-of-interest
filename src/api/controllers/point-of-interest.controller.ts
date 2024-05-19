import { NextFunction, Request, Response } from "express";
import { AllowedErrorCode, ApiError } from "../../utils/error";
import { IPointOfInterestService } from "../services/point-of-interest.service";


export class PointOfInterestController {
    private pointOfInterestService: IPointOfInterestService;

    constructor(pointOfInterestService: IPointOfInterestService) {
        this.pointOfInterestService = pointOfInterestService;
    }

    public getPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.query.offset as string) || 5;
            const limit = parseInt(req.query.limit as string) || 0;
            const pointsOfService = await this.pointOfInterestService.getPointOfInterest(offset, limit);
            res.status(200).json({ message: "success", data: pointsOfService });
        } catch (error) {
            next(error);
        }
    };

    public getPointOfInterestById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const pointOfService = await this.pointOfInterestService.getPointOfInterestById(id);
            if (!pointOfService) {
                throw new ApiError(AllowedErrorCode.NOT_FOUND, "Point of Interest not found");
            }
            res.status(200).json({ message: "success", data: pointOfService });
        } catch (error) {
            next(error);
        }
    }

    public postPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const point = req.body;
            const newPointOfservice = await this.pointOfInterestService.createPointOfInterest(point);
            res.status(201).json({ message: "success", data: newPointOfservice });
        } catch (error) {
            next(error);
        }
    }

    public putPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;

            const point = req.body;
            delete point.id;

            const updatedPointOfInterest = await this.pointOfInterestService.updatePointOfInterest(id, point);
            if (!updatedPointOfInterest) {
                throw new ApiError(AllowedErrorCode.NOT_FOUND, "Point of Interest not found");
            }
            res.status(200).json({ message: "success", data: updatedPointOfInterest });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public deletePointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            await this.pointOfInterestService.deletePointOfInterest(id);
            res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            next(error);
        }
    }
}