
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
        
        this.anims.create({key: 'saveStone',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'saveStoneAnimation',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 15}),frameRate: 7,repeat: -1});
        //defines player animations. 
        
        this.safeToSave = false;
        this.saveCoolDown= false;
        
        
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.

    savePointSaveGame(scene1,keyW,location,activeId,hpBar,keyDisplay,player1,saveX,saveY,flagValues){
        //console.log("this.safeToSave: "+this.safeToSave+" keyW.isDown: "+keyW.isDown+" activeId: "+activeId+" this.saveStoneId: "+this.saveStoneId+" this.promptCooldown: "+this.promptCooldown);
        if( this.safeToSave === true && keyW.isDown && this.saveCoolDown === false){
            //console.log("this.nextSceneX "+ this.nextSceneX +" this.nextSceneY: "+this.nextSceneY );
            //saveGameFile(savePointX,savePointY,playerHp,playerSex,location,playerInventoryData,playerInventoryAmountData,playerBestiaryData,playerSkillsData,playerSaveSlotData,gameFlags)
            let playerDataObject = {
                playerMaxHp: null,
                inventoryArray: null,
                playerInventoryAmountData: null,
                playerBestiaryData: null,
                playerSkillsData: null,
                playerSaveSlotData: null,
                flagValues: null,
            };
            
            inventoryKeyEmitter.emit(inventoryKey.getSaveData,playerDataObject)
            console.log('inventory date now in savepointssavegame =============');
            console.log('playerDataObject.flagValues: ', playerDataObject.flagValues);

            scene1.activateFunctions.saveGameFile(saveX,saveY,scene1.playerSex,scene1.playerLocation,playerDataObject);
            this.anims.play('saveStoneAnimation',true);
            healthEmitter.emit(healthEvent.maxHealth);
            let currentSaveStone = this;
            setTimeout(function(){
             currentSaveStone.anims.play('saveStone',true);
              },2700);

             // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                    //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            this.saveCoolDown = true;     // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentSaveStone.saveCoolDown = false;    
            }, 1000);
          }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false){
              console.log("prompts active");
              this.saveStoneKeyPrompts.visible = true;
              this.saveStoneKeyPrompts.playWKey();
              this.promptCooldown = true;
             
              
          }
           if(this.safeToSave === false){
            this.saveStoneKeyPrompts.visible = false;
            this.promptCooldown = false;
          }
          
    }

  
}