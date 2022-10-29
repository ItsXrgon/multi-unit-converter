class convertText {
    time = "s" // Seconds
    length = "m" // Meter
    mass = "kg" // Kilogram
    area = `${length}2` // Meter Squared
    volume = `${length}3` // Meter Cubed (same for liquid volume)
    speed = `${length}/${time}` // Meter Per Second
    acceleration = `${length}/${time}2` // Meter Per Second Squared
    temperature = "K" // Kelvin
    electricCurrent = "A" // Ampere
    thermodynamicTemperature = "K" // Kelvin
    amountOfSubstance = "mol" // Mole
    luminousIntensity = "cd" // Candela
    currency = "USD" // Dollars


    constructor(){
        // SI Units already the base value
    }

    setUnitTime(time) {
        if(typeof time != string){
            throw 'Time unit should be a string!';
        } else{       
            this.time = time
        }
    }

    setUnitLength(length) {
        if(typeof length != string){
            throw 'Length unit should be a string!';
        } else{       
            this.length = length
        }
    }

    setUnitMass(mass) {
        if(typeof mass != string){
            throw 'Mass unit should be a string!';
        } else{       
            this.mass = mass
        }
    }

    setUnitTemperature(temperature) {
        if(typeof temperature  != string){
            throw 'Temperature unit should be a string!';
        } else{       
            this.temperature = temperature
        }
    }

    setUnitElectricCurrent(electricCurrent) {
        if(typeof electricCurrent != string){
            throw 'Electric Current unit should be a string!';
        } else{       
            this.electricCurrent = electricCurrent
        }
    }

    setThermodynamicTemp(thermodynamicTemperature) {
        if(typeof thermodynamicTemperature != string){
            throw 'Thermodynamic Temperature unit should be a string!';
        } else{       
            this.thermodynamicTemperature = thermodynamicTemperature
        }
    }

    setAmountOfSubstance(amountOfSubstance) {
        if(typeof amountOfSubstance != string){
            throw 'Amount Of Substance unit should be a string!';
        } else{       
            this.amountOfSubstance = amountOfSubstance
        }
    }

    setLuminousIntensity(luminousIntensity) {
        if(typeof luminousIntensity != string){
            throw 'Luminous Intensity unit should be a string!';
        } else{       
            this.luminousIntensity = luminousIntensity
        }
    }

    setCurrency(currency) {
        if(typeof currency != string){
            throw 'Currency unit should be a string!';
        } else{       
            this.currency = currency
        }
    }


}