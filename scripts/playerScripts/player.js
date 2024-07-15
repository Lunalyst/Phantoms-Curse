/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

//player sprite object
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
    
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('malePlayer', { start: 42, end: 46 }),frameRate: 12,repeat: -1});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('malePlayer', { start: 47, end: 51 }),frameRate: 9,repeat: -1});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('malePlayer', { start: 52, end: 56 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('malePlayer', { start: 57, end: 61 }),frameRate: 12,repeat: -1});
    
    }else{
      this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('femalePlayer', { start: 1, end: 8 }),frameRate: 6,repeat: -1});
      this.anims.create({key: 'p',frames: this.anims.generateFrameNames('femalePlayer', { start: 9, end: 16 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'pJumpUp',frames: this.anims.generateFrameNames('femalePlayer', { start: 17, end: 19 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pJumpDown',frames: this.anims.generateFrameNames('femalePlayer', { start: 20, end: 21 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('femalePlayer', { start: 22, end: 41 }),frameRate: 1.5,repeat: -1});
    
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('femalePlayer', { start: 42, end: 46 }),frameRate: 12,repeat: -1});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('femalePlayer', { start: 47, end: 51 }),frameRate: 9,repeat: -1});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('femalePlayer', { start: 52, end: 56 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('femalePlayer', { start: 57, end: 61 }),frameRate: 12,repeat: -1});
    
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
    if(playerDataObject.playerInventoryData[25].itemID === 8){
      //console.log("speed ring equipt");
      this.speedBoost = 1.5;
    }else{
      this.speedBoost = 1;
    }
  }
  
  //move the player left
  if(keyA.isDown && this.body.blocked.down){
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
  } else if(keyD.isDown && this.body.blocked.down){
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
   if(space.isDown){
    let that = this;
    console.log("this.spaceDelay: ",this.spaceDelay);
    if(this.spaceDelay === false){
      this.spaceDelay = true;
      console.log("this.spaceDelay: ",this.spaceDelay);
      setTimeout(function(){
        that.spaceWasPressed = true;
        this.spaceDelay = false;
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
  if (space.isDown && this.body.blocked.down){
    this.idleTimer = 0;
    this.setVelocityY(-350);
    let that = this;
    }

  //if the player is  in the air and moving to the left
  if(keyA.isDown && !this.body.blocked.down){
  //console.log("IN AIR AND MOVING LEFT");
    this.setVelocityX(-250 * this.speedBoost);
    this.animationInAir = true;
    let that = this;


      //if the player has the double jump ability, allow them to jupm agian.
      if(this.spaceWasPressed === true && this.doubleJumpActivation === false && space.isDown && Phaser.Input.Keyboard.JustDown(space) && playerSkillsObject.playerSkills.jump === 1){
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
  }else if(keyD.isDown && !this.body.blocked.down){
      //console.log("IN AIR AND MOVING RIGHT");
      this.setVelocityX(250 * this.speedBoost);
      this.animationInAir = true;
      //if the player has the double jump ability, allow them to jupm agian.
      if(this.spaceWasPressed === true && this.doubleJumpActivation === false && space.isDown && Phaser.Input.Keyboard.JustDown(space) && playerSkillsObject.playerSkills.jump === 1 ){
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
      if(this.spaceWasPressed === true && this.doubleJumpActivation === false && space.isDown && Phaser.Input.Keyboard.JustDown(space) && playerSkillsObject.playerSkills.jump === 1 ){
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
      playerPreviousY = this.y;
  }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles player attack animations.
  attackPlayer(keyShift,scene){
    //temp variable of this object to be used my timeout functions
    let that = this;
    this.setSize(50,210,true);
    //temp object sent to be sent to a emitter
    let playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

    //plays attack animations based on what the player has equipt when the player isa not in the air.
    if(this.body.blocked.down){

      //plays attack for knife right
      if(this.lastKey === 'd' && keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 4){
        this.anims.play("pAttackKnife",true);
        this.flipX = false;
        this.sliceDamage = 4;
        this.weaponSoundEffect('high2', 400);
        this.rightHitBox(300);
      //plays attack for knife left
      }else if(this.lastKey === 'a'&& keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 4){
        this.anims.play("pAttackKnife",true);
        this.flipX = true;
        this.sliceDamage = 4;
        this.weaponSoundEffect('high2', 400);
        this.leftHitBox(300);
      //plays attack for axe right
      }else if(this.lastKey === 'd' && keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 10){
        this.anims.play("pAttackAxe",true);
        this.flipX = false;
        this.sliceDamage = 8;
        this.weaponSoundEffect('heavy', 600);
        this.rightHitBox(300);
      //plays attack for axe left
      }else if(this.lastKey === 'a'&& keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 10){
        this.anims.play("pAttackAxe",true);
        this.flipX = true;
        this.sliceDamage = 8;
        this.weaponSoundEffect('heavy', 600);
        this.leftHitBox(300);
        
      //plays attack for oar right
      }else if(this.lastKey === 'd' && keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 2){
        this.anims.play("pAttackOar",true);
        this.flipX = false;
        this.bluntDamage = 2;
        this.weaponSoundEffect('medium', 700);
        this.rightHitBox(300);
        
      //plays attack for oar left
      }else if(this.lastKey === 'a'&& keyShift.isDown && playerDataObject.playerInventoryData[24].itemID === 2){
        this.anims.play("pAttackOar",true);
        this.flipX = true;
        this.bluntDamage = 2;
        this.weaponSoundEffect('medium', 700);
        this.leftHitBox(300);
      //plays animation for unarmed or non weapon equipt right.
      }else if(this.lastKey === 'd' && keyShift.isDown){
        this.anims.play("pAttackUnarmed",true);
        this.flipX = false;
        this.bluntDamage = 1;
        this.weaponSoundEffect('high1', 400);
        this.rightHitBox(200);
      //plays animation for unarmed or non weapon equipt left.
      }else if(this.lastKey === 'a'&& keyShift.isDown){
        this.anims.play("pAttackUnarmed",true);
        this.flipX = true;
        this.bluntDamage = 1;
        this.weaponSoundEffect('high1', 400);
        this.leftHitBox(200);

      }else if(keyShift.isDown){
        this.setVelocityX(0);
        this.setVelocityY(0);
        //this.anims.play('pIdleIdle',true);
      }else{

        //moves attack hitbox out of the way. probably better way of implementing this
        //setvisible?
        scene.attackHitBox.x = this.x;
        scene.attackHitBox.y = this.y+10000;

        //stops weapon sound effects.
        this.scene.initSoundEffect('weaponSFX','medium',0);
        this.scene.sound.get('weaponSFX').stop();
      }
    }
  
  }

  //handles hitbox position when attacking right
  rightHitBox(delay){
    this.setVelocityX(0);
    if(this.hitboxCoolDown === false){
      //this.scene.attackHitBox.x = this.x;
      this.scene.attackHitBox.y = this.y+10000;
      this.scene.attackHitBox.visible = false;

      let that = this;
      setTimeout(function(){
        that.hitboxCoolDown = true;
        this.scene.attackHitBox.visible = true;
      },delay);
    }else if(this.hitboxCoolDown === true){
      this.scene.attackHitBox.visible = true;
      this.scene.attackHitBox.x = this.x+20;
      this.scene.attackHitBox.y = this.y;
      this.hitboxCoolDown = false; 
    }

  }

  //handles hitbox position when attacking left
  leftHitBox(delay){
    this.setVelocityX(0);
    if(this.hitboxCoolDown === false){
      this.scene.attackHitBox.x = this.x;
      this.scene.attackHitBox.y = this.y+10000;

      let that = this;
      setTimeout(function(){
        that.hitboxCoolDown = true;
      },delay);
    }else if(this.hitboxCoolDown === true){
      this.scene.attackHitBox.x = this.x-20;
      this.scene.attackHitBox.y = this.y;
      this.hitboxCoolDown = false; 
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

}