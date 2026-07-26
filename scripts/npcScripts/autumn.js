//basic npc class of autumn.
class autumn extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'autumnMale');

      //then we add new instance into the scene. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

      this.anims.create({key: 'idle',frames: this.anims.generateFrameNames('autumnMale', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'sideIdle',frames: this.anims.generateFrameNames('autumnMale', { start: 4, end: 7 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'flyDown',frames: this.anims.generateFrameNames('autumnMale', { start: 8, end: 13 }),frameRate: 7,repeat: -1});

      if(scene.playerSex === 0){

        this.anims.create({key: 'liftUp',frames: this.anims.generateFrameNames('autumnMale', { start: 14, end: 21 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'liftUpIdle',frames: this.anims.generateFrameNames('autumnMale', { start: 22, end: 25 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'swallow1',frames: this.anims.generateFrameNames('autumnMale', { start: 26, end: 30 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'swallow2',frames: this.anims.generateFrameNames('autumnMale', { start: 31, end: 36 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'swallow3',frames: this.anims.generateFrameNames('autumnMale', { start: 37, end: 45 }),frameRate: 7,repeat: 0});

        this.anims.create({key: 'release1',frames: this.anims.generateFrameNames('autumnMale', { start: 66, end: 73 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'release2',frames: this.anims.generateFrameNames('autumnMale', { start: 74, end: 82 }),frameRate: 7,repeat: 0});


      }else{

      }

      this.anims.create({key: 'swallowIdle',frames: this.anims.generateFrameNames('autumnMale', { start: 46, end: 49 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'fullFlyUp',frames: this.anims.generateFrameNames('autumnMale', { start: 50, end: 55 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'fullFlyDown',frames: this.anims.generateFrameNames('autumnMale', { start: 56, end: 61 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'fullIdle',frames: this.anims.generateFrameNames('autumnMale', { start: 62, end: 65 }),frameRate: 7,repeat: -1});
      
      //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 90,'keyPrompts');
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

       this.jumpDelay = false;

       this.activatedMapUI  = false;

       this.addedLockwoodFlag = false;

       this.travelPointerTitle = "";

        this.setSize(60,200,true);
        this.setOffset(185, 91);

        this.setDepth(5);
      
        this.advancedIdleAnimation = true;
        this.playerInPosition = false;


        this.sendPlayerTo = "";
        this.sendPlayerX = 0;
        this.sendPlayerY = 0;

        this.departing = false;

        this.inFastTravelScene = false;

        this.flyDown = false;

        this.fastTravelLandingY = 0;

        this.batSoundCoolDown = false;

        this.flyUp = false;

        this.fastTravelPlatformRef = null;


      if(this.npcType === 'postOffice'){
        this.isInPosition = true;

      }else if(this.npcType === 'fastTravel'){
        //this.anims.play("idle", true);
        this.isInPosition = false;
        //this.setDepth(0);
      }else if(this.npcType === 'introToFastTravel'){
        this.isInPosition = true;
        //this.anims.play("sideIdle", true);
        //set up triggler range 
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 60;
        this.npcTriggerRangeY = 900;

      }
      else if(this.npcType === 'landingSequence'){
       this.isInPosition = false;

       this.landingSequenceFinished = false;
       this.settingPlayerNotGettingout = false;
       this.releasingPlayerFromTravel = false;

       this.addTriggerNPCToRegularNPC = true;
      }

  }

  //overwrites base npc classes function with flagging logic specific to autumn.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'postOffice'){
      this.postOffice();
    }else if(this.npcType === 'fastTravel'){
      this.fastTravel();
    }else if(this.npcType === 'introToFastTravel'){
      this.introToFastTravel();
    }else if(this.npcType === 'landingSequence'){
      this.landingSequence();
    }else{  
      this.default();
    }
  }

  activateNpc(){
    console.log("autumn is in range.")
    if(this.isInPosition === true){
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

      if(this.inFastTravelScene === true){
        if(this.scene.checkSkipIndicatorIsDown()){
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

                //check if the level is the dream version
                console.log("(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( location data: ", temp.scene.playerLocation);

                // add flag here for risky
                if(temp.currentDictNode.nodeName === "node12"){

                    //then add container flag. 
                    let riskyTravel = {
                        flagToFind: "riskyTravel",
                        foundFlag: false,
                    };

                    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,riskyTravel.flagToFind);
                    
                }

                //grabs the latests data values from the gamehud. also sets hp back to max hp.
                inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
            
                //then we set the correct location values to the scene transition data.
                playerDataObject.saveX = temp.sendPlayerX;
                playerDataObject.saveY = temp.sendPlayerY;
                playerDataObject.playerSex = temp.scene.playerSex;
                playerDataObject.playerLocation = temp.sendPlayerTo;
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
                
                temp.scene.destination = temp.sendPlayerTo;
                temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                    //time out function which leads to deaugh cutscene here.
            },100);    
        } 
      }
    



    if(this.advancedIdleAnimation === true){
      if((this.npcType === "postOffice" || this.npcType === "fastTravel" || this.npcType === "introToFastTravel" || this.npcType === "landingSequence") && this.advancedIdleAnimation === true){
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
   
  }

   playWingFlapSound(type,delay){

        if(this.batSoundCoolDown === false){
            this.scene.initSoundEffect("fastTravelWingFlapSFX",type,0.3);
            this.batSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.batSoundCoolDown = false;
            }, delay);
        }

    }

  MoveNPC(){
    if(this.npcType === 'fastTravel'){
      this.MoveNPCFastTravel();
    }else if(this.npcType === 'landingSequence'){
      this.MoveNPCLandingSequence();
    }
  }

  MoveNPCFastTravel(){

    if(this.isInPosition === false){
      if(this.y < this.fastTravelLandingY){

        this.setVelocityY(200);
        this.anims.play('flyDown',true);
        this.playWingFlapSound('1',800);
      }else{

        this.setVelocityY(0);
        this.isInPosition = true;
        this.moveFunctionActive = false;
        this.anims.play('idle',true);
        this.y = this.fastTravelLandingY;
      }
    }else if(this.flyUp === false){

      if(this.y > this.fastTravelLandingY-700){

        this.setVelocityY(-100);
        this.anims.play('fullFlyUp',true);
        this.playWingFlapSound('1',800);

      }else{

        this.setVelocityY(0);
        this.flyUp = true;
        this.moveFunctionActive = false;
        this.anims.play('idle',true);

        //this.y = this.fastTravelLandingY;
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

                //check if the level is the dream version
                console.log("(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( location data: ", temp.scene.playerLocation);

                // add flag here for risky
                if(temp.currentDictNode.nodeName === "node12"){

                    //then add container flag. 
                    let riskyTravel = {
                        flagToFind: "riskyTravel",
                        foundFlag: false,
                    };

                    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,riskyTravel.flagToFind);
                    
                }

                //grabs the latests data values from the gamehud. also sets hp back to max hp.
                inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
            
                //then we set the correct location values to the scene transition data.
                playerDataObject.saveX = temp.sendPlayerX;
                playerDataObject.saveY = temp.sendPlayerY;
                playerDataObject.playerSex = temp.scene.playerSex;
                playerDataObject.playerLocation = temp.sendPlayerTo;
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
                
                temp.scene.destination = temp.sendPlayerTo;
                temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                    //time out function which leads to deaugh cutscene here.
            },100);
     
      }
    }

  }

  MoveNPCLandingSequence(){

    console.log("moving autumn?")
     if(this.isInPosition === false){
      if(this.y < this.fastTravelLandingY+10){

        this.setVelocityY(100);
        this.anims.play('fullFlyDown',true);
        this.playWingFlapSound('1',800);

      }else{
        this.setVelocityY(0);
        this.isInPosition = true;
        this.moveFunctionActive = false;
        this.anims.play('fullIdle',true);
        this.y = this.fastTravelLandingY+10;

        //this.customTrigger = true;
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 2000;
        this.npcTriggerRangeY = 2000;
      }
    }else if(this.flyUp === false){

      if(this.y > this.fastTravelLandingY-700){

        this.setVelocityY(-100);
        this.anims.play('fullFlyUp',true);
        this.playWingFlapSound('1',800);

      }else{

        this.setVelocityY(0);
        this.flyUp = true;
        this.moveFunctionActive = false;
        this.anims.play('idle',true);

        //this.y = this.fastTravelLandingY;
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

                //check if the level is the dream version
                console.log("(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( location data: ", temp.scene.playerLocation);

                // add flag here for risky
                if(temp.currentDictNode.nodeName === "node12"){

                    //then add container flag. 
                    let riskyTravel = {
                        flagToFind: "riskyTravel",
                        foundFlag: false,
                    };

                    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,riskyTravel.flagToFind);
                    
                }

                //grabs the latests data values from the gamehud. also sets hp back to max hp.
                inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
            
                //then we set the correct location values to the scene transition data.
                playerDataObject.saveX = temp.sendPlayerX;
                playerDataObject.saveY = temp.sendPlayerY;
                playerDataObject.playerSex = temp.scene.playerSex;
                playerDataObject.playerLocation = temp.sendPlayerTo;
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
                
                temp.scene.destination = temp.sendPlayerTo;
                temp.scene.cameras.main.fadeOut(500, 0, 0, 0);

                    //time out function which leads to deaugh cutscene here.
            },100);
     
      }
    }
  }

  introToFastTravel(){

    console.log("autumn intro travel logic")

    //check to see if flag already exists
    let autumnDialogue1 = {
      flagToFind: "autumnIntroToFastTravel",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, autumnDialogue1);

    //nead logic check. if the flag doesnt exist that means we havent had trigger npc dialogue yet. 
    if(autumnDialogue1.foundFlag === false){

      this.nodeHandler("autumn","Behavior1","introFastTravel");


      if(this.advancedIdleAnimation === true){
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
      

      if(this.scene.player1.x < this.x){
        this.scene.player1.x = this.x-40;
        this.scene.player1.mainHitbox.x = this.x-40;
      }else{
        this.scene.player1.x = this.x+40;
        this.scene.player1.mainHitbox.x = this.x+40;
      }

      this.scene.player1.mainHitbox.setVelocityX(0);
      this.scene.player1.mainHitbox.setVelocityY(0);
      

      if(this.currentDictNode !== null){

        //orient the player so it looks like they are facing vivian.
        

        if(this.currentDictNode.nodeName === "node1"){

          // set the trigger flag to be added at the end of the dialogue.
          this.scene.sceneTextBox.storeFlag(autumnDialogue1);

          if(this.addedLockwoodFlag === false){
            this.addedLockwoodFlag = true;
            inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"LockwoodShopDistrictFastTravel");
          }
          
        }
      }

    }else{
      this.fastTravel();
    }
    

  }

  landingSequence(){


    //if autumn hasnt released the player then do that logic
    if(this.landingSequenceFinished === false){

      this.nodeHandler("autumn","Behavior1","landingSequence");

     if(this.currentDictNode !== null){

      //idea so we can just use nodes to progress it.
       if(this.currentDictNode.nodeName === "node3" && this.settingPlayerNotGettingout === false){
      //turn in button prompts 

        this.settingPlayerNotGettingout = true;
        this.npcKeyPrompts.visible = true;
        this.npcKeyPrompts.playWKey();

        let temp = this;
        setTimeout(function () {
          
          if(temp.releasingPlayerFromTravel === false){
            temp.progressNode("node5");
          }
            setTimeout(function () {
      
              if(temp.releasingPlayerFromTravel === false){
                temp.progressNode("node7");
              }

            }, 2000);

        }, 2000);
        
      //if we progress to this node then do release animation then progressout of dialogue.
       }else if(this.currentDictNode.nodeName === "node4" || this.currentDictNode.nodeName === "node6" && this.releasingPlayerFromTravel === false){

        this.releasingPlayerFromTravel = true;

        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;

        this.flipX = true;

        this.npcKeyPrompts.visible = false;

        //play animation then manually progress node. also make player visiable at the end, free from grab ect.
         this.anims.play('release1', true).once('animationcomplete', () => {
           this.anims.play('release2', true).once('animationcomplete', () => {
            this.anims.play('sideIdle', true);

             //set variable approperiately

            this.scene.grabbed = false;
            this.scene.player1.visible = true;

            this.scene.cutSceneActive = false;
            
            this.inDialogue = false;
            this.scene.sceneTextBox.textInterupt = false;
            this.progressNode("");
            this.scene.CutscenePhysics = false;
            this.scene.cutSceneActive = false;
            this.triggerNpcFinished = true;

            this.scene.player1.x = this.x+40;
            this.scene.player1.y = this.y+25;
            this.scene.player1.mainHitbox.x = this.x+40;
            this.scene.player1.mainHitbox.y = this.y+25;

            this.flipX = false;
            
            console.log("this.currentDictNode",this.currentDictNode)

            this.forceDialogueEnd(true);

            this.landingSequenceFinished = true;

          });
        });

       }

     }

     //otherwise do regular fast travel logic
     //also set npc type to travel version
    }else{
      this.fastTravel();
    }


  }

  postOffice(){

  }

  fastTravel(){
      this.nodeHandler("autumn","Behavior1","fastTravel");

      if(this.advancedIdleAnimation === true){
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
      

      if(this.scene.player1.x < this.x){
        this.scene.player1.x = this.x-40;
        this.scene.player1.mainHitbox.x = this.x-40;
      }else{
        this.scene.player1.x = this.x+40;
        this.scene.player1.mainHitbox.x = this.x+40;
      }

      this.scene.player1.mainHitbox.setVelocityX(0);
      this.scene.player1.mainHitbox.setVelocityY(0);

      if(this.currentDictNode !== null){

        if(this.currentDictNode.nodeName === "node1"){
          
        }else if(this.currentDictNode.nodeName === "node2" && this.inDialogue ===false){

          this.inDialogue = true;
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-310,'charBubble',"I would like to travel.",true);
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

            
             this.inDialogue = false;
            this.scene.initSoundEffect('buttonSFX','2',0.05);

            this.scene.sceneTextBox.textInterupt = false;
            
            //progress to node branch with state name node5
            this.progressNode("node3");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();

          },this);

           //create dialogue buttons for player choice
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-270,'charBubble',"how are you going to carry me?",true);
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
            
             this.inDialogue = false;
            this.scene.initSoundEffect('buttonSFX','2',0.05);

            this.scene.sceneTextBox.textInterupt = false;
            
            //progress to node branch with state name node5
            this.progressNode("nodeCarryMe1");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-230,'charBubble',"tell me about yourself.",true);
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
          
             this.inDialogue = false;
            this.scene.initSoundEffect('buttonSFX','2',0.05);

            this.scene.sceneTextBox.textInterupt = false;
            
            //progress to node branch with state name node5
            this.progressNode("nodeAutumnInfo");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice4 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-190,'charBubble',"oh nothing just passing through.",true);
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
          
            this.inDialogue = false;
            this.scene.initSoundEffect('buttonSFX','2',0.05);

            this.scene.sceneTextBox.textInterupt = false;
            
            //progress to node branch with state name node5
            this.progressNode("nodeAutumnExit");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();

          },this);


        }else if(this.currentDictNode.nodeName === "node4" && this.activatedMapUI === false){
          this.activatedMapUI = true;

          let object = {
              NPCRef: this,
            };
    

          inventoryKeyEmitter.emit(inventoryKey.createMap,object);

          this.scene.sceneTextBox.textInterupt = true;
    


        }else if(this.currentDictNode.nodeName === "node5" && this.inDialogue === false){
          
          //display currency the player has on screen
          inventoryKeyEmitter.emit(inventoryKey.displayCurrency);

          // fetches the player currency amount from the ui
          let shell = {
            currency: null
          };

          inventoryKeyEmitter.emit(inventoryKey.getCurrency,shell);

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //if the player has enough shell, display a different option.
          if(shell.currency >= 25){

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"here you go.",true);
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

             //subtract amount from players currency
              let currencyObject = {
                  changeType:'-',
                  changeAmount:25,
              };
                inventoryKeyEmitter.emit(inventoryKey.changeCurrency,currencyObject);


              //console.log("shell.currency: ",shell.currency);
              //check player currency, if player has enough then pro
              //progress to node branch with state name node5
              this.progressNode("nodeE",true);
                
              //sets the dialogue catch so the textbox stays open during the shop ui interactions.
              this.dialogueCatch = true;
              
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);
          }else{
            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"I dont have enough.",true);
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

              // fetches the player currency amount from the ui
              let shell = {
                currency: null
              };
              inventoryKeyEmitter.emit(inventoryKey.getCurrency,shell);

              //console.log("shell.currency: ",shell.currency);
              //check player currency, if player has enough then pro
              //progress to node branch with state name node5
              this.progressNode("node8",true);

              //add flag to tell that the player is doing risky fast travel. then reomve flag from player if they get out before they arte digested.

              //plays animation of vivian shocked and sfx agian.
              /*if(!this.animationPlayed){

                  this.animationPlayed = true;

                  this.anims.play('vivianrummagingShock');
                  this.scene.initSoundEffect('foxSFX','1',0.05);

                  let temp = this;
                  setTimeout(function () {
                    temp.animationPlayed = false;
                }, 500);

              } */
                
              //sets the dialogue catch so the textbox stays open during the shop ui interactions.
              this.dialogueCatch = true;
              
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);
          }
          
          //dialogue option for no.
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"never mind.",true);
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
            this.progressNode("node20");

            //hide currency
            inventoryKeyEmitter.emit(inventoryKey.displayCurrency);

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

            this.inDialogue = false;

          },this);
          
          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;

        }else if((this.currentDictNode.nodeName === "node6" || this.currentDictNode.nodeName === "node11") && this.inDialogue === false){

          //set variable so skip functionality works.
          this.advancedIdleAnimation = false;

          this.inFastTravelScene = true;

          this.inDialogue = true;
          //focus on warp point. 
          this.scene.mycamera.startFollow(this.fastTravelPlatformRef);
          this.scene.cameras.main.zoom = 2;
          this.scene.cameras.main.followOffset.set(-30,30);

          //used to prevent the player from moving while in the scene load in before the trigger npc activates.
          
          //calls emitter to show the tabtoskip graphic
          skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

          //hide player 
          this.scene.player1.visible = false;
        
          if(this.animationPlayed === false){

            this.animationPlayed = true;
            
            //apply interuption to dialogue
            this.scene.sceneTextBox.textInterupt = true;

            console.log("lifting up player?")

            this.anims.play('liftUp').once('animationcomplete', () => {
              this.anims.play('liftUpIdle',true);

              this.scene.sceneTextBox.amountWIsPressed++;
              this.scene.sceneTextBox.textInterupt = false;
              this.animationPlayed = false;
              //hide ui and dialogue box.
              this.inDialogue = false;

              this.progressNode("",true);
              this.scene.sceneTextBox.textInterupt = true;

              this.anims.play('swallow1').once('animationcomplete', () => {
              this.scene.initSoundEffect('swallowSFX','5',0.1);
              this.anims.play('swallow2').once('animationcomplete', () => {
                this.scene.initSoundEffect('swallowSFX','5',0.1);
                this.anims.play('swallow3').once('animationcomplete', () => {
                  this.anims.play('swallowIdle',true);

                  this.scene.sceneTextBox.amountWIsPressed++;
                  this.scene.sceneTextBox.textInterupt = false;
                  this.animationPlayed = false;
                  //hide ui and dialogue box.

                  this.progressNode("",true);
                
                });
              });
            });

            });
        }

        }else if((this.currentDictNode.nodeName === "nodeB" || this.currentDictNode.nodeName === "node14") && this.departing === false){

            this.departing = true;
            this.scene.sceneTextBox.textInterupt = true;

            this.scene.sceneTextBox.textCoolDown = true;

             this.moveFunctionActive = true;

             this.scene.physics.resume();
             this.scene.CutscenePhysics = true;

        }
      }
    
  }

  travelQuestion(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "batChirp";

    let location = (this.travelPointerTitle+"?").padEnd(25, ' '); 
    
    this.textToDisplay += 
    'travel to                '+
    location+
    '                         ';
    //'1234567891234567891234567';

    //console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('autumnSmile');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);

    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  alreadyThere(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "batChirp";

    let location = (this.travelPointerTitle+"...").padEnd(25, ' '); 
    
    this.textToDisplay += 
    'we are already at        '+
     location+
    '                         ';
    

    //console.log("this.textToDisplay: ",this.textToDisplay);
    
    this.profileArray.push('autumnSmile');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);

    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
  }

  differentPlace(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "batChirp";
    
    this.textToDisplay += 
    'somewhere else then?     '+
    '                         '+
    '                         ';
    

    //console.log("this.textToDisplay: ",this.textToDisplay);
    
    this.profileArray.push('autumnSmile');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);

    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
  }

}