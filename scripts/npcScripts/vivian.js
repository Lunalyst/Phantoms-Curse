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
       }

       this.selectiveFlagAdded = false;

       this.doOnce = false;


  }

  //overwrites base npc classes function with flagging logic specific to vivian.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'rummaging'){
      this.rummaging();
    }else if(this.npcType === 'minigameShop'){
      this.minigameShop();
    }else{
      this.default();
    }
  }

  //for this npc we need to overwrite the activatino function to account for the under water animation.
  activateNpc(){

    //if the player meets activation requiements for the sign display the text box
    if(this.safeToSpeak === true && this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.scene.player1.mainHitbox.body.blocked.down && this.activated === false){

      if(this.popOut === false){
        console.log("popout is false");
        //logic to start dialogue
        this.dialogueLogicStart();

        //calls function overwritten children class to handle npc logic.
        this.flagLogic();
          
        //ending dialoguce logic.
        this.dialogueLogicEnd();
      }else{
        console.log("popout is true");
        this.activated = true;
        this.scene.initSoundEffect('creakSFX','wood',0.05);
        //this.scene.initSoundEffect('splashSFX','istaraGetUp',0.05);
        this.anims.play('vivianPopUp').once('animationcomplete', () => {
          this.anims.play('vivianShopIdle',true);
          this.popOut = false;
          this.activated = false;
        });
      }
          
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
        console.log("this.currentDictNode.nodeName: ", this.currentDictNode.nodeName );
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

            console.log("shell.currency: ",shell.currency);
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


  minigameShop(){
    

      this.nodeHandler("vivian","Behavior2","minigameIntro");

      console.log("this.scene.sceneTextBox.textInterupt: ",this.scene.sceneTextBox.textInterupt);
      console.log("this.currentDictNode: ",this.currentDictNode);
      if(this.currentDictNode !== null){
        //state machine for dialogue 
        console.log("this.currentDictNode:", this.currentDictNode);
        console.log("this.inDialogue", this.inDialogue);
        console.log(" this.activatedTradeUI: ", this.activatedTradeUI);
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
            
            //sets position of player for the hug.
            this.scene.player1.mainHitbox.x = this.x+20;
            this.scene.player1.mainHitbox.y = this.y-3;
            this.scene.player1.x = this.scene.player1.mainHitbox.x;
            this.scene.player1.y = this.scene.player1.mainHitbox.y;

            //progress to node branch with state name node5
            this.progressNode("node5");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();
            this.scene.npcChoice4.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-240,'charBubble',"I WANT TO BUY SOMETHING. ",true);
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

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-200,'charBubble',"WHO ARE YOU? ",true);
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

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice4 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-160,'charBubble',"I AM JUST LOOKING AROUND... ",true);
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

          },this);


          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;

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
            let buyArray = {
              array: this.buyBack,
              sellMultiplier: 1
            };
    
            //send that object to the emiter so it can be set in the gamehud
            inventoryKeyEmitter.emit(inventoryKey.setUpBuyArray, buyArray);
    
            //call emitter to tell if the onetime item is present in the inventory.
            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
    
    
            inventoryKeyEmitter.emit(inventoryKey.activateShop,this.scene,object);
    
            this.scene.sceneTextBox.textInterupt = true;
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

  
}