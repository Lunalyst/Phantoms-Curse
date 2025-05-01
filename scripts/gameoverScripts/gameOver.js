let gameoverThat = this;
class gameOver extends gameoverManager {

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
        //variable used to tell if dialogue should be interupted.
        this.dialogueInterupt = false;

        //variable to stop try agian button from appearing if we dont want it too. currently set to always show after delay.
        gameoverThat.showTryAgain = true;
        
        }

        //loads sprites for game over.
        preload(){
            //call built in function to obtain gameover data. is the earliest location in which the data can be loaded.
            this.loadGameoverFile();

            //function to create a map of functions to preload the correct map needed based in the location string.
            this.preloadMapOfTileMaps();

            //console.log("this.mapOfTileMapsJSON[this.gameoverLocation](): ",this.mapOfTileMapsJSON);
            this.mapOfTileMapsJSON[this.gameoverLocation]();

            
            this.load.spritesheet("gameOverSignCursed" , "assets/gameover/gameover cursed.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("gameOverSignEaten" , "assets/gameover/gameover eaten.png" , {frameWidth: 720 , frameHeight: 300 });
            this.load.spritesheet("tryAgianSign" , "assets/gameover/try agian.png" , {frameWidth: 200 , frameHeight: 70 });

            this.load.audioSprite('gameoverSFX','audio/used-audio/gameover-sounds/gameover-sounds.json',[
                "audio/used-audio/gameover-sounds/ponycillo-defeat.mp3"
              ]);

            this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
                "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
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

            this.setUpPlayerControls();

            console.log("this.playersex: "+ this.playerSex);
            console.log("now in gameover scene");

            //creates map of function for preloads of different scenes
            this.preloadMapOfLocationPreloads();

            //small function to set up the tilemap level using the data provided.
            let myMap = this.make.tilemap({ key:this.gameoverLocation});

            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap); 

            //activates preload of correct type based on gameover location
            this.mapOfLocationPreloads[this.gameoverLocation]();

            console.log("loading gameover tileset: ", this.gameoverLocation);
            console.log("this.processMap: ",this.processMap);

            //handles scene transition and fade out for scene transition
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                //launch the gameplay scenes.
                console.log("now stoping this scene",);
                console.log("now loading game ui",);
                this.scene.launch('gameHud');
                
                console.log("now Loading main scene:", this.playerLocation);
                
                this.scene.start(this.playerLocation);

            })

            this.sceneTextBox.activateTitleScreenTextbox(
                this,//scene
                true,// is the text box visible?
                [],// sets profile array
                ""//text sent to the text box.
                );

            //sets up map of enemy preloads
            this.preloadMapOfEnemys();
            this.mapOfEnemyPreloads[this.enemyThatDefeatedPlayer]();
            
            //set up textbox sound type.
            if(this.defeatedTitle === 'eaten'){
                this.sceneTextBox.soundType = "digest";
                this.sceneTextBox.textTint = 0x9d0000;
            }else{
                this.sceneTextBox.soundType = "lightPiano";
                this.sceneTextBox.textTint = 0x9d00e0;
            }
            
            //gets dialogue from 
            console.log(npcDialogue["gameover"][this.defeatedTitle]);
            if(npcDialogue["gameover"][this.defeatedTitle][this.enemyThatDefeatedPlayer] === null || npcDialogue["gameover"][this.defeatedTitle][this.enemyThatDefeatedPlayer] === undefined){
                this.dialogueFlag = "default";
            }else{
                this.dialogueFlag = this.enemyThatDefeatedPlayer;
            }
            
            //actiaves dialogue node with above specifications
            this.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
            
            //adds collider for enemy to the tileset
            this.physics.add.collider(this.processMap.layer1, this.enemy);
            this.physics.add.collider(this.processMap.layer1, this.npcGameover);

            //sets up camera to follow player.
            this.mycamera = this.cameras.main;
            //this.mycamera.startFollow(this.enemy);
            this.mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels);
            this.cameras.main.zoom = 3;
            //this.cameras.main.followOffset.set(-450,-100);
          
            this.mycamera.setScroll(-135, 60);

            //game over sign.
            this.gameOverSign = this.add.sprite(450,410,"gameOverSign");
            this.gameOverSign.setScale(.3);
            this.gameOverSign.setDepth(7);
            
            if(this.defeatedTitle === 'eaten'){
                this.gameOverSign.anims.play("gameoverTitleAnimationEaten");
            }else{
                this.gameOverSign.anims.play("gameoverTitleAnimationCursed");
            }
                
            this.initSoundEffect('gameoverSFX','gameover',0.05);

            console.log("this.enemy: ", this.enemy);

            if(this.enemy !== null && this.enemy !== undefined){
                this.enemy.soundCoolDown = false;
            }
            
            //sets up the update functions each enemy uses.
            this.updateMapOfEnemys();

        }

        update(){

            //input to progress gameover dialogue during scene.
            if(this.dialogueInterupt === false){
                if(Phaser.Input.Keyboard.JustDown(this.keyW)){
                    this.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
                  }else{
              
                    if(this.mobileW.isJustDown === true){
    
                        this.mobileW.isJustDown = false;
                        this.mobileW.IsPressed = false;
    
                        this.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
          
                      }
              
                  } 
            }
            

              this.mapOfEnemyUpdates[this.enemyThatDefeatedPlayer]();
            
            
        }      
}