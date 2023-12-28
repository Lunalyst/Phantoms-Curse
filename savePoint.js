
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/
let currentSavePoint;
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
        //this.body.setGravityY(600); // sets gravity 
        this.setPushable(false);
        //this.setScale(1.5,1.5);
        //this.setSize(40,50,true);
        
        this.saveStoneKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;
       
        this.anims.create({key: 'saveStone',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'saveStoneAnimation',frames: this.anims.generateFrameNames('savePoint', { start: 0, end: 15}),frameRate: 7,repeat: -1});
        //defines player animations. 
        currentSavePoint = this;
        this.safeToSave = false;
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
//saveGameFile(savePointX,savePointY,playerHp,playerSex,location,playerInventoryData,playerInventoryAmountData,playerBestiaryData,playerSkillsData,playerSaveSlotData,gameFlags)
    savePointSaveGame(scene1,keyW,location,activeId,hpBar,keyDisplay,player1,saveX,saveY,flagValues){
        //console.log("this.safeToSave: "+this.safeToSave+" keyW.isDown: "+keyW.isDown+" activeId: "+activeId+" this.saveStoneId: "+this.saveStoneId+" this.promptCooldown: "+this.promptCooldown);
        if( this.safeToSave === true && keyW.isDown){
            //console.log("this.nextSceneX "+ this.nextSceneX +" this.nextSceneY: "+this.nextSceneY );
            //saveGameFile(savePointX,savePointY,playerHp,playerSex,location,playerInventoryData,playerInventoryAmountData,playerBestiaryData,playerSkillsData,playerSaveSlotData,gameFlags)
            scene1.activateFunctions.saveGameFile(saveX,saveY,hpBar.playerHealthMax,scene1.playerSex,scene1.playerLocation,scene1.inventoryDataArray,scene1.playerInventoryAmountData,scene1.playerBestiaryData,scene1.playerSkillsData,scene1.playerSaveSlotData,flagValues);
            this.anims.play('saveStoneAnimation',true);
            healthEmitter.emit(healthEvent.maxHealth);
            setTimeout(function(){
              currentSavePoint.anims.play('saveStone',true);
              },2700);
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