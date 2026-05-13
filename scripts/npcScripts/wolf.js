//basic npc class of wolf.
class wolf extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'deaugh');

      //then we add new instance into the scene. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

      this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('deaugh', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      
      //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 80,'keyPrompts');
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

       this.inDialogue = false;

       this.formattingText = false;

       this.isPlayerControlled = false;

       //this.body.setGravityY(600); 

        this.setSize(60,200,true);
        this.setOffset(185, 91);
 
       if(this.npcType === 'healingPlayer'){
          this.anims.play('idle');
       }

  }

  //overwrites base npc classes function with flagging logic specific to wolf.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'healingPlayer'){
      this.healingPlayer();
    }else{
      
      this.default();
    }
  }

  MoveNPC(){
  
  }

  healingPlayer(){

    console.log("this.isPlayerControlled: ", this.isPlayerControlled)

    //if(this.isPlayerControlled === false){
      //this.nodeHandler("wolf","Behavior1","test");
      //this.scene.player1.mainHitbox.x = this.x;
    //}

    

    if(this.currentDictNode !== null){
      
    }
  }

}