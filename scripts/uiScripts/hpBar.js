let healthBar;
const startMaxWidth = 284;
const startmaxHight = 57;
const startPlayerHealth = 20;

const startMaxWidth1 = 230;
const startmaxHight1 = 27;
const startPlayerCurse = 18;
class hpBar extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

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

        this.outSide.anims.create({key: 'miloMasked',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 11, end: 11 }),frameRate: 10,repeat: -1});
        this.outSide.anims.create({key: 'milo',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 12, end: 12 }),frameRate: 10,repeat: -1});



        //sets the proper health upgrade animation frame
        
        this.setDepth(20);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);

        this.damageCoolDown = false;
        this.zoom = .6;
        // change this to the hp max size value sent into the scene

        healthBar = this;

        this.playerHealth = startPlayerHealth;
        this.playerHealthMax = startPlayerHealth;
        this.hpBarWidth = startMaxWidth;
        this.hpBarHight = startmaxHight;

        this.hpBar = new Phaser.GameObjects.Graphics(scene);

        this.playerCurse = startPlayerCurse;
        this.playerCurseMax = startPlayerCurse;
        this.curseBarWidth = startMaxWidth1;
        this.curseBarHight = startmaxHight1;

        this.curseBar = new Phaser.GameObjects.Graphics(scene);
        
        this.add(this.outSide);
        this.add(this.hpBar);
        this.add(this.curseBar);

        scene.add.existing(this);
        this.setScale(.4);

        
    }

    //simple function using if statements to update display using animations defined above.
    updateDisplay(){

        //update hp bar
        this.hpBar.clear();
        
        let percentage = (this.playerHealth/this.playerHealthMax);

        let barLength = Math.floor(this.hpBarWidth * percentage);

        
        if (this.playerHealth < (this.playerHealthMax/3))
        {
            this.hpBar.fillStyle(0xff0000);
        }else if(this.playerHealth < (this.playerHealthMax/2)){
            this.hpBar.fillStyle(0xffff00);
        }else{
            this.hpBar.fillStyle(0x00ff00);
        }

        //this.bar.setScale(.4);
        this.hpBar.fillRect(-33,  407, barLength,  this.hpBarHight);
        this.hpBar.x = this.outSide.x-450;
        this.hpBar.y = this.outSide.y-450;

        //curse bar update
        this.curseBar.clear();

        percentage = (this.playerCurse/this.playerCurseMax);

        barLength = Math.floor(this.curseBarWidth * percentage);

        this.curseBar.fillStyle(0xb317ff);

        //this.bar.setScale(.4);
        this.curseBar.fillRect(-33,  473, barLength,  this.curseBarHight);
        this.curseBar.x = this.outSide.x-450;
        this.curseBar.y = this.outSide.y-450;

    }

    calcDamage(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
          this.playerHealth -= damageTaken;
          if(this.playerHealth < 0){
            this.playerHealth = 0;
          }
          this.updateDisplay();   
    }

    calcCurseReduction(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
          this.playerCurse -= damageTaken;
          if(this.playerCurse < 0){
            this.playerCurse = 0;
          }
          this.updateDisplay();   
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

    calcCurseBuildUp(healthHealed){
        //only heals the player if there hp is less that the given max
        if(this.playerCurse < this.playerCurseMax && this.playerCurse + healthHealed <= this.playerCurseMax){
            this.playerCurse += healthHealed;
            this.updateDisplay();

        }else if(this.playerCurse + healthHealed > this.playerCurseMax){
            this.playerCurse = this.playerCurseMax;
            this.updateDisplay();
        }
        //used to fix hp value if it overflows past max hp value
        if(this.playerCurse > this.playerCurseMax){
            this.playerCurse = this.playerCurseMax;
        }
        console.log("this.playerCurse: ", this.playerCurse);
    }

    maxHealth(){
        //maxes out the players current hp
        this.playerHealth = this.playerHealthMax;
        this.updateDisplay();
    }

    maxCurse(){
        //maxes out the players current hp
        this.playerCurse  = this.playerCurseMax;
        this.updateDisplay();
    }

    clearCurse(){
        
        //maxes out the players current hp
        this.playerCurse  = 0;
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

        //need to reset the bar value, so that when the next upgrade is added, the bar and player hp is set correctly based of the starting bar length and player start health.
        this.hpBarWidth = startMaxWidth;
        this.playerHealthMax = startPlayerHealth;

        this.curseBarWidth = startMaxWidth1;
        this.playerCurseMax = startPlayerCurse;

        //sets the size of the interior health bar to be correct. heal increase becomes less with more upgrades.
        for(let counter = 0; counter < size; counter++){
            console.log("upgrade counter: ", counter);
            if(counter < 2){
                this.hpBarWidth += Math.floor(startMaxWidth * .53);
                this.playerHealthMax += Math.floor(startPlayerHealth * .40);

                this.curseBarWidth += Math.floor(startMaxWidth1 * .32);
                this.playerCurseMax += Math.floor(startPlayerCurse * .40);

            }else if(counter < 6){
                this.hpBarWidth +=  Math.floor(startMaxWidth * .265);
                this.playerHealthMax += Math.floor(startPlayerHealth * .25);

                this.curseBarWidth += Math.floor(startMaxWidth1 * .79);
                this.playerCurseMax += Math.floor(startPlayerCurse * .25);

            }else if(counter < 10){
                this.hpBarWidth += Math.floor(startMaxWidth * .16);
                this.playerHealthMax += Math.floor(startPlayerHealth * .15);

                this.curseBarWidth += Math.floor(startMaxWidth1 * .50);
                this.playerCurseMax += Math.floor(startPlayerCurse * .15);

            }

        }
        console.log("this.playerHealthMax: ",this.playerHealthMax);
    }

}

