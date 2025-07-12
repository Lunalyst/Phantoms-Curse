//savestone that allows players to save there progress.
class memoryPoint extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'memoryPoint');
        //then we add new instance into the scene. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);
        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.saveStoneKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;
        
        //defines player animations
        this.anims.create({key: 'memoryStone',frames: this.anims.generateFrameNames('memoryPoint', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'memoryStoneAnimation',frames: this.anims.generateFrameNames('memoryPoint', { start: 0, end: 7}),frameRate: 7,repeat: 0});
        
        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown= false;

        this.scene = scene;

        this.curseLight;
        
        //sets scale
        this.setScale(1/3);

        //if lighting system is on then
        if(this.scene.lightingSystemActive === true){
            this.curseLight = this.scene.lights.addLight(this.x,this.y+4, 65, 0xb317ff);
            this.curseLight.visible = false;
        }
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false){
            
            //play save sound
            scene1.initSoundEffect('curseSFX','curse',0.3);

            //creates a object to hold data for scene transition
            let playerDataObject = {
                saveX: null,
                saveY: null,
                playerHpValue: null,
                playerMaxHP: null,
                playerSex: null,
                playerLocation: null,
                inventoryArray: null,
                playerBestiaryData: null,
                playerSkillsData: null,
                playerSaveSlotData: null,
                flagValues: null,
                settings:null,
                dreamReturnLocation:null,
                playerCurseValue:null
              };
              
            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);

            //modifies the object with the new relivant information.
            playerDataObject.saveX = saveX;
            playerDataObject.saveY = saveY+15;
            playerDataObject.playerSex = scene1.playerSex;
            playerDataObject.playerLocation = scene1.playerLocation;
            
            console.log("adding bestiary flags");

            //get keylist of bestiary flags variable
            let allKeysBest = Object.keys(bestiaryTextList);

            //loop through all bestiary flags and add the ones the player doesnt have.
            allKeysBest.forEach(bestKey => {

                let keyFound = false;
                //check to see if the player object has them.
                for (let [key, value] of Object.entries(playerDataObject.playerBestiaryData)) {

                    if (bestKey === key) {
                        keyFound = true;
                    }
                }

                if(keyFound === true){
                    console.log("found flag so no need to add: ",bestKey);
                }else if(bestKey !== "back"){
                    console.log("could not find flag, so adding it: ",bestKey);
                    playerDataObject.playerBestiaryData[bestKey] = 0;

                }

            });

            console.log("playerDataObject.playerBestiaryData: ",playerDataObject.playerBestiaryData);

            //check save data of player best flags. good to define after bestiaryplayerdata has all the flags in it.
            let allKeysPlayerBest = Object.keys(playerDataObject.playerBestiaryData);

            //for all flags the player has, if they match set them to 1
            allKeysPlayerBest.forEach(playerBestKey => {

                //set flag in the players objecto make everyting 1
                playerDataObject.playerBestiaryData[playerBestKey] = 1;
                console.log("adding value 1 to ",playerBestKey," flag to player bestiary");
                
                

            });

            //maxes out hp.
            playerDataObject.playerHpValue = playerDataObject.playerMaxHP;

            //saves the game by calling the save game file function in the scene
            //scene1.saveGameFile(playerDataObject);
            scene1.saveGame(playerDataObject);

            //makes graphic to show player the game is saved
            inventoryKeyEmitter.emit(inventoryKey.playCustomMessage,"YOUR MIND IS FILLED WITH MEMORIES...");

            //if lighting system is on then
            if(this.scene.lightingSystemActive === true){

                //delay the light being turned on since it needs to line up with animation.
                let thismemoryPoint = this;
                setTimeout(function(){
                    thismemoryPoint.curseLight.visible = true;
                },600);
                
            }

            //once we play the save animation once, then we set the animation back to nothing.
            this.anims.play('memoryStoneAnimation').once('animationcomplete', () => {
                this.anims.play('memoryStone',true);
                if(this.scene.lightingSystemActive === true){
                    this.curseLight.visible = false;
                }
            });

            //heal the player back to full once they save
            healthEmitter.emit(healthEvent.maxHealth);

            //create a refrence to the object so it can be accesed in our time out function
            let currentSaveStone = this;

            // functions been activated so create set save cooldown to true
            this.saveCoolDown = true; 

            //after a second set savecooldown back to false
            setTimeout(function () {
                currentSaveStone.saveCoolDown = false;    
            }, 2000);

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false){
            console.log("prompts active");
            this.saveStoneKeyPrompts.visible = true;
            this.saveStoneKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToSave === false){
            this.saveStoneKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }

  
}