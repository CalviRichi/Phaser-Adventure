import { Inventory } from "./Inventory.js";

export class Player extends Phaser.Physics.Arcade.Sprite{
    //this is to preload images/sprites so animations can be made here
    static preload(scene){

        scene.load.image("player", "assets/Trollface.png");
    }

    //actually create the animations
    static createAnimations(scene){

    }

    constructor(scene, x, y){

        super(scene, x, y, "player");
        /*
        The player will take in whatever state that the inventory provides it
        */
        //this.weapon = 

        this.scene = scene;
        this.x = x; this.y = y;
        this.clothing = "robber";

    }

    update() {
        return;
    }


}