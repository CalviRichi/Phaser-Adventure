import { Player } from "../gameobjects/Player.js";

export class Title_Screen extends Phaser.Scene {
    //creating a cute title screen w/ both city + player lair showing
    //i also want to have a player sprite, title, creators, controls, npc sprite that is talking ("hey! that's my stuff!")
    constructor() {
        super('Title_Screen');

        this.MAPSCALE = 2.5;
    }

    preload() {
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        this.load.image("interior2", "assets/interior2/Tiled_files/Interior.png");
        this.load.image("indoor", "assets/kennyIndoor_transparent.png");
        this.load.tilemapTiledJSON("playerLair", "assets/player_lair.tmj");
        
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
        const lairX = 800;
        const lairY = 300;
        var walls, floor, solidDecor, decor, shelfDecor, door2;
        walls = this.lair.createLayer("walls", ltileset).setDepth(5).setScale(2).setPosition(lairX, lairY);
        floor = this.lair.createLayer("floor", ltileset).setDepth(5).setScale(2).setPosition(lairX, lairY);
        solidDecor = this.lair.createLayer("decoration-solid-obj", ltileset).setDepth(6).setScale(2).setPosition(lairX, lairY);
        decor = this.lair.createLayer("decoration", ltileset).setDepth(7).setScale(2).setPosition(lairX, lairY);
        shelfDecor = this.lair.createLayer("shelf-decor", ltileset).setDepth(8).setScale(2).setPosition(lairX, lairY);
        door2 = this.lair.createLayer("door", ltileset).setDepth(8).setScale(2).setPosition(lairX, lairY);

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
        //this.scene.stop("Title_Screen");
        //this.scene
        
    }
}