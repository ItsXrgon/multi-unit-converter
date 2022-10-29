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

    timeUnits = {
        ns: ["nanoseconds", "nanosecond", "ns"],
        ms: ["miliseconds", "milisecond", "ms"],
        s: ["seconds", "second", "s"],
        min: ["minutes", "minute", "min"],
        h: ["hours", "hour", "h"],
        day: ["days", "day", "d"],
    };

    lengthUnits = {
        mm: ["milimeters", "milimeter", "mm"],
        cm: ["centimeters", "centimeter","cm"],
        in: ["inches", "inch", "in"],
        ft: ["feet", "foot", "ft"],
        yd: ["yards", "yard", "yd"],
        m: ["meters", "meter", "m"],
        km: ["kilometers", "kilometer","km"],
        mi: ["miles", "mile", "mi"],
    };

    massUnits = {
        mg: ["miligrams", "miligram","mg"],
        g: ["grams", "gram", "g"],
        oz: ["ounces", "ounce", "ozs", "oz"],
        lb: ["pounds", "pound", "lbs", "lb"],
        kg: ["kilograms", "kilogram", "kg"],
        ton: ["tonnes"], // Imperial
        tonnes: ["ton"], // Metric
    };

    liquidVolumeUnits = {
        g: ["milliliters", "milliliter", "ml"],
        m3: ["meters cubed", "meter cubed", "m3"],
        l: ["liters", "liter","l"],
        qt: ["quarts", "quart", "qt"],
        fl_oz: ["fluid ounces", "fluid ounce", "fl ozs", "fl oz"],
        c: ["cups", "cup"],
        gal: ["gallons", "gallon", "gal"],
    };

    temperatureUnits = {
        K: ["kelvins", "kelvin", "k"],
        C: ["celsius", "c"],
        F: ["fahrenheit", "f"],
    }

    electricCurrentUnits = {
        mA: ["milliamperes", "milliampere", "ma"],
        A: ["amperes", "ampere", "a"],
        kA: ["kiloamperes", "kiloampere", "ka"],
    }

    currencyUnits = {
        USD: ["usd", "$"],
        Euro: ["euro","€"],
        GBP: ["gbp","£"],
        JPY: ["JPY","¥"],
        AED: ["AED"], // UAE dirham
        CNY: ["CNY"], // Renminbi (china)
        AUD: ["AUD"],
        CAD: ["CAD"],
        CHF: ["CHF"],
        HKD: ["HKD"],
        SGD: ["SGD"],
        SEK: ["SEK"],
        KRW: ["KRW"],
        NOK: ["NOK"],
        NZD: ["NZD"],
        INR: ["INR"],
        MXN: ["MXN"],
        TWD: ["TWD"],
        ZAR: ["ZAR"],
        EGP: ["egp",],
    }

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

    } 

}
