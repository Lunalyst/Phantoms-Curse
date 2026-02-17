//basic npc class of milo.
class milo extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      
      super(scene, xPos, yPos, 'milo');

      //then we add new instance into the scene. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

      this.anims.create({key: 'idle',frames: this.anims.generateFrameNames('milo', { start: 1, end: 4 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'angleIdle',frames: this.anims.generateFrameNames('milo', { start: 6, end: 9 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'angleIdleLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 1, end: 4 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'angleIdleRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 5, end: 8 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'walkLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 9, end: 18 }),frameRate: 17,repeat: -1});
      this.anims.create({key: 'stillIdleLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 9, end: 9 }),frameRate: 17,repeat: -1});
      this.anims.create({key: 'walkRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 19, end: 28 }),frameRate: 17,repeat: -1});
      this.anims.create({key: 'jumpUpLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 29, end: 30 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'jumpDownLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 31, end: 32 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'jumpUpRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 33, end: 34 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'jumpDownRight',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 35, end: 36 }),frameRate: 10,repeat: 0});
      
      this.anims.create({key: 'flipLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 63, end: 71 }),frameRate: 10,repeat: 0});
      this.anims.create({key: 'multiFlipLeft',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 63, end: 71 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'multiFlipLeftEnd',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 66, end: 71 }),frameRate: 10,repeat: 0});
      
      this.anims.create({key: 'flipLanding',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 81, end: 83 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'standingThere',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 84, end: 87 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'MenacingSpearRaise',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 88, end: 89 }),frameRate: 5,repeat: 0});
      this.anims.create({key: 'MenacingSpearHold',frames: this.anims.generateFrameNames('miloMaskedAndArmed', { start: 90, end: 93 }),frameRate: 7,repeat: -1});
      
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

       this.jumpDelay = false;

       this.body.setGravityY(600); 

        this.setSize(60,200,true);
        this.setOffset(185, 91);
 
       if(this.npcType === 'test'){
          this.anims.play('angleIdleLeft');
       }

  }

  //overwrites base npc classes function with flagging logic specific to milo.
  flagLogic(){
    
    //logic to decide what the npcs activated function is.
    if(this.npcType === 'test'){
      this.test();
    }if(this.npcType === 'inYourTimeOfNeed'){
      this.inYourTimeOfNeed();
    }else{
      this.default();
    }
  }

  MoveNPC(){
  
  }

  test(){
    if(this.isPlayerControlled === false){
      this.nodeHandler("milo","Behavior1","test");
      this.scene.player1.mainHitbox.x = this.x;
    }else{
      this.nodeHandler("milo","Behavior1","testRelease");
    }

    

    if(this.currentDictNode !== null){

      if(this.isPlayerControlled === false){
          if(this.currentDictNode.nodeName === "node3" && this.inDialogue === false){
            this.inDialogue = true;
            //set variable approperiately
            this.scene.sceneTextBox.textInterupt = true;

            //create dialogue buttons for player choice
            this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"its Your Turn Milo",true);
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

              this.progressNode("node5",true);
          
              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

              

            },this);

            //dialogue option for no.
            this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"maybe later",true);
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
              this.progressNode("node4");

              //destroy itself and other deciosions
              this.scene.npcChoice1.destroy();
              this.scene.npcChoice2.destroy();

              this.inDialogue = false;

            },this);
            
            //call scene variable to create interupt.
            this.scene.sceneTextBox.textInterupt = true;

            //let the npc know they are in dialogue
            this.inDialogue = true;
            
        }else if(this.currentDictNode.nodeName === "node6"){
          this.scene.player2Active = true;
          this.visible = false;
          this.scene.player2.visible = true;
          this.isPlayerControlled = true;
          this.scene.player1.mainHitbox.x = this.x;
          this.scene.player1.mainHitbox.setVelocity(0,0);
          this.scene.player1.x = this.x;
          this.scene.player1.setDepth(5);
          this.scene.player2.setDepth(6);
        }
      }else{
        if(this.currentDictNode.nodeName === "node2"){
          this.scene.player2Active = false;
          this.visible = true;
          this.scene.player2.visible = false;
          this.scene.player2.x = this.x;
          this.isPlayerControlled = false;
          this.scene.player1.mainHitbox.x = this.x;
          this.scene.player1.x = this.x;
          this.scene.player1.setDepth(6);
          this.scene.player2.setDepth(5);
        }
      }
      
    }
  }

  inYourTimeOfNeed(){

  }

}