//basic npc class of wolf.
class wolf extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'deaugh');

      //then we add new instance into the scene. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

      this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('deaugh', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'sideIdle', frames: this.anims.generateFrameNames('deaugh', { start: 4, end: 7 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'sideHeal', frames: this.anims.generateFrameNames('deaugh', { start: 8, end: 11 }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: 'finishHeal', frames: this.anims.generateFrameNames('deaugh', { start: 12, end: 14 }), frameRate: 4, repeat: 0 });
      this.anims.create({ key: 'sideWalk', frames: this.anims.generateFrameNames('deaugh', { start: 15, end: 24 }), frameRate: 9, repeat: -1 });
      this.anims.create({ key: 'fastSideWalk', frames: this.anims.generateFrameNames('deaugh', { start: 15, end: 24 }), frameRate: 18, repeat: -1 });
      
      this.anims.create({ key: 'nudeIdle', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'nudeSideIdle', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 4, end: 7 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'nudeSideWalk', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 8, end: 17 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'sitDown', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 18, end: 19 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'sittingDown', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 20, end: 23 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLap', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 24, end: 27 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapIdle', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 28, end: 31 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapIdleHoldingBack', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 32, end: 35 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapPoppinIt', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 36, end: 39 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapIdleErrect', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 40, end: 43 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapIdleErrectExcited', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 44, end: 47 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapGrabPenor', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 48, end: 51 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapJorkinIt1', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 52, end: 55 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapJorkinItTrans', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 56, end: 59 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapJorkinIt2', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 60, end: 63 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapJorkinIt3', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 64, end: 67 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapJorkinIt4', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 68, end: 71 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapJorkinItFinished1', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 72, end: 76 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapJorkinItFinished2', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 77, end: 83 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapFinishedIdle', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 84, end: 87 }), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'lunaSitOnLapFinishedHugStart', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 88, end: 91 }), frameRate: 6, repeat: 0 });
      this.anims.create({ key: 'lunaSitOnLapFinishedHug', frames: this.anims.generateFrameNames('deaughAndLuna', { start: 92, end: 95 }), frameRate: 6, repeat: -1 });

      //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
       this.npcKeyPrompts.visible = false;
       this.promptCooldown = false;
 
       //more variables which help the sign object tell when to display prompts and textbox
       this.playerOverlapingNpc = false;
       this.safeToSpeak = false;
       this.npcId = 0;
       this.activated = false;
       this.npcType = npcType;

       this.flag = "";
       this.dialogueCompleted = false;
       this.completedText = false;

       this.animationPlayed = false;
       this.scene = scene;

       this.inDialogue = false;

       this.formattingText = false;

       this.isPlayerControlled = false;

       this.playerInPosition = false;

       //this.body.setGravityY(600); 

        this.setSize(60,200,true);
        this.setOffset(185, 91);
 
       if(this.npcType === 'miloSavedThePlayer'){

        //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
        let playerHealthObject = {
          playerHealth: null
        };

        //gets the hp value using a emitter
        healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

        //take the difference of the current max hp and the player current health, then subtract by one to get the damage that would drop the user hp to 1.
        let dropToOne = playerHealthObject.playerHealth - 1;
        console.log("dropToOne: ",dropToOne);
        healthEmitter.emit(healthEvent.loseHealth,dropToOne);

        this.anims.play('sideHeal');
        this.restoreHp();
        this.scene.initSoundEffect('healSFX','heal',0.1);
        this.flipX = true;

        //this.scene.player1.visible = false;

        this.playerOnStrecher = this.scene.add.sprite(752, 760+3, "playerOnStrecher");
        this.playerOnStrecher.anims.create({ key: 'idleHeal', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'healFade', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 0, end: 5 }), frameRate: 4, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'idle', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 5, end: 5 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'eyeOpen', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 5, end: 7 }), frameRate: 7, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'idleEyeOpen', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 7, end: 7 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'gettingUp', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 8, end: 11 }), frameRate: 7, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'upIdleForward', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 11, end: 14 }), frameRate: 5, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'upIdleBackward', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 15, end: 18 }), frameRate: 5, repeat: -1 });
        this.playerOnStrecher.anims.play("idleHeal", true);
        this.playerOnStrecher.flipX = true;
        this.playerOnStrecher.setScale(1/3);

        //this.customTrigger = true;
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 2000;
        this.npcTriggerRangeY = 2000;

        this.moveWolf = false;

        this.scene.mycamera.startFollow(this.playerOnStrecher);
        this.scene.cameras.main.zoom = 2;
        this.scene.cameras.main.followOffset.set(0,70);

       }else if(this.npcType === 'riddleAnswered'){

        this.flipX = true;

        //this.scene.player1.visible = false;

        this.playerOnStrecher = this.scene.add.sprite(752, 760+3, "playerOnStrecher");
        this.playerOnStrecher.anims.create({ key: 'idleHeal', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'healFade', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 0, end: 5 }), frameRate: 4, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'idle', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 5, end: 5 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'eyeOpen', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 5, end: 7 }), frameRate: 7, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'idleEyeOpen', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 7, end: 7 }), frameRate: 7, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'gettingUp', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 8, end: 11 }), frameRate: 7, repeat: 0 });
        this.playerOnStrecher.anims.create({ key: 'upIdleForward', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 11, end: 14 }), frameRate: 5, repeat: -1 });
        this.playerOnStrecher.anims.create({ key: 'upIdleBackward', frames: this.scene.anims.generateFrameNames('playerOnStrecher', { start: 15, end: 18 }), frameRate: 5, repeat: -1 });
        this.playerOnStrecher.flipX = true;
        this.playerOnStrecher.setScale(1/3);

        //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
        let playerHealthObject = {
          playerHealth: null
        };

        //gets the hp value using a emitter
        healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

        console.log("playerHealthObject: ",playerHealthObject);

        if(playerHealthObject.playerHealth !== playerHealthObject.playerMaxHealth){
          console.log("player hp not at max.")
          this.playerOnStrecher.anims.play("idleHeal", true);
          this.restoreHp();
          this.anims.play('sideHeal');
          this.scene.initSoundEffect('healSFX','heal',0.1);
          
        }else{
          console.log("player is max.")
          this.playerOnStrecher.anims.play("upIdleForward", true);
          this.anims.play('sideIdle');
          
        }

        //this.customTrigger = true;
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 2000;
        this.npcTriggerRangeY = 2000;

        this.scene.mycamera.startFollow(this.playerOnStrecher);
        this.scene.cameras.main.zoom = 2;
        this.scene.cameras.main.followOffset.set(0,70);


       }else if(this.npcType === 'labEncounter1'){
        this.advancedIdleAnimation = true;
       }else if(this.npcType === 'storageRoomDoor'){
        this.visible = false;
       }else if (this.npcType === 'wolfxLuna'){

        this.ignoreTriggerRange = true;
        this.anims.play('nudeSideIdle');
        this.moveWolf = false;

        this.npcTriggerRange = true;

        this.scene.mycamera.startFollow(this);
        this.scene.cameras.main.zoom = 2;
        this.scene.cameras.main.followOffset.set(0,70);
       }

  }

  //overwrites base npc classes function with flagging logic specific to wolf.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'miloSavedThePlayer'){
      this.miloSavedThePlayer();
    }else if(this.npcType === 'riddleAnswered'){
      this.riddleAnswered();
    }else if(this.npcType === 'labEncounter1'){
      this.labEncounter1();
    }else if(this.npcType === 'storageRoomDoor'){
      this.storageRoomDoor();
    }else if(this.npcType === 'wolfxLuna'){
      this.wolfxLuna();
    }else{
      
      this.default();
    }
  }

  activateNpc(){

    //if the player meets activation requiements for the sign display the text box
    if(this.safeToSpeak === true && this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.scene.player1.mainHitbox.body.blocked.down){

      //console.log("this.currentDictNode: ",this.currentDictNode);

      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();
          
      //otherwise we want to display the key prompts 
    }else if(this.safeToSpeak === true && this.scene.activatedNpcId === this.npcId && this.promptCooldown === false ){

      this.npcKeyPrompts.visible = true;
      this.npcKeyPrompts.playWKey();
      this.promptCooldown = true;        
  
    }
        
    // resets variables.
    if(this.safeToSpeak === false){
      this.npcKeyPrompts.visible = false;
      this.promptCooldown = false;

    }

    if(this.advancedIdleAnimation === true){
      if(this.npcType === "labEncounter1"){
        if(this.scene.player1.x < this.x - 39){
          this.anims.play('sideIdle',true);
          this.flipX = true;
        }else if(this.scene.player1.x > this.x + 39){
          this.anims.play('sideIdle',true);
          this.flipX = false;
        }else{
          this.anims.play('idle',true);
        }
      }
    }


  }


  restoreHp(){

    //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
    let playerHealthObject = {
      playerHealth: null
    };

    //gets the hp value using a emitter
    healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

    console.log("playerHealthObject: ",playerHealthObject);

    // need to build up player curse
    healthEmitter.emit(healthEvent.curseBuildUp,playerHealthObject.playerCurseMax);

    this.recurseRestoreHp(playerHealthObject);
    // then use recursion to 
    // 1 decrease player curse
    // increase player hp

  }

  recurseRestoreHp(playerHealthObject){

    if(playerHealthObject.playerHealth === playerHealthObject.playerMaxHealth){
      console.log("player fully heal by wolf.")

    }else{

      //reduce curse and increase hp
      healthEmitter.emit(healthEvent.reduceCurse,1);
      healthEmitter.emit(healthEvent.gainHealth,1);
      
      //call emiter to update object holding hp and curse values
      //gets the hp value using a emitter
      healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

      let temp = this;
      setTimeout(function () {
        temp.recurseRestoreHp(playerHealthObject);
      }, 500);
    }

  }

  MoveNPC(){
    console.log("activating move function")
    if(this.npcType === 'miloSavedThePlayer' || this.npcType === 'riddleAnswered'){
      this.MoveNPCMiloSavedThePlayer();
    }else if(this.npcType === 'labEncounter1'){
      this.MoveLabEncounter1();
    }else if(this.npcType === 'wolfxLuna'){
      this.MoveWolfxLuna();
    }
  }

  MoveNPCMiloSavedThePlayer(){
    //console.log("this.moveWolf: ",this.moveWolf);
    if(this.moveWolf === false){
      if(this.x > 425){

        this.setVelocityX(-80);
        this.anims.play('sideWalk',true);

        this.setDepth(10);
      }else{

        this.visible = false;
        this.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;
        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("nodefinish2");
        this.playerOnStrecher.anims.play('upIdleBackward', true);
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;
        this.moveWolf = true;

      }
    }else if(this.moveMilo === false){
       if(this.scene.Milo.x > 425){

        this.scene.Milo.setVelocityX(-80);
        this.scene.Milo.anims.play('walk',true);
        this.scene.Milo.setDepth(9);
        this.scene.Milo.flipX = true;
      }else{

        this.scene.Milo.visible = false;
        this.scene.Milo.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;

        this.scene.sceneTextBox.textInterupt = false;
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;

      }
    }
  }

  MoveLabEncounter1(){
    console.log("activating lab walking function")
     if(this.moveLunaToPosition1 === false){
      
       if(this.scene.lunalyst.x > 560 && this.playerIsOnRight === true){
        this.scene.lunalyst.y = 763;
        this.scene.lunalyst.visible = true;
        this.scene.lunalyst.setVelocityX(-120);
        this.scene.lunalyst.anims.play('lunalystSkimpyBoxSideWalk',true);
        this.scene.lunalyst.setDepth(9);
        this.scene.lunalyst.flipX = true;
        this.npcKeyPrompts.visible = false;
      }else if(this.scene.lunalyst.x > 520 && this.playerIsOnLeft === true){
        this.scene.lunalyst.y = 763;
        this.scene.lunalyst.visible = true;
        this.scene.lunalyst.setVelocityX(-120);
        this.scene.lunalyst.anims.play('lunalystSkimpyBoxSideWalk',true);
        this.scene.lunalyst.setDepth(9);
        this.scene.lunalyst.flipX = true;
        this.npcKeyPrompts.visible = false;
      }else{

        this.npcKeyPrompts.visible = true;
        this.scene.lunalyst.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;

        this.moveLunaToPosition1 = true;

        this.scene.lunalyst.anims.play('lunalystSkimpyBoxSideIdle',true);

        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("node3");
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;

        //have the player face the correct way

        if(this.scene.player1.x > this.x){
          this.scene.player1.flipXcontainer(false);
        }

      }
    }else if(this.moveLunaToPosition2 === false){

      if(this.scene.lunalyst.x < 863){
        this.scene.lunalyst.setVelocityX(120);
        this.scene.lunalyst.anims.play('lunalystSkimpyBoxSideWalk',true);
        this.scene.lunalyst.setDepth(9);
        this.scene.lunalyst.flipX = false;
        this.npcKeyPrompts.visible = false;
      }else{
        this.npcKeyPrompts.visible = true;
        this.scene.lunalyst.visible = false;
        this.scene.lunalyst.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;

        this.moveLunaToPosition2 = true;

        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("node14");
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;

        if(this.scene.player1.x > this.x){
          this.scene.player1.flipXcontainer(true);
        }else{
          this.flipX = true;
        }

      }
    }else if(this.moveWolfOut === false){

      if(this.x < 821){

        this.ignoreTriggerRange = true;
        this.setVelocityX(160);
        this.anims.play('fastSideWalk',true);
        this.npcKeyPrompts.visible = false;

        this.flipX = false;

        this.setDepth(10);
      }else{

        this.npcKeyPrompts.visible = true;
        this.visible = false;
        this.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;
        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("");
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;
        this.visible = false;
        this.triggerNpcFinished = true;
        this.moveWolfOut = true;
        console.log("this.currentDictNode",this.currentDictNode)

        this.forceDialogueEnd();

        //spawn wolfs cloths on the ground.
        this.headBand = this.scene.add.sprite(1050,760+37, "wolfProps");
        this.headBand.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.headBand.anims.play("idle", true);
        this.headBand.setScale(1/3);
        this.headBand.setDepth(1);

        this.LabCoat = this.scene.add.sprite(985,760+37, "wolfProps");
        this.LabCoat.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 1, end: 1 }), frameRate: 7, repeat: -1 });
        this.LabCoat.anims.play("idle", true);
        this.LabCoat.setScale(1/3);
        this.LabCoat.setDepth(1);

        this.pants = this.scene.add.sprite(940,760+37, "wolfProps");
        this.pants.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 2, end: 2 }), frameRate: 7, repeat: -1 });
        this.pants.anims.play("idle", true);
        this.pants.setScale(1/3);
        this.pants.setDepth(1);



      }

       if(this.scene.player1.x < this.x){
        
        this.scene.player1.flipXcontainer(false);

        }
    }
  }

  miloSavedThePlayer(){

    //if(this.isPlayerControlled === false){
    this.nodeHandler("wolf","Behavior1","nectarFinish");
      //this.scene.player1.mainHitbox.x = this.x;
    //}

    

    if(this.currentDictNode !== null){

      //hault on first node
      if(this.currentDictNode.nodeName === "node1" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        //now that player is safely in npc dialogue set grabbed variable to false.
        this.scene.grabbed = false;

        let temp = this;
        setTimeout(function () {
          temp.anims.play('finishHeal', true).once('animationcomplete', () => {
            temp.anims.play('sideIdle', true);
          });

          temp.playerOnStrecher.anims.play('healFade').once('animationcomplete', () => {

            temp.playerOnStrecher.anims.play('idle', true);
            temp.scene.sceneTextBox.textInterupt = false;
      
            if(temp.scene.playerSex === 0){
              temp.progressNode("nodeEatenByNectar1Male");
            }else{
              temp.progressNode("nodeEatenByNectar1Female");
            }
            temp.scene.sceneTextBox.textInterupt = true;

            setTimeout(function () {
              temp.playerOnStrecher.anims.play('eyeOpen').once('animationcomplete', () => {
                temp.playerOnStrecher.anims.play('idleEyeOpen', true);
                temp.scene.sceneTextBox.textInterupt = false;
                temp.progressNode("nodeEatenByNectar2");
                temp.inDialogue = false;

              });
            }, 2000);


          }, 2000);

          

        });

      }else if(this.currentDictNode.nodeName === "nodeEatenByNectar3" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;
        this.playerOnStrecher.anims.play('gettingUp').once('animationcomplete', () => {
          this.playerOnStrecher.anims.play('upIdleForward', true);
          this.inDialogue = false;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;
        });

      }else if(this.currentDictNode.nodeName === "nodeEatenByNectar6"){

        this.playerOnStrecher.anims.play('upIdleBackward', true);
       
      }else if(this.currentDictNode.nodeName === "nodeConverge" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.playerOnStrecher.anims.play('upIdleForward', true);
        
        //create dialogue buttons for player choice
        this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"why do you all look like animals?",true);
        this.scene.npcChoice1.textWob();
        this.scene.npcChoice1.setScrollFactor(0);
        this.scene.npcChoice1.addHitbox();
        this.scene.npcChoice1.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice1.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice1.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice1.on('pointerout',function(pointer){
          this.scene.npcChoice1.clearTextTint();
        },this);

        this.scene.npcChoice1.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeAnimals1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        //create dialogue buttons for player choice
        this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+35,'charBubble',"What with the storm surrounding the island? ",true);
        this.scene.npcChoice2.textWob();
        this.scene.npcChoice2.setScrollFactor(0);
        this.scene.npcChoice2.addHitbox();
        this.scene.npcChoice2.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice2.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice2.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice2.on('pointerout',function(pointer){
          this.scene.npcChoice2.clearTextTint();
        },this);

        this.scene.npcChoice2.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeStorm1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        //create dialogue buttons for player choice
        this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+70,'charBubble',"What is this place? ",true);
        this.scene.npcChoice3.textWob();
        this.scene.npcChoice3.setScrollFactor(0);
        this.scene.npcChoice3.addHitbox();
        this.scene.npcChoice3.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice3.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice3.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice3.on('pointerout',function(pointer){
          this.scene.npcChoice3.clearTextTint();
        },this);

        this.scene.npcChoice3.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeLockwood1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        this.scene.npcChoice4 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+105,'charBubble',"I don\'t really have any questions. ",true);
        this.scene.npcChoice4.textWob();
        this.scene.npcChoice4.setScrollFactor(0);
        this.scene.npcChoice4.addHitbox();
        this.scene.npcChoice4.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice4.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice4.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice4.on('pointerout',function(pointer){
          this.scene.npcChoice4.clearTextTint();
        },this);

        this.scene.npcChoice4.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeSkip1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

        },this);
      }else if(this.currentDictNode.nodeName === "nodefinish1" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.moveFunctionActive = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;

      }else if(this.currentDictNode.nodeName === "nodefinish6" && this.inDialogue === false){
        
        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.moveFunctionActive = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;

        this.moveMilo = false;

        let temp = this;
            setTimeout(function () {
              //creates a object to hold data for scene transition
              let playerDataObject = {
                saveX: null,
                saveY: null,
                playerHpValue: null,
                playerSex: null,
                playerLocation: null,
                inventoryArray: null,
                playerBestiaryData: null,
                playerSkillsData: null,
                playerSaveSlotData: null,
                flagValues: null,
                settings:null,
                dreamReturnLocation:null,
                playerCurseValue:null
              };
              
              temp.scene.cutSceneActive = false;
              //console.log(playerDataObject)

              //grabs the latests data values from the gamehud. also sets hp back to max hp.
              inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
          
              //then we set the correct location values to the scene transition data.
              playerDataObject.saveX = 752+30;
              playerDataObject.saveY = 760;
              playerDataObject.playerSex = temp.scene.playerSex;
              playerDataObject.playerLocation = "ClinicRoom";
              //this.scene.destination = "ClinicRoom";

              // then we save the scene transition data.
              temp.scene.saveGame(playerDataObject);

              //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
                let playerHealthObject = {
                    playerHealth: null
                };

              //kills gameplay emitters so they dont pile up between scenes
              temp.scene.clearGameplayEmmitters();

              //stops player momentum in update loop.
              temp.scene.playerWarping = true;

              //for loop looks through all the looping music playing within a given scene and stops the music.
              for(let counter = 0; counter < temp.scene.sound.sounds.length; counter++){
                temp.scene.sound.get(temp.scene.sound.sounds[counter].key).stop();
              }

              temp.scene.player1.visible = false;
              //warps player to the next scene
              temp.scene.destination = "ClinicRoom";
              temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                  //time out function which leads to deaugh cutscene here.
          },4000);
      }
      
      
    }
  }

  MoveWolfxLuna(){
    if(this.moveWolfToPosition === false){

        if(this.x < 780){

        this.ignoreTriggerRange = true;
        this.setVelocityX(80);
        this.anims.play('nudeSideWalk',true);
        this.flipX = false;

        this.setDepth(10);
      }else{

        this.setVelocityX(0);
        this.moveFunctionActive = false;
        this.inDialogue = false;
        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("node3");
        this.scene.CutscenePhysics = false;
        this.scene.cutSceneActive = false;
        this.moveWolfToPosition = false;
        this.anims.play('nudeSideIdle',true);

        console.log("this.currentDictNode",this.currentDictNode);

      }
    }
  }

  riddleAnswered(){

    //if(this.isPlayerControlled === false){
    this.nodeHandler("wolf","Behavior1","nectarFinish");
      //this.scene.player1.mainHitbox.x = this.x;
    //}

    

    if(this.currentDictNode !== null){

      //hault on first node
      if(this.currentDictNode.nodeName === "node1" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        //now that player is safely in npc dialogue set grabbed variable to false.
        this.scene.grabbed = false;

        console.log("starting dialogue?")

        //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
        let playerHealthObject = {
          playerHealth: null
        };

        //gets the hp value using a emitter
        healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

        console.log("playerHealthObject: ",playerHealthObject);

         let temp = this;

        if(playerHealthObject.playerHealth !== playerHealthObject.playerMaxHealth){

          console.log("player hp not at max.")

          setTimeout(function () {
          temp.anims.play('finishHeal', true).once('animationcomplete', () => {
            temp.anims.play('sideIdle', true);
          });

          temp.playerOnStrecher.anims.play('healFade').once('animationcomplete', () => {

            temp.playerOnStrecher.anims.play('idle', true);
            temp.scene.sceneTextBox.textInterupt = false;
      
            temp.progressNode("nodeRiddleAnsweredHurt1");
            
            temp.scene.sceneTextBox.textInterupt = true;

            setTimeout(function () {
              temp.playerOnStrecher.anims.play('eyeOpen').once('animationcomplete', () => {
                 temp.playerOnStrecher.anims.play('gettingUp').once('animationcomplete', () => {
                  temp.playerOnStrecher.anims.play('upIdleForward', true);
                  });
                temp.scene.sceneTextBox.textInterupt = false;
                temp.progressNode("nodeRiddleAnsweredHurt2");
                temp.inDialogue = false;

              });
            }, 2000);


          }, 2000);

          

        });
       

        }else{

            console.log("player is max.")
            setTimeout(function () {
         
            temp.scene.sceneTextBox.textInterupt = false;

            temp.progressNode("nodeRiddleAnsweredFullHp");

            temp.inDialogue = false;

        },1000);
            }


       
       

      }else if(this.currentDictNode.nodeName === "nodeEatenByNectar6"){

        this.playerOnStrecher.anims.play('upIdleBackward', true);
       
      }else if(this.currentDictNode.nodeName === "nodeConverge" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.playerOnStrecher.anims.play('upIdleForward', true);
        
        //create dialogue buttons for player choice
        this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"why do you all look like animals?",true);
        this.scene.npcChoice1.textWob();
        this.scene.npcChoice1.setScrollFactor(0);
        this.scene.npcChoice1.addHitbox();
        this.scene.npcChoice1.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice1.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice1.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice1.on('pointerout',function(pointer){
          this.scene.npcChoice1.clearTextTint();
        },this);

        this.scene.npcChoice1.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeAnimals1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        //create dialogue buttons for player choice
        this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+35,'charBubble',"What with the storm surrounding the island? ",true);
        this.scene.npcChoice2.textWob();
        this.scene.npcChoice2.setScrollFactor(0);
        this.scene.npcChoice2.addHitbox();
        this.scene.npcChoice2.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice2.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice2.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice2.on('pointerout',function(pointer){
          this.scene.npcChoice2.clearTextTint();
        },this);

        this.scene.npcChoice2.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeStorm1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        //create dialogue buttons for player choice
        this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+70,'charBubble',"What is this place? ",true);
        this.scene.npcChoice3.textWob();
        this.scene.npcChoice3.setScrollFactor(0);
        this.scene.npcChoice3.addHitbox();
        this.scene.npcChoice3.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice3.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice3.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice3.on('pointerout',function(pointer){
          this.scene.npcChoice3.clearTextTint();
        },this);

        this.scene.npcChoice3.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeLockwood1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

              

        },this);

        this.scene.npcChoice4 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300+105,'charBubble',"I don\'t really have any questions. ",true);
        this.scene.npcChoice4.textWob();
        this.scene.npcChoice4.setScrollFactor(0);
        this.scene.npcChoice4.addHitbox();
        this.scene.npcChoice4.setScale(.8);

        //set up dialogue option functionality so they work like buttons
        this.scene.npcChoice4.on('pointerover',function(pointer){
          this.scene.initSoundEffect('buttonSFX','1',0.05);
          this.scene.npcChoice4.setTextTint(0xff7a7a);
        },this);

        this.scene.npcChoice4.on('pointerout',function(pointer){
          this.scene.npcChoice4.clearTextTint();
        },this);

        this.scene.npcChoice4.on('pointerdown', function (pointer) {
            
          this.scene.initSoundEffect('buttonSFX','2',0.05);

          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = false;

          this.progressNode("nodeSkip1",true);
          
          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();

          this.inDialogue = false;

        },this);
      }else if(this.currentDictNode.nodeName === "nodefinish1" && this.inDialogue === false){

        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.moveFunctionActive = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;

        this.moveWolf = false;

      }else if(this.currentDictNode.nodeName === "nodefinish6" && this.inDialogue === false){
        
        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.moveFunctionActive = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;

        this.moveMilo = false;

        let temp = this;
            setTimeout(function () {
              //creates a object to hold data for scene transition
              let playerDataObject = {
                saveX: null,
                saveY: null,
                playerHpValue: null,
                playerSex: null,
                playerLocation: null,
                inventoryArray: null,
                playerBestiaryData: null,
                playerSkillsData: null,
                playerSaveSlotData: null,
                flagValues: null,
                settings:null,
                dreamReturnLocation:null,
                playerCurseValue:null
              };
              
              temp.scene.cutSceneActive = false;
              //console.log(playerDataObject)

              //grabs the latests data values from the gamehud. also sets hp back to max hp.
              inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
          
              //then we set the correct location values to the scene transition data.
              playerDataObject.saveX = 752+30;
              playerDataObject.saveY = 760;
              playerDataObject.playerSex = temp.scene.playerSex;
              playerDataObject.playerLocation = "ClinicRoom";
              //this.scene.destination = "ClinicRoom";

              // then we save the scene transition data.
              temp.scene.saveGame(playerDataObject);

              //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
                let playerHealthObject = {
                    playerHealth: null
                };

              //kills gameplay emitters so they dont pile up between scenes
              temp.scene.clearGameplayEmmitters();

              //stops player momentum in update loop.
              temp.scene.playerWarping = true;

              //for loop looks through all the looping music playing within a given scene and stops the music.
              for(let counter = 0; counter < temp.scene.sound.sounds.length; counter++){
                temp.scene.sound.get(temp.scene.sound.sounds[counter].key).stop();
              }

              temp.scene.player1.visible = false;
              //warps player to the next scene
              temp.scene.destination = "ClinicRoom";
              temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                  //time out function which leads to deaugh cutscene here.
          },4000);
      }
      
      
    }
  }

  labEncounter1(){
    this.nodeHandler("wolf","Behavior1","labEncounter1");

    if(this.currentDictNode !== null){

      //orient the player so it looks like they are facing vivian.
      if(this.playerInPosition === false){
        this.playerInPosition = true;
        this.advancedIdleAnimation = false;

        if(this.scene.player1.x < this.x){

          this.playerIsOnLeft = true;
          this.scene.player1.flipXcontainer(false);
          this.anims.play('sideIdle',true);
          this.flipX = true;
        }else{
          this.playerIsOnRight = true;
          this.scene.player1.flipXcontainer(true);
          this.anims.play('sideIdle',true);
          this.flipX = false;
        }
      }

      if(this.scene.player1.x < 461){
          this.scene.player1.x = 461-40;
          this.scene.player1.mainHitbox.x = 461-40;
        }else{
          this.scene.player1.x = 461+40;
          this.scene.player1.mainHitbox.x = 461+40;
        }
        
        
      if(this.currentDictNode.nodeName === "node2" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"who are you?",true);
            this.scene.npcChoice1.textWob();
            this.scene.npcChoice1.setScrollFactor(0);
            this.scene.npcChoice1.addHitbox();
            this.scene.npcChoice1.setScale(.8);

            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice1.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice1.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice1.on('pointerout',function(pointer){
                this.scene.npcChoice1.clearTextTint();
            },this);

            this.scene.npcChoice1.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              this.progressNode("nodeAsk1",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();
              this.scene.npcChoice3.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"do you have an supplies?",true);
            this.scene.npcChoice2.textWob();
            this.scene.npcChoice2.setScrollFactor(0);
            this.scene.npcChoice2.addHitbox();
            this.scene.npcChoice2.setScale(.8);


            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice2.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice2.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice2.on('pointerout',function(pointer){
                this.scene.npcChoice2.clearTextTint();
            },this);

            this.scene.npcChoice2.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              //progress to node branch with state name node10
              this.progressNode("nodeSupplies1");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();
              this.scene.npcChoice3.destroy();

              this.inDialogue = false;

            },this);

            this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-220,'charBubble',"just stopping by.",true);
            this.scene.npcChoice3.textWob();
            this.scene.npcChoice3.setScrollFactor(0);
            this.scene.npcChoice3.addHitbox();
            this.scene.npcChoice3.setScale(.8);


            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice3.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice3.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice3.on('pointerout',function(pointer){
                this.scene.npcChoice3.clearTextTint();
            },this);

            this.scene.npcChoice3.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              //progress to node branch with state name node10
              this.progressNode("nodeStoppingBy1");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();
              this.scene.npcChoice3.destroy();

              this.inDialogue = false;

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
      }else if(this.currentDictNode.nodeName === "nodeconverge1" && this.inDialogue === false){
        this.inDialogue = true;
        this.moveFunctionActive = true;
        this.moveLunaToPosition1 = false;
        this.scene.sceneTextBox.textInterupt = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;
      }else if(this.currentDictNode.nodeName === "node5"|| this.currentDictNode.nodeName === "node11"){
        
        if(this.scene.player1.x > this.x){
          this.scene.player1.flipXcontainer(true);
        }else{
          this.flipX = false;
        }
      }else if(this.currentDictNode.nodeName === "node9"){
        
        if(this.scene.player1.x > this.x){
          this.scene.player1.flipXcontainer(false);
        }
      }else if(this.currentDictNode.nodeName === "node13" && this.inDialogue === false){

        if(this.scene.player1.x > this.x){
          this.scene.player1.flipXcontainer(false);
        }

        this.inDialogue = true;
        this.moveFunctionActive = true;
        this.moveLunaToPosition2 = false;
        this.scene.sceneTextBox.textInterupt = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;
      }else if(this.currentDictNode.nodeName === "node16" && this.inDialogue === false){

        this.inDialogue = true;
        this.moveFunctionActive = true;
        this.moveWolfOut = false;
        this.scene.sceneTextBox.textInterupt = true;

        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;

        //set flag for first part of the quest being finished
        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"labEncounter1Flag1");

        //init npc for the next part of the quest.
        //remove interactable door, place false one, and spawn wolf npc for door.
        console.log("this.scene.storageRoomDoor: ",this.scene.storageRoomDoor);
        this.scene.fakeWarp1 = new fakeWarp(this.scene,this.scene.storageRoomDoor.x,this.scene.storageRoomDoor.y,'door2');
        this.scene.initWolf(this.scene.storageRoomDoor.x, this.scene.storageRoomDoor.y-10, "storageRoomDoor");
        this.scene.storageRoomDoor.destroy();
      }
    }
  }

  storageRoomDoor(){

    this.nodeHandler("wolf","Behavior1","storageRoomDoor");

    if(this.currentDictNode !== null){

      if(this.currentDictNode.nodeName === "node3" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"yes",true);
            this.scene.npcChoice1.textWob();
            this.scene.npcChoice1.setScrollFactor(0);
            this.scene.npcChoice1.addHitbox();
            this.scene.npcChoice1.setScale(.8);

            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice1.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice1.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice1.on('pointerout',function(pointer){
                this.scene.npcChoice1.clearTextTint();
            },this);

            this.scene.npcChoice1.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              this.progressNode("node6",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();
             

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"no",true);
            this.scene.npcChoice2.textWob();
            this.scene.npcChoice2.setScrollFactor(0);
            this.scene.npcChoice2.addHitbox();
            this.scene.npcChoice2.setScale(.8);


            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice2.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice2.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice2.on('pointerout',function(pointer){
                this.scene.npcChoice2.clearTextTint();
            },this);

            this.scene.npcChoice2.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              //progress to node branch with state name node10
              this.progressNode("node4");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();
              

              this.inDialogue = false;

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
      }if(this.currentDictNode.nodeName === "node7" && this.inDialogue === false){
        this.inDialogue = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        //set flag for first part of the quest being finished
        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"labEncounter1Flag2");

        let temp = this;
            setTimeout(function () {
                //creates a object to hold data for scene transition
                let playerDataObject = {
                  saveX: null,
                  saveY: null,
                  playerHpValue: null,
                  playerSex: null,
                  playerLocation: null,
                  inventoryArray: null,
                  playerBestiaryData: null,
                  playerSkillsData: null,
                  playerSaveSlotData: null,
                  flagValues: null,
                  settings:null,
                  dreamReturnLocation:null,
                  playerCurseValue:null
                };
                
                temp.scene.cutSceneActive = false;
                //console.log(playerDataObject)

                //grabs the latests data values from the gamehud. also sets hp back to max hp.
                inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
            
                //then we set the correct location values to the scene transition data.
                playerDataObject.saveX = 640;
                playerDataObject.saveY = 760;
                playerDataObject.playerSex = temp.scene.playerSex;
                playerDataObject.playerLocation = "StorageRoom";
                //this.scene.destination = "ClinicRoom";

                // then we save the scene transition data.
                temp.scene.saveGame(playerDataObject);

                //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
                  let playerHealthObject = {
                      playerHealth: null
                  };

                //gets the hp value using a emitter
                healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

                //kills gameplay emitters so they dont pile up between scenes
                temp.scene.clearGameplayEmmitters();

                //stops player momentum in update loop.
                temp.scene.playerWarping = true;

                //for loop looks through all the looping music playing within a given scene and stops the music.
                for(let counter = 0; counter < temp.scene.sound.sounds.length; counter++){
                  temp.scene.sound.get(temp.scene.sound.sounds[counter].key).stop();
                }

                //temp.scene.player1.visible = false;
                //warps player to the next scene
                temp.scene.destination = "StorageRoom";
                temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                    //time out function which leads to deaugh cutscene here.
            },1000);
      }
    }
  }

  wolfxLuna(){
    
    this.nodeHandler("wolf","Behavior1","wolfXLunalyst");

    if(this.currentDictNode !== null){

      if(this.currentDictNode.nodeName === "node1"){
        this.scene.lunalyst.anims.play("lunalystSkimpySideIdle",true);
      }else if(this.currentDictNode.nodeName === "node2" && this.inDialogue === false){

        this.inDialogue = true;
        this.scene.physics.resume();
        this.scene.CutscenePhysics = true;
        this.scene.cutSceneActive = true;  
        this.moveFunctionActive = true;
        this.scene.sceneTextBox.textInterupt = true;
        this.moveWolfToPosition = false;
        
      }
    }
  }

}