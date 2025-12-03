import { Inventory } from "./Inventory.js";

export class Player extends Phaser.Physics.Arcade.Sprite{
    //this is to preload images/sprites so animations can be made here
    static preload(scene){ //u need to call this for every scene u want a player in w/ "Player.preload(this);" in every scene's preload() 
        //robber costume spritesheets
        scene.load.spritesheet('robberFront', 'assets/characters/robber_front.png', { frameWidth: 11, frameHeight: 15});
        scene.load.spritesheet('robberRight', 'assets/characters/robber_right.png',);
    }

    //actually create the animations
    static createAnimations(scene){ //u need to call this for every scene u want a player in w/ "Player.createAnimations(this);" in every scene's create()
        //robber animations
        //idle (will face forward when idle)
        if (!scene.anims.exists('robber_idle')){ //this line helps it be less buggy (doesn't create animations multiple times)
            scene.anims.create({
                key: 'robber_idle',
                frames: [
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1 //loop infinitely
            });
        }
        if (!scene.anims.exists('robber_front')){
            scene.anims.create({
                key: 'robber_front',
                frames: [
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 1 },
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
    }

    constructor(scene, x, y){

        super(scene, x, y, 'robberFront', 0); //start w frame 0 of robber front by default
        /*
        The player will take in whatever state that the inventory provides it
        */
        //this.weapon = 

        this.scene = scene;
        this.x = x; this.y = y;
        this.clothing = "robber";

        //adding physics n world colliders to player sprite
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);
        //play idle animation by default
        this.play('robber_idle');
    }

    update() {
        return;
    }


}