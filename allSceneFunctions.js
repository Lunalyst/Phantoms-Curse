// this class is used to store all the functions i dont want apart of there respective class.
// if each slime object is calling itself to test if it collides i feel that can cause problems.
// this is probably a decent way of moving forward as the amount of enemys increase.
//https://stackoverflow.com/questions/63213325/phaser-3-share-custom-object-data-between-scenes
//https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/localstorage/localstorage.js
//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/
//https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Loader.LoaderPlugin-json
//https://phaser.discourse.group/t/solved-use-the-same-player-object-across-scenes/2900/5

enemyInfo = {
    width: 90,
    height: 90,
    offset: {
      top: 150,
      left: 60
    },
    padding: 0
  };

class allSceneFunctions{
    constructor(scene){

    }
    //saves player x and y to local storage
    saveGame(nextSceneX,nextSceneY,playerHp){
        //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene
        var file = {
            warpToThisX: nextSceneX,
            warpToThisY: nextSceneY,
            playerHpValue: playerHp
        }
        //uses local Storage to store the data
        //console.log("HP in saveGame: "+playerHp)
        localStorage.setItem('saveFile',JSON.stringify(file));
        //console.log("saved warp x: " +scene1.warpToX+" saved warp y: "+scene1.warpToY);
    }

    //retrieves player x and y from local storage
    loadGame(scene1){
        //sets variable to the stored data
        var file = JSON.parse(localStorage.getItem('saveFile'));
        //retrieves data from the file object and gives it to the current scene
        scene1.warpToX = file.warpToThisX;
        scene1.warpToY = file.warpToThisY;
        scene1.healthDisplay.playerHealth = file.playerHpValue;
        scene1.healthDisplay.anims.play(""+file.playerHpValue);
        //console.log("HP in loadGame: "+scene1.healthDisplay.playerHealth)
        //console.log("loaded warp x: " +scene1.warpToX+" loaded warp y: "+scene1.warpToY);
    }

    //generates slimes
    initSlimes(startX, startY, amount, scene) {
        for (let row = 0; row < amount; row++) {
          var enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
            let slime1 = new blueSlime(scene,enemyX,startY);
            //id is important for slime combine function. since when the slimes collide symultaniously it needs a way to tell if
            //slime is destroyed or becomes a large slime. if the id is higher on the slime then that one becomes a larger slime
            slime1.slimeId = scene.slimeId;
            scene.slimeId++;
            scene.slimes.add(slime1);
            //console.log("slime id: "+ scene.slimeId);
        }
      }

      // creates warp portal objects in the scene
      initPortals(x,y,scene,toX,toY){
        let portal1 = new warp(scene,x,y);
        //gives portal a unique id so that scene can tell which warp object is being activated
        portal1.warpPortalId = scene.portalId;
        scene.portalId++;
        //sets the location given as to where the player will be sent in the next scene
        portal1.setLocationToSendPlayer(toX,toY);
        //adds portal object to the portal object in the scene
        scene.portals.add(portal1);
        //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
        //console.log(" scene.portalId: "+ scene.portalId);
      }

      //test to see if the player should be warped.
      checkWarp(scene,location){
        //applies a function to each portal object in the scene
        scene.portals.children.each(function (tempPortal){
          //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
          scene.physics.add.overlap(scene.player1,tempPortal,function(){
            scene.safeToLoad = true;
            scene.activatedPortalId = tempPortal.warpPortalId;
          });
          //afterward it calls the built in warp object.
        tempPortal.warpTo(scene,scene.keyW,location,scene.activatedPortalId,scene.healthDisplay);

        },scene);
      }

      //function to activate blue slime grab animation
    checkBlueSlimeGrab(scene){
        scene.healthDisplay.zoomIn();
        scene.slimes.children.each(function (tempSlime){
            if(tempSlime.playerGrabbed === true){
              //remeber this function is called twice. once when grab hamppens and agian when the update loop has this.grabbed set to true.
              tempSlime.slimeGrab(scene.player1,scene.healthDisplay,scene.keyA,scene.KeyDisplay,scene.keyD,scene,scene.keyTAB,this);
              //focuses on slime that grabbed character and zooms ui elements.
              scene.mycamera.startFollow(tempSlime);
              scene.cameras.main.zoom = 3;
              scene.grabbed = tempSlime.playerGrabbed;
            }else{
            //if slime didn't grab player but player was grabbed then play idle animation.
            tempSlime.moveSlimeIdle();  
            }
          },scene);
    }
    //function keeps track of slime interactions
    checkBlueSlimeInteractions(scene){
              //applies functions to all slimes in the group.
            scene.slimes.children.each(function (tempSlime){
        //calls to make each instance of a slime move.
        tempSlime.moveSlime(scene.player1);
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1, tempSlime,function(){
          //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
          if(tempSlime.grabCoolDown  === 0 && tempSlime.mitosing === false){
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              scene.player1.setVelocityX(0);
              //calls the grab function
              tempSlime.slimeGrab(scene.player1,scene.healthDisplay,scene.keyA,scene.KeyDisplay,scene.keyD,scene,scene.keyTAB,this);
              //sets the scene grab value to true since the player has been grabbed
              scene.grabbed = true;
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = 300;
              console.log('player grabbed by slime');
            }
        });
        //if the slime is size 1 then it checks for overlap between slimes. then if the collide they fuse together and play combination animation
        if(tempSlime.slimeSize === 1){
          //creates another function applies to the slimes so that there are two instances of a function being applied
          scene.slimes.children.each(function (tempSlime1){
              // collider used to detect a collision between two slimes
              scene.physics.add.collider(tempSlime1, tempSlime,function(){
                // if both slimes are of size 1 then call combine function
                  if(tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1){
                  tempSlime.slimeCombine(tempSlime1,scene.grabbed);
                  }
              });
          },this);
        }
        //deincriments the grabcooldown on any slime that grabbed the player.
        if(tempSlime.grabCoolDown > 0){
          tempSlime.grabCoolDown--;
        }
        tempSlime.mitosisDelayCheck();
      },this);

    }

}