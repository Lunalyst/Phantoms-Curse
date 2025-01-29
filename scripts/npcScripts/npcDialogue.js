const npcDialogue = {
        "lunalyst":{

            "Behavior1":{
                "flags":{
                    "children": ["lunaCTWDialogue1", "lunaCTWDialogue2"]
                    },

                "lunaDevDialogue1Start":{
                    "node1":{
                        "dialogue": "",
                        "profile":"lunaSleeping",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "WHAT THE..... HOW DID YOU GET IN HERE? ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "YOU SHOULD, PROBABLY TELL ME HOW GOT IN HERE.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "THIS PLACE IS A LITTLE HARD TO REACH.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "OH AND DONT WORRY, IM NOT IM NOT OPPOSED TO VISITERS THOUGH. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, I GOT TO GET BACK TO MY RESEARCH. EXITS BY THE HEATER. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueMale1":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "YOUR QUITE THE CUTE BOY YOU SHOULD BE CAREFUL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THE CURSED LOVE EATING AND TRANSFORMING HUMANS LIKE YOUR SELF.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I WAS HUMAN ONCE WHEN I WASHED UP HERE. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "ONE OF THE BATS GOT ME A WHILE BACK. BUT THANKFULLY I MANAGED ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "TO GET LUCKY, AND NOT LOSE MY MIND.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "MY APPEARANCE IS ALSO SLIGHTLY DIFFERENT FROM THEM. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "WONDER WHY THAT IS. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueFemale1":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "YOUR QUITE THE CUTE GIRL YOU SHOULD BE CAREFUL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THE CURSED LOVE EATING AND TRANSFORMING HUMANS LIKE YOUR SELF.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I WAS HUMAN ONCE WHEN I WASHED UP HERE. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "ONE OF THE BATS GOT ME A WHILE BACK. BUT THANKFULLY I MANAGED ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "TO GET LUCKY, AND NOT LOSE MY MIND.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "MY APPEARANCE IS ALSO SLIGHTLY DIFFERENT FROM THEM. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "WONDER WHY THAT IS. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaDevDialogue2Start":{
                    "node1":{
                        "dialogue": "",
                        "profile":"lunaSleeping",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "WHAT THE..... OH NO YOUR BACK. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "YOU SHOULD, PROBABLY TELL ME HOW GOT IN HERE AGIAN. IM WORRIED.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "THIS PLACE SHOULD BE HARD TO REACH, BUT MIGHT NOT BE CURRENTLY.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "IF YOU CAN GET IN HERE THE CURSED LIKELY CAN AS WELL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, MAKE YOURSELF CONFORTABLE IF YOU WISH. EXITS BY THE HEATER. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaDevDialogue2":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "MAKE YOUR SELF COMFORTABLE. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "I HAVE BEEN TRYING TO CLEAR A PATH TO LOCKWOOD IN MY SPARE TIME.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "ITS A NICE TOWN IN THE TREES. MOST CURSED HAVE TOUGH TIME REACHING IT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "EVEN THOUGH IM CURSED OTHER WILD CURSED STILL TRY TO EAT ME. ",
                        "profile":"lunaAngryEyes",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ITS ALMOST AS IF THEY KNOW IM NOT ONE OF THEM. ",
                        "profile":"lunaCry",
                        "textvoice":"lightVoice",
                        "children":[]
                    }
                },
                
               

                

            },
            "Behavior2":{
                "flags":{
                    "children": ["lunaCTWDialogue1", "lunaCTWDialogue2"]
                    },

                "lunaCTWDialogue1":{
                    "node1":{
                        "dialogue": "OH A HUMAN! HELLO! ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "MY NAME IS LUNALYST, AND IM SURE YOU CAN TELL IM NOT QUITE HUMAN ANYMORE.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "HOWEVER IM NOT GONA TRY AND EAT OR FORNICATE WITH YOU, PROMISE.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "IM JUST A HUMBLE MAID TRYING TO GET BACK TO LOCKWOOD VILLAGE. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "LOTS OF CAVE INS SO IM DOING MY BEST TO CLEAR THE WAY. ",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, I GOT TO GET BACK TO IT. STAY SAFE OUT THERE. ^_^ ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaCTWDialogue2":{
                    "node1":{
                        "dialogue": "HELLO AGIAN. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "IM STILL BUSY OVER HERE CLEARING THE WAY. ",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THOUGH I COULD USE A BREAK.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "HOW CAN I ASSIST YOU? ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5","node10","node12"]
                    },"node5":{
                        "dialogue": "OH? OF COURSE! ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "COME HERE. EVERYTHINGS GOING TO BE ALRIGHT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "",
                        "profile":"lunaHearts",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node9"]
                    },"node9":{
                        "dialogue": "STAY SAFE OUT THERE. ^_^ ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node10":{
                        "dialogue": "SUPPLIES? SURE WE CAN DO SOME TRADING.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },"node11":{
                        "dialogue": "HERES WHAT I GOT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node12":{
                        "dialogue": "GOODBYE ^_^ ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    }
                }
               

                

            },
            "clearingTheWay":{
                
            }

        }
}