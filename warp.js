
/*

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
        //this.overlapTrigger = false;
        //this.safeToLoad = false;
       
        //defines player animations. 
    }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
    warpTo(scene1,keyW,location){
        console.log("is it safe to warp player:" + scene1.safeToLoad);
        if(scene1.safeToLoad === true && keyW.isDown){
            scene1.scene.start(location);
            console.log("player sent to: "+location);
          }else if(scene1.safeToLoad === true){
            scene1.safeToLoad = false;
          }else{
            //this.safeToLoad = false;
            scene1.physics.add.overlap(scene1.player1,this,function(){
                scene1.safeToLoad = true;
                //console.log("is it safe to warp player:" + scene.safeToLoad);
                //console.log("overlaping with warp zone");
            });
          }  
    }
}