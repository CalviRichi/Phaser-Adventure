export class NPC extends Phaser.Physics.Arcade.Sprite {
    static preload(scene){
        //house_1 ("layla") NPC
        scene.load.spritesheet('h1Front', 'assets/characters/chick_front.png', { frameWidth: 12, frameHeight: 15 });
        scene.load.spritesheet('h1Right', 'assets/characters/chick_right.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('h1Left', 'assets/characters/chick_left.png', { frameWidth: 11, frameHeight: 15 });
        scene.load.spritesheet('h1Back', 'assets/characters/chick_back.png', { frameWidth: 12, frameHeight: 15 });
    }

    static createAnimations(scene){
        //house_1 ("layla") NPC
        if (!scene.anims.exists('h1_front')){
            scene.anims.create({
                key: 'h1_front',
                frames: [
                    { key: 'h1Front', frame: 0 },
                    { key: 'h1Front', frame: 1 },
                    { key: 'h1Front', frame: 0 },
                    { key: 'h1Front', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('h1_right')){
            scene.anims.create({
                key: 'h1_right',
                frames: [
                    { key: 'h1Right', frame: 0 },
                    { key: 'h1Right', frame: 1 },
                    { key: 'h1Right', frame: 0 },
                    { key: 'h1Right', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('h1_left')){
            scene.anims.create({
                key: 'h1_left',
                frames: [
                    { key: 'h1Left', frame: 0 },
                    { key: 'h1Left', frame: 1 },
                    { key: 'h1Left', frame: 0 },
                    { key: 'h1Left', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('h1_back')){
            scene.anims.create({
                key: 'h1_back',
                frames: [
                    { key: 'h1Back', frame: 0 },
                    { key: 'h1Back', frame: 1 },
                    { key: 'h1Back', frame: 0 },
                    { key: 'h1Back', frame: 2 }
                ],
                frameRate: 5,
                repeat: -1
            });
        }
    }

    constructor(scene, x, y, which){
        super(scene, x, y, which); //last 2 values r fillers

        this.scene = scene;
        this.x = x; this.y = y;
        this.speed = 75;
        this.npc = which; 

        //create npc sprite
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(3.3);
        this.body.setSize(9, 10);
        this.setOffset(1.5, 4);

        //figure out which one it is to play correct animation
        switch(this.npc){
            case "house_1":
                this.play('h1_front');
                break;
        }
    }
}