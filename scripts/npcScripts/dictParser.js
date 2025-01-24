

//class to parse through our dialogue json file and return a node tree structure.
class dictParser{

    constructor(name,behavior,flag) {
        //create a object which will function as our dictionary.
        //contains a dictionary of node1 keys.
        //format: index,node
        //notes:
        //we need the start node aka node1, node2... ect
        //also need the key of the last subnode aka if there is node1,node1-0,node1-1 then we need node1-1 as a key
        this.dict = {};
        this.dictInc = 0;

        this.rootSet = false;
        this.root;

        this.npcName = name;
        this.npcBehavior = behavior;
        this.npcFlag = flag;

        this.parse();
        
    }

    //given the correct location, parse through the nodes and return a tree structure, and dictionary of relivant keys.
    parse(){
        //define the root of the tree
        this.root = new dictNode(
            "node1",
            npcDialogue[this.npcName][this.npcBehavior][this.npcFlag]["node1"].dialogue,
            npcDialogue[this.npcName][this.npcBehavior][this.npcFlag]["node1"].profile,
            npcDialogue[this.npcName][this.npcBehavior][this.npcFlag]["node1"].textvoice,
            npcDialogue[this.npcName][this.npcBehavior][this.npcFlag]["node1"].children
        );

        //add first node name to the dictionary with value 0
        this.dict["node1"] = this.dictInc;
        this.dictInc++;

        //call format function of node which will return either this node, or a child it generated to fit dialogue.
        let potentialExtensionNode = this.root.formatDialogue();

        //add the potential extension node to the dictionary key, but only if its name doesnt match the original node1,s name.
        if(potentialExtensionNode.nodeName !== "node1"){
            this.dict[potentialExtensionNode.nodeName] = this.dictInc;
            this.dictInc++;
        }
        

        this.parseHelper(potentialExtensionNode);

        console.log("this.dict: ",this.dict);
    }

    //recursive helper. takes in a node and adds its children based on the keys it has within its children array.
    parseHelper(prevNode){

        //loop through the children array in the given starting node.
        for(let i = 0; i < prevNode.originalChildrenArray.length;i++){

            //make a new node that is the child of the previous node.
            let nextNode = new dictNode(
                prevNode.originalChildrenArray[i],
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].dialogue,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].profile,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].textvoice,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].children
            );

            //add the next nodes name to the dictionary.
            this.dict[prevNode.originalChildrenArray[i]] = this.dictInc;
            this.dictInc++;

            //call format function of node which will return either this node, or a child it generated to fit dialogue.
            let potentialExtensionNode = nextNode.formatDialogue();
            
            //adds new node to the prevnode sets next node as child so that node doesnt get lost.
            prevNode.addChild(nextNode);

            //add the potential extension node to the dictionary key, but only if its name doesnt match the original node1,s name.
            if(potentialExtensionNode.nodeName !== prevNode.originalChildrenArray[i]){
                this.dict[potentialExtensionNode.nodeName] = this.dictInc;
                this.dictInc++;
            }

            //recursively call with potential extension node.
            this.parseHelper(potentialExtensionNode);


        }

    }
    /*note to self., when we generate extra nodes inside our node class, its a good idea, to give them the key nodename + "-"+index
    this is important, so we can figure out the important state positions for game logic. as and example if node1 was extended twice
    then it would have 1 child being node1-1 and that node has a child node1-2, which has the original children of node 1. as an example,
    node 1 originally had nodes node2, and node3 as children, so node node1-2 has node2 and node 3 as its children. this allows us to index the node
    since the generation formula for the state is nodename + "-"+lastindex. could save the last index, as a variable in the first node?
    */ 
}

