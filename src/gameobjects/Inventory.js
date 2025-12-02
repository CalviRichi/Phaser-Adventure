import { Item } from "./Item"; // figure out where this is used

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
        item.offSet.x = coord.x;
        item.offSet.y = coord.y;

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
        for (let i = 0; i < MAT_Y; i++) {
            for (let j = 0; j < MAT_X; j++) {
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
        if (!this.items.some(it => it.name == item)) return; // do not try to remove something not present
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == item) {
                toBeRemoved = this.items.splice(i, 1)[0];
                break;
            }
        }
        for (let i = toBeRemoved.offSet.y; i < toBeRemoved.vec.y + toBeRemoved.offSet.y; i++) {
            for (let j = toBeRemoved.offSet.x; j < toBeRemoved.vec.x + toBeRemoved.offSet.x; j++) {
                this.itemMatrix[i][j] = 0;
            }
        }
        toBeRemoved.offSet.x = 0; toBeRemoved.offSet.y = 0;

        // update the weight
        let count = 0;
        for (let i = 0; i < MAT_Y; i++) {
            for (let j = 0; j < MAT_X; j++) {
                if (this.itemMatrix[i][j]) count++;
            
            }
        }
        this.weightRatio = (count) ? count : 1;

        return toBeRemoved;

    }
}