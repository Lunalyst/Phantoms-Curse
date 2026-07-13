/*
//note for fast travel map

ok so idea

1) we have different pannels for different areas

first is lockwood.

2) then we have points that can be cycled through in that pannel

3) need to check for all flags associated with that pannel.
if flag not found, then grey out point of travel.

4) need some data structure to hold that info. probably in emitter.js

5) arrows for switching between pannels.

6) close out button for exiting.

7) store flags inside flag variable place. that way we dont need new data structures.

should display name of place and glow on that point

*/
class fastTravelMap extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,npcRef){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.setDepth(20);

      //seting variables 
      this.isOpen = false;
      this.openDelay = false;
      this.index = 0;
      this.isOnScreen = false;
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;
      //value for determining what the slot offset should be, we currently have weapon, and ring slot, so we 
      // should have 2 as the offset.
      this.slotOffset = 4
      this.fastTravelMapArray = [];

      this.npcRef = npcRef;



      //when adding new pages, we need this variable to tell what page we are on.
      this.itemPage = 0;

      this.fastTravelMap = scene.add.sprite(0, 0, 'KukoNuiMap');
      this.fastTravelMap.anims.create({key: 'Lockwood',frames: this.fastTravelMap.anims.generateFrameNames('KukoNuiMap', { start: 0, end: 0 }),frameRate: 0,repeat: -1});
      this.fastTravelMap.anims.create({key: 'BoomerangBay',frames: this.fastTravelMap.anims.generateFrameNames('KukoNuiMap', { start: 1, end: 1 }),frameRate: 0,repeat: -1});
      
      this.fastTravelMap.setScale();
      this.add(this.fastTravelMap);

      this.buyIndexLeft = new UIControls(scene, -370, 0, "UIControls").setInteractive();
      this.buyIndexLeft.anims.play("pointRight");
      this.buyIndexLeft.setRotation(3.14/2+3.14/2);
      this.add(this.buyIndexLeft);

      this.buyIndexRight = new UIControls(scene, 370, 0, "UIControls").setInteractive();
      this.buyIndexRight.anims.play("pointRight");
      this.add(this.buyIndexRight);

      //makes the label for the inventory
      this.mapLabel = new makeText(scene,-260,-240,'charBlack',"Lockwood");
      this.add(this.mapLabel);

      //this.buyIndexUp.visible = false;
      
      this.closingButton = new closingButton(scene,this,null,260,-260);
      this.closingButton.setupClosingButtonMap(this);
      this.add(this.closingButton);

      //pointer to show where we are
      this.currentPositionArrow = this.scene.add.sprite(0, 0, "fastTravelDot");
      this.currentPositionArrow.anims.create({key: 'arrowBounce',frames: this.fastTravelMap.anims.generateFrameNames('fastTravelDot', { start: 3, end: 6 }),frameRate: 6,repeat: -1});
      //this.currentPositionArrow.visible = false;
      this.currentPositionArrow.anims.play("arrowBounce",true);
      this.currentPositionArrow.setScale(1/3);
      this.add(this.currentPositionArrow);
      this.currentPositionArrowSet = false;

      this.yes = new yes(scene,-70, 255);
      this.yes.setupYesFastTravel(this);
      this.add(this.yes);

      this.no = new no(scene,70, 255);
      this.no.setupNoFastTravel(this);
      this.add(this.no);





      this.scene = scene;

      //here lies the challenge. how do I tell what location the player is in? i need to know. do i define it in level? hmmmm attack it to the flag some how?

      //use map to find the base locations of the player.
      this.fastTravelMap.anims.play(fastTravelLocationFinder[this.scene.playerLocation],true);

      //for each point in the group of fast travel keys
      //console.log("fastTravelLocationFinder[this.scene.playerLocation]: ",fastTravelLocationFinder[this.scene.playerLocation]);
      //console.log("fastTravelKey[fastTravelLocationFinder[this.scene.playerLocation]]: ",fastTravelKey[fastTravelLocationFinder[this.scene.playerLocation]]);

      this.travelPointArray = [];
      Object.entries(fastTravelKey[fastTravelLocationFinder[this.scene.playerLocation]]).forEach(([key, value]) => {
        //console.log(`${key}: ${value}`);

        //shows where the player currently is.
        console.log("key: ",key , " this.scene.playerLocation: ",this.npcRef.scene.playerLocation);
        if(key === this.npcRef.scene.playerLocation && this.currentPositionArrowSet === false){
          this.currentPositionArrowSet = true;

          this.currentPositionArrow.visible = true;

          this.currentPositionArrow.x = value.mapPositionX;
          this.currentPositionArrow.y = value.mapPositionY-30;   
        }
        
        //make new point on the map 
        console.log("key.landingX: ",value.mapPositionX, " key.landingY",value.mapPositionY);
        let point = this.scene.add.sprite(value.mapPositionX, value.mapPositionY, "fastTravelDot").setInteractive();

        point.anims.create({key: 'blank',frames: this.fastTravelMap.anims.generateFrameNames('fastTravelDot', { start: 0, end: 0 }),frameRate: 6,repeat: -1});
        point.anims.create({key: 'lightUp',frames: this.fastTravelMap.anims.generateFrameNames('fastTravelDot', { start: 1, end: 1 }),frameRate: 6,repeat: -1});
        point.anims.create({key: 'notFound',frames: this.fastTravelMap.anims.generateFrameNames('fastTravelDot', { start: 1, end: 1 }),frameRate: 6,repeat: -1});
      
        point.title = value.title;
        point.flag = value.flag;
        point.key = key;
        point.landingX = value.landingX;
        point.landingY = value.landingY;

        //check flag for 
        //check to see if flag already exists
        let checkTravelFlag = {
          flagToFind: value.flag,
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, checkTravelFlag);

        if(checkTravelFlag.foundFlag){
          point.anims.play("blank",true);
          point.isActive = true;
        }else{
          point.anims.play("notFound",true);
          point.isActive = false;
        }
        
        let that = this;

        point.on('pointerover',function(pointer){
          if(point.isActive === true){
            point.anims.play("lightUp");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
          }
           
        });
        point.on('pointerout',function(pointer){
          if(point.isActive === true){
            point.anims.play("blank");
          }
        });


        point.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            console.log("activateing warp point.");
            that.npc.travelPointerTitle = point.title;

            if(point.key === that.npcRef.scene.playerLocation){
              that.npc.alreadyThere();
              that.yes.visible = false;
              that.no.visible = false;
            }else{
              that.npc.travelQuestion();

              that.yes.visible = true;
              that.no.visible = true;

              //set location, along with x and y position into the npc
              that.npcRef.sendPlayerTo = point.key;
              that.npcRef.sendPlayerX = point.landingX;
              that.npcRef.sendPlayerY = point.landingY;

              console.log("that.npcRef: ",that.npcRef);


            }
            
            
           
           
        });


        point.setScale(1/3);
        this.add(point);
      });



      //this.inventoryElements.add(this); 
      console.log('created the fast travel map.');

    }

    
  
}