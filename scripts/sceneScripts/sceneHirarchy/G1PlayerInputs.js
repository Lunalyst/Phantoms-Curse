/****************************************************************************** 
description: first gameplay link of inheritance chain. contains gameplay scenes
input control functions.
*******************************************************************************/
class G1PlayerInputs extends A3SoundEffects {

  //function to set up player key input definitions.
  setUpPlayerInputs(){
    // allows detection of key inputs for movement and player attacks
    console.log("Phaser.Input.Keyboard.KeyCodes: ",Phaser.Input.Keyboard);
    this.secretLoad();

    //ok so idea, use a map as a junction box to conver the symbols. i hate it but, it seems to probably be the best way.

    console.log("this.scene.bindSettings.keyWBind: ",this.bindSettings.keyWBind);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.keyABind]]);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.keyWBind]]);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.keyDBind]]);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.keySBind]]);

    //controls for the hud.
    this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.keyTABBind]]);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.spaceBind]]);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bindConversion[this.bindSettings.shiftBind]]);

  }

  //sets up player object
  setUpPlayer(){
    //creates a player object with the given values
    this.player1 = new player(this,this.warpToX,this.warpToY,this.playerSex);
    //creates a hitbox which will be used to 
    this.attackHitBox = new hitBoxes(this,this.player1.x,this.player1.y);

    this.playerProjectiles = this.add.group();

    //moves the player hitbox out of the way
    this.attackHitBox.x = this.x;
    this.attackHitBox.y = this.y+10000;

    //apply lighting to player
    if(this.lightingSystemActive){
      this.player1.setLighting();
    }
}

//sets up keyprompts in the scene for when the player is grabbed.
setUpKeyPrompts(){
    this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
    this.KeyDisplay.visible = false;
}

  //mobile button control for expecting if the w key is pressed only once until it is released.
  checkWPressed(){
      
    if(Phaser.Input.Keyboard.JustDown(this.keyW)){
      return true; 
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownWKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the w key is down and can be held down.
  checkWIsDown(){

    if(this.keyW.isDown){

      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.activateWKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the a key is pressed only once until it is released.
  checkAPressed(){

    if(Phaser.Input.Keyboard.JustDown(this.keyA)){
      return true; 
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownAKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the a key is down and can be held down.
  checkAIsDown(){

    if(this.keyA.isDown){
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.activateAKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the s key is pressed only once until it is released.
  checkSPressed(){
    if(Phaser.Input.Keyboard.JustDown(this.keyS)){
      return true; 
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownSKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the s key is down and can be held down.
  checkSIsDown(){

    if(this.keyS.isDown){
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.activateSKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the d key is pressed only once until it is released.
  checkDPressed(){
    if(Phaser.Input.Keyboard.JustDown(this.keyD)){
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownDKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the d key is down and can be held down.
  checkDIsDown(){

    if(this.keyD.isDown){
      return true; 
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.activateDKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the space key is pressed only once until it is released.
  checkJMPPressed(){
    if(Phaser.Input.Keyboard.JustDown(this.space)){
      console.log("pressed jump is true");
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownSpaceKey,keyObject);

      if(keyObject.isDown === true){
        //console.log("pressed jump is true");
        return true;
      }else{
        //console.log("pressed jump is false");
        return false;
      }
    } 
  }

  //mobile button control for expecting if the space key is down and can be held down.
  checkJMPIsDown(){

    if(this.space.isDown){
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.activateJMPKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the shift key is pressed only once until it is released.
  checkATKPressed(){
    if(Phaser.Input.Keyboard.JustDown(this.shift)){
      return true;
    }else{

      let keyObject = {
        isDown:false
      };

      controlKeyEmitter.emit(controlKeyEvent.justDownATKKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the shift key is down and can be held down.
  checkATKIsDown(){

    if(this.shift.isDown){
      return true;

    }else{

      let keyObject = {
        isDown:false,
      };

      controlKeyEmitter.emit(controlKeyEvent.activateATKKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the tab key is down and can be held down.
  checkInventoryIsDown(){

    if(this.keyTAB.isDown){
      return true;
    }else{

      let keyObject = {
        isDown:false,
      };

      controlKeyEmitter.emit(controlKeyEvent.activateInventoryIndicatorKey,keyObject);

      if(keyObject.isDown === true){
        return true;
      }else{
        return false;
      }
    } 
  }

  //mobile button control for expecting if the shift key is pressed which is specialized to the skip animation button.
  checkSkipIndicatorIsDown(){
    if(Phaser.Input.Keyboard.JustDown(this.keyTAB)){
      console.log("skip indicator returning true");
      return true;

    }else{
      let keyObject = {
        isDown:false,
      };

      controlKeyEmitter.emit(controlKeyEvent.activateSkipIndicatorKey,keyObject);
          
      if(keyObject.isDown === true){
        //console.log("skip indicator returning true");
        return true;

      }else{
       //console.log("skip indicator returning false                 ");
        return false;
      }
    }
  }

  //mobile button control for expecting if the shift key is pressed which is specialized to the give up button.
  checkGiveUpIndicatorIsDown(){

    if(Phaser.Input.Keyboard.JustDown(this.keyTAB)){
      return true;
    }else{

      let keyObject = {
        isDown:false,
      };
      
      controlKeyEmitter.emit(controlKeyEvent.activateGiveUpIndicatorKey,keyObject);

      if(keyObject.isDown === true){
        return true;

      }else{
        return false;
      }
    }
  }

  

}