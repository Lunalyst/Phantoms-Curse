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
    this.mainBodySprite5 = scene.add.sprite(0, 0, '5-evan-main-body');
    this.add(this.mainBodySprite5);
    this.mainBodySprite5.setScale(1/3);

    this.mainBody5 = scene.physics.add.sprite(xPos, yPos, 'hitbox');

    //then we call this next line to give it collision
    scene.physics.add.existing(this.mainBody5);

    this.mainBodyCloths6 = scene.add.sprite(0, 0, '6-evan-main-body-cloths');
    this.add(this.mainBodyCloths6);
    this.mainBodyCloths6.setScale(1/3);

    this.frontArm7 = scene.add.sprite(0, 0, '7-evan-front-arm');
    this.add(this.frontArm7);
    this.frontArm7.setScale(1/3);

    this.frontArmCloths8 = scene.add.sprite(0, 0, '8-evan-front-arm-cloths');
    this.add(this.frontArmCloths8);
    this.frontArmCloths8.setScale(1/3);

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
    this.mainBody5.body.setGravityY(600); 
    //player not pushable. may cause a problem if i want a enemy that throws player
    //this.mainBody5.setPushable(false);
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

    //shrinks the sprite by 1/3 since the sprites are 3 times as big to improve resolution.
    //this.setScale(1/3);

    //is used to increase players speed via items or skills.
    this.speedBoost = 1;

    //sound effect cooldown
    this.soundCoolDown = false;

    //gives player a refrence to the scene.
    this.scene = scene;
    if(scene.lightingSystemActive === true){ 
      this.lightSource = scene.lights.addLight(this.x, this.y, 200,0x000000, 0.5);
    }
    /*
      playeridle: frames: 6 layer: 8 7 6 5 4 3
      playerWalk: frames: 15 layer: 1 2 3 4 5 6 7 8
      playerJumpUp frames: 10 layer: 5 6 7 8
      playerJumpDown frames: 10 layer: 5 6 7 8
      playerSleep frames: 1.5 layers: 5 6 7 8
      playerUnarmed frames: layers: 1 2 3 4 5 6 7 8 9

      template
      this.backLeg1.anims.create({key: 'back-leg-walk',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-walk',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backArm3.anims.create({key: 'back-arm-walk',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-walk',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-walk',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-walk',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.weaponLayer9.anims.create({key: 'weapon-walk',frames: this.weaponLayer9.anims.generateFrameNames('9-weapon-layer', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.weaponHand10.anims.create({key: 'weapon-hand-walk',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 0, end: 7 }),frameRate: 6,repeat: -1});

    */ 

    this.clothed = false;

    if(sex === 0){

      //composit idle animation 
      this.backArm3.anims.create({key: 'back-arm-idle',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-idle',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.mainBodySprite5.anims.create({key: 'main-body-idle',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-idle',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-idle',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 0, end: 7 }),frameRate: 6,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-idle',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 0, end: 7 }),frameRate: 6,repeat: -1});

      //composite walk animation
      this.backLeg1.anims.create({key: 'back-leg-walk',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 0, end: 7 }),frameRate: 15,repeat: -1});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-walk',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 0, end: 7 }),frameRate: 15,repeat: -1});
      this.backArm3.anims.create({key: 'back-arm-walk',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-walk',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.mainBodySprite5.anims.create({key: 'main-body-walk',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-walk',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-walk',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 8, end: 15}),frameRate: 15,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-walk',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 8, end: 15 }),frameRate: 15,repeat: -1});
      
      //jump up animation
      this.mainBodySprite5.anims.create({key: 'main-body-jumpUp',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 16, end: 18 }),frameRate: 10,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpUp',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 16, end: 18 }),frameRate: 10,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-jumpUp',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 16, end: 18}),frameRate: 10,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-jumpUp',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 16, end: 18 }),frameRate: 10,repeat: 0});

      //down animation
      this.mainBodySprite5.anims.create({key: 'main-body-jumpDown',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 19, end: 20 }),frameRate: 10,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-jumpDown',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 19, end: 20 }),frameRate: 10,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-jumpDown',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 19, end: 20}),frameRate: 10,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-jumpDown',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 19, end: 20 }),frameRate: 10,repeat: 0});

      //sleep animation
      this.mainBodySprite5.anims.create({key: 'main-body-sleep',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 22, end: 30 }),frameRate: 3,repeat: -1});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-sleep',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 22, end: 30  }),frameRate: 3,repeat: -1});
      this.frontArm7.anims.create({key: 'front-arm-sleep',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', { start: 22, end: 30 }),frameRate: 3,repeat: -1});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-sleep',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', { start: 22, end: 30 }),frameRate: 3,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.backLeg1.anims.create({key: 'back-leg-swipe-12fps',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 8, end: 13 }),frameRate: 12,repeat: 0});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-swipe-12fps',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 8, end: 13 }),frameRate: 12,repeat: 0});
      this.backArm3.anims.create({key: 'back-arm-swipe-12fps',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 22, end: 27 }),frameRate: 12,repeat: 0});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-swipe-12fps',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 16, end: 21 }),frameRate: 12,repeat: 0});
      this.mainBodySprite5.anims.create({key: 'main-body-swipe-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 31, end: 37 }),frameRate: 12,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-swipe-12fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 31, end: 37 }),frameRate: 12,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-swipe-12fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 31, end: 37 }),frameRate: 12,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-swipe-12fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 0, end: 5 }),frameRate: 12,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.backLeg1.anims.create({key: 'back-leg-swipe-9fps',frames: this.backLeg1.anims.generateFrameNames('1-evan-back-leg', { start: 8, end: 13 }),frameRate: 9,repeat: 0});
      this.backLegCloths2.anims.create({key: 'back-leg-cloths-swipe-9fps',frames: this.backLegCloths2.anims.generateFrameNames('2-evan-back-leg-cloths', { start: 8, end: 13 }),frameRate: 9,repeat: 0});
      this.backArm3.anims.create({key: 'back-arm-swipe-9fps',frames: this.backArm3.anims.generateFrameNames('3-evan-back-arm', { start: 22, end: 27 }),frameRate: 9,repeat: 0});
      this.backArmCloths4.anims.create({key: 'back-arm-cloths-swipe-9fps',frames: this.backArmCloths4.anims.generateFrameNames('4-evan-back-arm-cloths', { start: 16, end: 21 }),frameRate: 9,repeat: 0});
      this.mainBodySprite5.anims.create({key: 'main-body-swipe-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 31, end: 37 }),frameRate: 9,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-swipe-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 31, end: 37 }),frameRate: 9,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-swipe-9fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 31, end: 37 }),frameRate: 9,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-swipe-9fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 31, end: 37 }),frameRate: 9,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-swipe-9fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 0, end: 5 }),frameRate: 9,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.mainBodySprite5.anims.create({key: 'main-body-bonk-9fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 43, end: 48 }),frameRate: 9,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-bonk-9fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 43, end: 48 }),frameRate: 9,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-bonk-9fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 43, end: 48 }),frameRate: 9,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-bonk-9fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 43, end: 48 }),frameRate: 9,repeat: 0});
      this.weaponHand10.anims.create({key: 'weapon-hand-bonk-9fps',frames: this.weaponHand10.anims.generateFrameNames('10-weapon-hand', { start: 6, end: 11 }),frameRate: 9,repeat: -1});

      //weapon swipe animation used for unarmed, knife and axe
      this.mainBodySprite5.anims.create({key: 'main-body-poke-12fps',frames: this.mainBodySprite5.anims.generateFrameNames('5-evan-main-body', { start: 49, end: 54 }),frameRate: 12,repeat: 0});
      this.mainBodyCloths6.anims.create({key: 'main-body-cloths-poke-12fps',frames: this.mainBodyCloths6.anims.generateFrameNames('6-evan-main-body-cloths', { start: 49, end: 54 }),frameRate: 12,repeat: 0});
      this.frontArm7.anims.create({key: 'front-arm-poke-12fps',frames: this.frontArm7.anims.generateFrameNames('7-evan-front-arm', {  start: 49, end: 54 }),frameRate: 12,repeat: 0});
      this.frontArmCloths8.anims.create({key: 'front-arm-cloths-poke-12fps',frames: this.frontArmCloths8.anims.generateFrameNames('8-evan-front-arm-cloths', {  start: 49, end: 54 }),frameRate: 12,repeat: 0});
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





    }else{

    }
    
    
    //defines player animations. animations are define on startup based on the players sex
    /*if(sex === 0){
      this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('malePlayer', { start: 1, end: 8 }),frameRate: 6,repeat: -1});
      this.anims.create({key: 'p',frames: this.anims.generateFrameNames('malePlayer', { start: 9, end: 16 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'pJumpUp',frames: this.anims.generateFrameNames('malePlayer', { start: 17, end: 19 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pJumpDown',frames: this.anims.generateFrameNames('malePlayer', { start: 20, end: 21 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('malePlayer', { start: 22, end: 41 }),frameRate: 1.5,repeat: -1});
      
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('malePlayer', { start: 42, end: 47 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('malePlayer', { start: 48, end: 53 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('malePlayer', { start: 54, end: 59 }),frameRate: 9,repeat: 0});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('malePlayer', { start: 60, end: 65 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'pAttackRapier',frames: this.anims.generateFrameNames('malePlayer', { start: 66, end: 71 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackMimicRapier',frames: this.anims.generateFrameNames('malePlayer', { start: 72, end: 77 }),frameRate: 12,repeat: 0});
    }else{
      this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('femalePlayer', { start: 1, end: 8 }),frameRate: 6,repeat: -1});
      this.anims.create({key: 'p',frames: this.anims.generateFrameNames('femalePlayer', { start: 9, end: 16 }),frameRate: 15,repeat: -1});
      this.anims.create({key: 'pJumpUp',frames: this.anims.generateFrameNames('femalePlayer', { start: 17, end: 19 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pJumpDown',frames: this.anims.generateFrameNames('femalePlayer', { start: 20, end: 21 }),frameRate: 10 ,repeat: 0});
      this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('femalePlayer', { start: 22, end: 41 }),frameRate: 1.5,repeat: -1});
    
      this.anims.create({key: 'pAttackUnarmed',frames: this.anims.generateFrameNames('femalePlayer', { start: 42, end: 47 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackKnife',frames: this.anims.generateFrameNames('femalePlayer', { start: 48, end: 53 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackAxe',frames: this.anims.generateFrameNames('femalePlayer', { start: 54, end: 59 }),frameRate: 9,repeat: 0});
      this.anims.create({key: 'pAttackOar',frames: this.anims.generateFrameNames('femalePlayer', { start: 60, end: 65 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'pAttackRapier',frames: this.anims.generateFrameNames('femalePlayer', { start: 66, end: 71 }),frameRate: 12,repeat: 0});
      this.anims.create({key: 'pAttackMimicRapier',frames: this.anims.generateFrameNames('femalePlayer', { start: 72, end: 77 }),frameRate: 12,repeat: 0});
    
    }*/
  }
    
  //built in move player function to handle how the player moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
  movePlayer(keyA,keyD,space,playerPreviousY,scene){

    this.x= this.mainBody5.x;
    this.y= this.mainBody5.y;
   
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

  
  //console.log("playerDataObject.playerInventoryData", playerDataObject.playerInventoryData);
  //if the player has speed ring equipt change speed multiplier.
  if(playerDataObject.playerInventoryData !== null){
    if(playerDataObject.playerInventoryData[1].itemID === 8){
      //console.log("speed ring equipt");
      this.speedBoost = 1.1;
    }else{
      this.speedBoost = 1;
    }
  }
  
  if(this.isAttacking === false){
    //move the player left
    
    //console.log("this.scene.checkAIsDown()",this.scene.checkAIsDown());
    if(this.scene.checkAIsDown() && this.mainBody5.body.blocked.down){
      this.mainBody5.setSize(10,60,true);
      this.mainBody5.setOffset(12, -4);
        this.lastKey = "a";
        this.idleTimer = 0;
        this.mainBody5.setVelocityX(-250 * this.speedBoost);
        if(this.mainBody5.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(true);
          //console.log("moving left");
        }

    //moves the player right
    } else if(this.scene.checkDIsDown() && this.mainBody5.body.blocked.down){
      this.mainBody5.setSize(10,60,true);
      this.mainBody5.setOffset(12, -4);
        this.lastKey = "d";
        this.idleTimer = 0;
        this.mainBody5.setVelocityX(250 * this.speedBoost);
        if(this.mainBody5.body.blocked.down){
          this.playerWalkAnimation();
          this.flipXcontainer(false);
          //console.log("moving Right");
        }

    //if the player doesnt move for long enough, play idle animation
    }else if(this.idleTimer === 2000){
        this.mainBody5.setVelocityX(0);
        this.playersleepAnimation();

    //otherwise we play idle animation
    }else{
      this.mainBody5.setSize(10,60,true);
      this.mainBody5.setOffset(12, -4);
        this.mainBody5.setVelocityX(0);

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
    if(this.mainBody5.body.blocked.down){
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
    if (this.mainBody5.body.blocked.down){
      //console.log("player is down.")
      // then we have to check if jump was pressed once. we have to structure it this way so that the jump doesnt get locked out.
      if(this.scene.checkJMPPressed()){

        //console.log("first jump")
        this.idleTimer = 0;
        this.mainBody5.setVelocityY(-350);
        let that = this;

      }
      
    }

    //if the player is  in the air and moving to the left
    if(this.scene.checkAIsDown() && !this.mainBody5.body.blocked.down){
    console.log("IN AIR AND MOVING LEFT");
      this.mainBody5.setVelocityX(-250 * this.speedBoost);
      this.animationInAir = true;
      this.flipXcontainer(true);
      let that = this;


        console.log("this.spaceWasPressed: ",this.spaceWasPressed," this.doubleJumpActivation: ",this.doubleJumpActivation," playerSkillsObject.playerSkills.jump: ",playerSkillsObject.playerSkills.jump);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed()  && playerSkillsObject.playerSkills.jump === 1){
          //console.log("activating double jump while aKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainBody5.setVelocityY(-350);
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
    }else if(this.scene.checkDIsDown() && !this.mainBody5.body.blocked.down){
        //console.log("IN AIR AND MOVING RIGHT");
        this.mainBody5.setVelocityX(250 * this.speedBoost);
        this.animationInAir = true;
        this.flipXcontainer(false);
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump while dKey is down, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainBody5.setVelocityY(-350);
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
    }else if(!this.mainBody5.body.blocked.down){
        this.idleTimer = 0;
        this.animationInAir = true;
        //if the player has the double jump ability, allow them to jupm agian.
        if(this.doubleJumpActivation === false  && this.scene.checkJMPPressed() && playerSkillsObject.playerSkills.jump === 1 ){
          //console.log("activating double jump, this.doubleJumpActivation: ",this.doubleJumpActivation," space.isDown: ",space.isDown," scene.playerSkillsData.jump: ",scene.playerSkillsData.jump," this.doubleJumpActivation: ",this.doubleJumpActivation);
          this.doubleJumpActivation = true;
          this.animationPlayedGoingUp = false;
          this.animationPlayedGoingDown = false;
          this.mainBody5.setVelocityY(-350);
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
  }

  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  //this function handles player attack animations.
  attackPlayer(scene){
    //temp variable of this object to be used my timeout functions
    let that = this;
    this.mainBody5.setSize(10,60,true);
    this.mainBody5.setOffset(12, -4 );

    this.x= this.mainBody5.x;
    this.y= this.mainBody5.y; 

    //temp object sent to be sent to a emitter
    let playerDataObject = {
      playerInventoryData: null
    };
    // call to emitter to get player inventory data.
    inventoryKeyEmitter.emit(inventoryKey.getInventory,playerDataObject);

    //if shift is pressed then force the player to attacks, no animation cancel
    if(this.mainBody5.body.blocked.down && this.scene.checkATKIsDown() && this.isAttacking === false){
      this.isAttacking = true;

    //plays attack animations based on what the player has equipt when the player is not in the air,player now locked into the animation until it completes
    }else if(this.mainBody5.body.blocked.down && this.isAttacking === true){

      //depending on the key, decide which switch to enter for correctly oriented hitbox 
      if(this.lastKey === 'd'){
        this.flipXcontainer(false);
      }else if(this.lastKey === 'a'){
        this.flipXcontainer(true);
      }

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
            this.setAttackHitboxSize(20,30);
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
                this.moveUpXTimes(3);

                this.weaponLayer9.anims.play("weapon-finish-knife").once('animationcomplete', () => {
                  this.moveUpXTimes(6);
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
                this.moveUpXTimes(3);

                this.weaponLayer9.anims.play("weapon-finish-axe").once('animationcomplete', () => {
                  this.moveUpXTimes(6);

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
            this.setAttackHitboxSize(20,30);
            this.HitBox(600,35);
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
            this.setAttackHitboxSize(20,30);
            this.HitBox(600,35);
            break;
          default:
            if(this.playedAttackAnimation === false){
              this.playedAttackAnimation = true;
              this.scene.initSoundEffect('weaponSFX','high1',0.1);
              this.playerUnarmedAnimation();

              this.weaponLayer9.anims.play("weapon-start-unarmed").once('animationcomplete', () => {

                //sends the weapon layer to the back
                this.sendToBack(this.weaponLayer9);
                this.moveUpXTimes(3);

                this.weaponLayer9.anims.play("weapon-finish-unarmed").once('animationcomplete', () => {
                  //sends weapon layer back to front -1
                  this.moveUpXTimes(6);

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

    //otherwise is the player isnt attacking anymore then reset all values
    }else{
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
    this.mainBody5.setVelocityX(0);
    
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
              tempPlayer.mainBody5.setVelocityX(20);
            }
          }else{
            tempPlayer.scene.attackHitBox.x = tempPlayer.x-distance;

            if(!tempPlayer.scene.playerGrabbed){
              tempPlayer.mainBody5.setVelocityX(-20);
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


  }

  //moves the weapon layer  x times
  moveUpXTimes(moves){
    for(let i = 0; i < moves;i++){
      this.moveUp(this.weaponLayer9);
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
    
    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = false;
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
  }

  playerWalkAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = false;
    this.weaponHand10.visible = false;

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
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
    this.mainBodySprite5.anims.play('main-body-sleep',true);
    this.mainBodyCloths6.anims.play('main-body-cloths-sleep',true);
    this.frontArm7.anims.play('front-arm-sleep',true);
    this.frontArmCloths8.anims.play('front-arm-cloths-sleep',true);
    this.weaponLayer9.anims.stop();
    this.weaponHand10.anims.stop();

  }

  playerUnarmedAnimation(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = false;

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
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
    this.backLeg1.anims.play('back-leg-swipe-12fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-12fps');
    this.backArm3.anims.play('back-arm-unarmed');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-12fps');
    this.mainBodySprite5.anims.play('main-body-swipe-12fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-12fps');
    this.frontArm7.anims.play('front-arm-swipe-12fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-12fps');
    
    this.weaponHand10.anims.stop();

  }

  playerSwipeAnimation12FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
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
    this.backLeg1.anims.play('back-leg-swipe-12fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-12fps');
    this.backArm3.anims.play('back-arm-swipe-12fps');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-12fps');
    this.mainBodySprite5.anims.play('main-body-swipe-12fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-12fps');
    this.frontArm7.anims.play('front-arm-swipe-12fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-12fps');
   
    this.weaponHand10.anims.play('weapon-hand-swipe-12fps');
  }

  playerSwipeAnimation9FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backArm3.visible = true;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
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
    this.backLeg1.anims.play('back-leg-swipe-9fps');
    this.backLegCloths2.anims.play('back-leg-cloths-swipe-9fps');
    this.backArm3.anims.play('back-arm-swipe-9fps');
    this.backArmCloths4.anims.play('back-arm-cloths-swipe-9fps');
    this.mainBodySprite5.anims.play('main-body-swipe-9fps');
    this.mainBodyCloths6.anims.play('main-body-cloths-swipe-9fps');
    this.frontArm7.anims.play('front-arm-swipe-9fps');
    this.frontArmCloths8.anims.play('front-arm-cloths-swipe-9fps');
   
    this.weaponHand10.anims.play('weapon-hand-swipe-9fps');
  }

  playerBonkAnimation9FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = true;
    this.backLegCloths2.visible = true;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
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
  }

  playerPokeAnimation12FPS(){

    //set visibility of layers needed for the animation
    this.backLeg1.visible = false;
    this.backLegCloths2.visible = false;
    this.backArm3.visible = false;
    this.backArmCloths4.visible = false;
    this.mainBodySprite5.visible = true;
    this.frontArm7.visible = true;
    this.weaponLayer9.visible = true;
    this.weaponHand10.visible = true;
    

    //if player should be clothed then make those layers visible.
    if(this.clothed === true){
      this.backLegCloths2.visible = true;
      this.mainBodyCloths6.visible = true;
      this.frontArmCloths8.visible = true;
      
    }else{
      this.backLegCloths2.visible = false;
      this.mainBodyCloths6.visible = false;
      this.frontArmCloths8.visible = false;
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
  }

}



