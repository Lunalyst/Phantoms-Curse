let currentTextBox;
class textBox extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'textBox');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.6);
      this.lines = [
        this.c1 = new textBoxCharacter(scene, 340, 605),
        this.c2 = new textBoxCharacter(scene, 350, 605),
        this.c3 = new textBoxCharacter(scene, 360, 605),
        this.c4 = new textBoxCharacter(scene, 370, 605),
        this.c5 = new textBoxCharacter(scene, 380, 605),
        this.c6 = new textBoxCharacter(scene, 390, 605),
        this.c7 = new textBoxCharacter(scene, 400, 605),
        this.c8 = new textBoxCharacter(scene, 410, 605),
        this.c9 = new textBoxCharacter(scene, 420, 605),
        this.c10 = new textBoxCharacter(scene, 430, 605),
        this.c11 = new textBoxCharacter(scene, 440, 605),
        this.c12 = new textBoxCharacter(scene, 450, 605),
        this.c13 = new textBoxCharacter(scene, 460, 605),
        this.c14 = new textBoxCharacter(scene, 470, 605),
        this.c15 = new textBoxCharacter(scene, 480, 605),
        this.c16 = new textBoxCharacter(scene, 490, 605),
        this.c17 = new textBoxCharacter(scene, 500, 605),
        this.c18 = new textBoxCharacter(scene, 510, 605),
        this.c19 = new textBoxCharacter(scene, 520, 605),
        this.c20 = new textBoxCharacter(scene, 530, 605),
        this.c21 = new textBoxCharacter(scene, 540, 605),
        this.c22 = new textBoxCharacter(scene, 550, 605),
        this.c23 = new textBoxCharacter(scene, 560, 605),
        this.c24 = new textBoxCharacter(scene, 570, 605),
        this.c25 = new textBoxCharacter(scene, 580, 605),
        this.c26 = new textBoxCharacter(scene, 590, 605),
        this.c27 = new textBoxCharacter(scene, 600, 605),
        this.c28 = new textBoxCharacter(scene, 610, 605),
        this.c29 = new textBoxCharacter(scene, 620, 605),
        this.c30 = new textBoxCharacter(scene, 340, 620),
        this.c31 = new textBoxCharacter(scene, 350, 620),
        this.c32 = new textBoxCharacter(scene, 360, 620),
        this.c33 = new textBoxCharacter(scene, 370, 620),
        this.c34 = new textBoxCharacter(scene, 380, 620),
        this.c35 = new textBoxCharacter(scene, 390, 620),
        this.c36 = new textBoxCharacter(scene, 400, 620),
        this.c37 = new textBoxCharacter(scene, 410, 620),
        this.c38 = new textBoxCharacter(scene, 420, 620),
        this.c39 = new textBoxCharacter(scene, 430, 620),
        this.c40 = new textBoxCharacter(scene, 440, 620),
        this.c41 = new textBoxCharacter(scene, 450, 620),
        this.c42 = new textBoxCharacter(scene, 460, 620),
        this.c43 = new textBoxCharacter(scene, 470, 620),
        this.c44 = new textBoxCharacter(scene, 480, 620),
        this.c45 = new textBoxCharacter(scene, 490, 620),
        this.c46 = new textBoxCharacter(scene, 500, 620),
        this.c47 = new textBoxCharacter(scene, 510, 620),
        this.c48 = new textBoxCharacter(scene, 520, 620),
        this.c49 = new textBoxCharacter(scene, 530, 620),
        this.c50 = new textBoxCharacter(scene, 540, 620),
        this.c51 = new textBoxCharacter(scene, 550, 620),
        this.c52 = new textBoxCharacter(scene, 560, 620),
        this.c53 = new textBoxCharacter(scene, 570, 620),
        this.c54 = new textBoxCharacter(scene, 580, 620),
        this.c55 = new textBoxCharacter(scene, 590, 620),
        this.c56 = new textBoxCharacter(scene, 600, 620),
        this.c57 = new textBoxCharacter(scene, 610, 620),
        this.c58 = new textBoxCharacter(scene, 620, 620),
        this.c59 = new textBoxCharacter(scene, 340, 635),
        this.c60 = new textBoxCharacter(scene, 350, 635),
        this.c61 = new textBoxCharacter(scene, 360, 635),
        this.c62 = new textBoxCharacter(scene, 370, 635),
        this.c63 = new textBoxCharacter(scene, 380, 635),
        this.c64 = new textBoxCharacter(scene, 390, 635),
        this.c65 = new textBoxCharacter(scene, 400, 635),
        this.c66 = new textBoxCharacter(scene, 410, 635),
        this.c67 = new textBoxCharacter(scene, 420, 635),
        this.c68 = new textBoxCharacter(scene, 430, 635),
        this.c69 = new textBoxCharacter(scene, 440, 635),
        this.c70 = new textBoxCharacter(scene, 450, 635),
        this.c71 = new textBoxCharacter(scene, 460, 635),
        this.c72 = new textBoxCharacter(scene, 470, 635),
        this.c73 = new textBoxCharacter(scene, 480, 635),
        this.c74 = new textBoxCharacter(scene, 490, 635),
        this.c75 = new textBoxCharacter(scene, 500, 635),
        this.c76 = new textBoxCharacter(scene, 510, 635),
        this.c77 = new textBoxCharacter(scene, 520, 635),
        this.c78 = new textBoxCharacter(scene, 530, 635),
        this.c79 = new textBoxCharacter(scene, 540, 635),
        this.c80 = new textBoxCharacter(scene, 550, 635),
        this.c81 = new textBoxCharacter(scene, 560, 635),
        this.c82 = new textBoxCharacter(scene, 570, 635),
        this.c83 = new textBoxCharacter(scene, 580, 635),
        this.c84 = new textBoxCharacter(scene, 590, 635),
        this.c85 = new textBoxCharacter(scene, 600, 635),
        this.c86 = new textBoxCharacter(scene, 610, 635),
        this.c87 = new textBoxCharacter(scene, 620, 635)
      ];
      this.currentText = "empty";
      this.finishedDisplayingText = false;
      this.textCoolDown = true;
      this.startPostion = 0;
      this.endPosition = 0;
      currentTextBox = this;
      this.textBoxActivationCoolDown = false;
      this.textBoxProfileImage = new textBoxProfile(scene, 310, 624);
      this.textBoxProfileImage.visible = false;
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
      this.endPosition = this.endPosition+87;
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
    if(this.endPosition-87 > this.currentText.length-1){
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
        if(formatingCounter == 29 && this.currentText.charAt(counter) !== ' '){
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
              
              console.log("backString: "+backString);
              console.log("spacing: ("+spacing+")");
              console.log("BackPetalString: "+BackPetalString);
              console.log("FrontPetalString: "+FrontPetalString);
              
              
              this.currentText = backString + spacing + BackPetalString + FrontPetalString;
              console.log("====================================================");
              console.log("this.currentText: "+this.currentText);
              console.log("==========================================================================================");
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
        }else if(formatingCounter === 29){
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
        if(lineCounter === 29){
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
            this.hideText(isVisible);
            this.setProfileArray(profileArray);
            this.displayText(0,87);
            this.textBoxProfileImage.visible = isVisible;
            this.visible = isVisible;
            
    }
}
