class lunalyst extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,text,profileArray){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'lunalyst');

      this.anims.create({key: 'lunalystIdle',frames: this.anims.generateFrameNames('lunalyst', { start: 1, end: 8 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'lunalystSkirtPull',frames: this.anims.generateFrameNames('lunalyst', { start: 9, end: 14 }),frameRate: 5,repeat: 0});

      this.anims.play('lunalystIdle',true);

       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
       this.npcKeyPrompts.visible = false;
       this.promptCooldown = false;
 
       //more variables which help the sign object tell when to display prompts and textbox
       this.playerOverlapingNpc = false;
       this.safeToSpeak = false;
       this.textToDisplay = text;
       this.npcId = 0;
       this.activationDelay = false;
       this.activated = false;
 
       //createdfor use in textbox
       this.profileArray = profileArray;

  }

//function which allows the player to use w to display textbox
  activateNpc(scene1,keyW,activeId){

    //console.log("activating lunas function");
    //console.log("this.safeToSpeak: ",this.safeToSpeak," this.profileArray: ",this.profileArray);

    //if the player meets activation requiements for the sign display the text box
      if(this.safeToSpeak === true && keyW.isDown && activeId === this.npcId && scene1.sceneTextBox.textBoxActivationCoolDown === false && this.activated === false){
          console.log("activating npc");
          // sets the activated to true so it isnt called multiple times.
          this.activated = true;

          //sets activated to false after half a second.
          let sign = this;
          setTimeout(function(){
            sign.activated = false;
          },1000);
            
          scene1.pausedInTextBox = true;
          scene1.sceneTextBox.setText(this.textToDisplay);
          scene1.sceneTextBox.formatText();
          scene1.sceneTextBox.setProfileArray(this.profileArray);
          scene1.sceneTextBox.activateTextBox(scene1,scene1.keyW,);
          this.activationDelay = true;

          this.anims.play('lunalystSkirtPull').once('animationcomplete', () => {
            //activates textbox apart of the main scene

          this.anims.play('lunalystIdle',true);
        });
          
          
        //otherwise we want to display the key prompts 
        }else if(this.safeToSpeak === true && activeId === this.npcId && this.promptCooldown === false ){
            this.npcKeyPrompts.visible = true;
            this.npcKeyPrompts.playWKey();
            this.promptCooldown = true;
            //this.activated = false;
            
        }
        
        // resets variables.
        if(this.safeToSpeak === false){
          this.npcKeyPrompts.visible = false;
          this.promptCooldown = false;
          //this.activated = false;
        }
  }


}