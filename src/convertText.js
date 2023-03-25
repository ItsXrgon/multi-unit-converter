const units = require("./units.json");
const convertUnits = require("./convertUnits.js").convertUnits;
const InvalidUnitException = require('./Exceptions/InvalidUnitException').InvalidUnitException;

class convertText {
    time = "s" // Seconds
    length = "m" // Meter
    weight = "kg" // Kilogram
    area = `${this.length}2` // Meter Squared
    volume = `${this.length}3` // Meter Cubed 
    liquidVolume = `${this.length}3` // Meter Cubed 
    speed = `${this.length}/${this.time}` // Meter Per Second
    acceleration = `${this.length}/${this.time}2` // Meter Per Second Squared
    temperature = "K" // Kelvin
    electricCurrent = "A" // Ampere
    currency = "USD" // Dollars
    spoon = "tbsp" // Tablespoon

    // JSON of lists of units function is compatible with
    timeUnits = [].concat(...Object.values(units.lengthUnits))
    lengthUnits = [].concat(...Object.values(units.lengthUnits))
    weightUnits = [].concat(...Object.values(units.weightUnits))
    liquidVolumeUnits = [].concat(...Object.values(units.liquidVolumeUnits))
    temperatureUnits = [].concat(...Object.values(units.temperatureUnits))
    electricCurrentUnits = [].concat(...Object.values(units.electricCurrentUnits))
    spoonUnits = [].concat(...Object.values(units.spoonUnits))
    currencyUnits = [].concat(...Object.values(units.currencyUnits))

    constructor(){
        // SI Units already the base value
    }

    // Functions to change the units convertText(text) changes the units to
    // Units should be a string and included in the available list of units 

    setUnitTime(time) {
        if(typeof time != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.timeUnits.includes(time.toLowerCase())){
            throw new InvalidUnitException(`Input ${time} is not a time unit!`);
        } else {       
            this.time = time
        }
    }

    setUnitLength(length) {
        if(typeof length != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.lengthUnits.includes(length.toLowerCase())){
            throw new InvalidUnitException(`Input ${length} is not a length unit!`);
        } else {            
            this.length = length
        }
    }

    setUnitWeight(weight) {
        if(typeof weight != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.weightUnits.includes(weight.toLowerCase())){
            throw new InvalidUnitException(`Input ${weight} is not a mass unit!`);
        } else {       
            this.mass = mass
        }
    }

    setUnitLiquidVolume(liquidVolume) {
        if(typeof liquidVolume != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.liquidVolumeUnits.includes(liquidVolume.toLowerCase())){
            throw new InvalidUnitException(`Input ${liquidVolume} is not a liquid volume unit!`);
        } else {       
            this.mass = mass
        }
    }

    setUnitTemperature(temperature) {
        if(typeof temperature  != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.temperatureUnits.includes(temperature.toLowerCase())){
            throw new InvalidUnitException(`Input ${temperature} is not a temperature unit!`);
        } else{       
            this.temperature = temperature
        }
    }

    setUnitElectricCurrent(electricCurrent) {
        if(typeof electricCurrent != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.electricCurrentUnits.includes(electricCurrent.toLowerCase())){
            throw new InvalidUnitException(`Input ${electricCurrent} is not an electric current unit!`);
        } else{       
            this.electricCurrent = electricCurrent
        }
    }

    setUnitSpoon(spoon) {
        if(typeof spoon != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.spoonUnits.includes(spoon.toLowerCase())){
            throw new InvalidUnitException(`Input ${spoon} is not a spoon unit!`);
        } else{       
            this.spoon = spoon
        }
    }

    setUnitCurrency(currency) {
        if(typeof currency != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.currencyUnits.includes(currency.toLowerCase())){
            throw new InvalidUnitException(`Input ${currency} is not a currency unit!`);
        } else{       
            this.currency = currency
        }
    }

    convertUnitsToSelected(value, unit) {
        unit = unit.replace(/[0-9]/g, '').trim();
        console.log(value + " " + unit)
        const cu = new convertUnits()
        switch(unit) {
            case(this.timeUnits.includes(unit)): // case time units
                return cu.convertTime(value, unit, this.time); 
            case(this.lengthUnits.includes(unit)): // case length units
                return cu.convertLength(value, unit, this.time);
            case(this.weightUnits.includes(unit)): // case weight units
                return cu.convertWeight(value, unit, this.time);
            case(this.liquidVolumeUnits.includes(unit)): // case liquid volume units
                return cu.convertLiquidVolume(value, unit, this.time);
            case(this.temperatureUnits.includes(unit)): // case temperature units
                return cu.convertTempertaure(value, unit, this.time);
            case(this.electricCurrentUnits.includes(unit)): // case electric current units
                return cu.convertElectricCurrent(value, unit, this.time);
            case(this.spoonUnits.includes(unit)): // case spoon units
                return cu.convertSpoon(value, unit, this.time);
            case(this.currencyUnits.includes(unit)): // TO BE IMPLEMENTED
                return cu.convertSpoon(value, unit, this.time); 
        }
    }
    /*
    let regExUnits = ""
    regExUnits += `${Object.values(this.timeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.lengthUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.weightUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.temperatureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.currencyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.spoonUnits).flat().join('|')}`
    console.log(regExUnits)*/

    convertText(text) {
        if(typeof text != 'string'){
            throw 'Text should be a string!';
        }
        //const regex = new RegExp(/\\d*\.?\d*\s*(milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|miligrams|miligram|mg|grams|gram|g|ounces|ounce|ozs|oz|pounds|pound|lbs|lb|kilograms|kilogram|kg|tonnes|tonne|tn|tons|ton|t|milimeters cubed|milimeter cubed|mm3|centimeters cubed|centimeter cubed|cm3|meters cubed|meter cubed|m3|milliliters|milliliter|ml|liters|liter|l|quarts|quart|qt|fluid ounces|fluid ounce|fl ozs|fl oz|cups|cup|gallons|gallon|gal|kelvins|kelvin|k|celsius|c|fahrenheit|f|milliamperes|milliampere|ma|amperes|ampere|a|kiloamperes|kiloampere|ka|usd|$|euro|€|gbp|£|JPY|¥|AED|CNY|AUD|CAD|CHF|HKD|SGD|SEK|KRW|NOK|NZD|INR|MXN|TWD|ZAR|egp|teaspoons|teaspoon|tea spoon|tsp|tablespoons|tablespoons|table spoon|tbsp|pi|'|")\\b/g);
        // regex to detect numbers followed by units
        // find all the units in the text using the regex pattern
        const regex = new RegExp(/(\d*\.?\d+)(?:\s*)(milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|miligrams|miligram|mg|grams|gram|g|ounces|ounce|ozs|oz|pounds|pound|lbs|lb|kilograms|kilogram|kg|tonnes|tonne|tn|tons|ton|t|milimeters cubed|milimeter cubed|mm3|centimeters cubed|centimeter cubed|cm3|meters cubed|meter cubed|m3|milliliters|milliliter|ml|liters|liter|l|quarts|quart|qt|fluid ounces|fluid ounce|fl ozs|fl oz|cups|cup|gallons|gallon|gal|kelvins|kelvin|k|celsius|c|fahrenheit|f|milliamperes|milliampere|ma|amperes|ampere|a|kiloamperes|kiloampere|ka|usd|$|euro|€|gbp|£|JPY|¥|AED|CNY|AUD|CAD|CHF|HKD|SGD|SEK|KRW|NOK|NZD|INR|MXN|TWD|ZAR|egp|teaspoons|teaspoon|tea spoon|tsp|tablespoons|tablespoons|table spoon|tbsp|pi|'|")(?!\w)/g)
        const units = text.match(regex);

        // if no units are found, return the original text
        if (!units) {
            return text;
        } 

        // loop through each unit found and convert it to its equivalent unit value 
        units.forEach((unit) => {
            // extract the numeric value and unit without the plural suffix
            const [value, ...unitParts] = unit.replace(/\//, "").split(/s+/);
            
            const unitWithoutPlural = unitParts.join("");
            // convert the value to a float
            const floatValue = parseFloat(value);

            // convert the unit to its equivalent SI value using the conversion factor dictionary
            let newValue = this.convertUnitsToSelected(floatValue, unit.toLowerCase());
            console.log(newValue)
            // replace the original unit with the SI unit in the text
            text = text.replace(new RegExp(`/${value}s?${unitWithoutPlural}`, "g"), newValue);
        });
        return text;
    }
}

module.exports = convertText;