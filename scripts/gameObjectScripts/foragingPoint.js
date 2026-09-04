//savestone that allows players to save there progress.
class foragingPoint extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,item,amountLower,amountUpper,reduceAbundance){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos+8, 'foragingPoint');
        //then we add new instance into the scene. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);
        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.saveStoneKeyPrompts = new keyPrompts(scene, xPos, yPos + 60,'keyPrompts');
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;

        this.item = item;
        console.log(item.itemID)
        if(item.itemID === 30){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 0, end: 0}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 1, end: 1}),frameRate: 1,repeat: -1});
        }else if(item.itemID === 9){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 2, end: 2}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 3, end: 3}),frameRate: 1,repeat: -1});
        }else if(item.itemID === 11){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 4, end: 4}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 5, end: 5}),frameRate: 1,repeat: -1});
        }else if(item.itemID === 32){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 6, end: 6}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 7, end: 7}),frameRate: 1,repeat: -1});
        }else if(item.itemID === 33){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 8, end: 8}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 9, end: 9}),frameRate: 1,repeat: -1});
        }else if(item.itemID === 36){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 10, end: 10}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 11, end: 11}),frameRate: 1,repeat: -1});

            //if lighting system is on then
            if(this.scene.lightingSystemActive === true){

                this.curseLight = this.scene.lights.addLight(this.x,this.y+15, 65, 0xb317ff);
                this.twean = this.scene.tweens.add({
                    targets: this.curseLight,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
            }
        }else if(item.itemID === 37){
            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 12, end: 12}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 13, end: 13}),frameRate: 1,repeat: -1});
        }

        this.anims.play("full", true)

        this.harvested = false;
        this.amountLower = amountLower;
        this.amountUpper = amountUpper;
        this.reduceAbundance = reduceAbundance;

        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown= false;

        this.scene = scene;

        this.curseLight;
        //sets scale
        this.setScale(1/3);
        //this.setDepth(2);
        let randomFlip = Math.round(Math.random());

        //console.log("COIN FLIP IS ",randomFlip);
        if(randomFlip === 0 ){
            this.flipX = false;
        }else{
            this.flipX = true;
        }
        //randomize flipX 

    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false &&  this.harvested === false){
            
            //decrease the abundance value for this location.

            inventoryKeyEmitter.emit(inventoryKey.reduceForageValue,this.scene.playerLocation,this.reduceAbundance);

            //randomly give the player some amount of the stuff this ponit should drop.
            this.scene.initItemDrop(
                this.x,
                this.y,
                this.item.itemID,
                this.item.itemStackable,
                Math.floor(Math.random() * (this.amountUpper - this.amountLower + 1)) + this.amountLower,
                this.item.itemName,
                this.item.itemDescription,
                this.item.itemType,
                this.item.sellValue
            );

            //play animation frame of it empty
            this.anims.play("empty", true)

            //play sound effect?

            //lock out this foraging spot.
            this.harvested = true;

            this.safeToSave = false;

            if(this.scene.lightingSystemActive === true){

                this.twean.destroy();
                this.curseLight.radius = 55;

                this.twean = this.scene.tweens.add({
                    targets: this.curseLight,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
            }

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false &&  this.harvested === false){
            console.log("prompts active");
            this.saveStoneKeyPrompts.visible = true;
            this.saveStoneKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToSave === false){
            this.saveStoneKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }

  
}