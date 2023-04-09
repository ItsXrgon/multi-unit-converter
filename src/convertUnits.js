"use strict";
class convertUnits {
    // Functions to convert units and return their value + new unit

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertTime(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("s"): 
                switch(unitOutput) {
                    case ("min"):
                        return value/60 + " min";
                    case("h"):
                        return value/3600 + " h";
                    case("ms"):
                        return value*1000 + " ms";
                    case("day"):
                        return value/86400 + " day(s)";
                } break;
            case("min"): 
                switch(unitOutput) {
                    case ("s"):
                        return value*60 + " s";
                    case("h"):
                        return value/60 + " h";
                    case("ms"):
                        return value*60000 + " ms";
                    case("day"):
                        return value/1440 + " day(s)";
                } break;
            case("h"): 
                switch(unitOutput) {
                    case ("min"):
                        return value*60 + " min";
                    case("s"):
                        return value*3600 + " s";
                    case("ms"):
                        return value*3600000 + " ms";
                    case("day"):
                        return value/24 + " day(s)";
                } break;
            case("ms"): 
                switch(unitOutput) {
                    case("s"):
                        return value/1000 + " s";
                    case ("min"):
                        return value/60000 + " min";
                    case("h"):
                        return value/3600000 + " h";
                    case("day"):
                        return value/43200000 + " day(s)";
                } break;
            case("day"): 
                switch(unitOutput) {
                    case("min"):
                        return value/3600 + " min";
                    case("h"):
                        return value*1000 + " h";
                    case ("s"):
                        return value/60 + " s";
                    case("ms"):
                        return value*43200000 + " ms";
                } break;
            default:
                return value
        }     
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertLength(value, unitInput, unitOutput) {
        let feet = ""
        let inch = ""
        switch(unitInput) {
            case("cm"): 
                switch(unitOutput) {
                    case("in"):
                        feet = Math.floor(value/2.54) != 0 ? Math.floor(value/2.54) +" ft " : ""
                        inch = (value/2.54)%12 != 0 ? (value/2.54)%12 + " in": ""
                        return feet + inch;
                    case ("m"):
                        return value/100 + " m";
                    case("km"):
                        return value/100000 + " km";
                    case("yd"):
                        return value/91.44 + " yd";
                    case ("mi"):
                        return value/160900 + " mi";
                    case ("ft"):
                        feet = Math.floor(value/30.48) != 0 ? Math.floor(value/30.48) +" ft " : ""
                        inch = (value/2.54)%12 != 0 ? (value/2.54)%12 + " in": ""
                        return feet + inch;
                    case ("mm"):
                        return value*10 + " mm";
                } break;
            case("mm"): 
                switch(unitOutput) {
                    case ("cm"):
                        return value/10 + " cm";
                    case("in"):
                        return value/25.4 + " in";
                    case("m"):
                        return value/1000 + " m";
                    case("km"):
                        return value/1000000 + " km";
                    case ("yd"):
                        return value/914.4 + " yd";
                    case ("ft"):
                        feet = Math.floor(value/304.8) != 0 ? Math.floor(value/304.8) +" ft " : ""
                        inch = (value/304.8)%12 != 0 ? (value/304.8)%12 + " in": ""
                        return feet + inch;
                    case ("mi"):
                        return value/1609000 + " mi";
                } break;
            case("m"): 
                switch(unitOutput) {
                    case ("km"):
                        return value/1000 + "km";
                    case("ft"):
                        feet = Math.floor(value*3.28084) != 0 ? Math.floor(value*3.28084) +" ft " : ""
                        inch = (value*3.28084)%12 != 0 ? (value*3.28084)%12 + " in": ""
                        return feet + inch;
                    case("yd"):
                        return value*1.094 + " yd";
                    case("cm"):
                        return value*100 + " cm";
                    case ("mi"):
                        return value*1609 + " mi";
                    case ("in"):
                        return value*39.37 + " in";
                    case ("mm"):
                        return value*1000 + " mm";
                } break;
            case("km"): 
                switch(unitOutput) {
                    case ("mi"):
                        return value/1.609 + " mi";
                    case("m"):
                        return value*1000 + " m";
                    case("yd"):
                        return value*1094 + " yd";
                    case("ft"):
                        return value*3281 + " ft";
                    case ("in"):
                        return value*39370 + " in";
                    case ("cm"):
                        return value/100000 + " cm";
                    case ("mm"):
                        return value*1000000 + " mm";
                } break;
            case("ft"): 
                switch(unitOutput) {
                    case ("m"):
                        return value/3.281+ " m";
                    case("km"):
                        return value/3281 + " km";
                    case("in"):
                        return value*12 + " in";
                    case("mm"):
                        return value*304.8 + " mm";
                    case ("mi"):
                        return value/5280 + " mi";
                    case ("yd"):
                        return value/3 + " yd";
                    case ("cm"):
                        return value*30.48 + " cm";
                } break;
            case("in"): 
                switch(unitOutput) {
                    case ("ft"):
                        return value/12 + " ft";
                    case("m"):
                        return value/39.37 + " m";
                    case("cm"):
                        return value*2.54 + " ms";
                    case ("mm"):
                        return value*25.4 + " mm";
                    case("yd"):
                        return value/36 + " yd";
                    case ("km"):
                        return value/39370 + " km";
                    case ("mi"):
                        return value/63360 + " mi";
                } break;
            case("yd"): 
                switch(unitOutput) {
                    case ("ft"):
                        feet = Math.floor(value*3) != 0 ? Math.floor(value*3) +" ft " : ""
                        inch = (value*3)%12 != 0 ? (value*3)%12 + " in": ""
                        return feet + inch;
                    case("km"):
                        return value/1094 + " km";
                    case("mi"):
                        return value/1760 + " mi";
                    case("m"):
                        return value/1.094 + " m";
                    case ("in"):
                        return value*36 + " in";
                    case ("cm"):
                        return value*91.44 + " cm";
                    case ("mm"):
                        return value*914.4 + " mm";
                } break;
            case("mi"): 
                switch(unitOutput) {
                    case ("km"):
                        return value*1.609 + " km";
                    case("ft"):
                        feet = Math.floor(value*63360) != 0 ? Math.floor(value*63360) +" ft " : ""
                        inch = (value*63360)%12 != 0 ? (value*63360)%12 + " in": ""
                        return feet + inch;
                    case("yd"):
                        return value*1760 + " yd";
                    case("m"):
                        return value*1609 + " m";
                    case ("in"):
                        return value*63360 + " in";
                    case ("cm"):
                        return value*160900 + " cm";
                    case ("mm"):
                        return value*1609000 + " mm";
                } break;
            default:
                return value;
        }        
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertWeight(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("g"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/1000 + " kg";
                    case ("mg"):
                        return value*1000 + " mg";
                    case("oz"):
                        return value/28.35 + " oz";
                    case ("lb"):
                        return value/453.6 + " lb";
                    case ("t"):
                        return value/1000000 + " t";
                    case ("tn"):
                        return value/1016046 + " tn";
                } break;
            case("kg"): 
                switch(unitOutput) {
                    case("g"):
                        return value*1000 + " g";
                    case ("mg"):
                        return value*1000000 + " mg";
                    case("oz"):
                        return value*35.274 + " oz";
                    case ("lb"):
                        return value*2.205 + " lb";
                    case ("t"):
                        return value/1000 + " t";
                    case ("tn"):
                        return value/1016 + " tn";
                } break;
            case("lb"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/2.205 + " kg";
                    case ("mg"):
                        return value*453600 + " mg";
                    case("oz"):
                        return value*16 + " oz";
                    case ("g"):
                        return value*453.6 + " g";
                    case ("t"):
                        return value/2205 + " t";
                    case ("tn"):
                        return value/2000 + " tn";
                } break;
            case("oz"): 
                switch(unitOutput) {
                    case("kg"):
                        return value/35.274 + " kg";
                    case ("mg"):
                        return value*28350 + " mg";
                    case("g"):
                        return value*28.35 + " g";
                    case ("lb"):
                        return value/16 + " lb";
                    case ("t"):
                        return value/35270 + " t";
                    case ("tn"):
                        return value/32000 + " tn";
                } break;
            case("mg"): 
                switch(unitOutput) {
                    case("g"):
                        return value/1000 + " kg";
                    case ("kg"):
                        return value/1000000 + " kg";
                    case("oz"):
                        return value/28350 + " oz";
                    case ("lb"):
                        return value/453600 + " lb";
                    case ("t"):
                        return value/1000000000 + " t";
                    case ("tn"):
                        return value/907200000 + " tn";
                } break;
            case("t"): 
                switch(unitOutput) {
                    case("kg"):
                        return value*1000 + " kg";
                    case ("mg"):
                        return value*1000000000 + " mg";
                    case("oz"):
                        return value*35270 + " oz";
                    case ("lb"):
                        return value*2205 + " lb";
                    case ("g"):
                        return value*1000000 + " g";
                    case ("tn"):
                        return value*1.102 + " tn";
                } break;
            case("tn"): 
                switch(unitOutput) {
                    case("kg"):
                        return value*907.2 + " kg";
                    case ("mg"):
                        return value*907200000 + " mg";
                    case("oz"):
                        return value*32000 + " oz";
                    case ("lb"):
                        return value*2000 + " lb";
                    case ("t"):
                        return value/1.102 + " t";
                    case ("g"):
                        return value*907200 + " g";
                } break;
            default:
                return value;
        }        
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertLiquidVolume(value, unitInput, unitOutput) {
        switch(unitInput) {
            case('ml'):
                switch(unitOutput) {
                    case('l'):
                        return value / 1000 + " l";
                    case('m3'):
                        return value / 1000000 + " m³";
                    case('cm3'):
                        return value + " cm³";
                    case('mm3'):
                        return value * 1000 + " mm³";
                    case('fl_oz'):
                        return value * 0.033814 + " fl oz";
                    case('cup'):
                        return value * 0.004167 + " cup(s)";
                    case('gal'):
                        return value / 3785.4118 + " gal";
                } break;
            case('l'):
                switch(unitOutput) {
                    case('ml'):
                        return value * 1000 + " ml";
                    case('m3'):
                        return value / 1000 + " m³";
                    case('cm3'):
                        return value * 1000 + " cm³";
                    case('mm3'):
                         return value * 1000000 + " mm³";
                    case('fl_oz'):
                         return value * 33.814 + " fl oz";
                    case('cup'):
                        return value * 4.167 + " cup(s)";
                    case('gal'):
                         return value / 3.7854 + " gal";
                } break;
            case('m3'):
                switch(unitOutput) {
                    case('l'):
                        return value * 1000 + " l";
                    case ('ml'):
                        return value * 1000000 + " ml";
                    case('cm3'):
                        return value * 1000000 + " cm³";
                    case('mm3'):
                         return value * 1000000000 + " mm³";
                    case('fl_oz'):
                         return value * 33814 + " fl oz";
                    case('cup'):
                        return value * 416.7 + " cup(s)";
                    case('gal'):
                        return value * 264.17 + " gal";
                } break;
            case('cm3'):
                switch(unitOutput) {
                    case('l'):
                        return value / 1000 + " l";
                    case ('ml'):
                        return value * 1 + " ml";
                    case('m3'):
                        return value / 1000000 + " m³";
                    case('mm3'):
                         return value * 1000 + " mm³";
                    case('fl_oz'):
                         return value * 0.033814 + " fl oz";
                    case('cup'):
                         return value * 0.004167 + " cup(s)";
                    case('gal'):
                        return value / 3785.4118 + " gal";
                } break;
            case('mm3'):
                switch(unitOutput) {
                    case('l'):
                        return value / 1000000 + " l";
                    case ('ml'):
                        return value / 1000 + " ml";
                    case('m3'):
                        return value / 1000000000 + " m³";
                    case('cm3'):
                        return value / 1000 + " cm³";
                    case('fl_oz'):
                        return value * 0.000033814 + " fl oz";
                    case('cup'):
                        return value * 0.000004167 + " cup(s)";
                    case('gal'):
                        return value / 3785411784 + " gal";
                } break;
            case ('gal'):
                switch (unitOutput) {
                    case ('ml'):
                        return value * 3785.41 + " ml";
                    case ('l'):
                        return value * 3.78541 + " l";
                    case ('m3'):
                        return value / 264.17 + " m³";
                    case ('cm3'):
                        return value * 3785.41 + " cm³";
                    case ('mm3'):
                        return value * 3785410 + " mm³";
                    case ('fl_oz'):
                        return value * 128 + " fl oz";
                    case ('cup'):
                        return value * 16 + " cup(s)";
                }
                break;
            case('cup'):
                switch(unitOutput) {
                    case('ml'):
                        return value * 236.588 + " ml";
                    case('l'):
                        return value * 0.236588 + " l";
                    case('fl_oz'):
                        return value * 8 + " fl oz";
                    case('gal'):
                        return value / 16 + " gal";
                    case ('cm3'):
                        return value * 236.6 + " cm³";
                    case ('m3'):
                        return value / 4227 + " m³";
                    case ('mm3'):
                        return value * 236600 + " mm³";
                } break;
            default:
                return value;
        }
    }
    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertTempertaure(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("k"): 
                switch(unitOutput) {
                    case ("c"):
                        return value - 273.15 + " °C";
                    case("f"):
                        return (((value - 273.15) * 9/5) + 32) + " °F";
                } break;
            case("c"): 
                switch(unitOutput) {
                    case ("k"):
                        return value + 273.15  + " K";
                    case("f"):
                        return ((value*(9/5)) +32)  + "°F";
                } break;
            case("f"): 
                switch(unitOutput) {
                    case ("k"):
                        return (((value - 32) * 5/9) + 273.15) + " K";
                    case("c"):
                        return ((value - 32) * 5/9) + "°C";
                } break;
            default:
                return value;
        }        
    }
    
    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertElectricCurrent(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("ma"): 
                switch(unitOutput) {
                    case ("a"):
                        return value/1000 + " A";
                    case("ka"):
                        return value/1000000 + " kA";
                } break;
            case("a"): 
                switch(unitOutput) {
                    case ("ma"):
                        return value*1000  + " mA";
                    case("ka"):
                        return value/1000  + " kA";
                } break;
            case("ka"): 
                switch(unitOutput) {
                    case ("a"):
                        return value*1000 + " A";
                    case("ma"):
                        return value*1000000 + " mA";
                } break;
            default:
                return value;
        }        
    }   
    
     /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @returns {string}
    */
    convertSpoon(value, unitInput) {
        switch(unitInput) {
            case("tsp"): 
                return (value/3) + " tbsp"; 
            case("tbsp"):
                return (value*3)  + " tsp";
            default:
                return value;
        }        
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertPressure(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("pa"): 
                switch(unitOutput) {
                    case("atm"):
                        return value/101300 + " atm";
                    case("psi"):
                        return value/6895 + " psi";
                    case("kpa"):
                        return value/1000 + " kPa";
                    case("mpa"):
                        return value/1000000 + " mPa";
                    case("bar"):
                        return value/100000 + " bar";
                } break;
                case("atm"): 
                switch(unitOutput) {
                    case("pa"):
                        return value*101325 + " Pa";
                    case("psi"):
                        return value*14.696 + " psi";
                    case("kpa"):
                        return value*101.325 + " kPa";
                    case("mpa"):
                        return value/9.8692 + " MPa";
                    case("bar"):
                        return value*1.01325 + " bar";
                } break;
            case("psi"): 
                switch(unitOutput) {
                    case("pa"):
                        return value*6894.76 + " Pa";
                    case("atm"):
                        return value/14.696 + " atm";
                    case("kpa"):
                        return value*6.89476 + " kPa";
                    case("mpa"):
                        return value/145.038 + " MPa";
                    case("bar"):
                        return value*0.0689476 + " bar";
                } break;
            case("kpa"): 
                switch(unitOutput) {
                    case("pa"):
                        return value*1000 + " Pa";
                    case("atm"):
                        return value/101.325 + " atm";
                    case("psi"):
                        return value/6.89476 + " psi";
                    case("mpa"):
                        return value/1000 + " MPa";
                    case("bar"):
                        return value/100 + " bar";
                } break;
            case("mpa"): 
                switch(unitOutput) {
                    case("pa"):
                        return value*1000000 + " Pa";
                    case("atm"):
                        return value*9.8692 + " atm";
                    case("psi"):
                        return value*145.038 + " psi";
                    case("kpa"):
                        return value*1000 + " kPa";
                    case("bar"):
                        return value*10 + " bar";
                } break;
            case("bar"): 
                switch(unitOutput) {
                    case("pa"):
                        return value*100000 + " Pa";
                    case("atm"):
                        return value*0.98692 + " atm";
                    case("psi"):
                        return value*14.5038 + " psi";
                    case("kpa"):
                        return value*100 + " kPa";
                    case("mpa"):
                        return value/10 + " MPa";
                } break;
            default:
                return value;
        }
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertEnergy(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("j"): 
                switch(unitOutput) {
                    case("kj"):
                        return value/1000 + " kJ";
                    case("mj"):
                        return value/1000000 + " mJ";
                    case("kwh"):
                        return value/3600000 + " kWh";
                } 
                break;
            case("kj"): 
                switch(unitOutput) {
                    case("j"):
                        return value*1000 + " J";
                    case("mj"):
                        return value/1000 + " mJ";
                    case("kwh"):
                        return value/3600000 + " kWh";
                } 
                break;
            case("mj"): 
                switch(unitOutput) {
                    case("j"):
                        return value*1000000 + " J";
                    case("kj"):
                        return value*1000 + " kJ";
                    case("kwh"):
                        return value/3600000000 + " kWh";
                } 
                break;
            case("kwh"): 
                switch(unitOutput) {
                    case("j"):
                        return value*3600000 + " J";
                    case("kj"):
                        return value*3600 + " kJ";
                    case("mj"):
                        return value*3600000 + " mJ";
                } 
                break;
            default:
                return value;
        } 
    }

    /**
    * @param {number} value The value
    * @param {string} unitInput Unit from
    * @param {string} unitOutput Unit to
    * @returns {string}
    */
    convertFrequency(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("hz"): 
                switch(unitOutput) {
                case("khz"):
                    return value/1000 + " kHz";
                case("mhz"):
                    return value/1000000 + " MHz";
                case("ghz"):
                    return value/1000000000 + " GHz";
                } 
                break;
            case("khz"): 
                switch(unitOutput) {
                case("hz"):
                    return value*1000 + " Hz";
                case("mhz"):
                    return value/1000 + " MHz";
                case("ghz"):
                    return value/1000000 + " GHz";
                } 
                break;
            case("mhz"): 
                switch(unitOutput) {
                case("hz"):
                    return value*1000000 + " Hz";
                case("khz"):
                    return value*1000 + " kHz";
                case("ghz"):
                    return value/1000 + " GHz";
                } 
                break;
            case("ghz"): 
                switch(unitOutput) {
                case ("hz"):
                    return value*1000000000 + " Hz";
                case("khz"):
                    return value*1000000 + " kHz";
                case("mhz"):
                    return value*1000 + " MHz";
                } 
                break;
            default:
                return value;
        } 
    }

    convertArea(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("mm2"):
                switch(unitOutput) {
                case("cm2"):
                    return value/100 + " cm²";
                case("m2"):
                    return value/1000000 + " m²";
                case("km2"):
                    return value/1000000000000 + " km²";
                case("in2"):
                    return value/645 + " in²";
                case("ft2"):
                    return value/92903 + " ft²";
                case("yd2"):
                    return value/836127 + " yd²";
                case("ac"):
                    return value/4046856422 + " acres";
                case("ha"):
                    return value/100000000 + " hectares";
                }
                break;
            case("cm2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*100 + " mm²";
                case("m2"):
                    return value/10000 + " m²";
                case("km2"):
                    return value/10000000000 + " km²";
                case("in2"):
                    return value/6.452 + " in²";
                case("ft2"):
                    return value/929 + " ft²";
                case("yd2"):
                    return value/8361 + " yd²";
                case("ac"):
                    return value/404686 + " acres";
                case("ha"):
                    return value/10000 + " hectares";
                }
                break;
            case("m2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*1000000 + " mm²";
                case("cm2"):
                    return value*10000 + " cm²";
                case("km2"):
                    return value/1000000 + " km²";
                case("in2"):
                    return value*1550 + " in²";
                case("ft2"):
                    return value*10.764 + " ft²";
                case("yd2"):
                    return value*1.196 + " yd²";
                case("ac"):
                    return value/4047 + " acres";
                case("ha"):
                    return value/10000 + " hectares";
                }
                break;
            case("km2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*1000000000000 + " mm²";
                case("cm2"):
                    return value*10000000000 + " cm²";
                case("m2"):
                    return value*1000000 + " m²";
                case("in2"):
                    return value*2.59e+9 + " in²";
                case("ft2"):
                    return value*1.076e+7 + " ft²";
                case("yd2"):
                    return value*1.196e+6 + " yd²";
                case("ac"):
                    return value*247.105 + " acres";
                case("ha"):
                    return value*100 + " hectares";
                }
                break;
            case("in2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*645 + " mm²";
                case("cm2"):
                    return value*6.452 + " cm²";
                case("m2"):
                    return value/1550 + " m²";
                case("km2"):
                    return value/2.59e+9 + " km²";
                case("ft2"):
                    return value/144 + " ft²";
                case("yd2"):
                    return value/1296 + " yd²";
                case("ac"):
                    return value/6272640 + " acres";
                case("ha"):
                    return value/15500031 + " hectares";
                }
                break;
            case("ft2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*92903 + " mm²";
                case("cm2"):
                    return value*929 + " cm²";
                case("m2"):
                    return value/10.764 + " m²";
                case("km2"):
                    return value/1.076e+7 + " km²";
                case("in2"):
                    return value*144 + " in²";
                case("yd2"):
                    return value/9 + " yd²";
                case("ac"):
                    return value/43560 + " acres";
                case("ha"):
                    return value/107639 + " hectares";
                }
                break;
            case("yd2"):
                switch(unitOutput) {
                case("mm2"):
                    return value*836127 + " mm²";
                case("cm2"):
                    return value*8361 + " cm²";
                case("m2"):
                    return value/1.196 + " m²";
                case("km2"):
                    return value/1.196e+6 + " km²";
                case("in2"):
                    return value*1296 + " in²";
                case("ft2"):
                    return value*9 + " ft²";
                case("ac"):
                    return value/4840 + " acres";
                case("ha"):
                    return value/11960 + " hectares";
                }
                break;
            case("ac"):
                switch(unitOutput) {
                case("mm2"):
                    return value*4046856422 + " mm²";
                case("cm2"):
                    return value*404686 + " cm²";
                case("m2"):
                    return value*4047 + " m²";
                case("km2"):
                    return value/247.105 + " km²";
                case("in2"):
                    return value*6272640 + " in²";
                case("ft2"):
                    return value*43560 + " ft²";
                case("yd2"):
                    return value*4840 + " yd²";
                case("ha"):
                    return value*40.469 + " hectares";
                }
                break;
            case("ha"):
                switch(unitOutput) {
                case("mm2"):
                    return value*100000000 + " mm²";
                case("cm2"):
                    return value*10000 + " cm²";
                case("m2"):
                    return value*10000 + " m²";
                case("km2"):
                    return value/100 + " km²";
                case("in2"):
                    return value*15500031 + " in²";
                case("ft2"):
                    return value*107639 + " ft²";
                case("yd2"):
                    return value*11960 + " yd²";
                case("ac"):
                    return value/40.469 + " acres";
                }
                break;
            default:
                return value;
        }
    }

    convertVolume(value, unitInput, unitOutput) {
        switch(unitInput) {
            case("mm3"): 
                switch(unitOutput) {
                    case ("cm3"):
                        return value/1000 + " cm³";
                    case("m3"):
                        return value/1000000000 + " m³";
                    case("km3"):
                        return value/1000000000000000000 + " km³";
                    case("in3"):
                        return value/16387 + " in³";
                    case("ft3"):
                        return value/28316846 + " ft³";
                    case("yd3"):
                        return value/764554858 + " yd³";
                } 
                break;
            case("cm3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*1000 + " mm³";
                    case("m3"):
                        return value/1000000 + " m³";
                    case("km3"):
                        return value/1000000000000 + " km³";
                    case("in3"):
                        return value/16.387 + " in³";
                    case("ft3"):
                        return value/28317 + " ft³";
                    case("yd3"):
                        return value/764555 + " yd³";
                } 
                break;
            case("m3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*1000000000 + " mm³";
                    case("cm3"):
                        return value*1000000 + " cm³";
                    case("km3"):
                        return value/1000000000 + " km³";
                    case("in3"):
                        return value*61024 + " in³";
                    case("ft3"):
                        return value*35.315 + " ft³";
                    case("yd3"):
                        return value*1.308 + " yd³";
                } 
                break;
            case("km3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*1000000000000000000 + " mm³";
                    case("cm3"):
                        return value*1000000000000 + " cm³";
                    case("m3"):
                        return value*1000000000 + " m³";
                    case("in3"):
                        return value*3.531 * Math.pow(10, 17) + " in³";
                    case("ft3"):
                        return value*4.169 * Math.pow(10, 10) + " ft³";
                    case("yd3"):
                        return value*1.307 * Math.pow(10, 9) + " yd³";
                } 
                break;
            case("in3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*16387 + " mm³";
                    case("cm3"):
                        return value*16.387 + " cm³";
                    case("m3"):
                        return value/61024 + " m³";
                    case("km3"):
                        return value/3.531 * Math.pow(10, 17) + " km³";
                    case("ft3"):
                        return value/1728 + " ft³";
                    case("yd3"):
                        return value/46656 + " yd³";
                    } 
                break;
            case("ft3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*28316846 + " mm³";
                    case("cm3"):
                        return value*28317 + " cm³";
                    case("m3"):
                        return value/35.315 + " m³";
                    case("km3"):
                        return value/4.169 * Math.pow(10, 10) + " km³";
                    case("in3"):
                        return value*1728 + " in³";
                    case("yd3"):
                        return value/27 + " yd³";
                } 
                break;
            case("yd3"): 
                switch(unitOutput) {
                    case ("mm3"):
                        return value*764554858 + " mm³";
                    case("cm3"):
                        return value*764555 + " cm³";
                    case("m3"):
                        return value*1.308 + " m³";
                    case("km3"):
                        return value/1.307 * Math.pow(10, 9) + " km³";
                    case("in3"):
                        return value*46656 + " in³";
                    case("ft3"):
                        return value*27 + " ft³";
                    } 
                break;
            default:
                return value;
        }
      
    }
}

module.exports = convertUnits