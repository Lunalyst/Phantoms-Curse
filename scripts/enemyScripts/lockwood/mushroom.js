

//implementation for the blue enemy enemy.
class mushroom extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
       

         if(scene.preferance === 0){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 0){
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
                this.enemySex = 0;
            }else{
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
                this.enemySex = 1;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.collision = 170;
        //make a hitbox so the cat can grab the player.
        //this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        //this.grabHitBox.setSize(30,10,true);
        //this.hitboxActive = false;
        this.isHiding = true;
        this.inEmergingAnimation = false;
        this.movingToNewNode = false;
        this.curNode = null;
        this.myceliumTimer = false;
         this.setDepth(4);
         this.body.enable = false;
         this.sporeCloudDirection = 30;
         this.sporeDanceLock = false;
         this.direction = "right";
         this.transferSpeed = 300;
          
         this.enemyHP = 1;
        //defines Enemy animations based on the players sex.
        if (this.enemySex === 0) {
            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'popOut', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 3, end: 8 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'mushIdle', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 9, end: 12 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'becomeHidden', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 13, end: 18 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceEnd', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 27, end: 31 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceIdle', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 31 }), frameRate: 15, repeat: -1 });
        }else{
            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'popOut', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 3, end: 8 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'mushIdle', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 9, end: 12 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'becomeHidden', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 13, end: 18 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceEnd', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 27, end: 31 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceIdle', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 31 }), frameRate: 15, repeat: -1 });
            //this.anims.create({ key: 'shroomDance', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 42 }), frameRate: 12, repeat: -1 });
        }

         //this.setSize(this.collision, this.collision, true);
       
            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 90, 0xb317ff,0.6);
                
                
    
            }

        
        this.inSafeMode = inSafeMode;

        this.anims.play("hiding",true);

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 90, 0xb317ff);
            this.curseLight1 = this.scene.lights.addLight(this.x,this.y-30, 90, 0xb317ff);
            this.curseLight.visible = false;

            //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.curseLight,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
          }
        

    }

    //functions that move enemy objects.
    move() {
        this.setSize(70, 180, true);
        this.setOffset(115, 59);

        //console.log("this.curNode.x: ",this.curNode.x, "this.x: ",this.x);
                
    
        let currentEnemy = this;
        if(this.enemyDefeated === false) {

            if(this.movingToNewNode === false){
                //if the enemy is hiding
                if(this.isHiding === true && this.inEmergingAnimation === false){
                    this.y = this.curNode.y+22;
                    this.x = this.curNode.x;
                    if(this.checkXRangeFromPlayer(60, 60) && this.checkYRangeFromPlayer(80,80)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;

                        this.scene.initSoundEffect('growSFX','2',0.05);

                        //play animation and go into not hiding logic
                        this.anims.play('popOut').once('animationcomplete', () => {

                            this.isHiding = false;
                            this.inEmergingAnimation = false;
                            this.anims.play('mushIdle',true);
                            this.lightSource.radius = 110
                            this.lightSource.intensity = 0.9;
                                
                        });
                    }else if(!this.checkXRangeFromPlayer(220, 220) || !this.checkYRangeFromPlayer(55, 100)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;
                        //then play animation and go back to the hiding state.
                        
                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.moveMushroomFollow();
                                
                    }
                //if the enemy is active
                }else if(this.isHiding === false && this.inEmergingAnimation === false){
                     
                    if(this.checkXRangeFromPlayer(80, 80) && this.checkYRangeFromPlayer(80,80)){

                        if(this.sporeDanceLock === false){

                            this.sporeDanceLock = true;

                            this.anims.play("shroomDanceStart",true).once('animationcomplete', () =>{

                                if(this.scene.player1.x > this.x){
                                    this.scene.initSporeCloud(this.x,this.y,"left");
                                }else{
                                    this.scene.initSporeCloud(this.x,this.y,"right");
                                }

                                this.scene.initSporeCloud(this.x,this.y,this.direction);

                                //this.anims.play("shroomDanceEnd",true).once('animationcomplete', () =>{
                                    this.sporeDanceLock = false;

                                    if(this.flipX === false){
                                        this.direction = "right";
                                         this.flipX = true;
                                    }else{
                                        this.direction = "left";
                                        this.flipX = false;
                                    }

                                   

                                //},);

                                
                            },);
                        }
                        
                        
                    }else if(!this.checkXRangeFromPlayer(220, 220)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;
                        this.sporeDanceLock = false;
                        //then play animation and go back to the hiding state.
                        this.scene.initSoundEffect('growSFX','3',0.05);
                        this.anims.play('becomeHidden').once('animationcomplete', () => {

                            this.scene.initSporeCloud(this.x,this.y,"left");

                            this.scene.initSporeCloud(this.x,this.y,"right");

                            this.isHiding = true;
                            this.inEmergingAnimation = false;
                            this.anims.play('hiding',true);
                            this.lightSource.radius = 90;
                            this.lightSource.intensity = 0.7;

                            this.moveMushroomFollow();
                                
                        });
                    }else{
                        this.sporeDanceLock = false; 
                        this.anims.play("mushIdle",true);
                        
                     }
                }
                this.setVelocityX(0);
                this.setVelocityY(0);
            }else if(this.movingToNewNode === true){

                this.lightSource.x = this.x;
                this.lightSource.y = this.y+35;

                if(this.curNode.x !== this.x || this.curNode.y+22 !== this.y ){

                    //make mycelium effect
                    if(this.myceliumTimer === false){

                        this.myceliumTimer = true;
                        let effect = new mycelium(this.scene, this.x, this.y+33);


                        let mush = this;
                        setTimeout(function () {
                            mush.myceliumTimer = false;
                        }, 30);

                    }
                    
                    if(this.curNode.x+7 < this.x){
                        this.setVelocityX(-this.transferSpeed);  
                    }else if(this.curNode.x-7 > this.x){
                        this.setVelocityX(this.transferSpeed);
                    }else{
                        this.setVelocityX(0);
                        this.x = this.curNode.x;
                    }

                    if(this.curNode.y+22+7 < this.y){
                        this.setVelocityY(-this.transferSpeed);  
                    }else if(this.curNode.y+22-7 > this.y){
                        this.setVelocityY(this.transferSpeed);
                    }else{
                        this.setVelocityY(0);
                        this.y = this.curNode.y+22;
                    }
                        
                }else{
                    this.movingToNewNode = false;
                    this.curNode.visible = false;
                    this.y = this.curNode.y+22;
                    this.x = this.curNode.x;
                    this.visible = true;
                    this.lightSource.y = this.y;
                    this.lightSource.radius = 130;
                    this.lightSource.intensity = 0.9;
                    this.scene.initSoundEffect('growSFX','1',0.05);
                    this.scene.initSporeCloud(this.x,this.y,"still");

                }
 
                
            }

        //else if the enemy is defeated and is hidden
        }else if(this.movingToNewNode === true){

            this.lightSource.x = this.x;
            this.lightSource.y = this.y+35;

            if(this.curNode.root.x !== this.x || this.curNode.root.y+22 !== this.y ){

                //make mycelium effect
                if(this.myceliumTimer === false){

                    this.myceliumTimer = true;
                    let effect = new mycelium(this.scene, this.x, this.y+33);


                    let mush = this;
                    setTimeout(function () {
                        mush.myceliumTimer = false;
                    }, 30);

                }
                        
            if(this.curNode.root.x+7 < this.x){
                this.setVelocityX(-this.transferSpeed);  
            }else if(this.curNode.root.x-7 > this.x){
                this.setVelocityX(this.transferSpeed);
            }else{
                this.setVelocityX(0);
                this.x = this.curNode.root.x;
            }

            if(this.curNode.root.y+22+7 < this.y){
                this.setVelocityY(-this.transferSpeed);  
            }else if(this.curNode.root.y+22-7 > this.y){
                this.setVelocityY(this.transferSpeed);
            }else{
                this.setVelocityY(0);
                this.y = this.curNode.root.y+22;
            }
                    
            //after mushroom has move to root, disable it/ destory it.
            }else{
                        
                //this.lightSource.destroy();
                this.scene.initSoundEffect('growSFX','1',0.05);

                this.curNode.root.growRoot();
                this.lightSource.visible = false;
                this.destroy();

            }
        }
        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //function to randomly move the mushroom from one location if the graph to another.
    moveMushroomRandom(){

        //generate a random number that represents a location in the outgoing node array.
        let randloc = Math.floor(Math.random() * (this.curNode.nodeArray.length ));
        console.log("randloc: ",randloc);

        //make node sprite visible
        this.curNode.visible = true;

        //change mushroom into transfer sprite system

        //store the new node in this object
        this.curNode = this.curNode.nodeArray[randloc];
        console.log("this.curNode: ",this.curNode);

        //move the mushroom to the new location
        this.movingToNewNode = true;
        this.lightSource.radius = 90;
        this.lightSource.intensity = 0.7;

        this.visible = false;
    }

    moveMushroomFollow(){

        //generate length on line from player and current node
        let shortestLineSegment = this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,this.x,this.y);
        let sameNode = true;
        let tempNodeRef = this.curNode;

        //check each adjacent node
        this.curNode.nodeArray.forEach(node =>{

            //if the line segment is closer  from one node and the player
            if(this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,node.x,node.y) < shortestLineSegment){
                //set the current closest length to the new one
                shortestLineSegment = this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,node.x,node.y);
                //set the location node to the closer node.
                this.curNode = node;
                sameNode = false;
            }
  

        });

        //if we happen to be moving node then
        if(sameNode === false){
            //make previous node not visible
            tempNodeRef.visible = true;

            //move the mushroom to the new location by setting variable to triggler move logic in our move function. 
            this.movingToNewNode = true;
            this.lightSource.radius = 90;
            this.lightSource.intensity = 0.7;

            this.visible = false;

        }

        
        //console.log("this.curNode: ",this.curNode);

       
    }

    calcLineSegment(x1,y1,x2,y2){
       return Math.sqrt(Math.pow(x1 - x2 , 2) + Math.pow(y1 - y2 , 2));
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

        if(this.isHiding === false && this.inEmergingAnimation === false){

            //then play animation and go back to the hiding state.

            this.inEmergingAnimation = true;
            this.anims.play('becomeHidden').once('animationcomplete', () => {

                this.isHiding = true;
                this.inEmergingAnimation = false;
                this.anims.play('hiding',true);
                this.lightSource.radius = 90;
                this.lightSource.intensity = 0.7;
                    
            });
            this.setDepth(4);
        }
        

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOver() {
        this.setSize(100, 150, true);
        this.setOffset(90, 150);
        this.anims.play('enemyGameOver', true);
    }

    // controls the damage resistance of the enemy.
    damage() {
  
        if (this.damageCoolDown === false && this.isHiding === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.enemyHP > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.calcDamage(
                    this.scene.player1.sliceDamage,
                    this.scene.player1.bluntDamage,
                    this.scene.player1.pierceDamage,
                    this.scene.player1.heatDamage,
                    this.scene.player1.lightningDamage,
                    this.scene.player1.coldDamage,
                    this.scene.player1.curseDamage
                );
                
                //if the enemys hp is at zero
                if (this.enemyHP <= 0) {

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //hide mushroom and move it
                    this.anims.play('becomeHidden').once('animationcomplete', () => {

                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);

                        //make node sprite visible
                        this.curNode.visible = true;

                        this.movingToNewNode = true;
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.visible = false;
                 
                    });
                    
                }else if(this.isHiding === false && this.inEmergingAnimation === false){
                    
                    console.log("player is in range");
                    this.inEmergingAnimation = true;
                    //then play animation and go back to the hiding state.
                    this.anims.play('becomeHidden').once('animationcomplete', () => {

                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.moveMushroomRandom();
                                
                    });
                    
                }

            //else if the mushroom has been defeated
            }

            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;

            setTimeout(function () {
                that.damageCoolDown = false;
                console.log("damage cool down:" + that.damageCoolDown);
                that.clearTint();
            }, 3000);
        }
    }

    //handles damage types for blue enemy. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice * 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 2);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 4);
        }
        if (heat > 0) {
            this.enemyHP -= (heat);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning / 4);
        }
        if (cold > 0) {
            this.enemyHP -= (cold );
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

}
