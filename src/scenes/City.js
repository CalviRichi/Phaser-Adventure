import { Cop } from "../gameobjects/Cop.js";
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

        //variables for cop spawning
        this.copSpawnTimer = null; //to keep track of time for the spawning
        this.spawnRate = 5000; //how often they will spawn (30000 = 30 seconds apart)
        this.maxCops = 10; //use this variable to limit how many cops can be spawned in at any one time (if needed)
        this.copLoc = "right"; //to know which side of the street to spawn them on
        this.coordx = 0; //to know which coord locations to spawn them at
        //the following variables are for when cops r aggressive to player
        this.copsAggressive = false; //keep track when aggressive mode
        this.aggressiveTimer = null; //cooldown timer for cops to go back to normal mode (if player gets away yk)
        this.copRange = 120; //range that cops can detect player/range for if player is far enough away for cops to not be aggro
        this.escapeTime = 4000; //how many seconds player need to be out of cop range
        this.aggroSpawnRate = 1000; //how often cops will spawn when aggro
        this.copAttackRate = 1000; //how often cops can damage player 
        this.lastDamageTime = 0; //to help keep track of copAttackRate
        this.aggressiveCops = []; //keep track of which cops r aggressive at any point
    }

    preload(){
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj"); // works

        //------- PLAYER/CHARACTERS -----
        Player.preload(this);
        Cop.preload(this);
    }

    create(){
        //i only want this sound to play when police r aggro
        this.police = this.sound.add('police siren', {
            volume: 0.8,
            loop: true 
        });

        this.sys.events.on('wake', ()=> {
            this.sound.stopAll(); //kill any lingering music
            this.bgmusic = this.sound.add('bgmusic', {
                volume: 1.2,
                loop: true
            });
            this.bgmusic.play();     
        });

        this.doorSound = this.sound.add('door', {
            volume: 2, 
            loop: false
        });
        
        
        this.last_time = 0; // copied from last project
        this.score = 0;

        this.last_UI_status = false;

        this.sys.events.on('wake', () => {
           this.player.clothing = this.scene.get("UI").clothing;
           /*
           this is the best place for updating all of the player info, because it runs every transition

           */
        });

        // In GameScene.create()
        


        //------ HUD ----
        //just making sure its active + at the top
        if (!this.scene.isActive('HUD')){
            this.scene.launch('HUD');
        }
        this.scene.bringToTop('HUD');
        
        //------- BACKGROUND ------
        this.map = this.add.tilemap("city");
        const urban1 = this.map.addTilesetImage("urban1", "urban1");
        const urban2 = this.map.addTilesetImage("urban2", "urban2");
        var tileset = [urban1, urban2];

        //var door, cars, decoration, decoration_noclip, buildings, ground;
        //gotta change em from vars cuz i need to access them elsewhere (cop spawning area)

      //  const UI = scene.get("UI");
        
        this.door = this.map.createLayer("door", tileset).setDepth(3).setScale(this.MAPSCALE);
        this.cars = this.map.createLayer("cars", tileset).setDepth(2).setScale(this.MAPSCALE);
        this.decoration = this.map.createLayer("decoration", tileset).setDepth(2).setScale(this.MAPSCALE);
        this.decoration_noclip = this.map.createLayer("decoration_noclip", tileset).setDepth(2).setScale(this.MAPSCALE);
        this.buildings = this.map.createLayer("buildings", tileset).setDepth(1).setScale(this.MAPSCALE);
        this.ground = this.map.createLayer("ground", tileset).setDepth(0).setScale(this.MAPSCALE);

        this.buildings.setCollisionByExclusion([-1]); 
        this.door.setCollisionByExclusion([-1]);
        this.cars.setCollisionByExclusion([-1]);
        this.decoration.setCollisionByExclusion([-1]); // can maybe get rid of the other decoration layer by properly setting up collision with the tiles
        
        //------- COPARONIES -----
        Cop.createAnimations(this);
        this.cop_group = this.add.group("cops");
        //give player a sec when the scene starts before they start spawning
        this.time.delayedCall(5000, () => {
            this.startSpawning();
        });

        //-------- PLAYER --------
        Player.createAnimations(this);
        this.player = new Player(this, 300, 100).setDepth(4); // add 'robber' back
        this.player.setScale(3.3);
        this.player.body.setSize(8, 9); //change hitbox size
        this.player.setOffset(1.5, 5.5); //change hitbox loc
        // the only layers the player DOES NOT collide with are "ground" and "decoration_noclip"

        this.physics.world.setBounds(0, 0, this.MAPWIDTH, this.MAPHEIGHT);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.buildings, (player, tile) => { 
           // console.log("building");
        });
        
        this.physics.add.collider(this.player, this.door, (player, tile) => {
        //    console.log(tile.index);    
            if ( player.enter && (tile.index == 310 || tile.index == 1506 || tile.index == 1435 || tile.index == 1436)) {
                player.x -= 200;
            } 
        });
        
        this.physics.add.collider(this.player, this.cars, (player, tile) => {

        });
        this.physics.add.collider(this.player, this.decoration, (player, tile) => {

        });
        
        //add colliders between player n cops so its harder to escape them (and can call a function)
        //add OVERLAP (collision makes cops act like ping pong balls when u run into them)
        this.physics.add.overlap(this.player, this.cop_group, (player, cop) => {
            this.playerCopCollision(player, cop); //also cops can only attack player if they r colliding
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
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);

        this.doorPrompt = this.add.text(100, 100, "hit E to start unlocking door", {
            fontSize: '30px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);

        this.sellPrompt = this.add.text(100, 100, "hit E to trade", {
            fontSize: '30px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);

        this.policeAlert = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, "!! police alerted !!", {
            fontSize: '30px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(7).setOrigin(0.5);
    }

    playerCopCollision(player, cop){
        //do nothing if player is in business suit
        if (this.player.clothing == "business"){
            return;
        }

        //cop can only attack (damage player) when in collision w/ them
        //also, they can only attack if they have had enough cooldown time since their last attack (this.copAttackRate being the cooldown time)
        const currentTime = this.time.now;
        if (currentTime - this.lastDamageTime > this.copAttackRate){
            this.player.health -= 10; //update player health (low health is tracked n will trigger endgame condition in HUD)
            this.game.events.emit('health_update', this.player.health); //update HUD
            this.lastDamageTime = currentTime; //update damage counter

            //this is to give some visual feedback to player (JUICE)(#red40)
            this.player.setTint(0xff0000); //red
            this.time.delayedCall(300, () => {
                this.player.clearTint(); //get rid of tint after short time to look like flashing
            });
        }
    }

    //this is for spawning cops in (this is just a looping timing function basically)
    startSpawning(){
        this.spawnCop();
        //set up timer
        this.copSpawnTimer = this.time.addEvent({
            delay: this.spawnRate, //variable from constructor
            callback: this.spawnCop, //call other function
            callbackScope: this, //after calling function, return to this loop
            loop: true
        });
    }
    //this actually spawns in the cop
    spawnCop(){
        //cut off from spawning too many enemies at once (value can be changed in constructor)
        if (this.cop_group.getChildren().length >= this.maxCops){
            return;
        }
        //switching sides of the street that cops spawn on
        //left side: tile=5 right side: tile=12
        if (this.copLoc == "left"){
            this.copLoc = "right"; //switch
            this.coordx = 12 * 16 * this.MAPSCALE; //coord location conversion = tile * tileSize * scale
        }
        else {
            this.copLoc = "left";
            this.coordx = 5 * 16 * this.MAPSCALE;
        }
        const cop = new Cop(this, this.coordx, -10); //y spawn slightly off-screen
        this.cop_group.add(cop);
        //add collisions w buildings, cars, decoration
        this.physics.add.collider(cop, this.buildings);
        this.physics.add.collider(cop, this.cars);
        //this.physics.add.collider(cop, this.decoration);
    }

    update(time){
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        //call player update to allow movement/animation change
        this.player.update();

        this.cop_group.getChildren().forEach(cop => {
            if (cop && cop.update) {
                cop.update();
            }
        });

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
                this.doorSound.play();
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {


                    this.scene.run('Player_Lair');
     
                    this.scene.sleep('City');
                    this.scene.get('Player_Lair').cameras.main.fadeIn(500,0,0);
                });
                
            }
        }
        //house_1: (x: 1, y: 10)
        else if (this.tileX == 1 && this.tileY == 10){ 
            //robber outfit means they can start robbing house
            if (this.player.clothing == "robber"){
                this.doorPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
                this.doorPrompt.setAlpha(1);
                if (Phaser.Input.Keyboard.JustDown(this.e)){
                    this.doorSound.play();
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.run('House_1');
                    
                        this.scene.sleep('City');
                        this.scene.get('House_1').cameras.main.fadeIn(500, 0, 0);
                    });
                }
            }
            
            //business suit means trading
            else if (this.player.clothing == "business"){
                this.sellPrompt.setPosition(this.cameraCenterX, this.cameraCenterY);
                this.sellPrompt.setAlpha(1);
                if (Phaser.Input.Keyboard.JustDown(this.e)){
                    if (this.scene.get('UI').on == true){ //if ui is already on, turn off
                        //this.game.events.emit('updateMoney', this.scene.get('UI').score_to_add);
                        //console.log("score to add " + this.scene.get('UI'.score_to_add));
                        //this.scene.get('UI').score_to_add = 0;
                        this.game.events.emit('tradeMode', "house_1", false);

                        

                        
                    }
                    else{ //if ui is not on, it means player wants to enter it
                        this.game.events.emit('tradeMode', "house_1", true);
                        
                    }
                    this.scene.get('UI').addRectangles();
                    this.player.switchUI();
                }         
            }
        }
        else {
            this.lairDoorPrompt.setAlpha(0);
            this.doorPrompt.setAlpha(0);
            this.sellPrompt.setAlpha(0);
        }
        

        // if (this.player.enter) {
        //     console.log("E pressed");
        // }
        
     //   console.log(this.player.x + ", " + this.player.y);

        //AGGRO'ING COPS
        this.cop_group.getChildren().forEach(cop => {
            if (cop && cop.isAggressive == false){
                if (cop.checkPlayerInRange(this.player) == true){
                    cop.becomeAggressive(this.player);
                    if (!this.copsAggressive){
                        this.copsAggressive = true;
                        this.policeAlert.setAlpha(1);
                        this.police.play();

                        if (this.copSpawnTimer){
                            this.copSpawnTimer.remove();
                            this.spawnRate = this.aggroSpawnRate;
                            this.startSpawning();
                        }
                    }
                }
            }
            
        });

        this.aggressiveCops.forEach(grrCop => {
            if (grrCop){
                if (grrCop.checkPlayerInRange(this.player) == false || grrCop.isPlayerFarEnough(this.player) == true){
                    grrCop.resetCops();
                }
                else {
                    this.aggressiveCops = this.aggressiveCops.filter(c => c.isAggressive);

                }
            }
        });
        if (this.aggressiveCops.length == 0 && this.copsAggressive){
            this.copsAggressive = false;
            this.police.stop();
            if (this.copSpawnTimer){
                this.copSpawnTimer.remove();
                this.spawnRate = 5000; //reset it
                this.startSpawning();
            }
        }
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