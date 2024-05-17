import { NextFunction, Request, Response } from 'express';
import { PointOfInterest } from '../../entity/point-of-interest.entity';
import { PointOfInterestService } from '../services/point-of-interest.service';
import { PointOfInterestController } from './point-of-interest.controller';

jest.mock('C:\Users\campos\code\points-of-interest\src\api\services\point-of-interest.service.ts');

describe('PointOfInterestController', () => {
    let pointOfInterestService: jest.Mocked<PointOfInterestService>;
    let pointOfInterestController: PointOfInterestController

    beforeEach(() => {
        pointOfInterestService = new PointOfInterestService() as jest.Mocked<PointOfInterestService>;
    });

    describe('getPointsOfInterest', () => {
        it('should call the getPointOfInterest method of the service and respond with status 200', async () => {
            const req = { page: 2, limit: 3 } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const points = [];

            pointOfInterestService.getPointOfInterest.mockResolvedValue(points);
            await pointOfInterestController.getPointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(points);
            expect(pointOfInterestService.getPointOfInterest).toHaveBeenCalledWith(2, 3);
        });
    });

    describe('getPointsOfInterestById', () => {
        it('should call the getPointOfInterestById method of the service with the correct id', async () => {
            const req = { params: { id: '123' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const point = { id: '123' } as PointOfInterest;

            pointOfInterestService.getPointOfInterestById.mockResolvedValue(point);
            await pointOfInterestController.getPointOfInterestById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(point);
            expect(pointOfInterestService.getPointOfInterestById).toHaveBeenCalledWith('123');
        });
    });

    describe('postPointOfInterest', () => {
        it('should call the createPointOfInterest method of the service with the correct point and respond with status 201', async () => {
            const req = { body: {} } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const point = {} as PointOfInterest;

            pointOfInterestService.createPointOfInterest.mockResolvedValue(point);
            await pointOfInterestController.postPointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(point);
            expect(pointOfInterestService.createPointOfInterest).toHaveBeenCalledWith({});
        });
    });

    describe('putPointOfInterest', () => {
        it('should call the updatePointOfInterest method of the service with the correct id and point and respond with status 200', async () => {
            const req = { params: { id: '123' }, body: {} } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const point = {} as PointOfInterest;

            pointOfInterestService.updatePointOfInterest.mockResolvedValue(point);
            await pointOfInterestController.putPointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(point);
            expect(pointOfInterestService.updatePointOfInterest).toHaveBeenCalledWith('123', {});
        });
    });

    describe('deletePointOfInterest', () => {
        it('should call the deletePointOfInterest method of the service with the correct id and respond with status 200', async () => {
            const req = { params: { id: '123' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            pointOfInterestService.deletePointOfInterest.mockResolvedValue();
            await pointOfInterestController.deletePointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Deleted' });
            expect(pointOfInterestService.deletePointOfInterest).toHaveBeenCalledWith('123');
        });
    });
});