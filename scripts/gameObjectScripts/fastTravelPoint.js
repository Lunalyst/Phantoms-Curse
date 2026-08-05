//savestone that allows players to save there progress.
class fastTravelPoint extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,mode){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos-30, yPos-25, 'fastTravelPoint');
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
        this.anims.create({key: 'unlit',frames: this.anims.generateFrameNames('fastTravelPoint', { start: 0, end: 0}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'lighting',frames: this.anims.generateFrameNames('fastTravelPoint', { start: 0, end: 2}),frameRate: 7,repeat: 0});
        this.anims.create({key: 'lit',frames: this.anims.generateFrameNames('fastTravelPoint', { start: 3, end: 6}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'bell',frames: this.anims.generateFrameNames('fastTravelPoint', { start: 6, end: 14}),frameRate: 7,repeat: 0});
        
        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown= false;

        this.scene = scene;

        this.light;
        this.mode = mode;

        this.pointLit = false;
        this.bellRinging = false;

        this.autumnEncountered = false;
        this.moffEncountered = false;
        
        //sets scale
        this.setScale(1/3);

        this.setDepth(5);

        //if lighting system is on then
        if(this.scene.lightingSystemActive === true){
            this.light = this.scene.lights.addLight(this.x,this.y+4, 65, 0xffffff);
            this.light.visible = false;
        }
        // do a flag check for flag this warp is looking for. 
        //has player encountered autumn or moff yet?
        this.fastTravelFlag = {
            flagToFind: this.scene.playerLocation + "FastTravel",
            foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, this.fastTravelFlag);

        //has player encountered autumn or moff yet?
        let autumnDialogue1 = {
            flagToFind: "autumnIntroToFastTravel",
            foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, autumnDialogue1);

        this.autumnEncountered = autumnDialogue1.foundFlag;

        //has player encountered autumn or moff yet?
        let moffDialogue1 = {
            flagToFind: "moffIntroToFastTravel",
            foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, moffDialogue1);

        this.moffEncountered = moffDialogue1.foundFlag;


        //ok so we need to find the landing x and y from the current location 
        let temp = fastTravelKey[fastTravelLocationFinder[this.scene.playerLocation]]
        temp[this.scene.playerLocation].landingX;

        console.log("landing location x =", temp[this.scene.playerLocation].landingX);

        //have to make a case where the player is landing from a fast travel. so check if the player x is equal to this fast travel points landing x.
        if(this.scene.player1.x ===  temp[this.scene.playerLocation].landingX){

            console.log("player now landing! ")
            this.scene.player1.visible = false;

            this.scene.mycamera.startFollow(this,true);
            this.scene.cameras.main.zoom = 2;
            this.scene.cameras.main.followOffset.set(-30,30);

            this.scene.grabbed = true;


            //here is where we change autumns landing sequence based on if the player payed.
            this.autumn = this.scene.initAutumn(this.x+28, this.y-11,"landingSequence");
            this.autumn.y = this.autumn.y - 300;
            this.autumn.fastTravelLandingY = this.y-14;
            this.autumn.moveFunctionActive = true;
            this.autumn.fastTravelPlatformRef = this;



        }else if(this.mode === "lockwood"){

            this.anims.play("lit");
            //if we are in lockwood then always spawn autumn/ moff
            this.promptCooldown = true;

            this.fastTravelNPCPresent = true;

            //if not spawn intro version of autumn.
            if(autumnDialogue1.foundFlag === false){
                console.log("setting intreo to fastravel?")
                this.autumn = this.scene.initAutumn(this.x+28, this.y-11,"introToFastTravel");
            }else{
                this.autumn = this.scene.initAutumn(this.x+28, this.y-11,"fastTravel");
            }

            this.autumn.isInPosition = true;
            this.autumn.fastTravelPlatformRef = this;

        }else{

            //make autumn npc and hide her above save warp point
            this.autumn = this.scene.initAutumn(this.x+28, this.y-11,"fastTravel");
            this.autumn.y = this.autumn.y- 700;
            this.autumn.visible = false;
            this.autumn.fastTravelPlatformRef = this;

            this.fastTravelNPCPresent = false;
            if(this.fastTravelFlag.foundFlag === true){
                this.anims.play("lit");    
            }else{
                this.anims.play("unlit");
            }
        } 
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){

        if(this.fastTravelNPCPresent === false){

            //if the player is withing the correct range, and the press w and the cooldown is false then save the game
            if( this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false){
                console.log("activating fast travel?")
                //if we dont find the flag, that means fast travel point is unlit
                if(this.fastTravelFlag.foundFlag === false && this.pointLit === false){

                    this.pointLit = true;
                    //so add flag
                    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,this.fastTravelFlag.flagToFind);

                    //play animation 
                    this.anims.play('lighting').once('animationcomplete', () => {
                        this.anims.play('lit');
                       
                    });
                    
                 }else if(this.bellRinging === false && (this.autumnEncountered === true ||this.moffEncountered === true)){
                    console.log("ringing bell")
                    this.bellRinging = true;
                    this.fastTravelNPCPresent = true;
                    //play bell animation 

                    this.scene.initSoundEffect('fastTravelSFX','bellJingle',0.05);

                    this.anims.play('bell').once('animationcomplete', () => {
                        this.anims.play('lit');

                        let travelNpcCheckAutumn = {
                            flagToFind: "autumnIntroToFastTravel",
                            foundFlag: false,
                        };

                        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, travelNpcCheckAutumn);

                        let travelNpcCheckMoff = {
                            flagToFind: "moffIntroToFastTravel",
                            foundFlag: false,
                        };

                        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, travelNpcCheckMoff);

                        if(travelNpcCheckAutumn.foundFlag === true || travelNpcCheckMoff.foundFlag === true){
                            
                            this.saveStoneKeyPrompts.visible = false;
                            this.promptCooldown = false;
                            //need move function npc call here.
                            //set move to be active
                            this.autumn.moveFunctionActive = true;
                            this.autumn.fastTravelLandingY = this.y-14;
                            this.autumn.visible = true;

                            
                        }
                        
                       
                    });
                 }
               

            //this code plays the animation for the w key under the save stone
            }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false && (this.autumnEncountered === true ||this.moffEncountered === true)){
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

  
}