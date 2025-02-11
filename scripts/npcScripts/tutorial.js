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
    }else if(this.npcType === 'warps'){
      this.warps();
    }else if(this.npcType === 'containers'){
      this.containers();
    }else if(this.npcType === 'saveStones'){
      this.saveStones();
    }else{
      this.default();
    }
  }
  //function to activat tutorial bell.
  activateBell(){
    if(this.currentDictNode !== null && this.currentDictNode.nodeName === "node1"){
      this.scene.initSoundEffect('buttonSFX1','bellJingle',0.05);
    }
  }


  //tutorial prompt explaining movement.
  movement(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //make a temp object
    let object = {
      flagToFind: "movement_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","movement");

    this.activateBell();

  }

  platforms(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //make a temp object
    let object = {
      flagToFind: "platforms_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","platforms");

    this.activateBell();
  }

  worldDrops(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

     //make a temp object
     let object = {
      flagToFind: "worldDrops_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","worldDrops");

    this.activateBell();
    
  }

  warps(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //make a temp object
    let object = {
      flagToFind: "warps_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","warps");

    this.activateBell();  
  }

  containers(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //make a temp object
    let object = {
      flagToFind: "containers_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","containers");

    this.activateBell();
    
  }

  saveStones(){

    this.scene.player1.x = this.x; 
    this.scene.player1.y = this.y; 
    this.scene.player1.mainHitbox.x = this.scene.player1.x;
    this.scene.player1.mainHitbox.y = this.scene.player1.y;
    this.scene.player1.mainHitbox.setVelocityX(0);
    this.scene.player1.mainHitbox.setVelocityY(0);

    //make a temp object
    let object = {
      flagToFind: "saveStones_tutorial",
      foundFlag: false,
    };

    //stores the flag in the text box so it can be set after dialogue is done.
    this.scene.sceneTextBox.storeFlag(object);

    this.nodeHandler("tutorial","beach","saveStones");

    this.activateBell();
    
  }






  
}