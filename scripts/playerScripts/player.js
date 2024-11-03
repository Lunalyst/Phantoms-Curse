//player entity.
class player extends Phaser.Physics.Arcade.Sprite{
  // every class needs constructor
  constructor(scene, xPos, yPos,sex){
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos);
    //then we add new instance into the scene. 
    scene.add.existing(this);
    //then we call this next line to give it collision
    scene.physics.add.existing(this);
  
    // creates a custome property to make it easy to track the identity of the player sprite.
    this.custom_id = 'player';
    // give player a idle timer to tell if player is gone long enough to start sleeping animation.
    this.idleTimer = 0;
    this.idleTimerDelay = false;
    // adds a key to tell movement function what key was pressed last to keep animations facing the right way
    this.lastKey = "d";
    //varibale use to tell what falling animation should be played. used to tell if the player is falling
    this.playerPreviousY = 0;
    this.animationPlayedGoingUp = false;
    this.animationPlayedGoingDown = false;
    this.animationInAir = false;
    //sets player gravity in the scene
    this.body.setGravityY(600); 
    //player not pushable. may cause a problem if i want a enemy that throws player
    this.setPushable(false);
    //object is on view layer 6
    this.setDepth(6);
    // hitbox cooldown.
    this.hitboxCoolDown = false;
    this.hitboxState = false;
    this.isAttacking = false;
    this.playedAttackAnimation = false;

    //used to tell what damage type the player is dealing with melee weapons.
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;

    //did the player use the doublejump skill?
    this.doubleJumpActivation = false;
    this.spaceDelay = false;
    this.spaceWasPressed = false;
    this.jumped = false;

    //shrinks the sprite by 1/3 since the sprites are 3 times as big to improve resolution.
    this.setScale(1/3);

    //is used to increase players speed via items or skills.
    this.speedBoost = 1;

    //sound effect cooldown
    this.soundCoolDown = false;

    //gives player a refrence to the scene.
    this.scene = scene;

    //defines player animations. animations are define on startup based on the players sex
    if(sex === 0){
      this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('malePlayer', { start: 1, end: 8 }),frameRate: 6,repeat: -1});
      this.anims.create({key: 'p',frames: this.anims.generateFrameNames('malePlayer', { start: 9, end: 16 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'pJumpUp',frames: this.anims.generateFrameNames('malePlayer', { start: 17, end: 19 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pJumpDown',frames: this.anims.generateFrameNames('malePlayer', { start: 20, end: 21 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('malePlayer', { start: 22, end: 41 }),frameRate: 1.5,repeat: -1});
      
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('malePlayer', { start: 42, end: 47 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('malePlayer', { start: 48, end: 53 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('malePlayer', { start: 54, end: 59 }),frameRate: 9,repeat: 0});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('malePlayer', { start: 60, end: 65 }),frameRate: 8,repeat: 0});
    
    }else{
      this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('femalePlayer', { start: 1, end: 8 }),frameRate: 6,repeat: -1});
      this.anims.create({key: 'p',frames: this.anims.generateFrameNames('femalePlayer', { start: 9, end: 16 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'pJumpUp',frames: this.anims.generateFrameNames('femalePlayer', { start: 17, end: 19 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pJumpDown',frames: this.anims.generateFrameNames('femalePlayer', { start: 20, end: 21 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('femalePlayer', { start: 22, end: 41 }),frameRate: 1.5,repeat: -1});
    
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('femalePlayer', { start: 42, end: 47 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('femalePlayer', { start: 48, end: 53 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('femalePlayer', { start: 54, end: 59 }),frameRate: 9,repeat: 0});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('femalePlayer', { start: 60, end: 65 }),frameRate: 8,repeat: 0});
    
    }
  }
    
  //built in move player function to handle how the player moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
  movePlayer(keyA,keyD,space,playerPreviousY,scene){
   
    //console.log("this.animationPlayedGoingUp:", this.animationPlayedGoingUp," this.animationPlayedGoingDown: ", this.animationPlayedGoingDown," this.animationInAir: ", this.animationInAir);
    
  //create a temp object to be sent to the emitter
  let playerSkillsObject = {
    playerSkills: null
  };

  //calls emitter to check if the player has skills that apply to movement
  playerSkillsEmitter.emit(playerSkills.getJump,playerSkillsObject);

  let playerDataObject = {
    playerInventoryData: null
  };
  // call to emitter to get player inventory data.
  //console.log("ACTIVATING GET INVENTORY EMITTER FROM PLAYER MOVEMENT FUNCTION");
  inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

  
  //console.log("playerDataObject.playerInventoryData", playerDataObject.playerInventoryData);
  //if the player has speed ring equipt change speed multiplier.
  if(playerDataObject.playerInventoryData !== null){
    if(playerDataObject.playerInventoryData[1].itemID === 8){
      //console.log("speed ring equipt");
      this.speedBoost = 1.1;
    }else{
      this.speedBoost = 1;
    }
  }
  
  if(this.isAttacking === false){
    //move the player left
    
    //console.log("this.scene.checkAIsDown()",this.scene.checkAIsDown());
    if(this.scene.checkAIsDown() && this.body.blocked.down){
        this.setSize(50,210,true);
        this.lastKey = "a";
        this.idleTimer = 0;
        this.setVelocityX(-250 * this.speedBoost);
        if(this.body.blocked.down){
          this.anims.play('p',true);
          this.flipX = true;
          //console.log("moving left");
        }

    //moves the player right
    } else if(this.scene.checkDIsDown() && this.body.blocked.down){
        this.setSize(50,210,true);
        this.lastKey = "d";
        this.idleTimer = 0;
        this.setVelocityX(250 * this.speedBoost);
        if(this.body.blocked.down){
          this.anims.play('p',true);
          this.flipX = false;
          //console.log("moving Right");
        }

    //if the player doesnt move for long enough, play idle animation
    }else if(this.idleTimer === 2000){
        this.setVelocityX(0);
        this.anims.play('pSleep',true);

    //otherwise we play idle animation
    }else{
        this.setSize(50,210,true);
        this.setVelocityX(0);

        if(this.animationInAir === false){
          if(this.lastKey === "d"){
            this.anims.play('pIdle',true);
            this.flipX = false;
          }else if(this.lastKey === "a"){
            this.anims.play('pIdle',true);
            this.flipX = true;
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

    //checks to see if player space is down and player is on the ground to activate jump 
    //some notes, inorder to implement double jump use this.jumped to block out the first jump functions, then make a one where it is available.
    if(this.scene.checkJMPIsDown()){
      let that = this;
      console.log("this.spaceDelay: ",this.spaceDelay);
      if(this.spaceDelay === false){
        this.spaceDelay = true;
        console.log("this.spaceDelay: ",this.spaceDelay);
        setTimeout(function(){
          that.spaceWasPressed = true;
          that.spaceDelay = false;
          console.log("that.spaceWasPressed: ",that.spaceWasPressed);
        },200);
        console.log("this.spaceWasPressed: ",this.spaceWasPressed);
      }
    }

    //if the player is down, then reset variables.   
    if(this.body.blocked.down){
      this.animationPlayedGoingUp = false;
      this.animationPlayedGoingDown = false;
      this.animationInAir = false;
      this.doubleJumpActivation = false;
      this.spaceWasPressed = false;
      this.spaceDelay = false;
    }
      
    //if space is pressed and the player is on the ground then jump
    if (this.scene.checkJMPIsDown() && this.body.blocked.down){
      this.idleTimer = 0;
      this.setVelocityY(-350);
      let that = this;
      }

    //if the player is  in the air and moving to the left
    if(this.scene.checkAIsDown() && !this.body.blocked.down){
    //console.log("IN AIR AND MOVING LEFT");
      this.setVelocityX(-250 * this.speedBoost);
      this.animationInAir = true;
      let that = this;


        //if the player has the double jump ability, allow them to jupm agian.
        if(this.spaceWasPressed === true && this.doubleJumpActivation === false && this.scene.checkJMPIsDown() && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1){
          //console.log("activating double jump while aKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
          
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.anims.play('pJumpUp');
          this.flipX = true;
          this.animationPlayedGoingUp = true;
          //console.log(" jumping while keyA is down and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          
        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){
          this.anims.play('pJumpDown');
          this.flipX = true;
          this.animationPlayedGoingDown = true;
          //console.log(" jumping while keyA is down and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
      //checks to see if player is moving right and not touching the ground.

    //if the player is  in the air and moving to the right
    }else if(this.scene.checkDIsDown() && !this.body.blocked.down){
        //console.log("IN AIR AND MOVING RIGHT");
        this.setVelocityX(250 * this.speedBoost);
        this.animationInAir = true;
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.spaceWasPressed === true && this.doubleJumpActivation === false && this.scene.checkJMPIsDown() && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump while dKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.anims.play('pJumpUp');
          this.flipX = false;
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);

        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){

          this.anims.play('pJumpDown');
          this.flipX = false;
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        
        }

    //if the player is in the air.
    }else if(!this.body.blocked.down){
        this.idleTimer = 0;
        this.animationInAir = true;
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.spaceWasPressed === true && this.doubleJumpActivation === false && this.scene.checkJMPIsDown() && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.lastKey === "d"&& this.animationPlayedGoingUp === false){
          this.anims.play('pJumpUp');
          this.flipX = false;
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "d"&&  this.animationPlayedGoingDown === false){
          this.anims.play('pJumpDown');
          this.flipX = false;
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY > this.y && this.lastKey === "a"&& this.animationPlayedGoingUp === false){
          this.anims.play('pJumpUp');
          this.flipX = true;
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "a"&&  this.animationPlayedGoingDown === false){
          this.anims.play('pJumpDown');
          this.flipX = true;
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
        //console.log("in the air");
        }
        //console.log("previous player y"+ playerPreviousY);
    }
      playerPreviousY = this.y;
  }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles player attack animations.
  attackPlayer(scene){
    //temp variable of this object to be used my timeout functions
    let that = this;
    this.setSize(50,210,true);
    //temp object sent to be sent to a emitter
    let playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

    //if shift is pressed then force the player to attacks, no animation cancel
    if(this.body.blocked.down && this.scene.checkATKIsDown() && this.isAttacking === false){
      this.isAttacking = true;

    //plays attack animations based on what the player has equipt when the player is not in the air,player now locked into the animation until it completes
    }else if(this.body.blocked.down && this.isAttacking === true){

      //depending on the key, decide which switch to enter for correctly oriented hitbox 
      if(this.lastKey === 'd'){
        this.flipX = false;
      }else if(this.lastKey === 'a'){
        this.flipX = true;
      }

        //case to determine attack animation
        switch(playerDataObject.playerInventoryData[0].itemID) {
          case (2):
            if(this.playedAttackAnimation === false){
              this.playedAttackAnimation = true;
              this.scene.initSoundEffect('weaponSFX','medium',0.1);
              this.anims.play("pAttackOar").once('animationcomplete', () => {
                this.isAttacking = false;
                this.playedAttackAnimation = false;
                console.log("attack is over so stoping");
                this.bluntDamage = 0;
            });
            }
            this.bluntDamage = 3;
            this.setAttackHitboxSize(20,30);
            this.HitBox(600,35);
            break;
          case (4):
            console.log("starting knife animation");
            
            if(this.playedAttackAnimation === false){
              this.playedAttackAnimation = true;
              this.scene.initSoundEffect('weaponSFX','high2',0.1);
              this.anims.play("pAttackKnife").once('animationcomplete', () => {
                this.isAttacking = false;
                this.playedAttackAnimation = false;
                console.log("attack is over so stoping");
                this.sliceDamage = 0;
            });
            }
            this.sliceDamage = 4;
            this.setAttackHitboxSize(15,30);
            this.HitBox(200,25);  
            break;
          case (10):
            if(this.playedAttackAnimation === false){
              this.playedAttackAnimation = true;
              this.scene.initSoundEffect('weaponSFX','heavy',0.1);
              this.anims.play("pAttackAxe").once('animationcomplete', () => {
                this.isAttacking = false;
                this.playedAttackAnimation = false;
                console.log("attack is over so stoping");
                this.sliceDamage = 0;
            });
            }
            this.sliceDamage = 8;
            this.setAttackHitboxSize(20,30);
            this.HitBox(300,30);
            break;
          default:
            if(this.playedAttackAnimation === false){
              this.playedAttackAnimation = true;
              this.scene.initSoundEffect('weaponSFX','high1',0.1);
              this.anims.play("pAttackUnarmed").once('animationcomplete', () => {
                this.isAttacking = false;
                this.playedAttackAnimation = false;
                console.log("attack is over so stoping");
                this.bluntDamage = 0;
            });
            }
            this.bluntDamage = 1;
            this.setAttackHitboxSize(10,20);
            this.HitBox(200,20);
          }

    //otherwise is the player isnt attacking anymore then reset all values
    }else{
      //important fall though caseto reset variables if the player is not swinging
      this.scene.attackHitBox.x = this.x;
      this.scene.attackHitBox.y = this.y+10000;

      //important reset of the hitbox state incase the player isnt swinging set this to false.
      this.hitboxState = false;

      //resets variable so player only swings once per press of shift
      this.isAttacking = false;

      //stops weapon sound effects.
      this.scene.initSoundEffect('weaponSFX','medium',0);
      this.scene.sound.get('weaponSFX').stop();
    }
  
  }

  //handles hitbox position when attacking right, note this function is only activated if shift is down. that is handle
  //note make a function that given a size number can change the shape of the hitbox?
  HitBox(delay,distance){

    //stop the players velocity
    this.setVelocityX(0);
    
    //start by having the player press shift state should be false
    if(this.hitboxState === false){
      

      //player is swinging so  set the state to true
      this.hitboxState = true;

      // now we start a timer that will activate the hitbox
      let tempPlayer = this;
      setTimeout(function(){

        //after half the delay given we check the hitbox state if its still true
        //console.log("Phaser.Input.Keyboard.JustDown(this.scene.shift) ",Phaser.Input.Keyboard.JustDown(this.scene.shift))
        if(tempPlayer.hitboxState === true){
          
          //put hitbox infront of the player in the way there facing
          if(tempPlayer.lastKey === 'd'){
            tempPlayer.scene.attackHitBox.x = tempPlayer.x+distance;

            //has the player move forward slightly
            if(!tempPlayer.scene.playerGrabbed){
              tempPlayer.setVelocityX(20);
            }
          }else{
            tempPlayer.scene.attackHitBox.x = tempPlayer.x-distance;

            if(!tempPlayer.scene.playerGrabbed){
              tempPlayer.setVelocityX(-20);
            }
          }
          tempPlayer.scene.attackHitBox.y = tempPlayer.y

          //set a timeout function so the hitbox lingeres for a tenth of a second
          setTimeout(function(){
            
            //after that time is up put the hitbox back to its idle location and reset the hitboxstate variable. 
            tempPlayer.scene.attackHitBox.x = tempPlayer.x;
            tempPlayer.scene.attackHitBox.y = tempPlayer.y+10000;
            tempPlayer.hitboxState = false;

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

      let player = this;
      setTimeout(function () {
          player.soundCoolDown = false;
      }, delay);
    }
  }

  setAttackHitboxSize(width,height){
    this.scene.attackHitBox.setSize(width,height);
  }

}