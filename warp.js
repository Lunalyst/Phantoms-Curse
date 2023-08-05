
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
       
        //defines player animations. 
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
    warpTo(scene1,keyW,location,activeId,hpBar){
        //console.log("is it safe to warp player:" + scene1.safeToLoad);
        //console.log("scene1.safeToLoad "+ scene1.safeToLoad +" warpPortalId "+this.warpPortalId+" activeId "+activeId);
        console.log("HP in WarpTo: "+hpBar.playerHealth)
        if(scene1.safeToLoad === true && keyW.isDown && activeId === this.warpPortalId){
            //console.log("this.nextSceneX "+ this.nextSceneX +" this.nextSceneY: "+this.nextSceneY );
            scene1.activateFunctions.saveGame(this.nextSceneX,this.nextSceneY,hpBar.playerHealth);
            scene1.portalId = 0;
            scene1.scene.start(location); 
          }else if(scene1.safeToLoad === true && activeId === this.warpPortalId){

              scene1.safeToLoad = false;
          } 
    }

    setLocationToSendPlayer(x,y){
      this.nextSceneX = x;
      this.nextSceneY = y;
    }
}