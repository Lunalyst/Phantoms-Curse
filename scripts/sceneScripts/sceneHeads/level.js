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
                let currentTileLayer3;
                let currentTileLayer1;
                let currentTileLayer0;
            
                /* <MICAH> The collision grid was sideways?  I switched the row/col indexes </MICAH> */
                //a nester array of the tile set tile for the tile map.
                for (let outer = 0; outer < this.height; outer++) {
                  let rowL3 = [];
                  let rowL1 = [];
                  let rowL0 = [];
                  for (let inner = 0; inner < this.width; inner++) {
                        currentTileLayer3 = this.layer3.getTileAt(inner, outer);
                        currentTileLayer1 = this.layer1.getTileAt(inner, outer);
                        currentTileLayer0 = this.layer0.getTileAt(inner, outer);
                        //console.log("this.tile.index:"+ this.layer1.getTileAt(inner, outer).index);
                    //when pushing data to col you need to specify a layer if there are multiple. otherwise the .index call will result in a error null.
                    rowL3.push((currentTileLayer3 ? currentTileLayer3.index : 0));
                    rowL1.push((currentTileLayer1 ? currentTileLayer1.index : 0));
                    rowL0.push((currentTileLayer0 ? currentTileLayer0.index : 0));

                    this.grid.push(rowL3);
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
                                                case 39: 
                                                case 55: 
                                                case 71: 
                                                case 800: 
                                                case 801: 
                                                case 802: 
                                                case 803: 
                                                case 837: 
                                                case 848: 
                                                case 849: 
                                                case 850: 
                                                case 851:
                                                case 852: 
                                                case 853: 
                                                console.log("found a tile that player can pass through");
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;

                                        }
                                }else if(this.tilesetNameInTiled === "Forest_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 583: 
                                                case 584: 
                                                case 585: 
                                                case 586: 
                                                case 587: 
                                                case 679: 
                                                case 653: 
                                                case 680: 
                                                case 681: 
                                                case 682: 
                                                case 683: 
                                                case 684: 
                                                case 685: 
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                                
                                        }
                                }else if(this.tilesetNameInTiled === "Beach_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 432: 
                                                case 433: 
                                                case 434: 
                                                case 435: 
                                                case 485: 
                                                case 505: 
                                                case 506: 
                                                case 507: 
                                                case 508: 
                                                case 509:
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;       
                                        }
                                }else if(this.tilesetNameInTiled==="Cave_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                case 56: 
                                                case 80: 
                                                case 104: 
                                                case 65: 
                                                case 66: 
                                                case 67: 
                                                case 117: 
                                                case 141: 
                                                case 137: 
                                                case 138: 
                                                case 139: 
                                                case 140: 
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                        }
                                }else if(this.tilesetNameInTiled==="Blue_Slime_Cave_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                
                                                case 56: 
                                                case 80: 
                                                case 104: 
                                                case 249: 
                                                case 250: 
                                                case 251: 
                                                case 252: 
                                                case 253: 
                                                case 321: 
                                                case 322: 
                                                case 323: 
                                                case 324: 
                                                Tile.collideUp = true;
                                                Tile.collideDown = false;
                                                Tile.collideLeft = false;
                                                Tile.collideRight = false;
                                                break;
                                        }
                                }else if(this.tilesetNameInTiled==="Home_Interior_Tileset"){
                                        //console.log('Forest_Tileset set up for special collision.');
                                        switch(Tile.index) { // the index, you can see in tiled: it's the ID+1
                                                
                                                case 291: 
                                                case 289: 
                                                case 290:
                                                case 337: 
                                                case 338: 
                                                case 339: 
                                                case 340: 
                                                case 341: 
                                                case 325: 
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
                this.layer3.setCollisionByProperty({ collision: true });
                this.layer1.setCollisionByProperty({ collision: true });
                this.layer0.setCollisionByProperty({ collision: true });

                //sets layer 2 to be dark.
                this.layer2.setTint(0x808080);
                this.layer3.setTint(0x404040);

                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        }
}