//intro cutscene
class memory1 extends defaultScene {

  constructor(){
    super({key: 'memory1',active: false ,physics:{default:'arcade'}});

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
    this.load.spritesheet("memoryEmots" , "assets/hudElements/memoryEmots.png" , {frameWidth: 135 , frameHeight: 120 });
    this.load.spritesheet('mobileButtons', 'assets/hudElements/mobileButtons.png',{frameWidth: 213, frameHeight: 213 });
    this.load.image('skip', 'assets/hudElements/skip.png');

    this.load.spritesheet("memoryNPC1" , "assets/npcs/memoryNPC1.png" , {frameWidth: 393 , frameHeight: 393 });
      
  }
  create(){

    //set ip intro cutscene sprite
    //this.SceneSprite = this.add.sprite(600, 400, "playerAndMiloDigestionMale");
    //set up intro cutscene animations.

    //set up cutscene text box
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    //loads local save data.
    this.loadGamePlayData();

    this.SceneSprite = this.add.sprite(600, 400, "memoryNPC1");
    this.SceneSprite.anims.create({ key: 'idle', frames: this.SceneSprite.anims.generateFrameNames('memoryNPC1', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
    this.SceneSprite.anims.create({ key: 'idleGlitch', frames: this.SceneSprite.anims.generateFrameNames('memoryNPC1', { start: 4, end: 7 }), frameRate: 7, repeat: -1 });
    
    this.SceneSprite.anims.play('idle',true);

    this.sceneSpriteSize = 0.6;

    this.SceneSprite.setScale(this.sceneSpriteSize);

    this.sceneTextBox = new textBox(this,600-40,800,'charBlack');
    this.sceneTextBox.setScale(1.3);
    this.sceneTextBox.activateTitleScreenTextbox(
      this,//scene
      false,// is the text box visible?
      [],// sets profile array
      ""//text sent to the text box.
    );

     //sets up the special text box object for istara
    this.sceneTextBox.textBoxProfileImage.setUpMemoryEmots();
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

        this.scene.start('gameHud');

        let that = this;

        setTimeout(function () {
            that.scene.start("ClinicRoom");
        }, 1000);

    },this);

    //calls our function to define the fadein complete function.
    this.fadeInFunction();

    //dramatic fade in.
    this.cameras.main.fadeIn(1500, 0, 0, 0);
  
  }


  update(){
    /*if(this.digestionTimerValue % 2 !== 0){
            this.initSoundEffect('stomachSFX','17',0.1);
    }*/
  }

  //function to cause fade in and fade out correctly
  fadeInFunction(){

    //progress dialogue node
    this.npcGameover.nodeHandler("cutscenes","memorys","memory1");

    let that = this; 

    switch (this.displayArrayPosition) {
      case 7:
        this.displayArrayPosition++;  
        this.SceneSprite.anims.play('idleGlitch',true);
        setTimeout(function () {

          //call fade out after calling fadeoutfunction to set up the camera object fadeout function
          that.fadeInFunction();
            
          }, 1000);
         break;
      case 8:
          console.log("memory cutscene ending");
        this.fadeOutFunction();
        that.cameras.main.fadeOut(1000, 0, 0, 0);
        break;
  
      default:
        this.displayArrayPosition++;  

        this.sceneSpriteSize = this.sceneSpriteSize + 0.1;
        this.SceneSprite.setScale(this.sceneSpriteSize);

          setTimeout(function () {

          //call fade out after calling fadeoutfunction to set up the camera object fadeout function
          that.fadeInFunction();
            
          }, 4000);
    // code to run if no case matches
    }
  }

  //fade out function to fade out the cutscene pages, ad then load the intro level
  fadeOutFunction(){
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
            this.sound.get(this.sound.sounds[counter].key).stop();
        }
        
        this.scene.stop();

        //gamehud already starts scene?
        this.scene.start('gameHud');

        let that = this;

        setTimeout(function () {
            that.scene.start("ClinicRoom");
        }, 1000);

        


    });
  }
}

