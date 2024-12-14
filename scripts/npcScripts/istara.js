//basic npc class of istara.
class istara extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos-37, 'istara');

      this.anims.create({key: 'istaraUnderWater',frames: this.anims.generateFrameNames('istara', { start: 0, end: 0 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEmerge',frames: this.anims.generateFrameNames('istara', { start: 0, end: 15 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraIdle',frames: this.anims.generateFrameNames('istara', { start: 16, end: 23 }),frameRate: 7,repeat: -1});

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

       this.underWater = false;

       if(this.npcType === 'inCave'){
          this.anims.play('istaraUnderWater');
          this.underWater = true;
       }

  }

//function which allows the player to use w to display textbox
  activateNpc(){

    //console.log("activating istaras function");
    //console.log("this.safeToSpeak: ",this.safeToSpeak," this.profileArray: ",this.profileArray);

    //if the player meets activation requiements for the sign display the text box
    //console.log('this.safeToSpeak: ', this.safeToSpeak , "this.scene.checkWPressed(): ",this.scene.checkWPressed(), "this.scene.sceneTextBox.textBoxActivationCoolDown:",this.scene.sceneTextBox.textBoxActivationCoolDown);
      if(this.safeToSpeak === true && this.scene.checkWIsDown() && this.scene.activatedNpcId === this.npcId && this.scene.sceneTextBox.textBoxActivationCoolDown === false && this.activated === false){
          console.log("activating npc");
          // sets the activated to true so it isnt called multiple times.
          this.activated = true;

          //if istara is not under the water then proceed dialogue like normal.
          if(this.underWater === false){
            //sets activated to false after half a second.
            let sign = this;
            setTimeout(function(){
              sign.activated = false;
            },200);

            //logic to decide what the npcs activated function is.
            if(this.npcType === 'inCave'){
              this.inCave();
            }else{
              this.default();
            }
            //once the player has talked to istara once progress dialogue in scene4 and update value

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
      
          }else{
            this.anims.play('istaraEmerge').once('animationcomplete', () => {
              this.anims.play('istaraIdle',true);
              this.underWater = false;
              this.activated = false;
            });
          }
          
          
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

  inCave(){

    //check to see if flag already exists
    let istaraCaveDialogue1 = {
      flagToFind: "istaraCaveDialogue1",
      foundFlag: false,
    };

    let istaraCaveDialogue2 = {
      flagToFind: "istaraCaveDialogue2",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, istaraCaveDialogue1);

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, istaraCaveDialogue2);

    //if the flag is not found then apply dialoge start
    if(istaraCaveDialogue1.foundFlag === false){

      this.textToDisplay = 
      'OH?                      '+
      '                         '+
      '                         '+
      
      'LUCKY ME, IT SEEMS I     '+
      'HAVE A UNINVITED GUEST   '+
      'TO MY LAIR.              '+

      'FEEL FREE TO STAY A      '+
      'WHILE, ITS NICE TO HAVE  '+
      'SOME COMPANY.            '+

      'I HOPE YOU DONT FIND ME  '+
      'TOO INTIMIDATING.        '+
      '                         '+

      'SHAME MY LAIR IS QUITE   '+
      'SPARSE. IM IN THE        '+
      'PROCESS OF MOVING IN.    ';

      this.profileArray = ['istaraNeutral','istaraStarEyes','istaraHappy','istaraHappy','istaraKO']

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed)
      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        this.anims.play('istaraIdle',true);
      }else if(this.scene.sceneTextBox.amountWIsPressed === 5){

        //add dialogue flag.
        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,istaraCaveDialogue1.flagToFind);
      }

    }else if(istaraCaveDialogue1.foundFlag === true && istaraCaveDialogue2.foundFlag === false){

        this.textToDisplay = 
        'OH?                      '+
        '                         '+
        '                         '+

        'IM GLAD YOUR STICKING    '+
        'AROUND. ITS NICE TO HAVE '+
        'SOME COMPANY.            '+

        'IM IN THE PROCESS OF     '+
        'MOVING WHICH IS A PAIN.  '+
        '                         '+

        'I REALLY WISH I HAD SOME '+
        'LOYAL COBRABOLDS TO HELP '+
        'ME GET SETTLED.          '+

        'SADDLY I HAVENT HAD TIME '+
        'TO GO ON A HUNT FOR      '+
        'FERAL CURSED.            '+

        'I CAN CURSE THEM SO THAT '+
        'THEY BECOME MY SWEET     '+
        'LOYAL COBRABOLDS.        '+

        'HMMM. YOURE NOT CURSED.  '+
        'WOULD YOU LIKE TO BECOME '+
        'ONE OF MY COBRABOLDS?    '+
        
        'EVEN THOUGH YOU WILL     '+
        'SERVE ME, I PROMISE THAT '+
        'I WILL KEEP YOU SAFE.    '+
        
        'MY COBRABOLDS ARE VERY   '+
        'PRECIOUS TO ME.          '+
        '                         '+

        'I PROMISE YOU WILL BE    '+
        'WELL TAKEN CARE OF.      '+
        '                         ';

        this.profileArray = [
          'istaraNeutral',
          'istaraHappy',
          'istaraKO',
          'istaraNeutral',
          'istaraSquish',
          'istaraNeutral',
          'istaraStarEyes',
          'istaraHappy',
          'istaraHappy',
          'istaraHeartEyes'
        ];

        if(this.yes === true && this.decisionMade === false){
          this.profileArray.push('istaraHeartEyes');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHeartEyes');
          this.textToDisplay += 
          'EEEEEEE!                 '+
          '                         '+
          '                         '+

          'IM SO HAPPY TO HEAR THAT '+
          'YOU SHOULD GET           '+
          'UNDRESSED.               '+

          'YOURE THE PERFECT SIZE   '+
          'TO FIT CONFORTABLY IN MY '+
          'WOMB.                    '+

          'JUST RELAX AND SLIDE     '+
          'INTO YOUR NEW MISTRESSES '+
          'BELLY.                   '+

          'ITLL WORK ITS MAGIC AND  '+
          'YOU WILL BE A CUTE       '+
          'COBRABOLD IN NO TIME.    ';
        }else{
          this.profileArray.push('istaraSquish');
          this.profileArray.push('istaraSquish');

          this.textToDisplay += 
          'SUCH A SHAME...          '+
          '                         '+
          '                         '+

          'ILL BE HERE IF YOU       '+
          'CHANGE YOUR MIND....     '+
          '                         ';
        }

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed);

      if(this.scene.sceneTextBox.amountWIsPressed === 0){
        
      }
    }
    
  }

}