/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
let healthBar;
const startMaxWidth = 284;
const startmaxHight = 57;
const startPlayerHealth = 20;
class hpBar extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos,);

        this.outSide = scene.add.sprite(this.x, this.y, 'healthBar');

        this.outSide.anims.create({key: '0',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '1',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '2',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '3',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '4',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '5',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '6',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '7',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '8',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '9',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: '10',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
        //this.outSide.anims.create({key: '13',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});

        //sets the proper health upgrade animation frame
        
        this.setDepth(20);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);

        this.damageCoolDown = false;
        this.playerHealth = startPlayerHealth;
        this.playerHealthMax = startPlayerHealth;
        this.zoom = .6;
        // change this to the hp max size value sent into the scene

        healthBar = this;


        this.barWidth = startMaxWidth;
        this.barHight = startmaxHight;

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
        this.setScale(.4);
        //this.updateDisplay();
    }
    //simple function using if statements to update display using animations defined above.
    updateDisplay(){

        this.bar.clear();
        
        let percentage = (this.playerHealth/this.playerHealthMax);

        let barLength = Math.floor(this.barWidth * percentage);

        
        if (this.playerHealth < (this.playerHealthMax/3))
        {
            this.bar.fillStyle(0xff0000);
        }else if(this.playerHealth < (this.playerHealthMax/2)){
            this.bar.fillStyle(0xffff00);
        }else{
            this.bar.fillStyle(0x00ff00);
        }

        //this.bar.setScale(.4);
        this.bar.fillRect(-33,  422, barLength,  this.barHight);
        this.bar.x = this.outSide.x-450;
        this.bar.y = this.outSide.y-450;

    }

    calcDamage(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
        //if(this.damageCoolDown === false ){
          //this.damageCoolDown = true;
          this.playerHealth -= damageTaken;
          if(this.playerHealth < 0){
            this.playerHealth = 0;
          }
          this.updateDisplay();
          
       // }
        /*setTimeout(function(){
            healthBar.damageCoolDown = false;
            console.log("damage cool down:"+ healthBar.damageCoolDown);
            //healthBar.clearTint();
          },2000);*/
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

    maxHealth(){
            //maxes out the players current hp
            this.playerHealth = this.playerHealthMax;
            this.updateDisplay();
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

        this.setScale(0.15);
        this.zoom = 0.15;
        this.updateDisplay();
       

    }

    setUpgradeSize(size){
        // sets the outer sprite of the health bar.
        let animationNumber = "";
        animationNumber = animationNumber + size;
        console.log("animationNumber for hpbar: " + animationNumber);
        console.log("this.outSide",this.outSide)
        this.outSide.anims.play(animationNumber);

        //sets the size of the interior health bar to be correct.
        for(let counter = 0; counter < size; counter++){
            console.log("upgrade counter: ", counter);
            if(counter < 2){
                this.barWidth += Math.floor(startMaxWidth * .53);
                this.playerHealthMax += (startPlayerHealth * .40);

            }else if(counter < 6){
                this.barWidth +=  Math.floor(startMaxWidth * .265);
                this.playerHealthMax += (startPlayerHealth * .25);

            }else if(counter < 10){
                this.barWidth += Math.floor(startMaxWidth * .16);
                this.playerHealthMax += (startPlayerHealth * .15);

            }

        }
        console.log("this.playerHealthMax: ",this.playerHealthMax);
    }
    
    

    


}