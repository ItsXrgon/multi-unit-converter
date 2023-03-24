const units = require("./units.json");
const converUnits = require("./convertUnits.js").converUnits;
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
        console.log(value + ' unit ' + unit)
        switch(unit) {
            case(this.timeUnits.includes(unit)): // case time units
                return converUnits.convertTime(value, unit, this.time); 
            case(this.lengthUnits.includes(unit)): // case length units
                return converUnits.convertLength(value, unit, this.time);
            case(this.weightUnits.includes(unit)): // case weight units
                return converUnits.convertWeight(value, unit, this.time);
            case(this.liquidVolumeUnits.includes(unit)): // case liquid volume units
                return converUnits.convertLiquidVolume(value, unit, this.time);
            case(this.temperatureUnits.includes(unit)): // case temperature units
                return converUnits.convertTempertaure(value, unit, this.time);
            case(this.electricCurrentUnits.includes(unit)): // case electric current units
                return converUnits.convertElectricCurrent(value, unit, this.time);
            case(this.spoonUnits.includes(unit)): // case spoon units
                return converUnits.convertSpoon(value, unit, this.time);
            case(this.currencyUnits.includes(unit)): // TO BE IMPLEMENTED
                return converUnits.convertSpoon(value, unit, this.time);
        }
    }

    convertText(text) {
        if(typeof text != 'string'){
            throw 'Text should be a string!';
        }
        let regExUnits = ""
        regExUnits += `|${Object.values(this.timeUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.lengthUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.weightUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.temperatureUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.currencyUnits).flat().join('|')}`
        regExUnits += `|${Object.values(this.spoonUnits).flat().join('|')}`
        const regex = new RegExp(`/\/\d*\.?\d*\s*(${regExUnits}|pi|'|")\b/g`);
        // regex to detect numbers followed by units
        // find all the units in the text using the regex pattern
        const units = text.match(regex);
        console.log(units)
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
            const newValue = convertUnitsToSelected(floatValue, unit);

            // replace the original unit with the SI unit in the text
            text = text.replace(new RegExp(`/${value}s?${unitWithoutPlural}`, "g"), newValue.toString());
        });

        return text;

    }
}

module.exports = convertText;