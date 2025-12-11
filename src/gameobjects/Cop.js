export class Cop extends Phaser.Physics.Arcade.Sprite {
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
        this.x = x;
        this.y = y;
        this.speed = 85; //pixels per sec
        this.endY = this.scene.MAPHEIGHT + 20; //have the endY be fully off the screen
        //aggro variables
        this.isAggressive = false;
        this.target = null;
        this.range = 120; //"view" for cops (when theyre patrolling like normal)
        this.escapeRange = 350; //how far away player needs to be from aggro'd cops for them to stop

        //adding in cop sprite
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(3.3);
        this.body.setSize(9, 10);
        this.setOffset(1.5, 4);

        //make cop follow a path
        this.setVelocityY(this.speed);

        //play basic animation
        this.play('cop_front');
    }

    destroy(){ //method to destroy cop after it goes off screen
        if (this.scene.cop_group){
                this.scene.cop_group.remove(this);
        }
        super.destroy(); //calling parent destroy
    }

    update() {
        //if cop goes off screen, destroy it (make sure its not aggro mode)
        if (!this.isAggressive && this.y > this.endY){
            this.destroy();
        }

        //if its aggressive, make sure it starts doing stuff
        //(mostly for when cops spawn in aggro automatically, so they don't follow the "path")
        if (this.isAggressive){
            this.updateAggression();
        }
    }

    //methods for aggressive cops
    checkPlayerInRange(player){
        //check player exists & is wearing the correct clothes
        if (!player || player.clothing == "business"){
            return false;
        }
        const distance =  Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y); //cop x/y to player x/y
        return distance < this.range; //t/f if  within distance
    }
    //cops enter aggressive state (start chasing player, and can damage player)
    becomeAggressive(player){
        if (this.isAggressive == true || !this.active){ return; } //if alr true, return
        this.isAggressive = true;
        this.target = player;
        this.speed += 50; //i want cops to move slightly faster when aggro
        this.setVelocity(0, 0); //entirely stop whatever movement the cop is having rn

        //add cop to aggressiveCop [] to keep track accurately
        if (this.scene.aggressiveCops && !this.scene.aggressiveCops.includes(this)){
            this.scene.aggressiveCops.push(this);
        }
    }

    //reset cops to normal state (delete extra cops?? or just make them peaceful??)
    resetCops() {
        if (!this.isAggressive){ return; } //if alr not aggressive, don't do anything
        
        //get rid of cop from scene []
        if (this.scene.aggressiveCops){
            const index = this.scene.aggressiveCops.indexOf(this);
            if (index > -1){
                this.scene.aggressiveCops.splice(index, 1);
            }
        }

        //just delete the cop
        //this.destroy();

        //nah try to make cops walk off screen again
        this.speed -= 50;
        this.isAggressive = false;
        this.target = null;
        this.setVelocityY(this.speed); //walk down screen
    }

    //basically, this just makes the cop chase the player
    updateAggression(){
        if (!this.isAggressive){
            this.resetCops(); //make it go back to normal behavior if not aggressive
            return; 
        }

        //calculate stuff on how to follow target (player)
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        //set velocity with normalization
        if (distance > 0){
            const vx = (dx / distance) * this.speed;
            const vy = (dy / distance) * this.speed;
            this.setVelocity(vx, vy);
        }
    }

    //checking if player is far away enough for cops to not be aggro anymore
    isPlayerFarEnough(player){
        if (!player) { return true; } //if no player for some reason just return

        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        return distance > this.escapeRange;
    }
}