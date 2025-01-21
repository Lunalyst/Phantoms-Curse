

//class to parse through our dialogue json file and return a node tree structure.
class dictParser{

    constructor(name,behavior,flag) {
        //create a object which will function as our dictionary.
        //pushs a object that contains a refrence to the node associated with that 
        this.dict = {};

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

        //console.log("root: ", this.root);

        //call format function of node which will return either this node, or a child it generated to fit dialogue.
        let potentialExtensionNode = this.root.formatDialogue();

        //console.log("potentialExtensionNode: ", potentialExtensionNode);

        this.parseHelper(potentialExtensionNode);
    }

    //recursive helper. takes in a node and adds its children based on the keys it has within its children array.
    parseHelper(prevNode){

        //loop through the children array in the given starting node.
        for(let i = 0; i < prevNode.originalChildrenArray.length;i++){

            //recurively call our helper to generate more nodes, using potentialextensionnode as the parent node.
            //console.log("npcDialogue[this.npcName][this.npcBehavior][this.npcFlag]: ",npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]]);

            //make a new node that is the child of the previous node.
            let nextNode = new dictNode(
                prevNode.originalChildrenArray[i],
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].dialogue,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].profile,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].textvoice,
                npcDialogue[this.npcName][this.npcBehavior][this.npcFlag][prevNode.originalChildrenArray[i]].children
            );

            //console.log("root: ", this.root);

            //call format function of node which will return either this node, or a child it generated to fit dialogue.
            let potentialExtensionNode = nextNode.formatDialogue();
            
            //adds new node to the prevnode sets next node as child so that node doesnt get lost.
            prevNode.addChild(nextNode);

            //console.log("potentialExtensionNode: ", potentialExtensionNode);

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

