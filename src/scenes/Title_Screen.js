import { Player } from "../gameobjects/Player.js";

export class Title_Screen extends Phaser.Scene {
    //creating a cute title screen w/ both city + player lair showing
    //i also want to have a player sprite, title, creators, controls, npc sprite that is talking ("hey! that's my stuff!")
    constructor() {
        super('Title_Screen');

        this.MAPSCALE = 2;
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
        //city
        this.city = this.add.tilemap("city");
        const urban1 = this.city.addTilesetImage("urban1", "urban1");
        const urban2 = this.city.addTilesetImage("urban2", "urban2");
        var ctileset = [urban1, urban2];
        var door, cars, decoration, decoration_noclip, buildings, ground;
        door = this.map.createLayer("door", ctileset).setDepth(3).setScale(this.MAPSCALE);
        cars = this.map.createLayer("cars", ctileset).setDepth(2).setScale(this.MAPSCALE);
        decoration = this.map.createLayer("decoration", ctileset).setDepth(2).setScale(this.MAPSCALE);
        decoration_noclip = this.map.createLayer("decoration_noclip", ctileset).setDepth(2).setScale(this.MAPSCALE);
        buildings = this.map.createLayer("buildings", ctileset).setDepth(1).setScale(this.MAPSCALE);
        ground = this.map.createLayer("ground", ctileset).setDepth(0).setScale(this.MAPSCALE);

        //lair
        this.lair = this.add.tilemap("playerLair");
        const urban11 = this.lair.addTilesetImage("urban1", "urban1");
        const urban22 = this.lair.addTilesetImage("urban2", "urban2");
        const interior2 = this.lair.addTilesetImage("interior2", "interior2");
        const indoor = this.lair.addTilesetImage("indoor", "indoor");
        var ltileset = [urban11, urban22, interior2, indoor];
        var walls, floor, solidDecor, decor, shelfDecor, door2;
        walls = this.lair.createLayer("walls", ltileset).setDepth(0).setScale(this.MAPSCALE);
        floor = this.lair.createLayer("floor", ltileset).setDepth(0).setScale(this.MAPSCALE);
        solidDecor = this.lair.createLayer("decoration-solid-obj", ltileset).setDepth(1).setScale(this.MAPSCALE);
        decor = this.lair.createLayer("decoration", ltileset).setDepth(2).setScale(this.MAPSCALE);
        shelfDecor = this.lair.createLayer("shelf-decor", ltileset).setDepth(3).setScale(this.MAPSCALE);
        door2 = this.lair.createLayer("door", ltileset).setDepth(3).setScale(this.MAPSCALE);

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