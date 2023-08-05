// this class is used to store all the functions i dont want apart of there respective class.
// if each slime object is calling itself to test if it collides i feel that can cause problems.
// this is probably a decent way of moving forward as the amount of enemys increase.

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

    initSlimes(startX, startY, amount, scene) {
        for (let row = 0; row < amount; row++) {
          var enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
          var forestHomeThat = scene;
            let slime1 = new blueSlime(forestHomeThat,enemyX,startY);
            //id is important for slime combine function. since when the slimes collide symultaniously it needs a way to tell if
            //slime is destroyed or becomes a large slime. if the id is higher on the slime then that one becomes a larger slime
            slime1.slimeId = scene.slimeId;
            scene.slimeId++;
            console.log("slime id: "+ scene.slimeId);
            scene.slimes.add(slime1);
          
        }
      }

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