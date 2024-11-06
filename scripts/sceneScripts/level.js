//creates the tile maps with collision and special properties.
class level extends Phaser.Tilemaps.Tilemap{

        constructor(scene,mapData){
                //super() calls the constructor() from the parent class we are extending
                super(scene,mapData);
                //then we add new instance into the scene. 
                scene.add.existing(this);
                //then we call this next line to give it collision
                scene.physics.add.existing(this);
                //now we can perform any specalized set ups for this object
                this.myTileSet;

                //tile layers we are expecting in out tiled .json
                this.layer3; 
                this.layer2;
                this.layer1;
                this.layer0;
                this.g_grid;
                //grid shape 
                this.grid = [];
                //variables used to generate tilemap
                this.tilesets;
                this.tileset; 
                this.tileprops;
                this.acceptabletiles;
                this.tilesetNameInTiled;

                this.animatedTiles = {};
        }

        //function which sets up the tiled level. recieve a source map png key and the scene variable.
        setTiles(sourceMap,scene){
                //console.log("activating tiles +++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                
                
                //console.log("sourceMap: ",sourceMap );

                
                //sets up the image of the tileset to the json map using the specifications below. tile size and extrusion settings which is one pixel by 2pixel boarder around the tiles.
                this.myTileSet = this.addTilesetImage(this.tilesetNameInTiled,sourceMap,96,96,1,2); 

                console.log("this.myTileSet: ",this.myTileSet );

                //sets up each layer using the json layers.
                this.layer3 = this.createLayer("Tile Layer 3", this.myTileSet, 0, 0);
                this.layer2 = this.createLayer("Tile Layer 2", this.myTileSet, 0, 0);
                this.layer1 = this.createLayer("Tile Layer 1", this.myTileSet, 0, 0);
                this.layer0 = this.createLayer("Tile Layer 0", this.myTileSet, 0, 0);

                console.log("this.layer3: ",this.layer3 );
                console.log("this.layer2: ",this.layer2 );
                console.log("this.layer1: ",this.layer1 );
                console.log("this.layer0: ",this.layer0 );

                //scales the layers back down so 96 tiles becomes 32. done to improve resolution of tiles so they dont look fuzzy and low rez
                this.layer0.scale = 1/3;
                this.layer1.scale = 1/3;
                this.layer2.scale = 1/3;
                this.layer3.scale = 1/3;

                //code that loops through tiles.
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

                //adds animate property to tileset. why we need a scene refrence
                scene.sys.AnimatedTiles.init(this);

  
                }

                //this gives special collision to tiles thast the player can move through. needs two layers as when phaser creates layers and gives them collision,
                //they are all connected. so if the player passes through a tile they can easily escape the map. by doing two layers there is clear definition between
                //platforms and impassable ground.
                this.layer0.layer.data.forEach((row) => { // here we are iterating through each tile.
			row.forEach((Tile) => {
                                //this checks the tileset name, then applies special collision to tiles base 
                                //on there index so that player can pass through tile frim underneath.

                                let ForestLargeTilesArray = [39,55,71,800,801,802,836,848,849,850,851,852];
                                
                                // when setting up tiles player can move through add one to it from its original value.
                                // may need to remove a few here if tiles have collision but shouldn't
                                if(this.tilesetNameInTiled === "Forest_Large_Tiles"){
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 39: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 55: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 71: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 800: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 801: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 802: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 803: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 837: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 848: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 849: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 850: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 851: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 852: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 853: // <- this tile only colides top
                                                //console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;

                                        }
                                }else if(this.tilesetNameInTiled === "Forest_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 583: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 584: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 585: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                case 586: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 587: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 679: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 653: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 680: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 681: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 682: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                case 683: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 684: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 685: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                
                                        }
                                }else if(this.tilesetNameInTiled === "Beach_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 432: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 433: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 434: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 435: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 485: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 505: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 506: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 507: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 508: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;  
                                                case 509: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;       
                                        }
                                }else if(this.tilesetNameInTiled==="Cave_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 65: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 66: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 67: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 137: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 138: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 139: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 140: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                        }
                                }else if(this.tilesetNameInTiled==="Blue_Slime_Cave_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                
                                                case 56: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 80: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 104: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 249: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 250: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 251: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 252: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 253: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 321: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 322: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 323: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                case 324: // <- this tile only colides top
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                        }
                                }

			})
		});
                // sets tilesets to be an array containing our tileset layers
                this.tilesets = [this.layer0,this.layer1,this.layer2,this.layer3]
                //adds collision to the first two layers.
                this.layer1.setCollisionByProperty({ collision: true });
                this.layer0.setCollisionByProperty({ collision: true });

                //sets layer 2 to be dark.
                this.layer2.setTint(0x808080);
                this.layer3.setTint(0x505050);

                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        }
}