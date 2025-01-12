// parent class of most npc entitys
class npc extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,sprite){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, sprite);

      //then we add new instance into the scene.
      scene.add.existing(this);
      //give this object a physics box.
      scene.physics.add.existing(this);
      //make it unpussable in any way. potentially unnessary.
      this.setPushable(false);

      this.inDialogue = false;
      this.animationPlayed = false;
      
     //sets scale of object
     this.setScale(1/3);
     
     this.scene = scene;
  }

  //function to generate a shop array for the items that can be bought back.
  generateBuyBack(){

    let buyBack = [];

    //loop though an array of flags that are onetime item drops.
    for (const key in oneTimeItemArray) {

      //call emiter to search for a flag.
      //make a temp object
      let object = {
        flagToFind: key,
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the flag is found search the player inventory for that id.
      if(object.foundFlag){

        //make a special object to pass to the listener
        let object1 = {
          oneTimeKey: key,
          foundKey: false
        };

        //call emitter to tell if the onetime item is present in the inventory.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      
        //if the item doesnt exist in the player inventory, then
        if(object1.foundKey){

          //push the object to the buyBack array
          buyBack.push(oneTimeItemArray[key]);
        }
      }


    }

    console.log("buyBack: ",buyBack);
    return buyBack;

    
  }

}