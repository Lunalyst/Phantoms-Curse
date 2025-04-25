//node class to make our dialogue dictionary tree.
class dictNode {

    //default constructor
    constructor(nodeName,dialogue,profile,textVoice,originalChildrenArray) {

        //set data in node, call our dialogue format function
        this.nodeName = nodeName;
        this.dialogue = dialogue;
        this.profile = profile;
        this.textVoice = textVoice;
        this.originalChildrenArray = originalChildrenArray;
        this.extensionIndex = 0;

        //reference to parent node
        //this.parent = null;

        //array of nodes, that are children to this node.
        this.children = [];
    }


    //adds child to this nodes children array.
    addChild(node) {

        //pushes the new node to the node array 
        this.children.push(node);
        //sets the new nodes parent to be this node.
        //node.parent = this;

        //return node?
        return node;
    }


    //function to format dialogue so it fits correctly into the textbox.
    //called after node has been declared and its children are known.
    formatDialogue(){

        let tempArray = [];
        //string to store new formatted string.
        let formattedString = "";
        //temp string to store data
        let tempString = "";
        //variable to keep track fo line positioning.
        let tempLineCounter = 0;

        //loop through the text in the object
        for(let counter = 0;counter < this.dialogue.length+1;counter++){
        
            //if the templinecounter reaches 24 then 
            //check to see if the current char is a space. if not then 
            if(tempLineCounter === lineLength+1 && this.dialogue.charAt(counter) !== ' '){
            
            //reverse through the temp string
            for(let tempStringPosition = tempString.length;tempStringPosition > 0;tempStringPosition--){


                //if the char in tempstring is a space then 
                if(tempString.charAt(tempStringPosition) === ' '){
                //slice off the extra word getting cut off 
                tempString = tempString.slice(0,tempStringPosition);

                //add spaces back to the tempstring until it is the correct line size
                while(tempString.length < lineLength+1){
                    tempString+= ' ';
                }

                //pads the tempstring if nessary.
                if(tempString.length < lineLength+1){
                    tempString = tempString.padEnd(lineLength+1,' ');  
                }

                //array for testing purposes
                tempArray.push(tempString);
                //console.log("tempString: ",tempString);

                formattedString += tempString;
                //reset the templinecounter variable
                tempLineCounter = 0;
                //empty out string
                tempString = "";
                //moves the counter forward one so it doesnt pick up the space at the end of the line.
                counter+=2;

                //kills loop
                tempStringPosition = 0;
                }

                //keeps position in outer loop so that word being removed is not lost
                counter--;
                
            }      
        }else if(tempLineCounter === lineLength+1 && this.dialogue.charAt(counter) === ' '){

            //add spaces back to the tempstring until it is the correct line size
            while(tempString.length < lineLength+1){
                tempString+= ' ';
            }

            //pads the tempstring if nessary.
            if(tempString.length < lineLength+1){
                tempString = tempString.padEnd(lineLength+1,' ');  
            }

            //array for testing purposes
            tempArray.push(tempString);

            formattedString += tempString;
            //reset the templinecounter variable
            tempLineCounter = 0;
            //empty out string
            tempString = "";
            //moves the counter forward one so it doesnt pick up the space at the end of the line.
            counter++;
        }
         
        //adds to the temp ling
        tempString += this.dialogue.charAt(counter);
        //increment line every character.
        tempLineCounter++;
        }

        //pads the tempstring if nessary.
        if(tempString.length < lineLength+1){
            tempString = tempString.padEnd(lineLength+1,' ');  
        }

        //for testing purposes
        tempArray.push(tempString);

        //adds the last line to the string and sets our text object to it.
        formattedString += tempString;

        //console.log("tempArray.length: ",tempArray.length);
        //if its a multiple of 3, then dont add any padding
        if(tempArray.length % 3 === 0){
    
        //if the tempArray is not a multiple of 3
        }else if(tempArray.length % 2 === 0){
            //console.log(" % 2 found");
            tempArray.push("                         "); 
            if(tempArray.length % 3 !== 0){
                tempArray.push("                         "); 
            }  
        }else{
            
            tempArray.push("                         ");
            tempArray.push("                         ");

        }

        //adds up the array chunks.
        this.dialogue = tempArray[0] + tempArray[1] + tempArray[2];
        
      //if the dialogue has more than three lines,
      if(tempArray.length > 3){
        //console.log("node overflowing, making extra nodes.");
        //passing it our formated array 
        return this.dialogueOverflow(tempArray,2);

    //otherwise, return this node.
      }else{

        return this;
      }
    }

    //special overflow function. used to make a new node if the dialogue string is too long.
    dialogueOverflow(textArray,index){

        let lines = 0;

        let first = true;

        let nodeArray = [];
        let nodeArrayPosition = 0;

        //loop through the text array
        for(let i = index; i < textArray.length;i++){

            //for every 3 lines, create a new node
            if(lines === 3){
                
                //temp dialogue which is made from the 3 lines we last traversed.
                let dialogue = textArray[i-2]+textArray[i-1]+textArray[i];

                //if the tempnode is blank, that means its our first extension.
                if(first === true){

                    //define new node with dialogue and same profile as this node. as well as the original children array.
                    let tempNode = new dictNode(

                        this.nodeName + '-'+this.extensionIndex,
                        dialogue,
                        this.profile,
                        this.textVoice,
                        this.originalChildrenArray
                    );
                    
                    //add this node to the base nodes children
                    this.addChild(tempNode);

                    //push the node to the temp array so we can keep track of the additional array to keep track of where we are for each extension.
                    nodeArray.push(tempNode);

                    first = false;
                }else{

                    //make a temp node
                    let tempNode = new dictNode(

                        this.nodeName + '-'+this.extensionIndex,
                        dialogue,
                        this.profile,
                        this.textVoice,
                        this.originalChildrenArray
                    );

                    //add this new node to the previous temp nodes children.
                    nodeArray[nodeArrayPosition].addChild(tempNode);

                    //push the new node to our node array.
                    nodeArray.push(tempNode);

                    //increment the node array position by one.
                    nodeArrayPosition++;


                }

                this.extensionIndex++;

                lines = 0;
            }

            lines++;
        }
        
        return nodeArray[ nodeArrayPosition];

    }

  }
  
/*note to self., when we generate extra nodes inside our node class, its a good idea, to give them the key nodename + "-"+index
    this is important, so we can figure out the important state positions for game logic. as and example if node1 was extended twice
    then it would have 1 child being node1-1 and that node has a child node1-2, which has the original children of node 1. as an example,
    node 1 originally had nodes node2, and node3 as children, so node node1-2 has node2 and node 3 as its children. this allows us to index the node
    since the generation formula for the state is nodename + "-"+lastindex. could save the last index, as a variable in the first node?
*/ 