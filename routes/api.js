'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    
    // Get number and unit from input
    const initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Handle errors
    if (initNum === null && initUnit === null) {
      return res.json({ error: 'invalid number and unit' });
    }
    if (initNum === null) {
      return res.json({ error: 'invalid number' });
    }
    if (initUnit === null) {
      return res.json({ error: 'invalid unit' });
    }

    // Convert 'l' to 'L' for the response
    if (initUnit === 'l') initUnit = 'L';
    
    // Perform conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    
    // Convert return unit 'l' to 'L' if necessary
    if (returnUnit === 'l') returnUnit = 'L';

    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Return result
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};
