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
    }

    create(){

    }

    update(){

    }
}