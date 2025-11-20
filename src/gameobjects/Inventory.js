export class Inventory {

    static MAX_ITEMS = 10; // doesn't have to be 10

    constructor() {
        this.items = [];
        this.playerData = {hp : 10}; // add more at some points
    }
    
    add(item){
        if (this.items.size < MAX_ITEMS) {
            this.items.push(item);
        }
    }

    remove() {

    }
}