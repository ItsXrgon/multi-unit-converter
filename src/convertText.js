import units from "./units.json"
import convertUnits from './convertUnits'

class convertText {
    time = "s" // Seconds
    length = "m" // Meter
    weight = "kg" // Kilogram
    area = `${length}2` // Meter Squared
    volume = `${length}3` // Meter Cubed 
    liquidVolume = `${length}3` // Meter Cubed 
    speed = `${length}/${time}` // Meter Per Second
    acceleration = `${length}/${time}2` // Meter Per Second Squared
    temperature = "K" // Kelvin
    electricCurrent = "A" // Ampere
    currency = "USD" // Dollars
    spoon = "tbsp" // Tablespoon

    // JSON of lists of units function is compatible with
    ({timeUnits, lengthUnits, weightUnits, temperatureUnits, electricCurrentUnits, spoonUnits, currencyUnits} = units);
    
    constructor(){
        // SI Units already the base value
    }

    // Functions to change the units convertText(text) changes the units to
    // Units should be a string and included in the available list of units 

    setUnitTime(time) {
        const allUnits = [].concat(...Object.values(timeUnits))
        if(typeof time != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(time.lower())){
            throw 'Input is not a time unit!';
        } else {       
            this.time = time
        }
    }

    setUnitLength(length) {
        const allUnits = [].concat(...Object.values(lengthUnits))
        if(typeof length != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(length.lower())){
            throw 'Input is not a length unit!';
        } else {            
            this.length = length
        }
    }

    setUnitWeight(weight) {
        const allUnits = [].concat(...Object.values(weightUnits))
        if(typeof weight != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(weight.lower())){
            throw 'Input is not a mass unit!';
        } else {       
            this.mass = mass
        }
    }

    setUnitLiquidVolume(liquidVolume) {
        const allUnits = [].concat(...Object.values(liquidVolumeUnits))
        if(typeof liquidVolume != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(liquidVolume.lower())){
            throw 'Input is not a liquid volume unit!';
        } else {       
            this.mass = mass
        }
    }

    setUnitTemperature(temperature) {
        const allUnits = [].concat(...Object.values(temperatureUnits))
        if(typeof temperature  != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(temperature.lower())){
            throw 'Input is not a temperature unit!';
        } else{       
            this.temperature = temperature
        }
    }

    setUnitElectricCurrent(electricCurrent) {
        const allUnits = [].concat(...Object.values(electricCurrentUnits))
        if(typeof electricCurrent != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(electricCurrent.lower())){
            throw 'Input is not an electric current unit!';
        } else{       
            this.electricCurrent = electricCurrent
        }
    }

    setUnitSpoon(spoon) {
        const allUnits = [].concat(...Object.values(spoonUnits))
        if(typeof spoon != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(spoon.lower())){
            throw 'Input is not a spoon unit!';
        } else{       
            this.spoon = spoon
        }
    }

    setUnitCurrency(currency) {
        const allUnits = [].concat(...Object.values(currencyUnits))
        if(typeof currency != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(currency.lower())){
            throw 'Input is not a currency unit!';
        } else{       
            this.currency = currency
        }
    }

    convertText(text) {
        if(typeof text != string){
            throw 'Text should be a string!';
        } else {

            const re = new RegExp(
                `/(\s+)|(\d+)\/(\d+)|(\d*)([.,])(\d+)|(\d+)
                |(${Object.values(timeUnits).flat().join('|')}
                |${Object.values(lengthUnits).flat().join('|')}
                |${Object.values(weightUnits).flat().join('|')}
                |${Object.values(liquidVolumeUnits).flat().join('|')}
                |${Object.values(temperatureUnits).flat().join('|')}
                |${Object.values(electricCurrentUnits).flat().join('|')}
                |${Object.values(currencyUnits).flat().join('|')}
                |${Object.values(spoonUnits).flat().join('|')}
                |pi|'|")/gi`
                // todo: add speed of waves Hz & kHz
            );  // regex to detect numbers followed by units

            let words = re.exec(text)
            for(let i=0; i<words.length-2;i++) {
                console.log(convertUnits.convertLength(2, 'm', 'cm'))
            } 
        }
        
    }
    
}

export default convertText