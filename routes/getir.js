const express = require('express');
const router  = express.Router();
const { Joi, validate } = require('express-validation');
const getData = require('../models/fetch');

// Joi schema
const schema = {
  body: Joi.object({
    startDate: Joi.date().required(),
    endDate:   Joi.date().required(),
    minCount:  Joi.number().required(),
    maxCount:  Joi.number().required(),
  })
};

/**
 * @swagger
 * /v1/getir:
 *   post:
 *     tags:
 *       - Getir
 *     summary: Rest API to connects with Mongo DB
 *     description: Returns data based on the given payload
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                  type: string
 *                  format: date
 *                  description: Start date for the filtering
 *               endDate:
 *                  type: string
 *                  format: date
 *                  description: End date for the filtering
 *               minCount:
 *                  type: number
 *                  description: Minimum count for the filtering
 *               maxCount:
 *                  type: number
 *                  description: Minimum count for the filtering
 *     responses:
 *       200:
 *         description: Successfully pulled data from source
 *       500:
 *         description: Internal Server error
 *       404:
 *         description: Requested object not found
 */
router.post('/getir', validate(schema), async function (req, res, next) {
  try {
    // ToDo: Validate date format
    //   const response = {
    //     "code":0,
    //     "msg":"Success",
    //     "records":[
    //       {
    //           "key":"TAKwGc6Jr4i8Z487",
    //           "createdAt":"2017-01-28T01:22:14.398Z",
    //           "totalCount":2800
    //       }
    //     ]
    // };
    console.log(111);
    await getData(req.body)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500).json({ code: -2, error: e, msg: 'Internal Server Error' });
    });
  } catch (err) {
    next(err);
    return res.status(500).json({ code: -2, error: e, msg: 'Internal Server Error' });
  }
});

module.exports = router;
