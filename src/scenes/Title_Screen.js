import { Player } from "../gameobjects/Player.js";
import { NPC } from "../gameobjects/NPC.js";

export class Title_Screen extends Phaser.Scene {
    //creating a cute title screen w/ both city + player lair showing
    //i also want to have a player sprite, title, creators, controls, npc sprite that is talking ("hey! that's my stuff!")
    constructor() {
        super('Title_Screen');

        this.MAPSCALE = 2.8;
        this.LAIRSCALE = 2.3;
    }

    preload() {
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        this.load.image("interior2", "assets/interior2/Tiled_files/Interior.png");
        this.load.image("indoor", "assets/kennyIndoor_transparent.png");
        this.load.tilemapTiledJSON("playerLair", "assets/player_lair.tmj");
        
        //----- PLAYER & NPC -----
        Player.preload(this);
        NPC.preload(this);
        this.load.image("speechblurb", "assets/speech bubble.png");

        //------ KEYCAPS ------
        this.load.image("W", "assets/keyCaps/tile_0086.png");
        this.load.image("A", "assets/keyCaps/tile_0120.png");
        this.load.image("S", "assets/keyCaps/tile_0121.png");
        this.load.image("D", "assets/keyCaps/tile_0122.png");
        this.load.image("E", "assets/keyCaps/tile_0087.png");
        this.load.image("I", "assets/keyCaps/tile_0092.png");

        //--------- SOUND ---------
        this.load.audio('bgmusic', 'assets/audio/simple.mp3');
        this.load.audio('police siren', 'assets/audio/police siren.mp3');
    }

    create() {
        //------- AMBIENT AUDIO -----
        this.sound.stopAll(); //kill any lingering music
        this.bgmusic = this.sound.add('bgmusic', {
            volume: 1.2,
            loop: true
        });
        this.bgmusic.play();
        this.police = this.sound.add('police siren', {
            volume: 0.8,
            loop: false
        });
        this.time.delayedCall(5000, () => {
            //play once initially
            this.police.play();
            this.time.addEvent({
                delay: 13000, 
                callback: () => {
                    this.police.play();
                },
                loop: true //loop infinitely
            });
        });

        //------ BACKGROUND ------
        //city (positioning on the left side of the screen)
        this.city = this.add.tilemap("city");
        const urban1 = this.city.addTilesetImage("urban1", "urban1");
        const urban2 = this.city.addTilesetImage("urban2", "urban2");
        var ctileset = [urban1, urban2];
        const cityX = 25; //change ## to change map positioning
        const cityY = 0; //same as cityX
        var door, cars, decoration, decoration_noclip, buildings, ground;
        door = this.city.createLayer("door", ctileset).setDepth(3).setScale(this.MAPSCALE).setPosition(cityX, cityY);
        cars = this.city.createLayer("cars", ctileset).setDepth(2).setScale(this.MAPSCALE).setPosition(cityX, cityY);
        decoration = this.city.createLayer("decoration", ctileset).setDepth(2).setScale(this.MAPSCALE).setPosition(cityX, cityY);
        decoration_noclip = this.city.createLayer("decoration_noclip", ctileset).setDepth(2).setScale(this.MAPSCALE).setPosition(cityX, cityY);
        buildings = this.city.createLayer("buildings", ctileset).setDepth(1).setScale(this.MAPSCALE).setPosition(cityX, cityY);
        ground = this.city.createLayer("ground", ctileset).setDepth(0).setScale(this.MAPSCALE).setPosition(cityX, cityY);

        //lair
        this.lair = this.add.tilemap("playerLair");
        const urban11 = this.lair.addTilesetImage("urban1", "urban1");
        const urban22 = this.lair.addTilesetImage("urban2", "urban2");
        const interior2 = this.lair.addTilesetImage("interior2", "interior2");
        const indoor = this.lair.addTilesetImage("indoor", "indoor");
        var ltileset = [urban11, urban22, interior2, indoor];
        const lairX = 765;
        const lairY = 150;
        var walls, floor, solidDecor, decor, shelfDecor, door2;
        walls = this.lair.createLayer("walls", ltileset).setDepth(5).setScale(this.LAIRSCALE).setPosition(lairX, lairY);
        floor = this.lair.createLayer("floor", ltileset).setDepth(5).setScale(this.LAIRSCALE).setPosition(lairX, lairY);
        solidDecor = this.lair.createLayer("decoration-solid-obj", ltileset).setDepth(6).setScale(this.LAIRSCALE).setPosition(lairX, lairY);
        decor = this.lair.createLayer("decoration", ltileset).setDepth(7).setScale(this.LAIRSCALE).setPosition(lairX, lairY);
        shelfDecor = this.lair.createLayer("shelf-decor", ltileset).setDepth(8).setScale(this.LAIRSCALE).setPosition(lairX, lairY);
        door2 = this.lair.createLayer("door", ltileset).setDepth(8).setScale(this.LAIRSCALE).setPosition(lairX, lairY);

        //making a "dimmer" so the background is less noticeable against the characters/text
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5).setOrigin(0).setScrollFactor(0).setDepth(8);

        //------- PLAYER ----------
        Player.createAnimations(this);
        this.player  = new Player(this, 1145, 215).setDepth(10).setScale(8);
        //don't need setSize/setOffset cuz no collisions/threats
        //trying to set up a cool thing where the player costume switches every few seconds
        this.time.delayedCall(5000, () => {
            this.time.addEvent({
                delay: 5000, //go every 5 seconds
                callback: this.changeOutfit, //call helper function
                callbackScope: this, //after calling function, come back here
                loop: true //loop infinitely
            });
        });
        //---- PLAYER OUTFIT TEXT ---
        this.robberFit = this.add.text(1145, 310, '"the smooth criminal"', {
            fontSize: '18px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(1).setDepth(10).setOrigin(0.5);
        this.businessFit = this.add.text(1145, 310, '"the sleazy businessman"', {
            fontSize: '18px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(0).setDepth(10).setOrigin(0.5);

        //------- CHARACTER --------
        NPC.createAnimations(this);
        this.layla = new NPC(this, 200, 250, "house_1").setDepth(10).setScale(8);
        this.layla.play("h1_right");
        this.speechBub = this.add.sprite(380, 180, "speechblurb").setDepth(10).setScale(0.8);
        this.robberYap = this.add.text(230, 115, "hey, that's my stuff!!", {
            fontSize: '28px',
            fontFamily: 'Courier New',
            color: '#000000'
        }).setAlpha(1).setDepth(11);
        this.businessYap = this.add.text(220, 105, "      oh wow, what a\ntrustworthy businessman <3", {
            fontSize: '24px',
            fontFamily: 'Courier New',
            color: '#000000'
        }).setAlpha(0).setDepth(11);

        //-------- TITLE & CREATORS ---------
        //title
        this.add.text(1045, 25, "Breaking & Entering:", {
            fontSize: '38px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(1).setDepth(10).setOrigin(0.5);
        this.add.text(1045, 70, "A Business Major Simulator", {
            fontSize: '28px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(1).setDepth(10).setOrigin(0.5);

        //creators
        this.add.text(1045, 120, "by Calvin Richards & Claire Buck", {
            fontSize: '18px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setAlpha(1).setDepth(10).setOrigin(0.5);

        //------- CONTROLS ---------
        const KEYSCALE = 3.5;
        const startX = 250;
        const startY = (this.scale.height / 2) + 120;

        this.control = this.add.text(startX + 150, startY - 65, "CONTROLS:", {
            fontSize: '30px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //up control (W)
        this.wsprite = this.add.sprite(startX, startY, 'W').setScale(KEYSCALE).setDepth(10);
        this.wTxt = this.add.text(startX - 125, startY, "move up", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //left control (A)
        this.asprite = this.add.sprite(startX, startY + 75, 'A').setScale(KEYSCALE).setDepth(10);
        this.aTxt = this.add.text(startX - 125, startY + 75, "move left", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //down control (S)
        this.ssprite = this.add.sprite(startX, startY + 150, 'S').setScale(KEYSCALE).setDepth(10);
        this.sTxt = this.add.text(startX - 125, startY + 150, "move down", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //inventory control (I)
        this.isprite = this.add.sprite(startX + 300, startY, 'I').setScale(KEYSCALE).setDepth(10);
        this.iTxt = this.add.text(startX + 175, startY, "open inventory", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //right control (D)
        this.dsprite = this.add.sprite(startX + 300, startY + 75, 'D').setScale(KEYSCALE).setDepth(10);
        this.dTxt = this.add.text(startX + 175, startY + 75, "move right", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        
        //interactive stuff (E)
        this.esprite = this.add.sprite(startX + 300, startY + 150, 'E').setScale(KEYSCALE).setDepth(10);
        this.eTxt = this.add.text(startX + 175, startY + 150, "interact", {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);


        //----- START BUTTON ------
        this.startButton = this.add.text(1045, 650, 'START GAME >>', {
            fontSize: '44px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10).setOrigin(0.5).setInteractive({ useHandCursor: true });
    }

    changeOutfit(){ //copying similar style from Player_Lair, minus button pressing
        if (this.player.clothing == "robber"){
            this.player.clothing = "business";
            //don't need to update UI (UI prolly isn't even running yet)
            this.player.setTexture("businessFront", 0);
        }
        else {
            this.player.clothing = "robber";
            this.player.setTexture("robberFront", 0);
        }

        //forcing idle animations to change
        if (this.player.clothing == "robber"){
            this.player.play("robber_idle", true);
            this.robberFit.setAlpha(1);
            this.businessFit.setAlpha(0);
            //set npc text
            this.robberYap.setAlpha(1);
            this.businessYap.setAlpha(0);
        }
        else {
            this.player.play("business_idle", true);
            this.robberFit.setAlpha(0);
            this.businessFit.setAlpha(1);
            //set npc text too
            this.robberYap.setAlpha(0);
            this.businessYap.setAlpha(1);
        }
    }

    update(time){
        //text grows/shrinks depending on if ur mouse is hovering over/clicking it
        this.startButton.on('pointerover', () => {
            this.startButton.setScale(1.2); //grow while mouse hovers over it
        })
        .on('pointerout', () => {
            this.startButton.setScale(1); //return to normal if no hover
        })
        .on('pointerdown', () => {
            this.startButton.setScale(0.8); //click = smaller
        })
        .on('pointerup', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('HUD');
                this.scene.start('City');
                this.scene.stop('Title_Screen');
                this.scene.get('City').cameras.main.fadeIn(500, 0, 0, 0);
            });
        });
    }
}