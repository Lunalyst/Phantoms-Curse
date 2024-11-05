
class transitionLoad extends allSceneFunctions {

    constructor(){
        // scene settings
        super({key: 'transitionLoad',active: false,physics:{default:'arcade'}});
        
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

            

        }

        create(){

            //handles scene transition and fade out for scene transition
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                //launch the gameplay scenes.
                console.log("now stoping this scene",);
                console.log("now loading game ui",);
                this.scene.start('gameHud');
                
                console.log("now Loading main scene:", this.playerLocation);
                
                this.scene.start(this.playerLocation);

            })
            
            //sets up camera to follow player.
            this.mycamera = this.cameras.main;

            //logic for try agian button
            //allow acess to scene in settimeout functions.

            //code to trigger the scene transition to the next area.
            {   
                this.loadGameoverFile();

                //sets a few variables
                let tempPlayerSaveSlotData = this.playerSaveSlotData;
                let tempPlayerSex = this.playerSex;


                this.loadGameFile(this.playerSaveSlotData.saveSlot)

                this.loadGamePlayData();

                // attempts to parse savedata from one of the three save slots based on the slot passed in by function call.

                console.log("this.playerLocation: ",this.playerLocation, " ")
                //if the player has data in thee save file then load them back to there last save
                if(this.playerLocation !== null && this.playerLocation !== undefined ){

                    console.log("save file detected, now setting player back to correct scene.");
                    console.log("gameoverThat.playerLocation",this.playerLocation);

                      //creates a object to hold data for scene transition
                        let playerDataObject = {
                            saveX: this.warpToX,
                            saveY: this.warpToY,
                            playerHpValue: this.playerHealth,
                            playerSex:this.playerSex,
                            playerLocation: this.playerLocation,
                            inventoryArray: this.inventoryDataArray,
                            playerBestiaryData: this.playerBestiaryData,
                            playerSkillsData: this.playerSkillsData,
                            playerSaveSlotData: this.playerSaveSlotData,
                            flagValues: this.flagValues,
                            settings:this.settings,
                            dreamReturnLocation:this.dreamReturnLocation
                        };

                    console.log("playerDataObject: ",playerDataObject);
                    //call save function for temp save so when we start the scene agian, it has the correct data.
                    this.saveGame(playerDataObject);
                    
                    // calls the fadout function which loads back to the last save on fadeout complete
                    this.cameras.main.fadeOut(500, 0, 0, 0);

                //if the player has not saved, send them back to the beginning of the game
                }
        
            }

        }

        update(){
  
        }

        
}