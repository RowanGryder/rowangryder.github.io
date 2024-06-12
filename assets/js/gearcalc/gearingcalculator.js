import BikeDataSet from "./bikeDataSet.js";
import BikeDataSetList from "./bikeDataSetList.js";

const dataSetList = new BikeDataSetList;

const dataSetListContainer = document.getElementById("bikeDataSets");


const standardWheelOptions = [
    [622, '700c/29" (622)'],
    [584, '650b/27.5" (584)'],
    [559, '26" (559)'],
    [406, '20" (406)']
];

const units = ["mm", "in"];

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        initApp();
    }
})



function initApp() {
    //make new data set when clicking the add button
    const addSetButton = document.getElementById("addDataSetButton");

    addSetButton.addEventListener("click", (event) => {
        event.preventDefault();
        //calculate next item ID
        const newItemId = calcNewItemId();
        //then create new blank item with that new ID
        const newItem = createEmptyDataSet(newItemId);
        //add new item to the list
        dataSetList.addItemToList(newItem);
        
        refreshPage();
    })
    //clear the html container for the list
    //create list items from data (url?)
    refreshPage();
}

function refreshPage() {
    //save data into url
    setURLData(window.location.href, dataSetList);
    //clear list view
    deleteElementContents(dataSetListContainer);
    //load data from url
    console.log("data set list = " + dataSetList);
    console.log("urlData = " + getURLData(window.location.href));
//    dataSetList = getURLData(window.location.href);
    //add in updated items
    renderList();
    //return focus to previous input
//    let lastInput = triggerEvent.target.id;
//    document.getElementById(lastInput).focus();
//    console.log(triggerEvent.target.id);
}

function deleteElementContents(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function renderList() {
    let list = dataSetList.getList();
    list.forEach(dataSet => {
        buildListItem(dataSet);
    })
}

function calcNewItemId() {
    let nextItemID = 1;
    let list = dataSetList.getList();
    if(list.length > 0) {
        nextItemID = list[list.length - 1].getId() + 1;
    }
    return nextItemID;
}

function createEmptyDataSet(dataSetId) {
    if(!listLimitMet()) {
        let dataSet = new BikeDataSet;
        dataSet.setId(dataSetId);
        return dataSet;
    }
}

function listLimitMet() {
    let limit = 8;
    let limitMet = false;
    if(dataSetList.getList().length >= limit) {
        limitMet = true;
    }
    return limitMet;
}

function buildListItem(dataSet) {
    let data = dataSet.getDataByArray();
    const form = document.createElement("form");
    
    const br = document.createElement("br");
    
    const buildName = document.createElement("input");
    buildName.id = "buildName" + dataSet.getId();
    buildName.value = dataSet.getName();
    buildName.setAttribute("type", "text");
    buildName.setAttribute("placeholder", "Build Label");
    
//    Selection for wheel standard sizes
    const wheelSelection = document.createElement("select");
    wheelSelection.id = "wheelSelection" + dataSet.getId();
    
    const wheelOption = (bsd, name) => {
        let option = document.createElement("option");
        option.setAttribute("value", bsd);
        option.innerHTML = name;
        return option;
    }
    
    const placeholderOption = (placeholderText) => {
        let option = document.createElement("option");
        option.setAttribute("value", "");
        option.disabled = true;
        option.innerHTML = placeholderText;
        return option;
    }
    
    wheelSelection.appendChild(placeholderOption("Common Wheel Sizes"));
    
    for(let i = 0; i < standardWheelOptions.length; i++) {
        wheelSelection.appendChild(wheelOption(standardWheelOptions[i][0], standardWheelOptions[i][1]));
    }
    
    if(dataSet.getWheelSelection() == null) {
        wheelSelection.selectedIndex = 0;
    } else {
        wheelSelection.selectedIndex = dataSet.getWheelSelection();
    }
    
    
    //Manual input for wheel size
    const wheelSize = document.createElement("input");
    wheelSize.id = "wheelSize" + dataSet.getId();
    wheelSize.value = dataSet.getWheelSize();
    wheelSize.setAttribute("type", "number");
    wheelSize.setAttribute("placeholder", "Wheel Size (BCD)");
    
    const tireSize = document.createElement("input");
    tireSize.id = "tireSize" + dataSet.getId();
    switch(dataSet.getTireMetric()) {
            case 0:
                tireSize.value = dataSet.getTireSize();
                break;
            case 1:
                tireSize.value = convertToInches(dataSet.getTireSize());
                break;
        }
    tireSize.setAttribute("type", "number");
    tireSize.setAttribute("placeholder", "Tire Size");
    
    const tireMetricSel = document.createElement("select");
    tireMetricSel.id = "tireMetricSel" + dataSet.getId();
    
    
    
    const metricOption = (unit) => {
        let option = document.createElement("option");
        option.innerHTML = unit;
        return option;
    }
    
    tireMetricSel.appendChild(metricOption(units[0]));
    tireMetricSel.appendChild(metricOption(units[1]));
    
    tireMetricSel.selectedIndex = dataSet.getTireMetric();
    
    //---Wheel Calculations---
    const wheelDia = document.createElement("p");
    if(dataSet.wheelDia > 0) {
        wheelDia.innerHTML = dataSet.wheelDia + "mm";
    } else {
        wheelDia.innerHTML = 0 + "mm";
    }
    
    const wheelCir = document.createElement("p");
    if(dataSet.wheelCir > 0) {
        wheelCir.innerHTML = dataSet.wheelCir + "mm";
    } else {
        wheelCir.innerHTML = 0 + "mm";
    }
    
    //---Chainset and Casette shit---
    const chainRings = document.createElement("input");
    chainRings.id = "chainRings" + dataSet.getId();
    chainRings.value = dataSet.getChainRings();
    chainRings.setAttribute("type", "text");
    chainRings.setAttribute("placeholder", "Chainrings");
    
    const crankLength = document.createElement("input");
    crankLength.id = "crankLength" + dataSet.getId();
    crankLength.value = dataSet.getCrankLength();
    crankLength.setAttribute("type", "number");
    crankLength.setAttribute("placeholder", "Crank Length");
    
    const cassetteCogs = document.createElement("input");
    cassetteCogs.id = "cassetteCogs" + dataSet.getId();
    cassetteCogs.value = dataSet.getCassetteCogs();
    cassetteCogs.setAttribute("type", "text");
    cassetteCogs.setAttribute("placeholder", "Cassette Cogs");
    
    //---Gearing Calculations---
    const totalRange = document.createElement("p");
    if(dataSet.totalRange > 0) {
        totalRange.innerHTML = dataSet.totalRange + "%";
    } else {
        totalRange.innerHTML = 0 + "%";
    }
    
    const radiusRatio = document.createElement("p");
    if(dataSet.radiusRatio > 0) {
        radiusRatio.innerHTML = dataSet.radiusRatio;
    } else {
        radiusRatio.innerHTML = 0;
    }
    
    const gainRatioMatrix = document.createElement("div");
    gainRatioMatrix.id = "gainRatioMatrix" + dataSet.getId();
    gainRatioMatrix.classList.add("matrix");
    
//    const matrixRow = document.createElement("tr");
//    const matrixData = document.createElement("td");
//    gainRatioMatrix.appendChild(matrixRow.cloneNode());
    const ringRow = document.createElement("div");
    ringRow.classList.add("row");
    const matrixHeader = document.createElement("div");
    matrixHeader.classList.add("data");
    matrixHeader.innerHTML = "Gain Ratio";
    
    ringRow.appendChild(matrixHeader.cloneNode(true));
    
    const cellPlaceholder = document.createElement("div");
    cellPlaceholder.classList.add("data");
    
    if(dataSet.getChainRings()) {
        let rings = dataSet.getChainRings().split(/,|-| /);
        
        for(let n = 0; n < rings.length; n++) {
            let ringCell = document.createElement("div");
            ringCell.classList.add("data");
            
            ringCell.innerHTML = rings[n];
            ringRow.appendChild(ringCell);
        }
        gainRatioMatrix.appendChild(ringRow.cloneNode(true));
        
        if(dataSet.getCassetteCogs()) {
            let cogs = dataSet.getCassetteCogs().split(/,|-| /);

            for(let y = 0; y < cogs.length; y++) {
                let cogRow = document.createElement("div");
                cogRow.classList.add("row");
                let cogData = document.createElement("div");
                cogData.classList.add("data");
                let crossData = document.createElement("div");
                crossData.classList.add("data");
                
                console.log(cogs[y]);

                cogData.innerHTML = cogs[y];
                cogRow.appendChild(cogData);

                for(let x = 0; x < rings.length; x++) {
                    crossData.innerHTML = calcGainRatio(dataSet.radiusRatio, rings[x], cogs[y]);
//                    crossData.innerHTML = rings[x] + "/" + cogs[y];
                    cogRow.appendChild(crossData.cloneNode(true));
                    console.log(x);
                }

                gainRatioMatrix.appendChild(cogRow);
            }
        }
        
    } else {
        ringRow.appendChild(cellPlaceholder.cloneNode(true));
        
        gainRatioMatrix.appendChild(ringRow.cloneNode(true));
    }
//    if(dataSet.getChainRings() != null) {
//        if(dataSet.getCassetteCogs() != null) {
//            let rings = dataSet.getChainRings().split(/,|-| /);
//            let cogs = dataSet.getCassetteCogs().split(/,|-| /);
//
//            for(let y = 0; y < rings.length + 1; y++) {
//                let row = document.createElement("tr");
//                for(let x = 0; x < cogs.length + 1; x++) {
//                    let cell = document.createElement("td");
//                    row.appendChild(cell);
//                }
//                gainRatioMatrix.appendChild(row);
//            }
//        }
//    }
    
    const gearInchesMatrix = document.createElement("div");
    gearInchesMatrix.id = "gearInchesMatrix" + dataSet.getId();
    gearInchesMatrix.classList.add("matrix");
    
    matrixHeader.innerHTML = "Gear Inches";
    
    //check the ring row is empty for this new matrix
    if(ringRow.childElementCount) {
        while(ringRow.firstChild) {
            ringRow.removeChild(ringRow.firstChild);
        }
    }
    
    ringRow.appendChild(matrixHeader.cloneNode(true));
    
    if(dataSet.getChainRings()) {
        let rings = dataSet.getChainRings().split(/,|-| /);
        
        for(let n = 0; n < rings.length; n++) {
            let ringCell = document.createElement("div");
            ringCell.classList.add("data");
            
            ringCell.innerHTML = rings[n];
            ringRow.appendChild(ringCell);
        }
        gearInchesMatrix.appendChild(ringRow.cloneNode(true));
        
        if(dataSet.getCassetteCogs()) {
            let cogs = dataSet.getCassetteCogs().split(/,|-| /);

            for(let y = 0; y < cogs.length; y++) {
                let cogRow = document.createElement("div");
                cogRow.classList.add("row");
                let cogData = document.createElement("div");
                cogData.classList.add("data");
                let crossData = document.createElement("div");
                crossData.classList.add("data");
                
                console.log(cogs[y]);

                cogData.innerHTML = cogs[y];
                cogRow.appendChild(cogData);

                for(let x = 0; x < rings.length; x++) {
                    crossData.innerHTML = calcGearInches(dataSet.wheelDia, rings[x], cogs[y]);
                    cogRow.appendChild(crossData.cloneNode(true));
                    console.log(x);
                }

                gearInchesMatrix.appendChild(cogRow);
            }
        }
    } else {
        ringRow.appendChild(cellPlaceholder.cloneNode(true));
        
        gearInchesMatrix.appendChild(ringRow.cloneNode(true));
    }
    
    //---Append all parts---
    form.appendChild(buildName);
    buildName.addEventListener("change", (event) => {
        dataSet.setName(buildName.value);
    })
    
//    form.appendChild(br.cloneNode());
    
    form.appendChild(wheelSelection);
    wheelSelection.addEventListener("change", (event) => {
         dataSet.setWheelSelection(wheelSelection.selectedIndex);
        wheelSize.value = wheelSelection.value;
        dataSet.setWheelSize(wheelSize.value);
        
        updateCalculations(dataSet);
    })
    
//    form.appendChild(br.cloneNode());
    
    form.appendChild(wheelSize);
    wheelSize.addEventListener("change", (event) => {
        dataSet.setWheelSize(wheelSize.value);
        dataSet.setWheelSelection(0);
        wheelSelection.selectedIndex = 0;
        
        updateCalculations(dataSet);
        focusNextInput(form, event);
    })

//    form.appendChild(br.cloneNode());
    
    form.appendChild(tireSize);
    tireSize.addEventListener("change", (event) => {
        dataSet.setTireSize(tireSize.value);
        
        switch(dataSet.getTireMetric()) {
            case 0:
                dataSet.setTireSize(tireSize.value);
                break;
            case 1:
                dataSet.setTireSize(convertFromInches(tireSize.value));
                break;
        }
        
        updateCalculations(dataSet);
        focusNextInput(form, event);
    })
    
    form.appendChild(tireMetricSel);
    tireMetricSel.addEventListener("change", (event) => {
        dataSet.setTireMetric(tireMetricSel.selectedIndex);
        
        updateCalculations(dataSet);
    })
    
    form.appendChild(wheelDia);
    
    form.appendChild(wheelCir);
    
    form.appendChild(chainRings);
    chainRings.addEventListener("change", (event) => {
        dataSet.setChainRings(chainRings.value);
        
        updateCalculations(dataSet);
        focusNextInput(form, event);
    })
    
    form.appendChild(crankLength);
    crankLength.addEventListener("change", (event) => {
        dataSet.setCrankLength(crankLength.value);
        
        updateCalculations(dataSet);
        focusNextInput(form, event);
    })
    
    form.appendChild(cassetteCogs);
    cassetteCogs.addEventListener("change", (event) => {
        dataSet.setCassetteCogs(cassetteCogs.value);
        
        updateCalculations(dataSet);
        focusNextInput(form, event);
    })
    
    form.appendChild(totalRange);
    
    form.appendChild(radiusRatio);
    
    form.appendChild(gainRatioMatrix);
    
    form.appendChild(gearInchesMatrix);
    
    dataSetListContainer.appendChild(form);
}

function storeInputOnChange(input, dataObject) {
    input.addEventListener("change", (event) => {
//        makeDataSetCalculations()
//        storeInputData(input.id);
        storeInputDataToObject()
    })
}

function focusNextInput(inputContainer, currentInputEvent) {
    //take the inputContainer as an array and find the next item in that array after the currentInputIdEvent
    let currentInput = currentInputEvent.target.id;
    let containerNodeList = inputContainer.childNodes;
    
    //filter just the input nodes inside the nodelist
    let inputNodes = Array.prototype.slice.call(containerNodeList).filter((element) => element.tagName === "INPUT");
    
    //load array with all html element ids of the input nodes
    let idArray = Array.prototype.slice.call(inputNodes).map((node) => node.id);
    
    //get currently selected input
    let currentInputIndex = idArray.indexOf(currentInput);
    
    //get the element id of the input next in the nodelist
    var nextId = inputNodes[0].id;
    
    if(currentInputIndex >= inputNodes.length - 1) {
        nextId = inputNodes[currentInputIndex].id;
    } else {
        nextId = inputNodes[currentInputIndex+1].id;
    }
    
    document.getElementById(nextId).focus();
}

//functions for calculations from inputs
function updateCalculations(dataObject) {
    let wheelDia = calcWheelDia(dataObject.getWheelSize(), dataObject.getTireSize());

    dataObject.wheelDia = wheelDia;
    
    let wheelCir = calcWheelCir(dataObject.getWheelSize(), dataObject.getTireSize());
    
    dataObject.wheelCir = wheelCir;
    
    let totalRange = calcTotalRange(dataObject.getChainRings(), dataObject.getCassetteCogs());
    
    dataObject.totalRange = totalRange;
    
    let radiusRatio = calcRadiusRatio(dataObject.wheelDia, dataObject.getCrankLength());
    
    dataObject.radiusRatio = radiusRatio;
    
    
    
    refreshPage();
}

function convertToInches(numberMM) {
    let mm = parseFloat(numberMM);
    let convertedUnit = mm / 25.4;
    return Math.round((convertedUnit + Number.EPSILON)*100)/100;
}

function convertFromInches(numberIN) {
    let inch = parseFloat(numberIN);
    let convertedUnit = inch * 25.4;
    return Math.round((convertedUnit + Number.EPSILON)*100)/100;
}

function calcWheelDia(wheelSize, tireSize) {
    //calculate wheel diameter
    
    //parse numbers
    let wS = parseFloat(wheelSize);
    let tS = parseFloat(tireSize);
    
    let diaCalc = tS*2+wS;
//    return (wheelSize+(tireSize*2));
    return  Math.round((diaCalc + Number.EPSILON)*100)/100;
}

function calcWheelCir(wheelSize, tireSize) {
    //calculate wheel diameter again without rounding
    let wS = parseFloat(wheelSize);
    let tS = parseFloat(tireSize);
    
    let diaCalc = tS*2+wS;
    //calculate circumference based off unrounded diameter
    let cirCalc = diaCalc*Math.PI;
    return Math.round((cirCalc + Number.EPSILON)*100)/100;
}

function calcRadiusRatio(wheelDia, crankLength) {
    //calcualte gain ratio.
    let wD = parseFloat(wheelDia);
    let cL = parseFloat(crankLength);
    
    let wheelRadius = wD/2;
    let radiusRatio = wheelRadius/cL;
    
    return Math.round((radiusRatio + Number.EPSILON)*100)/100;
}
    
function calcGainRatio(radiusRatio, ring, cog) {
    let rR = parseFloat(radiusRatio);
    let r = parseFloat(ring);
    let c = parseFloat(cog);
    
    let gainRatio = (r/c)*rR;
    
    return Math.round((gainRatio + Number.EPSILON)*100)/100;
}

function calcGearInches(wheelDia, ring, cog) {
    let wD = parseFloat(wheelDia);
    let r = parseFloat(ring);
    let c = parseFloat(cog);
    
    let wDInch = wD/25.4;
    
    let gearInches = (r/c)*wDInch;
    
    return Math.round((gearInches + Number.EPSILON)*100)/100;
}

function calcTotalRange(chainRings, cassetteCogs) {
    //(max ring/ min ring * max cog / min cog)*100 = total range percentage
    if(chainRings && cassetteCogs) {
        let rings = chainRings.split(/,|-| /);
        let ringsMin = Math.min.apply(null, rings);
        let ringsMax = Math.max.apply(null, rings);
        
        let cogs = cassetteCogs.split(/,|-| /);
        let cogsMin = Math.min.apply(null, cogs);
        let cogsMax = Math.max.apply(null, cogs);
        
        let totalRangeCalc = ((ringsMax/ringsMin)*(cogsMax/cogsMin))*100
    
        return Math.round((totalRangeCalc + Number.EPSILON)*10)/10;
    } else {
        return 0;
    }
}

//functions for loading and storing data
//function loadInputDataFromObject(dataObject) {
//    
//}
//
//function storeInputDataToObject(value, dataObject) {
//    dataObject.setDataEntry(value, value.id);
//}

function getURLData(url) {
//    //for loading data into BikeDataSetList from URL
//    let encodedDataString = url.split("?")[1]; //extract the data from the url
//    try {
//        var decodedDataString = decodeURIComponent(atob(encodedDataString)); //decodes the base64 data
//    } catch (er) {
//        console.error(er);
//        console.log("No data to decode")
//        return;
//    }
//    try {
//        var data = JSON.parse(decodedDataString);
//    } catch (er) {
//        console.error(er);
//    }
//    
//    return data;
}

function setURLData(url, dataObjectList) {
    //for encoding data from BikeDataSetList into page URL
    
    //turn entire list of data object into a string
//    let dataString = JSON.stringify(dataObjectList);
//    //encode string with base64
//    let encodedDataString = encodeURIComponent(btoa(dataString));
//    
//    let newUrl = new URL(url);
//    newUrl.search = encodedDataString;
//    
//    return newUrl.toString();
}