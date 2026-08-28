/*
//player entity./*
//i have a idea.
//start my making the player a container, which holds various layers of sprites.
//have the base layer which is the player nude.
//may need to have the player be the same height,
//so that when we have a layer above the player, like clothing, and weapon use, that those layer line up
//this is huge as it allows for alt outfits during gameplay, as well as
//less sprites overal
//because weapons could be a third sprite which is overlayed. meaning we dont need to make duplicate frames for every weapon.
//  when making new weapons.
// layer 1 player body. options of far : human, cobrabold.
// layer 2 cloths. default, grey jacket, maidoutfit.
layer 3 weapons: 
slashing animation: knife, hand,
thrusting: rapiers, spears ect
clobering: oar, clubs hammers
rock throw:
bow:

animation keys:
idler side
walk/run

//player keys
0) weapon back this.setDepth(6);
1)player back this.setDepth(7);


*note* to save on if cases, use the vanity itemslot id or name and add that to the name of regular animations.
 that way there is no need for a if statement when deciding animations.


// */

class player extends playerWeaponFunctions{
  // every class needs constructor
  constructor(scene, xPos, yPos,sex){
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos);
    //then we add new instance into the scene. 
    scene.add.existing(this);

    //save sex value in the player object
    this.sex = sex;

    //add the ten layers that make up the sprite
    this.backLeg1 = scene.add.sprite(0, 0, '1-evan-back-leg');
    this.add(this.backLeg1);
    this.backLeg1.setScale(1/3);
    this.backLeg1.visible = false;

    this.backLegCloths2 = scene.add.sprite(0, 0, '2-evan-back-leg-cloths');
    this.add(this.backLegCloths2);
    this.backLegCloths2.setScale(1/3);

    this.backArm3 = scene.add.sprite(0, 0, '3-evan-back-arm');
    this.add(this.backArm3);
    this.backArm3.setScale(1/3);

    this.backArmCloths4 = scene.add.sprite(0, 0, '4-evan-back-arm-cloths');
    this.add(this.backArmCloths4);
    this.backArmCloths4.setScale(1/3);

    //the main player body layer is the layer with physics which has velocity, hitbox and gravity.
    this.mainHitbox = scene.physics.add.sprite(xPos, yPos, 'hitbox');
    //then we call this next line to give it collision
    scene.physics.add.existing(this.mainHitbox);

    if(sex === 0){
      //if the player is male,then when we push the weapon layer back. it belongs at position 3
      this.weaponPositionBack = 3;
      //then when we put it back to its correct position it ends up at layer 9 = 6 + 3
      this.weaponPositionfront = 6;

      this.mainBodySprite5 = scene.add.sprite(0, 0, '5-evan-main-body');
      this.mainBodyCloths6 = scene.add.sprite(0, 0, '6-evan-main-body-cloths');
    }else{

      //if the player is male,then when we push the weapon layer back. it belongs at position 3
      this.weaponPositionBack = 3;
      //then when we put it back to its correct position it ends up at layer position because of the two boob layers. 11 = 8 + 3
      this.weaponPositionfront = 8;

      this.mainBodySprite5 = scene.add.sprite(0, 0, '5-evelyn-main-body');
      this.mainBodyCloths6 = scene.add.sprite(0, 0, '6-evelyn-main-body-cloths');
    }

    this.add(this.mainBodySprite5);
    this.mainBodySprite5.setScale(1/3);
    this.add(this.mainBodyCloths6);
    this.mainBodyCloths6.setScale(1/3);

    this.frontArm7 = scene.add.sprite(0, 0, '7-evan-front-arm');
    this.add(this.frontArm7);
    this.frontArm7.setScale(1/3);

    this.frontArmCloths8 = scene.add.sprite(0, 0, '8-evan-front-arm-cloths');
    this.add(this.frontArmCloths8);
    this.frontArmCloths8.setScale(1/3);

    //if the player is female, add booba layers.
    if(sex === 1){
      this.booba8 = scene.add.sprite(0, 0, '8-1-evelyn-booba');
      this.add(this.booba8);
      this.booba8.setScale(1/3);

      this.boobaCloths8 = scene.add.sprite(0, 0, '8-2-evelyn-booba-cloths');
      this.add(this.boobaCloths8);
      this.boobaCloths8.setScale(1/3);
    }

    this.weaponLayer9 = scene.add.sprite(0, 0, '9-weapon-layer');
    this.add(this.weaponLayer9);
    this.weaponLayer9.setScale(1/3);
    this.weaponLayer9.visible = false;
    

    this.weaponHand10 = scene.add.sprite(0, 0, '10-weapon-hand');
    this.add(this.weaponHand10);
    this.weaponHand10.setScale(1/3);
    this.weaponHand10.visible = false;

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
    this.mainHitbox.body.setGravityY(600); 
    //object is on view layer 6
    this.setDepth(6);
    // hitbox cooldown.
    this.hitboxCoolDown = false;
    this.hitboxState = false;
    this.isAttacking = false;
    this.playedAttackAnimation = false;

    this.attackHitboxState = false;
    this.hitboxX = 0;
    this.hitboxY = 10000;

    //used to tell what damage type the player is dealing with melee weapons.
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.curseDamage = 0;

    //did the player use the doublejump skill?
    this.doubleJumpActivation = false;
    this.spaceDelay = false;
    this.spaceWasPressed = false;
    this.jumped = false;

    this.speed = 250 * this.speedBoost;
    //is used to increase players speed via items or skills.
    this.speedBoost = 1;

    this.dropChance = 1;
    this.dropAmount = 1;

    //sound effect cooldown
    this.soundCoolDown = false;

    //gives player a refrence to the scene.
    this.scene = scene;

    this.lanturnFlicker = null;

    this.swimming = false;

    this.swimmingSurface = false;
    if(scene.lightingSystemActive === true){ 

      this.lightSource = scene.lights.addLight(this.x, this.y, 0,0x000000, 1);
      this.lightSource.setColor(0xfffff0);

      this.lanturnFlicker = null;
      this.fuelActivated = false;

      this.curseLight = this.scene.lights.addLight(this.x,this.y-20, 60, 0xb317ff);
      this.curseLight.intensity = 1.1;
      this.curseLight.visible = false;

    }

    this.curseReductiontimer = false;
    /*
      playeridle: frames: 6 layer: 8 7 6 5 4 3
      playerWalk: frames: 15 layer: 1 2 3 4 5 6 7 8
      playerJumpUp frames: 10 layer: 5 6 7 8
      playerJumpDown frames: 10 layer: 5 6 7 8
      playerSleep frames: 1.5 layers: 5 6 7 8
      playerUnarmed frames: layers: 1 2 3 4 5 6 7 8 9

    */

    this.clothed = false;
    this.ringType = 0;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.attackType = "light";

    this.curseBuildUpCooldown = false;

    this.setupRingPassivesMap();
    this.setupWeaponPassivesMap();

    this.fallThroughLayer0 = false;

    //set up object of functions for item logic 
    this.setupPlayerAnimations(sex);
    
    if(sex === 1){
      //shift some layers down by two pixels to align with the female sprite.
      this.backArm3.y = 2;
      this.backArmCloths4.y = 2;
      this.frontArm7.y = 2;
      this.frontArmCloths8.y = 2;
      this.weaponLayer9.y = 2;
      this.weaponHand10.y = 2;
    }
   

  }
    
  //built in move player function to handle how the player moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
  movePlayer(keyA,keyD,space,playerPreviousY,scene){
    

    this.speed = 250 * this.speedBoost;

    this.x = this.mainHitbox.x;
    this.y = this.mainHitbox.y;

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    
    //console.log("this.animationPlayedGoingUp:", this.animationPlayedGoingUp," this.animationPlayedGoingDown: ", this.animationPlayedGoingDown," this.animationInAir: ", this.animationInAir);
  //console.log("in player move, this.scene.checkWPressed(): ",this.scene.checkWPressed());
  //create a temp object to be sent to the emitter
  let playerSkillsObject = {
    playerSkills: null
  };

  //calls emitter to check if the player has skills that apply to movement
  playerSkillsEmitter.emit(playerSkills.getJump,playerSkillsObject);

  this.playerDataObject = {
    playerInventoryData: null
  };
  // call to emitter to get player inventory data.
  //console.log("ACTIVATING GET INVENTORY EMITTER FROM PLAYER MOVEMENT FUNCTION");
  inventoryKeyEmitter.emit(inventoryKey.getInventory,this.playerDataObject);

  //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
  let playerHealthObject = {
    playerHealth: null
};

//gets the hp value using a emitter
healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

  //console.log("playerDataObject.playerInventoryData", playerDataObject.playerInventoryData);
  //if the player has speed ring equipt change speed multiplier.
  if(this.playerDataObject.playerInventoryData !== null){

    //call map of ring functions based on equipt ring id.
    //console.log("activating ring map: ","F"+ this.playerDataObject.playerInventoryData[1].itemID);
    this.weaponPassivesMap[this.playerDataObject.playerInventoryData[0].itemID]();
    this.ringPassivesMap[this.playerDataObject.playerInventoryData[1].itemID]();
    

    //use a object of functions to do logic based on item id to do stuff. based on improvements from gameover 
    //if the player is clothed.
    if(this.playerDataObject.playerInventoryData[3].itemID === 20){
      this.clothed = true;
    }else{
      this.clothed = false;
    }

    //if the cursed energyi snt zero
    if(playerHealthObject.playerCurse > 0 && this.curseReductiontimer === false){

      //reduce it by one every two seconds.
      this.curseReductiontimer = true;
      let tempPlayer = this;
      setTimeout(function () {
        tempPlayer.curseReductiontimer = false;
        if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
          healthEmitter.emit(healthEvent.reduceCurse,1);
        }  
      }, 2000);
      
    }
  
  }


  if(this.swimming === true && this.isAttacking === false){
    this.mainHitbox.body.setGravityY(0); 
    if(this.scene.checkAIsDown() ){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
      this.lastKey = "a";
      this.idleTimer = 0;
      this.mainHitbox.setVelocityX(-(this.speed/2)); 
      this.flipXcontainer(true);
    
    //moves the player right
    } else if(this.scene.checkDIsDown() ){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
      this.lastKey = "d";
      this.idleTimer = 0;
      this.mainHitbox.setVelocityX(this.speed/2);
      this.flipXcontainer(false);
    
    }else if(this.scene.checkWIsDown()){
       this.mainHitbox.setVelocityY(-(this.speed/2));
    }else if(this.scene.checkSIsDown()){
       this.mainHitbox.setVelocityY(this.speed/2);
    }else{
      this.mainHitbox.setVelocityY(0);
      this.mainHitbox.setVelocityX(0);
    }

  }else if(this.swimmingSurface === true && this.isAttacking === false){
    this.mainHitbox.body.setGravityY(0); 
     if(this.scene.checkAIsDown() ){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
      this.lastKey = "a";
      this.idleTimer = 0;
      this.mainHitbox.setVelocityX(-(this.speed/2)); 
      this.flipXcontainer(true);
    
    //moves the player right
    } else if(this.scene.checkDIsDown() ){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
      this.lastKey = "d";
      this.idleTimer = 0;
      this.mainHitbox.setVelocityX(this.speed/2);
      this.flipXcontainer(false);
    
    }else if(this.scene.checkWIsDown()){
       this.mainHitbox.setVelocityY(-(this.speed/2));
    }else if(this.scene.checkSIsDown()){
       this.mainHitbox.setVelocityY(this.speed/2);
    }else{
      this.mainHitbox.setVelocityY(0);
      this.mainHitbox.setVelocityX(0);
    }
  }else if(this.isAttacking === false){
    //move the player left
    this.mainHitbox.body.setGravityY(600); 

    //if s is pressed fall through the platform by destoying the collision of player 0.
    if(this.scene.checkSIsDown() && this.mainHitbox.body.blocked.down && this.fallThroughLayer0 === false){
    this.scene.playerLayer0Collider.destroy();
    this.fallThroughLayer0 = true;

    let temp = this;
    setTimeout(function(){
      temp.scene.playerLayer0Collider = temp.scene.physics.add.collider(temp.mainHitbox,temp.scene.processMap.layer0);
      temp.fallThroughLayer0 = false;
    },300);

    //moves the player right
    }else if(this.scene.checkAIsDown() && this.mainHitbox.body.blocked.down){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.lastKey = "a";
        this.idleTimer = 0;
        this.mainHitbox.setVelocityX(-this.speed);
        if(this.mainHitbox.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(true);
          //console.log("moving left");
        }

    //moves the player right
    } else if(this.scene.checkDIsDown() && this.mainHitbox.body.blocked.down){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.lastKey = "d";
        this.idleTimer = 0;
        this.mainHitbox.setVelocityX(this.speed);
        if(this.mainHitbox.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(false);
          //console.log("moving Right");
        }

    //if the player doesnt move for long enough, play idle animation
    }else if(this.idleTimer === 2000){
        this.mainHitbox.setVelocityX(0);
        this.playersleepAnimation();

    //otherwise we play idle animation
    }else{
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.mainHitbox.setVelocityX(0);

        if(this.animationInAir === false){
          if(this.lastKey === "d"){
            this.playerIdleAnimation();
            this.flipXcontainer(false);
          }else if(this.lastKey === "a"){
            this.playerIdleAnimation();
            this.flipXcontainer(true);
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

    //if the player is down, then reset variables.   
    if(this.mainHitbox.body.blocked.down){
      this.animationPlayedGoingUp = false;
      this.animationPlayedGoingDown = false;
      this.animationInAir = false;
      this.doubleJumpActivation = false;
      this.spaceWasPressed = false;
      this.spaceDelay = false;
    }
      
    //if space is pressed and the player is on the ground then jump
    //special note, always have the checkpressed at the end if the if statement. programming trick
    //first check if the player is down.
    if (this.mainHitbox.body.blocked.down){
      //console.log("player is down.")
      // then we have to check if jump was pressed once. we have to structure it this way so that the jump doesnt get locked out.
      if(this.scene.checkJMPPressed()){

        //console.log("first jump")
        this.idleTimer = 0;
        this.mainHitbox.setVelocityY(-350);
        let that = this;

      }
      
    }

    //if the player is  in the air and moving to the left
    if(this.scene.checkAIsDown() && !this.mainHitbox.body.blocked.down){
    //console.log("IN AIR AND MOVING LEFT");
      this.mainHitbox.setVelocityX(-this.speed);
      this.animationInAir = true;
      this.flipXcontainer(true);
      let that = this;


        //console.log("this.spaceWasPressed: ",this.spaceWasPressed," this.doubleJumpActivation: ",this.doubleJumpActivation," playerSkillsObject.playerSkills.jump: ",playerSkillsObject.playerSkills.jump);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed()  && playerSkillsObject.playerSkills.jump === 1){
          //console.log("activating double jump while aKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
          
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.playerJumpUpAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping while keyA is down and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          
        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping while keyA is down and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
      //checks to see if player is moving right and not touching the ground.

    //if the player is  in the air and moving to the right
    }else if(this.scene.checkDIsDown() && !this.mainHitbox.body.blocked.down){
        //console.log("IN AIR AND MOVING RIGHT");
        this.mainHitbox.setVelocityX(this.speed);
        this.animationInAir = true;
        this.flipXcontainer(false);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump while dKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.playerJumpUpAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);

        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){

          this.playerJumpDownAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        
        }

    //if the player is in the air.
    }else if(!this.mainHitbox.body.blocked.down){
        this.idleTimer = 0;
        this.animationInAir = true;
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false  && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.lastKey === "d"&& this.animationPlayedGoingUp === false){
          this.playerJumpUpAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "d"&&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY > this.y && this.lastKey === "a"&& this.animationPlayedGoingUp === false){
          this.playerJumpUpAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "a"&&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
        //console.log("in the air");
        }
        //console.log("previous player y"+ playerPreviousY);
  }

      playerPreviousY = this.y;

      //ensures that no mater what player is facing the correct way.
      if(this.scene.checkDIsDown()){
        this.lastKey = "d";
      }else if(this.scene.checkAIsDown()){
        this.lastKey = "a";
      }

      //console.log("from move player this.lastKey: ",this.lastKey);
  }

  setPlayerOnLoadNPCDialogue(){
    this.mainHitbox.setSize(10,60,true);
    this.mainHitbox.setOffset(12, -4 );

    this.x = this.mainHitbox.x;
    this.y = this.mainHitbox.y; 

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

     this.playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,this.playerDataObject);

    if(this.playerDataObject.playerInventoryData[3].itemID === 20){
      this.clothed = true;
    }else{
      this.clothed = false;
    }

    this.playerIdleAnimation();
  }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles player attack animations.
  attackPlayer(){
    //console.log("activating attack function");
    //temp variable of this object to be used my timeout functions
    let that = this;
    //this.mainHitbox.setSize(10,60,true);
    //this.mainHitbox.setOffset(12, -4 );

    this.x = this.mainHitbox.x;
    this.y = this.mainHitbox.y;

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    //temp object sent to be sent to a emitter
    this.playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,this.playerDataObject);

      
      //plays attack animations based on what the player has equipt when the player is not in the air,player now locked into the animation until it completes
      if(this.mainHitbox.body.blocked.down && this.isAttacking === true){

        //console.log("attacking activated.")

        //depending on the key, decide which switch to enter for correctly oriented hitbox 
        if(this.lastKey === 'd'){
          this.flipXcontainer(false);
        }else if(this.lastKey === 'a'){
          this.flipXcontainer(true);
        }

        //wakes up player if they are sleeping.
        this.idleTimer = 0;

          //case to determine attack animation
          if(this.attackType === "light"){
            this.lightAttackSwitch();
          }else if(this.attackType === "heal"){
            this.consumableSwitch();
          }
          
      }else{
        console.log("attack else case")
        //important fall though caseto reset variables if the player is not swinging
        //this.scene.attackHitBox.x = this.x;
        //this.scene.attackHitBox.y = this.y+10000;

        //important reset of the hitbox state incase the player isnt swinging set this to false.
        this.hitboxState = false;

        //resets variable so player only swings once per press of shift
        this.isAttacking = false;

        //stops weapon sound effects.
        this.scene.initSoundEffect('weaponSFX','medium',0);
        this.scene.sound.get('weaponSFX').stop();
      }
    
      
    
  
  }

  resetAttack(){
    //console.log("reseting attack animation values.")
    this.moveUpXTimes(this.weaponPositionfront);

    this.isAttacking = false;
    this.playedAttackAnimation = false;
    this.attackHitboxState = false;

    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.curseDamage = 0;


  }

  fixAnimationVariable(){
    if(this.playedAttackAnimation === false){     
                 
      this.playedAttackAnimation = true;
      console.log("detecting wrong boolean state!", this.playedAttackAnimation);

    }
  }

  shiftPlayerForward(){

    if(this.attackHitboxState === true){
      if(this.lastKey === 'd'){

        if(!this.scene.playerGrabbed){
          this.mainHitbox.setVelocityX(10);
        }

      }else{

        if(!this.scene.playerGrabbed){
          this.mainHitbox.setVelocityX(-10);
        }
      }

    }else{
      //stop the players velocity
      this.mainHitbox.setVelocityX(0);
    }

      this.x = this.mainHitbox.x;
      this.y = this.mainHitbox.y;

      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
  }


  attackHitboxActive(){

    //stop the PCMilos velocity

    //console.log("this.attackHitboxState: ",this.attackHitboxState);
    if(this.attackHitboxState === false){
      //after that time is up put the hitbox back to its idle location and reset the attackHitboxstate variable. 
      this.scene.attackHitBox.x = this.x;
      this.scene.attackHitBox.y = this.y+10000;
     
    }else if(this.attackHitboxState === true){

      //put hitbox infront of the PCMilo in the way there facing
      if(this.lastKey === 'd'){
        this.scene.attackHitBox.x = this.x+this.hitboxX;
        //has the player move forward slightly
        /*if(!this.scene.playerGrabbed){
          this.mainHitbox.setVelocityX(20);
        }*/

      }else{
        this.scene.attackHitBox.x = this.x-this.hitboxX;
       /*if(!this.scene.playerGrabbed){
          this.mainHitbox.setVelocityX(-20);
        }*/

      }

      this.scene.attackHitBox.y = this.y+this.hitboxY;
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

  overlapCurseBuildUp(){

    if(this.curseBuildUpCooldown === false &&  this.scene.playerStuckGrab === false){

      this.curseBuildUpCooldown = true;

      healthEmitter.emit(healthEvent.curseBuildUp,2);

      let tempPlayer = this;

      setTimeout(function(){
              
        tempPlayer.curseBuildUpCooldown = false;
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


