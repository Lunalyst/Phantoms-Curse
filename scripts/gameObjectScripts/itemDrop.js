//item drop that the player can pick up. generic class.
class itemDrop extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,setItemID,setItemStackable,setItemAmount,itemName,itemDescription,type,sell){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'itemDrops');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object

        //defines item drop animations
        this.anims.create({key: '0',frames: this.anims.generateFrameNames('itemDrops', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '1',frames: this.anims.generateFrameNames('itemDrops', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '2',frames: this.anims.generateFrameNames('itemDrops', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '3',frames: this.anims.generateFrameNames('itemDrops', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '4',frames: this.anims.generateFrameNames('itemDrops', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '5',frames: this.anims.generateFrameNames('itemDrops', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '6',frames: this.anims.generateFrameNames('itemDrops', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '7',frames: this.anims.generateFrameNames('itemDrops', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '8',frames: this.anims.generateFrameNames('itemDrops', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '9',frames: this.anims.generateFrameNames('itemDrops', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '10',frames: this.anims.generateFrameNames('itemDrops', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '11',frames: this.anims.generateFrameNames('itemDrops', { start: 11, end: 11 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '12',frames: this.anims.generateFrameNames('itemDrops', { start: 12, end: 12 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '13',frames: this.anims.generateFrameNames('itemDrops', { start: 13, end: 13 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '14',frames: this.anims.generateFrameNames('itemDrops', { start: 14, end: 14 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '15',frames: this.anims.generateFrameNames('itemDrops', { start: 15, end: 15 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '16',frames: this.anims.generateFrameNames('itemDrops', { start: 16, end: 16 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '17',frames: this.anims.generateFrameNames('itemDrops', { start: 17, end: 17 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '18',frames: this.anims.generateFrameNames('itemDrops', { start: 18, end: 18 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '19',frames: this.anims.generateFrameNames('itemDrops', { start: 19, end: 19 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '20',frames: this.anims.generateFrameNames('itemDrops', { start: 20, end: 20 }),frameRate: 10,repeat: -1});
        this.anims.create({key: '21',frames: this.anims.generateFrameNames('itemDrops', { start: 21, end: 21 }),frameRate: 10,repeat: -1});
            
        
        //sets the given item data into a object
        this.itemDropObject = {
            itemID: setItemID,
            itemStackable: setItemStackable,
            itemAmount: setItemAmount,
            itemName: itemName,
            itemDescription:itemDescription,
            itemType: type,
            sellValue: sell
        };
        //console.log("this.itemDropObject: ",this.itemDropObject);

        //plays animation of item.
        this.anims.play(""+setItemID);

        //sets bounce on drop
        this.setBounce(.2);

        //used to manage drop sound effect
        this.soundPlayed = false;

        //sets scale
        this.setScale(1/3);

        this.itemGlow = this.preFX.addGlow();
        this.itemGlow.outerStrength = 1;
        this.glowTween = this.scene.tweens.add({
            targets: this.itemGlow,
            outerStrength: 7, // Target tint color
            duration: 1000, // Duration in milliseconds
            ease: 'linear', // Ease type
            repeat: -1, // Repeat the tween 0 times
            yoyo: true // Do not reverse the tween
        });

        console.log("this.itemGlow", this.itemGlow);
    }

    activateFakeDrop(){
        this.visible = true;
        this.setVelocityY(-10);

         let fakedrop = this;
         

         setTimeout(function(){
            fakedrop.setVelocityY(0);
        },2000);

        setTimeout(function(){
            fakedrop.destroy();
        },4000);
    }
}



/*
item id chart
0: blank
1: rapier
2: oar club
3: mimic rapier
4: knife
5: rock
6: mimic ring
7: blank ring
8: speed ring
9: brown mushroom
10: axe
11: red mushroom cluster
12: this.initItemDrop(1028,680,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","item_drop");
13: this.initItemDrop(1028,680,13,1,1,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","item_drop");
14: this.initItemDrop(1028,680,14,1,1,"COCONUT"," APPLE OF THE SEA. ","item_drop");
15: this.initItemDrop(1028,680,15,1,1,"TIGER CLAW","SHARP TIGER CLAW. COULD BE DANGEROUS.","item_drop");
16: this.initItemDrop(1028,680,16,1,1,"FUEL ICHOR","FUEL FOR A LANTURN.","item_drop");
17: this.initItemDrop(1028,680,17,1,1,"STINGER","FULL OFF BEE VENOM.","item_drop");
18: mimic goo
19: cat fluff
*/

//x,y,item id, is stackable,amount dropped,item name, item description, item type
//this.initItemDrop(1028,680,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","item_drop");