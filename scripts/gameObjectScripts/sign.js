
let currentSign;
class sign extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,text,profileArray){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'sign');

      //then we add new instance into the scene.
      scene.add.existing(this);
      //give this object a physics box.
      scene.physics.add.existing(this);
      //make it unpussable in any way. potentially unnessary.
      this.setPushable(false);
      
      //makes a key promptsa object to be displayed to the user
      this.signKeyPrompts = new keyPrompts(scene, xPos, yPos + 40,'keyPrompts');
      this.signKeyPrompts.visible = false;
      this.promptCooldown = false;

      //more variables which help the sign object tell when to display prompts and textbox
      this.playerOverlapingSign = false;
      this.safeToSign = false;
      this.textToDisplay = text;
      this.signId = 0;
      this.activationDelay = false;

      //sets scale of object
      this.setScale(1/3);

      //createdfor use in textbox
      this.profileArray = profileArray;

      //global variable for timeout functions.
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