import express from 'express';
import * as dataController from '../controllers/dataController.js';
import {verifyToken} from '../middlewares/authenMiddlewares.js';

const router = express();

/**
 * @swagger
 * tags:
 *   name: IOT_Data
 *   description: SmartHome devices's data
 * */ 



/**
 * @openapi
 *  /api/data/currentTemperature:
 *      get: 
 *          summary: Return the current temperature
 *          tags: [IOT_Data]
 *          response:
 *              200:
 *                  description: The current temperature
 *                  content:
 *                      application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                            data:
 *                              type: object
 *                              properties:
 *                                id:
 *                                  type: integer
 *                                  description: The user ID.
 *                                  example: 0
 *                                name:
 *                                  type: string
 *                                  description: The user's name.
 *                                  example: Leanne Graham
 *  
 * */
router.get("/currentTemperature",   dataController.currentTemperature);

router.get("/currentHumid", dataController.currentHumid);

router.get("/lastFan", dataController.lastFan)

router.get("/lastLed", dataController.lastLed);

router.get("/weektemperatures",  dataController.getDayTemperatures);
router.get("/weekhumids",  dataController.getDayHumidities);
router.get("/todayWarnings",  dataController.getWarningsInDay);
router.get("/tempHumidData", dataController.getDayTempAndHumid);


router.post("/setFan", dataController.setFan);

router.post("/toggleLed",  dataController.toggleLed);

export default router;