//basic npc class of nectar.
class nectar extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'nectar1');

      this.anims.create({key: 'ambushIdle',frames: this.anims.generateFrameNames('nectar1', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'JumpDownStart',frames: this.anims.generateFrameNames('nectar1', { start: 0+4, end: 6+4 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'JumpDownEnd',frames: this.anims.generateFrameNames('nectar1', { start: 7+4, end: 11+4 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'sideWalk',frames: this.anims.generateFrameNames('nectar1', { start: 13+4, end: 22+4 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'sideIdle',frames: this.anims.generateFrameNames('nectar1', { start: 23+4, end: 26+4 }),frameRate: 7,repeat: -1});

      this.anims.create({key: 'SideSwipeStart',frames: this.anims.generateFrameNames('nectar2', { start: 0, end: 3 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'SideSwipeEnd',frames: this.anims.generateFrameNames('nectar2', { start: 4, end: 5 }),frameRate: 12,repeat: 0});

      if(scene.playerSex === 0){
        this.anims.create({key: 'swallowingPlayer1',frames: this.anims.generateFrameNames('nectar2', { start: 6, end: 12 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'swallowingPlayer2',frames: this.anims.generateFrameNames('nectar2', { start: 13, end: 16 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'swallowingPlayer3',frames: this.anims.generateFrameNames('nectar2', { start: 17, end: 21 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'swallowingPlayer4',frames: this.anims.generateFrameNames('nectar2', { start: 22, end: 25 }),frameRate: 7,repeat: 0});
      }

      this.anims.create({key: 'swallowedPlayerIdle',frames: this.anims.generateFrameNames('nectar2', { start: 26, end: 29 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'swallowedPlayerHurt',frames: this.anims.generateFrameNames('nectar3', { start: 0, end: 3 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'swallowedPlayerHurtIdle',frames: this.anims.generateFrameNames('nectar3', { start: 4, end: 7 }),frameRate: 7,repeat: 1});
      this.anims.create({key: 'swallowedPlayerHurtIdleLoop',frames: this.anims.generateFrameNames('nectar3', { start: 4, end: 7 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'swallowedPlayerAngry',frames: this.anims.generateFrameNames('nectar3', { start: 8, end: 11 }),frameRate: 7,repeat: -1});

      this.anims.create({key: 'playerDigestedBurp',frames: this.anims.generateFrameNames('nectar5', { start: 12, end: 18 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'playerDigestedSpitUpCloths',frames: this.anims.generateFrameNames('nectar5', { start: 19, end: 28 }),frameRate: 7,repeat: 0});

       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 60,'keyPrompts');
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

       //leave a refrence to this npc version fo nectar so the enemy version can talk to it.
       this.scene.npcNectar = this;

       this.spearRaise = false;

       this.inDialogue = false;

       this.formattingText = false;

       this.isPlayerControlled = false;

       this.skipFlagFound = false;

       this.riddleArray = [];
       this.riddlePositionsArray = [];

       this.RiddleOver = false;
       this.RiddleTakingTooLong = false;

       this.miloJumpDelay = false;

       // idea for mini game. options slowly pop up and vanish. under the hood its an array, that roles a random number based on the length of the array. then it removes that options so theres no repeats. 
       this.riddleOptions = ["Tiger","Snake","Vampire","Nothing","Sphinx","Lets Fight","Shark","Stapler","Staples","Spider","I don’t want to answer","The concept of death","can you repeat the riddle?","all of the above?"];

       if(this.npcType === 'ambush'){
          this.anims.play('ambushIdle',true); 

          this.customTrigger = true;
          this.npcTriggerRange = true;


          this.playerTriggerSceneLocX = 1950;
          this.npcTriggerRangeX = this.x -  this.playerTriggerSceneLocX;

          this.npcTriggerRangeY = 2000;
          this.nectarDropped = false;
          this.nectarLanded = false;
          this.cameraPan1 = false;
          this.choke = false;

          this.setDepth(-1);
          this.setTint(0x505050);

       }else if(this.npcType === 'digestedPlayer'){

        this.setNectarToDigestPlayer();

       }

  }

  setNectarToDigestPlayer(){

      this.npcKeyPrompts.visible = false;
      this.promptCooldown = false;
 
      //more variables which help the sign object tell when to display prompts and textbox
      this.playerOverlapingNpc = false;
      this.safeToSpeak = false;
      this.activated = false;
      this.dialogueCompleted = false;
      this.completedText = false;
      this.animationPlayed = false;

      this.spearRaise = false;

      this.inDialogue = false;

      this.formattingText = false;

      this.skipFlagFound = false;


      this.anims.play('sideIdle',true); 

      this.customTrigger = true;
      this.npcTriggerRange = true;

      this.nectarDropped = false;

      this.npcTriggerRangeX = 3000;
      this.npcTriggerRangeY = 3000;
          
      this.cameraPan1 = false;
      this.miloInPosition = false;
      this.choke = false;

      //this.body.setGravityY(600); 

      this.burped = false;
      this.spitUpCloths = false;

      //allows the trigger npc to activate again instead fo needing the player to press w.
      this.triggerNpcActivated = false;
  }
  
  customTriggerFunction(){
    //console.log("this.nectarDropped: ",this.nectarDropped)

    if(this.npcType === "ambush"){
    this.customTriggerFunctionAmbush();
    }else if(this.npcType === "digestedPlayer"){
      this.customTriggerFunctionDigestedPlayer();
    }
  }

  customTriggerFunctionAmbush(){

    if(this.cameraPan1 === false && this.choke === false){
      this.choke = true;

      this.scene.player1.x =  this.playerTriggerSceneLocX;
      this.scene.player1.y = 728;
      this.scene.player1.mainHitbox.x =  this.playerTriggerSceneLocX;
      this.scene.player1.mainHitbox.y = 728;
      this.scene.player1.mainHitbox.setVelocityX(0);
      this.scene.player1.mainHitbox.setVelocityY(0);

      this.scene.player1.playerIdleAnimation();

      //pause physics of scene
      this.scene.cutSceneActive = true;
      
      this.scene.cameras.main.pan(this.x, this.y-70, 2000, 'Sine.easeInOut', true, (camera, progress) => {
          //call back finction that occurs during the duration of the camera pan.
      });


      this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
          console.log('Camera pan has completed!');
          this.choke = false;
          this.cameraPan1 = true;
      },this);
      
    }else if(this.nectarDropped === false && this.choke === false){

      this.dialogueLogicStart();

  
      this.scene.mycamera.startFollow(this);
      this.scene.cameras.main.zoom = 2;
      this.scene.cameras.main.followOffset.set(0,70);

      this.scene.initSoundEffect('bushSFX','1',1);

      this.setVelocity(0,-200);
      
      this.body.setGravityY(600); 

      this.scene.physics.add.collider(this, this.scene.processMap.layer1);

      this.setSize(350,350,true);
      this.setOffset(280, 390-158);

      this.setDepth(7);
      this.clearTint();

      //this.scene.pausedInTextBox = true;

      this.choke = true;
      this.anims.play('JumpDownStart').once('animationcomplete', () => {
            this.nectarDropped = true;
            this.choke = false;  
      });


    }else if(this.nectarDropped === true && this.body.blocked.down && this.choke === false && this.nectarLanded === false){
      this.scene.initSoundEffect('bossSFX','explosion',0.06);
      this.choke = true;
        this.anims.play('JumpDownEnd').once('animationcomplete', () => {
           this.nectarLanded = true;
           this.nectarInPosition = false;
           this.choke = false;

        });
    }else if (this.nectarLanded === true && this.nectarInPosition === false){

       if(this.x > 2100){
        this.setVelocity(-300,0);
        this.anims.play('sideWalk',true);
       }else{
        this.setVelocity(0,0);
        this.anims.play('sideIdle',true);
        console.log("this.choke ",this.choke)
        if(this.choke === false){
          this.choke = true;

            this.scene.cameras.main.pan(this.scene.player1.x, this.scene.player1.y-70, 1000, 'Sine.easeInOut', true, (camera, progress) => {
              //call back finction that occurs during the duration of the camera pan.
            });


          this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
              console.log('Camera pan has completed!');
              this.scene.mycamera.startFollow(this.scene.player1,true,1,1);
              this.scene.cameras.main.zoom = 2;
              this.scene.cameras.main.followOffset.set(0,70);
              this.nectarInPosition = true;

          },this);
        }
       

        

       }

    }else if(this.nectarInPosition === true){
      this.overlapActivateNpc();
    }
  }

  customTriggerFunctionDigestedPlayer(){

    //console.log("this.cameraPan1 ", this.cameraPan1," this.miloInPosition ", this.miloInPosition," this.panToNectar ", this.panToNectar ," this.choke: ",this.choke )
    //need to move milo and nectar into correct position.
    if((this.cameraPan1 === false  || this.miloInPosition === false )&& this.choke === false){
      console.log("panning camera back to nectar");

      this.choke = true;

      //need to let player milo fall to the ground if needed, then hide them and have the npc version walk to the correct side of nectar

      this.flipX = true;

      this.anims.play('swallowedPlayerHurtIdleLoop',true);

      //have the pc version of milo walk up to nectar
      this.scene.moveFunctionActive = true;
      //angle nector correctly with boss version.

      this.scene.player2.anims.play("angleIdleLeft", true);
      this.scene.player2.setVelocityX(0);
      this.scene.player2.setVelocityY(0);

      //pause physics of scene
      this.scene.cutSceneActive = true;
      this.scene.CutscenePhysics = true;
      
      this.scene.cameras.main.pan(this.x, this.y, 2000, 'Sine.easeInOut', true, (camera, progress) => {
          //call back finction that occurs during the duration of the camera pan.
      });


      this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
          console.log('Camera pan has completed!');
          this.choke = false;
          this.cameraPan1 = true;
          this.panToNectar = false;
      },this);
      
    // camera must have finished panning and the player milo must be in position.
    }else if(this.cameraPan1 === true && this.miloInPosition === true && this.panToNectar === false && this.choke === false){

      this.dialogueLogicStart();

      console.log("giving nectar physics and following her now");

      this.scene.mycamera.startFollow(this);
      this.scene.cameras.main.zoom = 2;
      //this.scene.cameras.main.followOffset.set(0,0);

      this.scene.physics.add.collider(this, this.scene.processMap.layer1);

      this.setSize(350,350,true);
      this.setOffset(280, 390-158);

      this.setDepth(7);

      //here play animation where nectar spits up the player.
      this.choke = true;

      //this.anims.play('JumpDownStart').once('animationcomplete', () => {
            this.nectarDropped = true;
            this.choke = false; 
            this.panToNectar = true; 
            this.nectarInPosition = true;
      //});

    }else if(this.nectarInPosition === true){

      this.overlapActivateNpc();
    }
  }

  MoveNPC(){
      if(this.npcType === 'ambush'){
        this.MoveNPCAmbush();
      }else if(this.npcType === 'digestedPlayer'){
        this.MoveNPCDigestedPlayer();
      }
  }

  MoveNPCAmbush() {
    //console.log("this.currentDictNode.nodeName: ",this.currentDictNode.nodeName)
    //this.scene.Milo.x = 1511;
    //this.scene.Milo.y = 401;
    //this.scene.Milo.visible = true;

    //console.log("this.scene.Milo.x: ",this.scene.Milo.x, "this.scene.Milo.y: ",this.scene.Milo.y)
    if(this.currentDictNode.nodeName === "node8" || this.currentDictNode.nodeName === "nodeC"){
      //console.log("activating cuytsom move function");
      if(this.x > 2020){
        this.setVelocity(-200,0);
        this.anims.play('sideWalk',true);
       }else{
        this.x = 2020;
        this.setVelocity(0,0);
        //this.anims.play('sideIdle',true);
        if(this.choke === false){
          this.choke = true;

          this.scene.player1.visible = false;

          this.anims.play('swallowingPlayer1').once('animationcomplete', () => {
            this.scene.initSoundEffect('swallowSFX','2',0.6);
            this.anims.play('swallowingPlayer2').once('animationcomplete', () => {
              this.anims.play('swallowingPlayer3').once('animationcomplete', () => {
                this.scene.initSoundEffect('swallowSFX','3',0.6);
                this.anims.play('swallowingPlayer4').once('animationcomplete', () => {

                  //hide player hp bar.
                  healthEmitter.emit(healthEvent.healthVisibility,false);
                  this.anims.play('swallowedPlayerIdle',true);
                  //this.choke = false;
                  this.scene.sceneTextBox.textInterupt = false;

                  this.progressNode("node17");

                  //this.choke = false;

                  this.scene.sceneTextBox.textInterupt = true;

                   let temp = this;

                   
                  setTimeout(function () {
                    temp.scene.initSoundEffect('playerProjectileSFX','missileCharge',0.2);
                  }, 1000);

                  setTimeout(function () {
                    temp.scene.initPlayerProjectile(temp.x-400,temp.y-200,"spindleMissileNectar","left",258*2,142*2,0,(3.14/4));
                  }, 1500);


                });
              });
            });
          });
        }
        
       
       }
    }else if(this.currentDictNode.nodeName === "nodeB"){

      //console.log("moving milo!");
        
        //have a delay befor our hero jumps from the tower
        if(this.miloJumpDelay === false){
          this.miloJumpDelay = true;
          let temp = this;

          

          setTimeout(function () {
              temp.miloJumpDown = false;
          }, 500);

        //after delay have milo jump down
        }else if(this.miloJumpDown === false){

          this.miloJumpDown = true;
          this.scene.Milo.setVelocityY(-350);
          this.scene.Milo.setVelocityX(250);
          this.scene.Milo.anims.play('jumpUpLeft',true);

          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          let temp = this;
          setTimeout(function () {
            temp.scene.Milo.anims.play('multiFlipLeft');
          }, 200);

        }else if(this.miloJumpDown === true){
          if(this.scene.Milo.x < 1850 && this.scene.Milo.body.blocked.down){
            this.scene.Milo.setVelocityX(0);
            this.choke = false;
            //this.scene.Milo.anims.play('walkLeft',true);
          }else if(this.scene.Milo.x < 1850){
            this.scene.Milo.setVelocityX(200);

          }else{

            this.scene.Milo.setVelocityX(0);
            if(this.choke === false){
              this.choke = true;
              this.scene.Milo.anims.play('flipLanding').once('animationcomplete', () => {

                this.moveFunctionActive = false;

                this.scene.sceneTextBox.textInterupt = false;

                this.scene.Milo.anims.play('standingThere',true);

                //re displays node remeber to turn off textbox interupt variable.
                this.progressNode("node19");
                this.inDialogue = false;
                this.scene.sceneTextBox.textInterupt = false;

                this.scene.cutSceneActive = false;

                this.choke = false;
            });

            }
           
           
            
          }
      }
    }
  }

  MoveNPCDigestedPlayer() {
    console.log("this.moveNectarOffScreen: ",this.moveNectarOffScreen);
  //move milo to nectar for player digested cutscene
   if(this.miloInPosition === false){

    //if milo is on the ground move him to nectars position and face her
      if(this.scene.player2.body.blocked.down){

        //(this.x - 120)
        //left thresh (this.x - 120)-10
        //right Thresh (this.x - 120)+10

        //check to see if player is within range
        if(this.scene.player2.x > (this.x + 180)-10 && this.scene.player2.x < (this.x + 180)+10){
          this.scene.player2.setVelocityX(0);
          this.scene.player2.visible = false;
          // make milo npc version visible

          this.scene.Milo.visible = true;
          this.scene.player2.visible = false;
          this.scene.Milo.x  = this.scene.player2.x;
          this.scene.Milo.y = this.scene.player2.y;

          //this.scene.Milo.flipX = true; 

          this.scene.Milo.anims.play('MenacingSpearRaiseRight').once('animationcomplete', () => {

                this.scene.Milo.anims.play('MenacingSpearHoldRight',true);
          });


          this.miloInPosition = true;
          this.choke = false;

        //if milo is to the left of where he needs to be move him right
        }else if(this.scene.player2.x < (this.x + 180)-10){
          this.scene.player2.setVelocityX(250);
          this.scene.player2.anims.play("walkLeft",true);

        //if milo is at the correct position then progress
        }else if(this.scene.player2.x >= (this.x + 180)+10){
          this.scene.player2.setVelocityX(-250);
          this.scene.player2.anims.play("walkRight",true);

        }

        
      }else{
        this.scene.player2.anims.play('jumpDownLeft',true);
      }
   }else if(this.forceCameraToFollowCloths === false){

    this.scene.mycamera.startFollow(this.playerCloths);
    this.scene.cameras.main.zoom = 2;
    this.scene.cameras.main.followOffset.set(0,70);

   }else if(this.moveNectarOffScreen === false){
    
    if(this.x < 3300){

      this.setVelocityX(200);
      this.anims.play('sideWalk',true);
    }else{

       this.setVelocityX(0);
      this.moveNectarOffScreen = true;
      this.miloRemoveMask = false;
    }
    
   }else if(this.miloRemoveMask === false){

    this.miloRemoveMask = true;
    this.scene.Milo.anims.play('MenacingSpearLowerRight').once('animationcomplete', () => {

      this.scene.Milo.anims.play('dropSpearAndShield').once('animationcomplete', () => {


        this.spear = this.scene.add.sprite(this.scene.Milo.x-13,this.scene.Milo.y+19, "miloProps");
        this.spear.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('miloProps', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.spear.anims.play("idle", true);
        this.spear.setScale(1/3);
        this.spear.setDepth(1);

        this.shield = this.scene.add.sprite(this.scene.Milo.x+3,this.scene.Milo.y+19, "miloProps");
        this.shield.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('miloProps', { start: 1, end: 1 }), frameRate: 7, repeat: -1 });
        this.shield.anims.play("idle", true);
        this.shield.setScale(1/3);
        this.shield.setDepth(1);
         
        this.scene.Milo.setDepth(7);

        this.scene.Milo.anims.play('dropMask').once('animationcomplete', () => {

          this.miloMask = this.scene.add.sprite(this.scene.Milo.x,this.scene.Milo.y+19, "miloProps");
          this.miloMask.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('miloProps', { start: 2, end: 2 }), frameRate: 7, repeat: -1 });
          this.miloMask.anims.play("idle", true);
          this.miloMask.setScale(1/3);
          this.miloMask.setDepth(1);

          this.miloRemoveMask = true;
          this.moveMiloToPile = false;
        });
      });
  });

    
   
   }else if(this.moveMiloToPile === false){

    if(this.playerCloths.x + 80 < this.scene.Milo.x){
       this.scene.Milo.anims.play('walk',true);
       this.scene.Milo.flipX = true;
       this.scene.Milo.setVelocityX(-100);
    }else{

      this.moveMiloToPile = true;
      this.scene.Milo.anims.play('FailedFall').once('animationcomplete', () => {
        
        this.scene.Milo.anims.play('FailedIdle',true);
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("");

      });
      this.scene.Milo.setVelocityX(0);
    }
   }
  }
  //overwrites base npc classes function with flagging logic specific to nectar.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'ambush'){
      this.ambush();
    }else if(this.npcType === 'digestedPlayer'){
      this.digestedPlayer();
    }else{
      this.default();
    }
  }

  // overwrite function so that we can skip the scene by loading into the scene again in the correct position.
  overlapActivateNpc(){
     //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcFinished: ",this.triggerNpcFinished);
    //if the id matches and we havent activated the trigger yet.

    //console.log("this.scene.activatedNpcId === this.npcId: ",this.scene.activatedNpcId === this.npcId, "this.triggerNpcFinished: ",this.triggerNpcFinished);
    if(this.scene.activatedNpcId === this.npcId && this.triggerNpcActivated === false){

      //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcActivated: ",this.triggerNpcActivated);
      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();

      //lock out starting logic.
      this.triggerNpcActivated = true;

    //otherwise if the trigger was activated, and the player is in dialogue, then have w progress dialogue.
    
    }else if(this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.triggerNpcFinished === false){

      //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcActivated: ",this.triggerNpcActivated);

      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      //console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();

      //choke to make sure this cant be activated agian.
      if(!this.scene.sceneTextBox.visible && this.scene.sceneTextBox.hidingText === false){
        this.triggerNpcFinished = true;

      }
          
    }
    //console.log("testing if skipping nectar dialogue")
    //skip case for nectars cutscene.
    if(this.scene.checkSkipIndicatorIsDown() && this.skipFlagFound === true){
      //here is where we apply the warp code 
      //console.log(" skipping nectar scene")

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

            //console.log(playerDataObject)

            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
        
            //then we set the correct location values to the scene transition data.
            playerDataObject.saveX = 1954;
            playerDataObject.saveY = 728;
            playerDataObject.playerSex = this.scene.playerSex;
            playerDataObject.playerLocation = "LockwoodBridges";

            // then we save the scene transition data.
            this.scene.saveGame(playerDataObject);

            //kills gameplay emitters so they dont pile up between scenes
            this.scene.clearGameplayEmmitters();

             //stops player momentum in update loop.
            this.scene.playerWarping = true;

            this.scene.portalId = 0;
            //for loop looks through all the looping music playing within a given scene and stops the music.
            for(let counter = 0; counter < this.scene.sound.sounds.length; counter++){
              this.scene.sound.get(this.scene.sound.sounds[counter].key).stop();
            }

            this.scene.player1.visible = false;

            //warps player to the next scene
            this.scene.destination = "LockwoodBridges";
            this.scene.cameras.main.fadeOut(500, 0, 0, 0);
    } 
  }

  ambushMakeRiddleChoice(position){
    if(this.riddleOptions.length > 0){

      
      //rand number for rand option
      let option = Math.floor(Math.random() * (this.riddleOptions.length ));
      //this.riddleOptions
      console.log("option: ",option);

      console.log("this.riddleOptions.length ",this.riddleOptions.length);


      //create dialogue buttons for player choice
      let tempOption = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.riddlePositionsArray[position],'charBubble',this.riddleOptions[option],true);

      //remove option already used.
      this.riddleOptions.splice(option,1);
      console.log("this.riddleOptions: ",this.riddleOptions);

      let randEffect = Math.floor(Math.random() * 6);
      if(randEffect === 0 ){
        tempOption.textWob();
      }else if(randEffect === 1){
        tempOption.textSquishLeft();
      }else if(randEffect === 2){
        tempOption.textSquishRight();
      }else if(randEffect === 3){
        tempOption.textSlosh();
      }else if(randEffect === 4 || randEffect === 5 || randEffect === 6 ){
        tempOption.textWave();
      }

      tempOption.setScrollFactor(0);
      tempOption.addHitbox();
      tempOption.setScale(.8);

      //set up dialogue option functionality so they work like buttons
      tempOption.on('pointerover',function(pointer){
        this.scene.initSoundEffect('buttonSFX','1',0.05);
        tempOption.setTextTint(0xff7a7a);
      },this);

      tempOption.on('pointerout',function(pointer){
        tempOption.clearTextTint();
      },this);

      tempOption.on('pointerdown', function (pointer) {
              
        this.scene.initSoundEffect('buttonSFX','2',0.05);

        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = false;

        if(tempOption.letterString === "Stapler"){

          this.progressNode("node23",true);

        }else{
              this.scene.sceneTextBox.textInterupt = false;

              this.progressNode("node16");

              this.scene.sceneTextBox.textInterupt = true;
              
              this.scene.initSoundEffect('weaponSFX','medium',0.1);
              this.anims.play('SideSwipeStart').once('animationcomplete', () => {

                this.scene.initSoundEffect('bossSFX','explosion',0.06);

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

                this.scene.player1.setStuckVisiblity();
                //this.scene.player1.mainHitbox.setVelocityX(-140);
                this.scene.player1.mainBodySprite5.anims.play('knockdown').once('animationcomplete', () => {
                  this.scene.player1.StuckRepeat('knockdownStruggle');
                  this.scene.player1.mainHitbox.setVelocityX(0);
                });

                this.anims.play('SideSwipeEnd').once('animationcomplete', () => {

                  this.anims.play('sideIdle');
                  let temp = this;

                  setTimeout(function () {
                    temp.moveFunctionActive = true;

                    temp.scene.sceneTextBox.textInterupt = false;

                     temp.progressNode("node8");

                    temp.choke = false;

                    temp.scene.sceneTextBox.textInterupt = true;

                    temp.scene.physics.resume();
                    temp.scene.CutscenePhysics = true;

                  }, 1500);
                  
                });
            });
        }
              
        //destroy itself and other deciosions
        for(let counter = 0; counter < this.riddleArray.length;counter++){
        this.riddleArray[counter].destroy();
        }

        this.RiddleOver = true;

        this.inDialogue = false; 

      },this);

      let randomVanish = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000

      let that = this;
      
      setTimeout(function () {
        tempOption.textFadeOutAndDestroy(3000);
        setTimeout(function () {
          if(that.RiddleOver === false){
            that.ambushMakeRiddleChoice(position);
          }
        }, 3000);
      }, randomVanish);

      this.riddleArray.push(tempOption); 
      console.log("this.RiddleTakingTooLong: ",this.RiddleTakingTooLong, " this.riddleOptions.length ",this.riddleOptions.length)
      if(this.RiddleTakingTooLong === false && this.riddleOptions.length < 7){
        this.RiddleTakingTooLong = true;
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = false;
        this.progressNode("node14",true);
        //set variable approperiately
        this.scene.sceneTextBox.textInterupt = true;
      }
    }else{
       //destroy itself and other deciosions
        for(let counter = 0; counter < this.riddleArray.length;counter++){
        this.riddleArray[counter].destroy();
        }

      this.scene.sceneTextBox.textInterupt = false;
      
              this.progressNode("node15");

              this.scene.sceneTextBox.textInterupt = true;
              
              this.scene.initSoundEffect('weaponSFX','medium',0.1);
              this.anims.play('SideSwipeStart').once('animationcomplete', () => {

                this.scene.initSoundEffect('bossSFX','explosion',0.06);

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

                this.scene.player1.setStuckVisiblity();
                //this.scene.player1.mainHitbox.setVelocityX(-140);
                this.scene.player1.mainBodySprite5.anims.play('knockdown').once('animationcomplete', () => {
                  this.scene.player1.StuckRepeat('knockdownStruggle');
                  this.scene.player1.mainHitbox.setVelocityX(0);
                });

                this.anims.play('SideSwipeEnd').once('animationcomplete', () => {

                  this.anims.play('sideIdle');
                  let temp = this;

                  setTimeout(function () {
                    temp.moveFunctionActive = true;

                    temp.scene.sceneTextBox.textInterupt = false;

                     temp.progressNode("nodeC");

                    temp.choke = false;

                    temp.scene.sceneTextBox.textInterupt = true;

                    temp.scene.physics.resume();
                    temp.scene.CutscenePhysics = true;

                  }, 1500);
                  
                });
            });
    }
    
  }

  spindleMissileConnected(){
    
    this.scene.sceneTextBox.textInterupt = false;

    this.progressNode("node18");

    this.scene.sceneTextBox.textInterupt = true;

    this.anims.play('swallowedPlayerHurt').once('animationcomplete', () => {

      this.anims.play('swallowedPlayerHurtIdle').once('animationcomplete', () => {

        this.anims.play('swallowedPlayerAngry',true);

        this.moveFunctionActive = false;
        this.inDialogue = false;
        this.scene.sceneTextBox.textInterupt = false;
      });
    });
  
    //this.scene.physics.pause();
    //this.scene.CutscenePhysics = false;

  }

  ambush(){
  
    this.scene.sceneTextBox.textBoxProfileImage.setScale(.5)
   //console.log("checking nectar npc dialogue");

    this.nodeHandler("nectar","Behavior1","ambush");
    
    if(this.currentDictNode !== null){
           if(this.currentDictNode.nodeName === "node1"){

            //use emitter to check nectar ambush skip flag
            let nectarFlag = {
              flagToFind: "nectarAmbushSkip",
              foundFlag: false,
            };

            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, nectarFlag);

            

            //if the encounter has not happened, then set variables. 
            if(nectarFlag.foundFlag === true){

              this.skipFlagFound = true;

              //calls emitter to show the tabtoskip graphic
              skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
              
            }

            //saving game on node 1 trigger, that way if the player leaves nectars fight and comes back ,that they have a checkpoint save before the fight

            //now to add the flag to the player data so the health upgrade doesn't spawn multiple times.
            inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,nectarFlag.flagToFind);

            //creates a object to hold data for scene transition
            let playerDataObject = {
                      saveX: null,
                      saveY: null,
                      playerHpValue: null,
                      playerMaxHP: null,
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
                    
            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);

            playerDataObject.saveX = 2254;
            playerDataObject.saveY = 728;
            playerDataObject.playerSex = this.scene.playerSex;
            playerDataObject.playerLocation = "LockwoodBridges";

            //maxes out hp.
            playerDataObject.playerHpValue = playerDataObject.playerMaxHP;

            //saves the game by calling the save game file function in the scene
            this.scene.saveGameFile(playerDataObject);
            
           }else if(this.currentDictNode.nodeName === "node6" && this.inDialogue === false){
           
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"Yes I will answer your riddle.",true);
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

              this.progressNode("node10",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"I refuse. You don't scare me.",true);
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

              // turn interupt off briefly so that code can progress node, then turn it back on. 
              this.scene.sceneTextBox.textInterupt = false;

              this.progressNode("node7");

              this.scene.sceneTextBox.textInterupt = true;
              
              this.scene.initSoundEffect('weaponSFX','medium',0.1);
               this.anims.play('SideSwipeStart').once('animationcomplete', () => {

                this.scene.initSoundEffect('bossSFX','explosion',0.06);

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

                this.scene.player1.setStuckVisiblity();
                //this.scene.player1.mainHitbox.setVelocityX(-140);
                this.scene.player1.mainBodySprite5.anims.play('knockdown').once('animationcomplete', () => {
                  this.scene.player1.StuckRepeat('knockdownStruggle');
                  this.scene.player1.mainHitbox.setVelocityX(0);
                });

                this.anims.play('SideSwipeEnd').once('animationcomplete', () => {

                  this.anims.play('sideIdle');
                  let temp = this;

                  setTimeout(function () {
                    temp.moveFunctionActive = true;

                    temp.scene.sceneTextBox.textInterupt = false;

                    temp.progressNode("node8");

                    temp.choke = false;

                    temp.scene.sceneTextBox.textInterupt = true;

                    temp.scene.physics.resume();
                    temp.scene.CutscenePhysics = true;

                  }, 1500);
                  
                });

              });

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
          }else if(this.currentDictNode.nodeName === "node13" && this.inDialogue === false){

            console.log('this.y : ',this.y,'_________________________________')
            this.riddlePositionsArray.push(this.scene.sceneTextBox.y-300);
            this.riddlePositionsArray.push(this.scene.sceneTextBox.y-260);
            this.riddlePositionsArray.push(this.scene.sceneTextBox.y-220);
            this.riddlePositionsArray.push(this.scene.sceneTextBox.y-180);
            this.riddlePositionsArray.push(this.scene.sceneTextBox.y-140);
           
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            for(let counter = 0; counter < 5;counter++){
              this.ambushMakeRiddleChoice(counter);
            }

            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;


            //let the npc know they are in dialogue
            this.inDialogue = true;
            
          }else if(this.currentDictNode.nodeName === "node18" && this.inDialogue === false){

            this.scene.Milo.visible = true;
            console.log("this.scene.Milo: ",this.scene.Milo);

            this.inDialogue = true;
            //set variable approperiately
            //this.scene.sceneTextBox.textInterupt = true;

             this.scene.sceneTextBox.textInterupt = true;
            let temp = this;
            setTimeout(function () {

              //hides textbox 
              //temp.scene.sceneTextBox.setText("         ");
              //temp.scene.sceneTextBox.setProfileArray('blank');
              //temp.scene.sceneTextBox.activateNPCTextBox(null);
              temp.scene.sceneTextBox.textInterupt = false;
              temp.progressNode("nodeB");
              temp.scene.sceneTextBox.textInterupt = true;
              
              temp.scene.Milo.visible = true;
              temp.scene.Milo.anims.play('standingThere',true);

                  temp.scene.cameras.main.pan(temp.scene.Milo.x, temp.scene.Milo.y-70, 2000, 'Sine.easeInOut', true, (camera, progress) => {
                  //call back finction that occurs during the duration of the camera pan.
                  });

                  temp.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
                      console.log('Camera pan has completed!');
                      //this.choke = false;
                    
                      temp.scene.mycamera.startFollow(temp.scene.Milo,true,1,1);
                      temp.scene.cameras.main.zoom = 2;
                      temp.scene.cameras.main.followOffset.set(0,70);

                      //temp.scene.Milo.moveFunctionActive = true;

                      temp.moveFunctionActive = true;

                  },temp);
            }, 1500);

            
            //
          }else if(this.currentDictNode.nodeName === "node20" && this.spearRaise === false){

            //this.inDialogue = true;
            //this.scene.sceneTextBox.textInterupt = true;

            this.spearRaise = true;

            healthEmitter.emit(healthEvent.healthVisibility,true);
            healthEmitter.emit(healthEvent.setMiloHealth,true,true);

            this.scene.Milo.anims.play('MenacingSpearRaise').once('animationcomplete', () => {

                this.scene.Milo.anims.play('MenacingSpearHold',true);
            });

          }else if(this.currentDictNode.nodeName === "node22"){

          this.scene.player2Active = true;
          this.scene.Milo.visible = false;
          this.scene.player2.visible = true;
          this.scene.player2.anims.play('MenacingSpearHold',true);
          this.scene.player2.x = this.scene.Milo.x;
          this.scene.player2.y = this.scene.Milo.y;
          this.dialogueCatch = false;
          this.scene.player2.setDepth(6);
          this.setDepth(5);

          //this.tempPlayer1Ref = this.scene.player1;
          //this.scene.player1 = this.scene.player2;
          console.log("nectars this.x: ",this.x," this.y-21: ",this.y-21);
          this.scene.initEnemy(this.x,this.y-21,this.scene.playerSex,"nectar",false,this);

          //calls emitter to show the tabtoskip graphic
          skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
          this.skipFlagFound = false;

          }

          
    }
      
    
  }
  
  digestedPlayer(){

    this.scene.sceneTextBox.textBoxProfileImage.setScale(.5)
   //console.log("checking nectar npc dialogue");

    this.nodeHandler("nectar","Behavior1","playerDigested");
    
    if(this.currentDictNode !== null){
           if(this.currentDictNode.nodeName === "node2"){

            if(this.burped === false){

              this.burped = true;
              this.scene.sceneTextBox.textInterupt = true;
              this.scene.initSoundEffect('burpSFX','2',0.3);
              this.anims.play('playerDigestedBurp').once('animationcomplete', () => {

                  this.anims.play('sideIdle');
                  this.scene.sceneTextBox.textInterupt = false;
               });

              this.scene.bossNectar.digestionTimer.anims.play('stomachStateFinishOpen').once('animationcomplete', () => {
                this.scene.initSoundEffect('stomachSFX','12',0.1);
                this.scene.bossNectar.digestionTimer.anims.play('stomachStateFinishOpenIdle');
                           
              });

            }

           }else if(this.currentDictNode.nodeName === "node4"){

            if(this.spitUpCloths === false){

              this.spitUpCloths = true;
              this.scene.sceneTextBox.textInterupt = true;
              this.scene.initSoundEffect('swallowSFX','4',0.02);
              this.anims.play('playerDigestedSpitUpCloths').once('animationcomplete', () => {

                  this.anims.play('sideIdle');
                  this.scene.sceneTextBox.textInterupt = false;
                  this.progressNode("");
                   this.scene.sceneTextBox.textInterupt = true;

                  this.playerCloths = this.scene.add.sprite(this.x+60,this.y+89, "playerClothsProp");
                  this.playerCloths.flipX = true;
                  this.playerCloths.setScale(1/3);
                  this.playerCloths.setDepth(5);

                  this.scene.cameras.main.pan(this.playerCloths.x, this.playerCloths.y-70, 2000, 'Sine.easeInOut', true, (camera, progress) => {
                      //call back finction that occurs during the duration of the camera pan.
                  });


                  this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
                      console.log('Camera pan has completed!');
                      this.forceCameraToFollowCloths = false;
                      this.scene.sceneTextBox.textInterupt = false;
   
                  },this);

                  
               });

              this.scene.bossNectar.digestionTimer.anims.play('stomachStateFinishClose').once('animationcomplete', () => {
                //this.scene.initSoundEffect('stomachSFX','13',0.1);
                this.scene.bossNectar.digestionTimer.visible = false;

                
                           
              });

            }

           }else if(this.currentDictNode.nodeName === "node9"){

            //turn off forcing the camera in move funct to follow player cloths.
            if(this.node9Start === undefined){
              this.node9Start = true;
              
              this.forceCameraToFollowCloths = true; 
            
              this.scene.moveFunctionActive = true;
              this.moveNectarOffScreen = false;
              this.scene.sceneTextBox.textInterupt = true;

              this.scene.mycamera.startFollow(this.playerCloths);
              this.scene.cameras.main.zoom = 2;
              this.scene.cameras.main.followOffset.set(0,70);
            }
              

          }
      }
  }
}