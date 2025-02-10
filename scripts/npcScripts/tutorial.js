//basic npc class of lunalyst.
class Tutorial extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'hitbox');

     
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

       this.flag = "";
       this.dialogueCompleted = false;
       this.completedText = false;

       this.animationPlayed = false;
       this.scene = scene;

       this.trading = false;
       this.activatedTradeUI = false;

       this.formattingText = false;

       this.sleeping = true;

  }

  //overwrites base npc classes function with flagging logic specific to lunalyst.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'movement'){
      this.movement();
    }else if(this.npcType === 'platforms'){
      this.platforms();
    }else if(this.npcType === 'worldDrops'){
      this.worldDrops();
    }else{
      this.default();
    }
  }


  //tutorial prompt explaining movement.
  movement(){

    this.nodeHandler("tutorial","beach","movement");

  }

  platforms(){

    this.nodeHandler("tutorial","beach","platforms");

  }

  worldDrops(){

    this.nodeHandler("tutorial","beach","worldDrops");
    
  }




  
}