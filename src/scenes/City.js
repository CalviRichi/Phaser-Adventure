//import { Cop } from "../gameobjects/Cop.js";
import { Player } from "../gameobjects/Player.js";
import { Bullet } from "../gameobjects/Bullet.js";

export class City extends Phaser.Scene{
    constructor(){
        super('City');

        //---- VARIABLES ----
        //constant for scaling
        this.MAPSCALE = 3.3;
        //each tile is 16x16px, w = 17, h = 16
        this.MAPHEIGHT = 16 * 16 * this.MAPSCALE;
        this.MAPWIDTH = 16 * 17 * this.MAPSCALE;
    }

    preload(){
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj"); // works

        //------- PLAYER/CHARACTERS -----
        Player.preload(this);
        //Cop.preload(this);
    }

    create(){
        this.last_time = 0; // copied from last project
        this.score = 0;

        this.last_UI_status = false;

        // In GameScene.create()
        this.dimmer = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(9999)
            .setVisible(false);


        //------- BACKGROUND ------
        this.map = this.add.tilemap("city");
        const urban1 = this.map.addTilesetImage("urban1", "urban1");
        const urban2 = this.map.addTilesetImage("urban2", "urban2");
        var tileset = [urban1, urban2];

        var door, cars, decoration, decoration_noclip, buildings, ground;

      //  const UI = scene.get("UI");
        
        door = this.map.createLayer("door", tileset).setDepth(3).setScale(this.MAPSCALE);
        cars = this.map.createLayer("cars", tileset).setDepth(2).setScale(this.MAPSCALE);
        decoration = this.map.createLayer("decoration", tileset).setDepth(2).setScale(this.MAPSCALE);
        decoration_noclip = this.map.createLayer("decoration_noclip", tileset).setDepth(2).setScale(this.MAPSCALE);
        buildings = this.map.createLayer("buildings", tileset).setDepth(1).setScale(this.MAPSCALE);
        ground = this.map.createLayer("ground", tileset).setDepth(0).setScale(this.MAPSCALE);

        buildings.setCollisionByExclusion([-1]); 
        door.setCollisionByExclusion([-1]);
        cars.setCollisionByExclusion([-1]);
        decoration.setCollisionByExclusion([-1]); // can maybe get rid of the other decoration layer by properly setting up collision with the tiles
        
        //-------- PLAYER --------
        Player.createAnimations(this);
        this.player = new Player(this, 300, 100).setDepth(4); // not sure what x and y are yet
        this.player.setScale(3.3);
        this.player.body.setSize(8, 9); //change hitbox size
        this.player.setOffset(1.5, 5.5); //change hitbox loc
        // the only layers the player DOES NOT collide with are "ground" and "decoration_noclip"
        this.physics.add.collider(this.player, buildings, (player, tile) => {
           // console.log("building");
        });
        
        this.physics.add.collider(this.player, door, (player, tile) => {
        //    console.log(tile.index);
            
            if ( player.enter && (tile.index == 310 || tile.index == 1506 || tile.index == 1435 || tile.index == 1436)) {
                player.x -= 200;
            }
            /*
            let house = "";
            switch (tile.index) {
                case 309:
                    house = "business"; 310
                    break;
                case 1019:
                    house = "apartment"; // 1506
                    break;
                case 948: // 948 and 949 would do the same thing // 1435 and 36
                    house = "market";
                    break;
                case 949:
                    house = "market";
                    break;
            }
            if (player.outfit == "robber") {
                this.enterHouse(house);
            }
            else if (player.outfit == "business") {
                // check if NPC home -> sell sequence
                this.beginSale(house);
            }
            */
            
        });
        
        this.physics.add.collider(this.player, cars, (player, tile) => {

        });
        this.physics.add.collider(this.player, decoration, (player, tile) => {

        });

        //---------- CAMERA STUFF --------
        this.cameras.main.setBounds(0, 0, this.MAPWIDTH, this.MAPHEIGHT); //prevent camera from showing dead space
        this.cameras.main.startFollow(this.player, true); //follow player
        this.cameras.main.setDeadzone(75, 75); //bit of cushion around following the player
        this.cameras.main.setZoom(2);

        //------- KEYBOARD INPUT ------
        this.e = this.input.keyboard.addKey('E');

        //------- TEXT PROMPTS ------
        //(using these in update())
        this.lairDoorPrompt = this.add.text(100, 100, "hit E to use door", {
            fontSize: '30px',
            fontFamily: 'Lucida Console',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);

        this.doorPrompt = this.add.text(100, 100, "hit E to start unlocking door", {
            fontSize: '30px',
            fontFamily: 'Lucida Console',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);
    }

    update(time){
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        //call player update to allow movement/animation change
        this.player.update();
        //center coords of camera
        this.cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;
        this.cameraCenterY = this.cameras.main.scrollY + this.cameras.main.height / 2;
        //finding the tile number of where u r from the coords of player
        this.tileX = this.map.worldToTileX(this.player.x);
        this.tileY = this.map.worldToTileY(this.player.y + (this.player.height/2));
        //lair door: (x: 15, y: 9)
        if (this.tileX == 15 && this.tileY == 9){
            this.lairDoorPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
            this.lairDoorPrompt.setAlpha(1);
            
            //only listen for key presses if they're in the right area
            if (Phaser.Input.Keyboard.JustDown(this.e)){


                this.cameras.main.fadeOut(500, 0, 0, 0);


                this.cameras.main.once('camerafadeoutcomplete', () => {


                    this.scene.run('Player_Lair');
     
                    this.scene.sleep('City');
                    this.scene.get('Player_Lair').cameras.main.fadeIn(500,0,0);
                });
                
            }
        }
        else {
            this.lairDoorPrompt.setAlpha(0);
        }
        //apartment door: (x: 1, y: 10)

        // if (this.player.enter) {
        //     console.log("E pressed");
        // }
        let UI = this.scene.get('UI');
        if (this.player.UI_on != this.last_UI_status) {
            
            console.log("UI");
            this.scene.bringToTop('UI');
            UI.scene.setVisible(true);
            UI.on = true;
            this.dimmer.setVisible(true);

            if (this.last_UI_status) {
                this.last_UI_status = false;
                this.scene.sendToBack('UI');
                UI.scene.setVisible(false);
                UI.on = false;
                this.dimmer.setVisible(false);

            }
            else {
                this.last_UI_status = true;
            }
        }
     //   console.log(this.player.x + ", " + this.player.y);

        
        
    }

    enterHouse(house) {
        
        if (house == "business") {
            house = "House_1";
        }
        else if (house == "market") {
            house = "House_2";
        }
        else if (house == "apartment") {
            house = "House_3"
        }
        // inventory is still running, player is always in the robber outfit
        this.scene.start(house, {});
        
    }

    beginSale(house) {

    }


}