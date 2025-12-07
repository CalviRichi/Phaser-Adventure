export class Cop extends Phaser.GameObjects.PathFollower {
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
        super(scene, 'copFront', 0);
        
        //variables
        this.scene = scene;
        this.location = location;
        this.x = x;
        this.y = y;
        this.speed = 75; //pixels per sec
        this.endY = this.scene.MAPHEIGHT + 20; //have the endY be fully off the screen

        //adding in cop sprite
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setScale(3.3);

        //create path for cop to follow
        this.createPath();

        //play basic animation
        this.play('cop_front');

        //make it start following the path
        this.startFollow({
            duration: this.calculateDuration(), //calculate how long it should follow the path based off speed
            onComplete: () => {
                this.destroy();
            }
        });
    }

    createPath(){
        const path = new Phaser.Curves.Path(this.x, this.y);
        path.lineTo(this.x, this.endY);
        this.setPath(path);
    }

    calculateDuration(){
        const distance = this.endY - this.y;
        return (distance/this.speed) * 1000;
    }

    destroy(){ //method to destroy cop after it goes off screen
        if (this.scene.cop_group){
                this.scene.cop_group.remove(this);
        }
        super.destroy(); //calling parent destroy
    }

    update() {
        
    }
}