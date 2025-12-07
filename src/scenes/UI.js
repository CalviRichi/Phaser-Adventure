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
        infoPopUp = this.inventoryMap.createLayer("info_popup", urban2).setScale(this.MAPSCALE);

        this.on = false;

        this.clothing = 'robber';

        // (3,4) to (7,11)
        let item1 = new Item('test', 3, 3, 1, true);
        let item2 = new Item('next', 2, 4, 1, true);
        this.inventory.add(item1, {x: 0, y: 0});
        this.inventory.add(item2, {x: 0, y : 3});
        this.item_group = this.add.group('items'); // contains different rectangles
        this.addRectangles(); // should be called every inventory call

        this.scene.setVisible(false);

        let inventory_adjust = this.inventoryMap.tileToWorldXY(2.5, 0.5);

        inventory.x += inventory_adjust.x;
        inventory.y -= inventory_adjust.y;
        
        infoPopUp.x += inventory_adjust.x;
        infoPopUp.y -= inventory_adjust.y;

        this.input.on('pointerdown', (pointer) => {

            if (!this.on) return;

       //     console.log(pointer.x + " " + pointer.y);
            const tile = this.inventoryMap.getTileAtWorldXY(pointer.x, pointer.y, true, null, 'peepeepoopoo');
            // (3,4) to (7,11) are the valid inventory spots 
            if (tile) {
                
         //       console.log('Clicked tile:', tile.x, tile.y);
          //      console.log('Tile index:', tile.index);
            }
        });

        this.last_tile = null;

    }
    update(time) {

        if (this.on) {

            let pointer = this.input.activePointer;

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

        this.item_group.clear(true);

        for (let item of this.inventory.items) {
                
                let itemCoord = this.inventoryMap.tileToWorldXY(item.origin.x + 3 + 2.5, item.origin.y + 3.5); // origin
          //      console.log("origin: " + itemCoord.x + ', ' + itemCoord.y);
                let itemVec = this.inventoryMap.tileToWorldXY(item.vec.x, item.vec.y); // width and height
            //    console.log('vector: ' + (itemVec.x + itemCoord.x) + ', ' + (itemVec.y + itemCoord.y));
                let itemColor;
                if (item.name == "test") {
                    itemColor = 0xff0000;
                }
                else {
                    itemColor = 0x00ff00;
                }
                const rect = this.add.rectangle(itemCoord.x, itemCoord.y, itemVec.x, itemVec.y, itemColor, 0.8).setOrigin(0,0);
                this.item_group.add(rect);
        }

    }
}