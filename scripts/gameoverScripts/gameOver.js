let gameoverThat;
class gameOver extends A3SoundEffects {

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
        //this.flagValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //enemy that defeated player string
        this.enemyThatDefeatedPlayer ="";

        //value to store string of location the player was defeated
        this.gameoverLocation;
        
        }

        //loads sprites for game over.
        preload(){

            this.load.image('backgroundForestRavineLevel', 'assets/backgrounds/forest_ravine_background.png');
            this.load.image('backgroundBeachLevel', 'assets/backgrounds/beach_background.png');

            this.load.image("source_map" , "assets/tiledMap/Forest_Large_Tiles.png");
            this.load.image("blue_slime_source_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave_Tileset.png");
            this.load.image("hive_source_map" , "assets/tiledMap/LockWood/Hive_Tileset/Hive_Tileset.png");
            
            this.load.spritesheet("gameOverSignCursed" , "assets/gameover/gameover cursed.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("gameOverSignEaten" , "assets/gameover/gameover eaten.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("tryAgianSign" , "assets/gameover/try agian.png" , {frameWidth: 200 , frameHeight: 70 });
            this.load.spritesheet('beeGrub', 'assets/enemys/beeGrub.png',{frameWidth: 525, frameHeight: 237 });
            //fix
             //load in the JSON file for the bitmap
            this.load.tilemapTiledJSON("beachGameover" , "assets/tiledMap/LockWood/Beach_Tileset/Beach_Gameover.json");
            this.load.tilemapTiledJSON("caveGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Gameover.json");
            this.load.tilemapTiledJSON("istaraGameover" , "assets/tiledMap/LockWood/Cave_Tileset/Istaras_Gameover.json");
            this.load.tilemapTiledJSON("forestGameover" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Gameover.json");
            this.load.tilemapTiledJSON("hiveGameover" , "assets/tiledMap/LockWood/Hive_Tileset/Grub_Hive_Gameover.json");
            this.load.tilemapTiledJSON("blueSlimeGameover" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Gameover.json");
            

            this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });

            this.load.audioSprite('gameoverSFX','audio/used-audio/gameover-sounds/gameover-sounds.json',[
                "audio/used-audio/gameover-sounds/ponycillo-defeat.mp3"
              ]);

            this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
                "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
              ]);

            this.load.audioSprite('wingFlapSFX','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
                "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
              ]);

            this.load.audioSprite('plapSFX','audio/used-audio/plap-sounds/plap-sounds.json',[
                "audio/used-audio/plap-sounds/plap.mp3"
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

            //handles scene transition and fade out for scene transition
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                //launch the gameplay scenes.
                console.log("now stoping this scene",);
                console.log("now loading game ui",);
                this.scene.launch('gameHud');
                
                console.log("now Loading main scene:", this.playerLocation);
                
                this.scene.start(this.playerLocation);

            })
            

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
             
            console.log("loading gameover tileset: ", this.gameoverLocation);

            let myMap = this.make.tilemap({ key:this.gameoverLocation});

            console.log("loading gameover tileset: ", this.gameoverLocation);
            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap);
            //calls function that loads the tiles from the json
            if(this.gameoverLocation === 'blueSlimeGameover'){

                this.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                this.lights.enable().setAmbientColor(0x555555);

                this.processMap.tilesetNameInTiled = "Blue_Slime_Cave_Tileset";
                this.processMap.setTiles('blue_slime_source_map',this);

                this.processMap.layer0.setPipeline('Light2D');
                this.processMap.layer1.setPipeline('Light2D');
                this.processMap.layer2.setPipeline('Light2D');
                this.processMap.layer3.setPipeline('Light2D');
            }else if(this.gameoverLocation === 'caveGameover'){

                this.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                this.lights.enable().setAmbientColor(0x555555);

                this.processMap.tilesetNameInTiled = "Cave_Tileset";
                this.processMap.setTiles('cave_source_map',this);

                this.processMap.layer0.setPipeline('Light2D');
                this.processMap.layer1.setPipeline('Light2D');
                this.processMap.layer2.setPipeline('Light2D');
                this.processMap.layer3.setPipeline('Light2D');

            }else if(this.gameoverLocation === 'forestGameover'){
                this.lightingSystemActive = false;

                this.processMap.tilesetNameInTiled = "Forest_Tileset";
                this.processMap.setTiles('forest_source_map',this);
            }else if(this.gameoverLocation === 'hiveGameover'){
                this.lightingSystemActive = false;
                this.processMap.tilesetNameInTiled = "Hive_Tileset";
                this.processMap.setTiles('hive_source_map',this);
            }else if(this.gameoverLocation === 'istaraGameover'){

                this.lightingSystemActive = true;

                //sets the ambient lighting color using a hex value.
                this.lights.enable().setAmbientColor(0x555555);

                this.processMap.tilesetNameInTiled = "Cave_Tileset";
                this.processMap.setTiles('cave_source_map',this);

                this.processMap.layer0.setPipeline('Light2D');
                this.processMap.layer1.setPipeline('Light2D');
                this.processMap.layer2.setPipeline('Light2D');
                this.processMap.layer3.setPipeline('Light2D');

                this.initLoopingSound('waterfallSFX','waterfall', 0.03);

                this.light1 = new wallLight(this,445, 470,'ghostMushroom2');
                this.light2 = new wallLight(this,455, 472,'ghostMushroom3');
                this.light2 = new wallLight(this,465, 468,'ghostMushroom4');

            }else{
                //this.processMap.tilesetNameInTiled = "Forest_Large_Tiles";
                //this.processMap.setTiles('source_map',this);
            }

            //uses the eneny string to determine what animation should be played.
            if(this.enemyThatDefeatedPlayer === "blueSlime"){
                this.enemy = new blueSlime(this,450, 560,this.playerSex);
                this.enemy.slimeGameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "largeBlueSlime"){
                this.enemy = new blueSlime(this,450, 560,this.playerSex);
                this.enemy.slimeSize = 2;
                this.enemy.largeSlimeGameOver();
                this.enemy.y-500;
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "femaleTiger"){
                this.enemy = new tiger(this,450, 560,this.playerSex);
                this.enemy.gameOver();
                this.enemy.y-500;
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "femaleTigerBooba"){
                this.enemy = new tiger(this,450, 560,this.playerSex);
                this.enemy.gameOver(1);
                this.enemy.y-500;
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "maleRabbit"){
                this.preferance = 0;
                this.enemy = new rabbit(this,450, 560,this.playerSex);
                this.enemy.gameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "femaleRabbit"){
                this.preferance = 1;
                this.enemy = new rabbit(this,450, 560,this.playerSex);
                this.enemy.gameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "maleBeeDrone"){
                this.preferance = 0;
                this.enemy = new beeDrone(this,430, 570,this.playerSex,1,'wingFlapSFX');
                this.enemy.gameOver(this.playerSex);
                this.defeatedTitle = 'cursed';

                this.stopFlapping = false;
                let scene = this;
                setTimeout(function () {
                    scene.stopFlapping = true;
                }, 3000);
            }else if(this.enemyThatDefeatedPlayer === "femaleBeeDrone"){
                this.preferance = 1;
                this.enemy = new beeDrone(this,430, 570,this.playerSex,1,'wingFlapSFX');
                this.enemy.gameOver(this.playerSex);
                this.defeatedTitle = 'cursed';

                this.stopFlapping = false;
                let scene = this;
                setTimeout(function () {
                    scene.stopFlapping = true;
                }, 6000);
            }else if(this.enemyThatDefeatedPlayer === "maleBat"){
                this.preferance = 0;
                this.enemy = new bat(this,450, 600,this.playerSex,1,'wingFlapSFX');
                this.enemy.gameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "femaleBat"){
                this.preferance = 1;
                this.enemy = new bat(this,450, 600,this.playerSex,1,'wingFlapSFX');
                this.enemy.gameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "blueSlimeHS"){
                this.enemy = new blueSlimeHS(this,450, 580,this.playerSex);
                this.enemy.slimeGameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "blueSlimeFemaleHM"){
                this.preferance = 1;
                this.enemy = new blueSlimeHM(this,450, 580,this.playerSex);
                this.enemy.slimeGameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "blueSlimeMaleHM"){
                this.preferance = 0;
                this.enemy = new blueSlimeHM(this,450, 580,this.playerSex);
                this.enemy.slimeGameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "femaleChestMimic"){
                this.preferance = 1;
                this.enemy = new chestMimic(this,450, 570,this.playerSex);
                this.enemy.gameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "femaleChestMimicVore"){
                this.preferance = 1;
                this.enemy = new chestMimic(this,450, 570,this.playerSex);
                this.enemy.angry = true;
                this.enemy.gameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "maleChestMimic"){
                this.preferance = 0;
                this.enemy = new chestMimic(this,450, 570,this.playerSex);
                this.enemy.gameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "maleChestMimicVore"){
                this.preferance = 0;
                this.enemy = new chestMimic(this,450, 570,this.playerSex);
                this.enemy.angry = true;
                this.enemy.gameOver();
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "istaraUnbirth"){
                this.preferance = 0;
                this.enemy = new istara(this,450, 549,"inCave");
                this.enemy.setPipeline('Light2D');
                this.enemy.gameOver();
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "whiteCatFemaleTF"){
                this.preferance = 1;
                this.enemy = new whiteCat(this,450, 570,this.playerSex);
                //this.enemy.setPipeline('Light2D');
                this.enemy.gameOver(0);
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "whiteCatFemaleVore"){
                this.preferance = 1;
                this.enemy = new whiteCat(this,450, 570,this.playerSex);
                //this.enemy.setPipeline('Light2D');
                this.enemy.gameOver(1);
                this.defeatedTitle = 'eaten';
            }else if(this.enemyThatDefeatedPlayer === "whiteCatMaleTF"){
                this.preferance = 0;
                this.enemy = new whiteCat(this,450, 570,this.playerSex);
                //this.enemy.setPipeline('Light2D');
                this.enemy.gameOver(0);
                this.defeatedTitle = 'cursed';
            }else if(this.enemyThatDefeatedPlayer === "whiteCatMaleVore"){
                this.preferance = 0;
                this.enemy = new whiteCat(this,450, 570,this.playerSex);
                //this.enemy.setPipeline('Light2D');
                this.enemy.gameOver(1);
                this.defeatedTitle = 'eaten';
            }
            
            
            //adds collider for enemy to the tileset
            this.physics.add.collider(this.processMap.layer1, this.enemy);

            //sets up camera to follow player.
            this.mycamera = this.cameras.main;
            //this.mycamera.startFollow(this.enemy);
            this.mycamera.setBounds( 0, 55, myMap.widthInPixels, myMap.HeightInPixels); 
            this.cameras.main.zoom = 3;
            this.cameras.main.followOffset.set(0,50);

            //game over sign.
            this.gameOverSign = this.add.sprite(450,410,"gameOverSign");
            this.gameOverSign.setScale(.3);
            this.gameOverSign.setDepth(7);
            
            
            //sets timeout for animations.
            //setTimeout(function(){
                if(this.defeatedTitle === 'eaten'){
                    this.gameOverSign.anims.play("gameoverTitleAnimationEaten");
                }else{
                    this.gameOverSign.anims.play("gameoverTitleAnimationCursed");
                }
                
              //},100);
           
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
                            dreamReturnLocation:gameoverThat.dreamReturnLocation
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

            this.initSoundEffect('gameoverSFX','gameover',0.05);

            this.enemy.soundCoolDown = false;

        }

        update(){

            //console.log("this.enemy.x",this.enemy.x," this.enemy.y", this.enemy.y)

            //plays sound effects for blueSlime.
            if(this.enemy.slimeSoundCoolDown === false &&(
                this.enemyThatDefeatedPlayer === "blueSlime" ||
                this.enemyThatDefeatedPlayer === "largeBlueSlime"||
                this.enemyThatDefeatedPlayer === "blueSlimeHS" || 
                this.enemyThatDefeatedPlayer === "blueSlimeFemaleHM" || 
                this.enemyThatDefeatedPlayer === "blueSlimeMaleHM" 
                )){
                this.initSoundEffect('blueSlimeSFX','2',0.3);
                
                this.enemy.slimeSoundCoolDown = true;
                let scene = this;
                setTimeout(function () {
                    scene.enemy.slimeSoundCoolDown = false;
                }, 700);
            }else if(this.enemy.beeDroneSoundCoolDown === false && (this.enemyThatDefeatedPlayer === "maleBeeDrone" || this.enemyThatDefeatedPlayer === "femaleBeeDrone")){
                if(this.enemy.gameoverAnimationComplete === true){
                    this.initSoundEffect('plapSFX','plap2',1);

                    if(this.stopFlapping === false){
                        this.initSoundEffect('wingFlapSFX','1',0.3);
                    }else{
                    this.sound.get('wingFlapSFX').stop();  
                    }
                    this.enemy.beeDroneSoundCoolDown = true;
                    let scene = this;
                    setTimeout(function () {
                        scene.enemy.beeDroneSoundCoolDown = false;
                    }, 800);
                }else if(this.enemy.gameoverAnimationComplete === false){
                    this.initSoundEffect('plapSFX','plap5',1);
                    this.initSoundEffect('wingFlapSFX','1',0.3);
                
                    this.enemy.beeDroneSoundCoolDown = true;
                    let scene = this;
                    setTimeout(function () {
                        scene.enemy.beeDroneSoundCoolDown = false;
                    }, 1200);
                }    
            }else if(this.enemyThatDefeatedPlayer === 'femaleTiger' ||
                 this.enemyThatDefeatedPlayer === "femaleChestMimic"||
                 this.enemyThatDefeatedPlayer === "femaleChestMimicVore" ||
                 this.enemyThatDefeatedPlayer === "maleChestMimic"||
                 this.enemyThatDefeatedPlayer === "maleChestMimicVore"||
                this.enemyThatDefeatedPlayer === "whiteCatFemaleVore" ||
                this.enemyThatDefeatedPlayer === "whiteCatMaleVore"){
                    
                this.enemy.playJumpySound('10',800);
            }else if(this.enemyThatDefeatedPlayer === "istaraUnbirth"){
                this.enemy.playJumpySound('10',600);
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