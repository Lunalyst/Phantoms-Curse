//basic npc class of istara.
class istara extends npc{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcType){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos-37, 'istara');

      this.anims.create({key: 'istaraUnderWater',frames: this.anims.generateFrameNames('istara', { start: 0, end: 0 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEmerge',frames: this.anims.generateFrameNames('istara', { start: 0, end: 15 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraIdle',frames: this.anims.generateFrameNames('istara', { start: 16, end: 23 }),frameRate: 7,repeat: -1});

      if(scene.playerSex === 1){
        this.anims.create({key: 'istaraStart',frames: this.anims.generateFrameNames('istara-female-tf', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'istaraEntering',frames: this.anims.generateFrameNames('istara-female-tf', { start: 4, end: 22 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'istaraGameover',frames: this.anims.generateFrameNames('istara-female-tf', { start: 23, end: 26 }),frameRate: 7,repeat: -1});
      }else{
        this.anims.create({key: 'istaraStart',frames: this.anims.generateFrameNames('istara-male-tf', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'istaraEntering',frames: this.anims.generateFrameNames('istara-male-tf', { start: 4, end: 22 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'istaraGameover',frames: this.anims.generateFrameNames('istara-male-tf', { start: 23, end: 26 }),frameRate: 7,repeat: -1});
      }
      
      this.anims.create({key: 'istaraBelly1',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 0, end: 3 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraBelly2',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 5, end: 8 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEggTF',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 9, end: 15 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraEggBelly',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 16, end: 19 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'istaraEggLaying',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 20, end: 27 }),frameRate: 7,repeat: 0});
      this.anims.create({key: 'istaraEggCovet',frames: this.anims.generateFrameNames('istara-gestate-tf', { start: 28, end: 31 }),frameRate: 7,repeat: -1});

       //makes a key promptsa object to be displayed to the user
       this.npcKeyPrompts = new keyPrompts(scene, xPos, yPos + 50,'keyPrompts');
       this.npcKeyPrompts.visible = false;
       this.promptCooldown = false;
 
       //more variables which help the sign object tell when to display prompts and textbox
       this.playerOverlapingNpc = false;
       this.safeToSpeak = false;
       this.textToDisplay ="";
       this.npcId = 0;
       this.activationDelay = false;
       this.activated = false;
       this.npcType = npcType;

       this.flag = "";
       this.dialogueCompleted = false;
       this.dialogueAdded = false;
       this.completedText = false;

       this.animationPlayed = false;
       this.soundCoolDown = false;
       this.scene = scene;

       this.yes = false;
       this.inDialogue = false;
       this.jumpySoundCoolDown =false;
       //createdfor use in textbox
       this.profileArray;

       this.underWater = false;
       this.eggLayingFinished = false;

      //if lighting system is on then
      if(this.scene.lightingSystemActive === true){
        this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
        this.curseLight.visible = false;
      }

       if(this.npcType === 'inCave'){
          this.anims.play('istaraUnderWater');
          this.underWater = true;
       }else if(this.npcType === 'dreamView'){
          this.anims.play('istaraIdle');
       }
  }

  
  //overwrites base npc class flag function.
  flagLogic(){

    //logic to decide what the npcs activated function is.
    if(this.npcType === 'inCave'){
      //play animation 
        this.inCave();
    }else if(this.npcType === 'dreamView'){
      this.DreamView();

    }else{
      this.default();
    }
  }

  //for this npc we need to overwrite the activatino function to account for the under water animation.
  activateNpc(){

    //if the player meets activation requiements for the sign display the text box
    if(this.safeToSpeak === true && this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.scene.player1.mainHitbox.body.blocked.down && this.activated === false){

      if(this.underWater === false){
        //logic to start dialogue
        this.dialogueLogicStart();

        //calls function overwritten children class to handle npc logic.
        this.flagLogic();
          
        //ending dialoguce logic.
        this.dialogueLogicEnd();
      }else{
        this.activated = true;
        this.scene.initSoundEffect('splashSFX','istaraGetUp',0.05);
        this.anims.play('istaraEmerge').once('animationcomplete', () => {
          this.anims.play('istaraIdle',true);
          this.underWater = false;
          this.activated = false;
        });
      }
          
      //otherwise we want to display the key prompts 
    }else if(this.safeToSpeak === true && this.scene.activatedNpcId === this.npcId && this.promptCooldown === false ){

      this.npcKeyPrompts.visible = true;
      this.npcKeyPrompts.playWKey();
      this.promptCooldown = true;        
  
    }
        
    // resets variables.
    if(this.safeToSpeak === false){
      this.npcKeyPrompts.visible = false;
      this.promptCooldown = false;

    }
  }


  inCave(){

    //check to see if flag already exists
    let istaraCaveDialogue1 = {
      flagToFind: "istaraCaveDialogue1",
      foundFlag: false,
    };

    let istaraCaveDialogue2 = {
      flagToFind: "istaraCaveDialogue2",
      foundFlag: false,
    };

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, istaraCaveDialogue1);

    inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, istaraCaveDialogue2);

    //if the flag is not found then apply dialoge start
    if(istaraCaveDialogue1.foundFlag === false){

      this.nodeHandler("istara","Behavior1","istaraCaveDialogue1");

      if(this.currentDictNode !== null){
        if(this.currentDictNode.nodeName === "node1"){

          //pass the flag value and search to the textbox. flag is added after the text box is closed.
          this.scene.sceneTextBox.storeFlag(istaraCaveDialogue1);

        }
      }

    }else if(istaraCaveDialogue1.foundFlag === true && istaraCaveDialogue2.foundFlag === false){

      this.nodeHandler("istara","Behavior1","istaraCaveDialogue2");

      if(this.currentDictNode !== null){
        if(this.currentDictNode.nodeName === "node10" && this.inDialogue === false){

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"Yes please! ^_^",true);
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

            //progress to node branch with state name node5
            this.progressNode("node11",true);

            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;
            
            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

          },this);

          //dialogue option for no.
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"I think ill pass. ",true);
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
            this.progressNode("node27",true);

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

          },this);

          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;
          
          // if the dialogue stage is at 14 and the player said yes, then add the unbirthing dialogue.
          
        }else if(this.currentDictNode.nodeName === "node16" ){

          //hide player
          this.scene.player1.visible = false;
          // start the animation to begin thep rocess
          this.anims.play('istaraStart',true);

          //follow istara and zoom the camera in
          this.scene.mycamera.startFollow(this);

        }else if(this.currentDictNode.nodeName === "node17" && this.animationPlayed === false ){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          let enemy = this;
          setTimeout(function () {
              enemy.scene.initSoundEffect('plapSFX','plap4',0.5);;
          }, 1000);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEntering').once('animationcomplete', () => {
            this.anims.play('istaraBelly1',true);
            this.scene.sceneTextBox.amountWIsPressed++;
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            //hide ui and dialogue box.
            this.progressNode("",true);
            this.scene.sceneTextBox.visible = true;

            this.scene.initSoundEffect('stomachSFX','4',0.2);
          });
          

        }else if(this.currentDictNode.nodeName === "node19" ){
          this.scene.initSoundEffect('stomachSFX','7',0.4);
        }else if(this.currentDictNode.nodeName === "node20" ){
          this.scene.initSoundEffect('stomachSFX','4',0.4);
        }else if(this.currentDictNode.nodeName === "node21" ){
          this.scene.initSoundEffect('stomachSFX','10',0.3);
          this.anims.play('istaraBelly2',true);
        }else if(this.currentDictNode.nodeName === "node22" ){
          this.scene.initSoundEffect('stomachSFX','8',0.8);
        }else if(this.currentDictNode.nodeName === "node23" ){
          this.scene.initSoundEffect('stomachSFX','12',0.4);
        }else if(this.currentDictNode.nodeName === "node24" && this.animationPlayed === false ){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          this.scene.initSoundEffect('stomachSFX','15',0.1);

          if(this.scene.lightingSystemActive === true){
            this.curseLight.visible = true;
          }

          this.scene.initSoundEffect('curseSFX','curse',0.3);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEggTF').once('animationcomplete', () => {
            this.anims.play('istaraEggBelly',true);
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            //progress the dialogue by one stage so the button moves dialogue forward.
            this.scene.initSoundEffect('stomachSFX','13',0.1);

            if(this.scene.lightingSystemActive === true){
              this.curseLight.visible = false;
            }
          });

        }else if(this.currentDictNode.nodeName === "node26" && this.animationPlayed === false && this.eggLayingFinished === false){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          this.scene.initSoundEffect('plapSFX','plap4',0.5);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEggLaying').once('animationcomplete', () => {
            this.anims.play('istaraEggCovet',true);
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            this.eggLayingFinished = true;

          });

        }else if(this.currentDictNode.nodeName === "node26" && this.eggLayingFinished === true){
          this.scene.enemyThatDefeatedPlayer = bestiaryKey.istaraUnbirth;
          this.scene.changeToGameover();
          this.scene.sceneTextBox.textInterupt = true;
          this.scene.sceneTextBox.textCoolDown = true;
        }
      } 
    }
  }

  DreamView(){
    this.nodeHandler("istara","Behavior2","dreamView");

      if(this.currentDictNode !== null){
        if(this.currentDictNode.nodeName === "node1" && this.inDialogue === false){

          this.inDialogue = true;
          //set variable approperiately
          this.scene.sceneTextBox.textInterupt = true;

          //create dialogue buttons for player choice
          this.scene.npcChoice1 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-260,'charBubble',"Yes please! ^_^  ",true);
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

            //progress to node branch with state name node5
            this.progressNode("node11");

            //sets the dialogue catch so the textbox stays open during the shop ui interactions.
            this.dialogueCatch = true;
            
            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

          },this);

          //dialogue option for no.
          this.scene.npcChoice2 = new makeText(this.scene,this.scene.sceneTextBox.x-280,this.scene.sceneTextBox.y-300,'charBubble',"I think i'll pass.",true);
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
            this.progressNode("node27");

            //destroy itself and other deciosions
            this.scene.npcChoice1.destroy();
            this.scene.npcChoice2.destroy();

          },this);

          //call scene variable to create interupt.
          this.scene.sceneTextBox.textInterupt = true;

          //let the npc know they are in dialogue
          this.inDialogue = true;
          
          // if the dialogue stage is at 14 and the player said yes, then add the unbirthing dialogue.
          
        }else if(this.currentDictNode.nodeName === "node16" ){

          //hide player
          this.scene.player1.visible = false;
          // start the animation to begin thep rocess
          this.anims.play('istaraStart',true);

          //follow istara and zoom the camera in
          this.scene.mycamera.startFollow(this);

        }else if(this.currentDictNode.nodeName === "node17" && this.animationPlayed === false ){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          let enemy = this;
          setTimeout(function () {
              enemy.scene.initSoundEffect('plapSFX','plap4',0.5);;
          }, 1000);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEntering').once('animationcomplete', () => {
            this.anims.play('istaraBelly1',true);
            this.scene.sceneTextBox.amountWIsPressed++;
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            //hide ui and dialogue box.
            this.progressNode("",true);
            this.scene.sceneTextBox.visible = true;

            this.scene.initSoundEffect('stomachSFX','4',0.2);
          });
          

        }else if(this.currentDictNode.nodeName === "node19" ){
          this.scene.initSoundEffect('stomachSFX','7',0.4);
        }else if(this.currentDictNode.nodeName === "node20" ){
          this.scene.initSoundEffect('stomachSFX','4',0.4);
        }else if(this.currentDictNode.nodeName === "node21" ){
          this.scene.initSoundEffect('stomachSFX','10',0.3);
          this.anims.play('istaraBelly2',true);
        }else if(this.currentDictNode.nodeName === "node22" ){
          this.scene.initSoundEffect('stomachSFX','8',0.8);
        }else if(this.currentDictNode.nodeName === "node23" ){
          this.scene.initSoundEffect('stomachSFX','12',0.4);
        }else if(this.currentDictNode.nodeName === "node24" && this.animationPlayed === false ){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          this.scene.initSoundEffect('stomachSFX','15',0.1);

          if(this.scene.lightingSystemActive === true){
            this.curseLight.visible = true;
          }

          this.scene.initSoundEffect('curseSFX','curse',0.3);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEggTF').once('animationcomplete', () => {
            this.anims.play('istaraEggBelly',true);
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            //progress the dialogue by one stage so the button moves dialogue forward.
            this.scene.initSoundEffect('stomachSFX','13',0.1);

            if(this.scene.lightingSystemActive === true){
              this.curseLight.visible = false;
            }
          });

        }else if(this.currentDictNode.nodeName === "node26" && this.animationPlayed === false && this.eggLayingFinished === false){
          
          //hide player
          this.scene.player1.visible = false;
          this.animationPlayed = true;

          //apply interuption to dialogue
          this.scene.sceneTextBox.textInterupt = true;

          //hide ui and dialogue box.
          this.scene.sceneTextBox.visible = false;

          this.scene.initSoundEffect('plapSFX','plap4',0.5);

          //play animation and on complete allow w to be pressed.
          this.anims.play('istaraEggLaying').once('animationcomplete', () => {
            this.anims.play('istaraEggCovet',true);
            this.scene.sceneTextBox.textInterupt = false;
            this.animationPlayed = false;
            this.eggLayingFinished = true;

          });

        }else if(this.currentDictNode.nodeName === "node26" && this.eggLayingFinished === true){
          this.scene.gameoverLocation = "istaraGameover";
          this.scene.enemyThatDefeatedPlayer = bestiaryKey.istaraUnbirth;
          this.scene.changeToGameover();
          this.scene.sceneTextBox.textInterupt = true;
          this.scene.sceneTextBox.textCoolDown = true;
        }
      } 
  }

  gameOver(){
    this.anims.play('istaraGameover',true);
  }

  playJumpySound(type,delay){

    if(this.jumpySoundCoolDown === false){

        this.scene.initSoundEffect('jumpySFX',type,0.04);
        this.jumpySoundCoolDown = true;

        let enemy = this;
        setTimeout(function () {
            enemy.jumpySoundCoolDown = false;
        }, delay);
    }

}

}