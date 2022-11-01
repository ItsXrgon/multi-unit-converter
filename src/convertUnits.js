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
                        return value/3600 + "in";
                    case("m"):
                        return value/1000 + "m";
                    case("km"):
                        return value/1000000 + "km";
                    case ("yd"):
                        return value/914.4 + "yd";
                    case ("ft"):
                        return value/304.8 + "ft";
                    case ("mi"):
                        return value/1609000 + "mi";
                }
            case("m"): 
                switch(unitOutput) {
                    case ("km"):
                        return value/60 + "min";
                    case("ft"):
                        feet = Math.floor(value*3.28084) != 0 ? Math.floor(value*3.28084) +"ft " : ""
                        inch = (value*3.28084)%12 != 0 ? (value*3.28084)%12 + "in": ""
                        return feet + inch;
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("km"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("ft"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("in"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("yd"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("mi"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
        }        
    }

    convertMass(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("g"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/1000 + "kg";
                    case ("mg"):
                        return value/100 + "m";
                    case("km"):
                        return value/100000 + "km";
                    case("oz"):
                        return value/91.44 + "yd";
                    case ("lb"):
                        return value/160900 + "mi";
                    case ("t"):
                        return value/30.48 + "ft";
                    case ("tn"):
                        return value*10 + "mm";
                }
            case("kg"): 
                switch(unitOutput) {
                    case ("cm"):
                        return value/10 + "cm";
                    case("in"):
                        return value/3600 + "h";
                    case("m"):
                        return value/1000 + "m";
                    case("km"):
                        return value/1000000 + "km";
                    case ("yd"):
                        return value/914.4 + "yd";
                    case ("ft"):
                        return value/304.8 + "ft";
                    case ("mi"):
                        return value/1609000 + "mi";
                }
            case("lb"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("oz"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("kg"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("t"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("tn"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
                }
            case("oz"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + "min";
                    case("h"):
                        return value/3600 + "h";
                    case("ms"):
                        return value*1000 + "ms";
                    case("day"):
                        return value/86400 + "days";
                    case ("min"):
                        return value/60 + "min";
                    case ("min"):
                        return value/60 + "min";
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