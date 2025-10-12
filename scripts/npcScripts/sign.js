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
      this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 50,'keyPrompts');
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




  }

  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'generic'){
      this.generic();
    }else{
      this.default();
    }
  }

  generic(){

    this.nodeHandler("sign",this.npcType,this.textKey);

  }



}