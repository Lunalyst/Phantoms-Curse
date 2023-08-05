/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
class hpBar extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'healthBar');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //sets the depth of the ui sprite so that it isnt obscured by other game sprites.
        this.anims.create({key: '0',frames: this.anims.generateFrameNames('healthBar', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '1',frames: this.anims.generateFrameNames('healthBar', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '2',frames: this.anims.generateFrameNames('healthBar', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '3',frames: this.anims.generateFrameNames('healthBar', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '4',frames: this.anims.generateFrameNames('healthBar', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '5',frames: this.anims.generateFrameNames('healthBar', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '6',frames: this.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
        this.setDepth(6);
        this.setScale(.6);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);
        this.damageCoolDown = 0;
        this.playerHealth = 6;
        this.playerHealthMax = 6;
        this.anims.play(""+this.playerHealth);

    }
    //simple function using if statements to update display using animations defined above.
    updateDisplay(playerHealth){
        if(playerHealth === 6){
            this.anims.play("6");
        }else if(playerHealth === 5){
            this.anims.play("5");
        }else if(playerHealth === 4){
            this.anims.play("4");
        }else if(playerHealth === 3){
            this.anims.play("3");
        }else if(playerHealth === 2){
            this.anims.play("2");
        }else if(playerHealth === 1){
            this.anims.play("1");
        }else if(playerHealth === 0){
            this.anims.play("0");
        }

    }

    calcDamage(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
        if(this.damageCoolDown === 0 ){
          this.playerHealth -= damageTaken;
          this.updateDisplay(this.playerHealth);
          this.damageCoolDown = 50;
        }
    }

    calcHealing(healthHealed){
        //only heals the player if there hp is less that the given max
        if(this.playerHealth < this.playerHealthMax){
            this.playerHealth+= healthHealed;
            this.updateDisplay(this.playerHealth);
          }
          //used to fix hp value if it overflows past max hp value
        if(this.playerHealth > this.playerHealthMax){
            this.playerHealth = this.playerHealthMax;
        }
    }

    zoomedOut(){
        this.setScale(.5);
        this.x = 300;
        this.y = 250;
    }

    zoomIn(){
        this.setScale(.3);
        this.x = 350;
        this.y = 315;
    }


}