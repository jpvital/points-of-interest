import { NextFunction, Request, Response } from 'express';
import { PointOfInterest } from '../../persistence/entity/point-of-interest.entity';
import PostgresPointOfInterestRepository from '../../persistence/repositories/point-of-interest.repository';
import PointOfInterestService from '../services/point-of-interest.service';
import { PointOfInterestController } from './point-of-interest.controller';

jest.mock('../services/point-of-interest.service.ts');
jest.mock('../../persistence/repositories/point-of-interest.repository', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getPointOfInterestById: jest.fn(),
            // Add other methods as needed
        };
    });
});

describe('PointOfInterestController', () => {
    let pointOfInterestRepository: jest.Mocked<PostgresPointOfInterestRepository>;
    let pointOfInterestService: jest.Mocked<PointOfInterestService>;
    let pointOfInterestController: PointOfInterestController

    beforeEach(() => {
        pointOfInterestRepository = new PostgresPointOfInterestRepository() as jest.Mocked<PostgresPointOfInterestRepository>;
        pointOfInterestService = new PointOfInterestService(pointOfInterestRepository) as jest.Mocked<PointOfInterestService>;
        pointOfInterestController = new PointOfInterestController(pointOfInterestService);
    });

    describe('getPointOfInterest', () => {
        it('should call the getPointOfInterest method of the service and respond with status 200', async () => {
            const req = { query: { offset: 2, limit: 3 } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const points = [] as PointOfInterest[];

            pointOfInterestService.getPointOfInterest.mockResolvedValue(points);
            await pointOfInterestController.getPointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "success", data: points });
            expect(pointOfInterestService.getPointOfInterest).toHaveBeenCalledWith(2, 3);
        });

        it('if limit and offset are not provided, hould call the getPointOfInterest method of the servicewith default values', async () => {
            const req = { query: {} } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const points = [] as PointOfInterest[];

            pointOfInterestService.getPointOfInterest.mockResolvedValue(points);
            await pointOfInterestController.getPointOfInterest(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "success", data: points });
            expect(pointOfInterestService.getPointOfInterest).toHaveBeenCalledWith(5, 0);
        });
    });

    describe('getPointOfInterestById', () => {
        it('should call the getPointOfInterestById method of the service with the correct id', async () => {
            const req = { params: { id: '123' } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const next = jest.fn() as NextFunction;

            const point = { id: '123' } as PointOfInterest;

            pointOfInterestService.getPointOfInterestById.mockResolvedValue(point);
            await pointOfInterestController.getPointOfInterestById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "success", data: point });
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
            expect(res.json).toHaveBeenCalledWith({ message: 'success', data: point });
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
            expect(res.json).toHaveBeenCalledWith({ message: "success", data: point });
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