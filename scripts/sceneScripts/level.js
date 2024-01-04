/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
// important. to fix tile bleeding we follow the guide here using tile extruder.
https://github.com/sporadic-labs/tile-extruder
//use this code in cmd
//tile-extruder --tileWidth 32 --tileHeight 32 --input ./Downloads/Tile-Set-V.0.8.png --output ./Downloads/extruded.png
//tile-extruder --tileWidth 32 --tileHeight 32 --input ./Downloads/Forest_Large_Tiles_this.png --output ./Downloads/extruded.png
// all extruded tile sets with no spacing or margins originally will have 1 pixel space and 2 pixel margins.
// dont forget our tiles are 96 by 96 then downscaled by a third
//tile-extruder --tileWidth 96 --tileHeight 96 --input ./Downloads/Forest_Large_Tiles.png --output ./Downloads/extruded.png
*/

/*
for new tileset, 
Orthogonal
Base64 (uncompressed)
Right Down.
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

        setTiles(sourceMap){
                console.log("activating tiles +++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                
                ///this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
                console.log("sourceMap: ",sourceMap );

                //this.myTileSet = this.addTilesetImage(this.tilesetNameInTiled,"source_map",96,96,1,2); 
                
                this.myTileSet = this.addTilesetImage(this.tilesetNameInTiled,sourceMap,96,96,1,2); 
                //first argument is tileset name in Tiled
                this.layer3 = this.createLayer("Tile Layer 3", this.myTileSet, 0, 0);
                this.layer2 = this.createLayer("Tile Layer 2", this.myTileSet, 0, 0);
                this.layer1 = this.createLayer("Tile Layer 1", this.myTileSet, 0, 0);
                this.layer0 = this.createLayer("Tile Layer 0", this.myTileSet, 0, 0);

                this.layer0.scale = 1/3;
                this.layer1.scale = 1/3;
                this.layer2.scale = 1/3;
                this.layer3.scale = 1/3;


                let currentTileLayer1;
                let currentTileLayer0;
            
                /* <MICAH> The collision grid was sideways?  I switched the row/col indexes </MICAH> */
                //a nester array of the tile set tile for the tile map.
                for (let outer = 0; outer < this.height; outer++) {
                  let rowL1 = [];
                  let rowL0 = [];
                  for (let inner = 0; inner < this.width; inner++) {
                        currentTileLayer1 = this.layer1.getTileAt(inner, outer);
                        currentTileLayer0 = this.layer0.getTileAt(inner, outer);
                        //console.log("this.tile.index:"+ this.layer1.getTileAt(inner, outer).index);
                    //when pushing data to col you need to specify a layer if there are multiple. otherwise the .index call will result in a error null.
                    rowL1.push((currentTileLayer1 ? currentTileLayer1.index : 0));
                    rowL0.push((currentTileLayer0 ? currentTileLayer0.index : 0));
                    this.grid.push(rowL1);
                    this.grid.push(rowL0);

                }
                this.g_grid = this.grid;
            
                this.tileset = this.tilesets[0];
                this.tileprops = this.tileset.tileProperties;
  
                }
                //this gives special collision to tiles thast the player can move through. needs two layers as when phaser creates layers and gives them collision,
                //they are all connected. so if the player passes through a tile they can easily escape the map. by doing two layers there is clear definition between
                //platforms and impassable ground.
                this.layer0.layer.data.forEach((row) => { // here we are iterating through each tile.
			row.forEach((Tile) => {
                                //this checks the tileset name, then applies special collision to tiles base 
                                //on there index so that player can pass through tile frim underneath.
                                if(this.tilesetNameInTiled === "Tile Set V.0.8"){
				switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                        case 157: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 158: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 159: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 161: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 162: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 166: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 167: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 183: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 187: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
                                        Tile.collideUp = true;
                                        Tile.collideDown = false;
                                        Tile.collideLeft = false;
                                        Tile.collideRight = false;
                                        break;
                                        case 188: // <- this tile only colides top
                                        console.log("found a tile that player can pass through");
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
                this.layer0.setCollisionByProperty({ collision: true });

                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        }
}