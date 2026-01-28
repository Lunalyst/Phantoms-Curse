//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class playerProjectile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,type,direction,speed,duration){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'playerProjectiles');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);
  
      this.setDepth(50);
      this.anims.create({key: 'SporePoof',frames: this.anims.generateFrameNames('playerProjectiles', { start: 0, end: 3 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'SporeLinger',frames: this.anims.generateFrameNames('playerProjectiles', { start: 4, end: 12 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'spindleMissile',frames: this.anims.generateFrameNames('playerProjectiles', { start: 13, end: 16 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'spindleMissileDestroy',frames: this.anims.generateFrameNames('playerProjectiles', { start: 17, end: 24 }),frameRate: 12,repeat: 0});

      this.type = type;
      this.speed = speed;
      this.duration = duration;
      this.destroying = false;

      this.direction = direction;

      this.accelerateCoolDown = false;
     
      this.scene = scene;
      //roll a random number from 1 - 3
      let rand1 = Math.floor(Math.random() * 3) + 1;
      //then a random number from 1 - 7
      //let rand2 = Math.floor(Math.random() * 4) + 3;
      //apply random dust cloud sound to random audio sprite within our range.
      //this.scene.initSoundEffect('sporeCloudSFX'+rand1,'4',0.3);
      if(this.type === "sporeCloud"){
        this.anims.play('SporePoof').once('animationcomplete' , () =>{
          this.anims.play("SporeLinger",true);
        });

        this.sliceDamage = 0;
        this.bluntDamage = 0;
        this.pierceDamage = 0;
        this.heatDamage = 0;
        this.lightningDamage = 0;
        this.coldDamage = 0;
        this.curseDamage = 2;

        this.setScale(1/2,1/2);
        
        this.setSize(100,100,true);

        let tempSporeCloud = this;
        setTimeout(function(){

          if(tempSporeCloud.scene.isPaused === true){
            tempSporeCloud.resetDestroyCloud();
          }else{
            tempSporeCloud.followingPlayer = false;
            tempSporeCloud.destroysporeCloud();
          }

        },this.duration);

         let temp = this;

        //make a collider that allows projectile to damage enemy
        scene.enemys.children.each(function (tempEnemy) {

          temp.colliderRefrence =  scene.physics.add.overlap(tempEnemy, temp, function () {

            console.log("applying damage to: ",tempEnemy);
            //just pass in a refrence to the object which should have the correct damage stats defined?
            tempEnemy?.damage(temp)
          
          });
          
        });

      }else if(this.type === "spindleMissile"){

        this.anims.play("spindleMissile",true);

        this.setScale(1/3,1/3);
        this.setDepth(6);
        this.setSize(80,40,true);
        this.setOffset(90, 90 )

        this.sliceDamage = 0;
        this.bluntDamage = 0;
        this.pierceDamage = 0;
        this.heatDamage = 0;
        this.lightningDamage = 0;
        this.coldDamage = 0;
        this.curseDamage = 7;

        if(this.direction === "right"){
        this.flipX = true;
      }

        this.collision = this.scene.physics.add.collider(this.scene.processMap.layer1, this);

        let temp = this;

        this.colliderRefrenceGround =  scene.physics.add.overlap(temp.scene.processMap.layer1,temp, function () {

            

        if(temp.destroying === false && (temp.body.blocked.down || temp.body.blocked.left || temp.body.blocked.right || temp.body.blocked.up)){
            console.log("projectile has hit the ground");
            temp.destroying = true;
            temp.anims.play("spindleMissileDestroy").once('animationcomplete' , () =>{
              temp.collision.destroy();
              temp.colliderRefrenceGround.destroy();
              temp.destroy();

            });
        }
            
          
        });

        //make a collider that allows projectile to damage enemy
        scene.enemys.children.each(function (tempEnemy) {

          temp.colliderRefrence =  scene.physics.add.overlap(tempEnemy, temp, function () {

            console.log("applying damage to: ",tempEnemy);
            //just pass in a refrence to the object which should have the correct damage stats defined?
            tempEnemy?.damage(temp);

            if(temp.destroying === false){
            console.log("projectile has hit enemy");
            temp.destroying = true;
            temp.anims.play("spindleMissileDestroy").once('animationcomplete' , () =>{
              temp.collision.destroy();
              temp.colliderRefrenceGround.destroy();
              temp.destroy();
            });
        }
           

          
          });
          
        });
      }
      

     
      
    }

    //destroys platform after the animation is played.
    destroysporeCloud(){

      if(this.destroying === false){
        this.destroying = true;
        //this.colliderRefrence.destroy();
        this.destroy();

      }
    }

    //function to make sure cloud lasts if the player pauses the game.
    resetDestroyCloud(){

    let tempSporeCloud = this;
     setTimeout(function(){

        if(tempSporeCloud.scene.isPaused === true){
          tempSporeCloud.resetDestroyCloud();
        }else{
          tempSporeCloud.followingPlayer = false;
          tempSporeCloud.destroysporeCloud();
        }
        
      },this.duration);
    }
}