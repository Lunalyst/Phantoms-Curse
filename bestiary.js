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
      this.anims.create({key: 'p0',frames: this.anims.generateFrameNames('bestiary', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p1',frames: this.anims.generateFrameNames('bestiary', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p2',frames: this.anims.generateFrameNames('bestiary', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p3',frames: this.anims.generateFrameNames('bestiary', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p4',frames: this.anims.generateFrameNames('bestiary', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p5',frames: this.anims.generateFrameNames('bestiary', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'p6',frames: this.anims.generateFrameNames('bestiary', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
      this.anims.play("closed");

      this.setDepth(60);
      this.setScale(1.5 );
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.isOpen = false;
      this.index = 0;
      this.visable = false;
      this.openDelay = false;
      bestiaryThat = this;
      this.pageNumber = 0;
      this.setScale(.6);
      
     
      
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
                scene.playerInventory.bestiaryLeft.visible = false;
                scene.playerInventory.bestiaryRight.visible = true;
                //scene.bestiaryExit.visible = true;
              }else if(this.pageNumber === 6){
                scene.playerInventory.bestiaryLeft.visible = true;
                scene.playerInventory.bestiaryRight.visible = false;
                //scene.bestiaryExit.visible = true;
              }else{
                scene.playerInventory.bestiaryLeft.visible = true;
                scene.playerInventory.bestiaryRight.visible = true;
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
              scene.playerInventory.bestiaryLeft.visible = false;
              scene.playerInventory.bestiaryRight.visible = false;
              //scene.bestiaryExit.visible = false;
        }

    }

    applyUIControlElements(scene,inventory){
    
      // page number is being refrenced improprly scene.inventory.bestuaryui.pagenumber
      inventory.bestiaryRight.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page right. scene.bestiaryUI.pageNumber" + scene.playerInventory.bestiaryUI.pageNumber);
        if(scene.playerInventory.bestiaryUI.pageNumber >= 0 && scene.playerInventory.bestiaryUI.pageNumber < 6 ){
          scene.playerInventory.bestiaryUI.pageNumber++;
          scene.playerInventory.bestiaryUI.anims.play("p"+scene.playerInventory.bestiaryUI.pageNumber);
          if(scene.playerInventory.bestiaryUI.pageNumber === 6){
            console.log(" hiding right bestiary arrow" );
            scene.playerInventory.bestiaryRight.visible = false;
          }else{
            scene.playerInventory.bestiaryLeft.visible = true;
            scene.playerInventory.bestiaryRight.visible = true;
          }
        }

        
        
      });
      inventory.bestiaryLeft.on('pointerdown', function (pointer) {
        console.log(" activating bestiary turn page left scene.bestiaryUI.pageNumber" + scene.playerInventory.bestiaryUI.pageNumber);
        if(scene.playerInventory.bestiaryUI.pageNumber > 0 && scene.playerInventory.bestiaryUI.pageNumber <= 6 ){
          scene.playerInventory.bestiaryUI.pageNumber--;
          scene.playerInventory.bestiaryUI.anims.play("p"+scene.playerInventory.bestiaryUI.pageNumber);
          if(scene.playerInventory.bestiaryUI.pageNumber === 0){
            console.log(" hiding left bestiary arrow" );
            scene.playerInventory.bestiaryLeft.visible = false;
          }else{
            scene.playerInventory.bestiaryLeft.visible = true;
            scene.playerInventory.bestiaryRight.visible = true;
          }
        }
        
        
      });
   
    }
}