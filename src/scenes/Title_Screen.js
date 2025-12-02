export class Title_Screen extends Phaser.Scene {
    constructor() {
        super('Title_Screen');
    }

    preload() {
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        
    }

    update(time){
        
    }
}