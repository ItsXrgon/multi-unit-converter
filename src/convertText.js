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

    ({timeUnits, lengthUnits, massUnits, temperatureUnits, electricCurrentUnits, currencyUnits} = units);

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

    setCurrency(currency) {
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
        let words = text.split(' ')
        
    }

    static convertText(text) {
        let words = text.split(' ')
    }
    
}