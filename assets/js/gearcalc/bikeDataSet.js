export default class BikeDataSet {
    constructor() {
        this._id = null;
        this._name = null;
        
        this._dataSet = [];
        
        this._wheelSize = null;
        this._wheelSelect = null;
        this._tireSize = null;
        this._tireMetric = 0;
        this._chainRings = null;
        this._crankLength = null;
        this._cassetteCogs = null;
    }
    
    getId() {
        return this._id;
    }
    
    setId(id) {
        this._id = id;
    }
    
    getName() {
        if(this._name == null) {
            this._name = "";
        }
        return this._name;
    }
    
    setName(newName) {
        this._name = newName;
    }
    
    getWheelSelection() {
        return this._wheelSelect;
    }
    
    setWheelSelection(newValue) {
        this._wheelSelect = newValue;
    }
    
    getWheelSize() {
        return this._wheelSize;
    }
    
    setWheelSize(newValue) {
        this._wheelSize = newValue;
    }
    
    getTireSize() {
        return this._tireSize;
    }
    
    setTireSize(newValue) {
        this._tireSize = newValue;
    }
    
    getTireMetric() {
        return this._tireMetric;
    }
    
    setTireMetric(newValue) {
        this._tireMetric = newValue;
    }
    
    getChainRings() {
        return this._chainRings;
    }
    
    setChainRings(newValue) {
        this._chainRings = newValue;
    }
    
    getCrankLength() {
        return this._crankLength;
    }
    
    setCrankLength(newValue) {
        this._crankLength = newValue;
    }
    
    getCassetteCogs() {
        return this._cassetteCogs;
    }
    
    setCassetteCogs(newValue) {
        this._cassetteCogs = newValue;
    }
    
    setDataByArray(data, dataName) {
//        this._dataSet[dataSlot] = data;
        switch(dataName) {
            case "wheelSize":
                this._wheelSize;
                break;
            case "tireSize":
                this._tireSize;
                break;
            case "chainRings":
                this._chainRings;
                break;
            case "crankLength":
                this._crankLength;
                break;
            case "cassetteCogs":
                this._cassetteCogs;
                break;
        }
    }
    
    getDataByArray() {
//        this._dataSet.push([this._wheelSize, this._tireSize, this._chainRings, this._crankLength, this._cassetteCogs);
        this._dataSet.push(
            ["wheelSize", this._wheelSize],
            ["tireSize", this._tireSize],
            ["chainRings", this._chainRings],
            ["crankLength", this._crankLength],
            ["cassetteCogs", this._cassetteCogs]
        )
        
        return this._dataSet;
    }
}