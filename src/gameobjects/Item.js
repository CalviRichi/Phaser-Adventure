export class Item {
    // CONSIDER 
    //  Write a JSON file with all of the data for these and greatly simplify
    //      Object on map would correspond to one of the JSON objects
    //  Extend Phaser sprite because these need to show up as objects in the world

    static count; // number of items created
    // used to avoid name conflicts in the storage system

    /*

    golf clubs
        vec (2, 4)
        value 15
        description
    */
    constructor(name = 'basic') {

        Item.count++;

        if (name !== 'basic')
            this.name = name;
        this.vec; // space taken up in inventory
        this.origin = {x: 0, y: 0}; // used when inserting and deleting in list
        this.value; // value that it sells for 
        this.description = "Nothing in particular";
        this.color; // color that it appears as in the inventory

        switch (name) {
            case "backpack":
                this.vec = {x: 3, y: 3};
                this.value = 10;
                this.description = "A fairly basic backpack, \nin pretty good condition";
                this.color = 0xff0000; // red
                break;
            case "golf clubs":
                this.vec = {x: 2, y: 3};
                this.value = 15;
                this.description = "Some expensive looking golf clubs, \nfairly used though";
                this.color = 0x00ff00; // green
                break;
            case "sword":
                this.vec = {x: 1, y: 3};
                this.value = 20;
                this.color = 0x0000ff; // blue
                this.description = "This thing looks like \na collector's item!";
                break;
            default:
                this.name = "item_" + Item.count;
                this.vec = {x: 2, y: 2};
                this.value = 5;
                this.color = 0xbbbbbb; // grey?
                break;
        }
  
    }
}