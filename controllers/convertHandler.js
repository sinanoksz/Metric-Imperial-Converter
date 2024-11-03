function ConvertHandler() {
  
  this.getNum = function(input) {
    if (/^[a-zA-Z]+$/.test(input)) return 1;
    
    const numStr = input.match(/[^a-zA-Z]+/)[0];
    
    if ((numStr.match(/\//g) || []).length > 1) return null;
    
    if (numStr.includes('/')) {
      const [num, denom] = numStr.split('/');
      if (denom === '0') return null;
      return parseFloat((parseFloat(num) / parseFloat(denom)).toFixed(5));
    }
    
    const num = parseFloat(numStr);
    return isNaN(num) ? null : num;
  };
  
  this.getUnit = function(input) {
    const unit = input.match(/[a-zA-Z]+$/)?.[0]?.toLowerCase();
    
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) return null;
    
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitMap[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    const unit = initUnit.toLowerCase();
    
    switch(unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
}

module.exports = ConvertHandler;
