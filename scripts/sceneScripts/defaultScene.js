class defaultScene extends Phaser.Scene {

    defaultPreload(){
        //preload of object always needed
        this.load.spritesheet("malePlayer" , "assets/evan_master.png" , {frameWidth: 213 , frameHeight: 270 });
        this.load.spritesheet("femalePlayer" , "assets/evelyn_master.png" , {frameWidth: 213 , frameHeight: 270 });
        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
        this.load.image('TABToSkip', 'assets/tabToSkip.png');
        this.load.spritesheet('forestWarp', 'assets/GroundForestWarp.png',{frameWidth: 80 , frameHeight: 80 });
        this.load.spritesheet('savePoint', 'assets/saveStatue.png',{frameWidth: 71, frameHeight: 100 });
        this.load.spritesheet('sign', 'assets/Sign.png',{frameWidth: 99, frameHeight: 135 });
        this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
        this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
        this.load.spritesheet('doubleJumpEffect', 'assets/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
            
        //hud specific 
        this.load.spritesheet('inventory', 'assets/Inventory.png',{frameWidth: 600 , frameHeight: 425 });
        this.load.spritesheet('inventoryBorder', 'assets/inventoryBorder.png',{frameWidth: 600 , frameHeight: 425 });
        this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 32 , frameHeight: 32 });
        this.load.spritesheet('slotDiscriptions', 'InventorySlotDiscriptions.png',{frameWidth: 32 , frameHeight: 32 });
        this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
        this.load.spritesheet('hpBarAmount', 'assets/hpBarAmount.png',{frameWidth: 291, frameHeight: 57 });
        this.load.spritesheet('bestiary', 'assets/bestiary.png',{frameWidth: 462, frameHeight: 630 });
        this.load.spritesheet('UIControls', 'assets/UIControls.png',{frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('inventoryLabels', 'assets/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
        this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });
      }

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
        this.skipIndicator;
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
        this.activatedPortalId = 0;
        this.activatedSavePointId = 0;
        this.activatedSignId = 0;
        this.grabCoolDown = false;
        this.attackHitBox;
        this.signPoints;
        this.saveStonePoints;
        this.isPaused = false;
        this.sceneTextBox;
        this.pausedInTextBox = false;
        this.enemyThatDefeatedPlayer ="";
        this.warpToX = 450;
        this.warpToY = 600;
        this.playerSex;

        this.tabObject = {
            tabIsDown: false
        };

        enemyInfo = {
            width: 90,
            height: 90,
            offset: {
              top: 150,
              left: 60
            },
            padding: 0
          };
    
    }

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

    setUpPlayer(){
        //creates a player object with the given values
        this.player1 = new player(this,this.warpToX,this.warpToY,this.playerSex);
        //creates a hitbox which will be used to 
        this.attackHitBox = new hitBoxes(this,this.player1.x,this.player1.y);
    }

    setUpKeyPrompts(){
        this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
        this.KeyDisplay.visible = false;
    }

    setUpPlayerCollider(){
        this.physics.add.collider(this.player1,this.processMap.layer1);
        this.physics.add.collider(this.player1,this.processMap.layer0);
    }

    setUpSlimeCollider(){
        this.physics.add.collider(this.processMap.layer1, this.slimes);
        this.physics.add.collider( this.slimes, this.slimes); 
    }

    setUpLayer1Collider(object){
        this.physics.add.collider(this.processMap.layer1, object);
    }

    setUpPlayerCamera(){
        //sets up camera to follow player.
        this.mycamera = this.cameras.main;
        this.mycamera.startFollow(this.player1 ,false,0,0,10000,10000);
        this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
        this.cameras.main.followOffset.set(0,-1500);
    }

    setUpTextBox(){
        this.sceneTextBox = new textBox(this,450,620,'textBox');
    }

    //this function saves data when the player is defeated so that the gameover scene can tell what enemy defeated the player.
    saveGameoverFile(playerSex, enemyThatDefeatedPlayer, playerSaveSlotData) {
        //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene
        console.log("calling saveGameoverFile============================");
        console.log("playerSex: " + playerSex);
        console.log("enemyThatDefeatedPlayer: " + enemyThatDefeatedPlayer);
        console.log("playerSaveSlotData: ", playerSaveSlotData);
        const file = {
        sex: playerSex,
        enemy: enemyThatDefeatedPlayer,
        pssd: playerSaveSlotData
        };
        //uses local Storage to store the data
        localStorage.setItem('saveGameoverFile', JSON.stringify(file));
    }
    //function to load data once we are in the gameover scene.
    loadGameoverFile() {
        //sets variable to the stored data
        // we will use const because we dont want anything to change variable. difference between let and var is that var can exist outside the scope when its declared. using let makes sure that the variable stays within scope.obeying scoping rules.
        const file = JSON.parse(localStorage.getItem('saveGameoverFile'));
        //retrieves data from the file object and gives it to the current scene
        console.log("calling loadGameoverFile============================");
        console.log("playerSex: " + file.sex);
        console.log("enemy: " + file.enemy);
        console.log("playerSaveSlotData: ", file.pssd);

        this.playerSex = file.sex;
        this.enemyThatDefeatedPlayer = file.enemy;
        this.playerSaveSlotData = file.pssd;
    }
    // the deep save function that is used to keep the savedata of the player. activated in savepoints class.
    saveGameFile(savePointX, savePointY, playerSex, location, dataObject) {
        // these are the game variables that are hard saved when the player uses a save point.
        console.log("calling saveslot saveGameFile============================");
        console.log("save file x:" + savePointX);
        console.log("save file y:" + savePointY);
        console.log("player HP: " + dataObject.playerMaxHp);
        console.log("playerSex: " + playerSex);
        console.log("location: " + location);
        console.log("playerInventoryData: " + dataObject.inventoryArray);
        console.log("playerInventoryAmountData: " + dataObject.playerInventoryAmountData);
        console.log("playerBestiaryData: ", dataObject.playerBestiaryData);
        console.log("playerSkillsData: ", dataObject.playerSkillsData);
        console.log("playerSaveSlotData: ", dataObject.playerSaveSlotData);
        console.log("gameFlags: ", dataObject.flagValues);
        console.log("=======================================================");
        // bundles save data up in a variable to be json.stringifyed
        const file = {
        saveX: savePointX,
        saveY: savePointY,
        playerHpValue: dataObject.playerMaxHp,
        sex: playerSex,
        locationName: location,
        id: dataObject.inventoryArray,
        piad: dataObject.playerInventoryAmountData,
        pbd: dataObject.playerBestiaryData,
        psd: dataObject.playerSkillsData,
        pssd: dataObject.playerSaveSlotData,
        flags: dataObject.flagValues,

        }
        //uses local Storage to store the data. playerSaveSlotData.saveSlot determines which slot the save data is stored in.
        if (dataObject.playerSaveSlotData.saveSlot === 1) {
        localStorage.setItem('saveFile1', JSON.stringify(file));
        } else if (dataObject.playerSaveSlotData.saveSlot === 2) {
        localStorage.setItem('saveFile2', JSON.stringify(file));
        } else if (dataObject.playerSaveSlotData.saveSlot === 3) {
        localStorage.setItem('saveFile3', JSON.stringify(file));
        } else {
        console.log(" something went wrong with the save location. location: " + playerSaveSlotData.saveSlot);
        }
        
    }

    //loads savedata from the sabeslot in title screen.
    loadGameFile(slot) {
        console.log("attempting to load slot:" + slot);
        // attempts to parse savedata from one of the three save slots based on the slot passed in by function call.
        let file;
        if (slot === 1) {
        file = JSON.parse(localStorage.getItem('saveFile1'));
        } else if (slot === 2) {
        file = JSON.parse(localStorage.getItem('saveFile2'));
        } else if (slot === 3) {
        file = JSON.parse(localStorage.getItem('saveFile3'));
        } else {
        console.log(" something went wrong with loading a save file. location: " + slot);
        file = undefined;
        }


        //retrieves data from the file object and gives it to the current scene
        if (file !== undefined && file !== null) {
        console.log("calling loadslot for save slot " + slot + "loadGameFile============================");
        console.log("save file x:" + file.saveX);
        console.log("save file y:" + file.saveY);
        console.log("player HP: " + file.playerHpValue);
        console.log("playerSex: " + file.sex);
        console.log("location: " + file.locationName);
        console.log("playerInventoryData: " + file.id);
        console.log("playerInventoryAmountData: " + file.piad);
        console.log("playerBestiaryData: ", file.pbd);
        console.log("playerSkillsData: ", file.psd);
        console.log("playerSaveSlotData: ", file.pssd);
        console.log("gameFlags: ", file.flags);
        //sets values from save data to the values in the scene.
        this.warpToX = file.saveX;
        this.warpToY = file.saveY;
        this.playerHealth = file.playerHpValue;
        this.playerSex = file.sex;
        this.playerLocation = file.locationName;
        this.inventoryDataArray = file.id;
        this.playerInventoryAmountData = file.piad;
        this.playerBestiaryData = file.pbd;
        this.playerSkillsData = file.psd;
        // does the math and sets the bestiary completion percentage to the playerSaveSlotData[2]
        let tempPlayerSaveSlotData = file.pssd;
        if (this.playerBestiaryData !== undefined) {

            let bestiaryPercent = 0;
            // loops though the objects to find how many of the entrys the player has
            for (let [key, value] of Object.entries(this.playerBestiaryData)) {
            if (value !== 0) {
                bestiaryPercent++;
            }
            }
            // calcs percentage and sets it to the value apart of the save data
            bestiaryPercent = (bestiaryPercent / Object.keys(this.playerBestiaryData).length) * 100;
            tempPlayerSaveSlotData.bestiaryCompletionPercent = bestiaryPercent;
        }
        this.playerSaveSlotData = tempPlayerSaveSlotData;
        this.playerSex = file.sex;
        this.flagValues = file.flags;
        // loading the player location may be redundant. it has already been recieved to load the scene so why set it here?
       
        }
    }

    //temp save game. used to keep track of data between scenes.
    saveGame(nextSceneX, nextSceneY, playerHp, playerSex, playerInventoryData, playerInventoryAmountData, playerBestiaryData, playerSkillsData, playerSaveSlotData, gameFlags) {
        //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene

        console.log("calling temerary saveGame============================");
        console.log("save file x:" + nextSceneX);
        console.log("save file y:" + nextSceneY);
        console.log("player HP: " + playerHp);
        console.log("playerSex: " + playerSex);
        console.log("playerInventoryData: " + playerInventoryData);
        console.log("playerInventoryAmountData: " + playerInventoryAmountData);
        console.log("playerBestiaryData: ", playerBestiaryData);
        console.log("playerSkillsData: ", playerSkillsData);
        console.log("playerSaveSlotData: ", playerSaveSlotData);
        console.log("gameFlags: ", gameFlags);
        console.log("location: " + location);

        const file = {
        warpToThisX: nextSceneX,
        warpToThisY: nextSceneY,
        playerHpValue: playerHp,
        sex: playerSex,
        inventoryData: playerInventoryData,
        piad: playerInventoryAmountData,
        pbd: playerBestiaryData,
        psd: playerSkillsData,
        pssd: playerSaveSlotData,
        flags: gameFlags
        }
        localStorage.setItem('saveBetweenScenes', JSON.stringify(file));
    }

    // grabs data from temp save when the player transitions scenes.
    loadGame() {
        //sets variable to the stored data
        var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));
        //retrieves data from the file object and gives it to the current scene
        console.log("calling temerary loadGame============================");
        console.log("save file x:" + file.warpToThisX);
        console.log("save file y:" + file.warpToThisY);
        console.log("playerSex: ", file.sex);
    
        this.warpToX = file.warpToThisX;
        this.warpToY = file.warpToThisY;
        this.playerSex = file.sex;

        //loadSceneTransitionLoad.emit(SceneTransitionLoad.loadValues,file.playerHpValue,file.inventoryData,file.piad,file.pbd,file.psd,file.pssd,file.flags);
    }

    //generates slimes
    initSlimes(startX, startY, amount, playerSex) {
        //creates a row of slime enemys and adds them to the slime enemy groups.
        for (let row = 0; row < amount; row++) {
        let enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
        let slime1 = new blueSlime(this, enemyX, startY, playerSex);
        //id is important for slime combine function. since when the slimes collide symultaniously it needs a way to tell if
        //slime is destroyed or becomes a large slime. if the id is higher on the slime then that one becomes a larger slime
        slime1.slimeId = this.slimeId;
        this.slimeId++;
        this.slimes.add(slime1);
        //console.log("slime id: "+ scene.slimeId);
        }
    }

    // creates warp portal objects in the scene
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

    initSigns(x, y, text, profileArray) {
        let sign1 = new sign(this, x, y, text, profileArray);
        //gives portal a unique id so that scene can tell which warp object is being activated
        sign1.signId = this.signId;
        this.signId++;
        //sets the location given as to where the player will be sent in the next scene
        //adds portal object to the portal object in the scene
        this.signPoints.add(sign1);
        //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
        //console.log(" scene.portalId: "+ scene.portalId);
    }

    //test to see if the player should be warped.
    checkWarp(location) {
        //console.log("checking warp");
        //applies a function to each portal object in the scene
        this.portals.children.each(function (tempPortal) {
        //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
        // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
        if ((this.player1.x > tempPortal.x - 50 && this.player1.x < tempPortal.x + 50) && (this.player1.y > tempPortal.y - 50 && this.player1.y < tempPortal.y + 50) && this.grabbed === false) {
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
        tempSavePoint.savePointSaveGame(this, this.keyW, location, this.activatedSavePointId, this.healthDisplay, this.KeyDisplay, this.player1, tempSavePoint.x, tempSavePoint.y, this.flagValues);
        
        }, this);
    }

    checkSign(scene) {
        //applies a function to each portal object in the scene
        scene.signPoints.children.each(function (tempSignPoint) {
          //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
          // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
          if ((scene.player1.x > tempSignPoint.x - 30 && scene.player1.x < tempSignPoint.x + 30) && (scene.player1.y > tempSignPoint.y - 30 && scene.player1.y < tempSignPoint.y + 30) && scene.grabbed === false) {
            //console.log("within sign");
            tempSignPoint.safeToSign = true;
            scene.activatedSignId = tempSignPoint.signId;
          } else {
            //console.log("outside save point");
            tempSignPoint.safeToSign = false;
          }
          tempSignPoint.activateSign(scene, scene.keyW, scene.activatedSignId);
    
        }, scene);
      }

    // simple function to change the backround animation frames.
    // should fix with some settimeout functions.
    animateBackround() {
        if (this.backroundTimer < 100) {
        this.backround.setFrame(0);
        this.backroundTimer++;
        } else if (this.backroundTimer < 200) {
        this.backround.setFrame(2);
        this.backroundTimer++;
        } else if (this.backroundTimer < 300) {
        this.backround.setFrame(1);
        this.backroundTimer++;
        } else if (this.backroundTimer < 301) {
        this.backroundTimer = 0;
        }
    }

    //function to activate blue slime grab animation
    checkBlueSlimeGrab() {
        //console.log("activating grab function");
        //scene.healthDisplay.zoomIn();
        this.slimes.children.each(function (tempSlime) {
        if (tempSlime.playerGrabbed === true) {
            //remeber this function is called twice. once when grab hamppens and agian when the update loop has this.grabbed set to true.
            tempSlime.slimeGrab(this.player1,this.keyA, this.KeyDisplay, this.keyD, this, this.keyTAB, this);
            //focuses on slime that grabbed character and zooms ui elements.
            this.mycamera.startFollow(tempSlime);
            this.cameras.main.zoom = 5;
            this.grabbed = tempSlime.playerGrabbed;
        } else {
            //if slime didn't grab player but player was grabbed then play idle animation.
            tempSlime.moveSlimeIdle();
            tempSlime.setSize(90, 65, true);
            tempSlime.setOffset(105, 233);
            tempSlime.body.setGravityY(600);
            //else if the slime is size 2 then set its hit box to the correct size
        }
        }, this);
    }
    //function keeps track of slime interactions
    checkBlueSlimeInteractions(scene) {

        //console.log("checking slime interactions");
        //applies functions to all slimes in the group.
        scene.slimes.children.each(function (tempSlime) {
          //calls to make each instance of a slime move.
          tempSlime.moveSlime(scene.player1);
          scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          if (tempSlime.hitboxOverlaps === true) {
            console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
            tempSlime.slimeDamage(scene);
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
              tempSlime.slimeGrab(scene.player1, scene.keyA, scene.KeyDisplay, scene.keyD, scene, scene.keyTAB, this);
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
            scene.slimes.children.each(function (tempSlime1) {
              // collider used to detect a collision between two slimes
              scene.physics.add.overlap(tempSlime1, tempSlime, function () {
                // if both slimes are of size 1 then call combine function
                if (tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1) {
                  tempSlime.slimeCombine(tempSlime1, scene.grabbed);
                }
              });
            }, this);
          }
          //deincriments the grabcooldown on any slime that grabbed the player.
          tempSlime.mitosisDelayCheck();
          // creates a overlap between the damage hitbox and the slime so that slime can take damage
        }, this);
    
    }
    // function called to pause slimes for all slimes in the group.
    checkBlueSlimePause() {
        this.slimes.children.each(function (tempSlime1) {
        tempSlime1.pauseSlimeAnimations(this);
        }, this);
    }
  
      // function which destroys this scene and starts the gameover scene.
    changeToGameover(){

        this.myMap.destroy();
        this.processMap.destroy();
  
        let playerSaveSlotDataObject = {
          playerSaveSlotData: null
        };
      
        playerSaveSlot.emit(playerSaveSlot.getSaveSlot,playerSaveSlotDataObject)
  
        console.log("this.playerSaveSlotData sent to gameover: ",playerSaveSlotDataObject.playerSaveSlotData);
  
        this.saveGameoverFile(this.playerSex,this.enemyThatDefeatedPlayer,playerSaveSlotDataObject.playerSaveSlotData);

        console.log("removing listeners");
        //removes listeners
        healthEmitter.removeAllListeners(healthEvent.loseHealth);
        healthEmitter.removeAllListeners(healthEvent.gainHealth);
        healthEmitter.removeAllListeners(healthEvent.maxHealth);
        healthEmitter.removeAllListeners(healthEvent.returnHealth);
        loadSceneTransitionLoad.removeAllListeners(SceneTransitionLoad.loadValues);
        accessTabKey.removeAllListeners(tabKey.isTabDown);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.activateWindow);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.isWindowOpen);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.getSaveData);
        playerSkillsEmitter.removeAllListeners(playerSkills.getJump);
        playerSaveSlot.removeAllListeners(playerSaveSlot. getSaveSlot);
        skipIndicatorEmitter.removeAllListeners();

        console.log("healthEmitter current listeners: ",
           healthEmitter.listenerCount(healthEvent.loseHealth)+
           healthEmitter.listenerCount(healthEvent.gainHealth)+
           healthEmitter.listenerCount(healthEvent.maxHealth)+
           healthEmitter.listenerCount(healthEvent.returnHealth));

        console.log("loadSceneTransitionLoad current listeners: ",loadSceneTransitionLoad.listenerCount(SceneTransitionLoad.loadValues));

        console.log("accessTabKey current listeners: ",accessTabKey.listenerCount(tabKey.isTabDown));

        console.log("inventoryKeyEmitter current listeners: ",
        inventoryKeyEmitter.listenerCount(inventoryKey.activateWindow)+
        inventoryKeyEmitter.listenerCount(inventoryKey.isWindowOpen)+
        inventoryKeyEmitter.listenerCount(inventoryKey. getSaveData));

        console.log("playerSkillsEmitter current listeners: ",playerSkillsEmitter.listenerCount(playerSkills.getJump));

        console.log("playerSaveSlot current listeners: ",playerSaveSlot.listenerCount(playerSaveSlot. getSaveSlot));

        
        this.scene.stop('gameHud');
        this.scene.start('gameOverForest');

      }
      
  }