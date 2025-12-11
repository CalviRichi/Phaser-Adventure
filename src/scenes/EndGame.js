export class EndGame extends Phaser.Scene{
    constructor() {
        super('EndGame');

        this.MAPSCALE = 2.8; //for city
        this.LAIRSCALE = 2.3;
    }

    //for data that's passed in from scenes
    init(data){
        this.won = data.won;
        this.arrests = data.arrests;
        this.money = data.money;
    }

    preload(){
        //----- BACKGROUND -----
        this.load.image("urban1", "assets/urban1.png");
        this.load.image("urban2", "assets/urban2.png");
        this.load.tilemapTiledJSON("city", "assets/basicCity.tmj");
        this.load.image("interior2", "assets/interior2/Tiled_files/Interior.png");
        this.load.image("indoor", "assets/kennyIndoor_transparent.png");
        this.load.tilemapTiledJSON("playerLair", "assets/player_lair.tmj");

        //--------- SOUND ---------
        this.load.audio('bgmusic', 'assets/audio/simple.mp3');
        this.load.audio('police siren', 'assets/audio/police siren.mp3');
    }

    create(){
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

        //-------- TEXT ------
        var winLoss = "";
        var commentary = "";
        if (this.won == true){
            winLoss = "You Won!!";
            commentary = "congrats on being\na master liar!";
        }
        else {
            winLoss = "You Lost :(";
            commentary = "maybe next time,\ntry not to let your\nface be a punching bag.";
        }
        this.add.text(1045, 25, winLoss, {
            fontSize: '38px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10).setOrigin(0.5);
        this.add.text(1045, 70, commentary, {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);

        //final stats
        this.add.text(1045, 150, "Money: "+ this.money, {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);
        this.add.text(1045, 200, "Times Arrested: " + this.arrests, {
            fontSize: '20px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(10).setOrigin(0.5);

        //reset game button
        this.reset = this.add.text(1045, 650, "RESTART >>", {
            fontSize: '44px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10).setOrigin(0.5).setInteractive({ useHandCursor: true });
    }

    update(time){
        this.reset.on('pointerover', () => {
            this.reset.setScale(1.2);
        })
        .on('pointerout', () => {
            this.reset.setScale(1);
        })
        .on('pointerdown', () => {
            this.reset.setScale(0.8);
        })
        .on('pointerup', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Title_Screen');
                this.scene.stop('EndGame');
                this.scene.get('Title_Screen').cameras.main.fadeIn(500, 0, 0, 0);
            });
        });
    }
}