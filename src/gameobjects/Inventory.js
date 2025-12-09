import { Item } from "./Item.js"; // figure out where this is used

export class Inventory {

    static SIZE = 40; // 5 x 8
    static MAT_X = 5;
    static MAT_Y = 8;

    constructor() {

        this.itemMatrix = [ // for now 5 x 8
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ];
        this.items = [];
        this.playerData = {hp : 10}; // add more at some points
        this.weightRatio = 1;
    }
    
    /**
     * Adds an item to the inventory
     * @param {Item} item - The item to be added
     * @param {vector} coord - The inventory coordinate to place it at
     * @returns {void}
     */
    add(item, coord){ // item is an object
        item.origin.x = coord.x;
        item.origin.y = coord.y;

        let itemVecX = item.vec.x + coord.x;
        let itemVecY = item.vec.y + coord.y;
        let tempMat = this.itemMatrix;

        for (let i = coord.y; i < itemVecY; i++) {
            for (let j = coord.x; j < itemVecX; j++) {
                if (tempMat[i][j]) {
                    console.log("placement not valid");
                    return;
                }
                else {
                    tempMat[i][j] = 1; // easy solution to not bother with resetting the matrix
                }
            }
        }
        this.items.push(item); // add to the actual list
        this.itemMatrix = tempMat; // adjust the geometric representation of the inventory

        // update the weight
        let count = 0;
        for (let i = 0; i < Inventory.MAT_Y; i++) {
            for (let j = 0; j < Inventory.MAT_X; j++) {
                if (this.itemMatrix[i][j]) count++;
            
            }
        }
        this.weightRatio = (count) ? count : 1;

    }

    /** 
     * Removes and returns an item corresponding to an input string
     * @param {string} item - Name of item
     * @returns {Item}
    */
    remove(item) {
        // get vectors, remove from matrix, remove from list
        let toBeRemoved;
        if (!this.items.some(it => it.name == item)) return null; // do not try to remove something not present

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == item) {
                toBeRemoved = this.items.splice(i, 1)[0];
                break;
            }
        }

        for (let i = toBeRemoved.origin.y; i < toBeRemoved.vec.y + toBeRemoved.origin.y; i++) {
            for (let j = toBeRemoved.origin.x; j < toBeRemoved.vec.x + toBeRemoved.origin.x; j++) {
                this.itemMatrix[i][j] = 0;
            }
        }

        toBeRemoved.origin.x = 0; toBeRemoved.origin.y = 0;

        // update the weight
        let count = 0;
        for (let i = 0; i < Inventory.MAT_Y; i++) {
            for (let j = 0; j < Inventory.MAT_X; j++) {
                if (this.itemMatrix[i][j]) count++;
            
            }
        }
        this.weightRatio = (count) ? count : 1;

        return toBeRemoved;

    }

    /**
     * 
     * @param {int} index
     * @param {vector} coord
     * @returns {boolean}  
     */
    moveItem(index, coord) {

        let backup = this.items[index].origin;
        
        let toBeMoved = this.items[index];

        for (let i = toBeMoved.origin.y; i < toBeMoved.vec.y + toBeMoved.origin.y; i++) {
            for (let j = toBeMoved.origin.x; j < toBeMoved.vec.x + toBeMoved.origin.x; j++) {
                this.itemMatrix[i][j] = 0;
            }
        }

        this.items[index].origin = coord;

        let itemVecX = toBeMoved.vec.x + coord.x;
        let itemVecY = toBeMoved.vec.y + coord.y;

        if (itemVecX - 1 >= Inventory.MAT_X || itemVecY -1 >= Inventory.MAT_Y) {
            this.items[index].origin = backup;
            console.log('placement not valid');
            return false;
        }
        let tempMat = [ // for now 5 x 8
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ];
        for (let i = 0; i < Inventory.MAT_Y; i++) {
            for (let j = 0; j < Inventory.MAT_X; j++) {
                tempMat[i][j] = this.itemMatrix[i][j];
            }
        }

        this.printMatrix();

        for (let i = coord.y; i < itemVecY; i++) {
            for (let j = coord.x; j < itemVecX; j++) {
                if (tempMat[i][j]) {
                    console.log("placement not valid");
                    this.items[index].origin = backup;
                    return false;
                }
                else {
                    tempMat[i][j] = 1; // easy solution to not bother with resetting the matrix
                }
            }
        }

        this.itemMatrix = tempMat;

        this.printMatrix();

        return true;


    }

    /**
     * Prints the list of items 
     */
    printItems() {
        console.log("Items:");
        for (let item of this.items) {
            console.log("name: " + item.name + ", "); // finish later
        }
    }

    /**
     * Prints the matrix slots occupied by items
     */
    printMatrix() {
        console.log("Item Matrix:")
        let line = "";
        for (let i = 0; i < Inventory.MAT_Y; i++) {
            line += "[ "
            for (let j = 0; j < Inventory.MAT_X; j++) {
                line += this.itemMatrix[i][j] + " ";
            }
            line += "]\n"
            //console.log(line);
        }
        console.log(line);
    }
}