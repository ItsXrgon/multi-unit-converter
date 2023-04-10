"use strict";
const units = require("./units.json");
const convertUnits = require("./convertUnits.js");
const InvalidUnitException = require('./Exceptions/InvalidUnitException').InvalidUnitException;
const InvalidPrecisionValueException = require('./Exceptions/InvalidPrecisionValueException').InvalidPrecisionValueException;
const InvalidTemplateException = require('./Exceptions/InvalidTemplateException').InvalidTemplateException;

/**
* Multi Unit Converter class to handle converting texts and setting units
* @param {string} time The unit of time
* @param {string} length The unit of length
* @param {string} weight The unit of weight
* @param {string} area The unit of area
* @param {string} volume The unit of volume
* @param {string} liquidVolume The unit of liquid volume
* @param {string} speed The unit of speed
* @param {string} acceleration The unit of acceleration
* @param {string} temperature The unit of temperature
* @param {string} electricCurrent The unit of electric current
* @param {string} spoon The unit of spoon
* @param {string} pressure The unit of pressure
* @param {string} energy The unit of energy
* @param {string} frequency The unit of frequency
*
* @param {number} precision The sig figs to round to
*/
class MultiUnitConverter {

    precision = 3; // sig figs to round to

    time = "s" // Seconds
    length = "m" // Meter
    weight = "kg" // Kilogram
    area = `m2` // Meter Squared
    volume = `m3` // Meter Cubed 
    liquidVolume = `m3` // Meter Cubed 
    speed = `m/s` // Meter Per Second
    acceleration = `m/s2` // Meter Per Second Squared
    temperature = "k" // Kelvin
    electricCurrent = "a" // Ampere
    spoon = "tbsp" // Tablespoon
    pressure = "pa" // Pascal
    energy = "j" // Joules
    frequency = "hz" // Hertz


    // JSON of lists of units function is compatible with
    
    #timeUnits = [].concat(...Object.values(units.timeUnits))
    #lengthUnits = [].concat(...Object.values(units.lengthUnits))
    #weightUnits = [].concat(...Object.values(units.weightUnits))
    #liquidVolumeUnits = [].concat(...Object.values(units.liquidVolumeUnits))
    #temperatureUnits = [].concat(...Object.values(units.temperatureUnits))
    #electricCurrentUnits = [].concat(...Object.values(units.electricCurrentUnits))
    #spoonUnits = [].concat(...Object.values(units.spoonUnits))
    #pressureUnits = [].concat(...Object.values(units.pressureUnits))
    #energyUnits = [].concat(...Object.values(units.energyUnits))
    #frequencyUnits = [].concat(...Object.values(units.frequencyUnits))
    #areaUnits = [].concat(...Object.values(units.areaUnits))
    #volumeUnits = [].concat(...Object.values(units.volumeUnits))

    /**
    * Creats an instance of MultiUnitConverter class
    */
    constructor(){
        // SI Units already the base value
    }

    // Functions to change the units convertText(text) changes the units to
    // Units should be a string and included in the available list of units 

    /**
    * Sets the sig figs of the numbers that convertText() outputs
    * @param {number} precision  The sig figs
    */
    setPrecision(precision) {
        if(typeof precision != 'number'){
            throw new InvalidPrecisionValueException('Precision should be a number!');
        } else if(precision <= 0){
            throw new InvalidPrecisionValueException('Precision should 1 or more!');
        }else {       
            this.precision = precision;
        }
    }

    /**
    * Sets a template for the units that convertText() should convert to
    * @param {string} template The template
    */
    setAllUnits(template) {
        switch(template.toLowerCase()){
            case("metric"): 
                this.length = "m";
                this.weight = "g";
                this.liquidVolume = "l";
                this.area = "m2";
                this.volume = "m3";
                this.speed = "mps";
                break;
            case("imperial"): 
                this.length = "in";
                this.weight = "lb";
                this.liquidVolume = "fl_oz";
                this.area = "ft2";
                this.volume = "ft3";
                this.speed = "mph";
                break;
            case("us"): 
                this.length = "ft";
                this.weight = "lb";
                this.liquidVolume = "fl_oz";
                this.area = "ft2";
                this.speed = "mph";
                break;
            case("recipe"):
                this.spoon = "tbsp"
                this.weight = "g";
                this.liquidVolume = "cup";
                break;
            default:
                throw new InvalidTemplateException("Not an available template!");
        }
    }

    /**
    * Sets the unit of time that convertText() should convert to
    * @param {string} time  The unit of time
    */
    setUnitTime(time) {
        if(typeof time != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#timeUnits.includes(time.toLowerCase())){
            throw new InvalidUnitException(`Input ${time} is not a time unit!`);
        } else {       
            this.time = this.#resolveAliasesTemperature(time.toLowerCase());
        }
    }

    /**
    * Sets the unit of length that convertText() should convert to
    * @param {string} length  The unit of length
    */
    setUnitLength(length) {
        if(typeof length != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#lengthUnits.includes(length.toLowerCase())){
            throw new InvalidUnitException(`Input ${length} is not a length unit!`);
        } else {            
            this.length = this.#resolveAliasesLength(length.toLowerCase());
        }
    }

    /**
    * Sets the unit of weight that convertText() should convert to
    * @param {string} weight  The unit of weight
    */
    setUnitWeight(weight) {
        if(typeof weight != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#weightUnits.includes(weight.toLowerCase())){
            throw new InvalidUnitException(`Input ${weight} is not a weight unit!`);
        } else {       
            this.weight = this.#resolveAliasesWeight(weight.toLowerCase());
        }
    }

    /**
    * Sets the unit of liquid volume that convertText() should convert to
    * @param {string} liquidVolume The unit of liquid volume
    */
    setUnitLiquidVolume(liquidVolume) {
        if(typeof liquidVolume != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#liquidVolumeUnits.includes(liquidVolume.toLowerCase())){
            throw new InvalidUnitException(`Input ${liquidVolume} is not a liquid volume unit!`);
        } else {       
            this.liquidVolume = this.#resolveAliasesLiquidVolume(liquidVolume.toLowerCase());
        }
    }

    /**
    * Sets the unit of temperature volume that convertText() should convert to
    * @param {string} temperature The unit of temperature
    */
    setUnitTemperature(temperature) {
        if(typeof temperature  != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#temperatureUnits.includes(temperature.toLowerCase())){
            throw new InvalidUnitException(`Input ${temperature} is not a temperature unit!`);
        } else{       
            this.temperature = this.#resolveAliasesTemperature(temperature.toLowerCase());
        }
    }

    /**
    * Sets the unit of electric current volume that convertText() should convert to
    * @param {string} electricCurrent The unit of electric current
    */
    setUnitElectricCurrent(electricCurrent) {
        if(typeof electricCurrent != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#electricCurrentUnits.includes(electricCurrent.toLowerCase())){
            throw new InvalidUnitException(`Input ${electricCurrent} is not an electric current unit!`);
        } else{       
            this.electricCurrent = this.#resolveAliasesElectricCurrent(electricCurrent.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    * @param {string} spoon The unit of spoon
    */
    setUnitSpoon(spoon) {
        if(typeof spoon != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#spoonUnits.includes(spoon.toLowerCase())){
            throw new InvalidUnitException(`Input ${spoon} is not a spoon unit!`);
        } else{       
            this.spoon = this.#resolveAliasesSpoon(spoon.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    * @param {string} spoon The unit of spoon
    */
    setUnitPressure(pressure) {
        if(typeof pressure != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#pressureUnits.includes(pressure.toLowerCase())){
            throw new InvalidUnitException(`Input ${pressure} is not a spoon unit!`);
        } else{       
            this.pressure = this.#resolveAliasesPressure(pressure.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    * @param {string} spoon The unit of spoon
    */
    setUnitEnergy(energy) {
        if(typeof energy != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#energyUnits.includes(energy.toLowerCase())){
            throw new InvalidUnitException(`Input ${energy} is not a spoon unit!`);
        } else{       
            this.energy = this.#resolveAliasesEnergy(energy.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    * @param {string} spoon The unit of spoon
    */
    setUnitFrequency(frequency) {
        if(typeof frequency != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#frequencyUnits.includes(frequency.toLowerCase())){
            throw new InvalidUnitException(`Input ${frequency} is not a spoon unit!`);
        } else{       
            this.frequency = this.#resolveAliasesFrequency(frequency.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    *
    * @param {string} spoon The unit of spoon
    */
    setUnitArea(area) {
        if(typeof area != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#areaUnits.includes(area.toLowerCase())){
            throw new InvalidUnitException(`Input ${area} is not a spoon unit!`);
        } else{       
            this.area = this.#resolveAliasesArea(area.toLowerCase());
        }
    }

    /**
    * Sets the unit of spoon volume that convertText() should convert to
    *
    * @param {string} spoon The unit of spoon
    */
    setUnitVolume(volume) {
        if(typeof volume != 'string'){
            throw 'Unit should be a string!';
        } else if(!this.#volumeUnits.includes(volume.toLowerCase())){
            throw new InvalidUnitException(`Input ${volume} is not a spoon unit!`);
        } else{       
            this.volume = this.#resolveAliasesVolume(volume.toLowerCase());
        }
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesTime(unit) {
        if(units.timeUnits.day.includes(unit)) {unit = "day";}
        else if(units.timeUnits.h.includes(unit)) {unit = "h";}
        else if(units.timeUnits.min.includes(unit)) {unit = "min";}
        else if(units.timeUnits.ms.includes(unit)) {unit = "ms";}
        else if(units.timeUnits.s.includes(unit)) {unit = "s";}
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
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

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
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

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
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

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesTemperature(unit) {
        if(units.temperatureUnits.C.includes(unit)) {unit = "c"; }
        else if(units.temperatureUnits.K.includes(unit)) {unit = "k";}
        else if(units.temperatureUnits.F.includes(unit)) {unit = "f"; }
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesElectricCurrent(unit) {
        if(units.electricCurrentUnits.A.includes(unit)) {unit = "A"; }
        else if(units.electricCurrentUnits.kA.includes(unit)) {unit = "kA";} 
        else if(units.electricCurrentUnits.mA.includes(unit)) {unit = "mA";} 
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesSpoon(unit) {
        if(units.spoonUnits.tbsp.includes(unit)) {unit = "tbsp";} 
        else if(units.spoonUnits.tsp.includes(unit)) {unit = "tsp";} 
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesPressure(unit) {
        if(units.pressureUnits.Pa.includes(unit)) {unit = "pa"; }
        else if(units.pressureUnits.kPa.includes(unit)) {unit = "kpa";}
        else if(units.pressureUnits.MPa.includes(unit)) {unit = "mpa"; }
        else if(units.pressureUnits.atm.includes(unit)) {unit = "atm"; }
        else if(units.pressureUnits.psi.includes(unit)) {unit = "psi"; }
        else if(units.pressureUnits.bar.includes(unit)) {unit = "bar"; }
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesEnergy(unit) {
        if(units.energyUnits.J.includes(unit)) {unit = "j"; }
        else if(units.energyUnits.kJ.includes(unit)) {unit = "kj";}
        else if(units.energyUnits.MJ.includes(unit)) {unit = "mj"; }
        else if(units.energyUnits.kWh.includes(unit)) {unit = "kwh"; }
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesFrequency(unit) {
        if(units.frequencyUnits.Hz.includes(unit)) {unit = "hz"; }
        else if(units.frequencyUnits.kHz.includes(unit)) {unit = "khz";}
        else if(units.frequencyUnits.MHz.includes(unit)) {unit = "mhz"; }
        else if(units.frequencyUnits.GHz.includes(unit)) {unit = "ghz"; }
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesArea(unit) {
        if(units.areaUnits.mm2.includes(unit)) {unit = "mm2"; }
        else if(units.areaUnits.cm2.includes(unit)) {unit = "cm2";}
        else if(units.areaUnits.m2.includes(unit)) {unit = "m2"; }
        else if(units.areaUnits.km2.includes(unit)) {unit = "km2"; }
        else if(units.areaUnits.in2.includes(unit)) {unit = "in2"; }
        else if(units.areaUnits.ft2.includes(unit)) {unit = "ft2";}
        else if(units.areaUnits.yd2.includes(unit)) {unit = "yd2"; }
        else if(units.areaUnits.ac.includes(unit)) {unit = "ac"; }
        else if(units.areaUnits.ha.includes(unit)) {unit = "ha"; }
        return unit;
    }

    /**
    * Resolve alias of unit
    * @param {string} unit  The input unit
    * @returns {string} The output unit
    */
    #resolveAliasesVolume(unit) {
        if(units.volumeUnits.mm3.includes(unit)) {unit = "mm3"; }
        else if(units.volumeUnits.cm3.includes(unit)) {unit = "cm3";}
        else if(units.volumeUnits.m3.includes(unit)) {unit = "m3"; }
        else if(units.volumeUnits.km3.includes(unit)) {unit = "km3"; }
        else if(units.volumeUnits.in3.includes(unit)) {unit = "in3"; }
        else if(units.volumeUnits.ft3.includes(unit)) {unit = "ft3";}
        else if(units.volumeUnits.yd3.includes(unit)) {unit = "yd3"; }
        return unit;
    }

    /**
    * Converts the values
    * @param {number} value The value of the input
    * @param {string} unit The unit of the input
    * @returns {string} converted unit string
    */
    #convertUnitsToSelected(value, unit) {
        const numberAndUnit = unit; 
        unit = unit.replace(/[0-9\.°']/g, '').trim();

        const cu = new convertUnits()
        if(this.#timeUnits.includes(unit)){ // case time units
            
            unit = this.#resolveAliasesTime(unit);

            if(unit == this.time) {return numberAndUnit}
            return cu.convertTime(value, unit, this.time); 
        }
        if(this.#lengthUnits.includes(unit)){ // case length units

            unit = this.#resolveAliasesLength(unit);

            if(unit == this.length) {return "" + numberAndUnit}           
            return cu.convertLength(value, unit, this.length);
        }
        if(this.#weightUnits.includes(unit)){ // case weight units

            unit = this.#resolveAliasesWeight(unit);
    
            if(unit == this.weight) {return "" + numberAndUnit}
            return cu.convertWeight(value, unit, this.weight);
        }
        if(this.#liquidVolumeUnits.includes(unit)){ // case liquid volume units

            unit = this.#resolveAliasesLiquidVolume(unit);
           
            if(unit == this.liquidVolume) {return value}
            return cu.convertLiquidVolume(value, unit, this.liquidVolume);
        }
        if(this.#temperatureUnits.includes(unit)){ // case temperature units
 
            unit = this.#resolveAliasesTemperature(unit);
            
            if(unit == this.temperature) {return numberAndUnit}
            return cu.convertTempertaure(value, unit, this.temperature);
        }
        if(this.#electricCurrentUnits.includes(unit)){ // case electric current units
            
            unit = this.#resolveAliasesElectricCurrent(unit);

            if(unit == this.electricCurrent) {return numberAndUnit}
            return cu.convertElectricCurrent(value, unit, this.electricCurrent);
        }
        if(this.#spoonUnits.includes(unit)){ // case spoon units
           
            unit = this.#resolveAliasesSpoon(unit);
            
            if(unit == this.spoon) {return numberAndUnit}
            return cu.convertSpoon(value, unit);
        }
        if(this.#energyUnits.includes(unit)){ // case energy units
           
            unit = this.#resolveAliasesEnergy(unit);
            
            if(unit == this.energy) {return numberAndUnit}
            return cu.convertEnergy(value, unit, this.energy);
        }
        if(this.#frequencyUnits.includes(unit)){ // case frequency units
           
            unit = this.#resolveAliasesFrequency(unit);
            
            if(unit == this.frequency) {return numberAndUnit}
            return cu.convertFrequency(value, unit, this.frequency);
        }
        if(this.#volumeUnits.includes(unit)){ // case volume units
           
            unit = this.#resolveAliasesVolume(unit);
            
            if(unit == this.volume) {return numberAndUnit}
            return cu.convertVolume(value, unit, this.volume);
        }
        if(this.#areaUnits.includes(unit)){ // case area units
           
            unit = this.#resolveAliasesArea(unit);
            
            if(unit == this.area) {return numberAndUnit}
            return cu.convertArea(value, unit, this.area);
        }
    }


    /**
    * Rounds numbers to decimal 3 places
    * @param {number} value  The number to round
    * @returns {number} Rounded number
    */
    #roundNumbers(value) {
        const regex = /(\d+\.\d{4,})/g;
        const matches = String(value).match(regex);
        if (matches) {
            matches.forEach(num => {
                const rounded = parseFloat(parseFloat(num).toPrecision(this.precision))
                value = value.replace(num, rounded);
            });
        }
        return value;
    }

    /* CODE TO GET REGEX
    let regExUnits = "/(\d*\.?\d+)(?:\s*)"
    regExUnits += `(${Object.values(this.timeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.lengthUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.weightUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.temperatureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.spoonUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.pressureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.energyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.frequencyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.volumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.areaUnits).flat().join('|')}`
    regExUnits += "|(\d*)(?:'(\d+)(?:\"|in|inch|inches)?|ft|foot|feet))(?!\w)/g"
    console.log(regExUnits)
    */

    /**
    * Converts text to specified units
    * @param {string} text  The text to convert
    * @returns {string} Text with converted values and units
    */
    convertText(text) {
        if(typeof text != 'string'){
            throw 'Text should be a string!';
        }
       
        // regex to detect numbers followed by units
        // find all the units in the text using the regex pattern
        const regex = new RegExp(/(\d*\.?\d+)(?:\s*)(miliseconds|milisecond|ms|seconds|second|s|sec|secs|minutes|minute|min|hours|hour|h|days|day|d|milimeters|milimeter|mm|mms|centimeters|centimeter|cm|cms|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|miligrams|miligram|mg|grams|gram|g|ounces|ounce|ozs|oz|pounds|pound|lbs|lb|kilograms|kilogram|kg|tonnes|tonne|tn|tons|ton|t|milimeters cubed|milimeter cubed|mm3|mm³|centimeters cubed|centimeter cubed|cm3|cm³|meters cubed|meter cubed|m3|m³|milliliters|milliliter|ml|liters|liter|l|fluid ounces|fluid ounce|fl ozs|fl oz|cups|cup|gallons|gallon|gal|milliamperes|milliampere|ma|amperes|ampere|a|kiloamperes|kiloampere|ka|teaspoons|teaspoon|tea spoon|tsp|tablespoons|tablespoons|table spoon|tbsp|pascals|Pascal|pa|kilopascals|Kilopascal|kpa|megapascals|Megapascal|mpa|atmospheres|atmosphere|atm|pounds per square inch|pound per square inch|psi|bar|joules|joule|j|kilojoules|kilojoule|kJ|megajoules|megajoule|mJ|kilowatt-hours|kilowatt-hour|kwh|hertz|hertz|Hz|kilohertz|kilohertz|khz|megahertz|megahertz|mhz|gigahertz|gigahertz|ghz|cubic millimeters|cubic millimeter|millimeter cubed|millimeters cubed|mm3|mm³|cubic centimeters|cubic centimeter|centimeter cubed|centimeters cubed|cm3|cm³|cubic meters|cubic meter|meter cubed|meters cubed|m3|m³|cubic inches|cubic inch|inch cubed|inches cubed|in3|in³|cubic feet|cubic foot|ft3|ft³|cubic yards|cubic yard|yard cubed|yards cubed|yd3|yd³|square millimeters|square millimeter|millimeter squared|millimeters squared|mm2|mm²|square centimeters|square centimeter|centimeter squared|centimeters squared|cm²|cm²|square meters|square meter|meter squared|meters squared|m2|m²|square kilometers|square kilometer|kilometers squared|kilometerss squared|km²|km²|square inches|square inch|inche squared|inches squared|in2|in²|square feet|square foot|ft2|ft²|square yards|square yard|yd²2|yd²|acres|acre|ac|hectares|hectare|ha|°C|°F|°K|C|F|K|in|inch|inches|ft|foot|feet|(\d*)(?:'(\d+)(?:\"|in|inch|inches)?|ft|foot|feet))(?!\w)/gi)
        const units = text.match(regex);
        // if no units are found, return the original text
        if (!units) {
            return text;
        } 

        // loop through each unit found and convert it to its equivalent unit value 
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

module.exports = MultiUnitConverter;