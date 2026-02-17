// parent class of most npc entitys
class npc extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,sprite){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, sprite);

      //then we add new instance into the scene.
      scene.add.existing(this);
      //give this object a physics box.
      scene.physics.add.existing(this);
      //make it unpussable in any way. potentially unnessary.
      this.setPushable(false);

      this.inDialogue = false;
      this.animationPlayed = false;

      this.npcDelay = false;
      
      //sets scale of object
      this.setScale(1/3);

      //dialogue object which holds node tree and dictionary object of node keys.
      this.dialogueDict = null;
      this.dialogueDictSet = false;

      //current node position in our node tree.
      this.currentDictNode = null;
      this.nodeProgressionDelay = false;

      //createdfor use in textbox
      this.profileArray = [];
      this.textToDisplay ="";

      //value to tell when we have finished dialogue.
      this.finished = false;

      //variable to catch dialogue so that we do not finish before we are supost to. useful for haulting dialogue for shop npcs as an example.
      this.dialogueCatch = false;

      //variable to lock out the flag search during dialogue.
      this.flagLockout = false;
      
      //value to tell if a triggernpc has caught the player.
      this.triggerNpcActivated = false;
      this.triggerNpcFinished = false;

      this.npcTriggerRange = false;
      this.npcTriggerRangeX = null;
      this.npcTriggerRangeY = null;
      this.customTrigger = false;

      this.advancedIdleAnimation = false;

      this.loopSoundID = null;
      this.loopSoundName = null;
      this.loopVolume = null;
      this.loopTime = null;
      this.soundLoopTimeOut = null;

      this.npcState = 0;

      this.moveFunctionActive = false;
      
      this.scene = scene;
  }

  MoveNPC(){
    
  }

  //controls the activation delay of the dialogue
  dialogueLogicStart(){

    //sets the player sprite to its hitbox incase player was jumping.
    this.scene.player1.x = this.scene.player1.mainHitbox.x;
    this.scene.player1.y = this.scene.player1.mainHitbox.y;

  }

  //npc flag logic function. meant to be overwriten by the npc building of this class.
  flagLogic(){
    this.default();
  }

  //pauses the animations of the enemys.
  pauseAnimations(scene) {
    if (scene.inventoryOpen === true) {
      //console.log("pausing npc animation");
      this.anims.pause();
      this.isAnimsPaused = true;
    }else if(scene.inventoryOpen === false) {
      //console.log("resuming npc animation");
      this.anims.resume();
      this.isAnimsPaused = false;
    }
  }

  //function takes in a npc name, a npc logic, and a npc flag string to tell where in our const npc global object what dialogue should be played.
  setUpDialogueDict(npcName,npcLogic,npcFlag){

    //reset finished, and other variables
    this.dialogueDict = null;
    this.inDialogue = false;
    this.scene.sceneTextBox.soundType = "default";
    this.currentDictNode = null;
    this.profileArray = [];
    this.textToDisplay = "";
    this.bypass = false;

    this.nodeProgressionDelay = false;

    this.dialogueDictSet = true;

    //parse the correct dialogue sequence, filling our dict parser class so it has a root node and a dictionary of important nodes.
    this.dialogueDict = new dictParser(npcName,npcLogic,npcFlag);
    console.log("setting this.dialogueDict: ",this.dialogueDict);

    //set the npcs starting node to the node we are currently 
    this.currentDictNode = this.dialogueDict.root;

    //call npc function to add text, profile, and voice to the dialogue box strings ect.
    this.profileArray.push(this.dialogueDict.root.profile);
    this.textToDisplay = this.dialogueDict.root.dialogue;
    this.scene.sceneTextBox.soundType = this.dialogueDict.root.textVoice;

    //activates textbox since we progressed to the next node
    this.scene.sceneTextBox.setText(this.textToDisplay,this.dialogueDict.root.dialogue);
    this.scene.sceneTextBox.setProfileArray(this.profileArray);
    this.scene.sceneTextBox.setNPCRef(this);
    this.scene.sceneTextBox.activateNPCTextBox(this.bypass);

  }

  //default text stating something has gone wrong.
  default(){
    this.textToDisplay = 
      'SOMETHING HAS GONE       '+
      'WRONG!                   '+
      '                         ';
      
  }
  
  //dialogue node progression function. take in the nodes name to be progressed.
  progressNode(nextNodeName,bypass){
    //console.log("attempting to progress node: ",nextNodeName);
    //safty case, if the length of the currnodes array is one, then progress that node.
    if(this.currentDictNode.children.length === 1){

      //sets current node to the only child node.
      this.currentDictNode = this.currentDictNode.children[0];

      //add node data to string, push profile to array, and set text voice.
      this.profileArray.push(this.currentDictNode.profile);
      this.textToDisplay += this.currentDictNode.dialogue;
      this.scene.sceneTextBox.soundType = this.currentDictNode.textVoice;

      //activates textbox since we progressed to the next node
      this.scene.sceneTextBox.setText(this.textToDisplay,this.currentDictNode.dialogue);
      this.scene.sceneTextBox.setProfileArray(this.profileArray);
      this.scene.sceneTextBox.activateNPCTextBox(bypass);

    }else{
      this.nodeProgressionDelay = false;
      let foundNode = false;
      //search the currentNodes children
      for(let counter = 0; counter < this.currentDictNode.children.length;counter++){

        //if the child name matches the name we are looknig for.
        if(this.currentDictNode.children[counter].nodeName === nextNodeName){

          console.log("Found node: ",nextNodeName);
          foundNode = true;

          //set the current node to the child that matches
          this.currentDictNode = this.currentDictNode.children[counter];

          //add node data to string, push profile to array, and set text voice.
          this.profileArray.push(this.currentDictNode.profile);
          this.textToDisplay += this.currentDictNode.dialogue;
          this.scene.sceneTextBox.soundType = this.currentDictNode.textVoice;

          //activates textbox since we progressed to the next node
          this.scene.sceneTextBox.setText(this.textToDisplay,this.currentDictNode.dialogue);
          this.scene.sceneTextBox.setProfileArray(this.profileArray);
          this.scene.sceneTextBox.activateNPCTextBox(bypass);

          
          //break free of the loop.
          break;
        }
      }

      // improtant check. if we are at the last node because we couldnt find a child, makesure dialogue catch is set to false so we dont get stuck at the end of a dialogue braNCH
      if(foundNode === false){
        this.dialogueCatch = false;
      }
    }
    
  }

  //logic the occurs after every dialogue progression.
  dialogueLogicEnd(){

    //console.log("this.scene.sceneTextBox.completedText: ",this.scene.sceneTextBox.completedText)
    //while there is text to display display it.
    if(this.scene.sceneTextBox.completedText === false){
      this.scene.pausedInTextBox = true;
    }
    // updates the npc so that it knows when the dialogue is completed.
    this.completedText = this.scene.sceneTextBox.completedText;

    //if we find the end of our tree structure
     if(this.finished === false && this.currentDictNode !== null && this.currentDictNode.children.length === 0 && this.dialogueCatch === false){
      //est the finished value to true
      this.finished = true;
    //so the next call kills the dialogue
     }else if(this.currentDictNode !== null && this.currentDictNode.children.length === 0 && this.dialogueCatch === false){

      //resets this npc's values.
      this.resetVariables();
    
      //progress the dialogue so the textbox goes through its finishing procedure.
      this.scene.sceneTextBox.activateNPCTextBox();

    }

  }

  //generic reset function for variables.
  resetVariables(){
    //reset finished, and other variables
    console.log("finished dialogue!");
    this.dialogueDictSet = false;
    this.dialogueDict = null;
    this.inDialogue = false;
    this.currentDictNode = null;
    this.profileArray = [];
    this.textToDisplay = "";
    this.nodeProgressionDelay = false;

    //resets catch so dialogue can end. useful for shop ui.
    this.dialogueCatch = false;
    
    this.scene.sceneTextBox.soundType = "default";
    
  }

  //function that is called to activate the npc logic.
  activateNpc(){

    //if the player meets activation requiements for the sign display the text box
    if(this.safeToSpeak === true && this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.scene.player1.mainHitbox.body.blocked.down){

      //console.log("this.currentDictNode: ",this.currentDictNode);

      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();
          
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


  //function called when a trigger npc overlaps  
  overlapActivateNpc(){
     //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcFinished: ",this.triggerNpcFinished);
    //if the id matches and we havent activated the trigger yet.

    //console.log("this.scene.activatedNpcId === this.npcId: ",this.scene.activatedNpcId === this.npcId, "this.triggerNpcFinished: ",this.triggerNpcFinished);
    if(this.scene.activatedNpcId === this.npcId && this.triggerNpcActivated === false){

      //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcActivated: ",this.triggerNpcActivated);
      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();

      //lock out starting logic.
      this.triggerNpcActivated = true;

    //otherwise if the trigger was activated, and the player is in dialogue, then have w progress dialogue.
    
    }else if(this.scene.checkWPressed() && this.scene.activatedNpcId === this.npcId && this.triggerNpcFinished === false){

      //console.log("this.scene.activatedNpcId: ",this.scene.activatedNpcId, " this.triggerNpcActivated: ",this.triggerNpcActivated);

      //logic to start dialogue
      this.dialogueLogicStart();

      //calls function overwritten children class to handle npc logic.
      //console.log("flag logic function acxtivated!")
      this.flagLogic();
        
      //ending dialoguce logic.
      this.dialogueLogicEnd();

      //choke to make sure this cant be activated agian.
      if(!this.scene.sceneTextBox.visible && this.scene.sceneTextBox.hidingText === false){
        this.triggerNpcFinished = true;

      }
          
    }
  }

  //handles the node progression 
  nodeHandler(npc,behavior,flag,diversionNode){
    //console.log("calling node handler");

    //check if the dialogue node is set.
    this.scene.sceneTextBox.npcReset();

    //console.log("this.dialogueDictSet: ",this.dialogueDictSet," this.finished: ,",this.finished);
    //if the dialogue isnt set and we arnt finished with dialogue
    if(this.dialogueDictSet === false && this.finished === false ){

      //set up dialogue function
      this.setUpDialogueDict(npc,behavior,flag);

      //have the player idle while talking.
      if(this.scene.player1 !== null && this.scene.player1 !== undefined){
        this.scene.player1.playerIdleAnimation();
      }

    //if the node has been set that use the main progression function
    }else if(this.scene.sceneTextBox.textInterupt === false &&// while the text box is not paused.
       this.animationPlayed === false &&// and this npc isnt in the middle of playing a animation.
       this.scene.sceneTextBox.textBoxActivationCoolDown === false && // and the scene textbox isnt on cooldown.
       this.finished === false // and we are not finished with the dialogue.
      ){

        //block to stop the node from progressing too quickly.
        //console.log("this.nodeProgressionDelay,:",this.nodeProgressionDelay)
        if(this.nodeProgressionDelay === false){

          //if the length is greater than zero then progress pass the next node
          if(this.currentDictNode.children.length > 0){

            //console.log("progressing to node ->",this.currentDictNode.children[0].nodeName);
            this.progressNode(this.currentDictNode.children[0].nodeName);

            //time out for our node progression.
            this.nodeProgressionDelay = true;

          //otherwise progress with blank node.
          }else {
            this.progressNode("");
          }

      }
    }
  }

  //handles the node progression 
  nodeHandler(npc,behavior,flag,diversionNode,){
    //console.log("calling node handler");

    //check if the dialogue node is set.
    this.scene.sceneTextBox.npcReset();
    
    //console.log("this.dialogueDictSet: ",this.dialogueDictSet," this.finished: ,",this.finished);
    //if the dialogue isnt set and we arnt finished with dialogue
    if(this.dialogueDictSet === false && this.finished === false ){

      //set up dialogue function
      this.setUpDialogueDict(npc,behavior,flag);

      //have the player idle while talking.
      if(this.scene.player1 !== null && this.scene.player1 !== undefined){
        this.scene.player1.playerIdleAnimation();
      }

    //if the node has been set that use the main progression function
    }else if(this.scene.sceneTextBox.textInterupt === false &&// while the text box is not paused.
       this.animationPlayed === false &&// and this npc isnt in the middle of playing a animation.
       this.scene.sceneTextBox.textBoxActivationCoolDown === false && // and the scene textbox isnt on cooldown.
       this.finished === false // and we are not finished with the dialogue.
      ){

        //block to stop the node from progressing too quickly.
        //console.log("this.nodeProgressionDelay,:",this.nodeProgressionDelay)
        if(this.nodeProgressionDelay === false){

          //if the length is greater than zero then progress pass the next node
          if(this.currentDictNode.children.length > 0){

           // console.log("progressing to node ->",this.currentDictNode.children[0].nodeName);
            this.progressNode(this.currentDictNode.children[0].nodeName);

            //time out for our node progression.
            this.nodeProgressionDelay = true;

          //otherwise progress with blank node.
          }else {
            this.progressNode("");
          }

      }
    }
  }

  //function to generate a shop array for the items that can be bought back.
  generateBuyBack(){

    let buyBack = [];

    //loop though an array of flags that are onetime item drops.
    for (const key in oneTimeItemArray) {

      //call emiter to search for a flag.
      //make a temp object
      let object = {
        flagToFind: key,
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the flag is found search the player inventory for that id.
      if(object.foundFlag){

        //make a special object to pass to the listener
        let object1 = {
          oneTimeKey: key,
          foundKey: false
        };

        /*//call emitter to tell if the onetime item is present in the inventory.
        inventoryKeyEmitter.emit(inventoryKey.isItemInInventory, object1);

      
        //if the item doesnt exist in the player inventory, then
        if(!object1.foundKey){*/

          //push the object to the buyBack array
          buyBack.push(oneTimeItemArray[key]);
        //}
      }


    }

    //console.log("buyBack: ",buyBack);
    return buyBack;

    
  }

  //allow for npcs to have looping sound calls using time out
  npcLoopingSound(){

   //console.log("looping sound ")
    //settimeout function
    let temp = this;
    //call sound effect
    if(temp.scene !== null && temp.scene !== undefined){
      temp.scene.initSoundEffect(this.loopSoundID,this.loopSoundName,this.loopVolume);
    }

    //set a timeout to recurseively play sound.
    this.soundLoopTimeOut = setTimeout(function () {
      temp.npcLoopingSound();  
    },this.loopTime); 
  }

 //function to kill sound effect loop
 setLoopingSound(soundID,soundName,volume,time){

    //protective if to make sure we dont have duplicate calls to the same loop sounds as it may break sound effects
    if(soundID !== this.loopSoundID && soundName !== this.loopSoundName && volume !== this.loopVolume && time !== this.loopTime){
       //sets looping variable information
      this.loopSoundID = soundID;
      this.loopSoundName = soundName;
      this.loopVolume = volume;
      this.loopTime = time;

      //call recursive looping function to play looping sound.
      this.npcLoopingSound();
    }
   
    
 }

 //apply once 
 interuptSoundLoop(soundID,soundName,volume,time){

  //clears current sound loop settimeout
  clearTimeout(this.soundLoopTimeOut);

  //sets looping variable information
  this.loopSoundID = soundID;
  this.loopSoundName = soundName;
  this.loopVolume = volume;
  this.loopTime = time;

  //call recursive looping function to play new looping sound.
  this.npcLoopingSound();
 }

 killSoundLoop(){

  if(this.soundLoopTimeOut !== null && this.soundLoopTimeOut !== undefined){
    //clears current sound loop settimeout
    clearTimeout(this.soundLoopTimeOut);

    //set loop sound npc variables to null.
    this.loopSoundID = null;
    this.loopSoundName = null;
    this.loopVolume = null;
    this.loopTime = null;
    this.soundLoopTimeOut = null;
  }
  
 }

 //function to be casted later by specalized npc.
  customTriggerFunction(){

  }

}

