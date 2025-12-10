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
        //------- VARIABLES -------
        //to help w/ tracking money/arrests for computer (win/lose conditions)
        this.totalMoney = 0;
        this.timesArrested = 0;

        //-------- LISTENERS ------
        //money update
        this.game.events.on('updateMoney', this.updateMoney, this);
        //arrest update
        this.game.events.on('updateArrests', this.updateArrests, this);

        this.game.events.on('weight_update', this.weightUpdate, this);
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
}