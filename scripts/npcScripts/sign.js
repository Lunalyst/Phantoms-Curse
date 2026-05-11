// sign entity that allows text to be displayed.
class sign extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos, npcType, textKey){
     
      super(scene, xPos, yPos, 'sign');

      //then we add new instance into the scene.
      scene.add.existing(this);
      //give this object a physics box.
      scene.physics.add.existing(this);
      //make it unpussable in any way. potentially unnessary.
      this.setPushable(false);
      
      //makes a key promptsa object to be displayed to the user
      this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 35,'keyPrompts');
      this.npcKeyPrompts.visible = false;
      this.promptCooldown = false;

      //more variables which help the sign object tell when to display prompts and textbox
      this.playerOverlapingNpc = false;
      this.safeToSpeak = false;
      this.npcId = 0;
      this.activated = false;
      this.npcType = npcType;

      //signs dont have branching paths, so we just need a key to know what is the correct dialogue to play. 
      this.textKey = textKey;
      
      //sets scale of object
      this.setScale(1/3);
      this.setDepth(2);

  }

  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'generic'){
      this.generic();
    }else if(this.npcType === 'question'){
      this.question();
    }else{
      this.default();
    }
  }

  generic(){

    this.nodeHandler("sign",this.npcType,this.textKey);

  }

  question(){

    this.nodeHandler("sign",this.npcType,this.textKey);

    if(this.currentDictNode !== null){

      if(this.currentDictNode.nodeName === "nodeQuestion" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"Yes",true);
            this.scene.npcChoice1.textWob();
            this.scene.npcChoice1.setScrollFactor(0);
            this.scene.npcChoice1.addHitbox();
            this.scene.npcChoice1.setScale(.8);

            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice1.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice1.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice1.on('pointerout',function(pointer){
                this.scene.npcChoice1.clearTextTint();
            },this);

            this.scene.npcChoice1.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              this.progressNode("nodeYes",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"No",true);
            this.scene.npcChoice2.textWob();
            this.scene.npcChoice2.setScrollFactor(0);
            this.scene.npcChoice2.addHitbox();
            this.scene.npcChoice2.setScale(.8);


            //set up dialogue option functionality so they work like buttons
            this.scene.npcChoice2.on('pointerover',function(pointer){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
              this.scene.npcChoice2.setTextTint(0xff7a7a);
            },this);

            this.scene.npcChoice2.on('pointerout',function(pointer){
                this.scene.npcChoice2.clearTextTint();
            },this);

            this.scene.npcChoice2.on('pointerdown', function (pointer) {
            
              this.scene.initSoundEffect('buttonSFX','2',0.05);

              //set variable approperiately
              this.scene.sceneTextBox.textInterupt = false;

              //progress to node branch with state name node10
              this.progressNode("nodeNo");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
        }
    }
  }

}