import { Player } from "../gameobjects/Player.js";

export class Player_Lair extends Phaser.Scene{
    constructor(){
        super('Player_Lair');

        //----- VARIABLES ----
        this.MAPSCALE = 3;
        //each tile is 16x16px, w = 14, h = 12
        this.MAPHEIGHT = 16 * 12 * this.MAPSCALE;
        this.MAPWIDTH = 16 * 14 * this.MAPSCALE;
    }

    preload(){
        //------ BACKGROUND -----
        this.load.image("interior2", "assets/interior2/Tiled_files/Interior.png");
        this.load.image("indoor", "assets/kennyIndoor_transparent.png");
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("playerLair", "assets/player_lair.tmj");
    }

    create(){
        //--------- BACKGROUND -------
        this.lair = this.add.tilemap("playerLair");
        const interior2 = this.lair.addTilesetImage("interior2", "interior2");
        const indoor = this.lair.addTilesetImage("indoor", "indoor");
        const urban1 = this.lair.addTilesetImage("urban1", "urban1");
        const urban2 = this.lair.addTilesetImage("urban2", "urban2");
        var tileset = [interior2, indoor, urban1, urban2];
        var walls, floor, solidDecor, decoration, shelfDecor, door;
        walls = this.lair.createLayer("walls", tileset).setDepth(0).setScale(this.MAPSCALE);
        floor = this.lair.createLayer("floor", tileset).setDepth(0).setScale(this.MAPSCALE);
        solidDecor = this.lair.createLayer("decoration-solid-obj", tileset).setDepth(1).setScale(this.MAPSCALE);
        decoration = this.lair.createLayer("decoration", tileset).setDepth(2).setScale(this.MAPSCALE);
        shelfDecor = this.lair.createLayer("shelf-decor", tileset).setDepth(3).setScale(this.MAPSCALE);
        door = this.lair.createLayer("door", tileset).setDepth(3).setScale(this.MAPSCALE);
    }

    update(){

    }
}