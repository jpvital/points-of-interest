import { NextFunction, Request, Response } from "express";
import { PointOfInterestService } from "../services/point-of-interest.service";


export class PointOfInterestController {
    private pointOfInterestService: PointOfInterestService;

    constructor(pointOfInterestService: PointOfInterestService) {
        this.pointOfInterestService = pointOfInterestService;
    }

    public getPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // handling pagination
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            const pointsOfService = await this.pointOfInterestService.getPointOfInterest(page, limit);
            res.status(200).json(pointsOfService);
        } catch (error) {
            next(error);
        }
    };

    public getPointOfInterestById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const pointOfService = await this.pointOfInterestService.getPointOfInterestById(id);
            res.status(200).json(pointOfService);
        } catch (error) {
            next(error);
        }
    }

    public postPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const point = req.body;
            const newPointOfservice = await this.pointOfInterestService.createPointOfInterest(point);
            res.status(201).json(newPointOfservice);
        } catch (error) {
            next(error);
        }
    }

    public putPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const point = req.body;
            const updatedPointOfInterest = await this.pointOfInterestService.updatePointOfInterest(id, point);
            res.status(200).json(updatedPointOfInterest);
        } catch (error) {
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