class shopBorder extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'shop');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      this.anims.create({ key: 'shopBorder', frames: this.anims.generateFrameNames('shop', { start: 1, end: 1 }), frameRate: 1, repeat: -1 });
      this.anims.play("shopBorder",true);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      //this.setScale(.6);
      

      
    }
}