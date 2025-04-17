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
        
        }

        //loads sprites for game over.
        preload(){
            //call built in function to obtain gameover data. is the earliest location in which the data can be loaded.
            this.loadGameoverFile();

            //function to create a map of functions to preload the correct map needed based in the location string.
            this.preloadMapOfTileMaps();

            //console.log("this.mapOfTileMapsJSON[this.gameoverLocation](): ",this.mapOfTileMapsJSON[this.gameoverLocation]());
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

            //load gameoverFile data to this scene
            //this.loadGameoverFile();

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
            
            this.enemy.soundCoolDown = false;

        }

        update(){

            if(Phaser.Input.Keyboard.JustDown(this.keyW)){
                this.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
              }else{
          
                if(this.mobileW.isJustDown === true){

                    this.mobileW.isJustDown = false;
                    this.mobileW.IsPressed = false;

                    this.npcGameover.nodeHandler("gameover",this.defeatedTitle,this.dialogueFlag);
      
                  }
          
              } 


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
            }
            else if(this.enemyThatDefeatedPlayer === 'maleTiger'){
                if(this.enemy.maleTigerStroking === false){
                    this.enemy.playJumpySound('10',800);
                }else{

                    this.enemy.playPlapSound('plap5',1000);
                }
                
            
            }else if(this.enemyThatDefeatedPlayer === 'femaleTiger' ||
                this.enemyThatDefeatedPlayer === 'femaleTigerBooba' ||
                this.enemyThatDefeatedPlayer === 'maleTigerBenis' ||
                 this.enemyThatDefeatedPlayer === "femaleChestMimic"||
                 this.enemyThatDefeatedPlayer === "femaleChestMimicVore" ||
                 this.enemyThatDefeatedPlayer === "maleChestMimic"||
                 this.enemyThatDefeatedPlayer === "maleChestMimicVore"||
                this.enemyThatDefeatedPlayer === "whiteCatFemaleVore" ||
                this.enemyThatDefeatedPlayer === "whiteCatMaleVore"){
                    
                this.enemy.playJumpySound('10',800);
            }else if(this.enemyThatDefeatedPlayer === "istaraUnbirth"){
                //this.enemy.playJumpySound('10',600);
            }
            
        }      
}