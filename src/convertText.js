import units from './units.json' assert { type: "json" };;
import convertUnits from './convertUnits.js';
import InvalidUnitException from './Exceptions/InvalidUnitException.js';

class convertText {
    time = "s" // Seconds
    length = "m" // Meter
    weight = "kg" // Kilogram
    area = `${this.length}2` // Meter Squared
    volume = `${this.length}3` // Meter Cubed 
    liquidVolume = `${this.length}3` // Meter Cubed 
    speed = `${this.length}/${this.time}` // Meter Per Second
    acceleration = `${this.length}/${this.time}2` // Meter Per Second Squared
    temperature = "k" // Kelvin
    electricCurrent = "a" // Ampere
    spoon = "tbsp" // Tablespoon

    // JSON of lists of units function is compatible with
    
    timeUnits = [].concat(...Object.values(units.timeUnits))
    lengthUnits = [].concat(...Object.values(units.lengthUnits))
    weightUnits = [].concat(...Object.values(units.weightUnits))
    liquidVolumeUnits = [].concat(...Object.values(units.liquidVolumeUnits))
    temperatureUnits = [].concat(...Object.values(units.temperatureUnits))
    electricCurrentUnits = [].concat(...Object.values(units.electricCurrentUnits))
    spoonUnits = [].concat(...Object.values(units.spoonUnits))

    constructor(){
        // SI Units already the base value
    }

    // Functions to change the units convertText(text) changes the units to
    // Units should be a string and included in the available list of units 

    /**
    * Sets the unit of time that convertText() should convert to
    *
    * @param {string} time  The unit of time
    */
    setUnitTime(time) {
        if(typeof time != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.timeUnits.includes(time.toLowerCase())){
            throw new InvalidUnitException(`Input ${time} is not a time unit!`);
        } else {       
            this.time = this.#resolveAliasesTemperature(time.toLowerCase());
        }
    }

    /**
    * Sets the unit of length that convertText() should convert to
    *
    * @param {string} length  The unit of length
    */
    setUnitLength(length) {
        if(typeof length != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.lengthUnits.includes(length.toLowerCase())){
            throw new InvalidUnitException(`Input ${length} is not a length unit!`);
        } else {            
            this.length = this.#resolveAliasesLength(length.toLowerCase());
        }
    }

    /**
    * Sets the unit of weight that convertText() should convert to
    *
    * @param {string} weight  The unit of weight
    */
    setUnitWeight(weight) {
        if(typeof weight != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.weightUnits.includes(weight.toLowerCase())){
            throw new InvalidUnitException(`Input ${weight} is not a mass unit!`);
        } else {       
            this.mass = this.#resolveAliasesWeight(weight.toLowerCase());
        }
    }

    /**
    * Sets the unit of liquid volume that convertText() should convert to
    *
    * @param {string} liquidVolume The unit of liquid volume
    */
    setUnitLiquidVolume(liquidVolume) {
        if(typeof liquidVolume != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.liquidVolumeUnits.includes(liquidVolume.toLowerCase())){
            throw new InvalidUnitException(`Input ${liquidVolume} is not a liquid volume unit!`);
        } else {       
            this.mass = this.#resolveAliasesLiquidVolume(liquidVolume.toLowerCase());
        }
    }

    /**
    * Sets the unit of temperature volume that convertText() should convert to
    *
    * @param {string} temperature The unit of temperature
    */
    setUnitTemperature(temperature) {
        if(typeof temperature  != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.temperatureUnits.includes(temperature.toLowerCase())){
            throw new InvalidUnitException(`Input ${temperature} is not a temperature unit!`);
        } else{       
            this.temperature = this.#resolveAliasesTemperature(temperature.toLowerCase());
        }
    }

    /**
    * Sets the unit of electric current volume that convertText() should convert to
    *
    * @param {string} electricCurrent The unit of electric current
    */
    setUnitElectricCurrent(electricCurrent) {
        if(typeof electricCurrent != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.electricCurrentUnits.includes(electricCurrent.toLowerCase())){
            throw new InvalidUnitException(`Input ${electricCurrent} is not an electric current unit!`);
        } else{       
            this.electricCurrent = this.#resolveAliasesElectricCurrent(electricCurrent.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    *
    * @param {string} spoon The unit of spoon
    */
    setUnitSpoon(spoon) {
        if(typeof spoon != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.spoonUnits.includes(spoon.toLowerCase())){
            throw new InvalidUnitException(`Input ${spoon} is not a spoon unit!`);
        } else{       
            this.spoon = this.#resolveAliasesSpoon(spoon.toLowerCase());
        }
    }

    #resolveAliasesTime(unit) {
        if(units.timeUnits.day.includes(unit)) {unit = "day";}
        else if(units.timeUnits.h.includes(unit)) {unit = "h";}
        else if(units.timeUnits.min.includes(unit)) {unit = "min";}
        else if(units.timeUnits.ms.includes(unit)) {unit = "ms";}
        else if(units.timeUnits.s.includes(unit)) {unit = "s";}
        return unit;
    }

    #resolveAliasesLength(unit) {
        if(units.lengthUnits.cm.includes(unit)) { unit = "cm";}
        else if(units.lengthUnits.ft.includes(unit)) { unit = "ft";}
        else if(units.lengthUnits.in.includes(unit)) { unit = "in";}
        else if(units.lengthUnits.km.includes(unit)) { unit = "km";}
        else if(units.lengthUnits.m.includes(unit)) { unit = "m";}
        else if(units.lengthUnits.mi.includes(unit)) { unit = "mi";} 
        else if(units.lengthUnits.mm.includes(unit)) { unit = "mm";}
        else if(units.lengthUnits.yd.includes(unit)) { unit = "yd";}
        return unit;
    }

    #resolveAliasesWeight(unit) {
        if(units.weightUnits.g.includes(unit)) {unit = "g";}
        else if(units.weightUnits.kg.includes(unit)) {unit = "kg";}
        else if(units.weightUnits.lb.includes(unit)) {unit = "lb";}
        else if(units.weightUnits.mg.includes(unit)) {unit = "mg";}
        else if(units.weightUnits.oz.includes(unit)) {unit = "oz";}
        else if(units.weightUnits.ton.includes(unit)) {unit = "ton";}
        else if(units.weightUnits.tonnes.includes(unit)) {unit = "tonnes";}
        return unit;
    }

    #resolveAliasesLiquidVolume(unit) {
        if(units.liquidVolumeUnits.cup.includes(unit)) {unit = "cup";}
        else if(units.liquidVolumeUnits.cm3.includes(unit)) {unit = "cm3";}
        else if(units.liquidVolumeUnits.fl_oz.includes(unit)) {unit = "fl_oz";}
        else if(units.liquidVolumeUnits.gal.includes(unit)) {unit = "gal";}
        else if(units.liquidVolumeUnits.l.includes(unit)) {unit = "l";}
        else if(units.liquidVolumeUnits.m3.includes(unit)) {unit = "m3";}
        else if(units.liquidVolumeUnits.ml.includes(unit)) {unit = "ml";}
        else if(units.liquidVolumeUnits.mm3.includes(unit)) {unit = "mm3";}
        return unit;
    }

    #resolveAliasesTemperature(unit) {
        if(units.temperatureUnits.C.includes(unit)) {unit = "c"; }
        else if(units.temperatureUnits.K.includes(unit)) {unit = "k";}
        else if(units.temperatureUnits.F.includes(unit)) {unit = "f"; }
        return unit;
    }

    #resolveAliasesElectricCurrent(unit) {
        if(units.electricCurrentUnits.A.includes(unit)) {unit = "A"; }
        else if(units.electricCurrentUnits.kA.includes(unit)) {unit = "kA";} 
        else if(units.electricCurrentUnits.mA.includes(unit)) {unit = "mA";} 
        return unit;
    }

    #resolveAliasesSpoon(unit) {
        if(units.spoonUnits.tbsp.includes(unit)) {unit = "tbsp";} 
        else if(units.spoonUnits.tsp.includes(unit)) {unit = "tsp";} 
        return unit;
    }

    /**
    * Converts the values
    *@param {number} value The value of the input
    * @param {string} unit The unit of the input
    */
    #convertUnitsToSelected(value, unit) {
        const numberAndUnit = unit; 
        unit = unit.replace(/[0-9\.°']/g, '').trim();


        const cu = new convertUnits()
        if(this.timeUnits.includes(unit)){ // case time units
            
            unit = this.#resolveAliasesTime(unit);

            if(unit == this.time) {return numberAndUnit}
            return cu.convertTime(value, unit, this.time); 
        }
        if(this.lengthUnits.includes(unit)){ // case length units

            unit = this.#resolveAliasesLength(unit);

            if(unit == this.length) {return "" + numberAndUnit}           
            return cu.convertLength(value, unit, this.length);
        }
        if(this.weightUnits.includes(unit)){ // case weight units

            unit = this.#resolveAliasesWeight(unit);
    
            if(unit == this.weight) {return "" + numberAndUnit}
            return cu.convertWeight(value, unit, this.weight);
        }
        if(this.liquidVolumeUnits.includes(unit)){ // case liquid volume units

            unit = this.#resolveAliasesLiquidVolume(unit);
           
            if(unit == this.liquidVolume) {return value}
            return cu.convertLiquidVolume(value, unit, this.liquidVolume);
        }
        if(this.temperatureUnits.includes(unit)){ // case temperature units
 
            unit = this.#resolveAliasesTemperature(unit);
            
            if(unit == this.temperature) {return numberAndUnit}
            return cu.convertTempertaure(value, unit, this.temperature);
        }
        if(this.electricCurrentUnits.includes(unit)){ // case electric current units
            
            unit = this.#resolveAliasesElectricCurrent(unit);

            if(unit == this.electricCurrent) {return numberAndUnit}
            return cu.convertElectricCurrent(value, unit, this.electricCurrent);
        }
        if(this.spoonUnits.includes(unit)){ // case spoon units
           
            unit = this.#resolveAliasesSpoon(unit);
            
            if(unit == this.spoon) {return numberAndUnit}
            return cu.convertSpoon(value, unit, this.spoon);
        }
    }


    #roundNumbers(value) {
        const regex = /(\d+\.\d{4,})/g;
        const matches = String(value).match(regex);
        if (matches) {
            matches.forEach(num => {
                const rounded = parseFloat(num).toFixed(3);
                value = value.replace(num, rounded);
            });
        }
        return value;
    }

    /* CODE TO GET REGEX
    let regExUnits = ""
    regExUnits += `${Object.values(this.timeUnits).flat().join('|')}`
    regExUnits + `|${Object.values(this.lengthUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.weightUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.temperatureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.currencyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.spoonUnits).flat().join('|')}`
    console.log(regExUnits)
    */

    /**
    * Converts text to specified units
    *
    * @param {string} text  The text to convert
    * @returns {string} Text with converted values and units
    */
    convertText(text) {
        if(typeof text != 'string'){
            throw 'Text should be a string!';
        }

        // regex to detect numbers followed by units
        // find all the units in the text using the regex pattern
        const regex = new RegExp(/(\d*\.?\d+)(?:\s*)(milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|milimeters|milimeter|mm|centimeters|centimeter|cm|inches|inch|in|feet|foot|ft|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|miligrams|miligram|mg|grams|gram|g|ounces|ounce|ozs|oz|pounds|pound|lbs|lb|kilograms|kilogram|kg|tonnes|tonne|tn|tons|ton|t|milimeters cubed|milimeter cubed|mm3|centimeters cubed|centimeter cubed|cm3|meters cubed|meter cubed|m3|milliliters|milliliter|ml|liters|liter|l|quarts|quart|qt|fluid ounces|fluid ounce|fl ozs|fl oz|cups|cup|gallons|gallon|gal|kelvins|kelvin|k|celsius|c|fahrenheit|f|milliamperes|milliampere|ma|amperes|ampere|a|kiloamperes|kiloampere|ka|teaspoons|teaspoon|tea spoon|tsp|tablespoons|tablespoons|table spoon|tbsp|pi|°C|°F|°K|C|F|K|(\d*)(?:'(\d+)(?:\"|in|inch|inches)?|ft|foot|feet))(?!\w)/g)
        const units = text.match(regex);

        // if no units are found, return the original text
        if (!units) {
            return text;
        } 

        // loop through each unit found and convert it to its equivalent unit value 
        let start = 0;
        let index = 0;
        units.forEach((unit) => {
            // extract the numeric value and unit without the plural suffix
            let value = parseFloat(unit);
            if(unit.includes("\"") && unit.includes("'")) {
                const measurements = unit.split("'")
                value = parseFloat(measurements[0])*12 + parseFloat(measurements[1]);
            } 

            // convert the unit to its equivalent SI value using the conversion factor dictionary
            let newValue =  this.#convertUnitsToSelected(value, unit.toLowerCase());
            
            newValue = this.#roundNumbers(newValue);

            // replace the original unit with the SI unit in the text
            text = text.replace(unit, newValue);
        });
        return text;
        
    }
}

export default convertText