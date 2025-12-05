// backend scene

// manages inventory and player info on top of acutal UI elements
// makes the most sense for the UI to store the elements that it 
// is displaying
import { Inventory } from "../gameobjects/Inventory.js";

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

        inventory.x += 120;
        inventory.y -= 20.
        infoPopUp.x += 120;
        infoPopUp.y -= 20;

        this.input.on('pointerdown', (pointer) => {

            if (!this.on) return;

            const worldX = pointer.worldX;
            const worldY = pointer.worldY;
            console.log(pointer.x + " " + pointer.y);
            const tile = this.inventoryMap.getTileAtWorldXY(pointer.x, pointer.y, true, null, 'peepeepoopoo');
            // (3,4) to (7,11) are the valid inventory spots 
            if (tile) {
                
                console.log('Clicked tile:', tile.x, tile.y);
                console.log('Tile index:', tile.index);
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
}