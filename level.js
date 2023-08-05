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
                
                this.tileset; 
                this.tileprops;
                this.acceptabletiles;
                this.tilesetNameInTiled;
        }
        setTiles(){
                
                //this.make.tilemap({ key: "map" });
                this.myTileSet = this.addTilesetImage(this.tilesetNameInTiled, "source_map"); 
                //first argument is tileset name in Tiled
                this.layer3 = this.createStaticLayer("Tile Layer 3", this.myTileSet, 0, 0);
                this.layer2 = this.createStaticLayer("Tile Layer 2", this.myTileSet, 0, 0);
                this.layer1 = this.createStaticLayer("Tile Layer 1", this.myTileSet, 0, 0);
                this.layer0 = this.createStaticLayer("Tile Layer 0", this.myTileSet, 0, 0);
                let currentTile;
            
                /* <MICAH> The collision grid was sideways?  I switched the row/col indexes </MICAH> */
                //a nester array of the tile set tile for the tile map.
                for (let outer = 0; outer < this.height; outer++) {
                  let row = [];
                  for (let inner = 0; inner < this.width; inner++) {
                        currentTile = this.layer1.getTileAt(inner, outer);
                        //console.log("this.tile.index:"+ this.layer1.getTileAt(inner, outer).index);
                    //when pushing data to col you need to specify a layer if there are multiple. otherwise the .index call will result in a error null.
                    row.push((currentTile ? currentTile.index : 0));
                    this.grid.push(row);

                }
                this.g_grid = this.grid;
            
                this.tileset = this.tilesets[0];
                this.tileprops = this.tileset.tileProperties;
                //its because i am not psecifying the layer right? comming back null means its too generic. for some reason this
                //chunk of code cant acess the properties of the tiles...
                /*for (let index = this.tileset.firstgid; index < this.myTileSet.total; index++) {
                        //checking for collides property
                        if (this.tileprops[index].jumpThrough) {
                        }
                          
                          //if tile can be traverse  also pass that to easy star
                    
                       // }
                        if(currentTile.jumpThrough){
                                currentTile.collideDown = false;
                                currentTile.collideLeft = false;
                                currentTile.collideRight = false;


                        }
                    
                      }*/
              
  
                }
                
                this.layer1.layer.data.forEach((row) => { // here we are iterating through each tile.
			row.forEach((Tile) => {
                                //this checks the tileset name, then applies special collision to tiles base 
                                //on there index so that player can pass through tile frim underneath.
                                if(this.tilesetNameInTiled === "Tile Set V.0.8"){
				switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                        case 157: // <- this tile only colides top
                                        //console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 158: // <- this tile only colides top
                                        //console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 159: // <- this tile only colides top
                                        //console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 161: // <- this tile only colides top
                                        //console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        default: break;
				}
                        }
			})
		});
                this.layer1.setCollisionByProperty({ collision: true });
        }
}