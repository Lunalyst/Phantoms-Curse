//mushroom node
//OK SO FUNCTIONALITY
//the mushroom enemy occupy the mushroom node.
//when the player attacks them, they move to a different node. 
//have the mushroom enemy take damage and not the node,
//when mushroom is defeated, have the enemy travel back to the root node
//have the root node fill up.

//how do we generate the tree?
//start at the root node.
//make a function to push a new child. 
//need to know if the mushroom node is a spawning ponit for an enemy.

//tree rules
//enemys can move between nodes in there branch thats connected to the root.
//enemys cannot move through the root node, only to the root if they have been defeated
//enemys roll a random number when moving to move to a different node 
//every node has a refrence to the nodes around it in an array. 

class mushroomNode extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,nodeType,rootRef,enemySpawn){

        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos-22, 'mushroom-nodes');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        this.setDepth(2);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        //this.setSize(40,50,true);

        scene.mushroomNodes.add(this);
        
        this.scene = scene;
        //warp sprite animations
        this.anims.create({key: 'node',frames: this.anims.generateFrameNames('mushroom-nodes', { start: 0, end: 3}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'root1',frames: this.anims.generateFrameNames('mushroom-nodes', { start: 4, end: 7}),frameRate: 3,repeat: -1});
        this.anims.create({key: 'root2',frames: this.anims.generateFrameNames('mushroom-nodes', { start: 8, end: 11}),frameRate: 4,repeat: -1});
        this.anims.create({key: 'root3',frames: this.anims.generateFrameNames('mushroom-nodes', { start: 12, end: 15}),frameRate: 5,repeat: -1});
        this.anims.create({key: 'root4',frames: this.anims.generateFrameNames('mushroom-nodes', { start: 16, end: 19}),frameRate: 7,repeat: -1});

        this.nodeName = nodeType;
        this.nodeArray = [];

        this.root = rootRef;

        this.ocupied = false;
        this.flickerRange = 10;

        if(nodeType === "root"){
            this.anims.play("root1",true);
            this.rootSize = 1;
            
        }else{
            this.anims.play("node",true);
        }

        if(enemySpawn === true){
            this.visible = false;
            this.setUpEnemyShroom();
        }
        

        //if we are using dark lighting
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');

             this.curseLight = this.scene.lights.addLight(this.x,this.y, 80, 0xb317ff);   
                //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.curseLight,
                    props : {
                        radius: {value : '+=' +this.flickerRange},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
  
          }
        
    }

    //simple function to add node to array.
    pushNode(node){

        this.nodeArray.push(node);   
    }

    //function to set up enemy in node that has a enemy inside it
    setUpEnemyShroom(){
        let mush = new mushroom(this.scene, this.x, this.y, this.scene.playerSex,this.scene.enemyId,false);
        //give the mushroom a refrence to this node
        mush.curNode = this;
        //otherwise we handles this just like any other enemy.
        this.scene.enemyId++;
        console.log("created mush id: ",mush.enemyId);
        this.scene.enemys.add(mush);
        this.scene.mushrooms.add(mush);
    }

    growRoot(){

        //if the roots size is below 5 then increase its value and change animation to be one stage larger.
        //and increase light radius and strength.

        if(this.rootSize < 5){
            this.rootSize++;
            this.anims.play("root"+this.rootSize,true);

        
        }
    }

    
}