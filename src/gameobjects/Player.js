import { Inventory } from "./Inventory.js";

export class Player extends Phaser.Physics.Arcade.Sprite{
    //this is to preload images/sprites so animations can be made here
    static preload(scene){ //u need to call this for every scene u want a player in w/ "Player.preload(this);" in every scene's preload() 
        //robber costume spritesheets
        scene.load.spritesheet('robberFront', 'assets/characters/robber_front.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('robberRight', 'assets/characters/robber_right.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('robberLeft', 'assets/characters/robber_left.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('robberBack', 'assets/characters/robber_back.png', { frameWidth: 11, frameHeight: 15 });

        //business costume spritesheets
        scene.load.spritesheet('businessFront', 'assets/characters/business_front.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('businessRight', 'assets/characters/business_right.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('businessLeft', 'assets/characters/business_left.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('businessBack', 'assets/characters/business_back.png', { frameWidth: 11, frameHeight: 15 });
    }

    //actually create the animations
    static createAnimations(scene){ //u need to call this for every scene u want a player in w/ "Player.createAnimations(this);" in every scene's create()
        //robber animations
        //idle (will face forward when idle)
        if (!scene.anims.exists('robber_idle')){ //this line helps it be less buggy (doesn't create animations multiple times)
            scene.anims.create({
                key: 'robber_idle',
                frames: [
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1 //loop infinitely
            });
        }
        if (!scene.anims.exists('robber_front')){
            scene.anims.create({
                key: 'robber_front',
                frames: [
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 1 },
                    { key: 'robberFront', frame: 0 },
                    { key: 'robberFront', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('robber_right')){
            scene.anims.create({
                key: 'robber_right',
                frames: [
                    { key: 'robberRight', frame: 0 },
                    { key: 'robberRight', frame: 1 },
                    { key: 'robberRight', frame: 0 },
                    { key: 'robberRight', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('robber_left')){
            scene.anims.create({
                key: 'robber_left',
                frames: [
                    { key: 'robberLeft', frame: 0 },
                    { key: 'robberLeft', frame: 1 },
                    { key: 'robberLeft', frame: 0 },
                    { key: 'robberLeft', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('robber_back')){
            scene.anims.create({
                key: 'robber_back',
                frames: [
                    { key: 'robberBack', frame: 0 },
                    { key: 'robberBack', frame: 1 },
                    { key: 'robberBack', frame: 0 },
                    { key: 'robberBack', frame: 2 }
                ], 
                frameRate: 5, 
                repeat: -1
            });
        }

        //business costume animations
        if (!scene.anims.exists('business_idle')){
            scene.anims.create({
                key: 'business_idle',
                frames: [
                    { key: 'businessFront', frame: 0 },
                    { key: 'businessFront', frame: 2 }
                ], 
                frameRate: 5,
                repeat: -1
            }); 
        }
        if (!scene.anims.exists('business_front')){
            scene.anims.create({
                key: 'business_front',
                frames: [
                    { key: 'businessFront', frame: 0 },
                    { key: 'businessFront', frame: 1 },
                    { key: 'businessFront', frame: 0 },
                    { key: 'businessFront', frame: 2 }
                ], 
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('business_right')){
            scene.anims.create({
                key: 'business_right',
                frames: [
                    { key: 'businessRight', frame: 0 },
                    { key: 'businessRight', frame: 1 },
                    { key: 'businessRight', frame: 0 },
                    { key: 'businessRight', frame: 2 }
                ], 
                frameRate: 5, 
                repeat: -1
            });
        }
        if (!scene.anims.exists('business_left')){
            scene.anims.create({
                key: 'business_left',
                frames: [
                    { key: 'businessLeft', frame: 0 },
                    { key: 'businessLeft', frame: 1 },
                    { key: 'businessLeft', frame: 0 },
                    { key: 'businessLeft', frame: 2 }
                ], 
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('business_back')){
            scene.anims.create({
                key: 'business_back',
                frames: [
                    { key: 'businessBack', frame: 0 },
                    { key: 'businessBack', frame: 1 },
                    { key: 'businessBack', frame: 0 },
                    { key: 'businessBack', frame: 2 }
                ],
                frameRate: 5, 
                repeat: -1
            });
        }
    }

    constructor(scene, x, y){

        super(scene, x, y, 'robberFront', 0); //start w frame 0 of robber front by default
        /*
        The player will take in whatever state that the inventory provides it
        */
        //this.weapon = 
        let UI = scene.scene.get('UI');
        let weight = 1 - ((UI.inventory.count / UI.inventory.SIZE) / 2);

        this.scene = scene;
        this.x = x; this.y = y;
        this.clothing = "robber";
        this.health = 100; //will go down when cops r in aggro mode n can hit player
        this.speed = 250 * weight; //used in update() for movement (change ## to change speed)
        console.log("speed: " + this.speed);
        //adding physics n world colliders to player sprite
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);
        //play idle animation by default
        this.play('robber_idle');

        //------- KEYBOARD INPUT ------
        //detect keys here instead of in each scene
        this.left = scene.input.keyboard.addKey('A');
        this.right = scene.input.keyboard.addKey('D');
        this.up = scene.input.keyboard.addKey('W');
        this.down = scene.input.keyboard.addKey('S');
        this.e = scene.input.keyboard.addKey('E');
        this.enter = false;
        this.inventory = scene.input.keyboard.addKey("I");
        this.UI_on = false;

        this.scene.game.events.on('weight_update', (count, size) => {
            if (size == UI.inventory.SIZE) {
                // only update on player updates

                weight = 1 - ((count / size) / 2);
                console.log(weight);
                this.speed = 250 * weight;
                console.log("speed: " + this.speed);
            }
            
        }, this); 

    }

    movement(velocityX, velocityY){ //for updating animations n stuff
        //statements to change animations

        // TODO: try to reduce shake in sprite while moving

        if (this.clothing == "robber"){

            if (velocityX > 0){ //moving right
                if (this.anims.currentAnim?.key !== 'robber_right'){ //check the animation isn't alr playing (helps it not crash)
                    this.play('robber_right', true);
                }
            }
            else if (velocityX < 0){ //moving left
                if (this.anims.currentAnim?.key !== 'robber_left'){
                    this.play( 'robber_left', true);
                }
            }
            
            if (velocityY > 0 && velocityX == 0){ //moving up (i think??) (so face backwards)
                if (this.anims.currentAnim?.key !== 'rober_front'){
                    this.play( 'robber_front', true);
                }
            }
            else if (velocityY < 0 && velocityX == 0){ //moving down (i think??)(so face forwards)
                if (this.anims.currentAnim?.key !== 'rober_back'){
                    this.play( 'robber_back', true);
                }
            }
      
            if (velocityX == 0 && velocityY == 0){ //not moving (idle)
                if (this.anims.currentAnim?.key !== 'robber_idle'){
                    this.play( 'robber_idle', true);
                }
            }
        }
        else { //business costume
            if (velocityX > 0){ //moving right
                if (this.anims.currentAnim?.key !== 'business_right'){
                    this.play( 'business_right', true);
                }
            }
            else if (velocityX < 0){ //moving left
                if (this.anims.currentAnim?.key !== 'business_left'){
                    this.play( 'business_left', true);
                }
            }
            
            if (velocityY > 0 && velocityX == 0){ //moving up (i think??)
                if (this.anims.currentAnim?.key !== 'business_front'){
                    this.play( 'business_front', true);
                }
            }
            else if (velocityY < 0 && velocityX == 0){ //moving down (i think??)
                if (this.anims.currentAnim?.key !== 'business_back'){
                    this.play( 'business_back', true);
                }
            }
      
            if (velocityX == 0 && velocityY == 0){ //not moving (idle)
                if (this.anims.currentAnim?.key !== 'business_idle'){
                    this.play( 'business_idle', true);
                }
            }
        }

        //update velocities
        this.setVelocityX(velocityX);
        this.setVelocityY(velocityY);
    }

    switchUI() {
        let UI = this.scene.scene.get('UI');

            console.log("inventory");
            for (let i of UI.inventory.items) {
                console.log(i.name);
            }
            console.log("trading");
            for (let i of UI.trade_inventory.items) {
                console.log(i.name);
            }
            
            if (!UI.on) {
            //    console.log("UI");
                this.scene.scene.bringToTop('UI');
                UI.scene.setVisible(true);
                UI.on = true;
            }
            else {
                this.scene.game.events.emit('tradeMode', "house_1", false); // there should be more of these than just the house
                //this.scene.game.events.emit('itemMode', 'house_1', false);
                UI.addRectangles();
                this.scene.scene.sendToBack('UI');
                UI.scene.setVisible(false);
                UI.on = false;
            }

    }

    update() {
        //------ PLAYER MOVEMENT STUFF ------
        let velocityX = 0; //left-right velocity
        let velocityY = 0; //up-down velocity
        if (this.left.isDown){ velocityX = -this.speed; }
        else if (this.right.isDown){ velocityX = this.speed; }
        if (this.up.isDown){ velocityY = -this.speed; } //the sign for speed might need to be flipped
        else if (this.down.isDown){ velocityY = this.speed; }

        //call to change animations n stuff
        this.movement(velocityX, velocityY);

        // if (Phaser.Input.Keyboard.JustDown(this.e)) {
        //     this.enter = true;
        // }
        // else {
        //     this.enter = false;
        // }

        if (Phaser.Input.Keyboard.JustDown(this.inventory)) {
            
            this.switchUI();

                                //______
            //      /\    ||     ||    | ||     ||    /\
            //     //\\   ||     ||____| ||     ||   //\\
            //    //__\\  ||     ||      ||_____||  //__\\
            //   //    \\ ||     ||      ||     || //    \\
            //  //      \\||_____||      ||     ||//      \\      
        }

    }


}