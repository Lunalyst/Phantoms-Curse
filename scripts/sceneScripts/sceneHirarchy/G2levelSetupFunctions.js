/****************************************************************************** 
description: class handles level set up functions. contains tilemap function, 
as well as other various game object group set ups.
*******************************************************************************/
class G2levelSetupFunctions extends G1PlayerInputs {

  //function called to laod tilesets.
  setUpTileSet(map,tilesetImage,sourceMap){
    //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
    this.myMap = this.make.tilemap({ key: map });
    //creates a new level object which is used to display map. sends scene and mapdata
    this.processMap = new level(this,this.myMap);
    //defines the tile set to be used when generating level
    this.processMap.tilesetNameInTiled = tilesetImage;
    //calls function that loads the tiles from the json
    this.processMap.setTiles(sourceMap,this);

    //if lighting system is active then apply it to the tile layers
    if(this.lightingSystemActive){
      this.processMap.layer0.setPipeline('Light2D');
      this.processMap.layer1.setPipeline('Light2D');
      this.processMap.layer2.setPipeline('Light2D');
      this.processMap.layer3.setPipeline('Light2D');
    }
  }

  //sets up item object. will likely be called from enemy classes to drop items from enemys. is generic enough for other uses as well.
  setUpItemDrops(){
    //sets up the group for items in the scene
    this.itemDrops = this.physics.add.group();

    //adds healthupgrade physics group
    this.healthUpgrades = this.physics.add.group();

    //set up the invisible barriers group
    this.invisibleBarriers = this.physics.add.group();

    this.npcs = this.add.group();

  }
  // sets up wood barriers group
  setUpWoodenBarriers(){
    //set up the invisible barriers group
    console.log('created wooden barrier group');
    this.woodenBarriers = this.physics.add.group();
    this.usingWoodenBarriers = true;
  }
  //
  setUpRockPile(){
    //set up the invisible barriers group
    console.log('created rock pile group');
    this.rockPiles = this.physics.add.group();
    this.usingRockPiles = true;
  }

  setUpWallLights(){
    //set up the invisible barriers group
    console.log('created wall light group');
    this.wallLights = this.physics.add.group();
  }

  setUpSlimeSpikes(){
    //set up the slime spikes group
    console.log('created slime spikes group');
    this.slimeSpikes = this.physics.add.group();
    this.usingSlimeSpikes = true;
  }

  setUpSlimeProjectiles(){
    //set up the slime projectile group
    console.log('created slime spikes group');
    this.slimeProjectiles = this.physics.add.group();
    this.usingSlimeProjectiles = true;
  }

  setUpCursedHeartProjectiles(){
    //set up the slime projectile group
    console.log('created curse hearts group');
    this.CursedHearts = this.physics.add.group();
    this.usingCursedHearts = true;
  }

  setupSlimeStucks(){
    //sets up stuck animations so they are defined in the scope of the scenes that need them.


  }

  setupCursedHeartStucks(){
    //sets up stuck animations so they are defined in the scope of the scenes that need them.


  }

  setupKnockDownStucks(){
    //sets up stuck animations so they are defined in the scope of the scenes that need them.

  }

  //creates a container object to hold items.
  setUpContainers(){
    //sets up the group for items in the scene
    this.itemContainers = this.physics.add.group();

  }

  setUpPlayerStorage(){
    this.playerStorage = this.physics.add.group();
    this.usingLocker = true;
  }

  setUpPlayerCraftingBench(){
    this.playerCraftingBench = this.physics.add.group();
  }

  //sets up camera object
  setUpPlayerCamera(){
    //sets up camera to follow player.
    this.mycamera = this.cameras.main;
    this.mycamera.startFollow(this.player1 ,false,0,0,10000,10000);
    this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
    this.cameras.main.followOffset.set(0,-1500);

    //puts the gamehud scene above the gameplay scene
    hudDepthEmitter.emit(hudDepth.toTop);
  }

  setUpSceneTransition(){

    //creates cool fade in effect on scene load
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.destination ='';
    //creates fadeout when fadeout function is called in the camera object
    
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

       //warps player to the next scene
      console.log('sending player to: ',this.destination);
      console.log('this.playerDefeated: ',this.playerDefeated);
      if(this.playerDefeated === true){
        this.scene.stop('gameHud');
        this.scene.start('gameOver');
        this.playerDefeated = false;
      }else{
        this.scene.stop();
        this.scene.start(this.destination); 
      }
      console.log('unpausing the game');
      console.log('this, scene: ',this);
      this.pausedInTextBox = false;
      this.isPaused = false;
      this.gameStartedDelay = false;
      this.PlayerOutOfBounds = false;
      this.playerWarping = false;

      //should protect agianst the struggle bar lingering if the player gets grabbed while warping.
      struggleEmitter.emit(struggleEvent.activateStruggleBar,false);

      //hide the giveup indicator
      giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

      //hides the skip indicator 
      skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
    });

    //emitter to transition scenes
    loadSceneTransitionLoad.on(SceneTransitionLoad.reloadGame,(location) =>{
      console.log('reloading game, location: ',location);
      console.log('this, scene: ',this);

      this.destination = location;

      
      this.clearGameplayEmmitters();
      //for loop looks through all the looping music playing within a given scene and stops the music.
      for(let counter = 0; counter < this.sound.sounds.length; counter++){
        this.sound.get(this.sound.sounds[counter].key).stop();
      }
      //this.scene.stop('gameHud');
      //this.scene.launch('gameHud');
      //this.scene.start('gameHud');

      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

  }

  //function to allow the gameplay scene to talk to the game hud.
  setUpGameplayEmitters(){

    //emitter to update onomat value in the gameplay scene
    inventoryKeyEmitter.on(inventoryKey.updateOnomat,(onomat) =>{
        this.onomatopoeia = onomat.value; 
        console.log("updating this.onomatopoeia: ",this.onomatopoeia);
    });

  }

  //sets up text box in scene
  setUpTextBox(){
    //note scenewidth defined later in default scene
    this.sceneTextBox = new textBox(this,this.screenWidth/2,620,'charBlack');
  }

  //contains most default timeout functions
  setUpDefaultTimeOuts(){

    let thisScene = this;

    this.safeToLoad = false;
    this.safeToSave = false;
    this.grabCoolDown = false;

    // stops user from warping so fast. after a second of being loaded the player can load zones.
    this.loadCoolDown = false;
    this.saveCoolDown = false;
    this.signCoolDown = false;

    
    setTimeout(function(){
      thisScene.loadCoolDown = true;
    },1000);
    setTimeout(function(){
      thisScene.saveCoolDown = true;
    },1000);
    setTimeout(function(){
      thisScene.signCoolDown = true;
    },1000);
    //console.log("warpToX:"+ this.warpToX +" warpToY: "+this.warpToY );
    // this delays grab when loading into the scene.

   
    setTimeout(function(){
      thisScene.grabCoolDown = false;
      console.log("grab cooldown has ended. player can be grabbed agian.");
      thisScene.gameStartedDelay = false;
      console.log("activating physics");
    },3000);

     // before we do anything, we need to pause the physics. that way the player does not fall out of the world
     this.physics.pause();
    setTimeout(function(){
      thisScene.gameStartedDelay = false;
      console.log("activating physics");
    },200);
    
  }

  //sets location of the game over.
  setupGameoverLocation(location){
    this.gameoverLocation = location;
  }

  //sets up lighting system for levels that use it.
  setupLightingSystem(hexColor){
    this.lightingSystemActive = true;

    //sets the ambient lighting color using a hex value.
    this.lights.enable().setAmbientColor(hexColor);
  }

}