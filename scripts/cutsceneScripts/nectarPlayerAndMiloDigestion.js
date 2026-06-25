//intro cutscene
class NectarPlayerAndMiloDigestion extends defaultScene {

  constructor(){
    super({key: 'nectarPlayerAndMiloDigestion',active: false ,physics:{default:'arcade'}});

    //store player data to be used on transition.
    this.warpToX;
    this.warpToY;
    this.playerHealth;
    this.playerSex;
    this.playerLocation;
    this.inventoryDataArray;
    this.playerBestiaryData;
    this.playerSkillsData;
    this.playerSaveSlotData;
    this.flagValues;
    this.settings;
    this.sceneSpeed = 2000;
    this.tabPopUp = false;
    this.tabPopUpCooldown = false;
    
    
  }

  preload(){
    this.load.spritesheet('playerAndMiloDigestionMale', 'assets/cutscenes/playerAndMiloDigestionMale.png',{frameWidth: 267, frameHeight: 147});
    this.load.spritesheet('playerAndMiloDigestionFemale', 'assets/cutscenes/playerAndMiloDigestionFemale.png',{frameWidth: 267, frameHeight: 147});
    this.load.spritesheet('mobileButtons', 'assets/hudElements/mobileButtons.png',{frameWidth: 213, frameHeight: 213 });
    this.load.image('skip', 'assets/hudElements/skip.png');
      
  }
  create(){

    //set ip intro cutscene sprite
    this.SceneSprite = this.add.sprite(600, 400, "playerAndMiloDigestionMale");
    //set up intro cutscene animations.


    this.SceneSprite.anims.create({ key: '1M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 0, end: 5 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '2M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 6, end: 10 }), frameRate: 6, repeat: -1 });
    this.SceneSprite.anims.create({ key: '3M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 9, end: 13 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '4M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 14, end: 17 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '5M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 18, end: 21 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '6M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 22, end: 25 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '7M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 26, end: 32 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '8M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 32, end: 36 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '9M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 37, end: 39 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '10M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 40, end: 43 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '11M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 44, end: 45 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '12M', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionMale', { start: 46, end: 49 }), frameRate: 5, repeat: -1 });
      

    this.SceneSprite.anims.create({ key: '1F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 0, end: 5 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '2F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 6, end: 10 }), frameRate: 6, repeat: -1 });
    this.SceneSprite.anims.create({ key: '3F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 9, end: 13 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '4F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 14, end: 17 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '5F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 18, end: 21 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '6F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 22, end: 25 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '7F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 26, end: 32 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '8F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 32, end: 36 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '9F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 37, end: 39 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '10F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 40, end: 43 }), frameRate: 5, repeat: -1 });
    this.SceneSprite.anims.create({ key: '11F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 44, end: 45 }), frameRate: 5, repeat: 0 });
    this.SceneSprite.anims.create({ key: '12F', frames: this.SceneSprite.anims.generateFrameNames('playerAndMiloDigestionFemale', { start: 46, end: 49 }), frameRate: 5, repeat: -1 });
      
    
    
    this.SceneSprite.visible = true;
    this.SceneSprite.setScale(1.7);

    //set up cutscene text box
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    //loads local save data.
    this.loadGamePlayData();

    this.sceneTextBox = new textBox(this,600-40,800,'charBlack');
    this.sceneTextBox.setScale(1.3);
    this.sceneTextBox.activateTitleScreenTextbox(
      this,//scene
      false,// is the text box visible?
      [],// sets profile array
      ""//text sent to the text box.
    );

     //sets up the special text box object for istara
    this.sceneTextBox.textBoxProfileImage.setUpMiloEmots();
    //this.sceneTextBox.setTextboxBackground("blank");
    //this.sceneTextBox.textTint = 0x9d00e0;

    //make npc to handle our text box logic
    this.npcGameover = new npc(this, 0, 0, 'hitbox');

    //set the sex char.
    if(this.playerSex === 0){
      this.sexChar = 'M';
    }else{
      this.sexChar = 'F';
    }

    //generate scene sprite display array
    this.displayArrayPosition = 0;
    this.displayArray = ["B"];

    //loop to generate the scene sprite order based on the player sex.
    for(let counter = 1; counter < 10; counter++){
      this.displayArray.push(""+counter+this.sexChar);
    }
    this.displayArray.push("B");
    this.displayArray.push(""+10+this.sexChar);

    //click event anywhere on screen. 
    this.input.on('pointerdown', () => {
      if(this.tabPopUp === false){
        this.tabPopUp = true;

        this.skipIndicator.visible = true;

        let that = this;
        setTimeout(function () {
          that.tabPopUp = false;
          that.skipIndicator.visible = false;
        }, 3000);
      }
    },this);

    //when player dies the prompt to skip animations need to pop up.
    this.skipIndicator = this.add.sprite(1135, 840,'skip').setInteractive(this.input.makePixelPerfect());
    this.skipIndicator.setScale(1/3);
    this.skipIndicator.visible = false;
    this.skipIndicatorIsPressed = false;
    this.skipIndicator.setScrollFactor(0);

    //if tabtoskip is clicked then 
    this.skipIndicator.on('pointerdown', function (pointer) {

       //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
            this.sound.get(this.sound.sounds[counter].key).stop();
        }
        
        this.scene.stop();

        let that = this;
        setTimeout(function () {
            that.changeToGameoverFromCutscene("nectarCaveGameover",bestiaryKey.nectarVore2);
        }, 500);

    },this);

    //calls our function to define the fadein complete function.
    this.fadeInFunction();

    //dramatic fade in.
    this.cameras.main.fadeIn(500, 0, 0, 0);
  
  }


  update(){
    /*if(this.digestionTimerValue % 2 !== 0){
            this.initSoundEffect('stomachSFX','17',0.1);
    }*/
  }

  //function to cause fade in and fade out correctly
  fadeInFunction(){

    //progress dialogue node
    this.npcGameover.nodeHandler("cutscenes","nectar","nectarAteMiloAndPlayer");

    let that = this; 

    switch (this.displayArrayPosition) {
      case 0:
        this.initSoundEffect('stomachSFX','6',0.1);

        this.SceneSprite.anims.play("1"+this.sexChar).once('animationcomplete', () => {
          this.SceneSprite.anims.play("2"+this.sexChar ,true);
          this.initSoundEffect('stomachSFX','8',0.1);
          //increment array position by 1
          this.displayArrayPosition++;  
          setTimeout(function () {

            //call fade out after calling fadeoutfunction to set up the camera object fadeout function
            that.SceneSprite.anims.play("3"+that.sexChar).once('animationcomplete', () => {
              that.SceneSprite.anims.play("4"+that.sexChar ,true);
              that.fadeInFunction();
            });
          }, 3000);
        });
        break;
      case 1:
      case 2:
      case 3:
      case 6:
      case 7:
      case 9:
      case 10:
      case 11:
      case 12:
        this.initSoundEffect('stomachSFX','17',0.1);
        setTimeout(function () {
          //call fade out after calling fadeoutfunction to set up the camera object fadeout function
          that.fadeInFunction();
        }, 3000);

        //increment array position by 1
        this.displayArrayPosition++;
        break;
      case 4:
        this.initSoundEffect('stomachSFX','11',0.1);
        this.SceneSprite.anims.play("5"+this.sexChar).once('animationcomplete', () => {
          this.SceneSprite.anims.play("6"+this.sexChar ,true);
          this.initSoundEffect('stomachSFX','8',0.1);
          //increment array position by 1
          this.displayArrayPosition++;

          
          setTimeout(function () {
            //call fade out after calling fadeoutfunction to set up the camera object fadeout function

            console.log("activating fade out?");

            that.fadeOutFunction();
            that.cameras.main.fadeOut(2000, 0, 0, 0);
            
          }, 3000);

          
        });
        break;
        case 5:

        this.initSoundEffect('stomachSFX','13',0.1);
        this.SceneSprite.anims.play("7"+this.sexChar).once('animationcomplete', () => {
          this.SceneSprite.anims.play("8"+this.sexChar ,true);
           this.initSoundEffect('stomachSFX','11',0.1);
          //increment array position by 1
          this.displayArrayPosition++;

          
          setTimeout(function () {
            //call fade out after calling fadeoutfunction to set up the camera object fadeout function

            that.fadeInFunction();
          }, 3000);

          //increment array position by 1
          this.displayArrayPosition++;
        });
        break;
      case 8:
      //increment array position by 1
        this.displayArrayPosition++;
        this.initSoundEffect('stomachSFX','5',0.1);
        setTimeout(function () {
          //call fade out after calling fadeoutfunction to set up the camera object fadeout function

          
          console.log("activating fade out?");

          that.fadeOutFunction();
          that.cameras.main.fadeOut(2000, 0, 0, 0);
            
        }, 3000);
        break;
      case 13:
        this.initSoundEffect('stomachSFX','1',0.1);
        this.SceneSprite.anims.play("9"+this.sexChar).once('animationcomplete', () => {
          this.SceneSprite.anims.play("10"+this.sexChar ,true);

          //this.initSoundEffect('stomachSFX','18',0.1);
          //increment array position by 1
          this.displayArrayPosition++;

          
          setTimeout(function () {
            //call fade out after calling fadeoutfunction to set up the camera object fadeout function

            console.log("activating fade out?");

            that.fadeOutFunction();
            that.cameras.main.fadeOut(2000, 0, 0, 0);
            
          }, 3000);

          
        });
        break;

        case 14:
        this.initSoundEffect('stomachSFX','17',0.1);
        this.SceneSprite.anims.play("11"+this.sexChar).once('animationcomplete', () => {
          this.SceneSprite.anims.play("12"+this.sexChar ,true);

          this.initSoundEffect('stomachSFX','8',0.1);
          //increment array position by 1
          this.displayArrayPosition++;

          
          setTimeout(function () {
            //call fade out after calling fadeoutfunction to set up the camera object fadeout function

            console.log("activating fade out?");

            that.fadeOutFunction();
            that.cameras.main.fadeOut(3000, 0, 0, 0);
            
          }, 3000);

          
        });
        break;
      

      default:
  

        // code to run if no case matches
    }
  }

  //fade out function to fade out the cutscene pages, ad then load the intro level
  fadeOutFunction(){
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

      //if the position is below 12 then fade back in. 
      if(this.displayArrayPosition < 15){

        this.fadeInFunction();
        this.cameras.main.fadeIn(2000, 0, 0, 0);

      //otherwise at end of fadeout, load next scene.
      }else{
        
        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
            this.sound.get(this.sound.sounds[counter].key).stop();
        }
        
        this.scene.stop();

        let that = this;
        setTimeout(function () {
            that.changeToGameoverFromCutscene("nectarCaveGameover",bestiaryKey.nectarVore2);
        }, 500);

      }
    });
  }
}

