class defaultScene extends allSceneFunctions {

    //{preload Functions}===================================================================================================================

    //loads all the sprites for a current default scene. may make more specalized preload function in the future.
    defaultPreload(){
        
       //loads the image with the tiles and the .json file of the tilemap
      this.load.image("source_map" , "assets/tiledMap/LockWood/Forest_Large_Tiles.png");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");
      
      this.load.spritesheet("malePlayer" , "assets/player/evan_master.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.spritesheet("femalePlayer" , "assets/player/evelyn_master.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.image('hitbox', 'assets/gameObjects/hitbox.png');

      this.load.spritesheet('keyPrompts', 'assets/hudElements/KeyPrompts.png',{frameWidth: 96, frameHeight: 96 });
      this.load.spritesheet('healthUpgrade', 'assets/gameObjects/healthUpgrade.png',{frameWidth: 99, frameHeight: 99 });
      this.load.spritesheet('barrier', 'assets/gameObjects/barrier.png',{frameWidth: 96, frameHeight: 96 });

       //weapon sound effects
       this.load.audioSprite('weaponSFX','audio/used-audio/player-sounds/weapon-swings.json',[
        "audio/used-audio/player-sounds/weapon-swings.mp3"
      ]);

      this.load.audioSprite('playerJumpSFX','audio/used-audio/bounce-sounds/bounce-sounds.json',[
        "audio/used-audio/bounce-sounds/bounce-sounds.mp3"
      ]);

      this.load.audioSprite('jumpSFX','audio/used-audio/bounce-sounds/bounce-sounds.json',[
        "audio/used-audio/bounce-sounds/bounce-sounds.mp3"
      ]);

      this.load.audioSprite('creakSFX','audio/used-audio/wood-creak-sounds/wood-creak-sounds.json',[
        "audio/used-audio/wood-creak-sounds/wood-creak.mp3"
      ]);

      this.load.audioSprite('plapSFX','audio/used-audio/plap-sounds/plap-sounds.json',[
        "audio/used-audio/plap-sounds/plap.mp3"
      ]);

      this.load.audioSprite('jumpySFX','audio/used-audio/jumpy-anime-sounds/jumpy-anime-sounds.json',[
        "audio/used-audio/jumpy-anime-sounds/jumpy-anime-sounds.mp3"
      ]);

      this.load.audioSprite('burpSFX','audio/used-audio/burp-sounds/burp-sounds.json',[
        "audio/used-audio/burp-sounds/burp.mp3"
      ]);

      this.load.audioSprite('stomachSFX','audio/used-audio/stomach-sounds/stomach-sounds.json',[
        "audio/used-audio/stomach-sounds/stomach.mp3"
      ]);

      this.load.audioSprite('swallowSFX','audio/used-audio/swallow-sounds/swallow-sounds.json',[
        "audio/used-audio/swallow-sounds/swallow.mp3"
      ]);

      this.load.audioSprite('lickSFX','audio/used-audio/lick-sounds/lick-sounds.json',[
        "audio/used-audio/lick-sounds/lick.mp3"
      ]);

      /*this.load.audioSprite('tigerSFX','audio/used-audio/tiger-sounds/tiger-sounds.json',[
        "audio/used-audio/tiger-sounds/tiger.mp3"
      ]);*/
  
       this.load.spritesheet('warpSprites', 'assets/gameObjects/warpSprites.png',{frameWidth: 192, frameHeight: 288 });
       this.load.spritesheet('savePoint', 'assets/gameObjects/saveStatue.png',{frameWidth: 213, frameHeight: 300 });
       this.load.spritesheet('sign', 'assets/gameObjects/Sign.png',{frameWidth: 99, frameHeight: 135 });
       this.load.spritesheet('itemDrops', 'assets/gameObjects/itemDrops.png',{frameWidth: 96, frameHeight: 96});
       this.load.spritesheet('chest', 'assets/gameObjects/chest.png',{frameWidth: 249, frameHeight: 231});

       this.load.spritesheet('doubleJumpEffect', 'assets/gameObjects/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
           
       //loads a plugin to the heaa of the html to animate tiles in levels

    }

    //{scene setup Functions}===================================================================================================================

    //sets up default scene variables that every scene should need. could be factored out into multiple varialbe set ups for different scenes
    constructStockSceneVariables(){

        //variables that all scenes should have
        this.keyA;
        this.keyW;
        this.keyD;
        this.keyS;
        this.keyTAB;
        this.space;
        this.shift;
        this.player1;
        this.grabbed = false;
        this.mycamera;
        this.spawnedEnemys = false;
        this.KeyDisplay;
        //this.skipIndicator;
        this.processMap;
        this.backround;
        this.myMap;
        this.warp1;
        this.loadCoolDown = false;
        this.saveCoolDown = false;
        this.signCoolDown = false;
        this.portals;
        this.portalId = 0;
        this.saveStoneId = 0;
        this.signId = 0;
        this.npcId = 0;
        this.activatedPortalId = 0;
        this.activatedSavePointId = 0;
        this.activatedSignId = 0;
        this.activatedNpcId = 0;
        this.containerId = 0;
        this.activatedContainerId = 0;
        this.grabCoolDown = false;
        this.attackHitBox;
        this.signPoints;
        this.container;
        this.saveStonePoints;
        this.isPaused = false;
        this.sceneTextBox;
        this.pausedInTextBox = false;
        this.enemyThatDefeatedPlayer ="";
        this.warpToX = 450;
        this.warpToY = 600;
        this.playerSex;
        this.settings;
        
        this.preferance;
        this.onomatopoeia;


        this.itemDrops;

        this.gameStartedDelay = true;

        this.gameoverLocation = "caveGameover";

        this.defeatedTitle = "cursed";

        this.tabObject = {
            tabIsDown: false
        };

        this.loopingMusic = [];

        this.sentToTitle = false;

        //variable to tell when the player is defeated to call a different load.
        this.playerDefeated = false;

        this.gaveoverCalled = false;
        //handle player self grab.
        this.playerStuckGrab = false;
        this.playerStuckGrabActivated = false;
        this.PlayerStuckSFXTimer = false;
        this.playerStuckGrabbedBy = "";
        this.playerStuckGrabCap = 0;
        
        

    }

    //function to set up player key input definitions.
    setUpPlayerInputs(){
        // allows detection of key inputs for movement and player attacks
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //controls for the hud.
        this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    }

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
    }

    //sets up player object
    setUpPlayer(){
        //creates a player object with the given values
        this.player1 = new player(this,this.warpToX,this.warpToY,this.playerSex);
        //creates a hitbox which will be used to 
        this.attackHitBox = new hitBoxes(this,this.player1.x,this.player1.y);
    }

    //sets up keyprompts in the scene for when the player is grabbed.
    setUpKeyPrompts(){
        this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
        this.KeyDisplay.visible = false;
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

    setupSlimeStucks(){
      //sets up stuck animations so they are defined in the scope of the scenes that need them.
      if(this.playerSex === 0){
        this.player1.anims.create({key: 'blueSlimeStuck',frames: this.anims.generateFrameNames('malePlayerStucks', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
      }else{
        this.player1.anims.create({key: 'blueSlimeStuck',frames: this.anims.generateFrameNames('femalePlayerStucks', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
      }

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
      this.sceneTextBox = new textBox(this,450,620,'charBlack');
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

    //{collision Functions}===================================================================================================================

    //sets up player collision
    setUpPlayerCollider(){
        this.physics.add.collider(this.player1,this.processMap.layer1);
        this.physics.add.collider(this.player1,this.processMap.layer0);
    }

    //sets up itemDrop collision
    setUpItemDropCollider(){
      //sets up physics for the itemDrops Group
      this.physics.add.collider(this.itemDrops,this.processMap.layer1);
      this.physics.add.collider(this.healthUpgrades,this.processMap.layer1);
      //this.physics.add.collider(this.itemDrops,this.processMap.layer0);
    }

    
    //sets up function to give a object collision with layer1
    setUpLayer1Collider(object){
        this.physics.add.collider(this.processMap.layer1, object);
    }

    setUpEnemyBarriers(){
      this.physics.add.collider(this.enemys, this.invisibleBarriers);
    }

    setUpEnemyBarriers(){
      this.physics.add.collider(this.enemys, this.invisibleBarriers);
    }

    setUpWoodBarriersCollider(){
      console.log('setting up wooden barrier colliders');
      this.physics.add.collider(this.enemys, this.woodenBarriers);
      this.physics.add.collider(this.player1, this.woodenBarriers);

    }

    setUpSlimeProjectilesBarriers(){
      this.physics.add.collider(this.processMap.layer1, this.slimeProjectiles);
    }

    //{itit object Functions}===================================================================================================================

    //creates warp portal objects in the scene
    initPortals(x, y, toX, toY, animation,destination) {
        let portal1 = new warp(this, x, y);
        //gives portal a unique id so that scene can tell which warp object is being activated
        portal1.warpPortalId = this.portalId;
        this.portalId++;
        //sets the location given as to where the player will be sent in the next scene
        portal1.setLocationToSendPlayer(toX, toY, animation,destination);
        //adds portal object to the portal object in the scene
        this.portals.add(portal1);
        //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
        //console.log(" scene.portalId: "+ scene.portalId);
    }

    //creates warp portal objects in the scene
    initBedPortals(x, y) {
      let portal1 = new bedWarp(this, x, y);
      //gives portal a unique id so that scene can tell which warp object is being activated
      portal1.warpPortalId = this.portalId;
      this.portalId++;
      //sets the location given as to where the player will be sent in the next scene
      portal1.setLocationToSendPlayer(1018, 925,'DreamHub');
      //adds portal object to the portal object in the scene
      this.portals.add(portal1);
      //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
      //console.log(" scene.portalId: "+ scene.portalId);
  }

    //creates warp portal objects that are transparent in the scene
    initPortalsWithTransparency(x, y, toX, toY, animation,destination,transparency) {
      let portal1 = new warp(this, x, y);
      portal1.setAlpha(transparency);
      portal1.setDepth(100);
      //gives portal a unique id so that scene can tell which warp object is being activated
      portal1.warpPortalId = this.portalId;
      this.portalId++;
      //sets the location given as to where the player will be sent in the next scene
      portal1.setLocationToSendPlayer(toX, toY, animation,destination);
      //adds portal object to the portal object in the scene
      this.portals.add(portal1);
      //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
      //console.log(" scene.portalId: "+ scene.portalId);
    }

    //creates save point in the scene
    initSavePoints(x, y) {
        let savePoint1 = new savePoint(this, x, y);
        //gives portal a unique id so that scene can tell which warp object is being activated
        savePoint1.saveStoneId = this.saveStoneId;
        this.saveStoneId++;
        //sets the location given as to where the player will be sent in the next scene
        //adds portal object to the portal object in the scene
        this.saveStonePoints.add(savePoint1);
        //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
        //console.log(" scene.portalId: "+ scene.portalId);
    }

    //creates a sign object in the scene
    initSigns(x, y, text, profileArray) {
        let sign1 = new sign(this, x, y, text, profileArray);
        //gives portal a unique id so that scene can tell which warp object is being activated
        sign1.signId = this.signId;
        this.signId++;
        //sets the location given as to where the player will be sent in the next scene
        //adds portal object to the portal object in the scene
        console.log("group signs",this.signPoints);
        this.signPoints.add(sign1);
        console.log("added sign",this.signPoints);
        
    }

    //creates a sign object in the scene
    initStorage(x, y) {
      let storage = new storageLocker(this, x, y);
      //sets the location given as to where the player will be sent in the next scene
      //adds portal object to the portal object in the scene
      console.log("group container",this.container);
      this.playerStorage.add(storage);
      console.log("added container",this.container);
      
    }

    //creates a sign object in the scene
    initPlayerCraftingBench(x, y) {
      let bench = new craftingBench(this, x, y);
      //sets the location given as to where the player will be sent in the next scene
      //adds portal object to the portal object in the scene
      console.log("group bench",this.playerCraftingBench);
      this.playerCraftingBench.add(bench);
      console.log("added bench",this.playerCraftingBench);
      
    }

    //creates a lunalyst NPC
    initLunalyst(x, y, text, profileArray,flag) {
      let luna = new lunalyst(this, x, y, text, profileArray,flag);
      //gives portal a unique id so that scene can tell which warp object is being activated
      luna.npcId = this.npcId;
      this.npcId++;
      //sets the location given as to where the player will be sent in the next scene
      //adds portal object to the portal object in the scene
      this.npcs.add(luna);
      //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
      //console.log(" scene.portalId: "+ scene.portalId);
  }

    //creates a item drop object in the scene
    initItemDrop(x, y,itemID,itemStackable,itemAmount) {
      //creates a item drop
      let drop1 = new itemDrop(this, x, y,itemID,itemStackable,itemAmount);
      //adds it to the item drop group
      //drop1.body.setGravityY(600);
      this.itemDrops.add(drop1);
      //adds gravity. dont know why defining it in the object itself didnt work. this is fine.
      drop1.body.setGravityY(600);
      
      drop1.body.setBounce(0.5 , 0.5);

      console.log("adding new item drop: ",drop1)
      
    }

    //creates a healthUpgrade object in the scene. checks the flag value to see if the object should be spawned or not.
    initHealthUpgrade(x, y, flag) {

      //make a temp object
      let object = {
        flagToFind: flag,
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if it has not then spawn it in the level
      if(object.foundFlag === false){

        //creates a item drop
        let upgrade1 = new healthUpgrade(this, x, y,flag);
        
        //adds healthUpgrade to group
        this.healthUpgrades.add(upgrade1);

        //adds gravity. dont know why defining it in the object itself didnt work. this is fine.
        upgrade1.body.setGravityY(600);

        upgrade1.body.setBounce(0.5 , 0.5);

        console.log("adding new healthUpgrade: ",upgrade1)
      }
      
    }

    //creates a item container in the scene
    initItemContainer(x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag) {
      //creates a item drop
      let container = new itemContainer(this, x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag);

      //gives portal a unique id so that scene can tell which warp object is being activated
      container.containerId = this.containerId;
      this.containerId++;
      //adds it to the item drop group
      this.itemContainers.add(container);
      
      console.log("adding new item container: ",container)
      
    }

    initBarrier(x,y,width,height){

      let invisWall = this.add.sprite(x, y,'barrier');
      this.physics.add.existing(invisWall);
      invisWall.body.setSize(width, height, true);
      invisWall.body.pushable = false;
      this.invisibleBarriers.add(invisWall);

    }

    initWoodenBarrier(x,y){

      let woodWall = new woodBarrier(this,x,y);
      this.physics.add.existing(woodWall);
      woodWall.body.pushable = false;
      this.woodenBarriers.add(woodWall);

    }

    initRockPile(x,y){
      let pile = new rockPile(this,x,y);
      this.physics.add.existing(pile);
      pile.body.pushable = false;
      this.rockPiles.add(pile);

    }

    initSlimeSpike(x,y){
      let slimeTrap = new slimeSpike(this,x,y);
      this.physics.add.existing(slimeTrap);
      slimeTrap.body.pushable = false;
      this.slimeSpikes.add(slimeTrap);

    }

    initSlimeProjectile(x,y){
      let slimeProj = new slimeProjectile(this,x,y);
      this.physics.add.existing(slimeProj);
      this.slimeProjectiles.add(slimeProj);

    }
    
    //{check object Functions}===================================================================================================================

    //test to see if the player should be warped
    checkWarp(location) {
        //console.log("checking warp");
        //applies a function to each portal object in the scene
        this.portals.children.each(function (tempPortal) {
        //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
        // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
        if ((this.player1.x > tempPortal.x - 30 && this.player1.x < tempPortal.x + 30) && (this.player1.y > tempPortal.y - 50 && this.player1.y < tempPortal.y + 50) && this.grabbed === false) {
            console.log("within warp point");
            tempPortal.safeToLoad = true;
            this.activatedPortalId = tempPortal.warpPortalId;
            //console.log("scene.activatedPortalId: "+scene.activatedPortalId+" tempPortal.warpPortalId: "+tempPortal.warpPortalId+" scene.safeToLoad: "+scene.safeToLoad+" scene.safeToSave: "+scene.safeToSave);
        } else {
            //console.log("outside save point");
            tempPortal.safeToLoad = false;
        }

        tempPortal.warpTo(this, this.keyW, this.activatedPortalId);
        }, this);
    }

    //test to se if the player is safe to save there game
    checkSave() {
        //applies a function to each portal object in the scene
        this.saveStonePoints.children.each(function (tempSavePoint) {
        //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
        // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
        if ((this.player1.x > tempSavePoint.x - 50 && this.player1.x < tempSavePoint.x + 50) && (this.player1.y > tempSavePoint.y - 50 && this.player1.y < tempSavePoint.y + 50) && this.grabbed === false) {
            //console.log("within save point");
            tempSavePoint.safeToSave = true;
            this.activatedSavePointId = tempSavePoint.saveStoneId;
        } else {
            //console.log("outside save point");
            tempSavePoint.safeToSave = false;
        }
        tempSavePoint.savePointSaveGame(this, this.keyW, this.activatedSavePointId, tempSavePoint.x, tempSavePoint.y);
        
        }, this);
    }

    //checks to see if the player can activate a sign object
    checkSign(scene) {
      //console.log("checking sign code: scene.signPoints: ",scene.signPoints);
        //applies a function to each portal object in the scene
        this.signPoints.children.each(function (tempSignPoint) {
          //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
          // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
          //console.log("testing to see if player is within range");
          if ((scene.player1.x > tempSignPoint.x - 30 && scene.player1.x < tempSignPoint.x + 30) && (scene.player1.y > tempSignPoint.y - 30 && scene.player1.y < tempSignPoint.y + 30) && scene.grabbed === false) {
            //console.log("within sign");
            tempSignPoint.safeToSign = true;
            scene.activatedSignId = tempSignPoint.signId;
          } else {
            //console.log("outside sign");
            tempSignPoint.safeToSign = false;
          }
          tempSignPoint.activateSign(scene, scene.keyW, scene.activatedSignId);
    
        }, scene);
    }

    //checks to see if the player can activate a npc object
    checkNpc(scene) {
      //applies a function to each portal object in the scene
      scene.npcs.children.each(function (tempNpc) {
        if ((scene.player1.x > tempNpc.x - 50 && scene.player1.x < tempNpc.x + 50) && (scene.player1.y > tempNpc.y - 50 && scene.player1.y < tempNpc.y + 50) && scene.grabbed === false) {
          //console.log("within luna's range tempNpc.npcId: ",tempNpc.npcId);
          tempNpc.safeToSpeak = true;
          scene.activatedNpcId = tempNpc.npcId;
        } else {
          //console.log("outside save point");
          tempNpc.safeToSpeak = false;
        }
        tempNpc.activateNpc(scene, scene.keyW, scene.activatedNpcId);
  
      }, scene);
  }

    //checks to see if the items should be picked up
    checkItemPickUp() {
        
      this.itemDrops.children.each(function (tempItemDrop) {
      //if player overlaps with item then they pick it up
      if ((this.player1.x > tempItemDrop.x - 20 && this.player1.x < tempItemDrop.x + 20) && (this.player1.y > tempItemDrop.y - 20 && this.player1.y < tempItemDrop.y + 20) && this.grabbed === false) {
          console.log("picked up item");
          //create a temp item to pass to emitter
          let item = tempItemDrop.itemDropObject;

          let addedToInventory = {
            added: false
          };

          console.log("item : ", item);
          //emitter to add object to inventory.
          inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);
          console.log("addedToInventory : ", addedToInventory);
           if(addedToInventory.added === true){
              tempItemDrop.destroy();
           }

        } 

        }, this);

        //checks to see if a health upgrade should be added.
        this.healthUpgrades.children.each(function (tempUpgrade) {
          //if player overlaps with item then they pick it up
          if ((this.player1.x > tempUpgrade.x - 20 && this.player1.x < tempUpgrade.x + 20) && (this.player1.y > tempUpgrade.y - 20 && this.player1.y < tempUpgrade.y + 20) && this.grabbed === false) {
              console.log("picked up healthUpgrade");

              
              //call emmiter to upgrade the health by 1
              healthEmitter.emit(healthEvent.upgradeHealth);

              //destroy the object, and adds flag.
              tempUpgrade.destroyAndFlag();
              
            } 
    
            }, this);
    }

    //checks to see if the container should be opened
    checkContainerPickUp() {
        
      this.itemContainers.children.each(function (tempItemContainer) {
      //if player overlaps with item then they pick it up
      if ((this.player1.x > tempItemContainer.x - 40 && this.player1.x < tempItemContainer.x + 40) && (this.player1.y > tempItemContainer.y - 40 && this.player1.y < tempItemContainer.y + 40) && this.grabbed === false) {
          
           //console.log("within sign");
           tempItemContainer.safeToOpen = true;
           this.activatedContainerId = tempItemContainer.containerId;
         } else {
           //console.log("outside save point");
           tempItemContainer.safeToOpen = false;
         }

        tempItemContainer.activateContainer(this,this.keyW, this.activatedContainerId);
        }, this);
    }

  checkWoodenBarriers(){
    this.woodenBarriers.children.each(function (tempbarrier) {

      if(this.objectsInRangeX(tempbarrier,this.player1,100)){
          //checks if the attack hitbox is overlapping the tiger to deal damage.
        this.physics.add.overlap(this.attackHitBox, tempbarrier, function () {
    
          tempbarrier.hitboxOverlaps = true;
        });

        if (tempbarrier.hitboxOverlaps === true) {
          console.log("woodenbarrier taking damage, " + tempbarrier.hp);
          tempbarrier.damage();
          tempbarrier.hitboxOverlaps = false;
        }
      }
    }, this);
  }

    checkRockPiles(){
      this.rockPiles.children.each(function (tempPile) {

         //checks if the attack hitbox is overlapping the tiger to deal damage.
         //this.physics.add.overlap(tempPile, this.player1, function () {
        if(this.objectsInRangeX(tempPile,this.player1,40) && this.objectsInRangeY(tempPile,this.player1,40)){
          tempPile.hitboxOverlaps = true;
        }
        //});
        
        if (tempPile.hitboxOverlaps === true) {
          tempPile.activateRockPile();
        }
      }, this);
    }

    checkSlimeSpikes(){
      this.slimeSpikes.children.each(function (tempSpike) {

         //checks if the attack hitbox is overlapping the tiger to deal damage.
         //this.physics.add.overlap(tempPile, this.player1, function () {
        if(this.objectsInRangeX(tempSpike,this.player1,40) &&this.isPaused === false &&this.playerStuckGrab === false && this.grabbed === false){
          tempSpike.inRange = true;
        }
        //});
        
        if (tempSpike.inRange === true) {
          tempSpike.activateSlimeSpike();
          tempSpike.inRange = false;
        }
      }, this);
    }

    checkSlimeProjectiles(){
      this.slimeProjectiles.children.each(function (tempProjectile) {
        //ensures gravity is applied,
        tempProjectile.body.setGravityY(600);

        //if projectile hits the ground then
        if(tempProjectile.body.blocked.down && !tempProjectile.hitTheGround){
          console.log("slime projectile hit ground!")
          //call slime projectile to destroy its self 
          tempProjectile.destroySlimeProjectile();
          tempProjectile.hitTheGround = true;
        }

        let tempScene = this;
        //if projectile overlaps with player then
        this.physics.add.overlap(this.player1, tempProjectile, function () {

          if(tempProjectile.body.blocked.down === false){
            //set up player stuck grab and 
            tempScene.playerStuckGrab = true;
            tempScene.playerStuckGrabbedBy = "slime_projectile";
            tempScene.playerStuckGrabCap = 100;
            tempScene.player1.anims.play("blueSlimeStuck",true);
            tempProjectile.destroy();
          }


        });

      }, this);
    }

    checkLocker(){
      this.playerStorage.children.each(function (tempStorage) {

         //checks if the attack hitbox is overlapping the tiger to deal damage.
         //this.physics.add.overlap(tempPile, this.player1, function () {
        if(this.objectsInRangeX(tempStorage,this.player1,40) && this.objectsInRangeY(tempStorage,this.player1,40)){

           tempStorage.safeToOpen = true;
         } else {
           //console.log("outside save point");
           tempStorage.safeToOpen = false;
         }
        //});
        

        tempStorage.activateStorage(this.keyW);
        
      }, this);
    }

    //special check to keep player from falling out of the world
    checkPlayerOutOfBounds(){
      if(this.player1.y > 3000){
        this.player1.x = this.warpToX
        this.player1.y = this.warpToY-2000
      }

    }

    //{game over scene transitions}===================================================================================================================

    //function which destroys this scene and starts the gameover scene.
    changeToGameover(){
     

        let playerSaveSlotDataObject = {
          playerSaveSlotData: null
        };
      
        playerSaveSlotEmitter.emit(playerSaveSlot.getSaveSlot,playerSaveSlotDataObject)

        console.log("this.playerSaveSlotData sent to gameover: ",playerSaveSlotDataObject.playerSaveSlotData);
  
        if(playerSaveSlotDataObject.playerSaveSlotData !== null){
      
        this.saveGameoverFile(this.playerSex,this.gameoverLocation,this.enemyThatDefeatedPlayer,playerSaveSlotDataObject.playerSaveSlotData,this.defeatedTitle);

        //clears emitters
        this.clearAllEmmitters();
        this.clearGameplayEmmitters();

        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
          this.sound.get(this.sound.sounds[counter].key).stop();
        }

        this.playerDefeated = true;
        this.cameras.main.fadeOut(500, 0, 0, 0);
      }
      
  
    }

    //{enemy functions}======================================================================================================================

    //sets up colliders for enemys. enemys have the same colliders at the player.
    setUpEnemyCollider(enemyGroupArray){

      //array storing all the enemy groups present. currently empty
      //loop which searches array of enemys, then allocates those groups.
      for(let counter = 0; counter < enemyGroupArray.length; counter++){
        if(enemyGroupArray[counter] === 'blueSlimes'){

          console.log("adding blueSlimes group");
          this.blueSlimes = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'tigers'){

          console.log("adding Tigers group");
          this.tigers = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'rabbits'){

          console.log("adding rabbits group");
          this.rabbits = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'beeDrones'){

          console.log("adding beeDrones group");
          this.beeDrones = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'bats'){

          console.log("adding bats group");
          this.bats = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'blueSlimeHSs'){

          console.log("adding blueSlimeHSs group");
          this.blueSlimeHSs = this.physics.add.group();
        }
        if(enemyGroupArray[counter] === 'blueSlimeHMs'){

          console.log("adding blueSlimeHMs group");
          this.blueSlimeHMs = this.physics.add.group();
        }
      }
      //creates enemys group that can apply geberic functions to all enemys
      this.enemys = this.physics.add.group();

      //this.tigers = this.physics.add.group();
      //this.blueSlimes = this.physics.add.group();
      //creates id so scene can work with multiple enemys
      this.enemyId = 0;
      this.physics.add.collider(this.processMap.layer1, this.enemys);
      this.physics.add.collider(this.processMap.layer0, this.enemys); 
    }
    
    //creates a enemy. enemytype determines what enemy is spawned
    initEnemy(startX, startY, playerSex, enemyType,inSafeMode,soundSFX) {
      console.log("enemy spawned: ",enemyType);

    
      //creates a enemy based on enemyType passed in.
      if(enemyType === 'blueSlime'){
        
        //creates a secondary group to handle enemy specific interactions which we will use later
        let slime1 = new blueSlime(this, startX, startY, playerSex,this.enemyId,inSafeMode);
        console.log("blueSlime.enemyId: ",slime1.enemyId);
        this.enemyId++;
        //adds the enemy to both groups.
        this.enemys.add(slime1);
        this.blueSlimes.add(slime1);

      }else if(enemyType === 'blueSlimeLarge'){
        
        //creates a secondary group to handle enemy specific interactions which we will use later
        let slime1 = new blueSlime(this, startX, startY, playerSex,this.enemyId,inSafeMode);
        console.log("blueSlime.enemyId: ",slime1.enemyId);
        this.enemyId++;
        slime1.slimeSize = 2;
        slime1.anims.play("slimeLargeIdle",true);
        //adds the enemy to both groups.
        this.enemys.add(slime1);
        this.blueSlimes.add(slime1);

      }else if(enemyType === 'tiger'){
        let tiger1 = new tiger(this, startX, startY, playerSex,this.enemyId,inSafeMode);
        console.log("tiger1.enemyId: ",tiger1.enemyId);
        this.enemyId++;
        this.enemys.add(tiger1);  
        this.tigers.add(tiger1);

      }else if(enemyType === 'tigerBooba'){
        let tiger1 = new tiger(this, startX, startY, playerSex,this.enemyId,inSafeMode);
        console.log("tiger1.enemyId: ",tiger1.enemyId);
        this.enemyId++;
        tiger1.tigerHasEatenRabbit = true;
        tiger1.anims.play('tigerTummybreastSquish',true);
        this.enemys.add(tiger1);  
        this.tigers.add(tiger1);

      }else if(enemyType === 'rabbit'){
        
        let rabbit1 = new rabbit(this, startX, startY, playerSex,this.enemyId,inSafeMode);
        console.log("rabbit1.enemyId: ",rabbit1.enemyId);
        this.enemyId++;
        this.enemys.add(rabbit1);  
        this.rabbits.add(rabbit1);

      }else if(enemyType === 'beeDrone'){
        
        let beeDrone1 = new beeDrone(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);
        console.log("beeDrone.enemyId: ",beeDrone1.enemyId);
        this.enemyId++;
        this.enemys.add(beeDrone1);  
        this.beeDrones.add(beeDrone1);
      }else if(enemyType === 'bat'){
        console.log("inSafeMode: ",inSafeMode)
        let bat1 = new bat(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);
        console.log("bat1.enemyId: ",bat1.enemyId);
        this.enemyId++;
        this.enemys.add(bat1);  
        this.bats.add(bat1);
      }else if(enemyType === 'blueSlimeHS'){
        
        //creates a secondary group to handle enemy specific interactions which we will use later
        let slime1 = new blueSlimeHS(this, startX, startY, playerSex,this.enemyId,inSafeMode);

        console.log("blueSlimeHS.enemyId: ",slime1.enemyId);
        this.enemyId++;
        //adds the enemy to both groups.
        this.enemys.add(slime1);
        this.blueSlimeHSs.add(slime1);

      }else if(enemyType === 'blueSlimeHM'){
        
        //creates a secondary group to handle enemy specific interactions which we will use later
        let slime1 = new blueSlimeHM(this, startX, startY, playerSex,this.enemyId,inSafeMode);

        console.log("blueSlimeHM.enemyId: ",slime1.enemyId);
        this.enemyId++;
        //adds the enemy to both groups.
        this.enemys.add(slime1);
        this.blueSlimeHMs.add(slime1);
      }else{
        console.log("UNKNOWN enemyType: ",enemyType);
        /*let enemy = new enemyTemplate(this, startX, startY, playerSex,this.enemyId);
        console.log("enemy.enemyId: ",enemy.enemyId);
        this.enemyId++;
        this.enemys.add(enemy); */
      }
      
    }

    //contains the logic all enemys should follow when a player is grabbed
    checkEnemyGrab() {
      this.enemys.children.each(function (tempEnemy) {
        if (tempEnemy.playerGrabbed === true) {
            
            //reset stuck grab values incase the player is in a stuck grab when grabbed
            this.playerStuckGrab = false;
            this.playerStuckGrabActivated = false;
            this.playerStuckGrabbedBy = "";
            this.playerStuckGrabCap = 0;

            //focus on the tiger that grabbed the player
            this.mycamera.startFollow(tempEnemy);
            this.cameras.main.zoom = 4;
            this.grabbed = tempEnemy.playerGrabbed;
            //scene, player1, KeyDisplay,keyTAB, keyW, keyS,keyA, keyD
            if(tempEnemy.inSafeMode === false){
              tempEnemy.grab();
            }else{
              tempEnemy.animationGrab();
            }
            
            //console.log(" player grabbed by tiger tempTiger.tigerId: ",tempTiger.tigerId," tempTiger.playerGrabbed: ",tempTiger.playerGrabbed);
            
        } else {
            //if enemy didn't grab player but player was grabbed then play idle animation.
            tempEnemy.moveIdle();
        }
      }, this);
    }

    //contains the logic for self grabs, or when the player is grabbed/stuck by a projectile 
    checkStuckGrab() {

      //if the player did get self grabbeda
     if(this.playerStuckGrab === true && this.grabbed === false){

      //then do set up for that grab
      if(this.playerStuckGrabActivated === false){
        this.cameras.main.zoom = 4;
        this.cameras.main.followOffset.set(0,10);
        this.KeyDisplay.visible = true;
        this.KeyDisplay.playWKey();

        //makes the struggle bar visible
        struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
        struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.playerStuckGrabCap);
        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.playerStuckGrabCap);
        this.playerStuckGrabActivated = true;

        //stops the players velocity during the initial grab.
        this.player1.setVelocityX(0);
        this.player1.setVelocityY(0);
        //plays sfx for player being stuck
        if(this.PlayerStuckSFXTimer === false){
          if(this.playerStuckGrabbedBy === "slime_projectile"){
            this.initSoundEffect('blueSlimeSFX','1',0.3);
            this.PlayerStuckSFXTimer = true;

            let thisScene = this;
            setTimeout(function(){
              thisScene.PlayerStuckSFXTimer = false;
            },800);
          } 
        }
      }
      //makes sure the key display follows the player incase they where grabbed in air.
      this.KeyDisplay.x = this.player1.x;
      this.KeyDisplay.y = this.player1.y+50;
      
      //if the player is w then
      if(Phaser.Input.Keyboard.JustDown(this.keyW) === true && this.playerStuckGrabCap > 0){
        //reduce the stuck cap counter
        this.playerStuckGrabCap-=20;
        //update the struggle bar
        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.playerStuckGrabCap);
      }
      // if the player broke free, then
      if(this.playerStuckGrabCap <= 0 ){
        //reset the grab values
        this.playerStuckGrab = false;
        this.playerStuckGrabActivated = false;
        this.playerStuckGrabbedBy = "";
        this.playerStuckGrabCap = 0;
        this.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
      }

      //plays sfx for player being stuck
      if(this.PlayerStuckSFXTimer === false){
        if(this.playerStuckGrabbedBy === "slime_projectile"){
          this.initSoundEffect('blueSlimeSFX','3',0.3);
          this.PlayerStuckSFXTimer = true;

          let thisScene = this;
          setTimeout(function(){
            thisScene.PlayerStuckSFXTimer = false;
          },800);
        } 
      }

     }  
    }

    //pauses enemy animations when the player is paused. calles function in enemy base class
    checkEnemyAnimationPause() {
      this.enemys.children.each(function (tempEnemy) {
        tempEnemy.pauseAnimations(this);
      }, this);
    }

    objectsInRangeX(object1,object2, width){

      if ((object1.x > object2.x - width && object1.x < object2.x + width)){
        return true;
      }else{
        return false;
      }
    }

    objectsInRangeY(object1,object2, height){

      if ((object1.y > object2.y - height && object1.y < object2.y + height)){
        return true;
      }else{
        return false;
      }
    }

    startGrabCoolDown(){
      let that = this;
      setTimeout(function () {
        that.grabCoolDown = false;
    }, 1500);
    }

    viewAnimationLogic(enemy){
      //check if the player presses w while in range   
      if(Phaser.Input.Keyboard.JustDown(this.keyW) === true){
          
        //stop the velocity of the player
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        this.player1.setVelocityX(0);
        //calls the grab function
        enemy.animationGrab();
      
        //sets the scene grab value to true since the player has been grabbed
        enemy.playerGrabbed = true;
        enemy.grabCoolDown = true;
        this.grabbed = true;
        this.grabCoolDown = true;
        enemy.safePrompts.visible = false;

      //otherwise show prompts so the player knows what button to press to enter the animation
      }else{

        //safety check to make sure that animation is played only once
        if(enemy.playedSafePrompts === false){
          enemy.safePrompts.visible = true;
          enemy.playedSafePrompts = true;
          enemy.safePrompts.playWKey();
        }
      }
    // otherwise hid the prompt from the player.
    }
    
    //function keeps track of slime interactions
    checkBlueSlimeInteractions(scene) {

      //console.log("checking slime interactions");
      //applies functions to all slimes in the group.
      scene.blueSlimes.children.each(function (tempSlime) {

        //safty check to improve performance. only does overlap if in range.
        if(this.objectsInRangeX(tempSlime,this.player1,400) && this.objectsInRangeY(tempSlime,this.player1,150) && tempSlime.inSafeMode === false){
          //calls to make each instance of a slime move.
          tempSlime.move(scene.player1,scene);
          scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          if(tempSlime.hitboxOverlaps === true) {
            console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
            tempSlime.damage(scene);
            tempSlime.hitboxOverlaps = false;
          }
          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          scene.physics.add.overlap(scene.player1, tempSlime, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
              //scene.playerInventory.setView(scene);
            }
            //console.log("player overlaps slime");
            //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            if (tempSlime.grabCoolDown === false && tempSlime.mitosing === false && scene.grabCoolDown === false) {
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              tempSlime.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = true;
              scene.grabbed = true;
              scene.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });
          //if the slime is size 1 then it checks for overlap between slimes. then if the collide they fuse together and play combination animation
          if (tempSlime.slimeSize === 1) {
            //creates another function applies to the slimes so that there are two instances of a function being applied
            scene.blueSlimes.children.each(function (tempSlime1) {
              // collider used to detect a collision between two slimes
              scene.physics.add.overlap(tempSlime1, tempSlime, function () {
                // if both slimes are of size 1 then call combine function
                if (tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1) {
                  tempSlime.slimeCombine(tempSlime1, scene.grabbed,scene);
                }
              });
            }, this);
          }
          //deincriments the grabcooldown on any slime that grabbed the player.
          tempSlime.mitosisDelayCheck();
          // creates a overlap between the damage hitbox and the slime so that slime can take damage
        }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

          this.viewAnimationLogic(tempSlime);
        // otherwise hid the prompt from the player.
        }else{
          tempSlime.setVelocityY(0);
          tempSlime.setVelocityX(0);
          tempSlime.safePrompts.visible = false;
          tempSlime.playedSafePrompts = false;
        }
      }, this);

    }

    //function keeps track of slime interactions
    checkBlueSlimeHSInteractions(scene) {

      //console.log("checking slime interactions");
      //applies functions to all slimes in the group.
      scene.blueSlimeHSs.children.each(function (tempSlime) {

        //safty check to improve performance. only does overlap if in range.
        if(this.objectsInRangeX(tempSlime,this.player1,400) && this.objectsInRangeY(tempSlime,this.player1,150) && tempSlime.inSafeMode === false){
          //calls to make each instance of a slime move.
          tempSlime.move(scene.player1,scene);
          scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          if(tempSlime.hitboxOverlaps === true) {
            console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
            tempSlime.damage(scene);
            tempSlime.hitboxOverlaps = false;
          }
          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          scene.physics.add.overlap(scene.player1, tempSlime, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
              //scene.playerInventory.setView(scene);
            }
            //console.log("player overlaps slime");
            //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            if (tempSlime.grabCoolDown === false && scene.grabCoolDown === false) {
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              tempSlime.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = true;
              scene.grabbed = true;
              scene.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });
          
        //function for animation viewer logic.
        }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

          this.viewAnimationLogic(tempSlime);
        // otherwise hid the prompt from the player.
        }else{
          tempSlime.setVelocityY(0);
          tempSlime.setVelocityX(0);
          tempSlime.safePrompts.visible = false;
          tempSlime.playedSafePrompts = false;
        }
      }, this);

    }

    checkBlueSlimeHMInteractions(scene) {

      //console.log("checking slime interactions");
      //applies functions to all slimes in the group.
      scene.blueSlimeHMs.children.each(function (tempSlime) {

        //safty check to improve performance. only does overlap if in range.
        if(this.objectsInRangeX(tempSlime,this.player1,400) && this.objectsInRangeY(tempSlime,this.player1,150) && tempSlime.inSafeMode === false){
          //calls to make each instance of a slime move.
          tempSlime.move(scene.player1,scene);
          scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          if(tempSlime.hitboxOverlaps === true) {
            console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
            tempSlime.damage(scene);
            tempSlime.hitboxOverlaps = false;
          }
          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          scene.physics.add.overlap(scene.player1, tempSlime.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
              //scene.playerInventory.setView(scene);
            }
            console.log("player overlaps slime");
            //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            if (tempSlime.grabCoolDown === false && scene.grabCoolDown === false) {
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              tempSlime.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = true;
              scene.grabbed = true;
              scene.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });
          
        //function for animation viewer logic.
        }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

          this.viewAnimationLogic(tempSlime);
        // otherwise hid the prompt from the player.
        }else{
          tempSlime.setVelocityY(0);
          tempSlime.setVelocityX(0);
          tempSlime.safePrompts.visible = false;
          tempSlime.playedSafePrompts = false;
        }
      }, this);

    }

    //function keeps track of slime interactions
    checkTigerInteractions(scene) {

      //applys a function to all tigers
      scene.tigers.children.each(function (tempTiger) {

        if(scene.objectsInRangeX(tempTiger,scene.player1,300) && scene.objectsInRangeY(tempTiger,scene.player1,150) && tempTiger.inSafeMode === false ){
        //function to check rabbits and see if the tiger can grab one
        scene.rabbits.children.each(function (tempRabbit) {

          //console.log('tempTiger.isHidding: ',tempTiger.isHidding,'tempTiger.tigerHasEatenRabbit', tempTiger.tigerHasEatenRabbit);

          //protection check to see if the tiger hasn't eaten or is eating
          if(tempTiger.isHidding === false && tempTiger.tigerHasEatenRabbit === false){

            //safty check to improve performance. only does overlap if in range.
            if(scene.objectsInRangeX(tempTiger,tempRabbit,200) && scene.objectsInRangeY(tempTiger,tempRabbit,200)){
              //checks if the tiger overlaps a rabbit
              scene.physics.add.overlap(tempTiger, tempRabbit, function () {
                
                //if neither party has grabbed the player, then tiger eats the rabbit.
                if(tempTiger.playerGrabbed === false && tempRabbit.playerGrabbed === false){
                  tempTiger.tigerEatsRabbit(tempRabbit.enemySex);
                  tempRabbit.destroy();
                
                }   
              });
            }
          }
        });
        
        //calls tiger function to move
        tempTiger.move(scene.player1,scene);
        
          //checks if the attack hitbox is overlapping the tiger to deal damage.
          scene.physics.add.overlap(scene.attackHitBox, tempTiger, function () {
          
            //sets overlap to be true
            if(tempTiger.tigerIsEating === false){
              tempTiger.hitboxOverlaps = true;
            }
          });
        
          //if the hitbox overlaps the tiger, then  deal damage to that tiger
          if(tempTiger.hitboxOverlaps === true) {
          
            console.log("tiger taking damage, tiger hp:" + tempTiger.enemyHP);
          
            //inflict damage to tiger
            tempTiger.damage(scene);
          
            //clear overlap verable in tiger.
            tempTiger.hitboxOverlaps = false;
          
          }
        

        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1, tempTiger, function () {
          if(tempTiger.tigerIsEating === false){
            //make a temp object
            let isWindowObject = {
              isOpen: null
            };
            
            //that is passed into a emitter
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
          
            //to tell if the window is open
            if (isWindowObject.isOpen === true) {
              //and if it is, then close the window
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
              
            }
            
          
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            //if the grab cooldowns are clear then
            if (tempTiger.grabCoolDown === false && scene.grabCoolDown === false && tempTiger.isHidding === false) {
              
              console.log(" grabing the player?");
              //stop the velocity of the player
              tempTiger.setVelocityX(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              tempTiger.grab();
            
              //sets the scene grab value to true since the player has been grabbed
              tempTiger.playerGrabbed = true;
              tempTiger.grabCoolDown = true;
              scene.grabbed = true;
              scene.grabCoolDown = true;
              console.log('player grabbed by tiger');
          
            }
          }
          
        });
      }else if(this.objectsInRangeX(tempTiger,scene.player1,30) && this.objectsInRangeY(tempTiger,scene.player1,30)){

        this.viewAnimationLogic(tempTiger);
      // otherwise hid the prompt from the player.
      }else{
        tempTiger.safePrompts.visible = false;
        tempTiger.playedSafePrompts = false;
      }


    }, this);
      
    }

    //function keeps track of slime interactions
    checkRabbitInteractions(scene) {

      //applys a function to all rabbits
      scene.rabbits.children.each(function (tempRabbits) {
      
    
      if(scene.objectsInRangeX(tempRabbits,scene.player1,400) && scene.objectsInRangeY(tempRabbits,scene.player1,150) && tempRabbits.inSafeMode === false){

        //calls tiger function to move
        tempRabbits.move(scene.player1,scene);

        //checks if the attack hitbox is overlapping the tiger to deal damage.
        scene.physics.add.overlap(scene.attackHitBox, tempRabbits, function () {
        
          //sets overlap to be true
          tempRabbits.hitboxOverlaps = true;
        });
        
        //if the hitbox overlaps the tiger, then  deal damage to that tiger
        if(tempRabbits.hitboxOverlaps === true) {
        
          console.log("tiger taking damage, tiger hp:" + tempRabbits.enemyHP);
        
          //inflict damage to tiger
          tempRabbits.damage(scene);
        
          //clear overlap verable in tiger.
          tempRabbits.hitboxOverlaps = false;
        
        }
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1, tempRabbits, function () {
        
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //that is passed into a emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
        
          //to tell if the window is open
          if (isWindowObject.isOpen === true) {
            //and if it is, then close the window
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            
          }
          
        
          //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
          //if the grab cooldowns are clear then
          if (tempRabbits.grabCoolDown === false && scene.grabCoolDown === false) {
            
            console.log(" grabing the player?");
            //stop the velocity of the player
            tempRabbits.setVelocityX(0);
            scene.player1.setVelocityX(0);
            //calls the grab function
            tempRabbits.grab();
          
            //sets the scene grab value to true since the player has been grabbed
            tempRabbits.playerGrabbed = true;
            tempRabbits.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by tempRabbits');
        
          }
        });
      }else if(this.objectsInRangeX(tempRabbits,scene.player1,30) && this.objectsInRangeY(tempRabbits,scene.player1,30)){

        this.viewAnimationLogic(tempRabbits);
      // otherwise hid the prompt from the player.
      }else{
        tempRabbits.safePrompts.visible = false;
        tempRabbits.playedSafePrompts = false;
      }
    }, this);
      
    }

    //function keeps track of beeDrones interactions
    checkBeeDroneInteractions(scene) {

      //applys a function to all tigers
      scene.beeDrones.children.each(function (tempBeeDrone) {
        
        //safty check to improve performance. only does overlap if in range.
        if(scene.objectsInRangeX(tempBeeDrone,scene.player1,450)&& tempBeeDrone.inSafeMode === false){

          //calls drone function to move
          tempBeeDrone.move(scene.player1,scene);
          
          //checks if the attack hitbox is overlapping the beedrone to deal damage.
          scene.physics.add.overlap(scene.attackHitBox, tempBeeDrone, function () {
          
            //sets overlap to be true 
            tempBeeDrone.hitboxOverlaps = true;
          });
          
          //if the hitbox overlaps the drone, then  deal damage to that drone
          if(tempBeeDrone.hitboxOverlaps === true) {
          
            console.log("beeDrone taking damage, beedrone hp:" + tempBeeDrone.enemyHP);
          
            //inflict damage to tiger
            tempBeeDrone.damage(scene);
          
            //clear overlap verable in tiger.
            tempBeeDrone.hitboxOverlaps = false;
          
          }
        //if the bat is trying to grab the player then check overlap
      if(tempBeeDrone.grabTimer === true){

        //checks to see if the beedrones attack hitbox overlaps the players hitbox
        scene.physics.add.overlap(scene.player1, tempBeeDrone.grabHitBox, function () {
        
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //that is passed into a emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
        
          //to tell if the window is open
          if (isWindowObject.isOpen === true) {
            //and if it is, then close the window
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            
          }
          
        
          //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
          //if the grab cooldowns are clear then
          if (tempBeeDrone.grabCoolDown === false && scene.grabCoolDown === false) {
            
            console.log(" grabing the player?");
            //stop the velocity of the player
            tempBeeDrone.setVelocityX(0);
            tempBeeDrone.setVelocityY(0);
            scene.player1.setVelocityX(0);
            //calls the grab function
            tempBeeDrone.grab();
          
            //sets the scene grab value to true since the player has been grabbed
            tempBeeDrone.playerGrabbed = true;
            tempBeeDrone.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by tempBeeDrone');
        
          }
        });
        }
        
      //if the tempBeeDrone is in safe mode, and in range of the player then 
      }else if(this.objectsInRangeX(tempBeeDrone,scene.player1,30) && this.objectsInRangeY(tempBeeDrone,scene.player1,30)){

        this.viewAnimationLogic(tempBeeDrone);
      // otherwise hid the prompt from the player.
      }else{
        tempBeeDrone.safePrompts.visible = false;
        tempBeeDrone.playedSafePrompts = false;
      }

    }, this);
      
    }

     //function keeps track of beeDrones interactions
     checkBatInteractions(scene) {
      
      //applys a function to all tigers
      scene.bats.children.each(function (bat) {
      
      //safty check to improve performance. only does overlap if in range.
      //console.log('bat.inSafeMode: ',bat.inSafeMode);
      if(this.objectsInRangeX(bat,scene.player1,450) && bat.inSafeMode === false ){

        //calls tiger function to move
        bat.move(scene.player1,scene);

        //if player is attacking
        if(this.player1.isAttacking === true){
          //checks if the attack hitbox is overlapping the beedrone to deal damage.
          scene.physics.add.overlap(scene.attackHitBox, bat, function () {
          
            //sets overlap to be true 
            bat.hitboxOverlaps = true;
          });
          
          //if the hitbox overlaps the drone, then  deal damage to that drone
          if(bat.hitboxOverlaps === true) {
          
            //inflict damage to tiger
            bat.damage(scene);
          
            //clear overlap verable in tiger.
            bat.hitboxOverlaps = false;
          }
        }
        
        //if the bat is trying to grab the player then check overlap
        if(bat.grabTimer === true){
          //checks to see if the beedrones attack hitbox overlaps the players hitbox
          scene.physics.add.overlap(scene.player1, bat.grabHitBox, function () {
            
            //make a temp object
            let isWindowObject = {
              isOpen: null
            };
            
            //that is passed into a emitter
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
          
            //to tell if the window is open
            if (isWindowObject.isOpen === true) {
              //and if it is, then close the window
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
              
            }
            
          
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            //if the grab cooldowns are clear then
            if (bat.grabCoolDown === false && scene.grabCoolDown === false) {
              
              console.log(" grabing the player?");
              //stop the velocity of the player
              bat.setVelocityX(0);
              bat.setVelocityY(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              bat.grab();
            
              //sets the scene grab value to true since the player has been grabbed
              bat.playerGrabbed = true;
              bat.grabCoolDown = true;
              scene.grabbed = true;
              scene.grabCoolDown = true;
              console.log('player grabbed by bat');
          
            }
          });
        }
        
      //if the bat is in safe mode, and in range of the player then 
      }else if(this.objectsInRangeX(bat,scene.player1,30) && this.objectsInRangeY(bat,scene.player1,30)){
        
        this.viewAnimationLogic(bat);

      // otherwise hid the prompt from the player.
      }else{
        bat.safePrompts.visible = false;
        bat.playedSafePrompts = false;
      }
    }, this);
      
    }

    //{Update functions}===================================================================================================================

    //does the default interaction needed for the update loop. need to factor out slime interaction from this loop and make a seperate update for the slimes.
    defaultUpdate(){
    //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
    //console.log("grabbed:"+ this.grabbed);
    //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
    //console.log('this.sound: ', this.sound);
    //consider this a safty check. if the player falls out of bounds, put them back to there last warp point.
      this.checkPlayerOutOfBounds();

      //checks to see if items dropped can be picked up
      this.checkItemPickUp();

      //checks to see if containers can be opened.
      this.checkContainerPickUp();

      if(this.usingWoodenBarriers === true){
        this.checkWoodenBarriers();
      }

      if(this.usingRockPiles === true){
        this.checkRockPiles();
      }

      if(this.usingSlimeSpikes === true){
        this.checkSlimeSpikes();
      }

      if(this.usingSlimeProjectiles === true){
        this.checkSlimeProjectiles();
      }

      if(this.usingLocker === true){
        this.checkLocker();
      }

      //not sure what thes are for. saftey net when loading in?
      if(this.loadCoolDown === true){
        this.checkWarp(this.playerLocation);
      }
      if(this.saveCoolDown === true){
        this.checkSave(this.playerLocation);
      }
      
      if(this.signCoolDown === true){
        this.checkSign(this);
        this.checkNpc(this);
      }

      //if tab is press while the player isnt grabbed or in the pause menue then
      if(this.keyTAB.isDown && this.grabbed === false &&this.playerStuckGrab === false && this.pausedInTextBox === false){
        //activate inventory
        inventoryKeyEmitter.emit(inventoryKey.activateWindow,this); 
      }

      //if the player is paused in text and the delay is false then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){

        //activate the scene text box
        this.sceneTextBox.activateTextBox(this,this.keyW,this.isPaused,this.pausedInTextBox);
        //pause physics of scene
        this.physics.pause();
        //pauses the player animations
        this.player1.anims.pause();

        //makes a temp object
        let isWindowObject = {
          isOpen: null
        };
        
        //that is transfered to the emitter
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

        //which we then use to see if the inventory is open.
        if(isWindowObject.isOpen === true){

          //and if its open then close the inventory.
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,this);
        }

      //if we are not paused in a text box and we arnt paused , and the gameplay delay is false then.
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){

        //resume physics
        this.physics.resume();
        //and the player animations
        this.player1.anims.resume();
      }

      //if we arnt paused
      if(this.isPaused === false){

        //and the player isnt grabbed
        if(this.grabbed === false && this.playerStuckGrab === false){ 

          //and the player isnt using shift to attack
          if(!this.shift.isDown){

          // then move the player
          this.player1.movePlayer(this.keyA,this.keyD,this.space, this.player1.playerPreviousY,this);
          }
          
          //sets the camera to follow the player and changes the scale as well
          this.mycamera.startFollow(this.player1);
          this.cameras.main.zoom = 2;
          this.cameras.main.followOffset.set(0,70);

          //call player function to see if there attacking
          this.player1.attackPlayer(this);

        //however if the player is grabbed
        }else if(this.grabbed === true || this.playerStuckGrab === true){

          if(this.playerStuckGrab === true){
            this.checkStuckGrab();
          }
          
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //which we pass to the emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          //so we can check if the inventory is open
          if(isWindowObject.isOpen === true){
            //and if it is then close it.
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
          }
        }
      //if we are paused
      }else if(this.isPaused === true){
        //do nothing :3
      }

      //updates the previous y value. used to animate the falling animation of the player.
      this.player1.playerPreviousY = this.player1.y;
      //update the damage cool down if player takes damage.
      
    
    }
    
    //updates enemy apart of scene in the update loop
    enemyUpdate(enemyGroupArray){
     
      //if the player opens the inventory by pressing tab, while they are not grabbed and they are not in a text box then
      if(this.keyTAB.isDown && this.grabbed === false && this.pausedInTextBox === false){
        //check to see if the slime animations need to be paused.
        this.checkEnemyAnimationPause();
      }else{
        this.checkEnemyAnimationPause();
      }
        
      //if we are paused in a text box then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){
        //pause enemy animations. physics is paused in defaultupdate.
        this.checkEnemyAnimationPause();
          
         
      //otherwise if these are false then
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){
        //resume slime animations
        this.checkEnemyAnimationPause();
      }
  
      //if the game is not paused
      if(this.isPaused === false){
          //and the player has not been grabbed
          if(this.grabbed === false){ 

            //loops through our enemy groups, and applies our interactions to these groups.
            for(let counter = 0; counter < enemyGroupArray.length;counter++){

              if(enemyGroupArray[counter] === 'blueSlimes'){
                this.checkBlueSlimeInteractions(this);
              }
              if(enemyGroupArray[counter] === 'tigers'){
                this.checkTigerInteractions(this);
              }
              if(enemyGroupArray[counter] === 'rabbits'){
                this.checkRabbitInteractions(this);
              }
              if(enemyGroupArray[counter] === 'beeDrones'){
                this.checkBeeDroneInteractions(this);
              }
              if(enemyGroupArray[counter] === 'bats'){
                this.checkBatInteractions(this);
              }
              if(enemyGroupArray[counter] === 'blueSlimeHSs'){
                this.checkBlueSlimeHSInteractions(this);
              }
              if(enemyGroupArray[counter] === 'blueSlimeHMs'){
                this.checkBlueSlimeHMInteractions(this);
              }
            }

          //otherwise if the player has been grabbed then
          }else if(this.grabbed === true){
            //call check function for slimes.
            this.checkEnemyGrab();
          }
    
      }else if(this.isPaused === true){
    
      }
          
    } 

    //updates enemy apart of scene in the update loop
    enemyUpdateAnimationView(enemyGroupArray){
     
      //if the player opens the inventory by pressing tab, while they are not grabbed and they are not in a text box then
      if(this.keyTAB.isDown && this.grabbed === false && this.pausedInTextBox === false){
        //check to see if the slime animations need to be paused.
        this.checkEnemyAnimationPause();
      }else{
        this.checkEnemyAnimationPause();
      }
        
      //if we are paused in a text box then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){
        //pause enemy animations. physics is paused in defaultupdate.
        this.checkEnemyAnimationPause();
          
         
      //otherwise if these are false then
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){
        //resume slime animations
        this.checkEnemyAnimationPause();
      }
  
      //if the game is not paused
      if(this.isPaused === false){
          //and the player has not been grabbed
          if(this.grabbed === false){ 

            //loops through our enemy groups, and applies our interactions to these groups.
            for(let counter = 0; counter < enemyGroupArray.length;counter++){

              if(enemyGroupArray[counter] === 'blueSlimes'){
                this.checkBlueSlimeInteractions(this);
              }
              if(enemyGroupArray[counter] === 'tigers'){
                this.checkTigerInteractions(this);
              }
              if(enemyGroupArray[counter] === 'rabbits'){
                this.checkRabbitInteractions(this);
              }
              if(enemyGroupArray[counter] === 'beeDrones'){
                this.checkBeeDroneInteractions(this);
              }
              if(enemyGroupArray[counter] === 'bats'){
                this.checkBatInteractions(this);
              }
            }

          //otherwise if the player has been grabbed then
          }else if(this.grabbed === true){
            //call check function for slimes.
            this.checkEnemyGrab();
          }
    
      }else if(this.isPaused === true){
    
      }
          
    } 
  
  }
