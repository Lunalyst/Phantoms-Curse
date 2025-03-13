class TutorialSprite extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'tutorialSprite');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(2/3);

      //add tutorial border
      this.border = scene.physics.add.sprite(this.x, this.y, 'tutorialBorder');
      this.border.setScrollFactor(0);
      this.border.visible = false;
      this.border.setScale(2/3);

      this.anims.create({key: 'move1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'move2',frames: this.anims.generateFrameNames('tutorialSprite', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'plat1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 2, end: 2 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'item1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 3, end: 3 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'warp1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 4, end: 4 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 5, end: 5 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont2',frames: this.anims.generateFrameNames('tutorialSprite', { start: 6, end: 6 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont3',frames: this.anims.generateFrameNames('tutorialSprite', { start: 7, end: 7 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont4',frames: this.anims.generateFrameNames('tutorialSprite', { start: 8, end: 8 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont5',frames: this.anims.generateFrameNames('tutorialSprite', { start: 9, end: 9 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'cont6',frames: this.anims.generateFrameNames('tutorialSprite', { start: 10, end: 10 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'save1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 11, end: 11 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'save2',frames: this.anims.generateFrameNames('tutorialSprite', { start: 12, end: 12 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'save3',frames: this.anims.generateFrameNames('tutorialSprite', { start: 13, end: 13 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'combat1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 14, end: 14 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'combat2',frames: this.anims.generateFrameNames('tutorialSprite', { start: 15, end: 15 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'combat3',frames: this.anims.generateFrameNames('tutorialSprite', { start: 16, end: 16 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'combat4',frames: this.anims.generateFrameNames('tutorialSprite', { start: 17, end: 17 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'combat5',frames: this.anims.generateFrameNames('tutorialSprite', { start: 18, end: 18 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'safe1',frames: this.anims.generateFrameNames('tutorialSprite', { start: 19, end: 19 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'safe2',frames: this.anims.generateFrameNames('tutorialSprite', { start: 20, end: 20 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'safe3',frames: this.anims.generateFrameNames('tutorialSprite', { start: 21, end: 21 }),frameRate: 1,repeat: -1});

      
    }

    tutorialVisibility(visibility){
      this.visible = visibility;
      this.border.visible = visibility;
    }


}