export class HUD extends Phaser.Scene {
    //this is mostly for just arrest/health counter and money counter
    constructor() {
        super("HUD");
    }

    preload(){

    }

    create(){
        //important player information that's permanently in the corner !!!
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
        //------- VARIABLES -------
        //to help w/ tracking money/arrests for computer (win/lose conditions)
        this.totalMoney = 0;
        this.timesArrested = 0;

        //-------- LISTENERS ------
        //money update
        this.game.events.on('updateMoney', this.updateMoney, this);
        //arrest update
        this.game.events.on('updateArrests', this.updateArrests, this);
    }

    updateMoney(amount){
        this.totalMoney += amount;
        this.moneyCounter.setText("$" + this.totalMoney + ".00");
    }

    updateArrests(){
        this.timesArrested++;
        this.arrestCounter.setText("Arrests: " + this.timesArrested);
    }
}