class playerAnimations extends Phaser.GameObjects.Container{
  // every class needs constructor
  setupPlayerAnimations(sex){
    
      //composit idle animation 
      this.backArm3.anims.create({key: 'back-arm-idle',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-idle',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-idle',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-idle',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});

      //composite walk animation
      this.backLeg1.anims.create({key: 'back-leg-walk',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 0, end: 7 }),frameRate: 15 * this.speedBoost,repeat: -1});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-walk',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 0, end: 7 * this.speedBoost }),frameRate: 15,repeat: -1});
      this.backArm3.anims.create({key: 'back-arm-walk',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 8, end: 15 }),frameRate: 15 * this.speedBoost,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-walk',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 8, end: 15 }),frameRate: 15 * this.speedBoost,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-walk',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 8, end: 15}),frameRate: 15 * this.speedBoost,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-walk',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 8, end: 15 }),frameRate: 15 * this.speedBoost ,repeat: -1});
      
      //jump up animation
      this.frontArm7.anims.create({key: 'front-arm-jumpUp',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 16, end: 18}),frameRate: 10,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-jumpUp',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 16, end: 18 }),frameRate: 10,repeat: 0});

      //down animation
      this.frontArm7.anims.create({key: 'front-arm-jumpDown',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 19, end: 20}),frameRate: 10,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-jumpDown',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 19, end: 20 }),frameRate: 10,repeat: 0});

      //sleep animation
      this.frontArm7.anims.create({key: 'front-arm-sleep',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 21, end: 30 }),frameRate: 3,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-sleep',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 21, end: 30 }),frameRate: 3,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.backLeg1.anims.create({key: 'back-leg-swipe-12fps',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 8, end: 13 }),frameRate: 12,repeat: 0});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-swipe-12fps',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 8, end: 13 }),frameRate: 12,repeat: 0});
      this.backArm3.anims.create({key: 'back-arm-swipe-12fps',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 22, end: 27 }),frameRate: 12,repeat: 0});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-swipe-12fps',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 16, end: 21 }),frameRate: 12,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-swipe-12fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 31, end: 36 }),frameRate: 12,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-swipe-12fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 31, end: 37 }),frameRate: 12,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-swipe-12fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 0, end: 5 }),frameRate: 12,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.backLeg1.anims.create({key: 'back-leg-swipe-9fps',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 8, end: 13 }),frameRate: 9,repeat: 0});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-swipe-9fps',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 8, end: 13 }),frameRate: 9,repeat: 0});
      this.backArm3.anims.create({key: 'back-arm-swipe-9fps',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 22, end: 27 }),frameRate: 9,repeat: 0});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-swipe-9fps',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 16, end: 21 }),frameRate: 9,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-swipe-9fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 31, end: 36 }),frameRate: 9,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-swipe-9fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 31, end: 36 }),frameRate: 9,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-swipe-9fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 0, end: 5 }),frameRate: 9,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.frontArm7.anims.create({key: 'front-arm-bonk-9fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 37, end: 42  }),frameRate: 9,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-bonk-9fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 37, end: 42 }),frameRate: 9,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-bonk-9fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 6, end: 11 }),frameRate: 9,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.frontArm7.anims.create({key: 'front-arm-poke-12fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 43, end: 48 }),frameRate: 12,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-poke-12fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {start: 43, end: 48}),frameRate: 12,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-poke-12fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 12, end: 17 }),frameRate: 12,repeat: -1});


      //unarmed animations
      this.backArm3.anims.create({key: 'back-arm-unarmed',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 16, end: 21 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-start-unarmed',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 0, end: 3 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-unarmed',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 3, end: 3 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-unarmed',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 4, end: 5 }),frameRate: 12,repeat: 0});
  
      //knife
      this.weaponLayer9.anims.create({key: 'weapon-start-knife',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 6, end: 8 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-knife',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 9, end: 9 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-knife',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 10, end: 11 }),frameRate: 12,repeat: 0});

      //axe
      this.weaponLayer9.anims.create({key: 'weapon-start-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 12, end: 14 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 15, end: 15 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 16, end: 17 }),frameRate: 9,repeat: 0});

      //oar
      this.weaponLayer9.anims.create({key: 'weapon-start-oar',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 18, end: 19 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-oar',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 20, end: 21 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-oar',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 22, end: 22 }),frameRate: 9,repeat: 0});

      //rapier
      this.weaponLayer9.anims.create({key: 'weapon-start-rapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 24, end: 25 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-rapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 26, end: 27 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-end-rapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 28, end: 29 }),frameRate: 12,repeat: 0});

      //rapier
      this.weaponLayer9.anims.create({key: 'weapon-start-mimicRapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 30, end: 31 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-mimicRapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 32, end: 33 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-end-mimicRapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 34, end: 35 }),frameRate: 12,repeat: 0});

      //mourning star
      this.weaponLayer9.anims.create({key: 'weapon-start-mourning-star',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 36, end: 37 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-mourning-star',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 38, end: 39 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-end-mourning-star',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 40, end: 40 }),frameRate: 9,repeat: 0});

      //conidia caster
      this.weaponLayer9.anims.create({key: 'weapon-conidia-caster1',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 42, end: 44 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-conidia-caster2',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 45, end: 45 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-conidia-caster3',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 46, end: 46 }),frameRate: 9,repeat: 0});

      //WAX AXE
      //axe
      this.weaponLayer9.anims.create({key: 'weapon-start-wax-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 48, end: 50 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-middle-wax-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 51, end: 51 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-wax-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 52, end: 53 }),frameRate: 9,repeat: 0});

      if(sex === 0){
        //this.booba8
        //idle male specific frames
        this.mainBodySprite5.anims.create({key: 'main-body-idle',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-idle',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        
        //walk frames
        this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 8, end: 15 }),frameRate: 15* this.speedBoost,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 8, end: 15 }),frameRate: 15* this.speedBoost,repeat: -1});
        
        //jump frames
        this.mainBodySprite5.anims.create({key: 'main-body-jumpUp',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 16, end: 18 }),frameRate: 10,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpUp',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 16, end: 18 }),frameRate: 10,repeat: 0});


        //jump down
        this.mainBodySprite5.anims.create({key: 'main-body-jumpDown',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 19, end: 20 }),frameRate: 10,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpDown',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 19, end: 20 }),frameRate: 10,repeat: 0});

        //sleep
        this.mainBodySprite5.anims.create({key: 'main-body-sleep',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 21, end: 30 }),frameRate: 3,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-sleep',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 21, end: 30  }),frameRate: 3,repeat: -1});

        //weapon swipe start
        this.mainBodySprite5.anims.create({key: 'main-body-swipe-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
        
        //weapon swipe end 
        this.mainBodySprite5.anims.create({key: 'main-body-swipe-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 31, end: 36 }),frameRate: 9,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 31, end: 36 }),frameRate: 9,repeat: 0});
        
        //weapon bonk 
        this.mainBodySprite5.anims.create({key: 'main-body-bonk-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 37, end: 42  }),frameRate: 9,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-bonk-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 37, end: 42  }),frameRate: 9,repeat: 0});
        
        //weapon poke
        this.mainBodySprite5.anims.create({key: 'main-body-poke-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 43, end: 48 }),frameRate: 12,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-poke-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 43, end: 48}),frameRate: 12,repeat: 0});
        

        //stuck animations
        this.mainBodySprite5.anims.create({key: 'blueSlimeStuck',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuated',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 4, end: 7 }),frameRate: 5,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedRepeat',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 4, end: 7 }),frameRate: 5,repeat: 1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedWalk',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 8, end: 15 }),frameRate: 5,repeat: -1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedFalling',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 18, end: 18 }),frameRate: 10,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'knockdown',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 20, end: 24 }),frameRate: 5,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'knockdownStruggle',frames: this.mainBodySprite5.anims.generateFrameNames('malePlayerStucks', { start: 24, end: 27 }),frameRate: 5,repeat: -1});
      
      }else{

        //idle male specific frames
        this.mainBodySprite5.anims.create({key: 'main-body-idle',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-idle',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        this.booba8.anims.create({key: 'booba-idle',frames: this.booba8.anims.generateFrameNames('8-1-evelyn-booba', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        this.boobaCloths8.anims.create({key: 'booba-cloths-idle',frames: this.boobaCloths8.anims.generateFrameNames('8-2-evelyn-booba-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        
        //walk frames
        this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 8, end: 15 }),frameRate: 15* this.speedBoost,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 8, end: 15 }),frameRate: 15* this.speedBoost,repeat: -1});
        
        //jump frames
        this.mainBodySprite5.anims.create({key: 'main-body-jumpUp',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 16, end: 18 }),frameRate: 10,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpUp',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 16, end: 18 }),frameRate: 10,repeat: 0});
        
        //jump down
        this.mainBodySprite5.anims.create({key: 'main-body-jumpDown',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 19, end: 20 }),frameRate: 10,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpDown',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 19, end: 20 }),frameRate: 10,repeat: 0});

        //sleep
        this.mainBodySprite5.anims.create({key: 'main-body-sleep',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 21, end: 30 }),frameRate: 3,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-sleep',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 21, end: 30  }),frameRate: 3,repeat: -1});
        this.booba8.anims.create({key: 'booba-sleep',frames: this.booba8.anims.generateFrameNames('8-1-evelyn-booba', { start: 8, end: 17  }),frameRate: 3,repeat: -1});
        this.boobaCloths8.anims.create({key: 'booba-cloths-sleep',frames: this.boobaCloths8.anims.generateFrameNames('8-2-evelyn-booba-cloths', { start: 8, end: 17  }),frameRate: 3,repeat: -1});
        
        //weapon swipe 12fps
        this.mainBodySprite5.anims.create({key: 'main-body-swipe-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
        this.booba8.anims.create({key: 'booba-swipe-12fps',frames: this.booba8.anims.generateFrameNames('8-1-evelyn-booba', { start: 19, end: 23  }),frameRate: 12,repeat: 0});
        this.boobaCloths8.anims.create({key: 'booba-cloths-swipe-12fps',frames: this.boobaCloths8.anims.generateFrameNames('8-2-evelyn-booba-cloths', { start: 19, end: 23  }),frameRate: 12,repeat: 0});
        
        //weapon swipe 9fps
        this.mainBodySprite5.anims.create({key: 'main-body-swipe-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 31, end: 36 }),frameRate: 9,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 31, end: 36 }),frameRate: 9,repeat: 0});
        this.booba8.anims.create({key: 'booba-swipe-9fps',frames: this.booba8.anims.generateFrameNames('8-1-evelyn-booba', { start: 19, end: 23  }),frameRate: 9,repeat: 0});
        this.boobaCloths8.anims.create({key: 'booba-cloths-swipe-9fps',frames: this.boobaCloths8.anims.generateFrameNames('8-2-evelyn-booba-cloths', { start: 19, end: 23  }),frameRate: 9,repeat: 0});
        
        //weapon bonk 
        this.mainBodySprite5.anims.create({key: 'main-body-bonk-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 37, end: 42  }),frameRate: 9,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-bonk-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 37, end: 42  }),frameRate: 9,repeat: 0});
        
        //weapon poke
        this.mainBodySprite5.anims.create({key: 'main-body-poke-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 43, end: 48 }),frameRate: 12,repeat: 0});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-poke-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 43, end: 48}),frameRate: 12,repeat: 0});
        this.booba8.anims.create({key: 'booba-poke-12fps',frames: this.booba8.anims.generateFrameNames('8-1-evelyn-booba', { start: 24, end: 29  }),frameRate: 12,repeat: 0});
        this.boobaCloths8.anims.create({key: 'booba-sleep-poke-12fps',frames: this.boobaCloths8.anims.generateFrameNames('8-2-evelyn-booba-cloths', { start: 24, end: 29  }),frameRate: 12,repeat: 0});

        //stuck animations
        this.mainBodySprite5.anims.create({key: 'blueSlimeStuck',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuated',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 4, end: 7 }),frameRate: 5,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedRepeat',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 4, end: 7 }),frameRate: 5,repeat: 1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedWalk',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 8, end: 15 }),frameRate: 5,repeat: -1});
        this.mainBodySprite5.anims.create({key: 'cursedHeartInfatuatedFalling',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 18, end: 18 }),frameRate: 10,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'knockdown',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 20, end: 24 }),frameRate: 5,repeat: 0});
        this.mainBodySprite5.anims.create({key: 'knockdownStruggle',frames: this.mainBodySprite5.anims.generateFrameNames('femalePlayerStucks', { start: 24, end: 27 }),frameRate: 5,repeat: -1});
      }
    }
}


