/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
let healthBar;
class hpBar extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos,);

        this.outSide = scene.add.sprite(this.x, this.y, 'healthBar');

        this.outSide.anims.create({key: '6',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '7',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '8',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '9',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '10',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '11',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '12',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '13',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '14',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '15',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '16',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
        //this.outSide.anims.create({key: '13',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});

        this.setDepth(20);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);

        this.damageCoolDown = false;
        this.playerHealth = 6;
        this.playerHealthMax = 6;
        this.zoom = .6;
        // change this to the hp max size value sent into the scene
        this.outSide.anims.play("6");

        healthBar = this;

        this.maxLength = 284;
        this.barHight = 57;

        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(20);
        //this.bar.setDepth(7);
        //this.bar.setScale(.3);
        this.bar.setScrollFactor(0);

       /* this.hpBarElements = new Phaser.GameObjects.Group(scene); 
        this.hpBarElements.add(this.outSide); 
        this.hpBarElements.add(this.bar); */
        
        this.add(this.outSide);
        this.add(this.bar);

        scene.add.existing(this);
        this.setScale(.3);
        //this.updateDisplay();
    }
    //simple function using if statements to update display using animations defined above.
    updateDisplay(){

        this.bar.clear();
        
        let percentage = (this.playerHealth/this.playerHealthMax);

        let barLength = Math.floor(this.maxLength * percentage);

        
        if (this.playerHealth < (this.playerHealthMax/3))
        {
            this.bar.fillStyle(0xff0000);
        }else if(this.playerHealth < (this.playerHealthMax/2)){
            this.bar.fillStyle(0xffff00);
        }else{
            this.bar.fillStyle(0x00ff00);
        }

        //let barLength = Math.floor(this.p *  this.maxLength);
        //this.bar.setScale(.4);
        this.bar.fillRect(-33,  422, barLength,  this.barHight);

    }

    calcDamage(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
        if(this.damageCoolDown === false ){
          this.damageCoolDown = true;
          this.playerHealth -= damageTaken;
          this.updateDisplay();
          
        }
        setTimeout(function(){
            healthBar.damageCoolDown = false;
            console.log("damage cool down:"+ healthBar.damageCoolDown);
            healthBar.clearTint();
          },2000);
    }

    calcHealing(healthHealed){
        //only heals the player if there hp is less that the given max
        if(this.playerHealth < this.playerHealthMax){
            this.playerHealth+= healthHealed;
            this.updateDisplay();
          }
          //used to fix hp value if it overflows past max hp value
        if(this.playerHealth > this.playerHealthMax){
            this.playerHealth = this.playerHealthMax;
        }
    }

    zoomedOut(){
        this.x =270 
        this.y =120

        this.setScale(.3);
        this.zoom = .3;
        this.updateDisplay();

    }

    zoomIn(){
        //console.log(" zooming in the health bar");
        this.x =383 
        this.y =305

        this.setScale(.15);
        this.zoom = .15;
        this.updateDisplay();
       

    }

    


}