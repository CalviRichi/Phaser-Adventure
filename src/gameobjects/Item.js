export class Item {
    // CONSIDER 
    //  Write a JSON file with all of the data for these and greatly simplify
    constructor(name, x, y, value, canBeSold) {
        this.name = name;
        this.vec = {x : x, y : y}; // space taken up in inventory
        this.offSet = {x : 0, y: 0}; // used when deleting from list
        this.value = value; // if sellable: value, else if weapon: damage
        this.canBeSold = canBeSold;
    }
}