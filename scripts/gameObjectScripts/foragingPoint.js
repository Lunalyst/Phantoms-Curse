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
        this.saveStoneKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;

        this.item = item;
        
        if(item.itemID = 30){

            this.anims.create({key: 'full',frames: this.anims.generateFrameNames('foragingPoint', { start: 0, end: 0}),frameRate: 1,repeat: -1});
            this.anims.create({key: 'empty',frames: this.anims.generateFrameNames('foragingPoint', { start: 1, end: 1}),frameRate: 1,repeat: -1});
            
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

        if(randomFlip.flipX === 0 ){
            this.flipX = false;
        }else{
            this.flipX = true;
        }
        //randomize flipX 

        //if lighting system is on then
        /*if(this.scene.lightingSystemActive === true){
            this.curseLight = this.scene.lights.addLight(this.x,this.y+4, 65, 0xb317ff);
            this.curseLight.visible = false;
        }*/
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