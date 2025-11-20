export class Bullet extends Phaser.GameObjects.Sprite{
    //preload bullet image so it doesn't have to be preloaded in each scene
    static preload(scene){
        //!! find a new bullet asset (this one is stolen from proj 3)!!
        scene.load.image('bullet', 'assets/bullet.png');
    }

    static createAnimations(scene){
        if (!scene.anims.exists('fire')){
            scene.anims.create({
                key: 'fire',
                frames: [
                    { key: 'bullet' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }
    }

    constructor(scene, x, y, direction, speed, damage){
        super(scene, x, y, "projectile");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.setSize(); //if hitbox size is off
        //this.body.setOffset(); //if hitbox isn't centered right
        //this.setScale(); //if too big/small
        this.direction = Phaser.Math.DegToRad(direction);
        this.damage = damage;
        this.scene = scene;
        this.last_time = scene.time.now;
        this.speed = speed;

        //have fire animation playing by default
        this.play('fire');

        //autodestroy bullet after x milliseconds (in case it doesn't hit anything)
        this.scene.time.delayedCall(10000, () => this.destroy());
    }

    preUpdate(time, delta){
        let dt = delta / 1000;

        this.x += Math.cos(this.direction)*this.speed*dt;
        this.y += Math.sin(this.direction)*this.speed*dt;
    }
}