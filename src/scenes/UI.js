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
        inventory = this.inventoryMap.createLayer("peepeepoopoo", urban2).setScale(this.MAPSCALE);
        //infopopup should only show when player is hovering over an item in their inventory
        infoPopUp = this.inventoryMap.createLayer("info_popup", urban2).setScale(this.MAPSCALE);
    }
    update(time) {

    }
}