
let currentSign;
class sign extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,text,profileArray){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'sign');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setPushable(false);
      this.signKeyPrompts = new keyPrompts(scene, xPos, yPos + 40,'keyPrompts');
      this.signKeyPrompts.visible = false;
      this.promptCooldown = false;
      this.playerOverlapingSign = false;
      this.safeToSign = false;
      this.textToDisplay = text;
      this.signId = 0;
      this.activationDelay = false;
      this.setScale(.34);
      this.profileArray = profileArray;
      currentSign = this;

  }

//function which allows the player to use w to display textbox
  activateSign(scene1,keyW,activeId){

    //console.log("this.safeToSign: "+this.safeToSign+" activeId: "+activeId+" this.signId: "+this.signId+" this.promptCooldown: "+this.promptCooldown);

    //if the player meets activation requiements for the sign display the text box
      if(this.safeToSign === true && keyW.isDown && activeId === this.signId && scene1.sceneTextBox.textBoxActivationCoolDown === false){
          console.log("activating sign");
          
          //activates textbox apart of the main scene
          scene1.pausedInTextBox = true;
          scene1.sceneTextBox.setText(this.textToDisplay);
          scene1.sceneTextBox.formatText();
          scene1.sceneTextBox.setProfileArray(this.profileArray);
          scene1.sceneTextBox.activateTextBox(scene1,scene1.keyW,);
          this.activationDelay = true;
          
         //otherwise we want to display the key prompts 
        }else if(this.safeToSign === true && activeId === this.signId && this.promptCooldown === false ){
          console.log("safe to press w to warp scenes");
            this.signKeyPrompts.visible = true;
            this.signKeyPrompts.playWKey();
            this.promptCooldown = true;
            
        }
        
        // resets variables.
        if(this.safeToSign === false){
          this.signKeyPrompts.visible = false;
          this.promptCooldown = false;
        }
  }


}