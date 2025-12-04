import { Player } from "../gameobjects/Player.js";

export class Title_Screen extends Phaser.Scene {
    constructor() {
        super('Title_Screen');
    }

    preload() {
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        //this.load.image();
        
        //----- PLAYER -----
        Player.preload(this);

        //------- CHARACTER -------
        this.load.spritesheet("NPCyapper", "assets/characters/chick_right.png", { frameWidth: 11, frameHeight: 15 });

        //------ KEYCAPS ------
        this.load.image("W", "assets/keyCaps/tile_0086.png");
        this.load.image("A", "assets/keyCaps/tile_0120.png");
        this.load.image("S", "assets/keyCaps/tile_0121.png");
        this.load.image("D", "assets/keyCaps/tile_0122.png");
        this.load.image("E", "assets/keyCaps/tile_0087.png");
    }

    create() {
        //------ BACKGROUND ------


        //------- PLAYER ----------
        Player.createAnimations(this);

        //------- CHARACTER --------
        if (!this.anims.exists("yapper")){
            this.anims.create({
                key: "yapper",
                frames: [
                    { key: "NPCyapper", frame: 0 },
                    { key: "NPCyapper", frame: 1 },
                    { key: "NPCyapper", frame: 0 },
                    { key: "NPCyapper", frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        this.npcYapper = this.add.sprite(100, 100, "NPCyapper").setDepth(5).setScale(3);
        this.npcYapper.play("yapper");

        //-------- TITLE & CREATORS ---------

        //------- CONTROLS ---------
    }

    update(time){
        this.scene.stop("Title_Screen");
        this.scene
        
    }
}