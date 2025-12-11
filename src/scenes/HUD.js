export class HUD extends Phaser.Scene {
    //this is mostly for just arrest/health counter and money counter
    constructor() {
        super("HUD");
    }

    preload(){

    }

    create(){
        //important player information that's permanently in the corner !!!

        this.carryingCapacity = this.add.text(200, 15, "Inventory Occupied: 17 / 40 Spaces", { // this will eventually be the bar that shows up
            fontSize: '28px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setScrollFactor(0);
        this.moneyCounter = this.add.text(8, 15, "$000.00", {
            fontSize: '36px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setScrollFactor(0);
        this.arrestCounter = this.add.text(8, 50, "Arrests: 0", {
            fontSize: '28px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setScrollFactor(0);
        this.playerHealth = this.add.text(8, 85, "Health: 100", {
            fontSize: '28px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setScrollFactor(0);
        //------- VARIABLES -------
        //to help w/ tracking money/arrests for computer (win/lose conditions)
        this.totalMoney = 0;
        this.timesArrested = 0;
        this.health = 100;

        this.won = false;

        //-------- LISTENERS ------
        //money update
        this.game.events.on('updateMoney', this.updateMoney, this);
        //arrest update
        this.game.events.on('updateArrests', this.updateArrests, this);

        this.game.events.on('weight_update', this.weightUpdate, this);

        this.game.events.on('health_update', this.healthUpdate, this);

        //------ TEXT POP UPS --------
        //these don't pop up in the right place rn
        this.arrestLoss = this.add.text(this.scale.width/2, this.scale.height/2, "You got awwested thwee times uhoh oWo", {
            fontSize: '40px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10).setAlpha(0).setScrollFactor(0);
        this.moneyWin = this.add.text(this.scale.width/2, this.scale.height/2, "You've reached untold riches!", {
            fontSize: '40px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10).setAlpha(0).setScrollFactor(0);
    }

    weightUpdate(count, size) {
        if (size != 40) return; // 40 is a magic number, 5 x 8, current player inventory size
        this.carryingCapacity.setText("Inventory Occupied: " + count + ' / ' + size + " Spaces");
    }

    updateMoney(amount){
        this.totalMoney += amount;
        console.log(this.totalMoney);
        this.moneyCounter.setText("$" + this.totalMoney + ".00");
    }

    updateArrests(){
        this.timesArrested++;
        this.arrestCounter.setText("Arrests: " + this.timesArrested);
    }

    healthUpdate(newHealth){
        this.health = newHealth;
        this.playerHealth.setText("Health: " + newHealth);
    }

    update(time){
        //putting win/lose conditions here

        if (this.health <= 0){ //if police lower health to 0, it counts as an arrest
            this.updateArrests();
        }

        if (this.timesArrested > 2){ //if arrested for a third time, end game (loss condition)
            this.won = false; //just making sure its correct
            this.arrestLoss.setAlpha(1);
            
            this.time.delayedCall(4000, () => {
                this.scene.stop('UI');
                this.scene.stop('City');
                this.scene.stop('HUD');
                this.scene.start('EndGame');
            });
        }

        if (this.totalMoney >= 100){ //if player reaches goal money, end game (win condition)
            this.won = true;
            this.moneyWin.setAlpha(1);
            
            this.time.delayedCall(4000, () => {
                this.scene.stop('UI');
                this.scene.stop('City');
                this.scene.stop('HUD');
                this.scene.start('EndGame');
            });
        }
    }
}