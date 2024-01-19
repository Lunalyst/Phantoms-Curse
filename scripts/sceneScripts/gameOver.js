/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
 */
let gameoverThat;
class gameOver extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'gameOverForest',active: false,physics:{default:'arcade'}});
        
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
        
        //allow acess to scene in settimeout functions.
        gameoverThat = this;
        }

        //loads sprites for game over.
        preload(){
            this.load.image("gameOverbackground" , "assets/titleScreenBackground.png");
            this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
            this.load.spritesheet("gameOverSign" , "assets/gameoversign.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("tryAgianSign" , "assets/try agian.png" , {frameWidth: 200 , frameHeight: 70 });
            
             //load in the JSON file for the bitmap
            this.load.tilemapTiledJSON("mapGameover" , "assets/tiledMap/gameOverForest.json");
            this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });

        }

        create(){

            //call allscenes object, maybe its time to make a default ui screen class? or just do the loading in the title screen and gameover.
            this.allFunctions = new allSceneFunctions;

            //load gameoverFile data to this scene
            const file = JSON.parse(localStorage.getItem('saveGameoverFile'));
            //retrieves data from the file object and gives it to the current scene
            console.log("calling loadGameoverFile============================");
            console.log("playerSex: " + file.sex);
            console.log("enemy: " + file.enemy);
            console.log("playerSaveSlotData: ", file.pssd);

            this.playerSex = file.sex;
            this.enemyThatDefeatedPlayer = file.enemy;
            this.playerSaveSlotData = file.pssd;

            console.log("this.playersex: "+ this.playerSex);
            console.log("now in gameover scene");

            //creates backround object
            let backround = this.add.sprite(450, 0, "gameOverbackground");
            backround.setScale(1.5,1.5);

            //creates try again button
            this.tryAgian = this.add.sprite(450, 345, "tryAgianSign").setInteractive();

            //creates animations for try agian button
            this.anims.create({key: 'tryAgianInActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'tryAgianActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'gameoverTitleAnimation',frames: this.anims.generateFrameNames('gameOverSign', { start: 0, end: 5 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'gameoverTitleAnimationLoop',frames: this.anims.generateFrameNames('gameOverSign', { start: 2, end: 5 }),frameRate: 3,repeat: -1});
            this.tryAgian.anims.play('tryAgianInActive');
            this.tryAgian.setScale(.5);
            this.tryAgian.setDepth(7);

            this.tryAgian.visible = false;
             
            console.log("loading gameover tileset");

            let myMap = this.make.tilemap({ key: "mapGameover" });
            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap);
            //calls function that loads the tiles from the json
            this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
            this.processMap.setTiles('source_map');

            //uses the eneny string to determine what animation should be played.
            if(this.enemyThatDefeatedPlayer === "blueSlime"){
                this.enemy = new blueSlime(this,450, 280,this.playerSex);
                this.enemy.slimeGameOver();
            }else if(this.enemyThatDefeatedPlayer === "largeBlueSlime"){
                this.enemy = new blueSlime(this,450, 280,this.playerSex);
                this.enemy.slimeSize = 2;
                this.enemy.largeSlimeGameOver();
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
            this.gameOverSign = this.add.sprite(450,160,"gameOverSign");
            this.gameOverSign.setScale(.3);
            this.gameOverSign.setDepth(7);
            
            

            setTimeout(function(){
                gameoverThat.gameOverSign.anims.play("gameoverTitleAnimation");
              },200);

              setTimeout(function(){
                gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationLoop");
              },220);
           
              setTimeout(function(){
                gameoverThat.tryAgian.visible = true;
              },1000);
            
            this.tryAgian.on('pointerdown', function (pointer) {

                let tempPlayerSaveSlotData = gameoverThat.playerSaveSlotData;
                let tempPlayerSex = gameoverThat.playerSex;
                //console.log("gameoverThat.playerSex: ",gameoverThat.playerSex);
                gameoverThat.allFunctions.loadGameFile(gameoverThat,gameoverThat.playerSaveSlotData.saveSlot);

                if(gameoverThat.playerBestiaryData !== undefined && gameoverThat.playerBestiaryData !== null){
                    for(let [key,value] of Object.entries(gameoverThat.playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            gameoverThat.playerBestiaryData[key] = 1;
                        }
                      }
                    
                    gameoverThat.allFunctions.saveGame(
                    gameoverThat.warpToX,
                    gameoverThat.warpToY,
                    gameoverThat.playerHealth,
                    gameoverThat.playerSex,
                    gameoverThat.inventoryDataArray,
                    gameoverThat.playerBestiaryData,
                    gameoverThat.playerSkillsData,
                    gameoverThat.playerSaveSlotData,
                    gameoverThat.flagValues
                    );
                    
                    gameoverThat.scene.start('gameHud');
                    gameoverThat.scene.start(gameoverThat.playerLocation); 

                }else if(tempPlayerSex === 1){
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
                        sharkMale:0
                     };

                     for(let [key,value] of Object.entries(playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            playerBestiaryData[key] = 1;
                        }
                      }
        
                     let playerSkillsData = {
                        jump:1,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };

        
                     let gameFlags = {
                        cutTree1:0
        
                     };

                      //creates a array to be filled my objects
                      let inventoryArray  = [];

                      //fills the array with objects
                      for(let counter = 0; counter < 25; counter++){
          
                          //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                          //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                          let item = {
                              itemID: 0,
                              itemStackable: 1,
                              itemAmount: 0 
                           };
          
                          inventoryArray.push(item);
                      }
          
                      inventoryArray[0].itemID = 2;
                      inventoryArray[0].itemStackable = 0;
                      inventoryArray[0].itemAmount = 1;
                     
          
                      inventoryArray[1].itemID = 4;
                      inventoryArray[1].itemStackable = 0;
                      inventoryArray[1].itemAmount = 1;
                      
          
                      inventoryArray[2].itemID = 6;
                      inventoryArray[2].itemStackable = 0;
                      inventoryArray[2].itemAmount = 1;
                      
          
                      inventoryArray[3].itemID = 8;
                      inventoryArray[3].itemStackable = 0;
                      inventoryArray[3].itemAmount = 1;
                      
          
                      inventoryArray[4].itemID = 10;
                      inventoryArray[4].itemStackable = 0;
                      inventoryArray[4].itemAmount = 1;
        
                    gameoverThat.allFunctions.saveGame(
                        1650,//nextSceneX
                        542,//nextSceneY
                        2,//playerHp
                        1,//playerSex
                        inventoryArray,//playerInventoryData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        tempPlayerSaveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );

                        gameoverThat.scene.start('gameHud');
                        gameoverThat.scene.start('forestHome');

                }else if(tempPlayerSex === 0){
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
                        sharkMale:0
                     };

                     for(let [key,value] of Object.entries(playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            playerBestiaryData[key] = 1;
                        }
                      }
        
                     let playerSkillsData = {
                        jump:1,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };
        
                     let gameFlags = {
                        cutTree1:0
        
                     };

                      //creates a array to be filled my objects
            let inventoryArray  = [];

            //fills the array with objects
            for(let counter = 0; counter < 25; counter++){

                //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                let item = {
                    itemID: 0,
                    itemStackable: 1,
                    itemAmount: 0 
                 };

                inventoryArray.push(item);
            }

            inventoryArray[0].itemID = 2;
            inventoryArray[0].itemStackable = 0;
            inventoryArray[0].itemAmount = 1;
           

            inventoryArray[1].itemID = 4;
            inventoryArray[1].itemStackable = 0;
            inventoryArray[1].itemAmount = 1;
            

            inventoryArray[2].itemID = 6;
            inventoryArray[2].itemStackable = 0;
            inventoryArray[2].itemAmount = 1;
            

            inventoryArray[3].itemID = 8;
            inventoryArray[3].itemStackable = 0;
            inventoryArray[3].itemAmount = 1;
            

            inventoryArray[4].itemID = 10;
            inventoryArray[4].itemStackable = 0;
            inventoryArray[4].itemAmount = 1;
        
                    gameoverThat.allFunctions.saveGame(
                        1650,//nextSceneX
                        542,//nextSceneY
                        2,//playerHp
                        0,//playerSex
                        inventoryArray,//playerInventoryData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        tempPlayerSaveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );
                        //that.scene.start('gameHud')
                        //that.scene.start('forestHome');
                    gameoverThat.scene.start('gameHud');
                    gameoverThat.scene.start('forestHome');
                    
                }
        
            });

            this.tryAgian.on('pointerover',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianActive");
            })
            this.tryAgian.on('pointerout',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianInActive");
            })

            

        }

        update(){
            
        }

}