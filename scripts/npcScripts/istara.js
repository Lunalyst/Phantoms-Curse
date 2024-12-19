//basic npc class of istara.
class istara extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos-37, 'istara');

      this.anims.create({key: 'istaraUnderWater',frames: this.anims.generateFrameNames('istara', { start: 0, end: 0 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEmerge',frames: this.anims.generateFrameNames('istara', { start: 0, end: 15 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraIdle',frames: this.anims.generateFrameNames('istara', { start: 16, end: 23 }),frameRate: 7,repeat: -1});

      this.anims.create({key: 'istaraStartMale',frames: this.anims.generateFrameNames('istara-male-tf', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEnteringMale',frames: this.anims.generateFrameNames('istara-male-tf', { start: 4, end: 22 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraGameoverMale',frames: this.anims.generateFrameNames('istara-male-tf', { start: 23, end: 26 }),frameRate: 7,repeat: -1});
      
      this.anims.create({key: 'istaraBelly1',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraBelly2',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 5, end: 8 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEggTF',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 9, end: 15 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraEggBelly',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 16, end: 19 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEggLaying',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 20, end: 27 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraEggCovet',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 28, end: 31 }),frameRate: 7,repeat: -1});

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
       this.dialogueAdded = false;
       this.completedText = false;

       this.animationPlayed = false;
       this.soundCoolDown = false;
       this.scene = scene;

       this.yes = false;
       this.inDialogue = false;
 
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


        
      //sets up initial dialogue
      console.log("this.scene.sceneTextBox.amountWIsPressed: ",this.scene.sceneTextBox.amountWIsPressed,"this.inDialogue: ",this.inDialogue,"this.scene.sceneTextBox.textInterupt: ",this.scene.sceneTextBox.textInterupt);
      if(this.scene.sceneTextBox.amountWIsPressed === 0){

        //resets decision making variables incase the player asks agian.
        this.yes = false;
        this.inDialogue = false;

        this.textToDisplay = 
        'OH?                       '+
        '                          '+
        '                          '+

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
          'istaraHeartEyes',
          'istaraHappy'
        ];

      console.log('this.scene.sceneTextBox.amountWIsPressed: ',this.scene.sceneTextBox.amountWIsPressed);

      // halt dialogue so the player can answer the yest or no question.
      }else if(this.scene.sceneTextBox.amountWIsPressed === 10 && this.inDialogue === false){
        
        //create dialogue buttons for player choice
        this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-210,this.scene.sceneTextBox.y-260,'charBubble',"YES PLEASE! ^_^ ",true);
        this.scene.npcChoice1.textWob();
        this.scene.npcChoice1.setScrollFactor(0);
        this.scene.npcChoice1.setSize(300,30);
        this.scene.npcChoice1.setInteractive();
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
          this.yes = true;
          this.scene.sceneTextBox.textInterupt = false;

          //add new dialogue to the profile array based on the decision
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

          console.log("this.textToDisplay: ",this.textToDisplay);

          //update the dialogue in the next box.
          this.scene.sceneTextBox.setText(this.textToDisplay);
          //this.scene.sceneTextBox.formatText();
          this.scene.sceneTextBox.setProfileArray(this.profileArray);

          //progress the dialogue by one stage so the button moves dialogue forward.
          this.scene.sceneTextBox.progressDialogue();

          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();

        },this);

        //dialogue option for no.
        this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-210,this.scene.sceneTextBox.y-300,'charBubble',"I THINK ILL PASS. ",true);
        this.scene.npcChoice2.textWob();
        this.scene.npcChoice2.setScrollFactor(0);
        this.scene.npcChoice2.setSize(300,30);
        this.scene.npcChoice2.setInteractive();
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
          this.yes = false;
          this.scene.sceneTextBox.textInterupt = false;

          //add new dialogue to the profile array based on the decision
          this.profileArray.push('istaraAnnoyed');
          this.profileArray.push('istaraSad');
          this.profileArray.push('istaraSad');

          this.textToDisplay += 
          'SUCH A SHAME...          '+
          '                         '+
          '                         '+

          'ILL BE HERE IF YOU       '+
          'CHANGE YOUR MIND....     '+
          '                         ';

          //update the dialogue in the next box.
          this.scene.sceneTextBox.setText(this.textToDisplay);
          this.scene.sceneTextBox.formatText();
          this.scene.sceneTextBox.setProfileArray(this.profileArray);

          //progress the dialogue by one stage so the button moves dialogue forward.
          this.scene.sceneTextBox.progressDialogue();

          //destroy itself and other deciosions
          this.scene.npcChoice1.destroy();
          this.scene.npcChoice2.destroy();

        },this);

        //call scene variable to create interupt.
        this.scene.sceneTextBox.textInterupt = true;

        //let the npc know they are in dialogue
        this.inDialogue = true;
        
      // if the dialogue stage is at 14 and the player said yes, then add the unbirthing dialogue.
      }else if(this.scene.sceneTextBox.amountWIsPressed === 14 && this.yes === true && this.dialogueAdded === false){

          this.dialogueAdded = true;
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraSquish');
          this.profileArray.push('istaraKO');
          this.profileArray.push('istaraHeartEyes');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHeartEyes');
          this.profileArray.push('istaraSquish');
          this.profileArray.push('istaraSquish');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHappy');
          this.profileArray.push('istaraHappy');

          //note need to fix bug where the dialogue is added multiple times?

          this.textToDisplay += 
          'AWWW YOUR SO CUTE DOWN   '+
          'THERE.                   '+
          '                         '+

          'JUST RELAX, ILL PUSH YOU '+
          'YOU INTO ME.             '+
          '                         '+
          
          'HUFFFF SO FULL...        '+
          '                         '+
          '                         '+
          
          'OHHHHHHH......  HUFF...  '+
          'I WAS A BIT TIGHTER THAN '+
          'I THOUGHT.               '+
          
          'HUFFFFFF....             '+
          '                         '+
          '                         '+
          
          'AAAHHHHH.....            '+
          'I FEEL YOU SETTLING      '+
          'INTO MY WOMB.            '+
          
          'YOU LOOK SO CUTE ON ME   '+
          'I MIGHT JUST KEEP YOU IN '+
          'THERE A WHILE....        '+
          
          'THATS IT GIVE YOURSELF   '+
          'UP TO YOUR NEW MISTRESS  '+
          'I CAN FEEL YOU CHANGING. '+
          
          'HUFFFFFF....             '+
          '                         '+
          '                         '+
          
          'OHHHHHHH......           '+
          '                         '+
          '                         '+ 

          'ILL KEEP YOU SAFE MY     '+
          'PRECIOUS CHILD.          '+
          '                         '+

          '                         '+
          '                         '+
          '                         ';
          
      
      //handle animation 
      }else if(this.scene.sceneTextBox.amountWIsPressed === 15 && this.yes === true){

        //hide player
        this.scene.player1.visible = false;
        // start the animation to begin thep rocess
        this.anims.play('istaraStartMale',true);

        //follow istara and zoom the camera in
        this.scene.mycamera.startFollow(this);
        //this.scene.cameras.main.zoom = 3;

      }else if(this.scene.sceneTextBox.amountWIsPressed === 17 && this.yes === true && this.animationPlayed === false){
        
        //hide player
        this.scene.player1.visible = false;
        this.animationPlayed = true;

        //apply interuption to dialogue
        this.scene.sceneTextBox.textInterupt = true;

        //hide ui and dialogue box.
        this.scene.sceneTextBox.visible = false;

        //play animation and on complete allow w to be pressed.
        this.anims.play('istaraEnteringMale').once('animationcomplete', () => {
          this.anims.play('istaraBelly1',true);
          this.scene.sceneTextBox.amountWIsPressed++;
          this.scene.sceneTextBox.textInterupt = false;
          this.animationPlayed = false;
          //progress the dialogue by one stage so the button moves dialogue forward.
          this.scene.sceneTextBox.progressDialogue();
        });

      }else if(this.scene.sceneTextBox.amountWIsPressed === 21 && this.yes === true){
        
        this.anims.play('istaraBelly2',true);

      }else if(this.scene.sceneTextBox.amountWIsPressed === 24 && this.yes === true && this.animationPlayed === false){
        
        //hide player
        this.scene.player1.visible = false;
        this.animationPlayed = true;

        //apply interuption to dialogue
        this.scene.sceneTextBox.textInterupt = true;

        //hide ui and dialogue box.
        this.scene.sceneTextBox.visible = false;

        //play animation and on complete allow w to be pressed.
        this.anims.play('istaraEggTF').once('animationcomplete', () => {
          this.anims.play('istaraEggBelly',true);
          this.scene.sceneTextBox.amountWIsPressed++;
          this.scene.sceneTextBox.textInterupt = false;
          this.animationPlayed = false;
          //progress the dialogue by one stage so the button moves dialogue forward.
          this.scene.sceneTextBox.progressDialogue();
        });

      }else if(this.scene.sceneTextBox.amountWIsPressed === 26 && this.yes === true && this.animationPlayed === false){
        
        //hide player
        this.scene.player1.visible = false;
        this.animationPlayed = true;

        //apply interuption to dialogue
        this.scene.sceneTextBox.textInterupt = true;

        //hide ui and dialogue box.
        this.scene.sceneTextBox.visible = false;

        //play animation and on complete allow w to be pressed.
        this.anims.play('istaraEggLaying').once('animationcomplete', () => {
          this.anims.play('istaraEggCovet',true);
          this.scene.sceneTextBox.amountWIsPressed++;
          this.scene.sceneTextBox.textInterupt = false;
          this.animationPlayed = false;
          //progress the dialogue by one stage so the button moves dialogue forward.
          this.scene.sceneTextBox.progressDialogue();
        });

      }else if(this.scene.sceneTextBox.amountWIsPressed === 29){
        this.scene.enemyThatDefeatedPlayer = "istaraUnbirth";
        this.scene.changeToGameover();
        this.scene.sceneTextBox.textInterupt = true;
        this.scene.sceneTextBox.textCoolDown = true;

      }
    }
    
  }

  gameOver(playerSex){
    console.log("PLAYING ISTARTA GAMEOVER!")
      if(playerSex === 1){

      }else{
        this.anims.play('istaraGameoverMale',true);
      }
    
    
    
  }

}