// basic customObject -- here the shadwo logic should/could go
class ShadowObject extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, lightSource){
        super(scene, x, y, 'shadow-object1');

        this.setOrigin(.5).setScale(10);
        this.lightSource = lightSource;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(!this.lightSource){
            return;
        }

        let angle = Phaser.Math.RadToDeg(
            Phaser.Math.Angle.Between(
                this.x, 
                this.y,
                this.lightSource.x, 
                this.lightSource.y)
            );
        
        if( angle > 0 ){
            if( angle > 110){
                this.setFrame(2);
            } else if( angle > 80) {
                this.setFrame(1);
            } else {
                this.setFrame(0);
            }
        } else {
            if( angle < -110){
                this.setFrame(5);
            } else if( angle < -80) {
                this.setFrame(4);
            } else {
                this.setFrame(3);
            }
        }
    }
}

// basic customObject plugin
class ShadowObjectPlugin extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject('shadowObject', this.createObject);
    }
    createObject (x, y, lightSource) {
        return this.displayList.add(new ShadowObject(this.scene, x, y, lightSource));
    }

}


let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 180,
    pixelArt: true,
    physics: { default: 'arcade' },
    backgroundColor: '#427F4A',
    // Plugin registration
    plugins: {
        global: [
            { key: 'ShadowObjectPlugin', plugin: ShadowObjectPlugin, start: true }
        ]
    },
    scene: {
        create(){
            this.player = this.add.rectangle(50, config.height/2, 20, 20, 0xff0000)
                .setOrigin(.5);

            this.physics.add.existing(this.player);
            this.cursors = this.input.keyboard.createCursorKeys();
            
            // extra event action, to workaround CORS restriction
            this.textures.once('addtexture', function () {
            this.obj1 = this.add.shadowObject(config.width/2, 40, this.player);

            this.obj2 = this.add.shadowObject(config.width/2, config.height - 40, this.player);
          }, this);

          // extra event action, to workaround CORS restriction
          this.textures.addSpriteSheet('shadow-object1', img, {frameHeight: 8, frameWidth:8 } )
        },
        update(){
            if(!this.player || !this.player.body)
                return;

            if (this.cursors.left.isDown){
                this.player.body.setVelocityX(-160);
            } else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(160);
            } else {
                this.player.body.setVelocityX(0);
            }
        }
    },
    banner: false
};

// extra event action, to workaround CORS restriction
var imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf9eFICAgAAAAFsertMAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAABJSURBVChTrZBJDgAgDAKL/3+02BLX1IORC8jYNGolUQMmuvgFQAVgBgiwZKObDXhw96kAqyufegPpjo8g3rs5wTjPhN8y9T2jVOoAAnNNNFEPAAAAAElFTkSuQmCC';

let img = new Image();
img.onload = function(){
  new Phaser.Game(config);
};
img.src = imageData;