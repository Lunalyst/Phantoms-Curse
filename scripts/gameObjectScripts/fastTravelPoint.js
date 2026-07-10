//savestone that allows players to save there progress.
class fastTravelPoint extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,locationFlag,mode){
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
        
        //sets scale
        this.setScale(1/3);

        //if lighting system is on then
        if(this.scene.lightingSystemActive === true){
            this.light = this.scene.lights.addLight(this.x,this.y+4, 65, 0xffffff);
            this.light.visible = false;
        }

        if(this.mode === "lockwood"){
            this.anims.play("lit");
            //if we are in lockwood then always spawn autumn/ moff
            this.promptCooldown = true;

            this.fastTravelNPCPresent = true;

            //has player encountered autumn or moff yet?
            let autumnDialogue1 = {
            flagToFind: "autumnIntroToFastTravel",
            foundFlag: false,
            };

            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, autumnDialogue1);

            //if not spawn intro version of autumn.
            if(autumnDialogue1.foundFlag === false){
                this.autumn = this.scene.initAutumn(this.x+28, this.y-11,"introToFastTravel");
            }else{

            }

        }else if(this.mode === "activated"){
            this.anims.play("lit");
        }else{
            this.anims.play("unlit");
            this.fastTravelNPCPresent = false;
        }
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        if(this.fastTravelNPCPresent === false){
            //if the player is withing the correct range, and the press w and the cooldown is false then save the game
            if( this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false){
                

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

  
}