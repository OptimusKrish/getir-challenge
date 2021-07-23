const express = require('express');
const router  = express.Router();
const { Joi, validate } = require('express-validation');
const Models = require('../models/fetch');

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
    await Models.fetchRecords(req.body)
    .then((data) => {
      const processedData = {
        code: 0,
        msg: 'Success',
        records: data
      };
      return res.status(200).json(processedData);
    })
    .catch((e) => {
      return res.status(500).json({ code: -1, error: e, msg: 'Internal Server Error' });
    });
  } catch (err) {
    next(err);
    return res.status(500).json({ code: -1, error: e, msg: 'Internal Server Error' });
  }
});

module.exports = router;
