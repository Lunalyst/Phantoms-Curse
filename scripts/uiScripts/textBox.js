
//const lineLength = 24;
//const textEnd = 75;

//need to rework textboxes because of the new system in place with nodes.
//the main issue is that if the w key is spammed, then the node position and the npcs position get miss aligned.
//this causes wierd brreaks in dialogue and things happening at the wrong time.
//the solution to this could be to rework this entity
//reason being is that passing the nodes data through a string from the npc to this object is janky.
//my solution, have the textbox read the nodes. if the textbox is given the tree structure, then
//it canp rogress through the nodes without closing prematurely, or breaking sequence.
//since the player pressing w determinesthe node position anyway. 
//the trick part is to align the npcs state machine with the w presses. and that can be more easily done if the textbox is handling the text box pace
//instead of the npc handling the pace.
//save a refrence to the npc.
class textBox extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,font){
      
      super(scene, xPos, yPos);

      console.log('font ',font);
      
      this.setDepth(50);
      scene.add.existing(this);
      this.visible = false;
      this.setScrollFactor(0);
      this.setScale(.7);

      //makes base sprite to boarder the text
      this.outSide = scene.add.sprite(0, 0, 'textBox');
      this.add(this.outSide);
      this.blockVisiblity = false;

      
      this.lines = [];
      let spacing = -200
      let y = -20

      //sets up text for the textbox there are 75 text characters used
      for(let i = 0; i < textEnd+1; i++){
        let textChar = new textBoxCharacter(scene, spacing, y,font);
        textChar.setScale(1/6);

        this.add(textChar);
        this.lines.push(textChar);

        spacing = spacing + 20;
        if(i === lineLength || i === lineLength*2+1){
          
          y += 20;
          spacing = -200;
        }
 
      }
      //variable to tell when text is complete.
      this.completedText = false;

      //displays prtofile sprite meant to resemble what is currently talking to the player.
      this.textBoxProfileImage = new textBoxProfile(scene, -250, 0);
      this.add(this.textBoxProfileImage);
      
      this.currentText = "empty";
      this.finishedDisplayingText = false;
      this.textCoolDown = true;
      this.startPostion = 0;
      this.endPosition = 0;
      this.textBoxActivationCoolDown = false;
      this.profileArray;
      this.profileArrayPosition = 0;
      this.progressionAmount = 0;

      this.textInterupt = false;

      this.soundType = "default";

      //set when talking with a npc.
      this.npcRef = null;
    }

    //function to give textbox a refrence to the npc.
    setNPCRef(npc){
      this.npcRef = npc;
    }

    //delay to hault both the textbox, and the progression of the npc dialogue, with the same sewttime out.,
    setNPCandTextboxDelay(){
      if(this.npcRef !== null){
        console.log("activating npc and textbox delay");
        console.log("this.npcRef",this.npcRef);
        let tempTextbox = this;
        let tempNPC = this.npcRef;
        this.textCoolDown = false;
        this.npcRef.nodeDelay = true;

        setTimeout(function(){
          console.log("node npc delay currentNPC.nodeDelay: ", tempNPC.nodeDelay);
          tempNPC.nodeDelay = false;
          tempTextbox.textCoolDown = true;
          },500);
      }else{
        this.textCoolDown = false;

        let currentTextBox = this;
        //time out function to set the cooldown to true in .3 seconds.
        setTimeout(function(){
          //console.log("delay end for text box");
          
          currentTextBox.textCoolDown =  true;
          console.log("reseting current hitbox");
          },500);

      }

    }
    
    //function to hide the text of a text box. used to clear text lines.
    hideText(hideBool){
      for(let counter = 0;counter < this.lines.length-1;counter++){
        this.lines[counter].visible = hideBool;
      }
    }

    //function activates textbox and progresses text box when w is pressed
  activateTextBox(){

      //console.log("this.currentText: ",this.currentText);
      //console.log("this.profileArray: ",this.profileArray);

      //if the cooldown is not true then
      if(this.textBoxActivationCoolDown === false){

        //textbox cooldown check.
        if(this.textCoolDown){
        this.visible = true;
        this.textBoxProfileImage.visible = true;
        this.hideText(true);
        this.scene.isPaused = true;
        this.scene.pausedInTextBox = true;
        //console.log("this.scene.isPaused: "+ this.scene.isPaused);
        this.completedText = false;

        //use emmitter to hide the mobile controls if there on.
        controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox,false);

      }
      
      //if the player pressed w then
      //console.log("this.textInterupt: ",this.textInterupt," this.textCoolDown: ",this.textCoolDown)
      if((this.scene.checkWPressed() && this.textInterupt === false && this.textCoolDown)){
        console.log("this.amountWIsPressed: ",this.progressionAmount);
        this.progressionAmount++;
        
        //update position so we can display the next set of text.
        this.startPosition = this.endPosition;
        this.endPosition = this.endPosition+textEnd;

        //calls function to display that next set of text
        this.displayText(this.startPosition,this.endPosition);

        this.setNPCandTextboxDelay(); 
        }

    //once we reach the end of the text, we release the player back into the scene
    if(this.endPosition-textEnd > this.currentText.length-1){
      
      //resets values in scene, and this object
      this.scene.isPaused = false;
      this.scene.pausedInTextBox = false;
      this.visible = false;
      this.textBoxProfileImage.visible = false;
      this.hideText(false);
      this.startPosition = 0;
      this.endPosition = 0;
      this.textBoxActivationCoolDown = true;
      this.progressionAmount = 0;
      
      //reset sound type once dialogue is over.
      this.soundType = "default";

      this.completedText = true;
      //use emmitter to show the mobile controls if there on.
      controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox,true);


      let tempTextBox = this;
      setTimeout(function(){
        tempTextBox.completedText = false;
        tempTextBox.textBoxActivationCoolDown = false;
      },1000); 
    }
  }
  }


  //special activation function, giving the npc more control of the textbox.
  activateNPCTextBox(){

  //if the nodeProgressionDelay is not true then
  if(this.npcRef.nodeProgressionDelay === false){

    //textbox cooldown check.
    if(this.textCoolDown){
    this.visible = true;
    this.textBoxProfileImage.visible = true;
    this.hideText(true);
    this.scene.isPaused = true;
    this.scene.pausedInTextBox = true;
    //console.log("this.scene.isPaused: "+ this.scene.isPaused);
    this.completedText = false;

    //use emmitter to hide the mobile controls if there on.
    controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox,false);

  }
  
  //same as regular activation function, but, it depends on the delay for the nodeProgressionDelay in the npc to be finished
  console.log("this.npcRef",this.npcRef)
    if((this.textInterupt === false && this.npcRef.nodeProgressionDelay === false)){
      console.log("this.amountWIsPressed: ",this.progressionAmount);
      this.progressionAmount++;
      
      //update position so we can display the next set of text.
      this.startPosition = this.endPosition;
      this.endPosition = this.endPosition+textEnd;

      //calls function to display that next set of text
      this.displayText(this.startPosition,this.endPosition);

      this.setNPCandTextboxDelay(); 
      }

    //once we reach the end of the text, we release the player back into the scene
    if(this.endPosition-textEnd > this.currentText.length-1){
      
      //resets values in scene, and this object
      this.scene.isPaused = false;
      this.scene.pausedInTextBox = false;
      this.visible = false;
      this.textBoxProfileImage.visible = false;
      this.hideText(false);
      this.startPosition = 0;
      this.endPosition = 0;
      this.textBoxActivationCoolDown = true;
      this.progressionAmount = 0;
      
      //reset sound type once dialogue is over.
      this.soundType = "default";

      this.completedText = true;
      //use emmitter to show the mobile controls if there on.
      controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox,true);


      let tempTextBox = this;
      setTimeout(function(){
        tempTextBox.completedText = false;
        tempTextBox.textBoxActivationCoolDown = false;
      },1000); 
    }
  }
}

progressDialogue(){

    console.log("progressing dialogue once. ");
    this.progressionAmount++;
    
    //update position so we can display the next set of text.
    this.startPosition = this.endPosition;
    this.endPosition = this.endPosition+textEnd;

    if(this.endPosition-textEnd > this.currentText.length-1){
      //resets values in scene, and this object
      this.scene.isPaused = false;
      this.scene.pausedInTextBox = false;
      this.visible = false;
      this.textBoxProfileImage.visible = false;
      this.hideText(false);
      this.startPosition = 0;
      this.endPosition = 0;
      this.textBoxActivationCoolDown = true;
      this.progressionAmount = 0;
      
      //reset sound type once dialogue is over.
      this.soundType = "default";

      this.completedText = true;
      //use emmitter to show the mobile controls if there on.
      controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox,true);


      let tempTextBox = this;
      setTimeout(function(){
        tempTextBox.completedText = false;
        tempTextBox.textBoxActivationCoolDown = false;
      },1000); 
    
    }else{

      //calls function to display that next set of text
      this.displayText(this.startPosition,this.endPosition);

      this.setNPCandTextboxDelay();
    }
}

  // this. line and two numbers representing the start and end location of the text to be display.
  displayText(start,end){
      let textPos = 0;
      //clear the text character first.
      for(let counter = start;counter < end+1;counter++){
        this.lines[textPos].anims.play(' ');
        textPos++;
      }

      textPos = 0;
      //awsome wack ass recursion using anims complete to create text scrolling.
      this.displayHelper(start,textPos,end+1,this.progressionAmount)
      if(this.profileArray.length > 0){
        this.textBoxProfileImage.anims.play(this.profileArray[this.profileArray.length-1]);
      }
      
      
      
  }

    //function that makes delayed text 
    displayHelper(counter,textPos,end,wPosition){

      //if we arnt at the end of the text to be displayed
      if(counter < end-1 && wPosition === this.progressionAmount){

        //if there is a character in length of the texbox to be idsplayed
        if(counter < this.currentText.length){
          
          //sound check for text scroll  only for characters not space and while the text is visible
          if(this.visible && this.currentText.charAt(counter) !== ' '){
            //decision making for sound that player during dialogue
            //
            if(this.soundType === "default"){
              this.scene.initSoundEffect('buttonSFX','1',0.05);
            }else if(this.soundType === "hit"){
              this.scene.initSoundEffect('buttonSFX','hit',0.05);
            }else if(this.soundType === "drum"){
              this.scene.initSoundEffect('buttonSFX','drum',0.05);
            }else if(this.soundType === "trumpet"){
              this.scene.initSoundEffect('buttonSFX','trumpet',0.05);
            }else if(this.soundType === "mediumVoice"){
              this.scene.initSoundEffect('buttonSFX','mediumVoice',0.05);
            }else if(this.soundType === "lightVoice"){
              this.scene.initSoundEffect('buttonSFX','lightVoice',0.1);
            }else if(this.soundType === "mediumPiano"){
              this.scene.initSoundEffect('buttonSFX','mediumPiano',0.05);
            }else if(this.soundType === "lightPiano"){
              this.scene.initSoundEffect('buttonSFX','lightPiano',0.05);
            }

          }
          this.lines[textPos].anims.play(this.currentText.charAt(counter).toUpperCase()).once('animationcomplete', () => {
            this.displayHelper(counter+1,textPos+1,end,wPosition);
          });
        
          //else we fill in the rest with spaces, dialogue over
        }else{
  
          this.lines[textPos].anims.play(' ').once('animationcomplete', () => {
          this.displayHelper(counter+1,textPos+1,end,wPosition);
        });

        }

      }
      
    }

    //formatting function so text properly fixts in textbox
    formatText(){
      //temp array for testing used to check if all the line align with each other.
      //let tempArray = [];

      //string to store new formatted string.
      let formattedString = "";
      //temp string to store data
      let tempString = "";
      //variable to keep track fo line positioning.
      let tempLineCounter = 0;

      //loop through the text in the object
      for(let counter = 0;counter < this.currentText.length+1;counter++){
      
        //if the templinecounter reaches 24 then 
        //check to see if the current char is a space. if not then 
        if(tempLineCounter === lineLength+1 && this.currentText.charAt(counter) !== ' '){
          
          //reverse through the temp string
          for(let tempStringPosition = tempString.length;tempStringPosition > 0;tempStringPosition--){


            //if the char in tempstring is a space then 
            if(tempString.charAt(tempStringPosition) === ' '){
              //slice off the extra word getting cut off 
              tempString = tempString.slice(0,tempStringPosition);

              //add spaces back to the tempstring until it is the correct line size
              while(tempString.length < lineLength+1){
                tempString+= ' ';
              }

              //array for testing purposes
              //tempArray.push(tempString);

              formattedString += tempString;
              //reset the templinecounter variable
              tempLineCounter = 0;
              //empty out string
              tempString = "";
              //moves the counter forward one so it doesnt pick up the space at the end of the line.
              counter+=2;
              //kills loop
              tempStringPosition = 0;
            }

            //keeps position in outer loop so that word being removed is not lost
            counter--;
            
          }      
        }else if(tempLineCounter === lineLength+1 && this.currentText.charAt(counter) === ' '){

          //add spaces back to the tempstring until it is the correct line size
          while(tempString.length < lineLength+1){
            tempString+= ' ';
          }
          //array for testing purposes
          //tempArray.push(tempString);

          formattedString += tempString;
          //reset the templinecounter variable
          tempLineCounter = 0;
          //empty out string
          tempString = "";
          //moves the counter forward one so it doesnt pick up the space at the end of the line.
          counter++;
        }
         
        //adds to the temp ling
        tempString += this.currentText.charAt(counter);
        //increment line every character.
        tempLineCounter++;
      }

      //for testing purposes
      //tempArray.push(tempString);
      //console.log("tempArray: ", tempArray);

      //adds the last line to the string and sets our text object to it.
      formattedString += tempString;
      this.currentText = formattedString;

    }

    setText(text){
      this.currentText = text;
    }
    
    setProfileArray(profileArray){
      this.profileArray = profileArray;

    }

    setTitleScreenView(){
      this.setScale(1);
      let offset = -98; 
      let lineCounter = 0;
      let lineYoffset = 0;
      for(let counter = 0;counter < this.lines.length-1;counter++){
        if(lineCounter === lineLength){
          offset = -98;
          lineCounter = 0;
          lineYoffset++;
        }
        this.lines[counter].x = this.lines[counter].x + offset + 33;
        //console.log("this.lines[counter].x: "+this.lines[counter].x);
        //console.log("offset: "+offset);
        offset = offset + 7;
        this.lines[counter].setScale(.25);
        if(lineYoffset === 0){
          this.lines[counter].y = this.lines[counter].y - 10;
        }else if(lineYoffset === 2){
          this.lines[counter].y = this.lines[counter].y + 10;
        }

        lineCounter++;
      }
      this.textBoxProfileImage.x = this.textBoxProfileImage.x-109;
      this.textBoxProfileImage.y = this.textBoxProfileImage.y-5;
      this.textBoxProfileImage.setScale(.6);

    }

    activateTitleScreenTextbox(scene,isVisible,profileArray,text){

            this.setText(text);
            this.formatText();
            this.setProfileArray(profileArray);
            
            //makes the text box visible
            if(this.blockVisiblity === false){
              this.visible = true;
              this.textBoxProfileImage.visible = true;
              this.hideText(true);
            }
            
           
            this.displayText(0,textEnd);
            this.visible = isVisible;    
    }
}
