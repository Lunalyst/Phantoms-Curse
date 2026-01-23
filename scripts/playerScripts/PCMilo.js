
class PCMilo extends Phaser.Physics.Arcade.Sprite {
  // every class needs constructor
  constructor(scene, xPos, yPos){
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos,"milo");
    //then we add new instance into the scene. 
    scene.add.existing(this);

    //then we call this next line to give it collision
    scene.physics.add.existing(this);

    /*this.anims.create({key: 'idle',frames: this.anims.generateFrameNames('milo', { start: 1, end: 4 }),frameRate: 7,repeat: -1});
    this.anims.create({key: 'angleIdle',frames: this.anims.generateFrameNames('milo', { start: 6, end: 9 }),frameRate: 7,repeat: -1});
    this.anims.create({key: 'walk',frames: this.anims.generateFrameNames('milo', { start: 11, end: 20 }),frameRate: 20,repeat: -1});
    this.anims.create({key: 'jumpUp',frames: this.anims.generateFrameNames('milo', { start: 21, end: 22 }),frameRate: 10,repeat: 0});
    this.anims.create({key: 'jumpDown',frames: this.anims.generateFrameNames('milo', { start: 23, end: 24 }),frameRate: 10,repeat: 0});*/

    this.anims.create({key: 'angleIdleLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 1, end: 4 }),frameRate: 7,repeat: -1});
    this.anims.create({key: 'angleIdleRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 5, end: 8 }),frameRate: 7,repeat: -1});
    this.anims.create({key: 'walkLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 9, end: 18 }),frameRate: 17,repeat: -1});
    this.anims.create({key: 'walkRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 19, end: 28 }),frameRate: 17,repeat: -1});
    this.anims.create({key: 'jumpUpLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 29, end: 30 }),frameRate: 10,repeat: 0});
    this.anims.create({key: 'jumpDownLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 31, end: 32 }),frameRate: 10,repeat: 0});
    this.anims.create({key: 'jumpUpRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 33, end: 34 }),frameRate: 10,repeat: 0});
    this.anims.create({key: 'jumpDownRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 35, end: 36 }),frameRate: 10,repeat: 0});
    this.anims.create({key: 'LightAttackStartLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 37, end: 39 }),frameRate: 20,repeat: 0});
    this.anims.create({key: 'LightAttackMiddleLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 40, end: 41 }),frameRate: 20,repeat: 0});
    this.anims.create({key: 'LightAttackEndLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 42, end: 44 }),frameRate: 20,repeat: 0});
    
    this.anims.create({key: 'LightAttackStartRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 45, end: 47 }),frameRate: 20,repeat: 0});
    this.anims.create({key: 'LightAttackMiddleRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 48, end: 49 }),frameRate: 20,repeat: 0});
    this.anims.create({key: 'LightAttackEndRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 50, end: 52 }),frameRate: 20,repeat: 0});
    
     
     
    this.anims.play('angleIdleLeft');

    // creates a custome property to make it easy to track the identity of the PCMilo sprite.
    this.custom_id = 'PCMilo';
    // give PCMilo a idle timer to tell if PCMilo is gone long enough to start sleeping animation.
    this.idleTimer = 0;
    this.idleTimerDelay = false;
    // adds a key to tell movement function what key was pressed last to keep animations facing the right way
    this.lastKey = "d";
    //varibale use to tell what falling animation should be played. used to tell if the PCMilo is falling
    this.PCMiloPreviousY = 0;
    this.animationInAir = false;
    //sets PCMilo gravity in the scene
    this.body.setGravityY(600); 
    //object is on view layer 6
    this.setDepth(6);
    this.setScale(1/3);

    this.visible = false;

    this.setSize(60,200,true);
    this.setOffset(185, 91);
    // hitbox cooldown.
    this.hitboxCoolDown = false;
    this.hitboxState = false;
    this.isAttacking = false;
    this.playedAttackAnimation = false;

    //used to tell what damage type the PCMilo is dealing with melee weapons.
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.curseDamage = 0;

    //did the PCMilo use the doublejump skill?
    this.doubleJumpActivation = false;
    this.spaceDelay = false;
    this.spaceWasPressed = false;
    this.jumped = false;

    this.speed = 250 * this.speedBoost;
    //is used to increase PCMilos speed via items or skills.
    this.speedBoost = 1;
    this.dropChance = 1;
    this.dropAmount = 1;

    //sound effect cooldown
    this.soundCoolDown = false;

    //gives PCMilo a refrence to the scene.
    this.scene = scene;

    this.lanturnFlicker = null;

    if(scene.lightingSystemActive === true){ 
      this.setPipeline('Light2D');

      this.lightSource = scene.lights.addLight(this.x, this.y, 0,0x000000, 1);
      this.lightSource.setColor(0xfffff0);

      this.lanturnFlicker = null;
      this.fuelActivated = false;

      this.curseLight = this.scene.lights.addLight(this.x,this.y-20, 60, 0xb317ff);
      this.curseLight.intensity = 1.1;
      this.curseLight.visible = false;

    }

    this.curseReductiontimer = false;

    this.curseBuildUpCooldown = false;

    this.fallThroughLayer0 = false;

    //set up object of functions for item logic 
    this.armed = true;

    this.MiloAttackType = "light";
      
    }

    miloAnimationFunction(){

    }
    
  
    //built in move PCMilo function to handle how the PCMilo moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
    movePlayer(PCMiloPreviousY,scene){
      
    this.speed = 270;

    //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
    let PCMiloHealthObject = {
      PCMiloHealth: null
  };

  //gets the hp value using a emitter
  healthEmitter.emit(healthEvent.returnHealth,PCMiloHealthObject);

    
    if(this.isAttacking === false){
      //move the PCMilo left

      //if s is pressed fall through the platform by destoying the collision of PCMilo 0.
      if(this.scene.checkSIsDown() && this.body.blocked.down && this.fallThroughLayer0 === false){
      this.scene.player2Layer0Collider.destroy();
      this.fallThroughLayer0 = true;

      let temp = this;
      setTimeout(function(){
        temp.scene.player2Layer0Collider = temp.scene.physics.add.collider(temp,temp.scene.processMap.layer0);
        temp.fallThroughLayer0 = false;
      },300);

      //moves the PCMilo right
      }else if(this.scene.checkAIsDown() && this.body.blocked.down){
          this.lastKey = "a";
          this.idleTimer = 0;
          this.setVelocityX(-this.speed);
          if(this.body.blocked.down){
            this.anims.play('walkRight',true);
            //this.flipX = true
          }

      //moves the PCMilo right
      } else if(this.scene.checkDIsDown() && this.body.blocked.down){
          this.lastKey = "d";
          this.idleTimer = 0;
          this.setVelocityX(this.speed);
          if(this.body.blocked.down){
            this.anims.play('walkLeft',true);
            //this.flipX = false;
            //console.log("moving Right");
          }

      //if the PCMilo doesnt move for long enough, play idle animation
      }else if(this.idleTimer === 2000){
          this.setVelocityX(0);
          //this.PCMilosleepAnimation();

      //otherwise we play idle animation
      }else{
      
        this.setVelocityX(0);

          if(this.animationInAir === false){
            if(this.lastKey === "d"){
              this.anims.play('angleIdleLeft',true);
              //this.flipX = false;
            }else if(this.lastKey === "a"){
              this.anims.play('angleIdleRight',true);
              //this.flipX = true;
            }
          }

          // resets the ilde animation value.
          if(this.idleTimer < 2000 && this.idleTimerDelay === false){
            //console.log("Idle Timer: "+ this.idleTimer);
            let that = this;
            this.idleTimerDelay = true;
            setTimeout(function(){
              that.idleTimer++;
              that.idleTimerDelay = false;
            },1);
            
          }    
        }

      //if the PCMilo is down, then reset variables.   
      if(this.body.blocked.down){
        this.animationPlayedGoingUp = false;
        this.animationPlayedGoingDown = false;
        this.animationInAir = false;
        this.doubleJumpActivation = false;
        this.spaceWasPressed = false;
        this.spaceDelay = false;
      }
        
      //if space is pressed and the PCMilo is on the ground then jump
      //special note, always have the checkpressed at the end if the if statement. programming trick
      //first check if the PCMilo is down.
      if (this.body.blocked.down){
        //console.log("PCMilo is down.")
        // then we have to check if jump was pressed once. we have to structure it this way so that the jump doesnt get locked out.
        if(this.scene.checkJMPPressed()){

          //console.log("first jump")
          this.idleTimer = 0;
          this.setVelocityY(-350);
          let that = this;

        }
        
      }

      //if the PCMilo is  in the air and moving to the left
      if(this.scene.checkAIsDown() && !this.body.blocked.down){
      //console.log("IN AIR AND MOVING LEFT");
        this.setVelocityX(-this.speed);
        this.animationInAir = true;
        //this.flipX = true;
        let that = this;


          //console.log("this.spaceWasPressed: ",this.spaceWasPressed," this.doubleJumpActivation: ",this.doubleJumpActivation," PCMiloSkillsObject.PCMiloSkills.jump: ",PCMiloSkillsObject.PCMiloSkills.jump);
          //if the PCMilo has the double jump ability, allow them to jupm agian.
          if(this.doubleJumpActivation === false && this.scene.checkJMPPressed()){
            //console.log("activating double jump while aKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
            this.doubleJumpActivation = true;
            this.animationPlayedGoingUp = false;
            this.animationPlayedGoingDown = false;
            this.setVelocityY(-350);
            this.scene.initSoundEffect('playerJumpSFX','1',0.1);
            scene.tempPlatform = new doubleJumpEffect(scene,scene.player2.x,scene.player2.y+40,'doubleJumpEffect');
            
          }

          if(PCMiloPreviousY > this.y && this.animationPlayedGoingUp === false){

            this.anims.play('jumpUpRight',true);
            //this.flipX = true;
            this.animationPlayedGoingUp = true;
            //console.log(" jumping while keyA is down and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
            
          }else if(PCMiloPreviousY <= this.y &&  this.animationPlayedGoingDown === false){
            this.anims.play('jumpDownRight',true);
            //this.flipX = true;
            this.animationPlayedGoingDown = true;
            //console.log(" jumping while keyA is down and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          }
        //checks to see if PCMilo is moving right and not touching the ground.

      //if the PCMilo is  in the air and moving to the right
      }else if(this.scene.checkDIsDown() && !this.body.blocked.down){
          //console.log("IN AIR AND MOVING RIGHT");
          this.setVelocityX(this.speed);
          this.animationInAir = true;
          //this.flipX = false;
          //if the PCMilo has the double jump ability, allow them to jupm agian.
          if(this.doubleJumpActivation === false && this.scene.checkJMPPressed()){
            //console.log("activating double jump while dKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
            this.doubleJumpActivation = true;
            this.animationPlayedGoingUp = false;
            this.animationPlayedGoingDown = false;
            this.setVelocityY(-350);
            this.scene.initSoundEffect('playerJumpSFX','1',0.1);
            scene.tempPlatform = new doubleJumpEffect(scene,scene.player2.x,scene.player2.y+40,'doubleJumpEffect');
          }

          if(PCMiloPreviousY > this.y && this.animationPlayedGoingUp === false){

            this.anims.play('jumpUpLeft',true);
            //this.flipX = false
            this.animationPlayedGoingUp = true;
            //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);

          }else if(PCMiloPreviousY <= this.y &&  this.animationPlayedGoingDown === false){

            this.anims.play('jumpDownLeft',true);
            //this.flipX = false
            this.animationPlayedGoingDown = true;
            //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          
          }

      //if the PCMilo is in the air.
      }else if(!this.body.blocked.down){
          this.idleTimer = 0;
          this.animationInAir = true;
          //if the PCMilo has the double jump ability, allow them to jupm agian.
          if(this.doubleJumpActivation === false  && this.scene.checkJMPPressed() ){
            //console.log("activating double jump, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
            this.doubleJumpActivation = true;
            this.animationPlayedGoingUp = false;
            this.animationPlayedGoingDown = false;
            this.setVelocityY(-350);
            this.scene.initSoundEffect('playerJumpSFX','1',0.1);
            scene.tempPlatform = new doubleJumpEffect(scene,scene.player2.x,scene.player2.y+40,'doubleJumpEffect');
          }

          if(PCMiloPreviousY > this.y && this.lastKey === "d"&& this.animationPlayedGoingUp === false){
            this.anims.play('jumpUpLeft',true);
            //this.flipX = false;
            this.animationPlayedGoingUp = true;
            //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          }else if(PCMiloPreviousY <= this.y && this.lastKey === "d"&&  this.animationPlayedGoingDown === false){
            this.anims.play('jumpDownLeft',true);
            //this.flipX = false;
            this.animationPlayedGoingDown = true;
            //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          }else if(PCMiloPreviousY > this.y && this.lastKey === "a"&& this.animationPlayedGoingUp === false){
            this.anims.play('jumpUpRight',true);
            //this.flipX = true;
            this.animationPlayedGoingUp = true;
            //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          }else if(PCMiloPreviousY <= this.y && this.lastKey === "a"&&  this.animationPlayedGoingDown === false){
            this.anims.play('jumpDownRight',true);
            //this.flipX = true;
            this.animationPlayedGoingDown = true;
            //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.PCMiloSkillsData.jump: ",scene.PCMiloSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          }
          //console.log("in the air");
          }
          //console.log("previous PCMilo y"+ PCMiloPreviousY);
      }
        PCMiloPreviousY = this.y;

        //ensures that no mater what PCMilo is facing the correct way.
        if(this.scene.checkDIsDown()){
          this.lastKey = "d";
        }else if(this.scene.checkAIsDown()){
          this.lastKey = "a";
        }

        //console.log("from move PCMilo this.lastKey: ",this.lastKey);
    }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles PCMilo attack animations.
  attackPlayer(){
    //console.log("activating attack function");
    //temp variable of this object to be used my timeout functions
    let that = this;
    //this.setSize(10,60,true);
    //this.setOffset(12, -4 ); 

    
      //plays attack animations based on what the PCMilo has equipt when the PCMilo is not in the air,PCMilo now locked into the animation until it completes
      if(this.body.blocked.down && this.isAttacking === true){

        //console.log("attacking activated.")

        //depending on the key, decide which switch to enter for correctly oriented hitbox 
        if(this.lastKey === 'd'){
          //this.flipXcontainer(false);
        }else if(this.lastKey === 'a'){
          //this.flipXcontainer(true);
        }

        //wakes up PCMilo if they are sleeping.
        this.idleTimer = 0;

          //case to determine attack animation
          switch(this.MiloAttackType) {
            case ("light"):
              if(this.playedAttackAnimation === false){

                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high2',0.1);

                if(this.lastKey === 'd'){
                this.anims.play("LightAttackStartLeft").once('animationcomplete', () => {

                  this.anims.play("LightAttackMiddleLeft").once('animationcomplete', () => {

                    this.anims.play("LightAttackEndLeft").once('animationcomplete', () => {

                      this.isAttacking = false;
                      this.playedAttackAnimation = false;
                      console.log("attack is over so stoping");
                      this.bluntDamage = 0;

                    });
                  });

                });
                 
                }else if(this.lastKey === 'a'){
                  this.anims.play("LightAttackStartRight").once('animationcomplete', () => {

                  this.anims.play("LightAttackMiddleRight").once('animationcomplete', () => {

                    this.anims.play("LightAttackEndRight").once('animationcomplete', () => {

                      this.isAttacking = false;
                      this.playedAttackAnimation = false;
                      console.log("attack is over so stoping");
                      this.bluntDamage = 0;

                    });
                  });

                });
                }
              }
              this.bluntDamage = 3;
              this.setAttackHitboxSize(20,40);
              this.HitBox(600,35);
              break;
            default:

            }
            //console.log("isattacking: ", this.isAttacking);

      }else{
        console.log("attack else case")
        //important fall though caseto reset variables if the PCMilo is not swinging
        this.scene.attackHitBox.x = this.x;
        this.scene.attackHitBox.y = this.y+10000;

        //important reset of the hitbox state incase the PCMilo isnt swinging set this to false.
        this.hitboxState = false;

        //resets variable so PCMilo only swings once per press of shift
        this.isAttacking = false;

        //stops weapon sound effects.
        this.scene.initSoundEffect('weaponSFX','medium',0);
        this.scene.sound.get('weaponSFX').stop();
      }
    
      
    
  
  }

  //handles hitbox position when attacking right, note this function is only activated if shift is down. that is handle
  //note make a function that given a size number can change the shape of the hitbox?
  HitBox(delay,distance){

    //stop the PCMilos velocity
    this.setVelocityX(0);
    
    //start by having the PCMilo press shift state should be false
    if(this.hitboxState === false){
      
      //PCMilo is swinging so  set the state to true
      this.hitboxState = true;

      // now we start a timer that will activate the hitbox
      let tempPCMilo = this;
      setTimeout(function(){

        //after half the delay given we check the hitbox state if its still true
        //console.log("Phaser.Input.Keyboard.JustDown(this.scene.shift) ",Phaser.Input.Keyboard.JustDown(this.scene.shift))
        if(tempPCMilo.hitboxState === true){
          
          //put hitbox infront of the PCMilo in the way there facing
          if(tempPCMilo.lastKey === 'd'){
            tempPCMilo.scene.attackHitBox.x = tempPCMilo.x+distance;

            //has the PCMilo move forward slightly
            if(!tempPCMilo.scene.PCMiloGrabbed){
              tempPCMilo.setVelocityX(20);
            }
          }else{
            tempPCMilo.scene.attackHitBox.x = tempPCMilo.x-distance;

            if(!tempPCMilo.scene.PCMiloGrabbed){
              tempPCMilo.setVelocityX(-20);
            }
          }
          tempPCMilo.scene.attackHitBox.y = tempPCMilo.y

          //set a timeout function so the hitbox lingeres for a tenth of a second
          setTimeout(function(){
            
            //after that time is up put the hitbox back to its idle location and reset the hitboxstate variable. 
            tempPCMilo.scene.attackHitBox.x = tempPCMilo.x;
            tempPCMilo.scene.attackHitBox.y = tempPCMilo.y+10000;
            tempPCMilo.hitboxState = false;

          },100);

        //otherwise reset state of attack hitbox
        }

      },delay/2);
    }
  }

  // function to activate the weapon swing effect
  //type are light1 light2 medium and heavy
  weaponSoundEffect(type, delay){
    if(this.soundCoolDown === false){
      this.scene.initSoundEffect('weaponSFX',type,0.1);
      this.soundCoolDown = true;

      let PCMilo = this;
      setTimeout(function () {
          PCMilo.soundCoolDown = false;
      }, delay);
    }
  }

  //array of weapon effect functions
  setupWeaponPassivesMap(){
    let tempPCMilo = this;

    this.weaponPassivesMap = {
      // default if the PCMilo has no rings equipt
      0: function Funct0() {
        tempPCMilo.dropChance = 1;
      },
      //rapier
      1: function Funct1() {
        tempPCMilo.dropChance = 1;
      },
      //oar
      2: function Funct2() {
        tempPCMilo.dropChance = 1;
      },
      //mimic rapier
      3: function Funct3() {
        //console.log("activating mimic rapier bonus")
        tempPCMilo.dropChance = 2;
      },
      //knife
      4: function Funct4() {
        tempPCMilo.dropChance = 1;
      },
      //axe
      10: function Funct10() {
        tempPCMilo.dropChance = 1;
      },
      24: function Funct24() {
        tempPCMilo.dropChance = 1;
      },
      25: function Funct25() {
        tempPCMilo.dropChance = 1;
      },
      
    }

  }
  //array of ring effect functions
  setupRingPassivesMap(){
    let tempPCMilo = this;

    this.ringPassivesMap = {
      // default if the PCMilo has no rings equipt
      0: function Funct0() {
         //console.log("no item equipt");
        tempPCMilo.speedBoost = 1;
        tempPCMilo.dropAmount = 1;
        tempPCMilo.ringType = 0;

        tempPCMilo.deactivatelight();

      },
      // if mimic ring is equipt
      6: function Funct6() {
        //console.log("activating mimic ring");
        tempPCMilo.speedBoost = 1;
        tempPCMilo.dropAmount = 2;
        tempPCMilo.ringType = 6;

        tempPCMilo.deactivatelight();
      },
      //if the PCMilo has the carrot ring equipt
      8: function Funct8() {
        //console.log("activating speed boost");
        tempPCMilo.speedBoost = 1.2;
        tempPCMilo.dropAmount = 1;
        tempPCMilo.ringType = 8;

        tempPCMilo.deactivatelight();
      },
      //if the PCMilo has the lantern
      21: function Funct21() {

        tempPCMilo.speedBoost = 1;
        tempPCMilo.dropAmount = 1;
        tempPCMilo.ringType = 21;

          if(tempPCMilo.scene.lightingSystemActive === true){ 

          //then check to see if the PCMilo has fuel.
          if(tempPCMilo.PCMiloDataObject.PCMiloInventoryData[2].itemID === 16){

            //set a tween on the light source to make the lanturn flicker
            if(tempPCMilo.lanturnFlicker === undefined || tempPCMilo.lanturnFlicker === null ){

              tempPCMilo.lightSource.setRadius(100);

              tempPCMilo.lanturnFlicker = tempPCMilo.scene.tweens.add({
                targets: tempPCMilo.lightSource,
                props : {
                    radius: {value : '+=' +8},
                    intensity: {value : '+=' +.15},
      
                }, 
                ease: 'linear',
                duration: 800,
                repeat: -1,
                yoyo: true
              });
            }
            //console.log("this.fuelActivated: ", this.fuelActivated);
            //apply timer to fuel source and reduce fuel amount by 1 every 45 seconds.
            if(tempPCMilo.fuelActivated === false){

              tempPCMilo.fuelActivated = true;

              setTimeout(function(){
                if(tempPCMilo !== undefined && tempPCMilo !== null){

                  //calls emitter to reduce item amount at specific location
                  // in this case reduce slot 2 by 1.
                  inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,2,1);
            
                  tempPCMilo.fuelActivated = false;


                }

              },10000);
    
          }


          //otherwise if there is no fuel to burn, set lanturn to be off.
          }else{
            tempPCMilo.lightSource.setRadius(0);
            if(tempPCMilo.lanturnFlicker !== undefined && tempPCMilo.lanturnFlicker !== null ){
              tempPCMilo.lanturnFlicker.stop();
              tempPCMilo.lanturnFlicker = null;
            }

          }

        //otherwise turn the lightsource off
        }else if(tempPCMilo.scene.lightingSystemActive === true){

          tempPCMilo.lightSource.setRadius(0);

          if(tempPCMilo.lanturnFlicker !== undefined && tempPCMilo.lanturnFlicker !== null ){
              tempPCMilo.lanturnFlicker.stop();
              tempPCMilo.lanturnFlicker = null;
          }
        }
      },
      
    }

  }

  overlapCurseBuildUp(){

    if(this.curseBuildUpCooldown === false &&  this.scene.PCMiloStuckGrab === false){

      this.curseBuildUpCooldown = true;

      healthEmitter.emit(healthEvent.curseBuildUp,2);

      let tempPCMilo = this;

      setTimeout(function(){
              
        tempPCMilo.curseBuildUpCooldown = false;
      },100);

    }

  }

  deactivatelight(){
    if(this.scene.lightingSystemActive === true){

          this.lightSource.setRadius(0);

          if(this.lanturnFlicker !== undefined && this.lanturnFlicker !== null ){
              this.lanturnFlicker.stop();
              this.lanturnFlicker = null;
          }
        }
  }

  //sets size of hitbox while attacking.
  setAttackHitboxSize(width,height){
    this.scene.attackHitBox.setSize(width,height);
  }

  
}


