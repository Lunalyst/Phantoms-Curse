class playerAnimationFunctions extends playerAnimations{
 
  //sets up lighting for each layer
  setLighting(){
    this.backLeg1.setPipeline('Light2D');
    this.backLegCloths2.setPipeline('Light2D');
    this.backArm3.setPipeline('Light2D');
    this.backArmCloths4.setPipeline('Light2D');
    this.mainBodySprite5.setPipeline('Light2D');
    this.mainBodyCloths6.setPipeline('Light2D');
    this.frontArm7.setPipeline('Light2D');
    this.frontArmCloths8.setPipeline('Light2D');
    this.weaponLayer9.setPipeline('Light2D');
    this.weaponHand10.setPipeline('Light2D');
    if(this.sex === 1){
      this.booba8.setPipeline('Light2D');
      this.boobaCloths8.setPipeline('Light2D');
    }
  }

  //function to pause all out layers
  pausePlayerAnimations(){
    this.backLeg1.anims.pause();
    this.backLegCloths2.anims.pause();
    this.backArm3.anims.pause();
    this.backArmCloths4.anims.pause();
    this.mainBodySprite5.anims.pause();
    this.mainBodyCloths6.anims.pause();
    this.frontArm7.anims.pause();
    this.frontArmCloths8.anims.pause();
    this.weaponLayer9.anims.pause();
    this.weaponHand10.anims.pause();

    if(this.sex === 1){
      this.booba8.anims.pause();
      this.boobaCloths8.anims.pause();
    }
  }

  //function to resume all of our layers.
  resumePlayerAnimations(){
    this.backLeg1.anims.resume();
    this.backLegCloths2.anims.resume();
    this.backArm3.anims.resume();
    this.backArmCloths4.anims.resume();
    this.mainBodySprite5.anims.resume();
    this.mainBodyCloths6.anims.resume();
    this.frontArm7.anims.resume();
    this.frontArmCloths8.anims.resume();
    this.weaponLayer9.anims.resume();
    this.weaponHand10.anims.resume();

    if(this.sex === 1){
      this.booba8.anims.resume();
      this.boobaCloths8.anims.resume();
    }
  }


  //flips the sprites 
  flipXcontainer(flip){

    //applys flip x to our
    this.backLeg1.flipX = flip;
    this.backLegCloths2.flipX = flip;
    this.backArm3.flipX = flip;
    this.backArmCloths4.flipX = flip;
    this.mainBodySprite5.flipX = flip;
    this.mainBodyCloths6.flipX = flip;
    this.frontArm7.flipX = flip;
    this.frontArmCloths8.flipX = flip;
    this.weaponLayer9.flipX = flip;
    this.weaponHand10.flipX = flip;

    if(this.sex === 1){
      this.booba8.flipX = flip;
      this.boobaCloths8.flipX = flip;
    }
  }

  //moves the weapon layer  x times
  moveUpXTimes(moves){

    for(let i = 0; i < moves;i++){
      this.moveUp(this.weaponLayer9);
      this.moveUp(this.weaponHand10);

    }
  
  }

  //idle animation for player
  playerIdleAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = true;
    }
    
    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      }
    }else{
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      }
    }

    //play repeating animations.
    //note, important, need to stop other animations not used. otherwise if that layer has a continuous animation called on it, then it will continue while invisble
    //this is bad because if its used with the same animation, it can cause our layers to become out of sync with each other.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.play('back-arm-idle',true);
    this.backArmCloths4.anims.play('back-arm-cloths-idle',true);
    this.mainBodySprite5.anims.play('main-body-idle',true);
    this.mainBodyCloths6.anims.play('main-body-cloths-idle',true);
    this.frontArm7.anims.play('front-arm-idle',true);
    this.frontArmCloths8.anims.play('front-arm-cloths-idle',true);
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

    if(this.sex === 1){
      this.booba8.anims.play('booba-idle',true);
      this.boobaCloths8.anims.play('booba-cloths-idle',true);
    }

  }

  playerWalkAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }
      this.backArmCloths4.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      
    }else{
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.play('back-leg-walk',true);
    this.backLegCloths2.anims.play('back-leg-cloths-walk',true);
    this.backArm3.anims.play('back-arm-walk',true);
    this.backArmCloths4.anims.play('back-arm-cloths-walk',true);
    this.mainBodySprite5.anims.play('main-body-walk',true);
    this.mainBodyCloths6.anims.play('main-body-cloths-walk',true);
    this.frontArm7.anims.play('front-arm-walk',true);
    this.frontArmCloths8.anims.play('front-arm-cloths-walk',true);
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }

  }

  playerJumpUpAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
    }else{
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play('main-body-jumpUp');
    this.mainBodyCloths6.anims.play('main-body-cloths-jumpUp');
    this.frontArm7.anims.play('front-arm-jumpUp');
    this.frontArmCloths8.anims.play('front-arm-cloths-jumpUp');
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }

  }

  playerJumpDownAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
    }else{
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play('main-body-jumpDown');
    this.mainBodyCloths6.anims.play('main-body-cloths-jumpDown');
    this.frontArm7.anims.play('front-arm-jumpDown');
    this.frontArmCloths8.anims.play('front-arm-cloths-jumpDown');
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();
    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }

  }

  playersleepAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = true;
    }
    

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      } 
    }else{
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      }
      
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play('main-body-sleep',true);
    this.mainBodyCloths6.anims.play('main-body-cloths-sleep',true);
    this.frontArm7.anims.play('front-arm-sleep',true);
    this.frontArmCloths8.anims.play('front-arm-cloths-sleep',true);
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();
    if(this.sex === 1){
      this.booba8.anims.play('booba-sleep',true);
      this.boobaCloths8.anims.play('booba-cloths-sleep',true);
    }

  }

  playerUnarmedAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = true;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }
      this.backArmCloths4.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      }
      
    }else{
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      }
    }

    //play repeating animations.
    this.backLeg1.anims.play('back-leg-swipe-12fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-12fps');
    this.backArm3.anims.play('back-arm-unarmed');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-12fps');
    this.mainBodySprite5.anims.play('main-body-swipe-12fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-12fps');
    this.frontArm7.anims.play('front-arm-swipe-12fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-12fps');
    this.weaponHand10.anims.stop();
    if(this.sex === 1){
      this.booba8.anims.play('booba-swipe-12fps',true);
      this.boobaCloths8.anims.play('booba-cloths-swipe-12fps',true);
    }

  }

  playerSwipeAnimation12FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    if(this.sex === 1){
      this.booba8.visible = true;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }
      this.backArmCloths4.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      }
    }else{
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      }
    }

    //play repeating animations.
    this.backLeg1.anims.play('back-leg-swipe-12fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-12fps');
    this.backArm3.anims.play('back-arm-swipe-12fps');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-12fps');
    this.mainBodySprite5.anims.play('main-body-swipe-12fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-12fps');
    this.frontArm7.anims.play('front-arm-swipe-12fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-12fps');
    this.weaponHand10.anims.play('weapon-hand-swipe-12fps');
    if(this.sex === 1){
      this.booba8.anims.play('booba-swipe-12fps',true);
      this.boobaCloths8.anims.play('booba-cloths-swipe-12fps',true);
    }
  }

  playerSwipeAnimation9FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    if(this.sex === 1){
      this.booba8.visible = true;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }

      this.backArmCloths4.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      }
      
    }else{
      this.backLegCloths2.visible = false;
      this.backArmCloths4.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      }
    }

    //play repeating animations.
    this.backLeg1.anims.play('back-leg-swipe-9fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-9fps');
    this.backArm3.anims.play('back-arm-swipe-9fps');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-9fps');
    this.mainBodySprite5.anims.play('main-body-swipe-9fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-9fps');
    this.frontArm7.anims.play('front-arm-swipe-9fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-9fps');
    this.weaponHand10.anims.play('weapon-hand-swipe-9fps');
    if(this.sex === 1){
      this.booba8.anims.play('booba-swipe-9fps',true);
      this.boobaCloths8.anims.play('booba-cloths-swipe-9fps',true);
    }
  }

  playerBonkAnimation9FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
    }else{
      this.backLegCloths2.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.play('back-leg-swipe-9fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-9fps');
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play('main-body-bonk-9fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-bonk-9fps');
    this.frontArm7.anims.play('front-arm-bonk-9fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-bonk-9fps');
    this.weaponHand10.anims.play('weapon-hand-bonk-9fps');

    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }
  }

  playerPokeAnimation12FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    if(this.sex === 1){
      this.booba8.visible = true;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      if(this.sex === 1){
        this.backLegCloths2.visible = false;
      }else{
        this.backLegCloths2.visible = true;
      }
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      if(this.sex === 1){
        this.boobaCloths8.visible = true;
      } 
    }else{
      this.backLegCloths2.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
      if(this.sex === 1){
        this.boobaCloths8.visible = false;
      } 
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play('main-body-poke-12fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-poke-12fps');
    this.frontArm7.anims.play('front-arm-poke-12fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-poke-12fps');
    this.weaponHand10.anims.play('weapon-hand-poke-12fps');
    if(this.sex === 1){
      this.booba8.anims.play('booba-poke-12fps',true);
      this.boobaCloths8.anims.play('booba-sleep-poke-12fps',true);
    }
  }

  StuckRepeat(stuckString){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.mainBodyCloths6.visible = false;
    this.frontArm7.visible = false;
    this.frontArmCloths8.visible = false;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play(stuckString,true);
    this.mainBodyCloths6.anims.stop();
    this.frontArm7.anims.stop();
    this.frontArmCloths8.anims.stop();
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();
    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }
  }

  Stuck(stuckString){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.mainBodyCloths6.visible = false;
    this.frontArm7.visible = false;
    this.frontArmCloths8.visible = false;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    this.mainBodySprite5.anims.play(stuckString);
    this.mainBodyCloths6.anims.stop();
    this.frontArm7.anims.stop();
    this.frontArmCloths8.anims.stop();
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();
    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }
  }

  setStuckVisiblity(){
    
    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.mainBodyCloths6.visible = false;
    this.frontArm7.visible = false;
    this.frontArmCloths8.visible = false;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;
    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }
  
  }

  playerConsumeStartAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;

    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
    }else{
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    //this.mainBodySprite5.anims.play('main-body-consume-start');
    this.mainBodyCloths6.anims.play('main-body-consume-start');
    this.frontArm7.anims.play('front-arm-consume-start');
    this.frontArmCloths8.anims.play('front-arm-cloths-consume-start');
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }

  }

  playerConsumeEndAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;

    if(this.sex === 1){
      this.booba8.visible = false;
      this.boobaCloths8.visible = false;
    }

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
    }else{
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
    }

    //play repeating animations.
    this.backLeg1.anims.stop();
    this.backLegCloths2.anims.stop();
    this.backArm3.anims.stop();
    this.backArmCloths4.anims.stop();
    //this.mainBodySprite5.anims.play('main-body-consume-start');
    this.mainBodyCloths6.anims.play('main-body-consume-end');
    this.frontArm7.anims.play('front-arm-consume-end');
    this.frontArmCloths8.anims.play('front-arm-cloths-consume-end');
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

    if(this.sex === 1){
      this.booba8.stop();
      this.boobaCloths8.stop();
    }

  }
  
}


