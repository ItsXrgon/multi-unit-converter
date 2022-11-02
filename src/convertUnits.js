class convertUnits {

    // Functions to convert units and return their value + new unit
    // Switch cases sorted according to how probable it is to swap from certains units to other unit

    convertTime(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("s"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                }
            case("min"): 
                switch(unitOutput) {
                    case ("s"):
                        return value*60 + "s";
                    case("h"):
                        return value/60 + "h";
                    case("ms"):
                        return value*60000 + "ms";
                    case("day"):
                        return value/1440 + "days";
                }
            case("h"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("s"):
                        return value*3600 + "s";
                    case("ms"):
                        return value*3600000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                }
            case("ms"): 
                switch(unitOutput) {
                    case("s"):
                        return value/1000 + "s";
                    case ("min"):
                        return value/60000 + "min";
                    case("h"):
                        return value/3600000 + "h";
                    case("day"):
                        return value/43200000 + "days";
                }
            case("day"): 
                switch(unitOutput) {
                    case("min"):
                        return value/3600 + "min";
                    case("h"):
                        return value*1000 + "h";
                    case ("s"):
                        return value/60 + "s";
                    case("ms"):
                        return value*43200000 + "ms";
                }
        }        
    }

    convertLength(value, unitInput, unitOutput) {
        let feet = ""
        let inch = ""
        switch(unitInput) {
            case("cm"): 
                switch(unitOutput) {
                    case("in"):
                        feet = Math.floor(value/2.54) != 0 ? Math.floor(value/2.54) +"ft " : ""
                        inch = (value/2.54)%12 != 0 ? (value/2.54)%12 + "in": ""
                        return feet + inch;
                    case ("m"):
                        return value/100 + "m";
                    case("km"):
                        return value/100000 + "km";
                    case("yd"):
                        return value/91.44 + "yd";
                    case ("mi"):
                        return value/160900 + "mi";
                    case ("ft"):
                        feet = Math.floor(value/30.48) != 0 ? Math.floor(value/30.48) +"ft " : ""
                        inch = (value/2.54)%12 != 0 ? (value/2.54)%12 + "in": ""
                        return feet + inch;
                    case ("mm"):
                        return value*10 + "mm";
                }
            case("mm"): 
                switch(unitOutput) {
                    case ("cm"):
                        return value/10 + "cm";
                    case("in"):
                        return value/25.4 + "in";
                    case("m"):
                        return value/1000 + "m";
                    case("km"):
                        return value/1000000 + "km";
                    case ("yd"):
                        return value/914.4 + "yd";
                    case ("ft"):
                        feet = Math.floor(value/304.8) != 0 ? Math.floor(value/304.8) +"ft " : ""
                        inch = (value/304.8)%12 != 0 ? (value/304.8)%12 + "in": ""
                        return feet + inch;
                    case ("mi"):
                        return value/1609000 + "mi";
                }
            case("m"): 
                switch(unitOutput) {
                    case ("km"):
                        return value/1000 + "km";
                    case("ft"):
                        feet = Math.floor(value*3.28084) != 0 ? Math.floor(value*3.28084) +"ft " : ""
                        inch = (value*3.28084)%12 != 0 ? (value*3.28084)%12 + "in": ""
                        return feet + inch;
                    case("yd"):
                        return value*1.094 + "yd";
                    case("cm"):
                        return value*100 + "cm";
                    case ("mi"):
                        return value*1609 + "mi";
                    case ("in"):
                        return value*39.37 + "in";
                    case ("mm"):
                        return value*1000 + "mm";
                }
            case("km"): 
                switch(unitOutput) {
                    case ("mi"):
                        return value/1.609 + "mi";
                    case("m"):
                        return value*1000 + "m";
                    case("yd"):
                        return value*1094 + "yd";
                    case("ft"):
                        return value*3281 + "ft";
                    case ("in"):
                        return value*39370 + "in";
                    case ("cm"):
                        return value/100000 + "cm";
                    case ("mm"):
                        return value*1000000 + "mm";
                }
            case("ft"): 
                switch(unitOutput) {
                    case ("m"):
                        return value/3.281+ "m";
                    case("km"):
                        return value/3281 + "km";
                    case("in"):
                        return value*12 + "in";
                    case("mm"):
                        return value*304.8 + "mm";
                    case ("mi"):
                        return value/5280 + "mi";
                    case ("yd"):
                        return value/3 + "yd";
                    case ("cm"):
                        return value*30.48 + "cm";
                }
            case("in"): 
                switch(unitOutput) {
                    case ("ft"):
                        return value/12 + "ft";
                    case("m"):
                        return value/39.37 + "in";
                    case("cm"):
                        return value*2.54 + "ms";
                    case ("mm"):
                        return value*25.4 + "mm";
                    case("yd"):
                        return value/36 + "yd";
                    case ("km"):
                        return value/39370 + "km";
                    case ("mi"):
                        return value/63360 + "mi";
                }
            case("yd"): 
                switch(unitOutput) {
                    case ("ft"):
                        feet = Math.floor(value*3) != 0 ? Math.floor(value*3) +"ft " : ""
                        inch = (value*3)%12 != 0 ? (value*3)%12 + "in": ""
                        return feet + inch;
                    case("km"):
                        return value/1094 + "km";
                    case("mi"):
                        return value/1760 + "mi";
                    case("m"):
                        return value/1.094 + "m";
                    case ("in"):
                        return value*36 + "in";
                    case ("cm"):
                        return value*91.44 + "cm";
                    case ("mm"):
                        return value*914.4 + "mm";
                }
            case("mi"): 
                switch(unitOutput) {
                    case ("km"):
                        return value*1.609 + "km";
                    case("ft"):
                        feet = Math.floor(value*63360) != 0 ? Math.floor(value*63360) +"ft " : ""
                        inch = (value*63360)%12 != 0 ? (value*63360)%12 + "in": ""
                        return feet + inch;
                    case("yd"):
                        return value*1760 + "yd";
                    case("m"):
                        return value*1609 + "m";
                    case ("in"):
                        return value*63360 + "in";
                    case ("cm"):
                        return value*160900 + "cm";
                    case ("mm"):
                        return value*1609000 + "mm";
                }
        }        
    }

    convertWeight(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("g"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/1000 + "kg";
                    case ("mg"):
                        return value*1000 + "mg";
                    case("oz"):
                        return value/28.35 + "oz";
                    case ("lb"):
                        return value/453.6 + "lb";
                    case ("t"):
                        return value/1000000 + "t";
                    case ("tn"):
                        return value/1016046 + "tn";
                }
            case("kg"): 
                switch(unitOutput) {
                    case("g"):
                        return value*1000 + "g";
                    case ("mg"):
                        return value*1000000 + "mg";
                    case("oz"):
                        return value*35.274 + "oz";
                    case ("lb"):
                        return value*2.205 + "lb";
                    case ("t"):
                        return value/1000 + "t";
                    case ("tn"):
                        return value/1016 + "tn";
                }
            case("lb"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/2.205 + "kg";
                    case ("mg"):
                        return value*453600 + "mg";
                    case("oz"):
                        return value*16 + "oz";
                    case ("g"):
                        return value*453.6 + "g";
                    case ("t"):
                        return value/2205 + "t";
                    case ("tn"):
                        return value/2000 + "tn";
                }
            case("oz"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/35.274 + "kg";
                    case ("mg"):
                        return value*28350 + "mg";
                    case("g"):
                        return value*28.35 + "g";
                    case ("lb"):
                        return value/16 + "lb";
                    case ("t"):
                        return value/35270 + "t";
                    case ("tn"):
                        return value/32000 + "tn";
                }
            case("mg"): 
                switch(unitOutput) {
                    case("g"):
                        return value/1000 + "kg";
                    case ("kg"):
                        return value/1000000 + "kg";
                    case("oz"):
                        return value/28350 + "oz";
                    case ("lb"):
                        return value/453600 + "lb";
                    case ("t"):
                        return value/1000000000 + "t";
                    case ("tn"):
                        return value/907200000 + "tn";
                }
            case("t"): 
                switch(unitOutput) {
                    case("kg"):
                        return value*1000 + "kg";
                    case ("mg"):
                        return value*1000000000 + "mg";
                    case("oz"):
                        return value*35270 + "oz";
                    case ("lb"):
                        return value*2205 + "lb";
                    case ("g"):
                        return value*1000000 + "g";
                    case ("tn"):
                        return value*1.102 + "tn";
                }
            case("tn"): 
                switch(unitOutput) {
                    case("kg"):
                        return value*907.2 + "kg";
                    case ("mg"):
                        return value*907200000 + "mg";
                    case("oz"):
                        return value*32000 + "oz";
                    case ("lb"):
                        return value*2000 + "lb";
                    case ("t"):
                        return value/1.102 + "t";
                    case ("g"):
                        return value*907200 + "g";
                }
        }        
    }

    convertTempertaure(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("k"): 
                switch(unitOutput) {
                    case ("c"):
                        return value - 273.15 + "°C";
                    case("f"):
                        return (((value - 273.15) * 9/5) + 32) + "°F";
                }
            case("c"): 
                switch(unitOutput) {
                    case ("k"):
                        return value + 273.15  + "K";
                    case("f"):
                        return ((value*(9/5)) +32)  + "°F";
                }
            case("f"): 
                switch(unitOutput) {
                    case ("k"):
                        return (((value - 32) * 5/9) + 273.15) + "K";
                    case("c"):
                        return ((value - 32) * 5/9) + "°C";
                }
        }        
    }

    convertElectricCurrent(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("ma"): 
                switch(unitOutput) {
                    case ("a"):
                        return value/1000 + "A";
                    case("ka"):
                        return value/1000000 + "kA";
                }
            case("a"): 
                switch(unitOutput) {
                    case ("ma"):
                        return value*1000  + "mA";
                    case("ka"):
                        return value/1000  + "kA";
                }
            case("ka"): 
                switch(unitOutput) {
                    case ("a"):
                        return value*1000 + "A";
                    case("ma"):
                        return value*1000000 + "mA";
                }
        }        
    }

    convertSpoon(value, unitInput) {
        switch(unitInput) {
            case("tsp"): 
                return (value/3) + " tbsp";
            case("tbsp"):
                return (value*3)  + " tsp";
        }        
    }
}

export default convertUnits