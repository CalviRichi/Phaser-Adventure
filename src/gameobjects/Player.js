import { Inventory } from "./Inventory";

export class Player extends Phaser.Physics.Arcade.Sprite{
    //this is to preload images/sprites so animations can be made here
    static preload(scene){

    }

    //actually create the animations
    static createAnimations(scene){

    }

    constructor(scene, x, y){

        /*
        The player will take in whatever state that the inventory provides it
        */

        this.scene = scene;
        this.x = x; this.y = y;
    }
}