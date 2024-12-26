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
       this.textToDisplay ="";
       this.npcId = 0;
       this.activationDelay = false;
       this.activated = false;
       this.npcType = npcType;

       this.flag = "";
       this.dialogueCompleted = false;
       this.completedText = false;

       this.animationPlayed = false;
       this.scene = scene;
 
       //createdfor use in textbox
       this.profileArray;

       if(this.npcType === 'devRoom'){
          this.anims.play('lunalystChairSleep');
       }else if(this.npcType === 'clearingTheWay'){
          this.anims.play('lunalystIdle');
       }

  }

//function which allows the player to use w to display textbox
  activateNpc(){

    //console.log("activating lunas function");
    //console.log("this.safeToSpeak: ",this.safeToSpeak," this.profileArray: ",this.profileArray);

    //if the player meets activation requiements for the sign display the text box
    //console.log('this.safeToSpeak: ', this.safeToSpeak , "this.scene.checkWPressed(): ",this.scene.checkWPressed(), "this.scene.sceneTextBox.textBoxActivationCoolDown:",this.scene.sceneTextBox.textBoxActivationCoolDown);
      if(this.safeToSpeak === true && this.scene.checkWIsDown() && this.scene.activatedNpcId === this.npcId && this.scene.sceneTextBox.textBoxActivationCoolDown === false && this.activated === false){
          console.log("activating npc");
          // sets the activated to true so it isnt called multiple times.
          this.activated = true;

          //sets activated to false after half a second.
          let sign = this;
          setTimeout(function(){
            sign.activated = false;
          },200);

          //logic to decide what the npcs activated function is.
          if(this.npcType === 'devRoom'){
            this.devRoom();
          }else if(this.npcType === 'clearingTheWay'){
            this.ClearingTheWay();
          }else{
            this.default();
          }
          //once the player has talked to luna once progress dialogue in scene4 and update value

          //while there is text to display display it.
          if(this.scene.sceneTextBox.completedText === false){
            this.scene.pausedInTextBox = true;
            this.scene.sceneTextBox.setText(this.textToDisplay);
            this.scene.sceneTextBox.formatText();
            this.scene.sceneTextBox.setProfileArray(this.profileArray);
            this.scene.sceneTextBox.activateTextBox(this.scene);
            this.activationDelay = true;
          }
          // updates the npc so that it knows when the dialogue is completed.
          this.completedText = this.scene.sceneTextBox.completedText;
          
          
        //otherwise we want to display the key prompts 
        }else if(this.safeToSpeak === true && this.scene.activatedNpcId === this.npcId && this.promptCooldown === false ){
            this.npcKeyPrompts.visible = true;
            this.npcKeyPrompts.playWKey();
            this.promptCooldown = true;
            //this.activated = false;
            
        }
        
        // resets variables.
        if(this.safeToSpeak === false){
          this.npcKeyPrompts.visible = false;
          this.promptCooldown = false;
          //this.activated = false;
        }
  }

  default(){
    this.textToDisplay = 
      'SOMETHING HAS GONE       '+
      'WRONG!                   '+
      '                         ';
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

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";

      this.textToDisplay = 
      'OH A HUMAN! HELLO!        '+
      '                          '+
      '                          '+

      'MY NAME IS LUNALYST, AND  '+
      'IM SURE YOU CAN TELL IM   '+
      'NOT QUITE HUMAN ANYMORE.  '+

      'HOWEVER IM NOT GONA TRY   '+
      'AND EAT OR FORNICATE      '+
      'WITH YOU, PROMISE.        '+

      'IM JUST A HUMBLE MAID    '+
      'TRYING TO GET BACK TO    '+
      'LOCKWOOD VILLAGE.        '+

      'LOTS OF CAVE INS         '+
      'SO IM DOING MY BEST TO   '+
      'CLEAR THE WAY.           '+

      'ANYWAY, I GOT TO GET     '+
      'BACK TO IT.              '+
      'STAY SAFE OUT THERE. ^_^ ';

      this.profileArray = ['lunaStarEyes','lunaHappy','lunaKO','lunaFingerTouch','lunaKO','lunaStarEyes']

      if(this.scene.sceneTextBox.amountWIsPressed === 4){

        this.anims.play('lunalystSkirtPull',true).once('animationcomplete', () => {
          this.anims.play('lunalystIdle');

        });

      }else if(this.scene.sceneTextBox.amountWIsPressed === 6){

        //add dialogue flag.
        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaCTWDialogue1.flagToFind);
      }else{
        this.anims.play('lunalystIdle',true); 
      }

    }else if(lunaCTWDialogue1.foundFlag === true){

      //sets the textbox voice for luna
      this.scene.sceneTextBox.soundType = "lightVoice";

      this.textToDisplay = 
      'OH HELLO AGIAN!           '+
      '                          '+
      '                          '+

      'IM STILL BUSY OVER HERE   '+
      'CLEARING THE WAY.         '+
      '                          '+

      'HOWEVER I CAN GIVE YOU    '+
      'A HUG IF YOU LIKE.        '+
      '                          '+

      'COME HERE.                '+
      'EVERYTHINGS GOING TO BE   '+
      'ALRIGHT.                  '+

      '                          '+
      '                          '+
      '                          '+

      '                          '+
      '                          '+
      '                          '+

      'STAY SAFE OUT THERE. ^_^  '+
      '                          '+
      '                          ';

      this.profileArray = ['lunaHappy','lunaKO','lunaFingerTouch','lunaHappy','lunaHappy','lunaHearts','lunaFingerTouch']

      if(this.scene.sceneTextBox.amountWIsPressed === 2){
        this.animationPlayed = false;
      }else if(this.scene.sceneTextBox.amountWIsPressed === 3){

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
       
      }else if(this.scene.sceneTextBox.amountWIsPressed > 3 && this.scene.sceneTextBox.amountWIsPressed < 6){

        this.scene.player1.visible = false;

        if(this.scene.playerSex === 1){
          this.anims.play('lunalystFemaleHug',true);
         }else{
          this.anims.play('lunalystMaleHug',true);
         } 
      }else if(this.scene.sceneTextBox.amountWIsPressed === 6){

        if(this.scene.playerSex === 1){
          this.anims.play('lunalystFemaleHugEnd',true).once('animationcomplete', () => {
            this.anims.play('lunalystIdle',true);
            this.scene.player1.x = this.x+20;
            this.scene.player1.y = this.y;
            this.scene.player1.visible = true;
          });
         }else{
          this.anims.play('lunalystMaleHugEnd',true).once('animationcomplete', () => {
            this.anims.play('lunalystIdle',true);
            this.scene.player1.x = this.x+20;
            this.scene.player1.y = this.y;
            this.scene.player1.visible = true;
          });
         } 
        

      }else if(this.scene.sceneTextBox.amountWIsPressed === 7){

        this.anims.play('lunalystIdle',true);

        this.scene.player1.x = this.x+20;
        this.scene.player1.y = this.y;
        this.scene.player1.visible = true;
      }

    }

    
  }



}