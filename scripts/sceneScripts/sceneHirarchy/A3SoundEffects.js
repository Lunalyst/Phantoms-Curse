/****************************************************************************** 
description: this class is used for setting up and using sound effects.
all scenes need acess to sound effects.
*******************************************************************************/
class A3SoundEffects extends A2Emitters {

  //function to set up looping sound
  initLoopingSound(soundID,soundName,volume){
    //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
    let createSound = true;

    //so we loop through the sounds to see if any sounds match our key
    //this is important as we do not want to create duplicate sounds with the same key.
    for(let counter = 0; counter < this.sound.sounds.length;counter++){
      //if a key matches the given sound then set bool to false.
      if(this.sound.sounds[counter].key === soundID){
        //console.log("found key: ",soundID,"so we wont create the sound object");
        createSound = false;
      }

    }

    //if we should create the sound because the key does not exist make it
    if(createSound === true){
      //console.log("key not found making ",soundID);
      this.sound.playAudioSprite(soundID,soundName);
      
    }else{ // otherwise play the sound from the keys and set its config to true so it loops.
      this.sound.get(soundID).play();
    }
  //this line of code sets the whole volume
  //this.sound.setVolume(volume);
    
  //set the volume of the specific sound.
    this.sound.get(soundID).volume = volume;
    //ensures that the sound is looping
    this.sound.get(soundID).config.loop = true;

  }

  //function to set up non looping sound.
  initSoundEffect(soundID,soundName,volume){

  console.log("this.sound.sounds: ", this.sound.sounds);
  //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
  let createSound = true;

  //console.log("soundID ",soundID);

  //so we loop through the sounds to see if any sounds match our key
  //this is important as we do not want to create duplicate sounds with the same key.
  for(let counter = 0; counter < this.sound.sounds.length;counter++){
    //if a key matches the given sound then set bool to false.
    if(this.sound.sounds[counter].key === soundID){
      //console.log("found key: ",soundID,"so we wont create the sound object");
      createSound = false;
    }

    console.log("searching through key: ",this.sound.sounds[counter].key);

  }

  //if we should create the sound because the key does not exist make it
  if(createSound === true){
      console.log("key not found making ",soundID);
      this.sound.playAudioSprite(soundID,soundName);
    
  }else if(this.sound.get(soundID).audioBuffer !== null && this.sound.get(soundID).volume !== null){ // otherwise play the sound from the keys and set its config to true so it loops.
      this.sound.get(soundID).play(soundName);
  }
  //this line of code sets the whole volume
  //this.sound.setVolume(volume);
  
  //set the volume of the specific sound.
  if(this.sound.get(soundID).audioBuffer !== null && this.sound.get(soundID).volume !== null){
    this.sound.get(soundID).volume = volume;
  }
  //ensures that the sound is looping

  //console.log("console.log(this.sound.get(soundID)): ",this.sound.get(soundID));
  }

  //function to set up non looping sound.
  initSoundEffectWithRefrence(soundID,soundName,volume,refrence){

  //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
  let createSound = true;

  //console.log("soundID ",soundID);

  //so we loop through the sounds to see if any sounds match our key
  //this is important as we do not want to create duplicate sounds with the same key.
  for(let counter = 0; counter < this.sound.sounds.length;counter++){
    //if a key matches the given sound then set bool to false.
    if(this.sound.sounds[counter].key === soundID){
      //console.log("found key: ",soundID,"so we wont create the sound object");
      createSound = false;
    }

  }

  //if we should create the sound because the key does not exist make it
  if(createSound === true){
      console.log("key not found making ",soundID);
      this.sound.playAudioSprite(soundID,soundName);
    
  }else if(this.sound.get(soundID).audioBuffer !== null && this.sound.get(soundID).volume !== null){ // otherwise play the sound from the keys and set its config to true so it loops.
      this.sound.get(soundID).play(soundName);
  }
  //this line of code sets the whole volume
  //this.sound.setVolume(volume);
  
  //set the volume of the specific sound.
  if(this.sound.get(soundID).audioBuffer !== null && this.sound.get(soundID).volume !== null){
    this.sound.get(soundID).volume = volume;
  }
  //ensures that the sound is looping
  this.sound.get(soundID).refrence = refrence;
  //console.log("console.log(this.sound.get(soundID)): ",this.sound.get(soundID));
  }

  //function to see if sfx is playing or not.
  isSoundEffectPlaying(soundID){

    //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
    let findSound = false;
  
    //so we loop through the sounds to see if any sounds match our key
    //this is important as we do not want to create duplicate sounds with the same key.
    for(let counter = 0; counter < this.sound.sounds.length;counter++){
      //if a key matches the given sound then set bool to false.
      if(this.sound.sounds[counter].key === soundID){
        //console.log("found key: ",soundID,"so we wont create the sound object");
        findSound = true;
      }
  
    }
    //console.log("this.sound.get(soundID) ",this.sound.get(soundID));
    // if we found the sfx then we return its isplaying value in that sounds object.
    if(findSound === true){
       //console.log("found sound but is it playing? ", this.sound.get(soundID).isPlaying);
         return this.sound.get(soundID).isPlaying;
      
    }else{
      return false;
    }
  }

  //function to see if sfx is playing or not.
  getSFXRefrence(soundID){

    //bool to test if the sound is already present in the webAudioSoundManager.sound.sounds[sound name] array
    let findSound = false;
  
    //so we loop through the sounds to see if any sounds match our key
    //this is important as we do not want to create duplicate sounds with the same key.
    for(let counter = 0; counter < this.sound.sounds.length;counter++){
      //if a key matches the given sound then set bool to false.
      if(this.sound.sounds[counter].key === soundID){
        //console.log("found key: ",soundID,"so we wont create the sound object");
        findSound = true;
      }
  
    }
    //console.log("this.sound.get(soundID) ",this.sound.get(soundID));
    // if we found the sfx then we return its isplaying value in that sounds object.
    if(findSound === true){

      

      //
      if(this.sound.get(soundID).refrence !== undefined && this.sound.get(soundID).refrence !== null){
        //console.log("found refrence stored in ",soundID, " -> ",this.sound.get(soundID).refrence);
        return this.sound.get(soundID).refrence;
      }else{
        console.log("found found sound id but had no refrence ",soundID, " -> ",this.sound.get(soundID).refrence);
        return null;
      }

      
    }else{
      console.log("searched for sound effect refrence but could not find key ", soundID);
      return null;
    }
  }

}