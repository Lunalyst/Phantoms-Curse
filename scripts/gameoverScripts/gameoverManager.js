
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
                tempGameover.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
            },

        
 
        }


    }

    //set up player control logic
    setUpPlayerControls(){
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
            gameoverThat.tryAgian.visible = true;
        },1000);

        this.tryAgian.on('pointerdown', function (pointer) {

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
                tempGameover.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
            },

        
 
        }


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

        }

    }
    
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

            

        
 
        }
    }
    //update functions based on gameover file.

        

             
}