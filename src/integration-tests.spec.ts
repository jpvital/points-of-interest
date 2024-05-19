import express from 'express';
import request from 'supertest';
import routes from './api/routes';
import PointOfInterestService from './api/services/point-of-interest.service';

jest.mock('./api/services/point-of-interest.service');

const app = express();

app.use(routes);

describe('GET /api/point-of-interest', () => {
    it('should return a list of points of interest', async () => {
        const mockPointsOfInterest = [{ id: 1 }, { id: 2 }];
        (PointOfInterestService.prototype.getPointOfInterest as jest.Mock).mockResolvedValue(mockPointsOfInterest);
        const response = await request(app).get('/point-of-interest');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe('GET /api/point-of-interest/:id', () => {
    it('should return a single point of interest', async () => {
        const mockPointOfInterest = { id: 1 };
        (PointOfInterestService.prototype.getPointOfInterestById as jest.Mock).mockResolvedValue(mockPointOfInterest);
        const response = await request(app).get('/point-of-interest/${1}');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
    it('should throw error 4o4 when no point is found', async () => {
        (PointOfInterestService.prototype.getPointOfInterestById as jest.Mock).mockResolvedValue(null);
        const response = await request(app).get('/point-of-interest/${1}');

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
    });
});