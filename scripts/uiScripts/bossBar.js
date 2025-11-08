let bar;

const startBossMaxWidth = 1068;
const startBossmaxHight = 56;
const startBossHealth = 100;

class bossBar extends Phaser.GameObjects.Container {

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        this.outSide = scene.add.sprite(0, 0, 'bossBar');

        //sets the proper health upgrade animation frame
        
        this.setDepth(20);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);

        this.damageCoolDown = false;
        this.zoom = .6;
        // change this to the hp max size value sent into the scene

        bar = this;

        this.bossHealth = startBossHealth;
        this.bossHealthMax = startBossHealth;
        this.hpBarWidth = startBossMaxWidth;
        this.hpBarHight = startBossmaxHight;

        this.bossBar = new Phaser.GameObjects.Graphics(scene);

        this.add(this.outSide);
        this.add(this.bossBar);

        scene.add.existing(this);
        this.setScale(.4);

        this.visible = false;

        this.scene = scene;

        
    }

    //simple function using if statements to update display using animations defined above.
    updateDisplay(){

        //update hp bar
        this.bossBar.clear();
        
        let percentage = (this.bossHealth/this.bossHealthMax);

        let barLength = Math.floor(this.hpBarWidth * percentage);

        
        if (this.bossHealth < (this.bossHealthMax/3))
        {
            this.bossBar.fillStyle(0xff0000);
        }else if(this.bossHealth < (this.bossHealthMax/2)){
            this.bossBar.fillStyle(0xffff00);
        }else{
            this.bossBar.fillStyle(0x00ff00);
        }

        //this.bar.setScale(.4);
        this.bossBar.fillRect(-83,  422, barLength,  this.hpBarHight);
        this.bossBar.x = this.outSide.x-450;
        this.bossBar.y = this.outSide.y-450;

    }

    setBossHp(health,maxHealth){
        this.bossHealth = health;
        this.bossHealthMax  = maxHealth;
        this.updateDisplay();
    }

    setBossName(name){
        this.bossName = new makeText(this.scene,-520,-15,'charWhite',name);
        this.bossName.setScale(2);
        this.add(this.bossName);
    }

    calcDamage(damageTaken){
        //calcs damage by updating the value first then the display. thes sets cool down so damage does not happen too quickly.
          this.bossHealth -= damageTaken;
          if(this.bossHealth < 0){
            this.bossHealth = 0;
          }
          this.updateDisplay();   
    }

    calcHealing(healthHealed){
        //only heals the player if there hp is less that the given max
        if(this.bossHealth < this.bossHealthMax){
            this.bossHealth+= healthHealed;
            this.updateDisplay();
          }
          //used to fix hp value if it overflows past max hp value
        if(this.bossHealth > this.bossHealthMax){
            this.bossHealth = this.bossHealthMax;
        }
    }

    maxHealth(){
        //maxes out the players current hp
        this.bossHealth = this.bossHealthMax;
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
}
