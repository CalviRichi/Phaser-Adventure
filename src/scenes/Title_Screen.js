export class Title_Screen extends Phaser.Scene {
    constructor() {
        super('Title_Screen');
    }

    preload() {
        /**
         * THIS SCENE IS NOT BEING USED RIGHT NOW !!! 
         * THE LINES BELOW ARE NOT RUNNING !!!
         */
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        
    }

    create() {

    }

    update(time){
        this.scene.stop("Title_Screen");
        this.scene
        
    }
}