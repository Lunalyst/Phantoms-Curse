let that;

const bestiaryLineLength = 14;
class bestiary extends Phaser.Physics.Arcade.Sprite {
  // every class needs constructor
  constructor(scene, xPos, yPos,xOpen,yOpen ) {
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos, 'bestiary');
    //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
    //so here in the subclass of sprite its refering to the image object we just made. 

    //adds this object to the scene.
    scene.add.existing(this);

    this.anims.create({ key: 'closed', frames: this.anims.generateFrameNames('bestiary1', { start: 0, end: 0 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'cover', frames: this.anims.generateFrameNames('bestiary1', { start: 1, end: 1 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'back', frames: this.anims.generateFrameNames('bestiary1', { start: 2, end: 2 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: bestiaryKey.blueSlimeTF, frames: this.anims.generateFrameNames('bestiary1', { start: 3, end: 3 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.blueSlimeLargeTF, frames: this.anims.generateFrameNames('bestiary1', { start: 4, end: 4 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.tigerFemaleVore, frames: this.anims.generateFrameNames('bestiary1', { start: 5, end: 5 }), frameRate: 7, repeat: -1 });
	  this.anims.create({ key: bestiaryKey.tigerFemaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 10, end: 10 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.tigerMaleVore, frames: this.anims.generateFrameNames('bestiary2', { start: 5, end: 5 }), frameRate: 7, repeat: -1 });
	  this.anims.create({ key: bestiaryKey.tigerMaleTF, frames: this.anims.generateFrameNames('bestiary2', { start: 6, end: 6 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.rabbitMaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 6, end: 6 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.rabbitFemaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 7, end: 7 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.beeDroneMaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 8, end: 8 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.beeDroneFemaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 9, end: 9 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.batMaleVore, frames: this.anims.generateFrameNames('bestiary1', { start: 11, end: 11 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.batFemaleVore, frames: this.anims.generateFrameNames('bestiary1', { start: 12, end: 12 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.blueSlimeHSVore, frames: this.anims.generateFrameNames('bestiary1', { start: 13, end: 13 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.blueSlimeMaleHMVore, frames: this.anims.generateFrameNames('bestiary1', { start: 14, end: 14 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.blueSlimeFemaleHMVore, frames: this.anims.generateFrameNames('bestiary1', { start: 15, end: 15 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.mimicFemaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 16, end: 16 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.mimicFemaleVore, frames: this.anims.generateFrameNames('bestiary1', { start: 17, end: 17 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.mimicMaleTF, frames: this.anims.generateFrameNames('bestiary1', { start: 18, end:  18 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.mimicMaleVore, frames: this.anims.generateFrameNames('bestiary1', { start: 19, end: 19 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.istaraUnbirth, frames: this.anims.generateFrameNames('bestiary2', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.whiteCatMaleTF, frames: this.anims.generateFrameNames('bestiary2', { start: 1, end: 1 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.whiteCatFemaleTF, frames: this.anims.generateFrameNames('bestiary2', { start: 2, end: 2 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.whiteCatMaleVore, frames: this.anims.generateFrameNames('bestiary2', { start: 3, end: 3 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.whiteCatFemaleVore, frames: this.anims.generateFrameNames('bestiary2', { start: 4, end: 4 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.shadowCurse, frames: this.anims.generateFrameNames('bestiary2', { start: 7, end: 7 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.shadowEarie, frames: this.anims.generateFrameNames('bestiary2', { start: 8, end: 8 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.rabbitMaleVore, frames: this.anims.generateFrameNames('bestiary2', { start: 9, end: 9 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.rabbitFemaleVore, frames: this.anims.generateFrameNames('bestiary2', { start: 10, end: 10 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.vivianVore1, frames: this.anims.generateFrameNames('bestiary2', { start: 11, end: 11 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.vivianTF, frames: this.anims.generateFrameNames('bestiary2', { start: 12, end: 12 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: bestiaryKey.vivianVore2, frames: this.anims.generateFrameNames('bestiary2', { start: 13, end: 13 }), frameRate: 7, repeat: -1 });
    
    // the default animation for bestiary should be closed.
    this.anims.play("closed");

    this.setDepth(52);
    //connects the sprite to the camera so that it sticks with the player.
    this.setScrollFactor(0);
    this.isOpen = false;
    this.index = 0;
    this.visible = false;
    this.openDelay = false;

    this.originalX = xPos;
    this.originalY = yPos;

    this.openX = xOpen;
    this.openY = yOpen;

    console.log("this.originalX: ",this.originalX," this.originalY :",this.originalY);
    console.log("this.openX: ",this.openX," this.openY :",this.openY);

    that = this;
    //position in the array in our object
    this.pageNumber = 0;
    this.groupNumber = 0;
    //group in our array
    this.setScale(.45);
    
    //create refrence to bestiaryTextList where bestiary data is stored.
    this.bestiaryTextList = bestiaryTextList;
    
    //creates the buttons on the left and right of the bestiary menu when its open.
    this.bestiaryLeft = new UIControls(scene, this.openX - 170, this.openY + 280, "UIControls").setInteractive();
    this.bestiaryLeft.anims.play("pointLeft");
    this.bestiaryLeft.visible = false;
    this.bestiaryRight = new UIControls(scene, this.openX + 170, this.openY + 280, "UIControls").setInteractive();
    this.bestiaryRight.anims.play("pointRight");
    this.bestiaryRight.visible = false;

    this.bestiaryUp = new UIControls(scene, this.openX - 110, this.openY , "UIControls").setInteractive();
    this.bestiaryUp.anims.play("pointUp");
    this.bestiaryUp.visible = false;
    this.bestiaryDown = new UIControls(scene, this.openX - 110, this.openY + 300, "UIControls").setInteractive();
    this.bestiaryDown.anims.play("pointDown");
    this.bestiaryDown.visible = false;

    //sets up bestiary object, array 
    this.reloadBestiaryPages(scene,true);

    //handles the positioning of the title text sprites.
    let startingX = -190;
    let startingY = -215;
    let spacing = 0;

    let titleSize = "PLACEHOLDER MONSTER TITLE";
    this.titleCharacters = new Phaser.GameObjects.Group(scene);
    this.bestiaryTitle = [];
    for (let counter = 0; counter < titleSize.length; counter++) {
      this.bestiaryTitle.push(new textBoxCharacter(scene, this.openX + startingX, this.openY + startingY,'charBubble'));
      this.titleCharacters.add(this.bestiaryTitle[counter]);
      this.bestiaryTitle[counter].setScale(1/6);
      this.bestiaryTitle[counter].setDepth(70);
      this.bestiaryTitle[counter].anims.play(titleSize.charAt(counter));
      this.bestiaryTitle[counter].x = this.bestiaryTitle[counter].x + spacing;
      this.bestiaryTitle[counter].y = this.bestiaryTitle[counter].y + 9;
      spacing = spacing + 16;
    }

    //handles the summary character text sprites.
    startingX = -35;
    startingY = -180;
    spacing = 0;
    let rowSpacing = 0;
    let rowCounter = 0;

    this.summarySize = "+_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________+";
    this.formattedString = "";
    this.summaryCharacters = new Phaser.GameObjects.Group(scene);
    this.bestiarySummary = [];
    for (let counter = 0; counter < this.summarySize.length; counter++) {
      this.bestiarySummary.push(new textBoxCharacter(scene,this.openX + startingX, this.openY + startingY,'charBlack'));
      this.summaryCharacters.add(this.bestiarySummary[counter]);
      this.bestiarySummary[counter].setScale(1/6);
      this.bestiarySummary[counter].setDepth(70);
      this.bestiarySummary[counter].anims.play(this.summarySize.charAt(counter));
      this.bestiarySummary[counter].x = this.bestiarySummary[counter].x + spacing;
      this.bestiarySummary[counter].y = this.bestiarySummary[counter].y + rowSpacing;
      spacing = spacing + 16;
      rowCounter++;
      if (rowCounter === 15) {
        rowCounter = 0;
        spacing = 0;
        rowSpacing += 20;

      }
    }

    


  }

  

  reloadBestiaryPages(scene,startLoad){
    // when the scene is loaded, the bestiary fills this.activeBestiaryPages with the correct values from the scene.playerBestiaryData
    //delete all object in bestiary data
    if(startLoad === true){
      //create an empty object
      this.activeBestiaryPages = {};
      this.activeBestiaryGroups = [];

    }else{

      //clears already existing object.
      for (var member in this.activeBestiaryPages) {
        delete this.activeBestiaryPages[member];
      }

      this.activeBestiaryGroups = [];
    }

    //add key cover to object, which equals an array, with the string "cover" inside it 
    this.activeBestiaryPages["aaaaa"] = ["cover"];
    this.activeBestiaryGroups.push("aaaaa");

    // searches through all the keys of the bestiarydata
    for (let [key, value] of Object.entries(scene.playerBestiaryData)) {

      //if we find a bestiary entry the player has
      if (value === 1) {
        //console.log("key: ", key, " value: ", value);
        //first grab the species/type from the key string
        
        
        //temp variable to store species 
        let tempString = "";

        //loop to fill temp with the species. we stop once we hit a -
        for(let counter = 0; counter < key.length;counter++){

          //if the character is a underscore
          if(key[counter] === '_'){

            //break out of the loop
            break;

          //otherwise
          }else{

            //add character to our tempt string.
            tempString += key[counter];
          }
          

        }

        //console.log("tempString: ", tempString);

        // if the group does not exist
        if(this.activeBestiaryPages[tempString] !== undefined){
          //push the bestiary flag key to the array, at that species/type key.
          this.activeBestiaryPages[tempString].push(key);

        //otherwise
        }else{

          // define key in object, as an array, containing the current bestiary flag in that array
          this.activeBestiaryPages[tempString] = [key];

          //push temp string to groups array
          this.activeBestiaryGroups.push(tempString);

        }
      }
    }
    
    //add key cover to object, which equals an array, with the string "cover" inside it 
    this.activeBestiaryPages["zzzzz"] = ["back"];
    this.activeBestiaryGroups.push("zzzzz");

    console.log(this.activeBestiaryPages);
    console.log(this.activeBestiaryGroups);
  }

  //function opens the bestiary so the proper page is displayed when clicked on in the inventory.
  openBestiary(scene) {

    //if bestiary is close then open it and set open delay.
    if (this.isOpen === false && this.openDelay === false) {
      this.isOpen = true;
      console.log("this.isOpen from bestiary " + this.isOpen);
      this.anims.play(this.activeBestiaryPages[this.activeBestiaryGroups[this.groupNumber]][this.pageNumber]);
      this.openDelay = true;
      this.setScale(.9);
      this.setDepth(60);

      this.x = this.openX;
      this.y = this.openY;

      //this.x = 200;
      //this.y = 360;

      /*this.bestiaryLeft.x = this.x - 100;
      this.bestiaryLeft.y = this.y + 120;
      this.bestiaryRight.x = this.x + 100;
      this.bestiaryRight.y = this.y + 120;*/

      // delays how quickly the player can open the inventory.
      setTimeout(function () {
        that.openDelay = false;
      }, 250);

      //handle the group x value for display
      if (this.groupNumber === 0) {
        this.bestiaryLeft.visible = false;
        this.bestiaryRight.visible = true;
        this.displayBestiaryText(false);
      } else if (this.groupNumber === this.activeBestiaryGroups.length - 1) {
        this.bestiaryLeft.visible = true;
        this.bestiaryRight.visible = false;
        this.setBestiaryInfo();
        this.displayBestiaryText(true);
      } else {
        this.bestiaryLeft.visible = true;
        this.bestiaryRight.visible = true;
        this.setBestiaryInfo();
        this.displayBestiaryText(true);
      }

      //handle page number y for diaplying up and down buttons.
      if (this.pageNumber === 0 && this.activeBestiaryPages[this.activeBestiaryGroups[this.groupNumber]].length === 1) {
        this.bestiaryUp.visible = false;
        this.bestiaryDown.visible = false;
      }else if(this.pageNumber === 0){
        this.bestiaryUp.visible = true;
        this.bestiaryDown.visible = false;
      }else if (this.pageNumber === this.activeBestiaryPages[this.activeBestiaryGroups[this.groupNumber]].length - 1) {
        this.bestiaryUp.visible = false;
        this.bestiaryDown.visible = true;
      } else {
        this.bestiaryUp.visible = true;
        this.bestiaryDown.visible = true;
      }

    //if bestiary is open then close it and set open delay.
    } else if (this.isOpen === true && this.openDelay === false) {
      this.isOpen = false;
      this.setScale(.45);
      this.setDepth(52);

      this.x = this.originalX;
      this.y = this.originalY;

      this.anims.play("closed");
      this.openDelay = true;
      this.displayBestiaryText(false);

      // delays how quickly the player can open the inventory.
      setTimeout(function () {
        that.openDelay = false;
      }, 250);

      this.bestiaryLeft.visible = false;
      this.bestiaryRight.visible = false;
      this.bestiaryUp.visible = false;
      this.bestiaryDown.visible = false;
      
    }

  }
  // applys functionality to the buttons for the bestiary.
  applyUIControlElements() {

    this.bestiaryRight.on('pointerover',function(pointer){
      that.scene.initSoundEffect('buttonSFX','1',0.1);
      that.bestiaryRight.setTint(0xff7000);
    });

    this.bestiaryRight.on('pointerout',function(pointer){
      that.bestiaryRight.clearTint();
    });

    this.bestiaryRight.on('pointerdown', function (pointer) {
      //page sound effect
      that.scene.initSoundEffect('buttonSFX','page',0.05);

      console.log(" activating bestiary turn page right. scene.bestiaryUI.pageNumber" + that.pageNumber);
      console.log(" pageID: ", that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);
      that.displayBestiaryText(true);

      //if we are on any page fgrom 0 to n and the page number, is less than the groups.length
      if (that.groupNumber >= 0 && that.groupNumber < that.activeBestiaryGroups.length) {
        that.groupNumber++;
        that.pageNumber = 0;
        that.setBestiaryInfo();
        //play right bestiary frame
        that.anims.play(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);

        //hides or shows the buttons based on length of bestiary.
        if(that.groupNumber === that.activeBestiaryGroups.length - 1) {
          console.log(" hiding right bestiary arrow");
          that.bestiaryRight.visible = false;
          that.bestiaryLeft.visible = true;
        } else {
          that.bestiaryLeft.visible = true;
          that.bestiaryRight.visible = true;
        }

        //display up and down arrows approperiately.
        //hide both if the page only has one entry in the array
        if(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]].length === 1) {
          console.log("hiding both up and down arrows.");
          that.bestiaryUp.visible = false;
          that.bestiaryDown.visible = false;

        //otherwise set up arrow to be visible and down arrow to not be visible as this right button will always result in a position 0 for page number.
        }else{
          that.bestiaryUp.visible = true;
          that.bestiaryDown.visible = false;
        }
      }
       console.log("that.groupNumber " + that.groupNumber+ " that.pageNumber: ",that.pageNumber);

    });

    this.bestiaryLeft.on('pointerover',function(pointer){
      that.scene.initSoundEffect('buttonSFX','1',0.1);
      that.bestiaryLeft.setTint(0xff7000);
    });

    this.bestiaryLeft.on('pointerout',function(pointer){
      that.bestiaryLeft.clearTint();
    });

    this.bestiaryLeft.on('pointerdown', function (pointer) {
      console.log(" turning bestiary page left");
      console.log(" pageID: ", that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);

      that.scene.initSoundEffect('buttonSFX','page',0.05);

      //if the group array isnt out side the bounds of our group length
      if (that.groupNumber > 0 && that.groupNumber <= that.activeBestiaryGroups.length) {
        that.groupNumber--;
        that.pageNumber = 0;
        that.setBestiaryInfo();
        that.anims.play(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);


        if (that.groupNumber === 0) {
          console.log(" hiding left bestiary arrow");
          that.displayBestiaryText(false);
          that.bestiaryLeft.visible = false;
          that.bestiaryRight.visible = true;
        } else {
          that.displayBestiaryText(true);
          that.bestiaryLeft.visible = true;
          that.bestiaryRight.visible = true;
        }

        //display up and down arrows approperiately.
        //hide both if the page only has one entry in the array
        if(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]].length === 1) {
          console.log("hiding both up and down arrows.");
          that.bestiaryUp.visible = false;
          that.bestiaryDown.visible = false;

        //otherwise set up arrow to be visible and down arrow to not be visible as this right button will always result in a position 0 for page number.
        }else{
          that.bestiaryUp.visible = true;
          that.bestiaryDown.visible = false;
        }

      }
      console.log("that.groupNumber " + that.groupNumber+ " that.pageNumber: ",that.pageNumber);


    });

    this.bestiaryUp.on('pointerover',function(pointer){
      that.scene.initSoundEffect('buttonSFX','1',0.1);
      that.bestiaryUp.setTint(0xff7000);
    });

    this.bestiaryUp.on('pointerout',function(pointer){
      that.bestiaryUp.clearTint();
    });

    this.bestiaryUp.on('pointerdown', function (pointer) {

      that.scene.initSoundEffect('buttonSFX','page',0.05);

      console.log(" activating bestiary turn page up. scene.bestiaryUI.pageNumber" + that.pageNumber);
      console.log(" pageID: ", that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);
      that.displayBestiaryText(true);

      //if we are on any page fgrom 0 to n and the page number, is less than the groups.length
      if (that.pageNumber >= 0 && that.pageNumber < that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]].length - 1) {
        that.pageNumber++;
        that.setBestiaryInfo();

        that.anims.play(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);

        if(that.pageNumber === that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]].length - 1) {
          console.log(" hiding right bestiary arrow");
          that.bestiaryUp.visible = false;
          that.bestiaryDown.visible = true;
        } else {
          that.bestiaryUp.visible = true;
          that.bestiaryDown.visible = true;
        }
      }
       console.log("that.groupNumber " + that.groupNumber+ " that.pageNumber: ",that.pageNumber);

    });

    this.bestiaryDown.on('pointerover',function(pointer){
      that.scene.initSoundEffect('buttonSFX','1',0.1);
      that.bestiaryDown.setTint(0xff7000);
    });

    this.bestiaryDown.on('pointerout',function(pointer){
      that.bestiaryDown.clearTint();
    });

    this.bestiaryDown.on('pointerdown', function (pointer) {
      console.log(" turning bestiary page down");
      console.log(" pageID: ", that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);

      that.scene.initSoundEffect('buttonSFX','page',0.05);

      if (that.pageNumber > 0 && that.pageNumber <= that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]].length) {
        that.pageNumber--;
        that.setBestiaryInfo();
        that.anims.play(that.activeBestiaryPages[that.activeBestiaryGroups[that.groupNumber]][that.pageNumber]);

        if (that.pageNumber === 0) {
          console.log(" hiding left bestiary arrow");
          that.displayBestiaryText(true);
          that.bestiaryDown.visible = false;
          that.bestiaryUp.visible = true;
        } else {
          that.displayBestiaryText(true);
          that.bestiaryDown.visible = true;
          that.bestiaryUp.visible = true;
        }
      }
      console.log("that.groupNumber " + that.groupNumber+ " that.pageNumber: ",that.pageNumber);


    });

  }
  //function that sets the visibility of the text character groups correctly.
  displayBestiaryText(isVisible) {
    //console.log("setting text tovisible: ", isVisible);

    if (isVisible === true && this.bestiaryTitle[0].visible === false || isVisible === false && this.bestiaryTitle[0].visible === true) {
      this.titleCharacters.toggleVisible();
      this.summaryCharacters.toggleVisible();
    }





  }
  // changes the animation of the characters to reflect the correct summary and title info
  setBestiaryInfo() {

    for (let [mainKey, value] of Object.entries(this.bestiaryTextList)) {
      if (this.activeBestiaryPages[this.activeBestiaryGroups[this.groupNumber]][this.pageNumber] === mainKey) {
        for (let counter = 0; counter < this.bestiaryTitle.length; counter++) {

          if (counter < value.title.length) {
            this.bestiaryTitle[counter].anims.play(value.title.charAt(counter));
          } else {
            this.bestiaryTitle[counter].anims.play(" ");
          }

        }

        this.formattedString = value.summary;
        this.formatSummary();

        for (let counter = 0; counter < this.bestiarySummary.length; counter++) {

          if (counter < this.formattedString.length) {
            //this.summarySize.charAt(counter) = value.summary.charAt(counter);
            this.bestiarySummary[counter].anims.play(this.formattedString.charAt(counter));
          } else {
            this.bestiarySummary[counter].anims.play(" ");
          }

        }

      }

    }

  }


  formatSummary(){
    //temp array for testing used to check if all the line align with each other.
    let tempArray = [];

    //string to store new formatted string.
    let formattedString = "";
    //temp string to store data
    let tempString = "";
    //variable to keep track fo line positioning.
    let tempLineCounter = 0;

    //loop through the text in the object
    for(let counter = 0;counter < this.formattedString.length+1;counter++){
    
      //if the templinecounter reaches 24 then 
      //check to see if the current char is a space. if not then 
      if(tempLineCounter === bestiaryLineLength+1 && this.formattedString.charAt(counter) !== ' '){
        
        //reverse through the temp string
        for(let tempStringPosition = tempString.length;tempStringPosition > 0;tempStringPosition--){


          //if the char in tempstring is a space then 
          if(tempString.charAt(tempStringPosition) === ' '){
            //slice off the extra word getting cut off 
            tempString = tempString.slice(0,tempStringPosition);

            //add spaces back to the tempstring until it is the correct line size
            while(tempString.length < bestiaryLineLength+1){
              tempString+= ' ';
            }

            //array for testing purposes
            tempArray.push(tempString);

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
      }else if(tempLineCounter === bestiaryLineLength+1 && this.formattedString.charAt(counter) === ' '){

        //add spaces back to the tempstring until it is the correct line size
        while(tempString.length < bestiaryLineLength+1){
          tempString+= ' ';
        }
        //array for testing purposes
        tempArray.push(tempString);

        formattedString += tempString;
        //reset the templinecounter variable
        tempLineCounter = 0;
        //empty out string
        tempString = "";
        //moves the counter forward one so it doesnt pick up the space at the end of the line.
        counter++;
      }
       
      //adds to the temp ling
      tempString += this.formattedString.charAt(counter);
      //increment line every character.
      tempLineCounter++;
    }

    //for testing purposes
    tempArray.push(tempString);
    //console.log("tempArray: ", tempArray);

    //adds the last line to the string and sets our text object to it.
    formattedString += tempString;
    this.formattedString = formattedString;

  }
}