import BikeDataSet from "./bikeDataSet.js";
import BikeDataSetList from "./bikeDataSetList.js";

const dataSetList = new BikeDataSetList();

//const standardWheelOptions = [622, 584, 559, 406];
const standardWheelOptions = [
    [622, '700c/29" (622)'],
    [584, '650b/27.5" (584)'],
    [559, '26" (559)'],
    [406, '20" (406)']
];

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
})

const initApp = () => {
    //add listeners
    const addSetButton = document.getElementById("addDataSet");
    addSetButton.addEventListener("onClick", (event) => {
        event.preventDefault();
        const nextItemId = calcNewItemId();
        const newDataSet = createEmptyDataSet(nextItemId);
        dataSetList.addItemToList(newDataSet);
    })
    //load list object
    refreshThePage();
}

//const myFunc = () => {
//    const nextItemId = calcNewItemId();
//    const newDataSet = createEmptyDataSet(nextItemId);
//    dataSetList.addItemToList(newDataSet);
//    refreshThePage();
//}

const refreshThePage = () => {
    clearListDisplay();
    renderList();
}

const clearListDisplay = () => {
    const parentElement = document.getElementById("bikeDataSets");
    deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    
}

const renderList = () => {
    const list = dataSetList.getList();
    list.forEach(item => {
        buildListItem(item);
    })
}

const createEmptyDataSet = (itemId) => {
    const dataSet = new BikeDataSet();
    dataSet.setId(itemId);
    return dataSet;
}

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = dataSetList.getList();
    if(list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
}

const duplicateDataSet = () => {
    //TODO: make user able to duplicate existing data in a set
}

const encodeStateToURL = () => {
    //TODO: base64 encode all user data into the url so that links are sharable
}

const buildListItem = (item) => {
    const br = document.createElement("br");
    
    const form = document.createElement("form");
    form.className = "bikeDataContainer";
    
    const buildName = document.createElement("input");
    buildName.id = "buildName" + item.getId();
    buildName.setAttribute("type", "text");
    
//    const wSLabel = document.createElement("label");
//    wSLabel.setAttribute("for", "wheelSize");
    
    const wheelSelection = document.createElement("select");
    wheelSelection.id = "wheelSelection" + item.getId();
    
    const wheelOption = (bsd, name) => {
        let option = document.createElement("option");
        option.setAttribute("value", bsd);
        option.innerHTML = name;
        return option;
    }
    
    for (let i = 0; i < standardWheelOptions.length; i++) {
        wheelSelection.appendChild(wheelOption(standardWheelOptions[i][0],standardWheelOptions[i][1]));
    }
    
    const wheelSize = document.createElement("input");
    wheelSize.id = "wheelSize" + item.getId();
    wheelSize.setAttribute("type", "number");
    
    const tireSize = document.createElement("input");
    tireSize.id = "tireSize" + item.getId();
    tireSize.setAttribute("type", "number");
    
    const chainRings = document.createElement("input");
    chainRings.id = "chainRings" + item.getId();
    chainRings.setAttribute("type", "text");
    
    const crankLength = document.createElement("input");
    crankLength.id = "crankLength" + item.getId();
    crankLength.setAttribute("type", "number");
    
    const cassetteCogs = document.createElement("input");
    cassetteCogs.id = "cassetteCogs" + item.getId();
    cassetteCogs.setAttribute("type", "text");
    
//    const numberInput = document.createElement("input");
//    numberInput.type = "number";
//    numberInput.id = item.getId();
    //add listener to inputs to update calculations
    
    const inputLabel = (labelText, forId) => {
        let label = document.createElements("label");
        label.innerHTML = labelText;
        label.htmlFor = forId;
        return label;
    }
    
    //Construct full form
    
    form.appendChild(inputLabel("Build Label", "buildName"))
    form.appendChild(buildName);
    
    form.appendChild(br.cloneNode());
    
    form.appendChild(inputLabel("Wheel Size", "wheelSize"));
    form.appendChild(wheelSelection);
    //make selection change update wheelsize input to trigger listener
    form.appendChild(wheelSize);
    addChangeListenerToInput(wheelSize);
    
    form.appendChild(br.cloneNode());
    
    form.appendChild(inputLabel("Tire Size", "tireSize"));
    form.appendChild(tireSize);
    addChangeListenerToInput(tireSize);
    
    form.appendChild(br.cloneNode());
    
    form.appendChild(inputLabel("Chain Rings", "chainRings"));
    form.appendChild(chainRings);
    addChangeListenerToInput(chainRings);
    
    form.appendChild(br.cloneNode());
    
    form.appendChild(inputLabel("Crank Length", "crankLength"));
    form.appendChild(crankLength);
    addChangeListenerToInput(crankLength);
    
    form.appendChild(br.cloneNode());
    
    form.appendChild(inputLabel("Cassette Cogs", "cassetteCogs"));
    form.appendChild(cassetteCogs);
    addChangeListenerToInput(cassetteCogs);
    
    form.appendChild(br.cloneNode());
    
    const container = document.getElementById("bikeDataSets");
    container.append(form);
}

const addChangeListenerToInput = (input) => {
    input.addEventListener("change", (event) => {
        makeDataSetCalculations(input.id);
    })
}

const makeDataSetCalculations = (item) => {
    calcWheelDia();
    calcWheelCir();
    calcRadiusRatio();
    calcMatrix();
}

const calcWheelDia = (wheelSize, tireSize) => {
    //calculate wheel diameter
    return wheelSize+(tireSize*2);
}

const calcWheelCir = (wheelSize, tireSize) => {
    //calculate wheel circumference
    let wheelDia = calcWheelDia(wheelSize, tireSize);
    return wheelDia*Math.PI;
}

const calcRadiusRatio = (wheelDia, crankLength) => {
    //calculate gain ratio; courtesy of Sheldon Brown
    let wheelRadius = wheelDia/2;
    let radiusRatio = wheelRadius/crankLength;
    //round to 3 decimal places
    return Math.round((radiusRatio + Number.EPSILON)*1000)/1000;
}

const calcGainRatio = (ringTeeth, cogTeeth, radiusRatio) => {
    let gainRatio = (ringTeeth/cogTeeth)*radiusRatio;
    //round 2 decimal places
    return Math.round((gainRatio + Number.EPSILON)*100)/100;
}

const calcGearInches = (ringTeeth, cogTeeth, wheelDia) => {
    //calculate gear inches
    let diaInches = wheelDia/25.4; 
    let gearInches = (ringTeeth/cogTeeth)*diaInches
    return Math.round((gearInches + Number.EPSILON)*100)/100;
}



//function createDataSet() {
//    //when clicking on plus button add a new data sheet to enter data in, if one already existing duplicate from what plus
//    
//    var dataSetsContainer = document.getElementById("bikeDataSets");
//    
//    
//}

//select number of data sets to compare or add input sets
//need to be able to select which data set is the main version to compare to; all other sets will have relative changes highlighted next to their values as + or -

//convert tire dimensions
//if entered as metric, convert to imperial
//if entered as imperial, convert to metric

//calculate wheel diameter
//calculate wheel circumference

//conversion of input/s for chainrings
//conversion of input/s for cassette cogs

//calculate gear total range

//calculate radius ratio
//calculate gear inches

//build table depending on quanity of rings and cogs and fill with selected info

