export class Item {
    // CONSIDER 
    //  Write a JSON file with all of the data for these and greatly simplify
    //      Object on map would correspond to one of the JSON objects
    //  Extend Phaser sprite because these need to show up as objects in the world
    constructor(name, x, y, value, canBeSold) {
        this.name = name;
        this.vec = {x : x, y : y}; // space taken up in inventory
        this.offSet = {x : 0, y: 0}; // used when deleting from list
        this.value = value; // if sellable: value, else if weapon: damage
        this.canBeSold = canBeSold;
    }
}