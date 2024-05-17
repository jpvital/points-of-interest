import { NextFunction, Request, Response } from "express";
import { PointOfInterestService } from "../services/point-of-interest.service";


export class PointOfInterestController {
    private pointOfInterestService: PointOfInterestService;

    constructor(pointOfInterestService: PointOfInterestService) {
        this.pointOfInterestService = pointOfInterestService;
    }

    public getPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            return this.pointOfInterestService.getPointOfInterest(page, limit);
        } catch (error) {
            next(error);
        }
    };

    public getPointOfInterestById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            return this.pointOfInterestService.getPointOfInterestById(id);
        } catch (error) {
            next(error);
        }
    }

    public postPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const point = req.body;
            return this.pointOfInterestService.createPointOfInterest(point);
        } catch (error) {
            next(error);
        }
    }

    public putPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const point = req.body;
            return this.pointOfInterestService.updatePointOfInterest(id, point);
        } catch (error) {
            next(error);
        }
    }

    public deletePointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            return this.pointOfInterestService.deletePointOfInterest(id);
        } catch (error) {
            next(error);
        }
    }
}