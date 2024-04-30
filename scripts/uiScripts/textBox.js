let currentTextBox;

const lineLength = 24;
const textEnd = 72;
class textBox extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,){
      
      super(scene, xPos, yPos);
      
      this.setDepth(50);
      scene.add.existing(this);
      this.visible = false;
      this.setScrollFactor(0);
      this.setScale(.7);

      //makes base sprite to boarder the text
      this.outSide = scene.add.sprite(0, 0, 'textBox');
      this.add(this.outSide);

      //sets up text for the textbox
      this.lines = [];
      let spacing = -200
      let y = -20
      for(let i = 0; i < textEnd; i++){
        let textChar = new textBoxCharacter(scene, spacing, y);
        textChar.setScale(1/6);
        this.add(textChar);

        this.lines.push(textChar);
        spacing = spacing + 20;
        if(i === lineLength || i === lineLength*2){
          y += 20;
          spacing = -200;
        }

      }

      //displays prtofile sprite meant to resemble what is currently talking to the player.
      this.textBoxProfileImage = new textBoxProfile(scene, -250, 0);
      this.add(this.textBoxProfileImage);
      
      this.currentText = "empty";
      this.finishedDisplayingText = false;
      this.textCoolDown = true;
      this.startPostion = 0;
      this.endPosition = 0;
      currentTextBox = this;
      this.textBoxActivationCoolDown = false;
      this.profileArray;
      this.profileArrayPosition = 0;

    
      
    }
    // we need to pause the game when player is in a text box.
    // there should only one textbox entity per scene
    // the thing talking to the player needs to have a profile that fits within the text box.
    // the characters will be an array of character objects. this entity will be given a string that is then parsed and displayed by the char objects.
    // if the word is cut off by a nextline then maybe back petal until we hit a space and put that word on the next line.
    // or we could just send it the text line by line? which ever is more efficient.
    hideText(hideBool){
      for(let counter = 0;counter < this.lines.length-1;counter++){
        this.lines[counter].visible = hideBool;
      }
    }
    activateTextBox(scene1,keyW){
      console.log("textbox",this);
      //console.log("activating text box");
      //console.log("this.textBoxActivationCoolDown: "+ this.textBoxActivationCoolDown);
      if(this.textBoxActivationCoolDown === false){

        if(this.textCoolDown){
        this.visible = true;
        this.textBoxProfileImage.visible = true;
        this.hideText(true);
        scene1.isPaused = true;
        scene1.pausedInTextBox = true;
        //console.log("scene1.isPaused: "+ scene1.isPaused);
      }
      
      //first we want to display the beginning part of the text. if the text is shorter that 87 chars
      //then we want to skip the while loop allowing ups to display text cause all text has been displayed.
    
        //console.log("generating text");
        //if we are waiting for the player to press w then we stop displaying more text.
      if(Phaser.Input.Keyboard.JustDown(keyW)){
        // loop gest start and end position
      this.startPosition = this.endPosition;
      this.endPosition = this.endPosition+textEnd;
      this.displayText(this.startPosition,this.endPosition);
      if(this.profileArrayPosition < this.profileArray.length-1){
        this.profileArrayPosition++;
      }
      this.textCoolDown = false;
      setTimeout(function(){
        //console.log("delay end for text box");
        
        currentTextBox.textCoolDown =  true;
        },300);
      }
    
    //console.log("this.endPosition: "+ this.endPosition)
    //console.log(" this.currentText: "+this.currentText);
    //console.log(" this.currentText.length-1: "+this.currentText.length-1);
    if(this.endPosition-textEnd > this.currentText.length-1){
      //this.finishedDisplayingText = true;
      scene1.isPaused = false;
      scene1.pausedInTextBox = false;
      this.visible = false;
      this.textBoxProfileImage.visible = false;
      this.hideText(false);
      this.startPosition = 0;
      this.endPosition = 0;
      this.textBoxActivationCoolDown = true;
      this.profileArrayPosition = 0;
      setTimeout(function(){
        console.log("delay end for text box");
        
        currentTextBox.textBoxActivationCoolDown =  false;
        },1000);
    }
  }

  
  
    }
    // this. line and two numbers representing the start and end location of the text to be display.
    displayText(start,end){
      let textPos = 0;
      for(let counter = start;counter < end;counter++){
        if(counter < this.currentText.length-1){
          this.lines[textPos].anims.play(this.currentText.charAt(counter).toUpperCase());
        }else{
          this.lines[textPos].anims.play(' ');
        }
        textPos++;
      }
      this.textBoxProfileImage.anims.play(this.profileArray[this.profileArrayPosition]);
    }

    formatText(){
      let tempString = "";
      let formatingCounter = 0;
      let BackPetal = 0;
      let BackPetalString = "";
      let spacing = "";
      let FrontPetalString = "";
      let backString = "";
      for(let counter = 0;counter < this.currentText.length;counter++){

        // if the line has letters or symbols that get cut of to the next line we want to add spaces.
        //
        if(formatingCounter == lineLength && this.currentText.charAt(counter) !== ' '){
          for(let index = tempString.length;index > 0;index--){
            if(tempString.charAt(index) !== ' '){
              BackPetal++;
              BackPetalString = tempString.charAt(index) + BackPetalString;
              if(index === 1){

              }
            }else if(tempString.charAt(index) === ' '){
              for(let coun = 0;coun < BackPetal;coun++){
                spacing += " ";
                
              }
              for(let coun = counter; coun <this.currentText.length;coun++){
                FrontPetalString += this.currentText.charAt(coun);
              }
              for(let coun = counter-BackPetal;coun >= 0;coun--){
                backString =  this.currentText.charAt(coun)+ backString;
              }
              
              //console.log("backString: "+backString);
              //console.log("spacing: ("+spacing+")");
              //console.log("BackPetalString: "+BackPetalString);
              //console.log("FrontPetalString: "+FrontPetalString);
              
              
              this.currentText = backString + spacing + BackPetalString + FrontPetalString;
              //console.log("====================================================");
              //console.log("this.currentText: "+this.currentText);
              //console.log("==========================================================================================");
              BackPetal = 0;
              BackPetalString = "";
              backString="";
              spacing = "";
              FrontPetalString = "";
              

              break;
            }

          }
          
          tempString = "";
          formatingCounter = 0;
        }else if(formatingCounter === lineLength+1){
          formatingCounter = 0;
        }
        //console.log("formatingCounter: "+formatingCounter);
        formatingCounter++;
        tempString += this.currentText.charAt(counter);
      }
      

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

    activateTitleScreenTextbox(scene,keyW,isVisible,profileArray,text){
            this.setText(text);
            this.formatText();
            this.setProfileArray(this.profileArray);
            this.activateTextBox(scene,keyW,);
            //this.hideText(isVisible);
            this.setProfileArray(profileArray);
            this.displayText(0,textEnd);
            this.visible = isVisible;
            console.log("textbox",this);
            
    }
}
