import { Player } from "../gameobjects/Player.js";

export class Player_Lair extends Phaser.Scene{
    constructor(){
        super('Player_Lair');

        //----- VARIABLES ----
        this.MAPSCALE = 3.5;
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

        //---- PLAYER -----
        Player.preload(this);
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

        //set up map collisions
        walls.setCollisionByExclusion([-1]);
        solidDecor.setCollisionByExclusion([-1]);
        door.setCollisionByExclusion([-1]);

        //-------- PLAYER -----
        Player.createAnimations(this);
        //i want the player to spawn next to the door (tile: x: 2, y: 3)
        const playerSpawn = this.lair.tileToWorldXY(2, 3);
        this.player = new Player(this, playerSpawn.x + 25, playerSpawn.y).setDepth(4).setScale(3.3);
        this.player.setSize(8, 9);
        this.player.setOffset(1.5, 5.5);

        //add collisions between player + game objects
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, solidDecor);
        
        //idk how to do door stuff !!!
        this.physics.add.collider(this.player, door);

        //-------- CAMERA STUFF ------
        this.cameras.main.setBounds(0, 0, this.MAPWIDTH, this.MAPHEIGHT);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(75, 75);
        this.cameras.main.setZoom(2);

        //------- KEYBOARD INPUT ------
        //interact key to open door/change clothes
        this.e = this.input.keyboard.addKey('E');

        //--------- VARIABLES -----
        this.last_time = 0;

        //------ TEXT PROMPTS ----
        //(using these in update())
        //start invisible, switch visibility in update, then switch again
        this.doorPrompt = this.add.text (100, 100, "hit E to use door", {
            fontSize: '40px',
            fontFamily: 'Lucida Console',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setResolution(1).setOrigin(0.5);

        this.clothesPrompt = this.add.text(100, 100, "hit E to change outfit", {
            fontSize: '40px',
            fontFamily: 'Lucida Console',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setResolution(1).setOrigin(0.5);
    }

    update(time){
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        this.player.update();

        //finding center coords of camera so messages can be centered
        this.cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;
        this.cameraCenterY = this.cameras.main.scrollY + this.cameras.main.height / 2;
        //finding the tile number of where u r from the coords of where u are
        this.tileX = this.lair.worldToTileX(this.player.x);
        this.tileY = this.lair.worldToTileY(this.player.y + (this.player.height/2));

        //by the door: (x: 2, y: 3)
        if (this.tileX == 2 && this.tileY == 3){
            this.doorPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
            this.doorPrompt.setAlpha(1);

            //only listen for key presses if theyre in the right area
            if (Phaser.Input.Keyboard.JustDown(this.e)){
                //CHANGE SCENES OR SOMETHING
                //IDKKKKKKK
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.resume('City');
                    if (this.player){
                        this.player.destroy();
                    }
                    this.scene.stop('Player_Lair');
                });
            }
        } 
        //by the clothesline: (x: 7-12, y: 8-10)
        else if (this.tileX >= 7 && this.tileX <= 12 && this.tileY >= 8 && this.tileY <= 10) {
            this.clothesPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
            this.clothesPrompt.setAlpha(1);

            if (Phaser.Input.Keyboard.JustDown(this.e)){
                //CHANGE PLAYER COSTUME
                if (this.player.clothing == "robber"){
                    this.player.clothing = "business";
                    this.player.setTexture("businessFront", 0);
                }
                else {
                    this.player.clothing = "robber";
                    this.player.setTexture("robberFront", 0);
                }

                //forcing to idle animations if the player doesn't move
                if (this.player.clothing == "robber"){
                    this.player.play("robber_idle", true);
                }
                else {
                    this.player.play("business_idle", true);
                }
            }
        }
        else {
            //turn prompts invisible if player is not in the area
            this.doorPrompt.setAlpha(0);
            this.clothesPrompt.setAlpha(0);
        }

        //by the changing area: (x: , y: )
    }
}