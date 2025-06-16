
class gameoverManager extends A3SoundEffects {

    //function to determine what tile map that should be used.
    preloadMapOfTileMaps(){
        console.log("making map of tilemap preload functions");

        //note, "this" keyword works differently inside a map of functions. it refrences the map object insteas od the scene, so to acess the scene
        //we need to leave a refrence to it in the function call that creat4es it.
        let tempGameover = this;
        
        this.mapOfTileMapsJSON = {
            forestGameover: function forestGameover() {
                tempGameover.load.image('backgroundForestRavineLevel', 'assets/backgrounds/forest_ravine_background.png');
                tempGameover.load.tilemapTiledJSON("forestGameover" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Gameover.json");
            },
            caveGameover: function caveGameover() {
                tempGameover.load.tilemapTiledJSON("caveGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Gameover.json");
                tempGameover.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
            },
            istaraGameover: function istaraGameover() {
                tempGameover.load.tilemapTiledJSON("istaraGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Istaras_Gameover.json");
            },
            beachGameover: function beachGameover() {
                tempGameover.load.image('backgroundBeachLevel', 'assets/backgrounds/beach_background.png');
                tempGameover.load.tilemapTiledJSON("beachGameover" , "assets/tiledMap/LockWood/Beach_Tileset/Beach_Gameover.json");
            },
            hiveGameover: function hiveGameover() {
                tempGameover.load.image("hive_source_map" , "assets/tiledMap/LockWood/Hive_Tileset/Hive_Tileset.png");
                tempGameover.load.tilemapTiledJSON("hiveGameover" , "assets/tiledMap/LockWood/Hive_Tileset/Grub_Hive_Gameover.json");
                tempGameover.load.spritesheet('beeGrub', 'assets/enemys/beeGrub.png',{frameWidth: 525, frameHeight: 237 });

                tempGameover.load.audioSprite('wingFlapSFX','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
                    "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
                  ]);
            },
            blueSlimeGameover: function blueSlimeGameover() {
                tempGameover.load.image("blue_slime_source_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave_Tileset.png");
                tempGameover.load.tilemapTiledJSON("blueSlimeGameover" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Gameover.json");
            },
            shadowGameover: function shadowGameover() {
                tempGameover.load.tilemapTiledJSON("shadowGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Shadow_Cave_Gameover.json");
                tempGameover.load.spritesheet('shadow', 'assets/enemys/shadowFront.png',{frameWidth: 303, frameHeight: 429 });
                tempGameover.load.spritesheet('shadowJaw', 'assets/enemys/shadowJaw.png',{frameWidth: 303, frameHeight: 429 });
                tempGameover.load.audioSprite('earieSFX','audio/used-audio/earie-sounds/earie-sounds.json',[
                    "audio/used-audio/earie-sounds/earie-sounds.mp3"
                ]);
            },
            abyssGameover: function abyssGameover() {
                tempGameover.load.tilemapTiledJSON("abyssGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Abyss_Gameover.json");
                tempGameover.load.spritesheet('curseShadowSecretMale', 'assets/enemys/curseShadowMaleSecret.png',{frameWidth: 303, frameHeight: 219 });
                tempGameover.load.spritesheet('curseShadowSecretFemale', 'assets/enemys/curseShadowFemaleSecret.png',{frameWidth: 303, frameHeight: 219 });
                
            },

        
 
        }


    }

    tryAgianLoad(gameoverThat){
        //sets a few variables
        let tempPlayerSaveSlotData = gameoverThat.playerSaveSlotData;
        let tempPlayerSex = gameoverThat.playerSex;
        
        //grabs current saveslot
        let slot = gameoverThat.playerSaveSlotData.saveSlot;

        //loads player info from hard save
        gameoverThat.loadGameFile(slot);
        console.log("attempting to load slot:" + slot);
        // attempts to parse savedata from one of the three save slots based on the slot passed in by function call.
        
        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < gameoverThat.sound.sounds.length; counter++){
            gameoverThat.sound.get(gameoverThat.sound.sounds[counter].key).stop();
        }

        //if the player has data in thee save file then load them back to there last save
        console.log("gameoverThat.playerLocation: ",gameoverThat.playerLocation," gameoverThat.playerBestiaryData: ",gameoverThat.playerBestiaryData);
        

        if(gameoverThat.playerLocation !== null && gameoverThat.playerLocation !== undefined && gameoverThat.playerBestiaryData !== undefined && gameoverThat.playerBestiaryData !== null){

            console.log("save file detected, now setting player back to correct scene.");
            console.log("gameoverThat.playerLocation",gameoverThat.playerLocation);

            let entryAdded = false;
            //loop through of entrys the player has that was loaded from file
            for(let [key,value] of Object.entries(gameoverThat.playerBestiaryData)){

                // if the key can be found then we set the entry to 1 to represent the player having the entry.
                if(gameoverThat.enemyThatDefeatedPlayer === key){
                    console.log("found bestiary entry : ", key);
                    gameoverThat.playerBestiaryData[key] = 1;
                    entryAdded = true;
                }
        
            }

            if(entryAdded === false){
                gameoverThat.playerBestiaryData[gameoverThat.enemyThatDefeatedPlayer] = 1;
            }

              //creates a object to hold data for scene transition
                let playerDataObject = {
                    saveX: gameoverThat.warpToX,
                    saveY: gameoverThat.warpToY,
                    playerHpValue: gameoverThat.playerHealth,
                    playerSex:gameoverThat.playerSex,
                    playerLocation: gameoverThat.playerLocation,
                    inventoryArray: gameoverThat.inventoryDataArray,
                    playerBestiaryData: gameoverThat.playerBestiaryData,
                    playerSkillsData: gameoverThat.playerSkillsData,
                    playerSaveSlotData: gameoverThat.playerSaveSlotData,
                    flagValues: gameoverThat.flagValues,
                    settings:gameoverThat.settings,
                    dreamReturnLocation:gameoverThat.dreamReturnLocation,
                    playerCurseValue:gameoverThat.playerCurseValue
                };

            //call save function for temp save so when we start the scene agian, it has the correct data.
            gameoverThat.saveGame(playerDataObject);

            //call save function for temp save so when we start the scene agian, it has the correct data.
            gameoverThat.saveGameFile(playerDataObject);
            
            // calls the fadout function which loads back to the last save on fadeout complete
            gameoverThat.cameras.main.fadeOut(500, 0, 0, 0);

        //if the player has not saved, send them back to the beginning of the game
        }
    }

    //set up player control logic
    setUpPlayerControls(){

        this.dialogueInterupt = false;
        
        //call allscenes object, maybe its time to make a default ui screen class? or just do the loading in the title screen and gameover.
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //define a key and make it interactive
        this.mobileW = new mobileButton(this,330,640).setInteractive(this.input.makePixelPerfect());
        this.mobileW.playWKey(0);
        this.mobileW.setScale(1/3);

        //pointer events when button is pressed to activate set pressed to true in the key object
        this.mobileW.on('pointerdown', function (pointer) {
            this.mobileW.IsPressed = true;
            this.mobileW.isJustDown = true;
            this.mobileW.playWKey(1);
        },this);
        
        //pointer even so that when the button is not being pressed, set value to false.
        this.mobileW.on('pointerup',function(pointer){
            this.mobileW.IsPressed = false;
            this.mobileW.isJustDown = false;
            this.mobileW.playWKey(0);
        },this);

        this.mobileW.on('pointerout',function(pointer){
            this.mobileW.IsPressed = false;
            this.mobileW.isJustDown = false;
            this.mobileW.playWKey(0);
        },this);

        

        //creates try again button
        this.tryAgian = this.add.sprite(610, 640, "tryAgianSign").setInteractive();

        //creates animations for try agian button
        this.anims.create({key: 'tryAgianInActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'tryAgianActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'gameoverTitleAnimationCursed',frames: this.anims.generateFrameNames('gameOverSignCursed', { start: 0, end: 5 }),frameRate: 3,repeat: 0});
        this.anims.create({key: 'gameoverTitleAnimationLoopCursed',frames: this.anims.generateFrameNames('gameOverSignCursed', { start: 2, end: 5 }),frameRate: 3,repeat: -1});
        this.anims.create({key: 'gameoverTitleAnimationEaten',frames: this.anims.generateFrameNames('gameOverSignEaten', { start: 0, end: 5 }),frameRate: 3,repeat: 0});
        this.anims.create({key: 'gameoverTitleAnimationLoopEaten',frames: this.anims.generateFrameNames('gameOverSignEaten', { start: 2, end: 5 }),frameRate: 3,repeat: -1});

        this.tryAgian.anims.play('tryAgianInActive');
        this.tryAgian.setScale(.5);
        this.tryAgian.setDepth(7);

        let gameoverThat = this;

        setTimeout(function(){
            if(gameoverThat.showTryAgain === false){
                gameoverThat.tryAgian.visible = false;
            }else{
                gameoverThat.tryAgian.visible = true;
            }
            
        },1000);

        this.tryAgian.on('pointerdown', function (pointer) {
            if(gameoverThat.dialogueInterupt === false){
                gameoverThat.tryAgianLoad(gameoverThat);
            }
        });

        //plays animation for pointer lighting up when mouse hovers over it.
        this.tryAgian.on('pointerover',function(pointer){
            gameoverThat.tryAgian.anims.play("tryAgianActive");
        })
        this.tryAgian.on('pointerout',function(pointer){
            gameoverThat.tryAgian.anims.play("tryAgianInActive");
        })

        this.tryAgian.visible = false;

        //textbox for new character 
        this.sceneTextBox = new textBox(this,1200/2-30,580,'charBubble');
        this.sceneTextBox.setScale(1/3);
        this.sceneTextBox.setTextboxBackground("cursed");
        this.sceneTextBox.textTint = 0x9d00e0;
        
        //npc to progress dialogue
        this.npcGameover = new npc(this, 0, 0, 'hitbox');
    }

    resetGameoverText(){

        this.sceneTextBox.destroy();
        //textbox for new character 
        this.sceneTextBox = new textBox(this,1200/2-30,580,'charBubble');
        this.sceneTextBox.setScale(1/3);
        this.sceneTextBox.setTextboxBackground("cursed");
        this.sceneTextBox.textTint = 0x9d00e0;
        
        //npc to progress dialogue
        this.npcGameover.destroy();
        this.npcGameover = new npc(this, 0, 0, 'hitbox');
    }

    //create functions based on game over file.
    preloadMapOfLocationPreloads(){
        let tempSceneRef = this;
        
        this.mapOfLocationPreloads = {
            forestGameover: function forestGameover() {
                let backround = tempSceneRef.add.sprite(450, 380, "backgroundForestRavineLevel");

                tempSceneRef.lightingSystemActive = false;

                tempSceneRef.processMap.tilesetNameInTiled = "Forest_Tileset";
                tempSceneRef.processMap.setTiles('forest_source_map',tempSceneRef);
            },
            caveGameover: function caveGameover() {
                tempSceneRef.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                tempSceneRef.lights.enable().setAmbientColor(0x555555);

                tempSceneRef.processMap.tilesetNameInTiled = "Cave_Tileset";
                tempSceneRef.processMap.setTiles('cave_source_map',tempSceneRef);

                tempSceneRef.processMap.layer0.setPipeline('Light2D');
                tempSceneRef.processMap.layer1.setPipeline('Light2D');
                tempSceneRef.processMap.layer2.setPipeline('Light2D');
                tempSceneRef.processMap.layer3.setPipeline('Light2D');
            },
            istaraGameover: function istaraGameover() {
                tempSceneRef.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                tempSceneRef.lights.enable().setAmbientColor(0x555555);

                tempSceneRef.processMap.tilesetNameInTiled = "Cave_Tileset";
                tempSceneRef.processMap.setTiles('cave_source_map',tempSceneRef);

                tempSceneRef.processMap.layer0.setPipeline('Light2D');
                tempSceneRef.processMap.layer1.setPipeline('Light2D');
                tempSceneRef.processMap.layer2.setPipeline('Light2D');
                tempSceneRef.processMap.layer3.setPipeline('Light2D');

                tempSceneRef.initLoopingSound('waterfallSFX','waterfall', 0.03);

                tempSceneRef.light1 = new wallLight(tempSceneRef,445, 470,'ghostMushroom2');
                tempSceneRef.light2 = new wallLight(tempSceneRef,455, 472,'ghostMushroom3');
                tempSceneRef.light2 = new wallLight(tempSceneRef,465, 468,'ghostMushroom4');
            },
            beachGameover: function beachGameover() {
                let backround = tempSceneRef.add.sprite(450, 380, "backgroundBeachLevel");
            },
            hiveGameover: function hiveGameover() {
                tempSceneRef.lightingSystemActive = false;
                tempSceneRef.processMap.tilesetNameInTiled = "Hive_Tileset";
                tempSceneRef.processMap.setTiles('hive_source_map',tempSceneRef);
            },
            blueSlimeGameover: function blueSlimeGameover() {
                tempSceneRef.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                tempSceneRef.lights.enable().setAmbientColor(0x555555);
                console.log("tempGameover: ",tempSceneRef);

                tempSceneRef.processMap.tilesetNameInTiled = "Blue_Slime_Cave_Tileset";
                tempSceneRef.processMap.setTiles('blue_slime_source_map',tempSceneRef);

                tempSceneRef.processMap.layer0.setPipeline('Light2D');
                tempSceneRef.processMap.layer1.setPipeline('Light2D');
                tempSceneRef.processMap.layer2.setPipeline('Light2D');
                tempSceneRef.processMap.layer3.setPipeline('Light2D');

            },
            shadowGameover: function shadowGameover() {
                tempSceneRef.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                tempSceneRef.lights.enable().setAmbientColor(0x555555);

                tempSceneRef.processMap.tilesetNameInTiled = "Cave_Tileset";
                tempSceneRef.processMap.setTiles('cave_source_map',tempSceneRef);

                tempSceneRef.processMap.layer0.setPipeline('Light2D');
                tempSceneRef.processMap.layer1.setPipeline('Light2D');
                tempSceneRef.processMap.layer2.setPipeline('Light2D');
                tempSceneRef.processMap.layer3.setPipeline('Light2D');
            },
            abyssGameover: function abyssGameover() {
                tempSceneRef.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                tempSceneRef.lights.enable().setAmbientColor(0x555555);

                tempSceneRef.processMap.tilesetNameInTiled = "Cave_Tileset";
                tempSceneRef.processMap.setTiles('cave_source_map',tempSceneRef);

                tempSceneRef.processMap.layer0.setPipeline('Light2D');
                tempSceneRef.processMap.layer1.setPipeline('Light2D');
                tempSceneRef.processMap.layer2.setPipeline('Light2D');
                tempSceneRef.processMap.layer3.setPipeline('Light2D');
            },

        }

    }
    
    //sets up map of function for enemy preload logic
    preloadMapOfEnemys(){

        let tempSceneRef = this;

        this.dialogueFlag = "default";

        /* note about map of functions. make sure name of function is unique as it will
         overwrite any other function or class with the same name and cause a recursive loop that crashes the browser */

        this.mapOfEnemyPreloads = {
            blueSlime: function blueSlimeFunction() {

                tempSceneRef.enemy = new blueSlime(tempSceneRef,450, 560,tempSceneRef.playerSex);
                console.log("tempSceneRef.enemy: ",tempSceneRef.enemy);
                tempSceneRef.enemy.slimeGameOver();
                tempSceneRef.defeatedTitle = 'cursed';  

            },
            
            largeBlueSlime: function largeBlueSlimeFunction() {
                tempSceneRef.enemy = new blueSlime(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.slimeSize = 2;
                console.log("tempSceneRef.enemy: ",tempSceneRef.enemy);
                tempSceneRef.enemy.largeSlimeGameOver();
                tempSceneRef.enemy.y-500;
                tempSceneRef.defeatedTitle = 'cursed';
            },
            femaleTiger: function femaleTigerFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new tiger(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.enemy.y-500;
                tempSceneRef.defeatedTitle = 'eaten';
            },
            maleTiger: function maleTigerFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new tiger(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.enemy.y-500;
                tempSceneRef.defeatedTitle = 'eaten';
            },
            femaleTigerBooba: function femaleTigerBoobaFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new tiger(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver(1);
                tempSceneRef.enemy.y-500;
                tempSceneRef.defeatedTitle = 'cursed';
            },
            maleTigerBenis: function maleTigerBenisFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new tiger(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver(1);
                tempSceneRef.enemy.y-500;
                tempSceneRef.defeatedTitle = 'cursed';
            },
            maleRabbit: function maleRabbitFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new rabbit(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'cursed';
            },
            femaleRabbit: function femaleRabbitFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new rabbit(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'cursed';
            },
            maleBeeDrone: function maleBeeDroneFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new beeDrone(tempSceneRef,430, 570,tempSceneRef.playerSex,1,'wingFlapSFX');
                tempSceneRef.enemy.gameOver(tempSceneRef.playerSex);
                tempSceneRef.defeatedTitle = 'cursed';

                tempSceneRef.stopFlapping = false;

                setTimeout(function () {
                    tempSceneRef.stopFlapping = true;
                }, 6000);
            },
            femaleBeeDrone: function femaleBeeDroneFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new beeDrone(tempSceneRef,430, 570,tempSceneRef.playerSex,1,'wingFlapSFX');
                tempSceneRef.enemy.gameOver(tempSceneRef.playerSex);
                tempSceneRef.defeatedTitle = 'cursed';

                tempSceneRef.stopFlapping = false;

                setTimeout(function () {
                    tempSceneRef.stopFlapping = true;
                }, 6000);
            },
            maleBat: function maleBatFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new bat(tempSceneRef,450, 600,tempSceneRef.playerSex,1,'wingFlapSFX');
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            femaleBat: function femaleBatFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new bat(tempSceneRef,450, 600,tempSceneRef.playerSex,1,'wingFlapSFX');
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            blueSlimeHS: function blueSlimeHSFunction() {
                tempSceneRef.enemy = new blueSlimeHS(tempSceneRef,450, 580,tempSceneRef.playerSex);
                tempSceneRef.enemy.slimeGameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            blueSlimeFemaleHM: function blueSlimeFemaleHMFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new blueSlimeHM(tempSceneRef,450, 580,tempSceneRef.playerSex);
                tempSceneRef.enemy.slimeGameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            blueSlimeMaleHM: function blueSlimeMaleHMFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new blueSlimeHM(tempSceneRef,450, 580,tempSceneRef.playerSex);
                tempSceneRef.enemy.slimeGameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            femaleChestMimic: function femaleChestMimicFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new chestMimic(tempSceneRef,450, 570,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'cursed';
            },
            femaleChestMimicVore: function femaleChestMimicVoreFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new chestMimic(tempSceneRef,450, 570,tempSceneRef.playerSex);
                tempSceneRef.enemy.angry = true;
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            maleChestMimic: function femaleChestMimicFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new chestMimic(tempSceneRef,450, 570,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'cursed';
            },
            maleChestMimicVore: function femaleChestMimicVoreFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new chestMimic(tempSceneRef,450, 570,tempSceneRef.playerSex);
                tempSceneRef.enemy.angry = true;
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            istaraUnbirth: function istaraUnbirthFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new istara(tempSceneRef,450, 549,"inCave");
                tempSceneRef.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'cursed';
            },
            whiteCatFemaleTF: function whiteCatFemaleTFFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new whiteCat(tempSceneRef,450, 570,tempSceneRef.playerSex);
                //this.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver(0);
                tempSceneRef.defeatedTitle = 'cursed';
            },
            whiteCatFemaleVore: function whiteCatFemaleVoreFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new whiteCat(tempSceneRef,450, 570,tempSceneRef.playerSex);
                //this.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver(1);
                tempSceneRef.defeatedTitle = 'eaten';
            },
            whiteCatMaleTF: function whiteCatMaleTFFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new whiteCat(tempSceneRef,450, 570,tempSceneRef.playerSex);
                //this.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver(0);
                tempSceneRef.defeatedTitle = 'cursed';
            },
            whiteCatMaleVore: function whiteCatMaleVoreFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new whiteCat(tempSceneRef,450, 570,tempSceneRef.playerSex);
                //this.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver(1);
                tempSceneRef.defeatedTitle = 'eaten';
            },
            curseShadow: function curseShadowFunction() {

                tempSceneRef.phantomShadow = tempSceneRef.add.sprite(1221,530,"shadow");
                tempSceneRef.phantomShadow.setScale(1/3);
                tempSceneRef.phantomShadow.setDepth(7);
                tempSceneRef.phantomShadow.setPipeline('Light2D');
                tempSceneRef.phantomShadow.visible = false;
                tempSceneRef.anims.create({key: 'shadowConsume',frames: tempSceneRef.phantomShadow.anims.generateFrameNames('shadow', { start: 0, end: 9 }),frameRate: 9,repeat: 0});

                tempSceneRef.phantomShadowJaw = tempSceneRef.add.sprite(1221,530,"shadowJaw");
                tempSceneRef.phantomShadowJaw.setScale(1/3);
                tempSceneRef.phantomShadowJaw.setDepth(7);
                tempSceneRef.phantomShadowJaw.setPipeline('Light2D');
                tempSceneRef.phantomShadowJaw.visible = false;
                tempSceneRef.anims.create({key: 'shadowConsumeJaw',frames: tempSceneRef.phantomShadow.anims.generateFrameNames('shadowJaw', { start: 0, end: 9 }),frameRate: 9,repeat: 0});

                

                tempSceneRef.enemy = new curseShadow(tempSceneRef,450, 570+32,tempSceneRef.playerSex);
                //this.enemy.setPipeline('Light2D');
                tempSceneRef.enemy.gameOver();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            earieShadow: function earieShadowFunction() {

                tempSceneRef.enemy = new curseShadow(tempSceneRef,450, 570+32,tempSceneRef.playerSex);
                tempSceneRef.enemy.visible = false;

                tempSceneRef.shadowPlayer = tempSceneRef.add.sprite(450,520, "curseShadowSecret");
                tempSceneRef.shadowPlayer.setScale(1/3);
                //applys lighting to the enemy. cursed light is reused as a way for the player to see whats going on when grabbed.
                if(tempSceneRef.lightingSystemActive === true){ 
                    tempSceneRef.shadowPlayer.setPipeline('Light2D');
                    //also sets up the curse light for if the player is cursed.
                    tempSceneRef.shadowPlayer.curseLight = tempSceneRef.lights.addLight(tempSceneRef.shadowPlayer.x,tempSceneRef.shadowPlayer.y, 100, 0x666666);
                }
                //creates animations for try agian button
                /*note need to define animation keys apart of the enemy, and not the scene, otherwise keys will not be overwritting on subsequent activations of this code. */
                if(tempSceneRef.playerSex === 0){
                    tempSceneRef.shadowPlayer.anims.create({key: 'struggle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'grab',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 4, end: 7 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'restrained',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 8, end: 11 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'mostlyTransformed',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 12, end: 32 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'mostlyTransformedIdle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 33, end: 36 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finishedTransformed',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 37, end: 41 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'beginSucking',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 42, end: 51 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure1',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 52, end: 55 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure2',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 52, end: 55 }),frameRate: 12,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure3',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 56, end: 59 }),frameRate: 12,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finish',frames: tempSceneRef.anims.generateFrameNames('curseShadowSecretMale', { start: 60, end: 71 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finishIdle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretMale', { start: 72, end: 75 }),frameRate: 7,repeat: -1});
                }else{
                    tempSceneRef.shadowPlayer.anims.create({key: 'struggle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'grab',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 4, end: 7 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'restrained',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 8, end: 11 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'mostlyTransformed',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 12, end: 32 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'mostlyTransformedIdle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 33, end: 36 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finishedTransformed',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 37, end: 41 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'beginSucking',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 42, end: 51 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure1',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 52, end: 55 }),frameRate: 7,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure2',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 52, end: 55 }),frameRate: 12,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'pleasure3',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 56, end: 59 }),frameRate: 12,repeat: -1});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finish',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 60, end: 71 }),frameRate: 7,repeat: 0});
                    tempSceneRef.shadowPlayer.anims.create({key: 'finishIdle',frames: tempSceneRef.shadowPlayer.anims.generateFrameNames('curseShadowSecretFemale', { start: 72, end: 75 }),frameRate: 7,repeat: -1});
                
                }
                //tempSceneRef.shadowPlayer.anims.play("struggle",true);
                tempSceneRef.earieShadowState = 0;
                tempSceneRef.earieshadowLockout = false;
                tempSceneRef.defeatedTitle = 'cursed';

                tempSceneRef.mobileW.visible = false;
                tempSceneRef.showTryAgain = false;

                //stops the player from pressing w to skip through time scripted dialogue
                tempSceneRef.dialogueInterupt = true;

            },
            maleRabbitVore: function maleRabbitVoreFunction() {
                tempSceneRef.preferance = 0;
                tempSceneRef.enemy = new rabbit(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOverVore();
                tempSceneRef.defeatedTitle = 'eaten';
            },
            femaleRabbitVore: function femaleRabbitVoreFunction() {
                tempSceneRef.preferance = 1;
                tempSceneRef.enemy = new rabbit(tempSceneRef,450, 560,tempSceneRef.playerSex);
                tempSceneRef.enemy.gameOverVore();
                tempSceneRef.defeatedTitle = 'eaten';
            },
        }
    }

    //update functions based on gameover file.
    updateMapOfEnemys(){

        let tempSceneRef = this;

        this.mapOfEnemyUpdates = {
            blueSlime: function blueSlimeFunction() {
                if(tempSceneRef.enemy.slimeSoundCoolDown === false){
                    tempSceneRef.initSoundEffect('blueSlimeSFX','2',0.3);
                    tempSceneRef.enemy.slimeSoundCoolDown = true;
                    setTimeout(function () {
                        tempSceneRef.enemy.slimeSoundCoolDown = false;
                    }, 700);
                }
                
            },
            
            largeBlueSlime: function largeBlueSlimeFunction() {
                if(tempSceneRef.enemy.slimeSoundCoolDown === false){
                    tempSceneRef.initSoundEffect('blueSlimeSFX','2',0.3);
                    tempSceneRef.enemy.slimeSoundCoolDown = true;
                    setTimeout(function () {
                        tempSceneRef.enemy.slimeSoundCoolDown = false;
                    }, 700);
                }
            },
            femaleTiger: function femaleTigerFunction() {
                tempSceneRef.enemy.playJumpySound('10',800); 
            },

            maleTiger: function maleTigerFunction() {

                if(tempSceneRef.enemy.maleTigerStroking === false){
                    tempSceneRef.enemy.playJumpySound('10',800);
                }else{

                    tempSceneRef.enemy.playPlapSound('plap5',1000);
                }
            },
            femaleTigerBooba: function femaleTigerBoobaFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            maleTigerBenis: function maleTigerBenisFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            maleRabbit: function maleRabbitFunction() {

            },
            femaleRabbit: function femaleRabbitFunction() {

            },
            maleBeeDrone: function maleBeeDroneFunction() {
                if(tempSceneRef.enemy.beeDroneSoundCoolDown === false ){
                    if(tempSceneRef.enemy.gameoverAnimationComplete === true){
                        tempSceneRef.initSoundEffect('plapSFX','plap2',1);
    
                        if(tempSceneRef.stopFlapping === false){
                            tempSceneRef.initSoundEffect('wingFlapSFX','1',0.3);
                        }else{
                        tempSceneRef.sound.get('wingFlapSFX').stop();  
                        }
                        tempSceneRef.enemy.beeDroneSoundCoolDown = true;
                        
                        setTimeout(function () {
                            tempSceneRef.enemy.beeDroneSoundCoolDown = false;
                        }, 800);
                    }else if(tempSceneRef.enemy.gameoverAnimationComplete === false){
                        tempSceneRef.initSoundEffect('plapSFX','plap5',1);
                        tempSceneRef.initSoundEffect('wingFlapSFX','1',0.3);
                    
                        tempSceneRef.enemy.beeDroneSoundCoolDown = true;
                
                        setTimeout(function () {
                            tempSceneRef.enemy.beeDroneSoundCoolDown = false;
                        }, 1200);
                    }    
                }
            },
            femaleBeeDrone: function femaleBeeDroneFunction() {
                if(tempSceneRef.enemy.beeDroneSoundCoolDown === false ){
                    if(tempSceneRef.enemy.gameoverAnimationComplete === true){
                        tempSceneRef.initSoundEffect('plapSFX','plap2',1);
    
                        if(tempSceneRef.stopFlapping === false){
                            tempSceneRef.initSoundEffect('wingFlapSFX','1',0.3);
                        }else{
                        tempSceneRef.sound.get('wingFlapSFX').stop();  
                        }
                        tempSceneRef.enemy.beeDroneSoundCoolDown = true;
                       
                        setTimeout(function () {
                            tempSceneRef.enemy.beeDroneSoundCoolDown = false;
                        }, 800);
                    }else if(tempSceneRef.enemy.gameoverAnimationComplete === false){
                        tempSceneRef.initSoundEffect('plapSFX','plap5',1);
                        tempSceneRef.initSoundEffect('wingFlapSFX','1',0.3);
                    
                        tempSceneRef.enemy.beeDroneSoundCoolDown = true;
                        
                        setTimeout(function () {
                            tempSceneRef.enemy.beeDroneSoundCoolDown = false;
                        }, 1200);
                    }    
                }
            },
            maleBat: function maleBatFunction() {

            },
            femaleBat: function femaleBatFunction() {

            },
            
            blueSlimeHS: function blueSlimeHSFunction() {
                if(tempSceneRef.enemy.slimeSoundCoolDown === false){
                    tempSceneRef.initSoundEffect('blueSlimeSFX','2',0.3);
                    tempSceneRef.enemy.slimeSoundCoolDown = true;
                    
                    setTimeout(function () {
                        tempSceneRef.enemy.slimeSoundCoolDown = false;
                    }, 700);
                }
            },
            blueSlimeFemaleHM: function blueSlimeFemaleHMFunction() {
                if(tempSceneRef.enemy.slimeSoundCoolDown === false){
                    tempSceneRef.initSoundEffect('blueSlimeSFX','2',0.3);
                    tempSceneRef.enemy.slimeSoundCoolDown = true;
                    
                    setTimeout(function () {
                        tempSceneRef.enemy.slimeSoundCoolDown = false;
                    }, 700);
                }
            },
            blueSlimeMaleHM: function blueSlimeMaleHMFunction() {
                if(tempSceneRef.enemy.slimeSoundCoolDown === false){
                    tempSceneRef.initSoundEffect('blueSlimeSFX','2',0.3);
                    tempSceneRef.enemy.slimeSoundCoolDown = true;
                    
                    setTimeout(function () {
                        tempSceneRef.enemy.slimeSoundCoolDown = false;
                    }, 700);
                }
            },
            femaleChestMimic: function femaleChestMimicFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            femaleChestMimicVore: function femaleChestMimicVoreFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);    
            },
            maleChestMimic: function femaleChestMimicFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            maleChestMimicVore: function femaleChestMimicVoreFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            istaraUnbirth: function istaraUnbirthFunction() {

            },
            whiteCatFemaleTF: function whiteCatFemaleTFFunction() {
 
            },
            whiteCatFemaleVore: function whiteCatFemaleVoreFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            whiteCatMaleTF: function whiteCatMaleTFFunction() {

            },
            whiteCatMaleVore: function whiteCatMaleVoreFunction() {
                tempSceneRef.enemy.playJumpySound('10',800);
            },
            curseShadow: function curseShadowFunction() {
                
                //handle special gameover process
                if(tempSceneRef.enemy.gameoverMove === true && tempSceneRef.enemy.x < 1220){
                    //console.log("tempSceneRef.enemy.x: ",tempSceneRef.enemy.x," tempSceneRef.enemy.y: ",tempSceneRef.enemy.y);
                    tempSceneRef.enemy.setVelocityX(50);
                }else if(tempSceneRef.enemy.gameoverMove === true && tempSceneRef.enemy.x >= 1220){
                    tempSceneRef.enemy.gameoverMove = false;
                    tempSceneRef.enemy.gameoverIdle = true;
                    tempSceneRef.enemy.setVelocityX(0);
                    tempSceneRef.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                }else if(tempSceneRef.enemy.gameoverIdle === true){
                    tempSceneRef.enemy.gameoverIdle = false;
                    tempSceneRef.enemy.anims.play('shadowGameover6', true).once('animationcomplete', () => {
                        tempSceneRef.enemy.anims.play('shadowGameover7', true)
                        setTimeout(function () {
                            tempSceneRef.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                            setTimeout(function () {
                                tempSceneRef.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                                setTimeout(function () {
                                    
                                    let secret = {
                                        titleLogoType: "shadow"
                                    };
                                    tempSceneRef.secretSave(secret);

                                    tempSceneRef.phantomShadow.visible = true; 
                                    tempSceneRef.phantomShadow.anims.play("shadowConsume",true); 
                                    
                                    tempSceneRef.phantomShadowJaw.visible = true; 
                                    tempSceneRef.phantomShadowJaw.anims.play("shadowConsume",true); 

                                    setTimeout(function () {
                                        
                                        tempSceneRef.initSoundEffect('earieSFX',"spook",0.6);
                                    },400);
                                    setTimeout(function () {
                                        tempSceneRef.tryAgianLoad(tempSceneRef);
                                    },1000);
        
                                },1000);
                            },1000);
                        },3000);
                    });
                }

                if(tempSceneRef.enemy.gameoverMove === null || tempSceneRef.enemy.gameoverMove === undefined){

                    //sound state machine for ifferent stages.
                    if(tempSceneRef.enemy.gameoverLoopingSounds === 0){
                        console.log("playing sound 1")
                        tempSceneRef.enemy.playPlapSound('plap3',800);
                    }else if(tempSceneRef.enemy.gameoverLoopingSounds === 1){
                        console.log("playing sound 2")
                        tempSceneRef.enemy.playPlapSound('plap9',1000);
                    }else if(tempSceneRef.enemy.gameoverLoopingSounds === 2){
                        console.log("playing sound 3")
                        tempSceneRef.enemy.playPlapSound('plap9',500);
                    }
                }
                
            },
            earieShadow: function earieShadowFunction() {
                if(tempSceneRef.earieshadowLockout === false){
                    switch(tempSceneRef.earieShadowState) {
                        case 0:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            tempSceneRef.shadowPlayer.anims.play("struggle",true);
                            setTimeout(function () {
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                setTimeout(function () {
                                tempSceneRef.earieshadowLockout = false;
                                },2000);
                            },4000);
                            break;
                        case 1:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);

                            tempSceneRef.shadowPlayer.anims.play("grab").once('animationcomplete', () => {
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                tempSceneRef.shadowPlayer.anims.play("restrained",true);
                                setTimeout(function () {

                                    tempSceneRef.earieshadowLockout = false;
                                },4000);
                            });
                            break;
                        case 2:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            tempSceneRef.enemy.playPumpSound("pumpingShort",3000);
                            tempSceneRef.shadowPlayer.anims.play("mostlyTransformed").once('animationcomplete', () => {
                                tempSceneRef.shadowPlayer.anims.play("mostlyTransformedIdle",true);
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                tempSceneRef.earieshadowLockout = false;
                            });
                            break;

                        case 3:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            tempSceneRef.initSoundEffect('stomachSFX','8',0.3);

                            tempSceneRef.shadowPlayer.anims.play("finishedTransformed").once('animationcomplete', () => {
                               
                                
                                tempSceneRef.shadowPlayer.anims.play("beginSucking").once('animationcomplete', () => {
                                    
                                    tempSceneRef.earieshadowLockout = false;
                                    tempSceneRef.shadowPlayer.anims.play("pleasure1",true);  
                                    tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                    tempSceneRef.earieshadowLockout = false;
                                });
                            });
                            break;
                        case 4:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            setTimeout(function () {
                                tempSceneRef.shadowPlayer.anims.play("pleasure2",true);  
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                tempSceneRef.earieshadowLockout = false;
                            },3000);
                            break;
                        case 5:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            setTimeout(function () {
                                tempSceneRef.shadowPlayer.anims.play("pleasure3",true);  
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                tempSceneRef.earieshadowLockout = false;
                            },3000);
                            break;
                        case 6:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            setTimeout(function () {
                                tempSceneRef.shadowPlayer.anims.play("pleasure3",true);  
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                setTimeout(function () {
                                    tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                    tempSceneRef.earieshadowLockout = false;
                                },4000);
                           
                            },3000);
                            break;
                        case 7:
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.earieShadowState++;
                            tempSceneRef.sound.get('plapSFX').stop();  
                            setTimeout(function () {
                                tempSceneRef.enemy.playPlapSound('squirt1',1000);
                            },450);
                            tempSceneRef.shadowPlayer.anims.play("finish").once('animationcomplete', () => {
                                tempSceneRef.shadowPlayer.anims.play("finishIdle",true);            
                                tempSceneRef.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                                
                                tempSceneRef.tryAgian.visible = true;
                                //allows the player to click the try agian button to load back into last save
                                tempSceneRef.dialogueInterupt = false;

                                tempSceneRef.earieshadowLockout = false;
                            },3000);
                            break;
                        case 8:
                            //loop animation 
                            tempSceneRef.earieshadowLockout = true;
                            tempSceneRef.enemy.gameoverLoopingSounds = 0;
                            tempSceneRef.shadowPlayer.anims.play("pleasure1",true);
                            setTimeout(function () {
                                tempSceneRef.shadowPlayer.anims.play("pleasure2",true);
                                tempSceneRef.enemy.gameoverLoopingSounds++;
                                setTimeout(function () {
                                    tempSceneRef.shadowPlayer.anims.play("pleasure3",true);
                                    tempSceneRef.enemy.gameoverLoopingSounds++;
                                    setTimeout(function () {
                                        
                                        tempSceneRef.enemy.gameoverLoopingSounds++;
                                        tempSceneRef.sound.get('plapSFX').stop();  
                                        setTimeout(function () {
                                            tempSceneRef.enemy.playPlapSound('squirt1',1000);
                                        },450);
                                        tempSceneRef.shadowPlayer.anims.play("finish").once('animationcomplete', () => {
                                            tempSceneRef.shadowPlayer.anims.play("finishIdle",true);
                                           
                                            setTimeout(function () {
                                                tempSceneRef.earieshadowLockout = false;
                                            },2000);
                                        });
                                    },5000);
                                },10000);
                            },10000);
                            

                            break;
                        default:

                    }
                    
                    
                }

                //manages sound effects for each state.
                switch(tempSceneRef.earieShadowState) {
                    case 0:
                        tempSceneRef.enemy.playStomachSound('4',800); 
                        break;
                    case 1:
                        
                        break;
                    case 2:
                        tempSceneRef.enemy.playPlapSound('plap2',1000);
                        break;
                    case 3:
                        tempSceneRef.enemy.playStomachSound('10',500); 
                        break;
                    case 4:
                        tempSceneRef.enemy.playPlapSound('plap3',200);
                        break;
                    case 5:
                        tempSceneRef.enemy.playPlapSound('plap9',700);
                        break;
                    case 6:
                        tempSceneRef.enemy.playPlapSound('plap9',500);
                        break;
                    case 7:
                        tempSceneRef.enemy.playPlapSound('plap10',500);
                        break;
                    case 8:
                        break;
                    default:
                }
                
                if(tempSceneRef.earieShadowState === 8){

                    //manages sound effects for each state.
                    switch(tempSceneRef.earieShadowState) {
                        case 0:
                           
                            break;
                        case 1:
                            tempSceneRef.enemy.playPlapSound('plap2',1000);
                            break;
                        case 2:
                            tempSceneRef.enemy.playStomachSound('4',800); 
                            break;
                        case 3:
                            tempSceneRef.enemy.playStomachSound('10',500); 
                            break;
                        case 4:
                            tempSceneRef.enemy.playPlapSound('plap3',200);
                            break;
                        case 5:
                            tempSceneRef.enemy.playPlapSound('plap9',700);
                            break;
                        case 6:
                            tempSceneRef.enemy.playPlapSound('plap9',500);
                            break;
                        case 7:
                            tempSceneRef.enemy.playPlapSound('plap10',500);
                            break;
                        case 8:
                            //sound state machine for ifferent stages.
                            if(tempSceneRef.enemy.gameoverLoopingSounds === 0){
                                console.log("playing sound 1")
                                tempSceneRef.enemy.playPlapSound('plap3',800);
                            }else if(tempSceneRef.enemy.gameoverLoopingSounds === 1){
                                console.log("playing sound 2")
                                tempSceneRef.enemy.playPlapSound('plap9',1000);
                            }else if(tempSceneRef.enemy.gameoverLoopingSounds === 2){
                                console.log("playing sound 3")
                                tempSceneRef.enemy.playPlapSound('plap9',500);
                            }
                            break;
                        default:
                    }
                    
                }
            },
            maleRabbitVore: function maleRabbitVoreFunction() {
                //sound state machine for ifferent stages.
                if(tempSceneRef.enemy.gameoverLoopingSounds === 0){
                    tempSceneRef.enemy.playPlapSound('plap8',800);
                }else if(tempSceneRef.enemy.gameoverLoopingSounds === 1){
                    tempSceneRef.enemy.playPlapSound('plap9',500);
                }else if(tempSceneRef.enemy.gameoverLoopingSounds === 3){
                    tempSceneRef.enemy.playJumpySound('10',800); 
                }
            },
            femaleRabbitVore: function femaleRabbitVoreFunction() {
                //sound state machine for ifferent stages.
                if( tempSceneRef.playerSex !== 1 && tempSceneRef.enemySex !== 1){
                    if(tempSceneRef.enemy.gameoverLoopingSounds === 0){
                        tempSceneRef.enemy.playPlapSound('plap8',800);
                    }else if(tempSceneRef.enemy.gameoverLoopingSounds === 1){
                        tempSceneRef.enemy.playPlapSound('plap9',500);
                    }else if(tempSceneRef.enemy.gameoverLoopingSounds === 3){
                        tempSceneRef.enemy.playJumpySound('10',800); 
                    }
                }else{
                    tempSceneRef.enemy.playJumpySound('10',800);
                }
                
            },
        }
    }
        

             
}