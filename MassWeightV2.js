var AtomicMass = {
    "hydrogen": 1.0079,
    "helium": 4.0026,
    "lithium": 6.941,
    "beryllium": 9.0122,
    "boron": 10.811,
    "carbon": 12.0107,
    "nitrogen": 14.0067,
    "oxygen": 15.9994,
    "fluorine": 18.9984,
    "neon": 20.1797,
    "sodium": 22.9897,
    "magnesium": 24.305,
    "aluminum": 26.9815,
    "silicon": 28.0855,
    "phosphorus": 30.9738,
    "sulfur": 32.065,
    "chlorine": 35.453,
    "potassium": 39.0983,
    "argon": 39.948,
    "calcium": 40.078,
    "scandium": 44.9559,
    "titanium": 47.867,
    "vanadium": 50.9415,
    "chromium": 51.9961,
    "manganese": 54.938,
    "iron": 55.845,
    "nickel": 58.6934,
    "cobalt": 58.9332,
    "copper": 63.546,
    "zinc": 65.39,
    "gallium": 69.723,
    "germanium": 72.64,
    "arsenic": 74.9216,
    "selenium": 78.96,
    "bromine": 79.904,
    "krypton": 83.8,
    "rubidium": 85.4678,
    "strontium": 87.62,
    "yttrium": 88.9059,
    "zirconium": 91.224,
    "niobium": 92.9064,
    "molybdenum": 95.94,
    "technetium": 98,
    "ruthenium": 101.07,
    "rhodium": 102.9055,
    "palladium": 106.42,
    "silver": 107.8682,
    "cadmium": 112.411,
    "indium": 114.818,
    "tin": 118.71,
    "antimony": 121.76,
    "iodine": 126.9045,
    "tellurium": 127.6,
    "xenon": 131.293,
    "cesium": 132.9055,
    "barium": 137.327,
    "lanthanum": 138.9055,
    "cerium": 140.116,
    "praseodymium": 140.9077,
    "neodymium": 144.24,
    "promethium": 145,
    "samarium": 150.36,
    "europium": 151.964,
    "gadolinium": 157.25,
    "terbium": 158.9253,
    "dysprosium": 162.5,
    "holmium": 164.9303,
    "erbium": 167.259,
    "thulium": 168.9342,
    "ytterbium": 173.04,
    "lutetium": 174.967,
    "hafnium": 178.49,
    "tantalum": 180.9479,
    "tungsten": 183.84,
    "rhenium": 186.207,
    "osmium": 190.23,
    "iridium": 192.217,
    "platinum": 195.078,
    "gold": 196.9665,
    "mercury": 200.59,
    "thallium": 204.3833,
    "lead": 207.2,
    "bismuth": 208.9804,
    "polonium": 209,
    "astatine": 210,
    "radon": 222,
    "francium": 223,
    "radium": 226,
    "actinium": 227,
    "protactinium": 231.0359,
    "thorium": 232.0381,
    "neptunium": 237,
    "uranium": 238.0289,
    "americium": 243,
    "plutonium": 244,
    "curium": 247,
    "berkelium": 247,
    "californium": 251,
    "einsteinium": 252,
    "fermium": 257,
    "mendelevium": 258,
    "nobelium": 259,
    "rutherfordium": 261,
    "lawrencium": 262,
    "dubnium": 262,
    "bohrium": 264,
    "seaborgium": 266,
    "meitnerium": 268,
    "roentgenium": 272,
    "hassium": 277
};

var UnitToGram = {
    "mol": 1,
    "kilograms": 1000,
    "grams": 1,
    "ounce": 28.349523125,
    "pound": 453.59237
}

var CalculateAtomicMass = function (objComponents) {
    var objRst = {};

    var totalWeightInGram = 0;
    var totalWeightInPound = 0;

    var objValid = validateData(objComponents);
    if (!objValid.isValid) {
        objRst.ErrMsg = objValid.ErrMsg;
        return objRst;
    }

    var objComponents = objComponents.components;

    for (intIndex = 0; intIndex < objComponents.length; intIndex++) {
        totalWeightInGram += calculateWeight(objComponents[intIndex]);
    };

    totalWeightInPound = totalWeightInGram / UnitToGram["pound"]
    objRst.ErrMsg = "";
    objRst.GramsResult = Math.round(totalWeightInGram * 100) / 100.0;
    objRst.PoundResult = Math.round(totalWeightInPound * 100) / 100.0;

    return objRst;
}

var validateData = function (objComponents) {
    var objRst = {};
    var bValid = true;
    var Err = "";
    var Temp;

    if (!objComponents) {
        objRst.isValid = false;
        objRst.ErrMsg = "Please provide components.";
        return objRst;
    }

    if (!objComponents.components) {
        objRst.isValid = false;
        objRst.ErrMsg = "Please provide components.";
        return objRst;
    }

    var lists = objComponents.components;
    for (intJ = 0; intJ < lists.length; intJ++) {
        Temp = validateComponentName(lists[intJ]);
        bValid &= Temp.isValid;
        Err += Temp.ErrMsg;
    };

    if (!bValid) {
        objRst.isValid = false;
        objRst.ErrMsg = Err;
        return objRst;
    }

    for (intJ = 0; intJ < lists.length; intJ++) {
        Temp = validateComponentMass(lists[intJ]);
        bValid &= Temp.isValid;
        Err += Temp.ErrMsg;
    };

    if (!bValid) {
        objRst.isValid = false;
        objRst.ErrMsg = Err;
        return objRst;
    }

    for (intJ = 0; intJ < lists.length; intJ++) {
        Temp = validateComponentUnits(lists[intJ]);
        bValid &= Temp.isValid;
        Err += Temp.ErrMsg;
    };

    if (!bValid) {
        objRst.isValid = false;
        objRst.ErrMsg = Err;
        return objRst;
    }

    objRst.isValid = true;
    objRst.ErrMsg = "";
    return objRst;

}

var validateComponentName = function (objComponent) {
    if (typeof (objComponent.name) == "undefined") {
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " missing name. " };
    }

    if (typeof (AtomicMass[objComponent.name.toLocaleLowerCase()]) == "undefined") {
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " unknow name. " };
    }

    return { "isValid": true, "ErrMsg": "" };
}

var validateComponentMass = function (objComponent) {
    if (typeof (objComponent.mass) == "undefined") {
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " missing mass. " };
    }

    try {
        parseFloat(objComponent.mass)
    }
    catch (e) {
        objRst.ErrMsg = "Component " + JSON.stringify(objComponent) + " not contain valid mass";
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " not contain valid mass. " };
    }

    return { "isValid": true, "ErrMsg": "" };
}

var validateComponentUnits = function (objComponent) {
    if (typeof (objComponent.units) == "undefined") {
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " missing unit. " };
    }

    if (typeof (UnitToGram[objComponent.units.toLocaleLowerCase()]) == "undefined") {
        return { "isValid": false, "ErrMsg": "Component " + JSON.stringify(objComponent) + " unknow unit. " };
    }

    return { "isValid": true, "ErrMsg": "" };
}

var calculateWeight = function (objComponent) {
    var strName, strMass, strUnits;
    var objComponent;
    var dblMass, dblAtomicMass, dblUnitToGram;

    strName = objComponent.name;
    strMass = objComponent.mass;
    strUnits = objComponent.units;

    dblUnitToGram = UnitToGram[strUnits.toLocaleLowerCase()];
    dblMass = parseFloat(strMass);

    if (strUnits.toLocaleLowerCase() == "mol") {
        dblAtomicMass = AtomicMass[strName.toLocaleLowerCase()];
        dblUnitToGram = dblAtomicMass * dblUnitToGram;
    }

    return dblUnitToGram * dblMass;
}