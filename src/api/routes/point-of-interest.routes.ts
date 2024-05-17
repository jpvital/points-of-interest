import { Request, Response, Router } from 'express';
// TODO middleware to validate request body

import context from '../../utils/context';
import { validatePointOfInterestMiddleWare } from '../validators/point-of-interest.validator';

const pointOfInterestController = context.resolve('pointOfInterestController');

const router = Router();

/**
 * @swagger
 * /api/point-of-interest:
 *   get:
 *     tags:
 *       - Import
 *     description: Get a list of points of interest
 *     responses:
 *       201:
 *         description: Success
 */
router.get('/point-of-interest', async (req: Request, res: Response) => {
    pointOfInterestController.getPointOfInterest(req, res);
});

/**
 * @swagger
 * /api/point-of-interest:
 *   get:
 *     tags:
 *       - Import
 *     description: Get a single of points of interest
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *        description: The id of the point of interest 
 *     responses:
 *       201:
 *         description: Success
 */
router.get('/point-of-interest/:id', async (req: Request, res: Response) => {
    pointOfInterestController.getPointOfInterestById(req, res);
});


/**
 * @swagger
 * /api/point-of-interest:
 *   post:
 *     tags:
 *       - Import
 *     description: Create a new point of interest
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       404:
 *          description: Not Found
 */
router.post('/point-of-interest', validatePointOfInterestMiddleWare, async (req: Request, res: Response) => {
    pointOfInterestController.postPointOfInterest(req, res);
});


/**
 * @swagger
 * /api/point-of-interest:
 *   put:
 *     tags:
 *       - Import
 *     description: Update a point of interest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the point of interest
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *        description: Not Found
 */
router.put('/point-of-interest/:id', validatePointOfInterestMiddleWare, async (req: Request, res: Response) => {
    pointOfInterestController.putPointOfInterest(req, res);
});


/**
 * @swagger
 * /api/point-of-interest:
 *   delete:
 *     tags:
 *       - Import
 *     description: delete a point of interest
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *          description: Not Found
 */
router.delete('/point-of-interest/:id', async (req: Request, res: Response) => {
    pointOfInterestController.deletePointOfInterest(req, res);
});

export default router;