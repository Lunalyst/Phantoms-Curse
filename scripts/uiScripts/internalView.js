class internalView extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,type){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'penning');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(6);
     // this.setScrollFactor(0);
      //this.visible = false;
      this.setScale(1/6);
      
      this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('penning', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'pen1',frames: this.anims.generateFrameNames('penning', { start: 2, end: 8 }),frameRate: 14,repeat: -1});
      this.anims.create({key: 'pen2',frames: this.anims.generateFrameNames('penning', { start: 2, end: 8 }),frameRate: 18,repeat: -1});
      this.anims.create({key: 'pen3',frames: this.anims.generateFrameNames('penning', { start: 2, end: 8 }),frameRate: 22,repeat: -1});
      this.anims.create({key: 'climaxStart',frames: this.anims.generateFrameNames('penning', { start: 11, end: 17 }),frameRate: 7,repeat: 0});

      if(type === "slime"){
        this.anims.create({key: 'slimePening',frames: this.anims.generateFrameNames('slimePenning', { start: 0, end: 2 }),frameRate: 7,repeat: 0});
        this.anims.create({key: 'slimeWiggle1',frames: this.anims.generateFrameNames('slimePenning', { start: 3, end: 6 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeWiggle2',frames: this.anims.generateFrameNames('slimePenning', { start: 1, end: 5 }),frameRate: 9,repeat: -1});
        this.anims.create({key: 'slimeExpanding',frames: this.anims.generateFrameNames('slimePenning', { start: 7, end: 11 }),frameRate: 10,repeat: 0});
        this.anims.create({key: 'slimeInflation',frames: this.anims.generateFrameNames('slimePenning', { start: 12, end: 16 }),frameRate: 15,repeat: -1});

      }else if(type === "tiger"){
        this.anims.create({key: 'playerClimaxInTiger',frames: this.anims.generateFrameNames('tigerPenned', { start: 0, end: 9 }),frameRate: 6  ,repeat: 0});

      }else if(type === "rabbit"){
        this.anims.create({key: 'rabbitPening1',frames: this.anims.generateFrameNames('rabbitPenning', { start: 1, end: 7 }),frameRate: 10,repeat: -1});
        this.anims.create({key: 'rabbitPening2',frames: this.anims.generateFrameNames('rabbitPenning', { start: 1, end: 7 }),frameRate: 16,repeat: -1});
        this.anims.create({key: 'rabbitPening3',frames: this.anims.generateFrameNames('rabbitPenning', { start: 1, end: 7 }),frameRate: 20,repeat: -1});
        this.anims.create({key: 'rabbitClimax',frames: this.anims.generateFrameNames('rabbitPenning', { start: 20, end: 28 }),frameRate: 6  ,repeat: 0});
        this.anims.create({key: 'playerClimaxInRabbit',frames: this.anims.generateFrameNames('rabbitPenned', { start: 0, end: 9 }),frameRate: 6  ,repeat: 0});

      }else if(type === "mimic"){
        this.anims.create({key: 'femaleTongueIn',frames: this.anims.generateFrameNames('mimicTongue', { start: 0, end: 9 }),frameRate: 12  ,repeat: -1});
        this.anims.create({key: 'maleTongueIn',frames: this.anims.generateFrameNames('mimicTongue', { start: 10, end: 19 }),frameRate: 12  ,repeat: -1});
        this.anims.create({key: 'mimicPening1',frames: this.anims.generateFrameNames('mimicPenning', { start: 1, end: 7 }),frameRate: 10,repeat: -1});
        this.anims.create({key: 'mimicPening2',frames: this.anims.generateFrameNames('mimicPenning', { start: 1, end: 7 }),frameRate: 16,repeat: -1});
        this.anims.create({key: 'mimicPening3',frames: this.anims.generateFrameNames('mimicPenning', { start: 1, end: 7 }),frameRate: 20,repeat: -1});
        this.anims.create({key: 'mimicClimax',frames: this.anims.generateFrameNames('mimicPenning', { start: 20, end: 28 }),frameRate: 6  ,repeat: 0});
        this.anims.create({key: 'playerClimaxInMimic',frames: this.anims.generateFrameNames('mimicPenned', { start: 0, end: 9 }),frameRate: 6  ,repeat: 0});

      }

     
      
    }
}