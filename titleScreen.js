
/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
 */
class titleScreen extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'titleScreen',active: true,physics:{default:'arcade'}});
        //variables attached to the scene
        this.newGame;
        this.allFunctions;
        this.backround;
        }
        preload(){
            this.load.spritesheet('backgroundForest', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
            this.load.spritesheet("newGame" , "assets/NewGame.png" , {frameWidth: 100 , frameHeight: 11 });
            this.load.spritesheet("loadGame" , "assets/LoadGame.png" , {frameWidth: 100 , frameHeight: 11 });
            
        }

        create(){
            let that = this;
            this.anims.create({key: 'newActive',frames: this.anims.generateFrameNames('newGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'newInActive',frames: this.anims.generateFrameNames('newGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backroundLoop',frames: this.anims.generateFrameNames('backgroundForest', { start: 0, end: 8 }),frameRate: 4,repeat: -1});
            this.backround = this.add.sprite(450, 450, "backgroundForest");
            this.backround.setScale(1.5,1.5);
            this.backround.anims.play("backroundLoop");
            this.newGame =  this.add.sprite(460, 500, "newGame").setInteractive();
            this.newGame.setScale(3,3);
            let loadGame =  this.add.sprite(460, 550, "loadGame").setInteractive();
            loadGame.setScale(3,3);

            this.allFunctions = new allSceneFunctions;

            this.input.mouse.capture = true;

            this.newGame.on('pointerdown', function (pointer) {

                that.newGame.anims.play("newActive");
                that.allFunctions.saveGame(1650,542,6,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,6,8,10,0,0]);
                that.scene.start('forestHome');
        
            });
            

        }

        update(){
            /*if (that.newGame.input.pointerOver()){
                that.newGame.anims.play("newActive");
            }else{
                that.newGame.anims.play("newInActive");
            }*/
            
        }

}