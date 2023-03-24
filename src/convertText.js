const units = require("./units.json");
const InvalidUnitException = require('./Exceptions/InvalidUnitException');

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
    timeUnits = units.timeUnits
    lengthUnits = units.lengthUnits
    weightUnits = units.weightUnits
    liquidVolumeUnits = units.liquidVolumeUnits
    temperatureUnits = units.temperatureUnits
    electricCurrentUnits = units.electricCurrentUnits
    spoonUnits = units.spoonUnits
    currencyUnits = units.currencyUnits

    constructor(){
        // SI Units already the base value
    }

    // Functions to change the units convertText(text) changes the units to
    // Units should be a string and included in the available list of units 

    setUnitTime(time) {
        const allUnits = [].concat(...Object.values(this.timeUnits))
        if(typeof time != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(time.toLowerCase())){
            throw new InvalidUnitException(`Input ${time} is not a time unit!`);
        } else {       
            this.time = time
        }
    }

    setUnitLength(length) {
        const allUnits = [].concat(...Object.values(this.lengthUnits))
        if(typeof length != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(length.toLowerCase())){
            throw new InvalidUnitException(`Input ${length} is not a length unit!`);
        } else {            
            this.length = length
        }
    }

    setUnitWeight(weight) {
        const allUnits = [].concat(...Object.values(this.weightUnits))
        if(typeof weight != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(weight.toLowerCase())){
            throw new InvalidUnitException(`Input ${weight} is not a mass unit!`);
        } else {       
            this.mass = mass
        }
    }

    setUnitLiquidVolume(liquidVolume) {
        const allUnits = [].concat(...Object.values(this.liquidVolumeUnits))
        if(typeof liquidVolume != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(liquidVolume.toLowerCase())){
            throw new InvalidUnitException(`Input ${liquidVolume} is not a liquid volume unit!`);
        } else {       
            this.mass = mass
        }
    }

    setUnitTemperature(temperature) {
        const allUnits = [].concat(...Object.values(this.temperatureUnits))
        if(typeof temperature  != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(temperature.toLowerCase())){
            throw new InvalidUnitException(`Input ${temperature} is not a temperature unit!`);
        } else{       
            this.temperature = temperature
        }
    }

    setUnitElectricCurrent(electricCurrent) {
        const allUnits = [].concat(...Object.values(this.electricCurrentUnits))
        if(typeof electricCurrent != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(electricCurrent.toLowerCase())){
            throw new InvalidUnitException(`Input ${electricCurrent} is not an electric current unit!`);
        } else{       
            this.electricCurrent = electricCurrent
        }
    }

    setUnitSpoon(spoon) {
        const allUnits = [].concat(...Object.values(this.spoonUnits))
        if(typeof spoon != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(spoon.toLowerCase())){
            throw new InvalidUnitException(`Input ${spoon} is not a spoon unit!`);
        } else{       
            this.spoon = spoon
        }
    }

    setUnitCurrency(currency) {
        const allUnits = [].concat(...Object.values(this.currencyUnits))
        if(typeof currency != 'string'){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(currency.toLowerCase())){
            throw new InvalidUnitException(`Input ${currency} is not a currency unit!`);
        } else{       
            this.currency = currency
        }
    }

    convertText(text) {
        if(typeof text != 'string'){
            throw 'Text should be a string!';
        } else {
            let units = ""
            units += `|${Object.values(this.timeUnits).flat().join('|')}`
            units += `|${Object.values(this.lengthUnits).flat().join('|')}`
            units += `|${Object.values(this.weightUnits).flat().join('|')}`
            units += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
            units += `|${Object.values(this.temperatureUnits).flat().join('|')}`
            units += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
            units += `|${Object.values(this.currencyUnits).flat().join('|')}`
            units += `|${Object.values(this.spoonUnits).flat().join('|')}`
            const regex = new RegExp(`/(\d+(?:\.\d+)?)\s*(${units}|pi|'|")\b/gi`);
            // regex to detect numbers followed by units
            console.log(regex);
            for(let i=0; i<3;i++) {
                //console.log(words[i])
                console.log(regex.exec(text))
            } 
        }
        
    }
    
}

module.exports = convertText;