//basic npc class of beeSecret.
class beeSecret extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType,beeRefrence){
      
      super(scene, xPos, yPos, 'sign');

      this.beeRefrence = beeRefrence;

      this.visible = false;
      //then we add new instance into the scene. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

     
      //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 45,'keyPrompts');
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

       //this.body.setGravityY(600); 

        this.setSize(60,200,true);
        this.setOffset(185, 91);
 
       if(this.npcType === ''){
          //this.anims.play('angleIdleLeft');
       }

  }

  //overwrites base npc classes function with flagging logic specific to beeSecret.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'beeSecret'){
      this.beeSecretFunct();
    }
  }

  MoveNPC(){
  
  }

  beeSecretFunct(){


    this.nodeHandler("beeSecret","Behavior1","beeSecret");
    
    //this.scene.cutSceneActive = true;
    
    this.scene.enemyAnimationsActive = true;

    if(this.currentDictNode !== null){

      if(this.isPlayerControlled === false){
          if(this.currentDictNode.nodeName === "node3" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"Yes! what could possible go wrong?",true);
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

              this.scene.sceneTextBox.textInterupt = true;

              this.scene.player1.visible = false;

              this.beeRefrence.anims.play("beeDroneDefeatedWillingTV").once('animationcomplete', () => {

                    this.beeRefrence.anims.play("beeDroneDefeatedWillingTVEnd");
                    this.scene.sceneTextBox.textInterupt = false;

                    this.progressNode("node6",true);

                    let temp = this;
                    setTimeout(function(){
                        
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

                        //modifies the object with the new relivant information.
                        playerDataObject.saveX = 458;
                        playerDataObject.saveY = 1016+15;
                        playerDataObject.playerSex = temp.scene.playerSex;
                        playerDataObject.playerLocation = "hiveChamber1";

                        //maxes out hp.
                        playerDataObject.playerHpValue = 5;

                         //saves the game by calling the save game file function in the scene
                        temp.scene.saveGameFile(playerDataObject);

                        temp.scene.setupGameoverLocation("hiveGameover");

                        if(temp.beeRefrence.enemySex === 0){
                          temp.scene.enemyThatDefeatedPlayer = bestiaryKey.beeDroneMaleSecret;
                        }else{
                          temp.scene.enemyThatDefeatedPlayer = bestiaryKey.beeDroneFemaleSecret;
                        }

                        setTimeout(function () {
                          
                           temp.scene.changeToGameover();
                           
                        }, 1000);

                        temp.scene.sceneTextBox.textInterupt = true;
                        temp.scene.sceneTextBox.textCoolDown = true;



                    },1000);

                    this.scene.sceneTextBox.textInterupt = true;
                    
              });
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"No way.",true);
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
            
          }
        }
    }
  }

  inYourTimeOfNeed(){

  }

}