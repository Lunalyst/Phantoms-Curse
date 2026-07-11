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

      
      if(scene.playerSex === 0){

        this.anims.create({key: 'autumnPickUpPlayerEnd',frames: this.anims.generateFrameNames('autumnCutScene', { start: 31, end: 33 }),frameRate: 5,repeat: 0});
        this.anims.create({key: 'autumnHoldingPlayer',frames: this.anims.generateFrameNames('autumnCutScene', { start: 34, end: 37 }),frameRate: 6,repeat: -1});

      }else{

        this.anims.create({key: 'autumnPickUpPlayerEnd',frames: this.anims.generateFrameNames('autumnCutScene', { start: 48, end: 50 }),frameRate: 5,repeat: 0});
        this.anims.create({key: 'autumnHoldingPlayer',frames: this.anims.generateFrameNames('autumnCutScene', { start: 51, end: 54 }),frameRate: 6,repeat: -1});

      }
      
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

        this.setSize(60,200,true);
        this.setOffset(185, 91);
      
        this.advancedIdleAnimation = true;

      if(this.npcType === 'postOffice'){

      }else if(this.npcType === 'fastTravel'){
        this.anims.play("idle", true);
        this.setDepth(0);
      }else if(this.npcType === 'introToFastTravel'){

        this.anims.play("sideIdle", true);
        //set up triggler range 
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 70;
        this.npcTriggerRangeY = 900;

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
      if(this.npcType === "postOffice" || this.npcType === "fastTravel" || this.npcType === "introToFastTravel"){
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

  MoveNPC(){
  
  }

  introToFastTravel(){

    console.log("autumn intro travel logic")
    //orient the player so it looks like they are facing vivian.
    this.scene.player1.x = 2813;
    this.scene.player1.y = 728;
    this.scene.player1.mainHitbox.x = 2813;
    this.scene.player1.mainHitbox.y = 728;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //check to see if flag already exists
    let autumnDialogue1 = {
      flagToFind: "autumnIntroToFastTravel",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, autumnDialogue1);

    //nead logic check. if the flag doesnt exist that means we havent had trigger npc dialogue yet. 
    if(autumnDialogue1.foundFlag === false){

      this.nodeHandler("autumn","Behavior1","introFastTravel");

      if(this.currentDictNode !== null){

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

  postOffice(){
    console.log("this.isPlayerControlled: ", this.isPlayerControlled)

    if(this.isPlayerControlled === false){
      this.nodeHandler("autumn","Behavior1","test");
      this.scene.player1.mainHitbox.x = this.x;
    }else{
      this.nodeHandler("autumn","Behavior1","testRelease");
    }

    

    if(this.currentDictNode !== null){

     if(this.isPlayerControlled === false){
        if(this.currentDictNode.nodeName === "node3" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"its Your Turn autumn",true);
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

              this.progressNode("node5",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"maybe later",true);
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
            
        }else if(this.currentDictNode.nodeName === "node6"){
          
          this.scene.player2Active = true;
          this.visible = false;
          this.scene.player2.visible = true;
          this.isPlayerControlled = true;
          this.scene.player1.mainHitbox.x = this.x;
          this.scene.player1.mainHitbox.setVelocity(0,0);
          this.scene.player1.x = this.x;
          this.scene.player1.setDepth(5);
          this.scene.player2.setDepth(6);
          healthEmitter.emit(healthEvent.setautumnHealth,true,true);

        }
      }else{
        if(this.currentDictNode.nodeName === "node2"){
          this.scene.player2Active = false;
          this.visible = true;
          this.scene.player2.visible = false;
          this.scene.player2.x = this.x;
          this.isPlayerControlled = false;
          this.scene.player1.mainHitbox.x = this.x;
          this.scene.player1.x = this.x;
          this.scene.player1.setDepth(6);
          this.scene.player2.setDepth(5);
          healthEmitter.emit(healthEvent.setautumnHealth,false,false);
        }
      }
      
    }
  }

  fastTravel(){
      this.nodeHandler("autumn","Behavior1","fastTravel");

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
          this.scene.sceneTextBox.textInterupt = true;

          let object = {
              NPCRef: this,
            };
    

          inventoryKeyEmitter.emit(inventoryKey.createMap,object);
    


        }
      }
    
  }

}