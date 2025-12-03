import { Player } from "../gameobjects/Player.js";
import { Bullet } from "../gameobjects/Bullet.js";

export class City extends Phaser.Scene{
    constructor(){
        super('City');
    }

    preload(){
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
    }

    create(){
        this.last_time = 0; // copied from last project
        this.score = 0;

        this.map = this.add.tilemap("city");
        const urban1 = this.map.addTilesetImage("urban1", "urban1");
        const urban2 = this.map.addTilesetImage("urban2", "urban2");
        var tileset = [urban1, urban2];

        var doors, cars, decoration, decoration_noclip, buildings, ground;

      //  const UI = scene.get("UI");
        
        doors = this.map.createLayer("doors", tileset, 0, 0);
        cars = this.map.createLayer("cars", tileset, 0, 0);
        decoration = this.map.createLayer("decoration", tileset, 0, 0);
        decoration_noclip = this.map.createLayer("decoration_noclip", tileset, 0,0);
        buildings = this.map.createLayer("buildings", tileset, 0, 0);
        ground = this.map.createLayer("ground", tileset, 0, 0);

        buildings.setCollisionByExclusion([-1]); 
        doors.setCollisionByExclusion([-1]);
        cars.setCollisionByExclusion([-1]);
        decoration.setCollisionByExclusion([-1]); // can maybe get rid of the other decoration layer by properly setting up collision with the tiles
        
        this.player = new Player(this, 100, 100); // not sure what x and y are yet
        
        // the only layers the player DOES NOT collide with are "ground" and "decoration_noclip"
        this.physics.add.collider(this.player, buildings, (player, tile) => {

        });
        this.physics.add.collider(this.player, doors, (player, tile) => {
            let house = "";
            switch (tile.index) {
                case 309:
                    house = "business";
                    break;
                case 1019:
                    house = "apartment";
                    break;
                case 948: // 948 and 949 would do the same thing
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
            
        });
        this.physics.add.collider(this.player, cars, (player, tile) => {

        });
        this.physics.add.collider(this.player, decoration, (player, tile) => {

        });

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setZoom(1.5);

    }

    update(time){
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        this.player.update();
        
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