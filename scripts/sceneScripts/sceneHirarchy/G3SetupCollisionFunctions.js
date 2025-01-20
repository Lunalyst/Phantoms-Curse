/****************************************************************************** 
description: handles the default collision set up for our object in our scenes
*******************************************************************************/
class G3SetupCollisionFunctions extends G2levelSetupFunctions {

  //sets up player collision
  setUpPlayerCollider(){
    // resets out of bounds check.
    this.PlayerOutOfBounds = false;
    this.physics.add.collider(this.player1.mainHitbox,this.processMap.layer1);
    this.physics.add.collider(this.player1.mainHitbox,this.processMap.layer0);
  }

  //sets up itemDrop collision
  setUpItemDropCollider(){
    //sets up physics for the itemDrops Group
    this.physics.add.collider(this.itemDrops,this.processMap.layer1);
    this.physics.add.collider(this.healthUpgrades,this.processMap.layer1);
    //this.physics.add.collider(this.itemDrops,this.processMap.layer0);
  }


  //sets up function to give a object collision with layer1
  setUpLayer1Collider(object){
      this.physics.add.collider(this.processMap.layer1, object);
  }

  setUpEnemyBarriers(){
    this.physics.add.collider(this.enemys, this.invisibleBarriers);
  }

  setUpEnemyBarriers(){
    this.physics.add.collider(this.enemys, this.invisibleBarriers);
  }

  setUpWoodBarriersCollider(){
    console.log('setting up wooden barrier colliders');
    this.physics.add.collider(this.enemys, this.woodenBarriers);
    this.physics.add.collider(this.player1.mainHitbox, this.woodenBarriers);

  }

  setUpSlimeProjectilesBarriers(){
    this.physics.add.collider(this.processMap.layer1, this.slimeProjectiles);
  }

  setUpCursedHeartsProjectilesBarriers(){
    this.physics.add.collider(this.processMap.layer1, this.CursedHearts);
  }

  

}