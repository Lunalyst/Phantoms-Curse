class maleIcon extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'maleSexSelectIcons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
        this.setScale(1/3);
      
        this.anims.create({key: 'maleActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'maleInActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'femaleActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'femaleInActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        
            
        this.anims.play('maleInActive');

        this.scene = scene;
      
    }

    setupMaleIcon(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("maleActive");
        })
        this.on('pointerout',function(pointer){
            that.anims.play("maleInActive");
        })

        this.on('pointerdown', function (pointer) {
            
                
                   
        });

    }
}