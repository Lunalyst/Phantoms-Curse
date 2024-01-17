
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/

class itemContainer extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,setItemID,setItemStackable,setItemAmount,saveId){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'chest');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);
        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.containerKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.containerKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.containerId;
        this.allReadyOpened = false;
        this.setScale(1/3);

        //special id which will be pushed into the containers data in the save slot object. that way player can only open up the chest once. if desired.
        this.saveId = saveId;


        
        //defines animations
        this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('chest', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'opening',frames: this.anims.generateFrameNames('chest', { start: 0, end: 4}),frameRate: 7,repeat: 0});
        this.anims.create({key: 'opened',frames: this.anims.generateFrameNames('chest', { start: 4, end: 4}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'closing',frames: this.anims.generateFrameNames('chest', { start: 4, end: 8}),frameRate: 7,repeat: 0});

        //variables use to protect the object from being called at the wrong time.
        this.safeToOpen = false;
        this.openCoolDown= false;

        //item that the container holds.
        this.containerItemObject = {
            itemID: setItemID,
            itemStackable: setItemStackable,
            itemAmount: setItemAmount
        };
        
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    activateContainer(scene1,keyW,activeId){
        
        console.log("this.safeToOpen: ",this.safeToOpen, " keyW.isDown: ", keyW.isDown," this.openCoolDown: ",this.openCoolDown," scene1.isPaused: ",scene1.isPaused," this.allReadyOpened: ",this.allReadyOpened);

        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToOpen === true && keyW.isDown && this.openCoolDown === false && scene1.isPaused === false && this.allReadyOpened === false){
            
            //create a temp variable to hold our item that is passed to the player
            let item = this.containerItemObject;

            //used to tell if the item was added
            let addedToInventory = {
                added: false
            };

            console.log("item : ", item);

            //emitter to add object to inventory.
            inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);
            console.log("addedToInventory : ", addedToInventory);

            //if the item was added then
            if(addedToInventory.added === true){

                this.allReadyOpened = true;
                this.anims.play('opening').once('animationcomplete', () => {
                    this.anims.play('opened',true);
    
                });
            }

            
            


            //create a refrence to the object so it can be accesed in our time out function
            let currentContainer = this;

            // functions been activated so create set save cooldown to true
            this.openCoolDown = true; 

            //after a second set savecooldown back to false
            setTimeout(function () {
                currentContainer.openCoolDown = false;    
            }, 1000);

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToOpen === true && activeId === this.containerId && this.promptCooldown === false && scene1.isPaused === false && this.allReadyOpened === false){
            console.log("prompts active");
            this.containerKeyPrompts.visible = true;
            this.containerKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToOpen === false){
            this.containerKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }

  
}