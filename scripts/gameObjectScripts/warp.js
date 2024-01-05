
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/
class warp extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'warpSprites');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        //this.body.setGravityY(600); // sets gravity 
        this.setPushable(false);
        this.setScale(1/3,1/3);
        this.setSize(40,50,true);
        this.nextSceneX;
        this.nextSceneY;
        this.warpPortalId;
        this.portalKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.portalKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.playerOverlapingPortal = false;
        this.anims.create({key: 'warpCaveOutside',frames: this.anims.generateFrameNames('warpSprites', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveInside',frames: this.anims.generateFrameNames('warpSprites', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door',frames: this.anims.generateFrameNames('warpSprites', { start: 2, end: 2}),frameRate: 3.5,repeat: -1});
        this.safeToLoad = false;
        this.destination;
        //defines player animations. 
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
    warpTo(scene1,keyW,activeId){
      //console.log("this.safeToLoad: "+this.safeToLoad+" activeId: "+activeId+" this.warpPortalId: "+this.warpPortalId+" this.promptCooldown: "+this.promptCooldown+" keyW.isDown: "+keyW.isDown);
        if(this.safeToLoad === true && keyW.isDown && activeId === this.warpPortalId){
          console.log("warping scenes");
            //console.log("this.nextSceneX "+ this.nextSceneX +" this.nextSceneY: "+this.nextSceneY );
            //saveGame(nextSceneX,nextSceneY,playerHp,playerSex,playerInventoryData,playerInventoryAmountData,playerBestiaryData,playerSkillsData,playerSaveSlotData,gameFlags)

            let playerDataObject = {
              currentHp: null,
              playerMaxHp: null,
              inventoryArray: null,
              playerInventoryAmountData: null,
              playerBestiaryData: null,
              playerSkillsData: null,
              playerSaveSlotData: null,
              flagValues: null,
            };
          
            //calls the emitter sending it the object so it can give us the save data we need.
            inventoryKeyEmitter.emit(inventoryKey.getSaveData,playerDataObject);

            scene1.saveGame(
              this.nextSceneX,
              this.nextSceneY,
              playerDataObject.currentHp,
              scene1.playerSex,
              playerDataObject.inventoryArray,
              playerDataObject.playerInventoryAmountData,
              playerDataObject.playerBestiaryData,
              playerDataObject.playerSkillsData,
              playerDataObject.playerSaveSlotData,
              playerDataObject.flagValues
              );

            scene1.portalId = 0;
            
            //this.scene.launch('gameHud'); 
            scene1.scene.start(this.destination); 

          }else if(this.safeToLoad === true && activeId === this.warpPortalId && this.promptCooldown === false ){
            console.log("safe to press w to warp scenes");
              this.portalKeyPrompts.visible = true;
              this.portalKeyPrompts.playWKey();
              this.promptCooldown = true;
              
          }

          if(this.safeToLoad === false){
            this.portalKeyPrompts.visible = false;
            this.promptCooldown = false;
          }
    }


    setLocationToSendPlayer(x,y,animation,destination){
      this.destination = destination;
      this.nextSceneX = x;
      this.nextSceneY = y;
    
      this.anims.play(animation);
       
      
    }
}