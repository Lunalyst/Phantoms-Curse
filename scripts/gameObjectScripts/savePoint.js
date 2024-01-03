
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/

class savePoint extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'savePoint');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
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
        this.anims.create({key: 'saveStone',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'saveStoneAnimation',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 15}),frameRate: 7,repeat: 0});

        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown= false;
        
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,location,activeId,hpBar,keyDisplay,player1,saveX,saveY,flagValues){
        
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToSave === true && keyW.isDown && this.saveCoolDown === false){
            
            //makes a boject which can be accessed by our inventory emitter
            let playerDataObject = {
                playerMaxHp: null,
                inventoryArray: null,
                playerInventoryAmountData: null,
                playerBestiaryData: null,
                playerSkillsData: null,
                playerSaveSlotData: null,
                flagValues: null,
            };
            
            //calls the emitter sending it the object so it can give us the save data we need.
            inventoryKeyEmitter.emit(inventoryKey.getSaveData,playerDataObject)
            
            //saves the game by calling the all activatefunctions 
            scene1.saveGameFile(saveX,saveY,scene1.playerSex,scene1.playerLocation,playerDataObject);

            //once we play the save animation once, then we set the animation back to nothing.
            this.anims.play('saveStoneAnimation').once('animationcomplete', () => {
                this.anims.play('saveStone',true);
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
            }, 1000);

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false){
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