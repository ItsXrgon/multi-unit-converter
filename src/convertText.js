import units from "./units.json"

class convertText {
    time = "s" // Seconds
    length = "m" // Meter
    mass = "kg" // Kilogram
    area = `${length}2` // Meter Squared
    volume = `${length}3` // Meter Cubed 
    liquidVolume = `${length}3` // Meter Cubed 
    speed = `${length}/${time}` // Meter Per Second
    acceleration = `${length}/${time}2` // Meter Per Second Squared
    temperature = "K" // Kelvin
    electricCurrent = "A" // Ampere
    currency = "USD" // Dollars
    spoon = "tbsp"

    ({timeUnits, lengthUnits, massUnits, temperatureUnits, electricCurrentUnits, currencyUnits, spoonUnits} = units);

    
    constructor(){
        // SI Units already the base value
    }

    setUnitTime(time) {
        const allUnits = [].concat(...Object.values(timeUnits))
        if(typeof time != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(time.lower())){
            throw 'Input is not a time unit!';
        } else {       
            this.time = time
        }
        return 1
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

    setUnitMass(mass) {
        const allUnits = [].concat(...Object.values(massUnits))
        if(typeof mass != string){
            throw 'Unit should be a string!';
        } else if(!allUnits.includes(mass.lower())){
            throw 'Input is not a mass unit!';
        } else {       
            this.mass = mass
        }
    }

    setUnitLiquidVolume(liquidVolume) {
        const allUnits = [].concat(...Object.values(liquidVolume))
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

    convertText(text) {
        if(typeof text != string){
            throw 'Text should be a string!';
        } else {

            const re = new RegExp(`/(\s+)|(\d+)\/(\d+)|(\d*)([.,])(\d+)|(\d+)|(km|cm|mm|m|ft|in|pi|po|'|")/gi`);

            let words = re.exec(text) 
            for(let i=0; i<words.length-2;i++) {
                console.log(words[i])
            } 
        }
        
    }
    
}

export default convertText