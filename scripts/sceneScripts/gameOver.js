/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
 */
let gameoverThat;
class gameOver extends allSceneFunctions {

    constructor(){
        // scene settings
        super({key: 'gameOver',active: false,physics:{default:'arcade'}});
        
        this.newGame;
        //tileset map
        this.processMap;
        this.myMap;
        //enemy that beat player
        this.enemy;
        //game over display "cursed"
        this.gameOverSign;
        //try agian button 
        this.tryAgain;
        //function to acess other functions. should factor this out.
        this.allFunctions;
        //sets up camera object
        this.mycamera;
        //backround image
        this.backround;
        //default placement of enemy that defeated player in the scene.
        this.warpToX = 450;
        this.warpToY = 600;
        //array to hold player data.
        this.inventoryDataArray;
        //contains the player sex value
        this.playerSex;
        //contains default player location
        this.playerLocation = "";
        this.playerBestiaryData;
        this.playerSkillsData;
        this.playerSaveSlotData;
        this.flagValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //enemy that defeated player string
        this.enemyThatDefeatedPlayer ="";

        //value to store string of location the player was defeated
        this.gameoverLocation;
        
        }

        //loads sprites for game over.
        preload(){

            this.load.image('backgroundForestRavineLevel', 'assets/forest_ravine_background.png');
            this.load.image('backgroundBeachLevel', 'assets/beach_background.png');

            this.load.image("source_map" , "assets/tiledMap/Forest_Large_Tiles.png");
            this.load.spritesheet("gameOverSignCursed" , "assets/gameover cursed.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("gameOverSignEaten" , "assets/gameover eaten.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("tryAgianSign" , "assets/try agian.png" , {frameWidth: 200 , frameHeight: 70 });
            
             //load in the JSON file for the bitmap
            this.load.tilemapTiledJSON("beachGameover" , "assets/tiledMap/LockWood/Beach_Gameover.json");
            this.load.tilemapTiledJSON("caveGameover" , "assets/tiledMap/LockWood/Cave_Gameover.json");
            this.load.tilemapTiledJSON("forestGameover" , "assets/tiledMap/LockWood/Forest_Gameover.json");
            

            this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });

            this.load.audioSprite('gameoverSFX','audio/used-audio/gameover-sounds/gameover-sounds.json',[
                "audio/used-audio/gameover-sounds/ponycillo-defeat.mp3"
              ]);

            this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
                "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
              ]);

            this.load.scenePlugin({
                key: 'AnimatedTiles',
                url: 'lib/vendors/AnimatedTiles.js',
                sceneKey: 'AnimatedTiles'
            });

        }

        create(){

            //call allscenes object, maybe its time to make a default ui screen class? or just do the loading in the title screen and gameover.

            //load gameoverFile data to this scene
            this.loadGameoverFile();

            console.log("this.playersex: "+ this.playerSex);
            console.log("now in gameover scene");

            //creates backround object
            if(this.gameoverLocation === "forestGameover"){
                let backround = this.add.sprite(450, 380, "backgroundForestRavineLevel");

            }else if(this.gameoverLocation === "beachGameover"){
                let backround = this.add.sprite(450, 380, "backgroundBeachLevel");

            }
            

            //creates try again button
            this.tryAgian = this.add.sprite(450, 635, "tryAgianSign").setInteractive();

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

            this.tryAgian.visible = false;
             
            console.log("loading gameover tileset");

            let myMap = this.make.tilemap({ key: this.gameoverLocation});
            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap);
            //calls function that loads the tiles from the json
            this.processMap.tilesetNameInTiled = "Forest_Large_Tiles";
            this.processMap.setTiles('source_map',this);

            //uses the eneny string to determine what animation should be played.
            if(this.enemyThatDefeatedPlayer === "blueSlime"){
                this.enemy = new blueSlime(this,450, 560,this.playerSex);
                this.enemy.slimeGameOver();
            }else if(this.enemyThatDefeatedPlayer === "largeBlueSlime"){
                this.enemy = new blueSlime(this,450, 560,this.playerSex);
                this.enemy.slimeSize = 2;
                this.enemy.largeSlimeGameOver();
                this.enemy.y-500;
            
            }else if(this.enemyThatDefeatedPlayer === "tiger"){
                this.enemy = new tiger(this,450, 560,this.playerSex);
                this.enemy.gameOver();
                this.enemy.y-500;
            
            }
            
            //adds collider for enemy to the tileset
            this.physics.add.collider(this.processMap.layer1, this.enemy);

            //sets up camera to follow player.
            this.mycamera = this.cameras.main;
            this.mycamera.startFollow(this.enemy);
            this.mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels); 
            this.cameras.main.zoom = 3;
            this.cameras.main.followOffset.set(0,50);

            //game over sign.
            this.gameOverSign = this.add.sprite(450,410,"gameOverSign");
            this.gameOverSign.setScale(.3);
            this.gameOverSign.setDepth(7);
            
            
            //sets timeout for animations.
            setTimeout(function(){
                if(gameoverThat.defeatedTitle === 'eaten'){
                    gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationEaten");
                }else{
                    gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationCursed");
                }
                
              },200);

              setTimeout(function(){
                if(gameoverThat.defeatedTitle === 'eaten'){
                    gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationLoopEaten");
                }else{
                    gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationLoopCursed");
                }
              },220);
           
              setTimeout(function(){
                gameoverThat.tryAgian.visible = true;
              },1000);
            
            //logic for try agian button
            //allow acess to scene in settimeout functions.
            gameoverThat = this;
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

                    //loop through of entrys the player has that was loaded from file
                    for(let [key,value] of Object.entries(gameoverThat.playerBestiaryData)){

                        // if the key can be found then we set the entry to 1 to represent the player having the entry.
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            gameoverThat.playerBestiaryData[key] = 1;
                        }
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
                            settings:gameoverThat.settings
                        };

                    //call save function for temp save so when we start the scene agian, it has the correct data.
                    gameoverThat.saveGame(playerDataObject);

                    //launch the gameplay scenes.
                    console.log("now stoping this scene",);
                    //gameoverThat.scene.stop();
                    console.log("now loading game ui",);
                    gameoverThat.scene.launch('gameHud');
                    setTimeout(function () {
                        console.log("now Loading main scene:", gameoverThat.playerLocation);
                        gameoverThat.scene.start(gameoverThat.playerLocation);
        
                    }, 100);

                //if the player has not saved, send them back to the beginning of the game
                }else if(tempPlayerSex === 1){
                    console.log("no save file detected: now sending male player back to the beginning of the game ");

                    let playerBestiaryData = {
                        blueSlime:0,
                        largeBlueSlime:0,
                        axolotlMale:0,
                        axolotlfemale:0,
                        largePurpleSlugFemale:0,
                        largePurpleSlugMale:0,
                        rabbitfemale:0,
                        rabbitMale:0,
                        cowFemale:0,
                        cowMale:0,
                        blueSlimeHumanoidFemale:0,
                        blueSlimeHumanoidFemaleLarge:0,
                        sharkFemale:0,
                        sharkMale:0,
                        
                     };
        
                     let playerSkillsData = {
                        jump:1,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };
        
                    let saveSlotData = {
                        saveSlot:gameoverThat.playerSaveSlotData.saveSlot,
                        currency: 0,
                        bestiaryCompletionPercent: 0,
                        playerHealthUpgrades: 0,
                        PlayerStorage: [],
                     };
        
                     let gameFlags = {
                        containerFlags: []
                     };

                     //creates a array to be filled my objects
                     gameoverThat.inventoryArray  = [];
        
                     //fills the array with objects
                     for(let counter = 0; counter < 26; counter++){
         
                         //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                         //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                         let item = {
                             itemID: 0,
                             itemStackable: 1,
                             itemAmount: 0 
                          };
         
                        gameoverThat.inventoryArray.push(item);
                     }
                     
        
                     gameoverThat.allFunctions.saveGame(
                        441,//nextSceneX
                        926,//nextSceneY
                        1,//playerHp
                        1,//playerSex
                        gameoverThat.inventoryArray,//playerInventoryData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        saveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );

                        console.log("now stoping this scene",);
                        gameoverThat.scene.stop();
                        console.log("now loading game ui",);
                        gameoverThat.scene.launch('gameHud');
                        setTimeout(function () {
                            console.log("now Loading main scene",);
                            gameoverThat.scene.start('tutorialBeachLevel');
        
                        }, 100);

                }else if(tempPlayerSex === 0){

                    console.log("no save file detected: now sending female player back to the beginning of the game ");
                    console.log("this.playerLocation",this.playerLocation);

                    let playerBestiaryData = {
                        blueSlime:0,
                        largeBlueSlime:0,
                        axolotlMale:0,
                        axolotlfemale:0,
                        largePurpleSlugFemale:0,
                        largePurpleSlugMale:0,
                        rabbitfemale:0,
                        rabbitMale:0,
                        cowFemale:0,
                        cowMale:0,
                        blueSlimeHumanoidFemale:0,
                        blueSlimeHumanoidFemaleLarge:0,
                        sharkFemale:0,
                        sharkMale:0,
                        
                     };
        
                     let playerSkillsData = {
                        jump:1,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };
        
                    let saveSlotData = {
                        saveSlot:gameoverThat.playerSaveSlotData.saveSlot,
                        currency: 0,
                        bestiaryCompletionPercent: 0,
                        playerHealthUpgrades: 0,
                        PlayerStorage: [],
                     };
        
                     let gameFlags = {
                        containerFlags: []
                     };

                     //creates a array to be filled my objects
                     gameoverThat.inventoryArray  = [];
        
                     //fills the array with objects
                     for(let counter = 0; counter < 26; counter++){
         
                         //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                         //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                         let item = {
                             itemID: 0,
                             itemStackable: 1,
                             itemAmount: 0 
                          };
         
                        gameoverThat.inventoryArray.push(item);
                     }
                     
        
                     gameoverThat.allFunctions.saveGame(
                        441,//nextSceneX
                        926,//nextSceneY
                        1,//playerHp
                        0,//playerSex
                        gameoverThat.inventoryArray,//playerInventoryData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        saveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );

                        console.log("now stoping this scene",);
                        gameoverThat.scene.stop();
                        console.log("now loading game ui",);
                        gameoverThat.scene.launch('gameHud');
                        setTimeout(function () {
                            console.log("now Loading main scene",);
                            gameoverThat.scene.start('tutorialBeachLevel');
        
                        }, 100);
                     }
        
            });

            //plays animation for pointer lighting up when mouse hovers over it.
            this.tryAgian.on('pointerover',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianActive");
            })
            this.tryAgian.on('pointerout',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianInActive");
            })

            this.initSoundEffect('gameoverSFX','gameover',0.05);

        }

        update(){

            //console.log("this.enemy.x",this.enemy.x," this.enemy.y", this.enemy.y)

            //plays sound effects for blueSlime.
            if(this.enemy.slimeSoundCoolDown === false &&(this.enemyThatDefeatedPlayer === "blueSlime" || this.enemyThatDefeatedPlayer === "largeBlueSlime" )){
                this.initSoundEffect('blueSlimeSFX','2',0.3);
                
                this.enemy.slimeSoundCoolDown = true;
                let scene = this;
                setTimeout(function () {
                    scene.enemy.slimeSoundCoolDown = false;
                }, 700);
            }

        }

        initLoopingSound(soundID,soundName,volume){
            //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
            let createSound = true;
     
            //so we loop through the sounds to see if any sounds match our key
            //this is important as we do not want to create duplicate sounds with the same key.
            for(let counter = 0; counter < this.sound.sounds.length;counter++){
              //if a key matches the given sound then set bool to false.
              if(this.sound.sounds[counter].key === soundID){
                console.log("found key: ",soundID,"so we wont create the sound object");
                createSound = false;
              }
      
            }
      
            //if we should create the sound because the key does not exist make it
            if(createSound === true){
               console.log("key not found making ",soundID);
               this.sound.playAudioSprite(soundID,soundName);
              
            }else{ // otherwise play the sound from the keys and set its config to true so it loops.
               this.sound.get(soundID).play();
            }
           //this line of code sets the whole volume
           //this.sound.setVolume(volume);
            
           //set the volume of the specific sound.
            this.sound.get(soundID).volume = volume;
            //ensures that the sound is looping
            this.sound.get(soundID).config.loop = true;
     
         }
     
         initSoundEffect(soundID,soundName,volume){
           //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
           let createSound = true;
     
           //so we loop through the sounds to see if any sounds match our key
           //this is important as we do not want to create duplicate sounds with the same key.
           for(let counter = 0; counter < this.sound.sounds.length;counter++){
             //if a key matches the given sound then set bool to false.
             if(this.sound.sounds[counter].key === soundID){
               console.log("found key: ",soundID,"so we wont create the sound object");
               createSound = false;
             }
     
           }
     
           //if we should create the sound because the key does not exist make it
           if(createSound === true){
              console.log("key not found making ",soundID);
              this.sound.playAudioSprite(soundID,soundName);
             
           }else{ // otherwise play the sound from the keys and set its config to true so it loops.
              this.sound.get(soundID).play(soundName);
           }
          //this line of code sets the whole volume
          //this.sound.setVolume(volume);
           
          //set the volume of the specific sound.
           this.sound.get(soundID).volume = volume;
           //ensures that the sound is looping
        }

}