// backend scene

// manages inventory and player info on top of acutal UI elements
// makes the most sense for the UI to store the elements that it 
// is displaying
import { Inventory } from "../gameobjects/Inventory.js";
import { Item } from "../gameobjects/Item.js";

export class UI extends Phaser.Scene {
    
    constructor() {
        super("UI");

        this.MAPSCALE = 3;
    }
    preload() {
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("inventory", "assets/inventory.tmj");
    }
    create() {

        this.inventoryMap = this.add.tilemap("inventory");
        const urban2 = this.inventoryMap.addTilesetImage("urban2", "urban2");
        var inventory, infoPopUp;
        this.inventory = new Inventory();
        inventory = this.inventoryMap.createLayer("peepeepoopoo", urban2).setScale(this.MAPSCALE);
        //infopopup should only show when player is hovering over an item in their inventory
        //this is also used in tradeMode, for slightly diff purpose
        infoPopUp = this.inventoryMap.createLayer("info_popup", urban2).setScale(this.MAPSCALE);
        //this.infoPopUp.setAlpha(0);

        this.on = false;
        
        //this.tradeMode = false;

        this.clothing = 'robber';

        // (3,4) to (7,11)
        let item1 = new Item('test', 3, 3, 1, true);
        let item2 = new Item('next', 2, 4, 1, true);

        let inventory_adjust = this.inventoryMap.tileToWorldXY(2.5, 0.5);

        inventory.x += inventory_adjust.x;
        inventory.y -= inventory_adjust.y;
        
        infoPopUp.x += inventory_adjust.x;
        infoPopUp.y -= inventory_adjust.y;

        this.inventory.add(item1, {x: 0, y: 0});
        this.inventory.add(item2, {x: 0, y : 3});
        //this.inventory.printMatrix();
        //this.inventory.remove("test");
        //this.inventory.printMatrix();
        this.item_list = []; // this will work as a parallel to the inventory
        // item_list[i] corresponds to this.inventory.items[i]

        this.addRectangles(); // should be called every inventory call
        this.scene.setVisible(false);

        

        

        this.item_held_index = -1;

        this.input.on('pointerdown', (pointer) => {

            if (!this.on) return;

       //     console.log(pointer.x + " " + pointer.y);
            const tile = this.inventoryMap.getTileAtWorldXY(pointer.x, pointer.y, true, null, 'peepeepoopoo');
            // (3,4) to (7,11) are the valid inventory spots 
            if (tile && tile.index == 113) { // if it is a valid slot tile

                let adjustCoord = { x : tile.x - 3, y: tile.y - 4}; // adjusted to the dimensions of the inventory
                
                if (this.item_held_index != -1) { // if we are already holding an item
                    
                    let success;
                    success = this.inventory.moveItem(this.item_held_index, adjustCoord);
                //    this.inventory.items[this.item_held_index].origin.x = adjustCoord.x;
                //    this.inventory.items[this.item_held_index].origin.y = adjustCoord.y;
                   
                    if (success){
                        console.log("success");
                        this.item_held_index = -1;
                        this.addRectangles();
                    }
                    
                    
                    
                }
                else { // if we are picking up an item
                    
                for (let item = 0; item < this.inventory.items.length; item++) {
                    if (this.inventory.items[item].origin.x <= adjustCoord.x && 
                        this.inventory.items[item].origin.y <= adjustCoord.y &&
                        this.inventory.items[item].origin.x + (this.inventory.items[item].vec.x - 1) >= adjustCoord.x &&
                        this.inventory.items[item].origin.y + (this.inventory.items[item].vec.y - 1) >= adjustCoord.y
                    ) {
                        console.log("click");
                        this.item_held_index = item;
                    }
                }
                }
                
            }
            else {
                for (let i of this.inventory.items) {
                    console.log(i.name + '(' + i.origin.x + ", " + i.origin.y + ')');
                }
            }
        });

        this.last_tile = null;

        //this is a listener from City.js, for detecting what mode to launch ui in
        this.game.events.on('tradeMode', this.tradeMode, this);
    }

    //trade mode re-uses ui elements for different purposes than inventory
    tradeMode(location, tradeMode){
        //false means turn it off
        if (tradeMode == false){
            //this.infoPopUp.setAlpha(1);
        }

        //true means turn it on
        else{
            //this.infoPopUp.setAlpha(1); //make npc info/trading area visible
            switch (location){
                case "house_1": //apartment owned by
                    
                    break;
            }
        }
    }

    update(time) {

        if (this.on) {

            let pointer = this.input.activePointer;

            if (this.item_held_index != -1) {
                this.item_list[this.item_held_index].x = pointer.x;
                this.item_list[this.item_held_index].y = pointer.y;
            }

            const tile = this.inventoryMap.getTileAtWorldXY(pointer.x, pointer.y, true, null, 'peepeepoopoo');

            if (tile && (tile == this.last_tile || this.last_tile == null)) {
                if (tile.index == 113) {
                    tile.tint = 0xbbbbbb;
                }
            }
            else if (this.last_tile) {
                this.last_tile.tint = 0xffffff;
            }

            this.last_tile = tile;
        }
    }

    addRectangles() {

        for (let i = 0; i < this.item_list.length; i++) {
            this.item_list[i].destroy();
        }
        this.item_list.length = 0;

        for (let i = 0; i < this.inventory.items.length; i++) {
                
                let item = this.inventory.items[i];

                let itemCoord = this.inventoryMap.tileToWorldXY(item.origin.x + 3, item.origin.y + 4); // origin
                //console.log("item origin: " + item.origin.x + ", " + item.origin.y);                                                    
        
                let itemVec = this.inventoryMap.tileToWorldXY(item.vec.x - 2.5, item.vec.y + 0.5); // width and height
                //console.log("item vector: " + item.vec.x + ", " + item.vec.y);
                
                let itemColor;
                if (item.name == "test") {
                    itemColor = 0xff0000;
                }
                else {
                    itemColor = 0x00ff00;
                }
                let rect = this.add.rectangle(itemCoord.x, itemCoord.y, itemVec.x, itemVec.y, itemColor, 0.8).setOrigin(0);
                //console.log('adding ' + item.name + ' rectangle: ' + itemCoord.x + ", " + itemCoord.y + ", " + itemVec.x + ", " + itemVec.y);
                this.item_list.push(rect); // i corresponds
                //console.log("----------------");
        }

    }
}