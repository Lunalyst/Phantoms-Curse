//basic npc class of lunalyst.
class lunalyst extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'lunalyst');

      this.anims.create({key: 'lunalystIdle',frames: this.anims.generateFrameNames('lunalyst', { start: 1, end: 4 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'lunalystSkirtPull',frames: this.anims.generateFrameNames('lunalyst', { start: 5, end: 10 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'lunalystChairSleep',frames: this.anims.generateFrameNames('lunalyst', { start: 11, end: 14 }),frameRate: 2,repeat: -1});
      this.anims.create({key: 'lunalystChairWakeUp',frames: this.anims.generateFrameNames('lunalyst', { start: 15, end: 17 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'lunalystChairIdle',frames: this.anims.generateFrameNames('lunalyst', { start: 17, end: 20 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunalystMaleHugStart',frames: this.anims.generateFrameNames('lunalyst', { start: 21, end: 24 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'lunalystMaleHug',frames: this.anims.generateFrameNames('lunalyst', { start: 24, end: 28 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunalystMaleHugEnd',frames: this.anims.generateFrameNames('lunalyst', { start: 29, end: 31 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'lunalystFemaleHugStart',frames: this.anims.generateFrameNames('lunalyst', { start: 32, end: 35 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'lunalystFemaleHug',frames: this.anims.generateFrameNames('lunalyst', { start: 35, end: 39 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunalystFemaleHugEnd',frames: this.anims.generateFrameNames('lunalyst', { start: 40, end: 42 }),frameRate: 5,repeat: 0});

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
       this.hugging = false; 

       this.formattingText = false;
 

       if(this.npcType === 'devRoom'){
          this.anims.play('lunalystChairSleep');
       }else if(this.npcType === 'clearingTheWay'){
          this.anims.play('lunalystIdle');
       }

  }

  //overwrites base npc classes function with flagging logic specific to lunalyst.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'devRoom'){
      this.devRoom();
    }else if(this.npcType === 'clearingTheWay'){
      this.ClearingTheWay();
    }else{
      this.default();
    }
  }

  devRoom(){

    //check to see if flag already exists
    let lunaDevDialogue1 = {
      flagToFind: "lunaDevDialogue1",
      foundFlag: false,
    };

    let lunaDevDialogue2 = {
      flagToFind: "lunaDevDialogue2",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue1);

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue2);

    //if the flag is not found then apply dialoge start
    if(lunaDevDialogue1.foundFlag === false){

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";

      this.textToDisplay = 
      '                         '+
      '                         '+
      '                         '+
      'WHAT THE.....            '+
      'HOW DID YOU GET IN HERE? '+
      '                         '+
      'YOU SHOULD, PROBABLY     '+
      'TELL ME HOW GOT IN HERE. '+
      '                         '+
      'THIS PLACE IS A LITTLE   '+
      'HARD TO REACH.           '+
      '                         '+
      'OH AND DONT WORRY, IM    '+
      'NOT IM NOT OPPOSED TO    '+
      'VISITERS THOUGH.         '+
      'ANYWAY, I GOT TO GET     '+
      'BACK TO MY RESEARCH.     '+
      'EXITS BY THE HEATER.     ';
      

      this.profileArray = ['lunaSleeping','lunaNeutral','lunaKO','lunaHappy','lunaFingerTouch','lunaStarEyes']

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed)
      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        this.anims.play('lunalystChairSleep',true);
      }else if(this.scene.sceneTextBox.amountWIsPressed === 6){
        this.anims.play('lunalystChairIdle',true); 
        //since dialogue is done update with a flag saying the player talked to luna.
        //since the flag does not exist add it since the player has activated the first dialogue
        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaDevDialogue1.flagToFind);
      }else{
        this.anims.play('lunalystChairIdle',true); 
      }

    }else if(lunaDevDialogue1.foundFlag === true && lunaDevDialogue2.foundFlag === false){

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";
      

      if(this.scene.playerSex === 1){
        this.textToDisplay = 
        'OH? STILL STICKING       '+
        'AROUND?                  '+
        '                         '+

        'YOUR QUITE THE CUTE GIRL '+
        'YOU SHOULD BE CAREFUL.   '+
        '                         '+

        'THE CURSED LOVE EATING   '+
        'AND TRANSFORMING         '+
        'HUMANS LIKE YOUR SELF.   '+

        'I WAS HUMAN ONCE WHEN I  '+
        'WASHED UP HERE.          '+
        '                         '+

        'ONE OF THE BATS GOT ME A '+
        'WHILE BACK. BUT          '+
        'THANKFULLY I MANAGED TO  '+

        'GET LUCKY, AND NOT LOSE  '+
        'MY MIND.                 '+
        '                         '+

        'MY APPEARANCE IS ALSO    '+
        'SLIGHTLY DIFFERENT       '+
        'FROM THEM.               '+

        'WONDER WHY THAT IS.      '+
        '                         '+
        '                         ';
        
      }else{
        this.textToDisplay = 
        'OH? STILL STICKING       '+
        'AROUND?                  '+
        '                         '+

        'YOUR QUITE THE CUTE BOY  '+
        'YOU SHOULD BE CAREFUL.   '+
        '                         '+

        'THE CURSED LOVE EATING   '+
        'AND TRANSFORMING         '+
        'HUMANS LIKE YOUR SELF.   '+

        'I WAS HUMAN ONCE WHEN I  '+
        'WASHED UP HERE.          '+
        '                         '+

        'ONE OF THE BATS GOT ME A '+
        'WHILE BACK. BUT          '+
        'THANKFULLY I MANAGED TO  '+

        'GET LUCKY, AND NOT LOSE  '+
        'MY MIND.                 '+
        '                         '+

        'MY APPEARANCE IS ALSO    '+
        'SLIGHTLY DIFFERENT       '+
        'FROM THEM.               '+

        'WONDER WHY THAT IS.      '+
        '                         '+
        '                         ';

      }

      this.profileArray = ['lunaNeutral','lunaFingerTouch','lunaNeutral','lunaNeutral','lunaFingerTouch','lunaStarEyes','lunaNeutral','lunaHappy']

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed);

      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        this.anims.play('lunalystChairIdle',true); 
      }
    }else if(lunaDevDialogue1.foundFlag === true && lunaDevDialogue2.foundFlag === true && this.isSleeping === false){

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";

      this.textToDisplay = 
      'OH? STILL STICKING       '+
      'AROUND?                  '+
      '                         '+
      
      'MAKE YOUR SELF           '+
      'COMFORTABLE.             '+
      '                          '+

      'I HAVE BEEN TRYING TO    '+
      'CLEAR A PATH TO LOCKWOOD '+
      'IN MY SPARE TIME.        '+

      'ITS A NICE TOWN IN THE   '+
      'TREES. MOST CURSED HAVE  '+
      'TOUGH TIME REACHING IT.  '+

      'EVEN THOUGH IM CURSED    '+
      'OTHER WILD CURSED        '+
      'STILL TRY TO EAT ME.     '+

      'ITS ALMOST AS IF THEY    '+
      'KNOW IM NOT ONE OF THEM. '+
      '                         ';
      

      this.profileArray = ['lunaNeutral','lunaHappy','lunaKO','lunaHappy','lunaAngryEyes','lunaCry']

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed)
      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        this.anims.play('lunalystChairIdle',true); 
      }
    }else if(lunaDevDialogue1.foundFlag === true && lunaDevDialogue2.foundFlag === true){

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";

      this.textToDisplay = 
      '                         '+
      '                         '+
      '                         '+

      'WHAT THE.....            '+
      'OH NO YOUR BACK.         '+
      '                         '+

      'YOU SHOULD, PROBABLY     '+
      'TELL ME HOW GOT IN HERE  '+
      'AGIAN. IM WORRIED.       '+

      'THIS PLACE SHOULD BE     '+
      'HARD TO REACH, BUT MIGHT '+
      'NOT BE CURRENTLY.        '+

      'IF YOU CAN GET IN HERE   '+
      'THE CURSED LIKELY CAN    '+
      'AS WELL.                 '+

      'ANYWAY, MAKE YOURSELF    '+
      'CONFORTABLE IF YOU WISH. '+
      'EXITS BY THE HEATER.     ';
      

      this.profileArray = ['lunaSleeping','lunaNeutral','lunaKO','lunaHappy','lunaFingerTouch','lunaStarEyes']

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed)
      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        this.anims.play('lunalystChairSleep',true);
      }else if(this.scene.sceneTextBox.amountWIsPressed === 6){
        this.anims.play('lunalystChairIdle',true); 
        //since dialogue is done update with a flag saying the player talked to luna.
        //since the flag does not exist add it since the player has activated the first dialogue
        this.isSleeping = false;
      }else{
        this.anims.play('lunalystChairIdle',true); 
      }
    }
    
  
  }

  ClearingTheWay(){
    
    //check to see if flag already exists
    let lunaCTWDialogue1 = {
      flagToFind: "lunaCTWDialogue1",
      foundFlag: false,
    };

    let lunaCTWDialogue2 = {
      flagToFind: "lunaCTWDialogue2",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaCTWDialogue1);

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaCTWDialogue2);
    console.log("lunaCTWDialogue1.foundFlag: ", lunaCTWDialogue1.foundFlag);

    if(lunaCTWDialogue1.foundFlag === false){

      this.nodeHandler("lunalyst","Behavior2","lunaCTWDialogue1");

      //if(){

      //}


    }else if(lunaCTWDialogue1.foundFlag === true){

      this.nodeHandler("lunalyst","Behavior2","lunaCTWDialogue2");

      if(this.currentDictNode !== null){
        //state machine for dialogue 
        console.log("this.currentDictNode:", this.currentDictNode);
        if(this.currentDictNode.nodeName === "node4" && this.inDialogue ===false){

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-280,'charBubble',"CAN I GET HUG? ",true);
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
            
            //sets position of player for the hug.
            this.scene.player1.mainHitbox.x = this.x+20;
            this.scene.player1.mainHitbox.y = this.y-3;
            this.scene.player1.x = this.scene.player1.mainHitbox.x;
            this.scene.player1.y = this.scene.player1.mainHitbox.y;

            //progress to node branch with state name node5
            this.progressNode("node5");

            this.hugging = true;

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-240,'charBubble',"GOT ANY SUPPPLIES? ",true);
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
            this.progressNode("node10");

            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();
            this.scene.npcChoice3.destroy();

          },this);

          //create dialogue buttons for player choice
          this.scene.npcChoice3 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-200,'charBubble',"SEE YOU LATER. ",true);
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

          this.scene.sceneTextBox.textInterupt = false;
          
          //progress to node branch with state name node5
          this.progressNode("node12");

          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();
          this.scene.npcChoice3.destroy();

          },this);


          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;

        }else if(this.currentDictNode.nodeName === "node6"&& this.animationPlayed === false){
            console.log("activating node6 state machine ")
            this.scene.player1.visible = false;
        
            if(this.animationPlayed === false){
        
              this.animationPlayed = true;
              if(this.scene.playerSex === 1){
                this.anims.play('lunalystFemaleHugStart').once('animationcomplete', () => {
                  this.anims.play('lunalystFemaleHug',true);
                  this.animationPlayed = false;
                  this.scene.player1.visible = false;
                });
              }else{
                  this.anims.play('lunalystMaleHugStart').once('animationcomplete', () => {
                    this.anims.play('lunalystMaleHug',true);
                    this.animationPlayed = false;
                    this.scene.player1.visible = false;
                  });
                } 
              }
        }else if(this.currentDictNode.nodeName === "node7"&& this.animationPlayed === false){

              this.scene.player1.visible = false;

              if(this.scene.playerSex === 1){
                this.anims.play('lunalystFemaleHug',true);
              }else{
                this.anims.play('lunalystMaleHug',true);
              } 
        }else if(this.currentDictNode.nodeName === "node8" && this.animationPlayed === false){
              this.animationPlayed = true;
              //apply interuption to dialogue
              this.scene.sceneTextBox.textInterupt = true;

              if(this.scene.playerSex === 1){

                this.anims.play('lunalystFemaleHugEnd',true).once('animationcomplete', () => {
                  this.anims.play('lunalystIdle',true);

                  //position the player to the correct place when they leave the animation.

                  this.scene.player1.mainHitbox.x = this.x+20;
              this.scene.player1.mainHitbox.y = this.y-3;

                  this.scene.player1.visible = true;
                  this.animationPlayed = false
                  this.scene.sceneTextBox.textInterupt = false;

                });
              }else{
                  this.anims.play('lunalystMaleHugEnd',true).once('animationcomplete', () => {
                  this.anims.play('lunalystIdle',true);

                  this.scene.player1.mainHitbox.x = this.x+20;
                  this.scene.player1.mainHitbox.y = this.y-3;

                  this.scene.player1.visible = true;
                  this.animationPlayed = false;
                  this.scene.sceneTextBox.textInterupt = false;
                });
              } 
        }else if(this.currentDictNode.nodeName === "node9"){
              this.anims.play('lunalystIdle',true);
              this.scene.player1.visible = true;
        }else if(this.currentDictNode.nodeName === "node11"&& this.activatedTradeUI === false){
            
            this.activatedTradeUI = true;
            
            let object = {
              NPCRef: this,
            };
    
            this.buyBack = this.generateBuyBack();
    
            this.buyBack.push(
              {
                itemID: 16,
                itemName: 'FUEL ICHOR',
                itemDescription: 'FUEL FOR A LANTURN.',
                itemStackable: 1,
                itemAmount: 1,
                itemType: "ammo",
                sellValue: 5
              }
            );
    
            this.buyBack.push(
              {
                itemID: 20,
                itemName: 'PLAIN CLOTHS',
                itemDescription: 'SIMPLE COMFY OUTFIT.',
                itemStackable: 0,
                itemAmount: 1,
                itemType: "vanity",
                sellValue: 10
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
                sellValue: 40
              }
            );
    
            //make a special object to pass to the listener
            let buyArray = {
              array: this.buyBack,
              sellMultiplier: 1.8
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
  }

  //called by the shop ui.
  sellButton(){

    //defines a line of dialogue to be displayed while in the shop ui
    this.scene.sceneTextBox.soundType = "lightVoice";

    this.textToDisplay += 
    'I CAN TAKE THOSE OFF YOUR'+
    'HANDS.                   '+
    '                         ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('lunaStarEyes');

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
    'ENJOY!                   '+
    'THANKS FOR THE PURCHASE. '+
    '                         ';

    //console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('lunaNeutral');

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
    'SORRY, BUT IT LOOKS LIKE '+
    'YOU DONT HAVE ENOUGH     '+
    'SHELL.                   ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('lunaNeutral');

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
    'LETS SEE WHAT YOU GOT.   '+
    '                         '+
    '                         ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('lunaNeutral');

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
    'HERES WHAT I GOT.        '+
    'SEE ANYTHING YOU LIKE?   '+
    '                         ';

    console.log("this.textToDisplay: ",this.textToDisplay);
    

    this.profileArray.push('lunaNeutral');

    //update the dialogue in the next box.
    this.scene.sceneTextBox.setText(this.textToDisplay);
    //this.scene.sceneTextBox.formatText();
    this.scene.sceneTextBox.setProfileArray(this.profileArray);

    //progress the dialogue by one stage so the button moves dialogue forward.
    this.scene.sceneTextBox.progressDialogue();
           
  }

  
}