//https://stackoverflow.com/questions/71266893/phaser-3-change-hitbox-interactive-area-of-sprite-without-physics

let skillThat;
class skills extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'skill');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('skill', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'cover',frames: this.anims.generateFrameNames('skill', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'back',frames: this.anims.generateFrameNames('skill', { start: 2, end: 2 }),frameRate: 10,repeat: -1});

      if(scene.playerSex === 0){
        this.anims.create({key: 'jump',frames: this.anims.generateFrameNames('skill', { start: 3, end: 11 }),frameRate: 10,repeat: -1});
      }else if(scene.playerSex === 1){
        this.anims.create({key: 'jump',frames: this.anims.generateFrameNames('skill', { start: 12, end: 22 }),frameRate: 10,repeat: -1});
      }
      

      this.anims.play("closed");

      
      this.setDepth(60);
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.isOpen = false;
      this.index = 0;
      this.visible = false;
      this.openDelay = false;
      skillThat = this;
      this.pageNumber = 0;
      this.setScale(.4);
      
      this.skillsTextList = {
        jump: {
          title:"DOUBLE JUMP",
          summary:"PRESS SPACE WHILE IN THE AIR TO PERFORM A EXTRA JUMP.",
        },
        dash: {
          title:"DASH",
          summary:"HOLD S AND A OR D TO DASH.",
        },
        strength:{
          title:"STRENGTH",
          summary:"YOUR STRONGER AND ABLE TO MOVE HEAVY OBJECTS.",
        },
        mimic:{
          title:"MIMIC",
          summary:"PRESS S AND CTRLS TO CREATE A ILLUSION.",
        },
        looting:{
          title:"LOOTING",
          summary:"YOU ARE 20% MORE LIKELY TO FIND LOOT WHEN DEFEATING ENEMYS.",
        },
        back:{
          title:"SKILLS",
          summary:"THIS BOOK CAN REMIND YOU HOW THE CURSE SKILL WORK. THE ABILITYS ARE OFTEN GRANTED TO THOSE WHO BEFRIEND THE CURSED."
        }
      };

      
      this.skillLeft = new UIControls(scene,this.x-80,this.y+100,"UIControls").setInteractive();
      this.skillLeft.anims.play("pointLeft");
      this.skillLeft.visible = false;
      this.skillRight = new UIControls(scene,this.x+80,this.y+100,"UIControls").setInteractive();
      this.skillRight.anims.play("pointRight");
      this.skillRight.visible = false;


      this.activeskillPages = [];
      this.activeskillPages.push('cover');
      for(let [key,value] of Object.entries(scene.playerSkillsData)){
        console.log("key: ",key," value: ",value);
        if(value === 1){
          this.activeskillPages.push(key.toString());
        }
      }
      this.activeskillPages.push('back');
      console.log(this.activeskillPages);

      let startingX = -30;
      let startingY = -120;
      let spacing = 0;

      let titleSize = "PLACEHOLDER SKILL TITLE";
      this.titleCharacters = new Phaser.GameObjects.Group(scene);
      this.skillTitle = [];
      for(let counter = 0;counter<titleSize.length;counter++){
        this.skillTitle.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
        this.titleCharacters.add(this.skillTitle[counter]);
        this.skillTitle[counter].setScale(.15);
        this.skillTitle[counter].setDepth(70);
        this.skillTitle[counter].anims.play(titleSize.charAt(counter));
        this.skillTitle[counter].x = this.skillTitle[counter].x + spacing;
        this.skillTitle[counter].y = this.skillTitle[counter].y + 7;
        spacing = spacing + 7;
      }

      startingX = -80;
      startingY = 60;
      spacing = 0;
      let rowSpacing = 0;
      let rowCounter = 0;

      this.summarySize = "+_________________________+_________________________+_________________________+_________________________+_________________________+";
      this.formattedString = "";
      this.summaryCharacters = new Phaser.GameObjects.Group(scene);
      this.skillSummary = [];
      for(let counter = 0;counter<this.summarySize.length;counter++){
        this.skillSummary.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
        //this.skillSummary[counter].visible = true;
        this.summaryCharacters.add(this.skillSummary[counter]);
        this.skillSummary[counter].setScale(.15);
        this.skillSummary[counter].setDepth(70);
        this.skillSummary[counter].anims.play(this.summarySize.charAt(counter));
        this.skillSummary[counter].x = this.skillSummary[counter].x + spacing;
        this.skillSummary[counter].y = this.skillSummary[counter].y + rowSpacing;
        spacing = spacing + 7;
        rowCounter++;
        if(rowCounter === 25){
          rowCounter = 0;
          spacing = 0;
          rowSpacing += 8;

        }
      }

      
    }

    openSkill(scene){
         
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;

            console.log("this.isOpen from skill "+this.isOpen);
            this.anims.play(this.activeskillPages[this.pageNumber]);
            this.openDelay = true;
            this.setScale(.5);
            this.setDepth(60);
            this.skillLeft.x = this.x-100;
            this.skillLeft.y = this.y+120;
            this.skillRight.x = this.x+100;
            this.skillRight.y = this.y+120;
            
            setTimeout(function(){
              skillThat.openDelay = false; 
              },250);

              if(this.pageNumber === 0){
                this.skillLeft.visible = false;
                this.skillRight.visible = true;
                this.displayskillText(false);
              }else if(this.pageNumber === this.activeskillPages.length-1){
               this.skillLeft.visible = true;
                this.skillRight.visible = false;
                this.setskillInfo();
                this.displayskillText(true);
              }else{
                this.skillLeft.visible = true;
                this.skillRight.visible = true;
                this.setskillInfo();
                this.displayskillText(true);
                
              }

        }else if(this.isOpen === true && this.openDelay === false){
            this.openDelay = true;
            this.isOpen = false;
            this.anims.play('closed');
            this.setScale(.4)
            this.setDepth(50);
            this.displayskillText(false);
            setTimeout(function(){
              console.log("skill openDelay set to false");
              skillThat.openDelay = false; 
              },1000);
              this.skillLeft.visible = false;
             this.skillRight.visible = false;
              //scene.skillExit.visible = false;
        }

    }

    applyUIControlElements(){
    
      // page number is being refrenced improprly scene.inventory.bestuaryui.pagenumber
      this.skillRight.on('pointerdown', function (pointer) {
        console.log(" activating skill turn page right. scene.skillUI.pageNumber" +  skillThat.pageNumber);
        console.log(" pageID: ", skillThat.activeskillPages[skillThat.pageNumber]);
        skillThat.displayskillText(true);
        if(skillThat.pageNumber >= 0 && skillThat.pageNumber < skillThat.activeskillPages.length ){
          skillThat.pageNumber++;
          skillThat.setskillInfo();
          skillThat.anims.play(skillThat.activeskillPages[skillThat.pageNumber]);
          //SET DESCRIPTION HERE
          if(skillThat.pageNumber === skillThat.activeskillPages.length-1){
            console.log(" hiding right skill arrow" );
            skillThat.skillRight.visible = false;  
            skillThat.skillLeft.visible = true;  
          }else{
            skillThat.skillLeft.visible = true;
            skillThat.skillRight.visible = true;
          }
        }

        
        
      });
      this.skillLeft.on('pointerdown', function (pointer) {
        console.log(" activating skill turn page left scene.skillUI.pageNumber" + skillThat.pageNumber);
        if(skillThat.pageNumber > 0 && skillThat.pageNumber <= skillThat.activeskillPages.length ){
          skillThat.pageNumber--;
          skillThat.setskillInfo();
          skillThat.anims.play(skillThat.activeskillPages[skillThat.pageNumber]);
          if(skillThat.pageNumber === 0){
            console.log(" hiding left skill arrow" );
            skillThat.displayskillText(false);
            skillThat.skillLeft.visible = false;
            skillThat.skillRight.visible = true;
          }else{
            skillThat.displayskillText(true);
            skillThat.skillLeft.visible = true;
            skillThat.skillRight.visible = true;
          }
        }
        
        
      });
   
    }

    displayskillText(isVisible){
 
      if(isVisible === true && this.skillTitle[0].visible === false || isVisible === false && this.skillTitle[0].visible === true){
        this.titleCharacters.toggleVisible();
        this.summaryCharacters.toggleVisible();
      }

      

    
      
    }

    setskillInfo(){

      for(let [mainKey,value] of Object.entries(this.skillsTextList)){
        if(this.activeskillPages[this.pageNumber] === mainKey){
          for(let counter = 0;counter < this.skillTitle.length;counter++){

            if(counter < value.title.length){
              this.skillTitle[counter].anims.play(value.title.charAt(counter));
            }else{
              this.skillTitle[counter].anims.play(" ");
            }
          
          }
          
          this.formattedString = value.summary;
          this.formatSummary();

          for(let counter = 0;counter < this.skillSummary.length;counter++){

            if(counter < this.formattedString.length){
              //this.summarySize.charAt(counter) = value.summary.charAt(counter);
              this.skillSummary[counter].anims.play(this.formattedString.charAt(counter));
            }else{
              this.skillSummary[counter].anims.play(" ");
            }
          
          }
          
        }
        
      }

    }

    formatSummary(){
      let tempString = "";
      let formatingCounter = 0;
      let BackPetal = 0;
      let BackPetalString = "";
      let spacing = "";
      let FrontPetalString = "";
      let backString = "";
      for(let counter = 0;counter < this.formattedString.length;counter++){

        // if the line has letters or symbols that get cut of to the next line we want to add spaces.
        //
        if(formatingCounter === 17 && this.formattedString.charAt(counter) !== ' '){
          for(let index = tempString.length;index > 0;index--){
            if(tempString.charAt(index) !== ' '){
              BackPetal++;
              BackPetalString = tempString.charAt(index) + BackPetalString;
              if(index === 1){

              }
            }else if(tempString.charAt(index) === ' '){
              for(let coun = 0;coun < BackPetal-1;coun++){
                spacing += " ";
                
              }
              for(let coun = counter; coun <this.formattedString.length;coun++){
                FrontPetalString += this.formattedString.charAt(coun);
              }
              for(let coun = counter-BackPetal;coun >= 0;coun--){
                backString =  this.formattedString.charAt(coun)+ backString;
              }
              
              //console.log("backString: "+backString);
              //console.log("spacing: ("+spacing+")");
              //console.log("BackPetalString: "+BackPetalString);
              //console.log("FrontPetalString: "+FrontPetalString);
              
              
              this.formattedString = backString + spacing + BackPetalString + FrontPetalString;
             // console.log("====================================================");
              //console.log("this.currentText: "+this.formattedString);
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
        }else if(formatingCounter === 17){
          formatingCounter = 0;
        }
        //console.log("formatingCounter: "+formatingCounter);
        formatingCounter++;
        tempString += this.formattedString.charAt(counter);
      }
      

    }
}