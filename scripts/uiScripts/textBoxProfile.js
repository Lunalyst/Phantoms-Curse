class textBoxProfile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'textBoxProfile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(3/4);
      
      this.anims.create({key: 'signLoop',frames: this.anims.generateFrameNames('textBoxProfile', { start: 0, end: 3 }),frameRate: 5,repeat: -1});

      this.anims.create({key: 'lunaNeutral',frames: this.anims.generateFrameNames('textBoxProfile', { start: 4, end: 13 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaCry',frames: this.anims.generateFrameNames('textBoxProfile', { start: 14, end: 21 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHearts',frames: this.anims.generateFrameNames('textBoxProfile', { start: 22, end: 28 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHappy',frames: this.anims.generateFrameNames('textBoxProfile', { start:29, end: 32 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaKO',frames: this.anims.generateFrameNames('textBoxProfile', { start:33, end: 36 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHeartEyes',frames: this.anims.generateFrameNames('textBoxProfile', { start:37, end: 40 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaStarEyes',frames: this.anims.generateFrameNames('textBoxProfile', { start:41, end: 44 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaAngryEyes',frames: this.anims.generateFrameNames('textBoxProfile', { start:45, end: 48 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaSleeping',frames: this.anims.generateFrameNames('textBoxProfile', { start:49, end: 54 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaFingerTouch',frames: this.anims.generateFrameNames('textBoxProfile', { start:55, end: 58 }),frameRate: 5,repeat: -1});

      this.anims.play("signLoop",true);
      
    }

    setUpIstaraEmots(){
      this.anims.create({key: 'istaraNeutral',frames: this.anims.generateFrameNames('istaraEmots', { start: 0, end: 4 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraHappy',frames: this.anims.generateFrameNames('istaraEmots', { start: 6, end: 9 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraKO',frames: this.anims.generateFrameNames('istaraEmots', { start: 11, end: 14 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraStarEyes',frames: this.anims.generateFrameNames('istaraEmots', { start: 16, end: 21 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraSquish',frames: this.anims.generateFrameNames('istaraEmots', { start: 23, end: 28 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraAnnoyed',frames: this.anims.generateFrameNames('istaraEmots', { start: 23, end: 23 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraHeartEyes',frames: this.anims.generateFrameNames('istaraEmots', { start: 30, end: 35 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraSad',frames: this.anims.generateFrameNames('istaraEmots', { start: 37, end: 41 }),frameRate: 5,repeat: -1});

    }
}