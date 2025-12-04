import { Player } from "../gameobjects/Player.js";

export class House_1 extends Phaser.Scene {
    //apartment in the off-white yellowish brick building
    constructor() {
        super("House_1");

        //----VARIABLES-----
        this.MAPSCALE = 2; //constant for scaling
        //each tile is 16x16px, w = 24, h = 12
        this.MAPHEIGHT = 16 * 12 * this.MAPSCALE;
        this.MAPWIDTH = 16 * 24 * this.MAPSCALE;
    }
    preload() {
        //----- BACKGROUND -----
        this.load.image("urban2", "assets/urban2.png");
        this.load.image("interior2", "assets/interior2/Tiled_files/Interior.png");
        this.load.image("indoor", "assets/kennyIndoor_transparent.png");
        this.load.image("classSet", "assets/class_tilesheet.png");
        this.load.tilemapTiledJSON("house_1", "assets/apartment.tmj");

        //----- PLAYER/CHARACTERS ------
    }
    create() {
        //------- BACKGROUND ------
        this.map = this.add.tilemap("house_1");
        const urban2 = this.map.addTilesetImage("urban2", "urban2"); //1st val is tileset name in tiled, 2nd val is name of loaded image
        const interior2 = this.map.addTilesetImage("interior2", "interior2");
        const indoor = this.map.addTilesetImage("indoor", "indoor");
        const classSet = this.map.addTilesetImage("classSet", "classSet");
        classSet.setSpacing(0, 1); //classSet has special spacing in tiled. 0 = margin, 1 = spacing
        var tileset = [urban2, interior2, indoor, classSet]; //combine all the tilesets
        //layer variables
        var walls, floor, solidDecor, decoration, tableDecor, door;
        walls = this.map.createLayer("walls", tileset).setDepth(0).setScale(this.MAPSCALE);
        floor = this.map.createLayer("floor", tileset).setDepth(0).setScale(this.MAPSCALE);
        solidDecor = this.map.createLayer("decoration-solid-obj", tileset).setDepth(1).setScale(this.MAPSCALE);
        decoration = this.map.createLayer("decoration", tileset).setDepth(2).setScale(this.MAPSCALE);
        tableDecor = this.map.createLayer("table decor", tileset).setDepth(3).setScale(this.MAPSCALE);
        door = this.map.createLayer("door", tileset).setDepth(3).setScale(this.MAPSCALE);
    }
    update(time) {

    }
}