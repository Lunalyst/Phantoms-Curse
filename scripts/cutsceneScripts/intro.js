//intro cutscene
class Intro extends A3SoundEffects {

  constructor(){
    super({key: 'intro',active: false ,physics:{default:'arcade'}});

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
    this.load.spritesheet('introScenes', 'assets/cutscenes/introSprite.png',{frameWidth: 393 , frameHeight: 393});
    this.load.spritesheet('mobileButtons', 'assets/hudElements/mobileButtons.png',{frameWidth: 213, frameHeight: 213 });
    this.load.image('skip', 'assets/hudElements/skip.png');
      
  }
  create(){

    //set ip intro cutscene sprite
    this.SceneSprite = this.add.sprite(600, 400, "introScenes");
    //set up intro cutscene animations.
    this.SceneSprite.anims.create({ key: '1M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 0, end: 0 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '1F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 1, end: 1 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '2M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 2, end: 2 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '2F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 3, end: 3 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '3M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 4, end: 4 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '3F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 4, end: 4 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '4M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 5, end: 5 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '4F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 6, end: 6 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '5M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 7, end: 7 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '5F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 8, end: 8 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '6M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 9, end: 9 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '6F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 10, end: 10 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '7M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 11, end: 11 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '7F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 12, end: 12 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '8M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 13, end: 13 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '8F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 14, end: 14 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '9M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 15, end: 15 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '9F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 15, end: 15 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '10M', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 16, end: 16 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.anims.create({ key: '10F', frames: this.SceneSprite.anims.generateFrameNames('introScenes', { start: 17, end: 17 }), frameRate: 1, repeat: -1 });
    this.SceneSprite.visible = false;
    this.SceneSprite.setScale(1.8);

    //set up cutscene text box
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.sceneTextBox = new textBox(this,600-40,800,'charBubble');
    this.sceneTextBox.setScale(1.3);
    this.sceneTextBox.activateTitleScreenTextbox(
      this,//scene
      false,// is the text box visible?
      [],// sets profile array
      ""//text sent to the text box.
    );
    this.sceneTextBox.setTextboxBackground("blank");
    this.sceneTextBox.textTint = 0x9d00e0;

    //make npc to handle our text box logic
    this.npcGameover = new npc(this, 0, 0, 'hitbox');

    //grab save datay so we know what sex the player is.
    this.loadGamePlayData();

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

      this.scene.start('gameHud');

      let that = this;
      setTimeout(function () {
          that.scene.start("tutorialBeachLevel");
      }, 100);

    },this);

    //calls our function to define the fadein complete function.
    this.fadeInFunction();

    //dramatic fade in.
    this.cameras.main.fadeIn(500, 0, 0, 0);
  
  }


  update(){
   
  }

  //function to cause fade in and fade out correctly
  fadeInFunction(){

    //progress dialogue node
    this.npcGameover.nodeHandler("cutscenes","intro","intro1");

    //if the array character is 'B' for blank
    if(this.displayArray[this.displayArrayPosition] === "B"){

      //hide the scene sprite
      this.SceneSprite.visible = false;

    //otherwise display animation
    }else{

      this.SceneSprite.visible = true;
      this.SceneSprite.anims.play(""+this.displayArray[this.displayArrayPosition] ,true);
    }

    //increment array position by 1
    this.displayArrayPosition++;

    //after fading in then out the camera object loses its fade in fade out function.
    //so by calling this function we can re apply its fade in and fade out functionality.
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {   
      let that = this;   
      setTimeout(function () {
        //call fade out after calling fadeoutfunction to set up the camera object fadeout function
        that.fadeOutFunction();

        that.cameras.main.fadeOut(2000, 0, 0, 0);
      }, 3000);
    });
  }

  //fade out function to fade out the cutscene pages, ad then load the intro level
  fadeOutFunction(){
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

      //if the position is below 12 then fade back in. 
      if(this.displayArrayPosition < 12){

        this.fadeInFunction();
        this.cameras.main.fadeIn(2000, 0, 0, 0);

      //otherwise at end of fadeout, load next scene.
      }else{
        
        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
            this.sound.get(this.sound.sounds[counter].key).stop();
        }
        
        this.scene.stop();

        this.scene.start('gameHud');

        let that = this;
        setTimeout(function () {
            that.scene.start("tutorialBeachLevel");
        }, 100);

      }
    });
  }
}

