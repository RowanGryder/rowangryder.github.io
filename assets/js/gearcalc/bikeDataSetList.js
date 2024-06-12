export default class BikeDataSetList {
    constructor() {
        this._list = [];
    }
    
    getList() {
        return this._list;
    }
    
    addItemToList(itemObj) {
        this._list.push(itemObj);
    }
    
    removeItemFromList(id) {
        for(let i = 0; i < this._list.length; i++) {
            if(list[i]._id == id) {
                list.splice(i, 1);
                break;
            }
        }
    }
    
    clearList() {
        this._list = [];
    }
    
}