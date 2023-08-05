class sign extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'sign');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      scene.physics.add.existing(this);
      //this.visible = false;
      this.setPushable(false);
      //this.setScale(1.5,1.5);
      //this.setSize(40,50,true);
      this.signKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
      this.signKeyPrompts.visible = false;
      this.promptCooldown = false;
      this.playerOverlapingSign = false;
      this.safeToSign = false;
      this.signId;
      //defines player animations. 
  }
// bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.
// lesson learned dont but scene triggers in a overlap function.
  activateSign(scene1,keyW,location,activeId,hpBar,keyDisplay,player1){
     //console.log("this.safeToLoad: "+this.safeToLoad+" activeId: "+activeId+" this.warpPortalId: "+this.warpPortalId+" this.promptCooldown: "+this.promptCooldown);
      if(this.safeToSign === true && keyW.isDown && activeId === this.signId){
        console.log("warping scenes");
          //here is where we display sign when w is pressed.
         
        }else if(this.safeToSign === true && activeId === this.signId && this.promptCooldown === false ){
          console.log("safe to press w to warp scenes");
            this.signKeyPrompts.visible = true;
            this.signKeyPrompts.playWKey();
            this.promptCooldown = true;
            
        }

        if(this.safeToSign === false){
          this.signKeyPrompts.visible = false;
          this.promptCooldown = false;
        }
  }


}