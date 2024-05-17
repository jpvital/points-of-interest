import { PointOfInterestService } from '../services/point-of-interest.service';
import { PointOfInterestController } from './point-of-interest.controller';

describe('PointOfInterestController', () => {
    let controller: PointOfInterestController;
    let service: PointOfInterestService;

    beforeEach(() => {
        service = new PointOfInterestService();
        controller = new PointOfInterestController(service);
    });

    describe('getPointsOfInterest', () => {
        it('should call the getPointsOfInterest method of the service', async () => {
            const spy = jest.spyOn(service, 'getPointOfInterest').mockImplementation(() => Promise.resolve([]));

            await controller.getPointOfInterest();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('getPointOfInterestById', () => {
        it('should call the getPointOfInterestById method of the service with the correct id', async () => {
            const spy = jest.spyOn(service, 'getPointOfInterestById').mockImplementation(() => Promise.resolve(null));

            const id = '1';
            await controller.getPointOfInterestById(id);

            expect(spy).toHaveBeenCalledWith(id);
        });
    });
});