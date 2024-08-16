//basic npc class of lunalyst.
class lunalyst extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,text,profileArray,flag){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'lunalyst');

      this.anims.create({key: 'lunalystIdle',frames: this.anims.generateFrameNames('lunalyst', { start: 1, end: 8 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'lunalystSkirtPull',frames: this.anims.generateFrameNames('lunalyst', { start: 9, end: 14 }),frameRate: 5,repeat: 0});

      this.anims.play('lunalystIdle',true);

       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 50,'keyPrompts');
       this.npcKeyPrompts.visible = false;
       this.promptCooldown = false;
 
       //more variables which help the sign object tell when to display prompts and textbox
       this.playerOverlapingNpc = false;
       this.safeToSpeak = false;
       this.textToDisplay = text;
       this.npcId = 0;
       this.activationDelay = false;
       this.activated = false;

       this.flag = flag;
       this.dialogueCompleted = false;
       this.completedText = false;
 
       //createdfor use in textbox
       this.profileArray = profileArray;

  }

//function which allows the player to use w to display textbox
  activateNpc(scene1,keyW,activeId){

    //console.log("activating lunas function");
    //console.log("this.safeToSpeak: ",this.safeToSpeak," this.profileArray: ",this.profileArray);

    //if the player meets activation requiements for the sign display the text box
    //console.log('this.safeToSpeak: ', this.safeToSpeak , "keyW.isDown: ",keyW.isDown, "scene1.sceneTextBox.textBoxActivationCoolDown:",scene1.sceneTextBox.textBoxActivationCoolDown);
      if(this.safeToSpeak === true && keyW.isDown && activeId === this.npcId && scene1.sceneTextBox.textBoxActivationCoolDown === false && this.activated === false){
          console.log("activating npc");
          // sets the activated to true so it isnt called multiple times.
          this.activated = true;

          //sets activated to false after half a second.
          let sign = this;
          setTimeout(function(){
            sign.activated = false;
          },200);

          scene1.pausedInTextBox = true;
          scene1.sceneTextBox.setText(this.textToDisplay);
          scene1.sceneTextBox.formatText();
          scene1.sceneTextBox.setProfileArray(this.profileArray);
          scene1.sceneTextBox.activateTextBox(scene1,scene1.keyW,);
          this.activationDelay = true;
          // updates the npc so that it knows when the dialogue is completed.
          this.completedText = scene1.sceneTextBox.completedText;

          console.log("this.completedText: ",this.completedText," this.flag: ", this.flag);
          //once the player has talked to luna once progress dialogue in scene4 and update value
          if(this.completedText === true && this.flag === 'lunaProtoDialogue'){
            //change dialogue flag
            console.log("progressing dialogue once");
            //now to add the flag to the player data so the gmae know player has talked to luna once.
            
            //check to see if flag already exists
            let object = {
              flagToFind: "lunaProtoDialogue1",
              foundFlag: false,
            };
            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

            this.flag = 'lunaProtoDialogue1';
            
            //if flag is not present then add it.
            if(object.foundFlag === false){
              inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,this.flag);
            }
            this.textToDisplay = 'OH, HELLO AGIAN HUMAN. IM STILL BUSY CLEARING THIS RUBBLE. JUST GIVE ME A LITTLE BIT OK? ';
            this.profileArray =  ['lunaNeutral','lunaHappy'];

            //once the player has talked to luna twice progress dialogue in scene and update value
          }else if( this.completedText === true && this.flag === 'lunaProtoDialogue1'){
            console.log("progressing dialogue twice");
            
            //check to see if flag already exists
            let object = {
              flagToFind: "lunaProtoDialogue2",
              foundFlag: false,
            };
            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

            this.flag = 'lunaProtoDialogue2';

            //if flag is not present then add it.
            if(object.foundFlag === false){
              inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,this.flag);
            }
            let line1 = 'QUITE PERSISTANT ARNT YOU?                                             ';
            let line2 = 'THATS KINDA CUTE ^_^ JUST GIVE ME A LITTLE BIT OK?'; 
            this.textToDisplay = line1 + line2;
            this.profileArray = ['lunaFingerTouch','lunaHappy'];

          }

          

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