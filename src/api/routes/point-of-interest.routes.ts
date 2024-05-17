import { Request, Response, Router } from 'express';
// TODO middleware to validate request body

import context from '../../utils/context';
import { validatePointOfInterestMiddleWare } from '../validators/point-of-interest.validator';

const pointOfInterestController = context.resolve('pointOfInterestController');

const router = Router();

router.get('/point-of-interest', async (req: Request, res: Response) => {
    pointOfInterestController.getPointOfInterest();
});

router.get('/point-of-interest/:id', async (req: Request, res: Response) => {
    pointOfInterestController.getPointOfInterestById();
});

router.post('/point-of-interest', validatePointOfInterestMiddleWare, async (req: Request, res: Response) => {
    pointOfInterestController.postPointOfInterest();
});

router.put('/point-of-interest/:id', async (req: Request, res: Response) => {
    pointOfInterestController.putPointOfInterest();
});

router.delete('/point-of-interest/:id', async (req: Request, res: Response) => {
    pointOfInterestController.deletePointOfInterest();
});

export default router;