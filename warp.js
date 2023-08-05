
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/
class warp extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'forestWarp');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        //this.body.setGravityY(600); // sets gravity 
        this.setPushable(false);
        this.setScale(1.5,1.5);
        this.setSize(40,50,true);
        this.nextSceneX;
        this.nextSceneY;
        this.warpPortalId;
        //this.portalKeyPrompts = new keyPrompts(scene, xPos, yPos - 50,'keyPrompts');
        //this.portalKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.playerOverlapingPortal = false;
        this.anims.create({key: 'warpCave',frames: this.anims.generateFrameNames('forestWarp', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door',frames: this.anims.generateFrameNames('forestWarp', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        //defines player animations. 
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
    warpTo(scene1,keyW,location,activeId,hpBar,keyDisplay,player1){
        //console.log("is it safe to warp player:" + scene1.safeToLoad);
        //console.log("scene1.safeToLoad "+ scene1.safeToLoad +" warpPortalId "+this.warpPortalId+" activeId "+activeId);
        //console.log("HP in WarpTo: "+hpBar.playerHealth)
        if(scene1.safeToLoad === true && keyW.isDown && activeId === this.warpPortalId){
            //console.log("this.nextSceneX "+ this.nextSceneX +" this.nextSceneY: "+this.nextSceneY );
            scene1.activateFunctions.saveGame(this.nextSceneX,this.nextSceneY,hpBar.playerHealth,scene1.inventoryDataArray);
            scene1.portalId = 0;
            scene1.scene.start(location); 
          }else if(scene1.safeToLoad === true && activeId === this.warpPortalId && this.promptCooldown === false ){

              scene1.safeToLoad = false;
              console.log("prompts active");
              keyDisplay.visible = true;
              keyDisplay.playWKey();
              keyDisplay.x = this.x;
              keyDisplay.y = this.y+70;
              this.promptCooldown = true;
              
          }
    }

    hidePromptForPortals(scene1,keyDisplay){
      if(this.promptCooldown === true && keyDisplay.visible === true){
        keyDisplay.visible = false;
        this.promptCooldown = false;
      }
    }

    setLocationToSendPlayer(x,y,animation){
      this.nextSceneX = x;
      this.nextSceneY = y;
      switch(animation) { // the index, you can see in tiled: it's the ID+1
        case 0: // <- this tile only colides top
        this.anims.play("warpCave");
        break;
        case 1: // <- this tile only colides top
        this.anims.play("door");
        break;
      }
      
    }
}