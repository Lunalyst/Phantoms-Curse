/****************************************************************************** 
description: handles the default collision set up for our object in our scenes
*******************************************************************************/
class G3SetupCollisionFunctions extends G2levelSetupFunctions {

  //sets up player collision
  setUpPlayerCollider(){
    // resets out of bounds check.
    this.PlayerOutOfBounds = false;
    this.physics.add.collider(this.player1.mainHitbox,this.processMap.layer1);
    this.playerLayer0Collider = this.physics.add.collider(this.player1.mainHitbox,this.processMap.layer0);
  }

  setUpPlayer2Collider(){
    // resets out of bounds check.
    this.PlayerOutOfBounds = false;
    this.physics.add.collider(this.player2,this.processMap.layer1);
    this.player2Layer0Collider = this.physics.add.collider(this.player2,this.processMap.layer0);
  }

  setUpMiloNPCCollider(){
    this.physics.add.collider(this.Milo,this.processMap.layer1);
  }

  //sets up itemDrop collision
  setUpItemDropCollider(){
    //sets up physics for the itemDrops Group
    this.physics.add.collider(this.itemDrops,this.processMap.layer1);
    this.physics.add.collider(this.healthUpgrades,this.processMap.layer1);
    this.physics.add.collider(this.itemDrops,this.processMap.layer0);
    this.physics.add.collider(this.healthUpgrades,this.processMap.layer0);
    //this.physics.add.collider(this.itemDrops,this.processMap.layer0);
  }


  //sets up function to give a object collision with layer1
  setUpLayer1Collider(object){
      this.physics.add.collider(this.processMap.layer1, object);
  }

  setUpEnemyBarriers(){
    this.EnemyInvisBarriersGroup = this.physics.add.collider(this.enemys, this.invisibleBarriers);
  }

  setUpWoodBarriersCollider(){
    console.log('setting up wooden barrier colliders');
    //this.physics.add.collider(this.enemys, this.woodenBarriers);
    this.physics.add.collider(this.player1.mainHitbox, this.woodenBarriers);
  }

  setUpMushroomBarrierCollider(){
    console.log('setting up MushroomBarrier colliders');
    //this.physics.add.collider(this.enemys, this.woodenBarriers);

    this.physics.add.collider(this.player1.mainHitbox, this.mushroomBarriers);

  }

  setUpLockwoodDrawBridgesCollider(){
    console.log('setting up LockwoodDrawBridges colliders');
    //this.physics.add.collider(this.enemys, this.woodenBarriers);

    this.physics.add.collider(this.player1.mainHitbox, this.lockwoodDrawBridges);
    this.physics.add.collider(this.player2, this.lockwoodDrawBridges);

  }

  setUpSlimeProjectilesBarriers(){
    this.physics.add.collider(this.processMap.layer1, this.slimeProjectiles);
  }

  setUpCursedHeartsProjectilesBarriers(){
    this.physics.add.collider(this.processMap.layer1, this.CursedHearts);
  }

  setUpShadowLightCollider(){
    let temp = this.physics.add.collider(this.curseShadows,this.wallLights);
    if(this.mushrooms !== null && this.mushrooms !== undefined ){
       let test = this.physics.add.collider(this.curseShadows,this.mushroomNodes);
    }
}


  

}