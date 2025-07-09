//basic npc class of vivian.
class vivian extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'vivian');

      this.anims.create({key: 'vivianrummaging',frames: this.anims.generateFrameNames('vivian', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianrummagingShock',frames: this.anims.generateFrameNames('vivian', { start: 4, end: 6 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianrummagingAngry',frames: this.anims.generateFrameNames('vivian', { start: 7, end: 10 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianrummagingLook',frames: this.anims.generateFrameNames('vivian', { start: 11, end: 14 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianrummagingGiveItem',frames: this.anims.generateFrameNames('vivian', { start: 15, end: 19 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'vivianHide',frames: this.anims.generateFrameNames('vivian', { start: 20, end: 20 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianPopUp',frames: this.anims.generateFrameNames('vivian', { start: 21, end: 23 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianShopIdle',frames: this.anims.generateFrameNames('vivian', { start: 24, end: 27 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianShopIdleRight',frames: this.anims.generateFrameNames('vivian', { start: 28, end: 31 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianShopIdleLeft',frames: this.anims.generateFrameNames('vivian', { start: 32, end: 35 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianGamePeak',frames: this.anims.generateFrameNames('vivian', { start: 36, end: 42 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianGameRightTilt',frames: this.anims.generateFrameNames('vivian', { start: 42, end: 46 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianGameLeftTilt',frames: this.anims.generateFrameNames('vivian', { start: 46, end: 50 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianGameVoreBellyRub',frames: this.anims.generateFrameNames('vivian', { start: 68, end: 71 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianGameVoreBellyStruggle1',frames: this.anims.generateFrameNames('vivian', { start: 73, end: 84 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianGameVoreBellyRumble',frames: this.anims.generateFrameNames('vivian', { start: 85, end: 93 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianGameVoreBellyIdle1',frames: this.anims.generateFrameNames('vivian', { start: 109, end: 112 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'vivianGameVoreBellyIdle2',frames: this.anims.generateFrameNames('vivian', { start: 114, end: 117 }),frameRate: 4,repeat: 0});
      this.anims.create({key: 'vivianGameVoreBellyCloths',frames: this.anims.generateFrameNames('vivian', { start: 118, end: 124 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'vivianGameVoreBellyIdle3',frames: this.anims.generateFrameNames('vivian', { start: 125, end: 128 }),frameRate: 6,repeat: -1});

      if(scene.playerSex === 0){
        this.anims.create({key: 'vivianGameVorePopup',frames: this.anims.generateFrameNames('vivian', { start: 51, end: 53 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'vivianGameVoreGrabbed',frames: this.anims.generateFrameNames('vivian', { start: 54, end: 57 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'vivianGameVoreSwallow',frames: this.anims.generateFrameNames('vivian', { start: 58, end: 67 }),frameRate: 5,repeat: 0});

        this.anims.create({key: 'vivianGameVoreBellySquish',frames: this.anims.generateFrameNames('vivian', { start: 94, end: 97 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'vivianGameVoreBellyStruggle2',frames: this.anims.generateFrameNames('vivian', { start: 98, end: 103 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'vivianGameVoreBellyDigestion',frames: this.anims.generateFrameNames('vivian', { start: 103, end: 108 }),frameRate: 5,repeat: 0});
        this.anims.create({key: 'vivianVoreGameover',frames: this.anims.generateFrameNames('vivianEndings', { start: 0, end: 3 }),frameRate: 5,repeat: -1});
      }else{
        this.anims.create({key: 'vivianGameVorePopup',frames: this.anims.generateFrameNames('vivianExtension', { start: 0, end: 3 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'vivianGameVoreGrabbed',frames: this.anims.generateFrameNames('vivianExtension', { start: 4, end: 6 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'vivianGameVoreSwallow',frames: this.anims.generateFrameNames('vivianExtension', { start: 7, end: 16 }),frameRate: 5,repeat: 0});

        this.anims.create({key: 'vivianGameVoreBellySquish',frames: this.anims.generateFrameNames('vivianExtension', { start: 17, end: 20 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'vivianGameVoreBellyStruggle2',frames: this.anims.generateFrameNames('vivianExtension', { start: 21, end: 26 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'vivianGameVoreBellyDigestion',frames: this.anims.generateFrameNames('vivianExtension', { start: 26, end: 31 }),frameRate: 5,repeat: 0});
        this.anims.create({key: 'vivianVoreGameover',frames: this.anims.generateFrameNames('vivianEndings', { start: 4, end: 7 }),frameRate: 5,repeat: -1});
      }

      this.anims.create({key: 'vivianLosePopUp',frames: this.anims.generateFrameNames('vivianExtension', { start: 32, end: 34 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'vivianLoseIdle',frames: this.anims.generateFrameNames('vivianExtension', { start: 35, end: 38 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'vivianLoseGiveItem',frames: this.anims.generateFrameNames('vivianExtension', { start: 39, end: 42 }),frameRate: 5,repeat: 0});



      

       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 50,'keyPrompts');
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

       this.trading = false;
       this.activatedTradeUI = false;
       this.inDialogue = false;

       this.safeToSpeak = false;

       this.formattingText = false;

       this.startMinigame = false;
       
       this.stopTell = false;
       this.minigameTell = false;

       this.vivianThatDefeatedPlayer = false;

       if(this.npcType === 'rummaging'){
        this.anims.play('vivianrummaging',true);
        //set up triggler range 
        this.npcTriggerRange = true;
        this.npcTriggerRangeX = 80;
        this.npcTriggerRangeY = 300;

        //sets popout to true so that we we dont have to play popout animation.
        this.popOut = false;

       }else if(this.npcType === 'minigameShop'){
        this.anims.play('vivianHide',true);
        this.popOut = true;
       }else if(this.npcType === 'voreSequence' || this.npcType === 'tfSequence' ||this.npcType === 'playerWinsLantern' ||this.npcType === 'playerWinsShell' ){
        this.advancedIdleAnimation = true;
        this.anims.play('vivianHide',true);
        this.popOut = false;
       }

       this.selectiveFlagAdded = false;

       this.doOnce = false;

      this.startGameover = false;

  }

  //overwrites base npc classes function with flagging logic specific to vivian.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'rummaging'){
      this.rummaging();
    }else if(this.npcType === 'minigameShop'){
      this.minigameShop();
    }else if(this.npcType === 'voreSequence'){
      this.voreSequence();
    }else if(this.npcType === 'tfSequence'){
      this.tfSequence();
    }else if(this.npcType === 'playerWinsLantern'){
      this.playerWinsLantern();
    }else if(this.npcType === 'playerWinsShell'){
      this.playerWinsShell();
    }else{
      this.default();
    }
  }

  //special idle pose so the npc can dynamically look at the player.
  AdvancedIdle(){

  }

  //for this npc we need to overwrite the activatino function to account for the under water animation.
  activateNpc(){

    //if the player meets activation requiements for the sign display the text box
    if(this.safeToSpeak === true && this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.scene.player1.mainHitbox.body.blocked.down && this.activated === false){

      if(this.popOut === false){
        //console.log("popout is false");
        //logic to start dialogue
        this.dialogueLogicStart();

        //calls function overwritten children class to handle npc logic.
        this.flagLogic();
          
        //ending dialoguce logic.
        this.dialogueLogicEnd();
      }else{
        //console.log("popout is true");
        this.activated = true;
        this.scene.initSoundEffect('creakSFX','wood',0.05);
        //this.scene.initSoundEffect('splashSFX','istaraGetUp',0.05);
        this.anims.play('vivianPopUp').once('animationcomplete', () => {
          this.anims.play('vivianShopIdle',true);
          this.popOut = false;
          this.activated = false;
          this.advancedIdleAnimation = true;
        });
      }
          
      //otherwise we want to display the key prompts 
    }else if(this.safeToSpeak === true && this.scene.activatedNpcId === this.npcId && this.promptCooldown === false ){

      this.npcKeyPrompts.visible = true;
      this.npcKeyPrompts.playWKey();
      this.npcKeyPrompts.y = this.y+60;
      this.promptCooldown = true;        
  
    }

    //function to manage vivian looking at the player depending on the player position
    if(this.advancedIdleAnimation === true){
      if(this.npcType === "minigameShop"){
        if(this.scene.player1.x < this.x - 40){
          this.anims.play('vivianShopIdleLeft',true);

        }else if(this.scene.player1.x > this.x + 40){
          this.anims.play('vivianShopIdleRight',true);
        }else{
          if(this.currentDictNode === null){
            this.anims.play('vivianShopIdle',true);
          }
        }
      //minigame tells. plays animation after a period of time 
      }else if(this.npcType === "tfSequence" || this.npcType === "voreSequence"){

        //if the tell is false
        if(this.minigameTell === false && this.stopTell === false){
          //set to true
          this.minigameTell = true;
          //set time out function
          let temp = this;
          //console.log("delaying minigame tell animation");
           let randomTime = Math.random() * (20000 - 8000) + 8000;
          setTimeout(function () {
            //play animation and reset.
            if(temp.stopTell === false){
              temp.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
              temp.anims.play('vivianGameRightTilt').once('animationcomplete', () => {
                temp.minigameTell = false;
                
              
              });
            }
          }, randomTime);  
        }
        console.log("checking skip button: ",this.vivianThatDefeatedPlayer);
        /* remeber to change this to the tf sequence so hitting tab gives the correct gameover screen and flag lol */
        if(this.vivianThatDefeatedPlayer === true){

          //
          if(this.scene.checkSkipIndicatorIsDown()){
            this.startGameoverActivated = true;
            this.scene.gameoverLocation = "vivianGameover";
            this.scene.enemyThatDefeatedPlayer = "vivianVore";
            this.scene.changeToGameover();
            this.scene.sceneTextBox.textInterupt = true;
            this.scene.sceneTextBox.textCoolDown = true;
          } 
          
        }
      }else if(this.npcType === "playerWinsLantern"){
        //if the tell is false
        if(this.minigameTell === false && this.stopTell === false){
          //set to true
          this.minigameTell = true;
          //set time out function
          let temp = this;
          //console.log("delaying minigame tell animation");
          let randomTime = Math.random() * (20000 - 8000) + 8000;
          setTimeout(function () {
            //play animation and reset.
            if(temp.stopTell === false){
            temp.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
            temp.anims.play('vivianGameLeftTilt').once('animationcomplete', () => {
              temp.minigameTell = false;
              
              });
            }
          }, randomTime);
          
        }
      }else if(this.npcType === "playerWinsShell"){
        //if the tell is false
        if(this.minigameTell === false && this.stopTell === false){
          //set to true
          this.minigameTell = true;
          //set time out function
          let temp = this;
          //console.log("delaying minigame tell animation");
          let random = Math.floor((Math.random() * 2));
          //console.log(random);
          if(random === 0){
            let randomTime = Math.random() * (20000 - 8000) + 8000;
            setTimeout(function () {
              //play animation and reset.
              if(temp.stopTell === false){
                temp.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
                temp.anims.play('vivianGameRightTilt').once('animationcomplete', () => {
                  temp.minigameTell = false;
                
                });
              }
            }, randomTime);
          }else{
            let randomTime = Math.random() * (20000 - 8000) + 8000;
            setTimeout(function () {
              //play animation and reset.
              if(temp.stopTell === false){
                temp.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
                temp.anims.play('vivianGameLeftTilt').once('animationcomplete', () => {
                  temp.minigameTell = false;
                
                });
              }
            }, randomTime
          );
          }
          
          
        }
      }
        
    }

    
        
    // resets variables.
    if(this.safeToSpeak === false){
      this.npcKeyPrompts.visible = false;
      this.promptCooldown = false;

    }
  }

  rummaging(){
    //check to see if flag already exists
    let vivianDialogue1 = {
      flagToFind: "vivianRummaging",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue1);
    
    if(vivianDialogue1.foundFlag === false){

      this.nodeHandler("vivian","Behavior1","rummaging");
      
      if(this.currentDictNode !== null){
        //console.log("this.currentDictNode.nodeName: ", this.currentDictNode.nodeName );
        if(this.currentDictNode.nodeName === "node1"){
          this.anims.play('vivianrummaging',true);
          this.scene.sceneTextBox.storeFlag(vivianDialogue1);
        }else if(this.currentDictNode.nodeName === "node5"){
          
          if(this.doOnce === false){
            this.doOnce = true;
            if(!this.animationPlayed){

              this.animationPlayed = true;

              this.anims.play('vivianrummagingShock');
              this.scene.initSoundEffect('foxSFX','1',0.05);

              let temp = this;
              setTimeout(function () {
                temp.animationPlayed = false;
            }, 500);
          }
          

          } 
        }else if(this.currentDictNode.nodeName === "node6"){
          this.doOnce = false;
          this.anims.play('vivianrummagingAngry',true);
  
        }else if(this.currentDictNode.nodeName === "node7"){
          
          this.animationPlayed = false;
        
          this.anims.play('vivianrummagingLook',true);
  
        }else if(this.currentDictNode.nodeName === "node9"){
          
          this.animationPlayed = false;
        
          this.anims.play('vivianrummagingLook',true);
  
        }else if(this.currentDictNode.nodeName === "nodeA" && this.inDialogue === false){
          
          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"SOUNDS LIKE A FAIR PRICE",true);
          this.scene.npcChoice1.textWob();
          this.scene.npcChoice1.setScrollFactor(0);
          this.scene.npcChoice1.addHitbox();
          this.scene.npcChoice1.setScale(.8);

          //display currency the player has on screen
          inventoryKeyEmitter.emit(inventoryKey.displayCurrency);

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
            if(shell.currency >= 999){
              //progress to node branch with state name node5
              this.progressNode("node8",true);

              //set flag that player is rich as they could buy the lantern
              if(this.selectiveFlagAdded === false){
                inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"cleaningRich");
              }

              //plays animation of vivian shocked and sfx agian.
              if(!this.animationPlayed){

                this.animationPlayed = true;

                this.anims.play('vivianrummagingShock');
                this.scene.initSoundEffect('foxSFX','1',0.05);

                let temp = this;
                setTimeout(function () {
                  temp.animationPlayed = false;
              }, 500);

            } 
              

            }else{

               this.progressNode("node14",true);

               //hide currency
               inventoryKeyEmitter.emit(inventoryKey.displayCurrency);

            }

            
            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;
            
            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

             this.inDialogue = false;

             

          },this);

          //dialogue option for no.
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"THAT SOUNDS LIKE A SCAM",true);
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

        }else if(this.currentDictNode.nodeName === "node10"){

          if(this.doOnce === false){

            this.doOnce = true;

            if(!this.animationPlayed){

              this.animationPlayed = true;

              //subtract amount from players currency
              let currencyObject = {
                  changeType:'-',
                  changeAmount:999,
              };
                inventoryKeyEmitter.emit(inventoryKey.changeCurrency,currencyObject);

              //check flag for lantern
              //make a temp object
              let object = {
                  flagToFind: "obtained_lantern",
                  foundFlag: false,
              };

              //call the emitter to check if the value already was picked up.
              inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

              //give player lantern
              if(object.foundFlag === false){

                //used to tell if the item was added
                let addedToInventory = {
                    added: false
                };
                let item = oneTimeItemArray.obtained_lantern;
                inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);

                //give lanturn flag
                //now to add the flag to the player data so the player cant open this container multiple times.
                inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,object.flagToFind);
              }

              //spawn fake lantern that disapears.
              this.scene.initFakeItemDropWithSpeed(this.x+30 , this.y-20 ,21,1000);
              
              //play animation of giving lantern // have the animation player after a period of time
              //or if dialogue is skipped through, then make sure to destroy fake drop on next node.
              this.anims.play('vivianrummagingGiveItem').once('animationcomplete', () => {
                    this.anims.play('vivianrummagingLook',true);
                    this.animationPlayed = false;
                });

            
              let temp = this;
              setTimeout(function () {
                temp.animationPlayed = false;
              }, 500);

            }

          }
      

        }else if(this.currentDictNode.nodeName === "node10"){
          this.doOnce = false;

        }else if(this.currentDictNode.nodeName === "node25" && this.inDialogue === false){

           this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"FINE, I WILL PLAY YOUR GAME",true);
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

            //check player currency, if player has enough then pro
            this.progressNode("node26",true);

             //set flag for yes but poor
            if(this.selectiveFlagAdded === false){
              inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"cleaningNice");
            }
  
            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;
            
            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

            this.inDialogue = false;

          },this);

          //dialogue option for no.
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"YAH NO THANKS...",true);
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
            this.progressNode("node29");

             //set flag for yes but poor
            if(this.selectiveFlagAdded === false){
              inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"cleaningMean");
            }

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

            this.inDialogue = false;

          },this);
          
          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;
        }else if(this.currentDictNode.nodeName === "node" && this.inDialogue === false){


        }else{

          
        }

        if(this.currentDictNode.nodeName === "node28" || this.currentDictNode.nodeName === "node31"){


        }
      }
    //otherwise if vivian has already been talked to in this scene, player her dialogue telling the player to leave
    }else{

      let selective = "cleaningNice";

      let vivianDialogue1 = {
      flagToFind: "cleaningRich",
      foundFlag: false,
      };
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue1);
      if(vivianDialogue1.foundFlag === true){
        selective = "cleaningRich";
      }

      let vivianDialogue2 = {
      flagToFind: "cleaningMean",
      foundFlag: false,
      };
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue2);
      if(vivianDialogue2.foundFlag === true){
        selective = "cleaningMean";
      }

      this.nodeHandler("vivian","Behavior1",selective);


    }

      

      
  }

  //minigameshop logic
  minigameShop(){

      let selective = "minigameIntro";

      let vivianDialogue1 = {
        flagToFind: "obtained_lantern",
        foundFlag: false,
      };
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue1);
      if(vivianDialogue1.foundFlag === true){
        selective = "minigameRepeat";
      }

      let vivianDialogue2 = {
        flagToFind: "cleaningRich",
        foundFlag: false,
      };
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue2);
      if(vivianDialogue2.foundFlag === true){
        selective = "minigameRepeatRich";
      }

      //have to do things a bit differently
      //if the first node has not been activated then activate it. 
      this.nodeHandler("vivian","Behavior2",selective,);
      
      

      //console.log("this.scene.sceneTextBox.textInterupt: ",this.scene.sceneTextBox.textInterupt);
      //console.log("this.currentDictNode: ",this.currentDictNode);
      if(this.currentDictNode !== null){

        //orient the player so it looks like they are facing vivian.
        if(this.scene.player1.x < this.x){
          this.scene.player1.x = this.x-30;
          this.scene.player1.mainHitbox.x = this.x-30;
          this.scene.player1.flipXcontainer(false);
          this.anims.play('vivianShopIdleLeft',true);
        }else{
          this.scene.player1.x = this.x+30;
          this.scene.player1.mainHitbox.x = this.x+30;
          this.scene.player1.flipXcontainer(true);
          this.anims.play('vivianShopIdleRight',true);
        }
        

        //state machine for dialogue 
        //console.log("this.currentDictNode:", this.currentDictNode);
        //console.log("this.inDialogue", this.inDialogue);
        //console.log(" this.activatedTradeUI: ", this.activatedTradeUI);
        if(this.currentDictNode.nodeName === "node4" && this.inDialogue ===false){

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-280,'charBubble',"I WANT TO PLAY YOUR GAME. ",true);
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

            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = false;

            //progress to node branch with state name node5
            this.progressNode("node5");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();
            this.scene.npcChoice5.destroy();

          },this);

          this.scene.npcChoice5 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-240,'charBubble',"HOW DO I PLAY? ",true);
          this.scene.npcChoice5.textWob();
          this.scene.npcChoice5.setScrollFactor(0);
          this.scene.npcChoice5.addHitbox();
          this.scene.npcChoice5.setScale(.8);

          //set up dialogue option functionality so they work like buttons
          this.scene.npcChoice5.on('pointerover',function(pointer){
            this.scene.initSoundEffect('buttonSFX','1',0.05);
            this.scene.npcChoice5.setTextTint(0xff7a7a);
          },this);

          this.scene.npcChoice5.on('pointerout',function(pointer){
              this.scene.npcChoice5.clearTextTint();
          },this);

          this.scene.npcChoice5.on('pointerdown', function (pointer) {
            
            this.inDialogue = false;

            this.scene.initSoundEffect('buttonSFX','2',0.05);

            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = false;

            //progress to node branch with state name node5
            this.progressNode("node6");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();
            this.scene.npcChoice5.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-200,'charBubble',"I WANT TO BUY SOMETHING. ",true);
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

            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = false;

            //progress to node branch with state name node10 special function which ignores lock out of text
            this.progressNode("node8",true);

            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();
            this.scene.npcChoice5.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-160,'charBubble',"WHO ARE YOU? ",true);
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
          this.progressNode("node9");

          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();
          this.scene.npcChoice5.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice4 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-120,'charBubble',"JUST LOOKING AROUND... ",true);
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
          this.progressNode("node15");

          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();
          this.scene.npcChoice4.destroy();
          this.scene.npcChoice5.destroy();

          },this);


          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;

        }else if(this.currentDictNode.nodeName === "node7" && this.inDialogue ===false){

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-280,'charBubble',"LETS PLAY YOUR GAME. ",true);
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

            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = false;

            //progress to node branch with state name node5
            this.progressNode("node20");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();
            this.scene.npcChoice5.destroy();

          },this);

          this.scene.npcChoice5 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-240,'charBubble',"NO THANKS. ",true);
          this.scene.npcChoice5.textWob();
          this.scene.npcChoice5.setScrollFactor(0);
          this.scene.npcChoice5.addHitbox();
          this.scene.npcChoice5.setScale(.8);

          //set up dialogue option functionality so they work like buttons
          this.scene.npcChoice5.on('pointerover',function(pointer){
            this.scene.initSoundEffect('buttonSFX','1',0.05);
            this.scene.npcChoice5.setTextTint(0xff7a7a);
          },this);

          this.scene.npcChoice5.on('pointerout',function(pointer){
              this.scene.npcChoice5.clearTextTint();
          },this);

          this.scene.npcChoice5.on('pointerdown', function (pointer) {
            
            this.inDialogue = false;

            this.scene.initSoundEffect('buttonSFX','2',0.05);

            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = false;

            //progress to node branch with state name node5
            this.progressNode("node21");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();
            this.scene.npcChoice5.destroy();

          },this);
        }else if(this.currentDictNode.nodeName === "node8" && this.activatedTradeUI === false){

            this.activatedTradeUI = true;

            //makes sure dialogue does not progress and finish while we are in the shop ui.
            //if it does finish... then the text box closes while in ui causing softlock once closing shop ui.
            this.dialogueCatch = true;
            
            let object = {
              NPCRef: this,
            };
    
            this.buyBack = [];

            this.buyBack.push(
              {
                itemID: 16,
                itemName: 'FUEL ICHOR',
                itemDescription: 'FUEL FOR A LANTERN.',
                itemStackable: 1,
                itemAmount: 1,
                itemType: "ammo",
                sellValue: 5
              }
            );
    
            this.buyBack.push(
              {
                itemID: 21,
                itemName: 'LANTURN',
                itemDescription: 'PROVIDES LIGHT IF FUEL IS EQUIPT. TAKES UP RING SLOT.',
                itemStackable: 0,
                itemAmount: 1,
                itemType: "ring",
                sellValue: 999
              }
            );
    
            //make a special object to pass to the listener
            //last part of object is used for sell only once. should be an arrays of bools for each entry.
            let buyArray = {
              array: this.buyBack,
              sellMultiplier: 1,
              buyOnce: [false,true],
              buyOnceFlags: ["null","obtained_lantern"]
            };
    
            //send that object to the emiter so it can be set in the gamehud
            inventoryKeyEmitter.emit(inventoryKey.setUpBuyArray, buyArray);
    
            inventoryKeyEmitter.emit(inventoryKey.activateShop,this.scene,object);
    
            this.scene.sceneTextBox.textInterupt = true;
        //state, to warp player into the minigame
        }else if((this.currentDictNode.nodeName === "node5" || this.currentDictNode.nodeName === "node20") && this.startMinigame === false){
          //set dialogue catch to true
          this.startMinigame = true;
          this.startMinigameActivated = false;

        }else if((this.currentDictNode.nodeName === "node5" || this.currentDictNode.nodeName === "node20") && this.startMinigame === true && this.startMinigameActivated === false){
          this.startMinigameActivated = true;
          this.dialogueCatch = true;
          //warp player to new gameplay scene
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

            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
        
            //then we set the correct location values to the scene transition data.
            playerDataObject.saveX = 576;
            playerDataObject.saveY = 698;
            playerDataObject.playerSex = this.scene.playerSex;
            playerDataObject.playerLocation = "minigameShed";

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

            //warps player to the next scene
            this.scene.destination = "minigameShed";
            this.scene.cameras.main.fadeOut(500, 0, 0, 0);

        }
  
      }
  }

  voreSequence(){

    let selective;
    if(this.scene.playerSex === 0){
      selective = "voreSequenceM";
    }else{
      selective = "voreSequenceF";
    }
    this.vivianThatDefeatedPlayer = true;

    this.nodeHandler("vivian","Behavior3",selective);

     if(this.currentDictNode !== null){

        //state machine for dialogue 
        if(this.currentDictNode.nodeName === "node1"){

          //let this vivian know shes the one who beat the player. 
         

          //calls emitter to show the tabtoskip graphic
          skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

          //hide player 
          this.scene.player1.visible = false;

          this.scene.initSoundEffect('creakSFX','wood',0.05);

          // loop through vivian npc array to cancel all vivian chest tells.
          for(let counter = 0; counter < this.scene.vivianArray.length;counter++){
            //console.log(" this.scene.vivianArray[counter]: ", this.scene.vivianArray[counter]);
            this.scene.vivianArray[counter].stopTell = true;
          }

          //have the camera follow vivian.
          this.scene.mycamera.startFollow(this);

           if(this.animationPlayed === false){
        
              this.animationPlayed = true;
              this.dialogueCatch = true;
             
              this.anims.play('vivianGameVorePopup').once('animationcomplete', () => {
                this.anims.play('vivianGameVoreGrabbed',true);
                this.animationPlayed = false;
                this.scene.player1.visible = false;
                this.dialogueCatch = false;
              });
              
            }

        }else if(this.currentDictNode.nodeName === "node3"){
          //hide player 
          //hide player
          this.scene.player1.visible = false;
          if(this.animationPlayed === false){
            this.animationPlayed = true;
            this.dialogueCatch = true;

            //apply interuption to dialogue
            this.scene.sceneTextBox.textInterupt = true;

            //hide ui and dialogue box.
            this.scene.sceneTextBox.visible = false;

            //play animation and on complete allow w to be pressed.
            let temp = this;
            setTimeout(function(){
              temp.scene.initSoundEffect('swallowSFX','5',0.1);
            },800);

            this.anims.play('vivianGameVoreSwallow').once('animationcomplete', () => {
              this.anims.play('vivianGameVoreBellyRub',true);
              this.scene.sceneTextBox.amountWIsPressed++;
              this.scene.sceneTextBox.textInterupt = false;
              this.animationPlayed = false;
              //hide ui and dialogue box.
              this.progressNode("",true);
              this.scene.sceneTextBox.visible = true;
              this.dialogueCatch = false;

              //new function to apply a looping sound to npc
              this.setLoopingSound('stomachSFX','18',0.005,800);
            });
        }
        }else if(this.currentDictNode.nodeName === "node5"){
          this.interuptSoundLoop('stomachSFX','10',0.1,1000);
          this.anims.play('vivianGameVoreBellyStruggle1',true);
        }else if(this.currentDictNode.nodeName === "node6"){
 
          if(this.animationPlayed === false){
            this.animationPlayed = true;
            this.dialogueCatch = true;

            this.killSoundLoop();

            //apply interuption to dialogue
            this.scene.sceneTextBox.textInterupt = true;

            //hide ui and dialogue box.
            this.scene.sceneTextBox.visible = false;

            this.scene.initSoundEffect('stomachSFX','10',0.1);
            
            
            //play animation and on complete allow w to be pressed.
            this.anims.play('vivianGameVoreBellyRumble').once('animationcomplete', () => {
              this.scene.initSoundEffect('weaponSFX','smack',0.1);
              this.anims.play('vivianGameVoreBellySquish').once('animationcomplete', () => {
              
                this.anims.play('vivianGameVoreBellyStruggle2',true);
                this.scene.sceneTextBox.amountWIsPressed++;
                this.scene.sceneTextBox.textInterupt = false;
                this.animationPlayed = false;
                //hide ui and dialogue box.
                this.progressNode("",true);
                this.scene.sceneTextBox.visible = true;
                this.dialogueCatch = false;

              //new function to apply a looping sound to npc
              this.setLoopingSound('stomachSFX','14',0.1,1000);
               });
        
            });
        }

        }else if(this.currentDictNode.nodeName === "node8"){
          //hide player 
          //hide player
          this.scene.player1.visible = false;
          if(this.animationPlayed === false){
            this.animationPlayed = true;
            this.dialogueCatch = true;

            //apply interuption to dialogue
            this.scene.sceneTextBox.textInterupt = true;

            this.killSoundLoop();

            //hide ui and dialogue box.
            this.scene.sceneTextBox.visible = false;

           //play digestion sound.
           this.scene.initSoundEffect('stomachSFX','1',0.1);
           //and burp sound
            this.scene.initSoundEffect('burpSFX','1',0.1);
            //play animation and on complete allow w to be pressed.
            this.anims.play('vivianGameVoreBellyDigestion').once('animationcomplete', () => {
              this.scene.initSoundEffect('stomachSFX','3',0.1);

                this.anims.play('vivianGameVoreBellyIdle1').once('animationcomplete', () => {
                  this.scene.initSoundEffect('stomachSFX','4',0.1);

                  this.anims.play('vivianGameVoreBellyIdle2').once('animationcomplete', () => {
                     //spit up sound effect.
                    this.scene.initSoundEffect('swallowSFX','4',0.02);

                    this.anims.play('vivianGameVoreBellyCloths').once('animationcomplete', () => {
                      this.anims.play('vivianGameVoreBellyIdle3',true);
                      this.setLoopingSound('jumpySFX','3',0.04,1000);
                      this.scene.sceneTextBox.amountWIsPressed++;
                      this.scene.sceneTextBox.textInterupt = false;
                      this.animationPlayed = false;
                      //hide ui and dialogue box.
                      this.progressNode("",true);
                      this.scene.sceneTextBox.visible = true;
                      this.dialogueCatch = false;
                    });
                  });
                });
            });
        }
        }else if(this.currentDictNode.nodeName === "node9"){
        
        
        }else if(this.currentDictNode.nodeName === "node10" && this.startGameover === false){
          //set dialogue catch to true
          this.startGameover = true;
          this.startGameoverActivated = false;

        }else if(this.currentDictNode.nodeName === "node10" && this.startGameover === true && this.startGameoverActivated === false){
          this.startGameoverActivated  = true;
          this.dialogueCatch = true;

          this.scene.gameoverLocation = "vivianGameover";
          this.scene.enemyThatDefeatedPlayer = "vivianVore";
          this.scene.changeToGameover();
          this.scene.sceneTextBox.textInterupt = true;
          this.scene.sceneTextBox.textCoolDown = true;
        }
      }
  }

  tfSequence(){
    //temp route to vore logic since tf isnt complete yet.
    this.voreSequence();

    /*this.nodeHandler("vivian","Behavior3","tfSequence");
     if(this.currentDictNode !== null){

        //state machine for dialogue 
        if(this.currentDictNode.nodeName === "node4"){

        }else if(this.currentDictNode.nodeName === "node8" && this.startGameover === false){
          //set dialogue catch to true
          this.startGameover = true;
          this.startGameoverActivated = false;

        }else if(this.currentDictNode.nodeName === "node8" && this.startGameover === true && this.startGameoverActivated === false){
          this.startGameoverActivated  = true;
          this.dialogueCatch = true;


        }
      }*/
  }

  playerWinsLantern(){
    this.nodeHandler("vivian","Behavior3","playerWinsLantern");

     if(this.currentDictNode !== null){

      this.scene.player1.x = this.x-30;
      this.scene.player1.flipXcontainer(false);

        //state machine for dialogue 
        if(this.currentDictNode.nodeName === "node1"){

          this.scene.initSoundEffect('creakSFX','wood',0.05);

          // loop through vivian npc array to cancel all vivian chest tells.
          for(let counter = 0; counter < this.scene.vivianArray.length;counter++){
            //console.log(" this.scene.vivianArray[counter]: ", this.scene.vivianArray[counter]);
            this.scene.vivianArray[counter].stopTell = true;
          }

           if(this.animationPlayed === false){
        
              this.animationPlayed = true;
              this.dialogueCatch = true;
             
              this.anims.play('vivianLosePopUp').once('animationcomplete', () => {
                this.anims.play('vivianLoseIdle',true);
                this.animationPlayed = false;
                this.dialogueCatch = false;

              });
              
            }


        }else if(this.currentDictNode.nodeName === "node3" && this.startGameover === false){
          //set dialogue catch to true
          this.startGameover = true;
          this.startGameoverActivated = false;

          if(this.doOnce === false){

            this.doOnce = true;

            if(!this.animationPlayed){

              this.animationPlayed = true;

              //check flag for lantern
              //make a temp object
              let object = {
                  flagToFind: "obtained_lantern",
                  foundFlag: false,
              };

              //call the emitter to check if the value already was picked up.
              inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

              //give player lantern
              if(object.foundFlag === false){

                //used to tell if the item was added
                let addedToInventory = {
                    added: false
                };
                let item = oneTimeItemArray.obtained_lantern;
                inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);

                //give lanturn flag
                //now to add the flag to the player data so the player cant open this container multiple times.
                inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,object.flagToFind);
              }

              //spawn fake lantern that disapears.
              this.scene.initFakeItemDropWithSpeed(this.x+30 , this.y-30 ,21,1000);
              
              //play animation of giving lantern // have the animation player after a period of time
              //or if dialogue is skipped through, then make sure to destroy fake drop on next node.
              this.anims.play('vivianLoseGiveItem').once('animationcomplete', () => {
                    this.anims.play('vivianLoseIdle',true);
                    this.animationPlayed = false;
                });

            
              let temp = this;
              setTimeout(function () {
                temp.animationPlayed = false;
              }, 500);

            }

          }

        }else if(this.currentDictNode.nodeName === "node3" && this.startGameover === true && this.startGameoverActivated === false){
          this.startGameoverActivated  = true;
          this.dialogueCatch = true;

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

            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
        
            //then we set the correct location values to the scene transition data.
            playerDataObject.saveX = 576;
            playerDataObject.saveY = 698;
            playerDataObject.playerSex = this.scene.playerSex;
            playerDataObject.playerLocation = "minigameShed";

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

            //warps player to the next scene
            this.scene.destination = "messyShed";
            this.scene.cameras.main.fadeOut(500, 0, 0, 0);



        }
      }
  }

  playerWinsShell(){
    this.nodeHandler("vivian","Behavior3","playerWinsShell");

     if(this.currentDictNode !== null){

      this.scene.player1.x = this.x-30;
      this.scene.player1.flipXcontainer(false);

        //state machine for dialogue 
        if(this.currentDictNode.nodeName === "node1"){

          this.scene.initSoundEffect('creakSFX','wood',0.05);

          // loop through vivian npc array to cancel all vivian chest tells.
          for(let counter = 0; counter < this.scene.vivianArray.length;counter++){
            //console.log(" this.scene.vivianArray[counter]: ", this.scene.vivianArray[counter]);
            this.scene.vivianArray[counter].stopTell = true;
          }

           if(this.animationPlayed === false){
        
              this.animationPlayed = true;
              this.dialogueCatch = true;
             
              this.anims.play('vivianLosePopUp').once('animationcomplete', () => {
                this.anims.play('vivianLoseIdle',true);
                this.animationPlayed = false;
                this.dialogueCatch = false;

                 //display currency the player has on screen
                  inventoryKeyEmitter.emit(inventoryKey.displayCurrency);
              });
              
            }

        }else if(this.currentDictNode.nodeName === "node3" && this.startGameover === false){

          //set dialogue catch to true
          this.startGameover = true;
          this.startGameoverActivated = false;

          if(this.doOnce === false){

            this.doOnce = true;

            if(!this.animationPlayed){

              this.animationPlayed = true;

              let shellReward;
              console.log("this.scene.player1.dropChance: ",this.scene.player1.dropChance);
              if(this.scene.player1.dropChance > 1 && this.scene.player1.dropAmount > 1){
                //generate shell reward amount baded on rng + mimic ring bonus + rapier bonus
                shellReward = Math.floor(((Math.random() * 50) + 50)) + Math.floor(((Math.random() * 20) + 10)) + Math.floor(((Math.random() * 20) + 10));
                console.log("player wearing mimic ring for shell bonus for both drop chance and amount",shellReward );
              }else if(this.scene.player1.dropChance > 1 || this.scene.player1.dropAmount > 1){
                //generate shell reward amount baded on rng + mimic ring bonus + rapier bonus
                shellReward = Math.floor(((Math.random() * 50) + 50)) + Math.floor(((Math.random() * 20) + 10));
                console.log("player wearing mimic ring for shell bonus",shellReward );
              }else{
                shellReward =  Math.floor(((Math.random() * 50) + 50));

                console.log("player getting default reward: ",shellReward );
              }

              //subtract amount from players currency
              let currencyObject = {
                  changeType:'+',
                  changeAmount:shellReward,
              };

              inventoryKeyEmitter.emit(inventoryKey.changeCurrency,currencyObject);

              //spawn fake lantern that disapears.
              this.scene.initFakeItemDropWithSpeed(this.x+30 , this.y-30 ,-1,800);
              
              //play animation of giving lantern // have the animation player after a period of time
              //or if dialogue is skipped through, then make sure to destroy fake drop on next node.
              this.anims.play('vivianLoseGiveItem').once('animationcomplete', () => {
                    this.anims.play('vivianLoseIdle',true);
                    this.animationPlayed = false;
                });

            
              let temp = this;
              setTimeout(function () {
                temp.animationPlayed = false;
              }, 500);

            }

          }

        }else if(this.currentDictNode.nodeName === "node3" && this.startGameover === true && this.startGameoverActivated === false){
          this.startGameoverActivated  = true;
          this.dialogueCatch = true;

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

            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
        
            //then we set the correct location values to the scene transition data.
            playerDataObject.saveX = 576;
            playerDataObject.saveY = 698;
            playerDataObject.playerSex = this.scene.playerSex;
            playerDataObject.playerLocation = "minigameShed";

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

            //warps player to the next scene
            this.scene.destination = "messyShed";
            this.scene.cameras.main.fadeOut(500, 0, 0, 0);

        }
      }

  }

  //called by the shop ui.
  sellButton(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'OK,                      '+
    'I WILL TAKE THAT OFF     '+
    'YOUR HANDS               ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianSquish');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);
    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  //called by the shop ui.
  buyButton(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'DEAL!                    '+
    'HOPE IT IS USEFUL TO     '+
    'YOU!                     ';

    //console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianHappy');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);

    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  buyOnceButton(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'WAIT REALLY?!?!?         '+
    'I MEAN...                '+
    'DEAL!                    ';

    //console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianShocked');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);

    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
    //sneaky could put money bags flag set here, so its added with the obtained lantern flag.
    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"cleaningRich");
    //other alternative is have a array of arrays that have flag string in them. that way multiple flags could be activaten in the buycontainer
  }

  //called by the shop ui.
  buyButtonFail(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'YOU DONT HAVE ENOUGH.    '+
    'COME ON....              '+
    'DONT WASTE MY TIME.      ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianAngry');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);
    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  //called by the shop ui.
  sellSwitch(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'SELL HUH?                '+
    'JUST DONT SELL ME JUNK   '+
    'PLEASE...                ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianSquish');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);
    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  //called by the shop ui.
  buySwitch(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'WHAT ARE YA BUYIN? HEH.  '+
    '                         '+
    '                         ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('vivianSmug');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);
    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  gameOverVore(){
    this.anims.play('vivianVoreGameover',true);
  }

  
}