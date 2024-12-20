//fake warp that doesnt do anything except look pretty.
class wallLight extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,type){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'wallLights');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(30,30,true);

        this.scene = scene;

        this.lightSource;
   

        //warp sprite animations
        this.anims.create({key: 'ghostMushroom1',frames: this.anims.generateFrameNames('wallLights', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'ghostMushroom2',frames: this.anims.generateFrameNames('wallLights', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'ghostMushroom3',frames: this.anims.generateFrameNames('wallLights', { start: 2, end: 2}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'ghostMushroom4',frames: this.anims.generateFrameNames('wallLights', { start: 3, end: 3}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'torch',frames: this.anims.generateFrameNames('wallLights', { start: 4, end: 7}),frameRate: 8,repeat: -1});

        //if we are using dark lighting
        if(scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
  
        }


        if(type === 'torch'){

            console.log("seting up torch");
            this.anims.play('torch');

            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 100, 0xffffff);
                
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.lightSource,
                    props : {
                        radius: {value : '+=' +20},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
    
            }
        }else if(type === 'ghostMushroom1'){

            this.anims.play('ghostMushroom1');

            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 90, 0xb317ff,0.6);
                
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.lightSource,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
    
            }

        }else if(type === 'ghostMushroom2'){

            this.anims.play('ghostMushroom2');

            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 95, 0xb317ff,0.7);
                
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.lightSource,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
    
            }

        }else if(type === 'ghostMushroom3'){

            this.anims.play('ghostMushroom3');

            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 70, 0xb317ff,0.6);
                
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.lightSource,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
    
            }

        }else if(type === 'ghostMushroom4'){

            this.anims.play('ghostMushroom4');

            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 75, 0xb317ff,0.5);
                
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.lightSource,
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
        
    }





    
}