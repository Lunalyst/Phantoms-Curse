

class enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, xPos, yPos, sex, id, hp, enemySprite) {
        //super() calls the constructor() from the parent class we are extending
        console.log("enemySprite: ",enemySprite);
        super(scene, xPos, yPos, enemySprite);
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.enemyPreviousY = 0;
        //this.setPushable(false);
        this.moveCycleTimer = false;
        this.activatedCycleTimer = false;
        //value used to tell if the player can escape.
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        
        this.AnimationPosition;
        this.struggleFree = false;
        this.grabCoolDown = false;
        this.enemyId = id;
        this.enemyDamageCounter = false;
        this.playerDefeated = false;
        this.playerBrokeFree = 0;
        this.playerDefeatedAnimationStage = 0;
        this.stageTimer = 0;
        this.stageNumber = 2;
        this.enemyHP = hp;
        this.damageCoolDown = false;
        this.hitboxOverlaps = false;
        this.animationPlayed = false;
        this.keyAnimationPlayed = false;
        this.struggleCounterTick = false;

        //shrinks prite back down to a third of its size since we upscale sprites.
        this.setScale(1 / 3);
       
        //used to tell which way the enemy is facing.
        this.direction = "left";

        console.log("sex passed in enemy: " + sex);
        
    }

    //functions that move evemy objects.is to be over written by child class
    Move(player1) {

    }

    //idle function played when the player is grabbed by something that isnt this enemy.
    //is to be over written by child class
    MoveIdle() {
        

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    //is to be over written by child class
    gameOver() {
        
    }

    //the grab function. is called when player has overlaped with an enemy.
    //is to be over written by child class
    grab(player1, keyS, KeyDisplay, keyW, scene, keyTAB) {
    

    }

    damage(scene) {
        
    }

    //handles damage damage calculator for the enemy.
    //is to be over written by child class
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
       
    }

    //plays the default player defeated animation.
    //is to be over written by child class
    defeatedPlayerAnimation() {
        
    }

    //pauses the animations of the enemys.
    pauseAnimations(scene) {
        if (scene.isPaused === true) {
            this.anims.pause();
        } else if (scene.isPaused === false) {
            this.anims.resume();
        }

    }

}

