export class Cop extends Phaser.GameObjects.Components.PathFollower {
    //going for the same setup as player class
    static preload(scene){
        scene.load.spritesheet('copFront', 'assets/characters/cop_front.png', { frameWidth: 12, frameHeight: 15 });
        scene.load.spritesheet('copRight', 'assets/characters/cop_right.png', { frameWidth: 12, frameHeight: 15 });
        scene.load.spritesheet('copLeft', 'assets/characters/cop_left.png', { frameWidth: 12, frameHeight: 15 });
        scene.load.spritesheet('copBack', 'assets/characters/cop_back.png', { frameWidth: 12, frameHeight: 15 });
    }
    
    static createAnimations(scene){
        if (!scene.anims.exists('cop_front')){
            scene.anims.create({
                key: 'cop_front',
                frames: [
                    { key: 'copFront', frame: 0 },
                    { key: 'copFront', frame: 1 },
                    { key: 'copFront', frame: 0 },
                    { key: 'copFront', frame: 2 }
                ],
                frameRate: 5, 
                repeat: -1
            });
        }
        if (!scene.anims.exists('cop_right')){
            scene.anims.create({
                key: 'cop_right',
                frames: [
                    { key: 'copRight', frame: 0 },
                    { key: 'copRight', frame: 1 },
                    { key: 'copRight', frame: 0 },
                    { key: 'copRight', frame: 2 },
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('cop_left')){
            scene.anims.create({
                key: 'cop_left',
                frames: [
                    { key: 'copLeft', frame: 0 },
                    { key: 'copLeft', frame: 1 },
                    { key: 'copLeft', frame: 0 },
                    { key: 'copLeft', frame: 2 },
                ],
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists('cop_back')){
            scene.anims.create({
                key: 'cop_back',
                frames: [
                    { key: 'copBack', frame: 0 },
                    { key: 'copBack', frame: 1 },
                    { key: 'copBack', frame: 0 },
                    { key: 'copBack', frame: 2 },
                ],
                frameRate: 5,
                repeat: -1
            });
        }
    }

    constructor(scene, x, y){
        super(scene, x, y, 'copFront', 0);
        
        //variables
        this.scene = scene;
    }
}