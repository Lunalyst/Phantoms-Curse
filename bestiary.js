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
      this.anims.create({key: 'p0',frames: this.anims.generateFrameNames('bestiary', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p1',frames: this.anims.generateFrameNames('bestiary', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p2',frames: this.anims.generateFrameNames('bestiary', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p3',frames: this.anims.generateFrameNames('bestiary', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p4',frames: this.anims.generateFrameNames('bestiary', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p5',frames: this.anims.generateFrameNames('bestiary', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p6',frames: this.anims.generateFrameNames('bestiary', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
      this.anims.play("closed");

      this.setDepth(40);
      this.setScale(1.3 );
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.isOpen = false;
      this.index = 0;
      this.visable = false;
      this.openDelay = false;
      bestiaryThat = this;
      this.pageNumber = 0;
     
      
    }

    openBestiary(scene){
         
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;
            console.log("this.isOpen from bestiary"+this.isOpen);
            this.anims.play("p"+this.pageNumber);
            this.openDelay = true;
            
            setTimeout(function(){
              bestiaryThat.openDelay = false; 
              },1000);
              if(this.pageNumber === 0){
                scene.bestiaryLeft.visible = false;
                scene.bestiaryRight.visible = true;
                //scene.bestiaryExit.visible = true;
              }else if(this.pageNumber === 6){
                scene.bestiaryLeft.visible = true;
                scene.bestiaryRight.visible = false;
                //scene.bestiaryExit.visible = true;
              }else{
                scene.bestiaryLeft.visible = true;
                scene.bestiaryRight.visible = true;
                //scene.bestiaryExit.visible = true;
              }

        }else if(this.isOpen === true && this.openDelay === false){
            this.isOpen = false;
            console.log("this.isOpen from bestiary"+this.isOpen);
            this.anims.play("closed");
            this.openDelay = true;
            setTimeout(function(){
              console.log("bestiary openDelay set to false");
              bestiaryThat.openDelay = false; 
              },1000);
              scene.bestiaryLeft.visible = false;
              scene.bestiaryRight.visible = false;
              //scene.bestiaryExit.visible = false;
        }

    }

    applyUIControlElements(scene){
    
      //scene.bestiaryExit.on('pointerdown', function (pointer) {
        /*this.isOpen = false;
        this.anims.play("closed");
        this.openDelay = true;
        setTimeout(function(){
          console.log("bestiary openDelay set to false");
          bestiaryThat.openDelay = false; 
          },1000);*/
        
        
      //});
      scene.bestiaryRight.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page right. scene.bestiaryUI.pageNumber" + scene.bestiaryUI.pageNumber);
        if(scene.bestiaryUI.pageNumber >= 0 && scene.bestiaryUI.pageNumber < 6 ){
          scene.bestiaryUI.pageNumber++;
          scene.bestiaryUI.anims.play("p"+scene.bestiaryUI.pageNumber);
          if(scene.bestiaryUI.pageNumber === 6){
            console.log(" hiding right bestiary arrow" );
              scene.bestiaryRight.visible = false;
          }else{
            scene.bestiaryLeft.visible = true;
            scene.bestiaryRight.visible = true;
          }
        }

        
        
      });
      scene.bestiaryLeft.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page left scene.bestiaryUI.pageNumber" + scene.bestiaryUI.pageNumber);
        if(scene.bestiaryUI.pageNumber > 0 && scene.bestiaryUI.pageNumber <= 6 ){
          scene.bestiaryUI.pageNumber--;
          scene.bestiaryUI.anims.play("p"+scene.bestiaryUI.pageNumber);
          if(scene.bestiaryUI.pageNumber === 0){
            console.log(" hiding left bestiary arrow" );
            scene.bestiaryLeft.visible = false;
          }else{
            scene.bestiaryLeft.visible = true;
            scene.bestiaryRight.visible = true;
          }
        }
        
        
      });
   
    }
}