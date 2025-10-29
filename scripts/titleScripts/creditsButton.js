class creditsButton extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'credits');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = true;
        this.setInteractive();
      
        this.anims.create({key: 'creditsActive',frames: this.anims.generateFrameNames('credits', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'creditsInActive',frames: this.anims.generateFrameNames('credits', { start: 0, end: 0 }),frameRate: 1,repeat: -1});

        this.anims.play('creditsInActive');

        this.scene = scene;
      
    }

    setupCredits(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("creditsActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("creditsInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            that.visible = false;
            that.scene.newGame.visible = false;
            that.scene.loadGame.visible = false;
            that.scene.back.visible = true;
            that.scene.titleLogo.visible = false;
            that.scene.isInCredits = true;
            that.scene.curse.visible = false;
            that.scene.credits.visible = true;

            that.scene.credits.activateCredits();

            let random = Math.floor((Math.random() * 10)+1);
            console.log(random);
            if(random === 7){
                that.scene.credits.form.visible = true;
                that.scene.credits.form1.visible = true;
                that.scene.credits.thankYou1.visible = false;
                that.scene.credits.thankYou2.visible = false;
                that.scene.credits.thankYou5.visible = false;
                that.scene.credits.thankYou6.visible = false;
            }else{
                that.scene.credits.form.visible = false;
                that.scene.credits.form1.visible = false;
                that.scene.credits.thankYou1.visible = true;
                that.scene.credits.thankYou2.visible = true;
                that.scene.credits.thankYou5.visible = true;
                that.scene.credits.thankYou6.visible = true;
            }
            
           
        });

    }
}