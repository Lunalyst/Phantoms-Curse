class itemDrop extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,setItemID,setItemStackable,setItemAmount){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'itemDrops');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object

        //defines item drop animations
        this.anims.create({key: '2',frames: this.anims.generateFrameNames('itemDrops', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '4',frames: this.anims.generateFrameNames('itemDrops', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '6',frames: this.anims.generateFrameNames('itemDrops', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '8',frames: this.anims.generateFrameNames('itemDrops', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '10',frames: this.anims.generateFrameNames('itemDrops', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '12',frames: this.anims.generateFrameNames('itemDrops', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '14',frames: this.anims.generateFrameNames('itemDrops', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
        
        
        //sets the given item id remeber that the item is 
        this.itemDropObject = {
            itemID: setItemID,
            itemStackable: setItemStackable,
            itemAmount: setItemAmount
        };

        //plays animation of item.
        this.anims.play(""+setItemID);
  

        //sets scale
        this.setScale(1/3);

  
    }
}