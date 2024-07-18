class healthUpgrade extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,flag){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'healthUpgrade');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object

        //defines item drop animations
        this.anims.create({key: 'healthUpgradeLoop',frames: this.anims.generateFrameNames('healthUpgrade', { start: 0, end: 9 }),frameRate: 10,repeat: -1});
        this.anims.play('healthUpgradeLoop',true);
        //sets game flag to know if item should spawn or not.
        this.flag = flag;
        //sets scale
        this.setScale(1/3);

        this.scene = scene;

  
    }

    //removes this object after it adds its flag value to game flags.
    destroyAndFlag(){

    //now to add the flag to the player data so the health upgrade doesn't spawn multiple times.
    inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,this.flag);

    this.scene.initSoundEffect('curseSFX','curse',0.3);
    //destroys the object.
    this.destroy();
    }
}