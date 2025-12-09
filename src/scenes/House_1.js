import { Player } from "../gameobjects/Player.js";
import { Item } from "../gameobjects/Item.js";

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

        this.load.image("sword", "assets/sword_1.png");

        //----- PLAYER/CHARACTERS ------
        Player.preload(this);
    }
    create() {

        this.sys.events.on('wake', () => {
            this.player.clothing = this.scene.get('UI').clothing;
        });
        //------- BACKGROUND ------
        this.map = this.add.tilemap("house_1");
        const urban2 = this.map.addTilesetImage("urban2", "urban2"); //1st val is tileset name in tiled, 2nd val is name of loaded image
        const interior2 = this.map.addTilesetImage("interior2", "interior2");
        const indoor = this.map.addTilesetImage("indoor", "indoor");
        const classSet = this.map.addTilesetImage("classSet", "classSet");
        classSet.setSpacing(0, 1); //classSet has special spacing in tiled. 0 = margin, 1 = spacing
        var tileset = [urban2, interior2, indoor, classSet]; //combine all the tilesets
        //layer variables
        var walls, floor, solidDecor, decoration, tableDecor, door, objects;
        walls = this.map.createLayer("walls", tileset).setDepth(0).setScale(this.MAPSCALE);
        floor = this.map.createLayer("floor", tileset).setDepth(0).setScale(this.MAPSCALE);
        solidDecor = this.map.createLayer("decoration-solid-obj", tileset).setDepth(1).setScale(this.MAPSCALE);
        decoration = this.map.createLayer("decoration", tileset).setDepth(2).setScale(this.MAPSCALE);
        tableDecor = this.map.createLayer("table decor", tileset).setDepth(3).setScale(this.MAPSCALE);
        door = this.map.createLayer("door", tileset).setDepth(3).setScale(this.MAPSCALE);
        objects = this.map.getObjectLayer('Objects').objects;
        
        this.objects = this.physics.add.staticGroup();
        objects.forEach(obj =>  {
            let sprite = this.objects.create(obj.x + 260, obj.y + 128, "sword").setDepth(3).setScale(0.06);//.setScale(this.MAPSCALE);
            sprite.setOrigin(1,0);
            sprite.item = new Item("sword", 2, 2, 1, false);
            sprite.body.updateFromGameObject();
            // object defined with a name that matches a loaded image
           
           // this.objects.push(sprite);
        });
        //set up map collisions
        walls.setCollisionByExclusion([-1]);
        solidDecor.setCollisionByExclusion([-1]);
        door.setCollisionByExclusion([-1]);

        //------ PLAYER ------
        Player.createAnimations(this);
        //set player to spawn next to door
        const playerSpawn = this.map.tileToWorldXY(6, 3);
        const UI = this.scene.get('UI');
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, UI.clothing).setDepth(4).setScale(3.3);
        this.player.setSize(8, 9);
        this.player.setOffset(1.5, 5.5);

        //add collisions between player + game objects
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, solidDecor);
        this.physics.add.collider(this.player, door);

        
        this.physics.add.overlap(this.player, this.objects, (player, obj) => {

            // ADD TEXT FOR THIS

            // DO NOT ALLOW INTERACTION IF THE ITEM IS ALREADY IN THE PLAYER'S INVENTORY
            // THIS MEANS THAT IT HAS ALREADY BEEN PICKED UP
            if (Phaser.Input.Keyboard.JustDown(this.e)) {

                

                this.game.events.emit('itemMode', "house_1", true); 
                // send the item?
                //console.log("name: " + obj.item.name);
                this.scene.get('UI').trade_inventory.add(obj.item, {x: 0, y: 0});
                this.scene.get('UI').addRectangles();
                player.switchUI();
            }
        });

        //------ CAMERA STUFF -------
        this.cameras.main.setBounds(0, 0, this.MAPWIDTH, this.MAPHEIGHT);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(75, 75);
        this.cameras.main.setZoom(2);

        //------- KEYBOARD INPUT ------
        this.e = this.input.keyboard.addKey('E');

        //--------- VARIABLES -----
        this.last_time = 0;

        //------ TEXT PROMPTS ----
        //(using these in update())
        //start invisible, switch visibility in update, then switch again
        this.doorPrompt = this.add.text (100, 100, "hit E to use door", {
            fontSize: '30px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);
    }
    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        if (this.player){
            
            this.player.update();
        }
   //     else { return; }

        //finding center coords of camera so messages can be centered
        this.cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;
        this.cameraCenterY = this.cameras.main.scrollY + this.cameras.main.height / 2;
        //finding the tile number of where u r from the coords of where u are
        this.tileX = this.map.worldToTileX(this.player.x);
        this.tileY = this.map.worldToTileY(this.player.y + (this.player.height/2));

        //by the door: (x: 6, y: 3)
        if (this.tileX == 6 && this.tileY == 3){
            this.doorPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
            this.doorPrompt.setAlpha(1);

            if (Phaser.Input.Keyboard.JustDown(this.e)){
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.run('City');
                    
                    this.scene.sleep('House_1');
                    this.scene.get('City').cameras.main.fadeIn(500, 0, 0);
                });
            }
        }
        else {
            this.doorPrompt.setAlpha(0);
        }
    }
}