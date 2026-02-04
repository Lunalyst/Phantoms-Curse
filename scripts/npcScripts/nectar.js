//basic npc class of nectar.
class nectar extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'nectar');

      this.anims.create({key: 'JumpDownStart',frames: this.anims.generateFrameNames('nectar', { start: 0, end: 6 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'JumpDownEnd',frames: this.anims.generateFrameNames('nectar', { start: 7, end: 11 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'sideWalk',frames: this.anims.generateFrameNames('nectar', { start: 13, end: 22 }),frameRate: 14,repeat: -1});
      this.anims.create({key: 'sideIdle',frames: this.anims.generateFrameNames('nectar', { start: 23, end: 26 }),frameRate: 7,repeat: -1});
     
       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 60,'keyPrompts');
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
 
       if(this.npcType === 'ambush'){
          this.anims.play('idle'); 

          this.customTrigger = true;
          this.npcTriggerRange = true;
          this.npcTriggerRangeX = 170;
          this.npcTriggerRangeY = 2000;
          this.nectarDropped = false;
          this.choke = false;

          this.setDepth(-1);
          this.setTint(0x505050);

       }

  }
  
  customTriggerFunction(){

    if(this.nectarDropped === false && this.choke === false){

      this.dialogueLogicStart();

      this.scene.player1.x = 2120;
      this.scene.player1.y = 728;
      this.scene.player1.mainHitbox.x = 2120;
      this.scene.player1.mainHitbox.y = 728;
      this.scene.player1.mainHitbox.setVelocityX(0);
      this.scene.player1.mainHitbox.setVelocityY(0);

      this.scene.player1.playerIdleAnimation();

      //pause physics of scene
      this.scene.cutSceneActive = true;

      this.setVelocity(0,-200);
      
      this.body.setGravityY(600); 

      this.scene.physics.add.collider(this, this.scene.processMap.layer1);

      this.setSize(300,196,true);
      this.setOffset(320, 390);

      this.setDepth(6);
      this.clearTint();

      //this.scene.pausedInTextBox = true;

      this.choke = true;
      this.anims.play('JumpDownStart').once('animationcomplete', () => {
            this.nectarDropped = true;
            this.choke = false;  
      });


    }else if(this.nectarDropped === true && this.body.blocked.down && this.choke === false){
      
      this.choke = true;
        this.anims.play('JumpDownEnd').once('animationcomplete', () => {
          this.nectarLanded = true;
           this.anims.play('sideIdle',true);

        });
    }else if (this.nectarLanded === true){
       this.overlapActivateNpc();
    }

    

    
  }

  //overwrites base npc classes function with flagging logic specific to nectar.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'ambush'){
      this.ambush();
    }else{
      this.default();
    }
  }

  ambush(){
  
    this.scene.sceneTextBox.textBoxProfileImage.setScale(.5)
    this.nodeHandler("nectar","Behavior1","ambush");
    
    if(this.currentDictNode !== null){

      if(this.isPlayerControlled === false){
          if(this.currentDictNode.nodeName === "node3" && this.inDialogue === false){
           
            
          }
      }
      
    }
  }
}