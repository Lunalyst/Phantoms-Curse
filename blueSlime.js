/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
class blueSlime extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'blueSlime');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.slimePreviousY = 0;
        this.body.setGravityY(600); // sets gravity 
        this.slimeSize = 1;
        this.moveCycleTimer = 0;
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.struggleFree = 0;
        this.grabCoolDown = 0;
        this.slimeId = 0;
        this.largeSlimeDamageCounter = 0;
        this.playerDefeated = 0;
        this.playerDefeatedAnimationStage = "stage1";
        this.stageTimer = 0;
        this.stageNumber = 2;
       
        
        
    
        //defines player animations.
        this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('blueSlime', { start: 1, end: 4 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('blueSlime', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('blueSlime', { start: 7, end: 7 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('blueSlime', { start: 15, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak1',frames: this.anims.generateFrameNames('blueSlime', { start: 20, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak2',frames: this.anims.generateFrameNames('blueSlime', { start: 21, end: 21 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak3',frames: this.anims.generateFrameNames('blueSlime', { start: 22, end: 22 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'mitosis',frames: this.anims.generateFrameNames('blueSlime', { start: 23, end:  29  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeIdle',frames: this.anims.generateFrameNames('blueSlime', { start: 30, end:  32  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeUp',frames: this.anims.generateFrameNames('blueSlime', { start: 34, end:  34  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabLarge',frames: this.anims.generateFrameNames('blueSlime', { start: 38, end:  42  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabLargeHold',frames: this.anims.generateFrameNames('blueSlime', { start: 42, end:  46  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat1',frames: this.anims.generateFrameNames('blueSlime', { start: 46, end:  46  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat2',frames: this.anims.generateFrameNames('blueSlime', { start: 47, end:  47  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat3',frames: this.anims.generateFrameNames('blueSlime', { start: 48, end:  48  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat4',frames: this.anims.generateFrameNames('blueSlime', { start: 49, end:  49  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat5',frames: this.anims.generateFrameNames('blueSlime', { start: 50, end:  50  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat6',frames: this.anims.generateFrameNames('blueSlime', { start: 51, end:  51  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat7',frames: this.anims.generateFrameNames('blueSlime', { start: 52, end:  52  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat8',frames: this.anims.generateFrameNames('blueSlime', { start: 53, end:  53  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat9',frames: this.anims.generateFrameNames('blueSlime', { start: 54, end:  54  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat10',frames: this.anims.generateFrameNames('blueSlime', { start: 55, end:  55  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat11',frames: this.anims.generateFrameNames('blueSlime', { start: 56, end:  56  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat12',frames: this.anims.generateFrameNames('blueSlime', { start: 57, end:  57  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat13',frames: this.anims.generateFrameNames('blueSlime', { start: 58, end:  58  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat14',frames: this.anims.generateFrameNames('blueSlime', { start: 59, end:  59  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat15',frames: this.anims.generateFrameNames('blueSlime', { start: 60, end:  60  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat16',frames: this.anims.generateFrameNames('blueSlime', { start: 61, end:  61  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat17',frames: this.anims.generateFrameNames('blueSlime', { start: 62, end:  62  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat18',frames: this.anims.generateFrameNames('blueSlime', { start: 63, end:  63  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat19',frames: this.anims.generateFrameNames('blueSlime', { start: 64, end:  64  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat20',frames: this.anims.generateFrameNames('blueSlime', { start: 65, end:  65  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat21',frames: this.anims.generateFrameNames('blueSlime', { start: 66, end:  66  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat22',frames: this.anims.generateFrameNames('blueSlime', { start: 67, end:  67  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat23',frames: this.anims.generateFrameNames('blueSlime', { start: 68, end:  68  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat24',frames: this.anims.generateFrameNames('blueSlime', { start: 69, end:  69  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat25',frames: this.anims.generateFrameNames('blueSlime', { start: 70, end:  70  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat26',frames: this.anims.generateFrameNames('blueSlime', { start: 71, end:  71  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat27',frames: this.anims.generateFrameNames('blueSlime', { start: 72, end:  72  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat28',frames: this.anims.generateFrameNames('blueSlime', { start: 73, end:  73  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat29',frames: this.anims.generateFrameNames('blueSlime', { start: 74, end:  74  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeat30',frames: this.anims.generateFrameNames('blueSlime', { start: 75, end:  75  }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeLargeDefeatedPlayer',frames: this.anims.generateFrameNames('blueSlime', { start: 46, end:  75 }),frameRate: 7,repeat: -1});
       
    }


    moveSlime(player1){
        //console.log("moving slime, player x"+player1.x+" slime x:"+this.x+" move cycle:"+ this.moveCycle+"move cycle timer: "+this.moveCycleTimer);
        //console.log("previous slime y: "+ this.slimePreviousY+" current slime y:"+this.y);
        if(this.slimeSize === 1){
        this.setSize(30,20,true);
        this.body.setGravityY(600);
        }else if(this.slimeSize === 2){
            this.setSize(40,34,true);
            this.body.setGravityY(600);
        }

        if(this.moveCycleTimer === 100){
            this.moveCycleTimer = 0;
        }

        if(player1.x > this.x-400 && player1.x < this.x+400){
            if(player1.x > this.x && this.moveCycleTimer > 80){
                if(this.slimePreviousY > this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                this.setVelocityX(150);
                this.setVelocityY(-160);
            }else if(player1.x < this.x && this.moveCycleTimer > 80){
                if(this.slimePreviousY < this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                this.setVelocityX(-150);
                this.setVelocityY(-160);
            }else if(this.moveCycleTimer > 30 && this.moveCycleTimer < 32){
                if(this.slimeSize === 1){
                    this.anims.play('slimeIdle',true); 
                } else if(this.slimeSize === 2){
                    this.anims.play('slimeLargeIdle',true); 
                }
                this.setVelocityX(0);
                
            }

        }else{
            this.anims.play('slimeIdle',true);
            //console.log("slime idoling");
        }

        if(this.moveCycleTimer <= 100){
            this.moveCycleTimer++;
        }
        this.slimePreviousY = this.y;
    }

    moveSlimeIdle(){
    this.anims.play('slimeIdle',true); 
    this.setSize(30,20,true);
    this.body.setGravityY(600);
    this.setVelocityX(0);
    }

    slimeGrab(player1,hpBar,keyA,KeyDisplay,keyD,scene){

        if(this.playerGrabbed === false){
        player1.visible = false;
        KeyDisplay.visible = true;
        KeyDisplay.playAKey();
        //prevents falling through the tile set.
        this.y -= 10;
        player1.x = this.x-25;
        
        if(this.slimeSize === 1){
        this.anims.play("slimeGrab",true);
        this.setSize(20,65,true);
        }else if(this.slimeSize === 2){
            this.setSize(20,65,true);
            this.anims.play("slimeGrabLarge");

            scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    if(hpBar.playerHealth > 0 && this.playerGrabbed === true){
                        this.anims.play("slimeGrabLargeHold", true);
                    }
                },
                loop: true
            });
        }
        }
        this.playerGrabbed = true;
        //this.setSize(20,65,true);

        if(this.playerDamaged === false && hpBar.playerHealth > 1 ){
            hpBar.calcDamage(1);
            this.playerDamaged = true;
        }
         
         if(keyA.isDown && this.struggleCounter < 200 && hpBar.playerHealth >= 1 ){
            this.struggleCounter++;
            player1.x = this.x-10;
            //KeyDisplay.anims.play("aKeyPrompt",true);
         }
         if(keyD.isDown && this.struggleCounter < 200 && hpBar.playerHealth >= 1 ){
            this.struggleCounter++;
            player1.x = this.x-10;
            //KeyDisplay.anims.play("dKeyPrompt",true);
         }
    
         if(this.slimeSize === 2 && hpBar.playerHealth >= 1 && this.largeSlimeDamageCounter === 200){
            this.largeSlimeDamageCounter = 0 ;
            hpBar.calcDamage(1);
        }else if(this.slimeSize === 2 && this.largeSlimeDamageCounter < 200){
            this.largeSlimeDamageCounter++;
            console.log(" large slime damage counter: "+this.largeSlimeDamageCounter);
        }else if(this.slimeSize === 2 && hpBar.playerHealth === 0){
            //console.log("defeated Stage: "+this.playerDefeatedAnimationStage+" player defeated counter: "+this.playerDefeated);
            console.log(" this.stageTimer: "+this.stageTimer+" this.stageNumber: "+this.stageNumber);
            //console.log(" keyA: "+keyA+" keyD: "+keyD);
            if(this.stageTimer < 30){
                KeyDisplay.visible = false;
                //KeyDisplay.playAKey();
            }else if(keyA.isDown && this.stageTimer === 30 && this.stageNumber < 11){
                KeyDisplay.visible = true;
                this.stageTimer = 0;
                this.playerDefeatedAnimationStage = "stage"+this.stageNumber;
                
                this.stageNumber++;
            }else if(this.stageTimer === 30){
                KeyDisplay.visible = true;

            }
            console.log("player defeated by lagre slime");
            this.SlimeDefeatedPlayerAnimation(keyD);
        }

         if(this.struggleCounter === 200){

            KeyDisplay.visible = false;
            if(this.slimeSize === 1 && this.struggleFree < 120 ){
                console.log("Free counter: "+this.struggleFree);
                this.struggleFree++;
                if(this.struggleFree < 30){
                    this.anims.play("slimeGrabBreak1");   
                }else if(this.struggleFree < 60){
                    this.anims.play("slimeGrabBreak2");   
                }else if(this.struggleFree < 90){
                    this.anims.play("slimeGrabBreak3");   
                }
                
            }else if(this.slimeSize === 2 && this.struggleFree < 120 ){
                console.log("Free counter: "+this.struggleFree);
                this.struggleFree++;

            }else if(this.struggleFree === 120){
                this.struggleFree = 0;
                if(this.slimeSize === 1){
                    this.anims.play("slimeIdle");
                }else if(this.slimeSize === 2){
                    this.anims.play("slimeLargeIdle");
                }
                this.struggleCounter = 0;
                this.setSize(20,20,true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                player1.visible = true;
                KeyDisplay.visible = false;
            }
            
         }
         //console.log("this.struggleCounter: "+this.struggleCounter);
        
        
    }


    slimeCombine(otherSlime){
        console.log("combining slime with id: "+this.slimeId+" to the other slime with id: "+otherSlime.slimeId)
        if(this.slimeId === otherSlime.slimeId){
            console.log("slime overlap with its self detected;");
            return;
        }else if(this.slimeId < otherSlime.slimeId) {
            console.log("this slime with Id: "+ this. slimeId+" is living")
            this.anims.play("mitosis");
            this.slimeSize = 2;
        }else if(this.slimeId > otherSlime.slimeId ){
            this.destroy();
            console.log("this slime with Id: "+ this. slimeId+" is dying")
        }
        //otherSlime.destroy();
    }

    SlimeDefeatedPlayerAnimation(keyD){
        //KeyDisplay.visible = false;
        if(this.playerDefeatedAnimationStage === "stage1"){
            if(this.playerDefeated < 120 ){
                this.playerDefeated++; 
            }
            if(this.playerDefeated < 20){
                this.anims.play("slimeLargeDefeat1");   
            }else if(this.playerDefeated < 40){
                this.anims.play("slimeLargeDefeat2");   
            }else if(this.playerDefeated < 60){
                this.anims.play("slimeLargeDefeat3");   
            }else if(this.playerDefeated < 80){
                this.anims.play("slimeLargeDefeat4");   
            }else if(this.playerDefeated < 100){
                this.anims.play("slimeLargeDefeat5");   
            }else if(this.playerDefeated < 120){
                this.anims.play("slimeLargeDefeat6");   
            }else if(this.playerDefeated === 120){
                this.playerDefeated = 0;
                this.playerDefeatedAnimationStage = "stage2";
            }
        }else if(this.playerDefeatedAnimationStage === "stage2"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat7"); 
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat8"); 
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat9");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage3"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat9"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat10"); 
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat11");  
        }else if(this.playerDefeated < 25){
            this.anims.play("slimeLargeDefeat10");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat9");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    } else if(this.playerDefeatedAnimationStage === "stage4"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat11"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat12"); 
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat13");  
        }else if(this.playerDefeated < 25){
            this.anims.play("slimeLargeDefeat12");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat11");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage5"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat14"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat15"); 
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat16");  
        }else if(this.playerDefeated < 25){
            this.anims.play("slimeLargeDefeat15");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat14");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    } else if(this.playerDefeatedAnimationStage === "stage6"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat17"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat18"); 
        }else if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat19");  
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat18");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat17");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage7"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat22"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat23"); 
        }else if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat24");  
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat23");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat22");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage8"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat25"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat26"); 
        }else if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat27");  
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat28");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat26");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage9"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat27"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat28"); 
        }else if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat29");  
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat28");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat27");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage10"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 5){
            this.anims.play("slimeLargeDefeat29"); 
        }else if(this.playerDefeated < 10){
            this.anims.play("slimeLargeDefeat30"); 
        }else if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat29");  
        }else if(this.playerDefeated < 20){
            this.anims.play("slimeLargeDefeat30");  
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat29");  
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }else if(this.playerDefeatedAnimationStage === "stage11"){

        if(this.playerDefeated < 30){
            this.playerDefeated++; 
        }
        if(this.stageTimer < 30){
            this.stageTimer++;
        }
   
        if(this.playerDefeated < 15){
            this.anims.play("slimeLargeDefeat32"); 
        }else if(this.playerDefeated < 30){
            this.anims.play("slimeLargeDefeat33"); 
        }else if(this.playerDefeated === 30){
            this.playerDefeated = 0;
        }
        
        
    }
      

}
              

        
    
    

    


}
