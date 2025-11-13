//warp entity which allows scenes to be transfered.
class warp extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'warpSprites');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(40,50,true);
        //stores the x and y of where the warp will put the player in the next scene.
        this.nextSceneX;
        this.nextSceneY;
        //id used to distinguish between multiple protals in the scene.
        this.warpPortalId;
        //sets up key prompts displayed to the player.
        this.portalKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.portalKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.playerOverlapingPortal = false;
        this.safeToLoad = false;
        //stores the location string to tell which scene should be loaded.
        this.destination;

        this.activated = false;

        //warp sprite animations
        this.anims.create({key: 'warpCaveOutside',frames: this.anims.generateFrameNames('warpSprites', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveInside',frames: this.anims.generateFrameNames('warpSprites', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door1',frames: this.anims.generateFrameNames('warpSprites', { start: 2, end: 2}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door2',frames: this.anims.generateFrameNames('warpSprites', { start: 3, end: 3}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'devDoor',frames: this.anims.generateFrameNames('warpSprites', { start: 6, end: 6}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveShadow',frames: this.anims.generateFrameNames('warpSprites', { start: 7, end: 10}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'warpCaveShadowMenace',frames: this.anims.generateFrameNames('warpSprites', { start: 11, end: 14}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'warpCaveOutsideRaised',frames: this.anims.generateFrameNames('warpSprites', { start: 15, end: 15}),frameRate: 7,repeat: -1});
        
    }


    //function to check if the player should be warped
    warpTo(scene1,keyW,activeId){
      // bug fixed where holding w before overlaping a warp zone caused the next scene to be constantly loaded.lesson learned dont but scene triggers in a overlap function.
      
      //console.log("this.safeToLoad: "+this.safeToLoad+" activeId: "+activeId+" this.warpPortalId: "+this.warpPortalId+" this.promptCooldown: "+this.promptCooldown+" keyW.isDown: "+keyW.isDown);
        
      // if the player is within range, and presses w then activate scene transition
      if(this.safeToLoad === true && scene1.checkWIsDown() && activeId === this.warpPortalId && scene1.isPaused === false&& this.activated === false){

          console.log("warping scenes");
          
          this.activated = true;
           
            //creates a object to hold data for scene transition
            let playerDataObject = {
              saveX: null,
              saveY: null,
              playerHpValue: null,
              playerSex: null,
              playerLocation: null,
              inventoryArray: null,
              playerBestiaryData: null,
              playerSkillsData: null,
              playerSaveSlotData: null,
              flagValues: null,
              settings:null,
              dreamReturnLocation:null,
              playerCurseValue:null
            };

            //console.log(playerDataObject)

            //grabs the latests data values from the gamehud. also sets hp back to max hp.
            inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);

            //console.log(playerDataObject)
        
            //then we set the correct location values to the scene transition data.
            playerDataObject.saveX = this.nextSceneX;
            playerDataObject.saveY = this.nextSceneY;
            playerDataObject.playerSex = scene1.playerSex;
            playerDataObject.playerLocation = this.destination;

            // then we save the scene transition data.
            scene1.saveGame(playerDataObject);

            //kills gameplay emitters so they dont pile up between scenes
            scene1.clearGameplayEmmitters();

            //stops player momentum in update loop.
            scene1.playerWarping = true;

            scene1.portalId = 0;
            //for loop looks through all the looping music playing within a given scene and stops the music.
            for(let counter = 0; counter < scene1.sound.sounds.length; counter++){
              scene1.sound.get(scene1.sound.sounds[counter].key).stop();
            }

            scene1.player1.visible = false;
            //warps player to the next scene
            scene1.destination = this.destination;
            scene1.cameras.main.fadeOut(500, 0, 0, 0);
              //otherwise we show the key prompt if the player is within range
          }else if(this.safeToLoad === true && activeId === this.warpPortalId && this.promptCooldown === false && scene1.isPaused === false){
            console.log("safe to press w to warp scenes");
              this.portalKeyPrompts.visible = true;
              this.portalKeyPrompts.playWKey();
              this.promptCooldown = true;
              
          }
          //reset variables
          if(this.safeToLoad === false){
            this.portalKeyPrompts.visible = false;
            this.promptCooldown = false;
          }
    }

    //called when set up in initportals in the default scene. so the portal knows what scene the player is going to and where to put them in that scene.
    setLocationToSendPlayer(x,y,animation,destination){
      this.destination = destination;
      this.nextSceneX = x;
      this.nextSceneY = y;
    
      this.anims.play(animation);
       
      
    }
}