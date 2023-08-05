class saveSlot extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'saveSlot');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.characterSexSlot;
      this.visible = false; 

      this.sexIcon = new sexMark(scene, this.x-340, this.y-10);
      this.healthIcon = new healthMark(scene, this.x-340, this.y+45);
      this.bestiaryIcon = new bestiaryMark(scene, this.x-260, this.y-10);
      this.shellIcon = new shellMark(scene, this.x-260, this.y+45);

      let startingX = -375;
      let startingY = -40;
      let spacing = 0;
      let rows = 0;

      this.slotLetters = [
        this.c1 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c2 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c3 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c4 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c5 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c6 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
      ];

      for(let counter = 0; counter < this.slotLetters.length; counter++){

        this.slotLetters[counter].x = this.slotLetters[counter].x + spacing;
        this.slotLetters[counter].y = this.slotLetters[counter].y - 23;
          spacing = spacing + 15;

        
      }

      this.c1.anims.play("S");
      this.c2.anims.play("L");
      this.c3.anims.play("O");
      this.c4.anims.play("T");
      this.c5.anims.play(":");
      this.c6.anims.play("?");

      startingX = -110;
      startingY = -0;
      spacing = 0;
      rows = 0;

      this.skillMarks = [
        this.s1 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s2 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s3 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s4 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s5 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s6 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s7 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s8 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s9 = new skillMark(scene, this.x + startingX, this.y + startingY),
        this.s10 = new skillMark(scene, this.x + startingX, this.y + startingY),
        //this.s6 = new skillMark(scene, this.x, this.y-30),
      ];
      
      

      for(let counter = 0; counter < this.skillMarks.length; counter++){

        if(counter === 5){
          rows++;
          spacing = 0;
        }

        if(rows === 0){
          this.skillMarks[counter].x = this.skillMarks[counter].x + spacing;
          this.skillMarks[counter].y = this.skillMarks[counter].y - 23;
          spacing = spacing + 40;
        }else if(rows === 1){
          this.skillMarks[counter].x = this.skillMarks[counter].x + spacing;
          this.skillMarks[counter].y = this.skillMarks[counter].y + 23;
          spacing = spacing + 40;
        }

        
      }
    
      startingX = -120;
      startingY = -40;
      spacing = 0;
      rows = 0;

      this.skillLetters = [
        this.c7 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c8 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c9 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c10 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c11 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c12 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c13 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY)
      ];

      
      for(let counter = 0; counter < this.skillLetters.length; counter++){
        
        this.skillLetters[counter].x = this.skillLetters[counter].x + spacing;
        this.skillLetters[counter].y = this.skillLetters[counter].y - 23;
          spacing = spacing + 15;
          
      }

      this.c7.anims.play("S");
      this.c8.anims.play("K");
      this.c9.anims.play("I");
      this.c10.anims.play("L");
      this.c11.anims.play("L");
      this.c12.anims.play("S");
      this.c13.anims.play(":");


      startingX = -220;
      startingY = 70;
      spacing = 0;
      rows = 0;

      this.shellLetters = [
        this.c17 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c18 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c19 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
      ];

      for(let counter = 0; counter < this.shellLetters.length; counter++){
        
        this.shellLetters[counter].x = this.shellLetters[counter].x + spacing;
        this.shellLetters[counter].y = this.shellLetters[counter].y - 23;
          spacing = spacing + 25;
          
      }

      this.c17.anims.play("0");
      this.c18.anims.play("0");
      this.c19.anims.play("0");

      startingX = -220;
      startingY = 12;
      spacing = 0;
      rows = 0;

      this.bestiaryLetters = [
        this.c20 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c21 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY),
        this.c22 = new textBoxCharacter(scene, this.x + startingX, this.y + startingY)
      ];

      for(let counter = 0; counter < this.bestiaryLetters.length; counter++){
        
        this.bestiaryLetters[counter].x = this.bestiaryLetters[counter].x + spacing;
        this.bestiaryLetters[counter].y = this.bestiaryLetters[counter].y - 23;
          spacing = spacing + 25;
          
      }

      this.c20.anims.play("0");
      this.c21.anims.play("0");
      this.c22.anims.play("%");
      
      
    
      //this.setDepth(70);
      this.setScale(.6);
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      //this.openDelay = false;
      
    }
    
    showSlot(){
      if(this.visible === true){
        this.sexIcon.visible = true;
        this.healthIcon.visible = true;
        this.bestiaryIcon.visible = true;
        this.shellIcon.visible = true;
        for(let counter = 0; counter < this.slotLetters.length; counter++){
          this.slotLetters[counter].visible = true;
          this.slotLetters[counter].setScale(.3);
        }
        for(let counter = 0; counter < this.skillLetters.length; counter++){
          this.skillLetters[counter].visible = true;
          this.skillLetters[counter].setScale(.3);
        }
        for(let counter = 0; counter < this.shellLetters.length; counter++){
          this.shellLetters[counter].visible = true;            
          this.shellLetters[counter].setScale(.5);
        }
        for(let counter = 0; counter < this.bestiaryLetters.length; counter++){
          this.bestiaryLetters[counter].visible = true;
          this.bestiaryLetters[counter].setScale(.5);
        }
      }else{
        this.sexIcon.visible = false;
        this.healthIcon.visible = false;
        this.bestiaryIcon.visible = false;
        this.shellIcon.visible = false;
        for(let counter = 0; counter < this.skillMarks.length; counter++){
          this.skillMarks[counter].visible = false;
        }
        for(let counter = 0; counter < this.slotLetters.length; counter++){
          this.slotLetters[counter].visible = false;
        }
        for(let counter = 0; counter < this.skillLetters.length; counter++){
          this.skillLetters[counter].visible = false;
        }
        for(let counter = 0; counter < this.shellLetters.length; counter++){
          this.shellLetters[counter].visible = false;
        }
        for(let counter = 0; counter < this.bestiaryLetters.length; counter++){
          this.bestiaryLetters[counter].visible = false;
        }
      }
    }

    setSkillDisplay(scene){
      // sets the skills from the savefile to be displayed.
      let animationNumber = "";
      if(scene.playerSaveSlotData != undefined){
      for(let counter = 0; counter < scene.playerSkillsData.length;counter++){
       // console.log("scene.playerSkillsData[counter]: "+scene.playerSkillsData[counter] +" this.skillMarks.length "+this.skillMarks.length+" scene.playerSkillsData.length "+scene.playerSkillsData.length);
        //console.log("scene.playerSkillsData[counter]: "+scene.playerSkillsData[counter] +" this.skillMarks[counter] "+this.skillMarks[counter]);
        if(scene.playerSkillsData[counter] != 0){
          //console.log("setting skill: "+scene.playerSkillsData[counter]);
          this.skillMarks[counter].anims.play(scene.playerSkillsData[counter].toString());
          this.skillMarks[counter].visible = true;
        }else{
          //console.log("skill blank because it is set to zero.");
          this.skillMarks[counter].visible = false;
        }
        
      }
    }
      // sets the sexicon to reflect the save data
      //undefined when comparing with object does explicit type conversions which can be true when they should be false. to get around this we use the explicit !== operator.
      if(scene.playerSex !== undefined){
        //animationNumber = scene.playerSaveSlotData[0];
        //console.log("scene.playerSaveSlotData[0]: "+scene.playerSaveSlotData[0]);
        //console.log("seting sexicon to animationNumber: "+animationNumber);
        this.sexIcon.anims.play(scene.playerSex.toString());
      }else{
        this.sexIcon.anims.play("2");
      }

        //sets the slot number character to be correct.
        if(scene.tempNewGameSlotID !== undefined){
          
          //console.log("seting sexicon to animationNumber: "+animationNumber);
          this.c6.anims.play(scene.tempNewGameSlotID.toString());
        }else{
          this.c6.anims.play("?");
        }
        
        if(scene.playerHealth !== undefined){
          animationNumber = "";
          animationNumber = animationNumber + scene.playerHealth;
          console.log("animationNumber for hp: "+ animationNumber);
          this.healthIcon.anims.play(animationNumber);
        }else{
          this.healthIcon.anims.play("6");
        }

        if(scene.playerSaveSlotData[1] !== undefined){
          animationNumber = "";
          animationNumber += scene.playerSaveSlotData[1];
          console.log("animationNumber for currency: " +animationNumber);
            for(let counter = 0; counter < this.shellLetters.length; counter++){
                if(counter < animationNumber.length ){
                  this.shellLetters[counter].anims.play(animationNumber.charAt(counter));  
                }else{
                  this.shellLetters[counter].visible = false;
                }
            }

          }

          if(scene.playerSaveSlotData[2] !== undefined){
            animationNumber = "";
            animationNumber += scene.playerSaveSlotData[2];
            //console.log("animationNumber for bestiary percent: " +animationNumber);
              for(let counter = 0; counter < this.bestiaryLetters.length-1; counter++){

                    this.bestiaryLetters[counter].anims.play(animationNumber.charAt(counter));  
                  
              }
  
            }

        
          
       
    
        animationNumber = "";
        animationNumber = animationNumber + scene.playerSaveSlotData[2];
        for(let counter = 0; counter < this.bestiaryLetters.length; counter++){
          
        }
      
      
    }
    
}