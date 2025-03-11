class ercusComp extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos, animation){

      super(scene, xPos, yPos);

      scene.add.existing(this);
      this.setDepth(50);
      this.repeats = 0;
      this.frames = 20;

      this.anims.create({key: '0',frames: this.anims.generateFrameNames('ercus', { start: 0, end: 0 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('ercus', { start: 1, end: 1 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('ercus', { start: 2, end: 2 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames('ercus', { start: 3, end: 3 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames('ercus', { start: 4, end: 4 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames('ercus', { start: 5, end: 5 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '6',frames: this.anims.generateFrameNames('ercus', { start: 6, end: 6 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '7',frames: this.anims.generateFrameNames('ercus', { start: 7, end: 7 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '8',frames: this.anims.generateFrameNames('ercus', { start: 8, end: 8 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '9',frames: this.anims.generateFrameNames('ercus', { start: 9, end: 9 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '10',frames: this.anims.generateFrameNames('ercus', { start: 10, end: 10 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '11',frames: this.anims.generateFrameNames('ercus', { start:11, end: 11 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '12',frames: this.anims.generateFrameNames('ercus', { start: 12, end: 12 }),frameRate: this.frames,repeat: this.repeats});
      this.anims.create({key: '13',frames: this.anims.generateFrameNames('ercus', { start: 13, end: 13 }),frameRate: this.frames,repeat: this.repeats});

    /*let font = 'charBubble';
    this.anims.create({key: '1',frames: this.anims.generateFrameNames(font, { start: 26, end: 26 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '2',frames: this.anims.generateFrameNames(font, { start: 27, end: 27 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '3',frames: this.anims.generateFrameNames(font, { start: 28, end: 28 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '4',frames: this.anims.generateFrameNames(font, { start: 29, end: 29 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '5',frames: this.anims.generateFrameNames(font, { start: 30, end: 30 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '6',frames: this.anims.generateFrameNames(font, { start: 31, end: 31 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '7',frames: this.anims.generateFrameNames(font, { start: 32, end: 32 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '8',frames: this.anims.generateFrameNames(font, { start: 33, end: 33 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '9',frames: this.anims.generateFrameNames(font, { start: 34, end: 34 }),frameRate: this.frames,repeat: this.repeats});
    this.anims.create({key: '0',frames: this.anims.generateFrameNames(font, { start: 35, end: 35 }),frameRate: this.frames,repeat: this.repeats});
    */

      //console.log("animation: ", animation);
      this.anims.play(animation, true);
    }


  }
    