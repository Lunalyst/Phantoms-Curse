/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/


class level extends Phaser.Tilemaps.Tilemap{
        constructor(scene,mapData){
                //super() calls the constructor() from the parent class we are extending
                super(scene,mapData);
                //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
                //so here in the subclass of sprite its refering to the image object we just made. 
                scene.add.existing(this);
                //then we call this next line to give it collision
                scene.physics.add.existing(this);
                //now we can perform any specalized set ups for this object
                this.myTileSet;
                this.layer3; 
                this.layer2;
                this.layer1;
                this.layer0;
                this.g_grid;
                this.grid = [];
                this.tile;
                this.tileset; 
                this.tileprops;
                this.acceptabletiles;
        }
        setTiles(){
                
                //this.make.tilemap({ key: "map" });
                this.myTileSet = this.addTilesetImage("Tile Set V.0.7", "source_map"); 
                //first argument is tileset name in Tiled
                this.layer3 = this.createStaticLayer("Tile Layer 3", this.myTileSet, 0, 0);
                this.layer2 = this.createStaticLayer("Tile Layer 2", this.myTileSet, 0, 0);
                this.layer1 = this.createStaticLayer("Tile Layer 1", this.myTileSet, 0, 0);
                this.layer0 = this.createStaticLayer("Tile Layer 0", this.myTileSet, 0, 0);
            
                /* <MICAH> The collision grid was sideways?  I switched the row/col indexes </MICAH> */
                //a nester array of the tile set tile for the tile map.
                for (let outer = 0; outer < this.height; outer++) {
                  let row = [];
                  for (let inner = 0; inner < this.width; inner++) {
                        this.tile = this.layer1.getTileAt(inner, outer);
                    //when pushing data to col you need to specify a layer if there are multiple. otherwise the .index call will result in a error null.
                    row.push((this.tile ? this.tile.index : 0));
                  }
                  this.grid.push(row);
                }
                this.g_grid = this.grid;
            
                this.tileset = this.tilesets[0];
                this.tileprops = this.tileset.tileProperties;
                this.acceptabletiles = [];
            
                //loop through all tiles to see if tiles are collidable or not.
                this.acceptabletiles.push(0);
            
                this.layer1.setCollisionByProperty({ collision: true });   
        }
}