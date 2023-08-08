//https://stackoverflow.com/questions/71266893/phaser-3-change-hitbox-interactive-area-of-sprite-without-physics

let bestiaryThat;
class bestiary extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'bestiary');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('bestiary', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'cover',frames: this.anims.generateFrameNames('bestiary', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'back',frames: this.anims.generateFrameNames('bestiary', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'blueSlime',frames: this.anims.generateFrameNames('bestiary', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'largeBlueSlime',frames: this.anims.generateFrameNames('bestiary', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'axolotlMale',frames: this.anims.generateFrameNames('bestiary', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'axolotlfemale',frames: this.anims.generateFrameNames('bestiary', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'largePurpleSlugFemale',frames: this.anims.generateFrameNames('bestiary', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'largePurpleSlugMale',frames: this.anims.generateFrameNames('bestiary', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'rabbitfemale',frames: this.anims.generateFrameNames('bestiary', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'rabbitMale',frames: this.anims.generateFrameNames('bestiary', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'cowFemale',frames: this.anims.generateFrameNames('bestiary', { start: 11, end:11 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'cowMale',frames: this.anims.generateFrameNames('bestiary', { start: 12, end: 12 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'blueSlimeHumanoidFemale',frames: this.anims.generateFrameNames('bestiary', { start: 13, end: 13 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'blueSlimeHumanoidFemaleLarge',frames: this.anims.generateFrameNames('bestiary', { start: 14, end: 14 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'sharkFemale',frames: this.anims.generateFrameNames('bestiary', { start: 15, end: 15 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'sharkMale',frames: this.anims.generateFrameNames('bestiary', { start: 16, end: 16 }),frameRate: 10,repeat: -1});

      this.anims.play("closed");

      this.setDepth(60);
      this.setScale(1.5 );
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.isOpen = false;
      this.index = 0;
      this.visible = false;
      this.openDelay = false;
      bestiaryThat = this;
      this.pageNumber = 0;
      this.setScale(.4);

      this.bestiaryLeft;
      this.bestiaryRight;
      this.bestiaryLeft = new bestiaryControls(scene,this.x-80,this.y+100,"UIControls").setInteractive();
      this.bestiaryLeft.anims.play("pointLeft");
      this.bestiaryLeft.visible = false;
      this.bestiaryRight = new bestiaryControls(scene,this.x+80,this.y+100,"UIControls").setInteractive();
      this.bestiaryRight.anims.play("pointRight");
      this.bestiaryRight.visible = false;


      this.activeBestiaryPages = [];
      this.activeBestiaryPages.push('cover');
      for(let [key,value] of Object.entries(scene.playerBestiaryData)){
        console.log("key: ",key," value: ",value);
        if(value === 1){
          this.activeBestiaryPages.push(key.toString());
        }
      }
      this.activeBestiaryPages.push('back');
      console.log(this.activeBestiaryPages);

      let startingX = -70;
      let startingY = -120;
      let spacing = 0;

      let titleSize = "MONSTER_TITLE";
      this.titleCharacters = new Phaser.GameObjects.Group(scene);
      this.bestiaryTitle = [];
      for(let counter = 0;counter<titleSize.length;counter++){
        this.bestiaryTitle.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
        this.titleCharacters.add(this.bestiaryTitle[counter]);
        this.bestiaryTitle[counter].setScale(.15);
        this.bestiaryTitle[counter].setDepth(70);
        this.bestiaryTitle[counter].anims.play(titleSize.charAt(counter));
        this.bestiaryTitle[counter].x = this.bestiaryTitle[counter].x + spacing;
        this.bestiaryTitle[counter].y = this.bestiaryTitle[counter].y + 7;
        spacing = spacing + 7;
      }

      startingX = -40;
      startingY = -90;
      spacing = 0;
      let rowSpacing = 0;
      let rowCounter = 0;

      let summarySize = "THIS SUMMARY IS A MONSTER SUMMARY.THIS IS WHERE A MONSTERS SUMMARY IS DISPLAYED. THIS WILL TELL YOU SOME INTERESTING INFORMATION ABOUT THE MONSTER. THESE ENTRYS ARE USUALLY UNLOCKED BY GETTING DEFEATED BY THE MONSTER AND THEN SAVING.";
      this.summaryCharacters = new Phaser.GameObjects.Group(scene);
      this.bestiarySummary = [];
      for(let counter = 0;counter<summarySize.length;counter++){
        this.bestiarySummary.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
        //this.bestiarySummary[counter].visible = true;
        this.summaryCharacters.add(this.bestiarySummary[counter]);
        this.bestiarySummary[counter].setScale(.15);
        this.bestiarySummary[counter].setDepth(70);
        this.bestiarySummary[counter].anims.play(summarySize.charAt(counter));
        this.bestiarySummary[counter].x = this.bestiarySummary[counter].x + spacing;
        this.bestiarySummary[counter].y = this.bestiarySummary[counter].y + rowSpacing;
        spacing = spacing + 7;
        rowCounter++;
        if(rowCounter === 15){
          rowCounter = 0;
          spacing = 0;
          rowSpacing += 7;

        }
      }

      
    }

    openBestiary(scene){
         
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;
            console.log("this.isOpen from bestiary "+this.isOpen);
            this.anims.play(this.activeBestiaryPages[this.pageNumber]);
            this.openDelay = true;
            this.setScale(.5);
            this.x = 550;
            this.y = 395;
            this.bestiaryLeft.x = this.x-100;
            this.bestiaryLeft.y = this.y+120;
            this.bestiaryRight.x = this.x+100;
            this.bestiaryRight.y = this.y+120;
            
            setTimeout(function(){
              bestiaryThat.openDelay = false; 
              },1000);

              if(this.pageNumber === 0){
                this.bestiaryLeft.visible = false;
                this.bestiaryRight.visible = true;
                
                this.displayBestiaryText(false);
              }else if(this.pageNumber === this.activeBestiaryPages.length-1){
               this.bestiaryLeft.visible = true;
                this.bestiaryRight.visible = false;
                this.displayBestiaryText(true);
              }else{
                this.bestiaryLeft.visible = true;
                this.bestiaryRight.visible = true;
                this.displayBestiaryText(true);
                
              }

        }else if(this.isOpen === true && this.openDelay === false){
            this.isOpen = false;
            this.setScale(.4);
            this.x = 580;
            this.y = 395;
            console.log("this.isOpen from bestiary"+this.isOpen);
            this.anims.play("closed");
            this.openDelay = true;
            this.displayBestiaryText(false);
            setTimeout(function(){
              console.log("bestiary openDelay set to false");
              bestiaryThat.openDelay = false; 
              },1000);
              this.bestiaryLeft.visible = false;
             this.bestiaryRight.visible = false;
              //scene.bestiaryExit.visible = false;
        }

    }

    applyUIControlElements(){
    
      // page number is being refrenced improprly scene.inventory.bestuaryui.pagenumber
      this.bestiaryRight.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page right. scene.bestiaryUI.pageNumber" +  bestiaryThat.pageNumber);
        console.log(" pageID: ", bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);
        bestiaryThat.displayBestiaryText(true);
        if(bestiaryThat.pageNumber >= 0 && bestiaryThat.pageNumber < bestiaryThat.activeBestiaryPages.length ){
          bestiaryThat.pageNumber++;
          bestiaryThat.anims.play(bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);

          if(bestiaryThat.pageNumber === bestiaryThat.activeBestiaryPages.length-1){
            console.log(" hiding right bestiary arrow" );
            bestiaryThat.bestiaryRight.visible = false;  
          }else{
            bestiaryThat.bestiaryLeft.visible = true;
            bestiaryThat.bestiaryRight.visible = true;
          }
        }

        
        
      });
      this.bestiaryLeft.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page left scene.bestiaryUI.pageNumber" + bestiaryThat.pageNumber);
        if(bestiaryThat.pageNumber > 0 && bestiaryThat.pageNumber <= bestiaryThat.activeBestiaryPages.length ){
          bestiaryThat.pageNumber--;
          bestiaryThat.anims.play(bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);
          if(bestiaryThat.pageNumber === 0){
            console.log(" hiding left bestiary arrow" );
            bestiaryThat.displayBestiaryText(false);
            bestiaryThat.bestiaryLeft.visible = false;
          }else{
            bestiaryThat.displayBestiaryText(true);
            bestiaryThat.bestiaryLeft.visible = true;
            bestiaryThat.bestiaryRight.visible = true;
          }
        }
        
        
      });
   
    }

    displayBestiaryText(isVisible){
      console.log("setting text tovisible: ", isVisible);
      /*for(let counter = 0; counter < this.bestiaryTitle.length;counter++){
        this.bestiaryTitle[counter].visible = isVisible;
        console.log(this.bestiaryTitle[counter].x ," ",this.bestiaryTitle[counter].y);
      }*/
      if(isVisible === true && this.bestiaryTitle[0].visible === false || isVisible === false && this.bestiaryTitle[0].visible === true){
        this.titleCharacters.toggleVisible();
        this.summaryCharacters.toggleVisible();
      }
    
      
    }
}