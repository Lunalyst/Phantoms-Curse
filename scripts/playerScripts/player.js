/*
//player entity./*
//i have a idea.
//start my making the player a container, which holds various layers of sprites.
//have the base layer which is the player nude.
//may need to have the player be the same height,
//so that when we have a layer above the player, like clothing, and weapon use, that those layer line up
//this is huge as it allows for alt outfits during gameplay, as well as
//less sprites overal
//because weapons could be a third sprite which is overlayed. meaning we dont need to make duplicate frames for every weapon.
//  when making new weapons.
// layer 1 player body. options of far : human, cobrabold.
// layer 2 cloths. default, grey jacket, maidoutfit.
layer 3 weapons: 
slashing animation: knife, hand,
thrusting: rapiers, spears ect
clobering: oar, clubs hammers
rock throw:
bow:

animation keys:
idler side
walk/run

//player keys
0) weapon back this.setDepth(6);
1)player back this.setDepth(7);


*note* to save on if cases, use the vanity itemslot id or name and add that to the name of regular animations.
 that way there is no need for a if statement when deciding animations.


// */

class player extends Phaser.GameObjects.Container{
  // every class needs constructor
  constructor(scene, xPos, yPos,sex){
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos);
    //then we add new instance into the scene. 
    scene.add.existing(this);

    //save sex value in the player object
    this.sex = sex;

    //add the ten layers that make up the sprite
    this.backLeg1 = scene.add.sprite(0, 0, '1-evan-back-leg');
    this.add(this.backLeg1);
    this.backLeg1.setScale(1/3);
    this.backLeg1.visible = false;

    this.backLegCloths2 = scene.add.sprite(0, 0, '2-evan-back-leg-cloths');
    this.add(this.backLegCloths2);
    this.backLegCloths2.setScale(1/3);

    this.backArm3 = scene.add.sprite(0, 0, '3-evan-back-arm');
    this.add(this.backArm3);
    this.backArm3.setScale(1/3);

    this.backArmCloths4 = scene.add.sprite(0, 0, '4-evan-back-arm-cloths');
    this.add(this.backArmCloths4);
    this.backArmCloths4.setScale(1/3);

    //the main player body layer is the layer with physics which has velocity, hitbox and gravity.
    this.mainHitbox = scene.physics.add.sprite(xPos, yPos, 'hitbox');
    //then we call this next line to give it collision
    scene.physics.add.existing(this.mainHitbox);

    if(sex === 0){
      //if the player is male,then when we push the weapon layer back. it belongs at position 3
      this.weaponPositionBack = 3;
      //then when we put it back to its correct position it ends up at layer 9 = 6 + 3
      this.weaponPositionfront = 6;

      this.mainBodySprite5 = scene.add.sprite(0, 0, '5-evan-main-body');
      this.mainBodyCloths6 = scene.add.sprite(0, 0, '6-evan-main-body-cloths');
    }else{

      //if the player is male,then when we push the weapon layer back. it belongs at position 3
      this.weaponPositionBack = 3;
      //then when we put it back to its correct position it ends up at layer position because of the two boob layers. 11 = 8 + 3
      this.weaponPositionfront = 8;

      this.mainBodySprite5 = scene.add.sprite(0, 0, '5-evelyn-main-body');
      this.mainBodyCloths6 = scene.add.sprite(0, 0, '6-evelyn-main-body-cloths');
    }

    this.add(this.mainBodySprite5);
    this.mainBodySprite5.setScale(1/3);
    this.add(this.mainBodyCloths6);
    this.mainBodyCloths6.setScale(1/3);

    this.frontArm7 = scene.add.sprite(0, 0, '7-evan-front-arm');
    this.add(this.frontArm7);
    this.frontArm7.setScale(1/3);

    this.frontArmCloths8 = scene.add.sprite(0, 0, '8-evan-front-arm-cloths');
    this.add(this.frontArmCloths8);
    this.frontArmCloths8.setScale(1/3);

    //if the player is female, add booba layers.
    if(sex === 1){
      this.booba8 = scene.add.sprite(0, 0, '8-1-evelyn-booba');
      this.add(this.booba8);
      this.booba8.setScale(1/3);

      this.boobaCloths8 = scene.add.sprite(0, 0, '8-2-evelyn-booba-cloths');
      this.add(this.boobaCloths8);
      this.boobaCloths8.setScale(1/3);
    }

    this.weaponLayer9 = scene.add.sprite(0, 0, '9-weapon-layer');
    this.add(this.weaponLayer9);
    this.weaponLayer9.setScale(1/3);
    this.weaponLayer9.visible = false;
    

    this.weaponHand10 = scene.add.sprite(0, 0, '10-weapon-hand');
    this.add(this.weaponHand10);
    this.weaponHand10.setScale(1/3);
    this.weaponHand10.visible = false;

    // creates a custome property to make it easy to track the identity of the player sprite.
    this.custom_id = 'player';
    // give player a idle timer to tell if player is gone long enough to start sleeping animation.
    this.idleTimer = 0;
    this.idleTimerDelay = false;
    // adds a key to tell movement function what key was pressed last to keep animations facing the right way
    this.lastKey = "d";
    //varibale use to tell what falling animation should be played. used to tell if the player is falling
    this.playerPreviousY = 0;
    this.animationPlayedGoingUp = false;
    this.animationPlayedGoingDown = false;
    this.animationInAir = false;
    //sets player gravity in the scene
    this.mainHitbox.body.setGravityY(600); 
    //object is on view layer 6
    this.setDepth(6);
    // hitbox cooldown.
    this.hitboxCoolDown = false;
    this.hitboxState = false;
    this.isAttacking = false;
    this.playedAttackAnimation = false;

    //used to tell what damage type the player is dealing with melee weapons.
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.curseDamage = 0;

    //did the player use the doublejump skill?
    this.doubleJumpActivation = false;
    this.spaceDelay = false;
    this.spaceWasPressed = false;
    this.jumped = false;


    //is used to increase players speed via items or skills.
    this.speedBoost = 1;

    this.dropChance = 1;
    this.dropAmount = 1;

    //sound effect cooldown
    this.soundCoolDown = false;

    //gives player a refrence to the scene.
    this.scene = scene;

    this.lanturnFlicker = null;

    if(scene.lightingSystemActive === true){ 

      this.lightSource = scene.lights.addLight(this.x, this.y, 0,0x000000, 1);
      this.lightSource.setColor(0xfffff0);

      this.lanturnFlicker = null;
      this.fuelActivated = false;
    }

    this.curseReductiontimer = false;
    /*
      playeridle: frames: 6 layer: 8 7 6 5 4 3
      playerWalk: frames: 15 layer: 1 2 3 4 5 6 7 8
      playerJumpUp frames: 10 layer: 5 6 7 8
      playerJumpDown frames: 10 layer: 5 6 7 8
      playerSleep frames: 1.5 layers: 5 6 7 8
      playerUnarmed frames: layers: 1 2 3 4 5 6 7 8 9

    */

    this.clothed = false;
    this.ringType = 0;

      //composit idle animation 
      this.backArm3.anims.create({key: 'back-arm-idle',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-idle',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-idle',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-idle',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});

      //composite walk animation
      this.backLeg1.anims.create({key: 'back-leg-walk',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 0, end: 7 }),frameRate: 15,repeat: -1});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-walk',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 0, end: 7 }),frameRate: 15,repeat: -1});
      this.backArm3.anims.create({key: 'back-arm-walk',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-walk',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-walk',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 8, end: 15}),frameRate: 15,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-walk',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      
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
      this.weaponLayer9.anims.create({key: 'weapon-start-unarmed',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 0, end: 2 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-unarmed',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 3, end: 5 }),frameRate: 12,repeat: 0});
  
      //knife
      this.weaponLayer9.anims.create({key: 'weapon-start-knife',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 6, end: 8 }),frameRate: 12,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-knife',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 9, end: 11 }),frameRate: 12,repeat: 0});

      //axe
      this.weaponLayer9.anims.create({key: 'weapon-start-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 12, end: 14 }),frameRate: 9,repeat: 0});
      this.weaponLayer9.anims.create({key: 'weapon-finish-axe',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 15, end: 17 }),frameRate: 9,repeat: 0});

      //oar
      this.weaponLayer9.anims.create({key: 'weapon-oar',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 18, end: 23 }),frameRate: 9,repeat: 0});

      //rapier
      this.weaponLayer9.anims.create({key: 'weapon-rapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 24, end: 29 }),frameRate: 12,repeat: 0});

      //rapier
      this.weaponLayer9.anims.create({key: 'weapon-mimicRapier',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 30, end: 35 }),frameRate: 12,repeat: 0});
    
      if(sex === 0){
        //this.booba8
        //idle male specific frames
        this.mainBodySprite5.anims.create({key: 'main-body-idle',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-idle',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
        
        //walk frames
        this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
        
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
        this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evelyn-main-body', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
        this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evelyn-main-body-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
        
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
        
        //shift some layers down by two pixels to align with the female sprite.
        this.backArm3.y = 2;
        this.backArmCloths4.y = 2;
        this.frontArm7.y = 2;
        this.frontArmCloths8.y = 2;
        this.weaponLayer9.y = 2;
        this.weaponHand10.y = 2;

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
    
  //built in move player function to handle how the player moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
  movePlayer(keyA,keyD,space,playerPreviousY,scene){
    
    this.x= this.mainHitbox.x;
    this.y= this.mainHitbox.y;
   
    //console.log("this.animationPlayedGoingUp:", this.animationPlayedGoingUp," this.animationPlayedGoingDown: ", this.animationPlayedGoingDown," this.animationInAir: ", this.animationInAir);
  //console.log("in player move, this.scene.checkWPressed(): ",this.scene.checkWPressed());
  //create a temp object to be sent to the emitter
  let playerSkillsObject = {
    playerSkills: null
  };

  //calls emitter to check if the player has skills that apply to movement
  playerSkillsEmitter.emit(playerSkills.getJump,playerSkillsObject);

  let playerDataObject = {
    playerInventoryData: null
  };
  // call to emitter to get player inventory data.
  //console.log("ACTIVATING GET INVENTORY EMITTER FROM PLAYER MOVEMENT FUNCTION");
  inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

  //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
  let playerHealthObject = {
    playerHealth: null
};

//gets the hp value using a emitter
healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

  //console.log("playerDataObject.playerInventoryData", playerDataObject.playerInventoryData);
  //if the player has speed ring equipt change speed multiplier.
  if(playerDataObject.playerInventoryData !== null){
    if(playerDataObject.playerInventoryData[1].itemID === 8){
      //console.log("speed ring equipt");
      this.speedBoost = 1.1;
      this.ringType = 8;
    }else{
      this.speedBoost = 1;
      this.ringType = 0;
    }

    //if the player is clothed.
    if(playerDataObject.playerInventoryData[3].itemID === 20){
      this.clothed = true;
    }else{
      this.clothed = false;
    }

    //if the mimic ring is equipt
    if(playerDataObject.playerInventoryData[2].itemID === 6){
      this.dropAmount = 2;
    }else{
      this.dropAmount = 1;
    }

    //if the mimic ring is equipt
    if(playerDataObject.playerInventoryData[1].itemID === 3){
      this.dropChance = 2;
    }else{
      this.dropChance = 1;
    }

    //if the cursed energyi snt zero
    if(playerHealthObject.playerCurse > 0 && this.curseReductiontimer === false){

      //reduce it by one every two seconds.
      this.curseReductiontimer = true;
      let tempPlayer = this;
      setTimeout(function () {
        tempPlayer.curseReductiontimer = false;
        healthEmitter.emit(healthEvent.reduceCurse,1);
      }, 2000);
      
    }
    

    //if the player has the lanturn equipt and the lighting system is used.
    if(playerDataObject.playerInventoryData[1].itemID === 21 && scene.lightingSystemActive === true){ 

      //then check to see if the player has fuel.
      if(playerDataObject.playerInventoryData[2].itemID === 16){

        //set a tween on the light source to make the lanturn flicker
        if(this.lanturnFlicker === undefined || this.lanturnFlicker === null ){

          this.lightSource.setRadius(100);

          this.lanturnFlicker = this.scene.tweens.add({
            targets: this.lightSource,
            props : {
                radius: {value : '+=' +8},
                intensity: {value : '+=' +.15},
  
            }, 
            ease: 'linear',
            duration: 800,
            repeat: -1,
            yoyo: true
          });
        }
        //console.log("this.fuelActivated: ", this.fuelActivated);
        //apply timer to fuel source and reduce fuel amount by 1 every 45 seconds.
        if(this.fuelActivated === false){

          this.fuelActivated = true;

          let tempPlayer = this;
          setTimeout(function(){
            if(tempPlayer !== undefined && tempPlayer !== null){

              //calls emitter to reduce item amount at specific location
              // in this case reduce slot 2 by 1.
              inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,2,1);
        
              tempPlayer.fuelActivated = false;


            }

          },2000);
  
        }


      //otherwise if there is no fuel to burn, set lanturn to be off.
      }else{
        this.lightSource.setRadius(0);
        if(this.lanturnFlicker !== undefined && this.lanturnFlicker !== null ){
          this.lanturnFlicker.stop();
          this.lanturnFlicker = null;
        }

      }

    //otherwise turn the lightsource off
    }else if(scene.lightingSystemActive === true){

      this.lightSource.setRadius(0);

      if(this.lanturnFlicker !== undefined && this.lanturnFlicker !== null ){
          this.lanturnFlicker.stop();
          this.lanturnFlicker = null;
      }
    }
  }


  
  if(this.isAttacking === false){
    //move the player left
    
    //console.log("this.scene.checkAIsDown()",this.scene.checkAIsDown());
    if(this.scene.checkAIsDown() && this.mainHitbox.body.blocked.down){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.lastKey = "a";
        this.idleTimer = 0;
        this.mainHitbox.setVelocityX(-250 * this.speedBoost);
        if(this.mainHitbox.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(true);
          //console.log("moving left");
        }

    //moves the player right
    } else if(this.scene.checkDIsDown() && this.mainHitbox.body.blocked.down){
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.lastKey = "d";
        this.idleTimer = 0;
        this.mainHitbox.setVelocityX(250 * this.speedBoost);
        if(this.mainHitbox.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(false);
          //console.log("moving Right");
        }

    //if the player doesnt move for long enough, play idle animation
    }else if(this.idleTimer === 2000){
        this.mainHitbox.setVelocityX(0);
        this.playersleepAnimation();

    //otherwise we play idle animation
    }else{
      this.mainHitbox.setSize(10,60,true);
      this.mainHitbox.setOffset(12, -4);
        this.mainHitbox.setVelocityX(0);

        if(this.animationInAir === false){
          if(this.lastKey === "d"){
            this.playerIdleAnimation();
            this.flipXcontainer(false);
          }else if(this.lastKey === "a"){
            this.playerIdleAnimation();
            this.flipXcontainer(true);
          }
        }

        // resets the ilde animation value.
        if(this.idleTimer < 2000 && this.idleTimerDelay === false){
          //console.log("Idle Timer: "+ this.idleTimer);
          let that = this;
          this.idleTimerDelay = true;
          setTimeout(function(){
            that.idleTimer++;
            that.idleTimerDelay = false;
          },1);
          
        }    
      }

    //if the player is down, then reset variables.   
    if(this.mainHitbox.body.blocked.down){
      this.animationPlayedGoingUp = false;
      this.animationPlayedGoingDown = false;
      this.animationInAir = false;
      this.doubleJumpActivation = false;
      this.spaceWasPressed = false;
      this.spaceDelay = false;
    }
      
    //if space is pressed and the player is on the ground then jump
    //special note, always have the checkpressed at the end if the if statement. programming trick
    //first check if the player is down.
    if (this.mainHitbox.body.blocked.down){
      //console.log("player is down.")
      // then we have to check if jump was pressed once. we have to structure it this way so that the jump doesnt get locked out.
      if(this.scene.checkJMPPressed()){

        //console.log("first jump")
        this.idleTimer = 0;
        this.mainHitbox.setVelocityY(-350);
        let that = this;

      }
      
    }

    //if the player is  in the air and moving to the left
    if(this.scene.checkAIsDown() && !this.mainHitbox.body.blocked.down){
    //console.log("IN AIR AND MOVING LEFT");
      this.mainHitbox.setVelocityX(-250 * this.speedBoost);
      this.animationInAir = true;
      this.flipXcontainer(true);
      let that = this;


        //console.log("this.spaceWasPressed: ",this.spaceWasPressed," this.doubleJumpActivation: ",this.doubleJumpActivation," playerSkillsObject.playerSkills.jump: ",playerSkillsObject.playerSkills.jump);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed()  && playerSkillsObject.playerSkills.jump === 1){
          //console.log("activating double jump while aKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
          
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.playerJumpUpAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping while keyA is down and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          
        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping while keyA is down and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
      //checks to see if player is moving right and not touching the ground.

    //if the player is  in the air and moving to the right
    }else if(this.scene.checkDIsDown() && !this.mainHitbox.body.blocked.down){
        //console.log("IN AIR AND MOVING RIGHT");
        this.mainHitbox.setVelocityX(250 * this.speedBoost);
        this.animationInAir = true;
        this.flipXcontainer(false);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump while dKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.animationPlayedGoingUp === false){

          this.playerJumpUpAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);

        }else if(playerPreviousY <= this.y &&  this.animationPlayedGoingDown === false){

          this.playerJumpDownAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        
        }

    //if the player is in the air.
    }else if(!this.mainHitbox.body.blocked.down){
        this.idleTimer = 0;
        this.animationInAir = true;
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false  && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainHitbox.setVelocityY(-350);
          this.scene.initSoundEffect('playerJumpSFX','1',0.1);
          scene.tempPlatform = new doubleJumpEffect(scene,scene.player1.x,scene.player1.y+40,'doubleJumpEffect');
        }

        if(playerPreviousY > this.y && this.lastKey === "d"&& this.animationPlayedGoingUp === false){
          this.playerJumpUpAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "d"&&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(false);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY > this.y && this.lastKey === "a"&& this.animationPlayedGoingUp === false){
          this.playerJumpUpAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingUp = true;
          //console.log(" jumping and velocity is up, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }else if(playerPreviousY <= this.y && this.lastKey === "a"&&  this.animationPlayedGoingDown === false){
          this.playerJumpDownAnimation();
          this.flipXcontainer(true);
          this.animationPlayedGoingDown = true;
          //console.log(" jumping and velocity is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
        }
        //console.log("in the air");
        }
        //console.log("previous player y"+ playerPreviousY);
    }
      playerPreviousY = this.y;

      //ensures that no mater what player is facing the correct way.
      if(this.scene.checkDIsDown()){
        this.lastKey = "d";
      }else if(this.scene.checkAIsDown()){
        this.lastKey = "a";
      }

      //console.log("from move player this.lastKey: ",this.lastKey);
  }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles player attack animations.
  attackPlayer(){
    //console.log("activating attack function");
    //temp variable of this object to be used my timeout functions
    let that = this;
    this.mainHitbox.setSize(10,60,true);
    this.mainHitbox.setOffset(12, -4 );

    this.x = this.mainHitbox.x;
    this.y = this.mainHitbox.y; 

    //temp object sent to be sent to a emitter
    let playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

      
      //plays attack animations based on what the player has equipt when the player is not in the air,player now locked into the animation until it completes
      if(this.mainHitbox.body.blocked.down && this.isAttacking === true){

        console.log("attacking activated.")

        //depending on the key, decide which switch to enter for correctly oriented hitbox 
        if(this.lastKey === 'd'){
          this.flipXcontainer(false);
        }else if(this.lastKey === 'a'){
          this.flipXcontainer(true);
        }

        //wakes up player if they are sleeping.
        this.idleTimer = 0;

          //case to determine attack animation
          switch(playerDataObject.playerInventoryData[0].itemID) {
            case (2):
              if(this.playedAttackAnimation === false){
                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','medium',0.1);
                this.playerBonkAnimation9FPS();

                this.weaponLayer9.anims.play("weapon-oar").once('animationcomplete', () => {

                  this.isAttacking = false;
                  this.playedAttackAnimation = false;
                  console.log("attack is over so stoping");
                  this.bluntDamage = 0;

                });
              }
              this.bluntDamage = 3;
              this.setAttackHitboxSize(20,40);
              this.HitBox(600,35);
              break;
            case (4):
              console.log("starting knife animation");
              
              if(this.playedAttackAnimation === false){
                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high2',0.1);
                this.playerSwipeAnimation12FPS();
              
                this.weaponLayer9.anims.play("weapon-start-knife").once('animationcomplete', () => {
                  //sends the weapon layer to the back
                  this.sendToBack(this.weaponLayer9);
                  this.moveUpXTimes(this.weaponPositionBack);

                  this.weaponLayer9.anims.play("weapon-finish-knife").once('animationcomplete', () => {
                    this.moveUpXTimes(this.weaponPositionfront-1);
                    this.isAttacking = false;
                    this.playedAttackAnimation = false;
                    console.log("attack is over so stoping");
                    this.sliceDamage = 0;
                  });
                });
              }
              this.sliceDamage = 4;
              this.setAttackHitboxSize(15,30);
              this.HitBox(200,25);  
              break;
            case (10):
              if(this.playedAttackAnimation === false){
                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','heavy',0.1);
                this.playerSwipeAnimation9FPS();
                
                this.weaponLayer9.anims.play("weapon-start-axe").once('animationcomplete', () => {
                  //sends the weapon layer to the back
                  this.sendToBack(this.weaponLayer9);
                  this.moveUpXTimes(this.weaponPositionBack);

                  this.weaponLayer9.anims.play("weapon-finish-axe").once('animationcomplete', () => {
                    this.moveUpXTimes(this.weaponPositionfront);

                    this.isAttacking = false;
                    this.playedAttackAnimation = false;
                    console.log("attack is over so stoping");
                    this.sliceDamage = 0;
                  });
                });
              }
              this.sliceDamage = 8;
              this.setAttackHitboxSize(20,30);
              this.HitBox(300,30);
              break;
              case (1):
              if(this.playedAttackAnimation === false){
                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high2',0.1);
                this.playerPokeAnimation12FPS();

                this.weaponLayer9.anims.play("weapon-rapier").once('animationcomplete', () => {
                  this.isAttacking = false;
                  this.playedAttackAnimation = false;
                  console.log("attack is over so stoping");
                  this.pierceDamage = 0;
                });

              }
              this.pierceDamage = 6;
              this.setAttackHitboxSize(60,30);
              this.HitBox(400,35);
              break;
              case (3):
              if(this.playedAttackAnimation === false){
                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high2',0.1);
                this.playerPokeAnimation12FPS();
                this.weaponLayer9.anims.play("weapon-mimicRapier").once('animationcomplete', () => {
                  this.isAttacking = false;
                  this.playedAttackAnimation = false;
                  console.log("attack is over so stoping");
                  this.pierceDamage = 0;
                  this.curseDamage = 0;
              });
              }
              this.pierceDamage = 4;
              this.curseDamage = 4;
              this.setAttackHitboxSize(60,30);
              this.HitBox(400,35);
              break;
            default:
              console.log("attacking animation unarmed");
              if(this.playedAttackAnimation === false){

                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high1',0.1);
                this.playerUnarmedAnimation();
                console.log("this.playedAttackAnimation: ",this.playedAttackAnimation);
                this.weaponLayer9.anims.play("weapon-start-unarmed").once('animationcomplete', () => {

                  //sends the weapon layer to the back
                  this.sendToBack(this.weaponLayer9);
                  this.moveUpXTimes(this.weaponPositionBack);
                  console.log("unarmed half way point SHOULD BE STARTING FINISHED HALF OF THE ANIMATION/");
                  this.playedAttackAnimation = true;

                  this.weaponLayer9.anims.play("weapon-finish-unarmed").once('animationcomplete', () => {
                    //sends weapon layer back to front -1
                    this.moveUpXTimes(this.weaponPositionfront);
                    console.log("unarmed finished way point");

                    this.backLeg1.visible = false;
                    this.backLegCloths2.visible = false;
                    this.isAttacking = false;
                    this.playedAttackAnimation = false;
                    console.log("attack is over so stoping");
                    this.bluntDamage = 0;
                  });
                });
              }
              this.bluntDamage = 1;
              this.setAttackHitboxSize(10,20);
              this.HitBox(200,20);
            }
            //console.log("isattacking: ", this.isAttacking);

      }else{
        console.log("attack else case")
        //important fall though caseto reset variables if the player is not swinging
        this.scene.attackHitBox.x = this.x;
        this.scene.attackHitBox.y = this.y+10000;

        //important reset of the hitbox state incase the player isnt swinging set this to false.
        this.hitboxState = false;

        //resets variable so player only swings once per press of shift
        this.isAttacking = false;

        //stops weapon sound effects.
        this.scene.initSoundEffect('weaponSFX','medium',0);
        this.scene.sound.get('weaponSFX').stop();
      }
    
      
    
  
  }

  //handles hitbox position when attacking right, note this function is only activated if shift is down. that is handle
  //note make a function that given a size number can change the shape of the hitbox?
  HitBox(delay,distance){

    //stop the players velocity
    this.mainHitbox.setVelocityX(0);
    
    //start by having the player press shift state should be false
    if(this.hitboxState === false){
      

      //player is swinging so  set the state to true
      this.hitboxState = true;

      // now we start a timer that will activate the hitbox
      let tempPlayer = this;
      setTimeout(function(){

        //after half the delay given we check the hitbox state if its still true
        //console.log("Phaser.Input.Keyboard.JustDown(this.scene.shift) ",Phaser.Input.Keyboard.JustDown(this.scene.shift))
        if(tempPlayer.hitboxState === true){
          
          //put hitbox infront of the player in the way there facing
          if(tempPlayer.lastKey === 'd'){
            tempPlayer.scene.attackHitBox.x = tempPlayer.x+distance;

            //has the player move forward slightly
            if(!tempPlayer.scene.playerGrabbed){
              tempPlayer.mainHitbox.setVelocityX(20);
            }
          }else{
            tempPlayer.scene.attackHitBox.x = tempPlayer.x-distance;

            if(!tempPlayer.scene.playerGrabbed){
              tempPlayer.mainHitbox.setVelocityX(-20);
            }
          }
          tempPlayer.scene.attackHitBox.y = tempPlayer.y

          //set a timeout function so the hitbox lingeres for a tenth of a second
          setTimeout(function(){
            
            //after that time is up put the hitbox back to its idle location and reset the hitboxstate variable. 
            tempPlayer.scene.attackHitBox.x = tempPlayer.x;
            tempPlayer.scene.attackHitBox.y = tempPlayer.y+10000;
            tempPlayer.hitboxState = false;

          },100);

        //otherwise reset state of attack hitbox
        }

      },delay/2);
    }
  }

  // function to activate the weapon swing effect
  //type are light1 light2 medium and heavy
  weaponSoundEffect(type, delay){
    if(this.soundCoolDown === false){
      this.scene.initSoundEffect('weaponSFX',type,0.1);
      this.soundCoolDown = true;

      let player = this;
      setTimeout(function () {
          player.soundCoolDown = false;
      }, delay);
    }
  }

  //sets size of hitbox while attacking.
  setAttackHitboxSize(width,height){
    this.scene.attackHitBox.setSize(width,height);
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

  resetAttack(){
    //console.log("reseting attack animation values.")
    this.moveUpXTimes(this.weaponPositionfront);
    this.isAttacking = false;
    this.playedAttackAnimation = false;
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.curseDamage = 0;


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
  
}


