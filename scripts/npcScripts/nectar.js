//basic npc class of nectar.
class nectar extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'nectar');

      this.anims.create({key: 'JumpDownStart',frames: this.anims.generateFrameNames('nectar', { start: 0, end: 6 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'JumpDownEnd',frames: this.anims.generateFrameNames('nectar', { start: 7, end: 11 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'sideWalk',frames: this.anims.generateFrameNames('nectar', { start: 13, end: 22 }),frameRate: 14,repeat: -1});
      this.anims.create({key: 'sideIdle',frames: this.anims.generateFrameNames('nectar', { start: 23, end: 26 }),frameRate: 7,repeat: -1});
     
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

       this.inDialogue = false;

       this.formattingText = false;

       this.isPlayerControlled = false;

       this.riddleArray = [];
       this.riddlePositionsArray = [];

       this.RiddleOver = false;
       this.RiddleTakingTooLong = false;

       // idea for mini game. options slowly pop up and vanish. under the hood its an array, that roles a random number based on the length of the array. then it removes that options so theres no repeats. 
       this.riddleOptions = ["Tiger","Snake","Vampire","Nothing","Sphinx","Lets Fight","Shark","Stapler","Staples","Spider","I don’t want to answer","The concept of death","can you repeat the riddle?","all of the above?"];

       if(this.npcType === 'ambush'){
          //this.anims.play('idle'); 

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

       }

  }
  
  customTriggerFunction(){
    //console.log("this.nectarDropped: ",this.nectarDropped)

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

      this.setSize(300,196,true);
      this.setOffset(320, 390);

      this.setDepth(6);
      this.clearTint();

      //this.scene.pausedInTextBox = true;

      this.choke = true;
      this.anims.play('JumpDownStart').once('animationcomplete', () => {
            this.nectarDropped = true;
            this.choke = false;  
      });


    }else if(this.nectarDropped === true && this.body.blocked.down && this.choke === false && this.nectarLanded === false){
      this.scene.initSoundEffect('buttonSFX','explosion',0.06);
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

            this.scene.cameras.main.pan(this.scene.player1.x, this.scene.player1.y-70, 2000, 'Sine.easeInOut', true, (camera, progress) => {
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

  //overwrites base npc classes function with flagging logic specific to nectar.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'ambush'){
      this.ambush();
    }else{
      this.default();
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
          this.progressNode("node16",true);
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
      this.scene.sceneTextBox.textInterupt = false;
      
      this.progressNode("node15",true);

      for(let counter = 0; counter < this.riddleArray.length;counter++){
        this.riddleArray[counter].destroy();
      }
    }
    
  }

  ambush(){
  
    this.scene.sceneTextBox.textBoxProfileImage.setScale(.5)
    this.nodeHandler("nectar","Behavior1","ambush");
    
    if(this.currentDictNode !== null){

          if(this.currentDictNode.nodeName === "node6" && this.inDialogue === false){
           
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

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              //progress to node branch with state name node10
              this.progressNode("node7");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
          }if(this.currentDictNode.nodeName === "node13" && this.inDialogue === false){

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
            
          }
      }
    
  }
}