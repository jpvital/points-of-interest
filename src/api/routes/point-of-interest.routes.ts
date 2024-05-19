import { NextFunction, Request, Response, Router } from 'express';

import context from '../../utils/context';
import { validatePointOfInterestMiddleWare } from '../validators/point-of-interest.validator';

const pointOfInterestController = context.resolve('pointOfInterestController');

const router = Router();

/**
* @swagger
* /api/point-of-interest:
*   get:
*     tags:
*       - Point of Interest
*     description: Get a list of points of interest
*     parameters:
*       - name: offset
*         in: query
*         required: false
*         description: offset tells us which group of <limit> items to return
*         schema:
*           type: integer
*       - name: limit
*         in: query
*         required: false
*         description: The number of items per page
*         schema:
*           type: integer
*     responses:
*       201:
*         description: Success
*/
router.get('/point-of-interest', async (req: Request, res: Response, next: NextFunction) => {
    pointOfInterestController.getPointOfInterest(req, res, next);
});

/**
 * @swagger
 * /api/point-of-interest:
 *   get:
 *     tags:
 *       - Point of Interest
 *     description: Get a single point of interest
 *     responses:
 *       201:
 *         description: Success
 */
router.get('/point-of-interest/:id', async (req: Request, res: Response, next: NextFunction) => {
    pointOfInterestController.getPointOfInterestById(req, res, next);
});


/**
 * @swagger
 * /api/point-of-interest/{id}:
 *   post:
 *     tags:
 *       - Point of Interest
 *     description: Get a point of interest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the point of interest
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
router.post('/point-of-interest', validatePointOfInterestMiddleWare, async (req: Request, res: Response, next: NextFunction) => {
    pointOfInterestController.postPointOfInterest(req, res, next);
});


/**
 * @swagger
 * /api/point-of-interest/{id}:
 *   put:
 *     tags:
 *       - Point of Interest
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
router.put('/point-of-interest/:id', validatePointOfInterestMiddleWare, async (req: Request, res: Response, next: NextFunction) => {
    pointOfInterestController.putPointOfInterest(req, res, next);
});


/**
 * @swagger
 * /api/point-of-interest:
 *   delete:
 *     tags:
 *       - Point of Interest
 *     description: delete a point of interest
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *          description: Not Found
 */
router.delete('/point-of-interest/:id', async (req: Request, res: Response, next: NextFunction) => {
    pointOfInterestController.deletePointOfInterest(req, res, next);
});

export default router;