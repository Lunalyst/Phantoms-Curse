// here are the event emmiter definitions and key definitions
//these keys are use to tell 
healthEvent = {
    loseHealth: 'lose_health',
    gainHealth: 'gain_health',
    returnHealth: 'return_health',
    maxHealth:'max_health'
};

healthEmitter = new Phaser.Events.EventEmitter();




SceneTransitionLoad = {
    loadValues: 'load_values',
    
};

loadSceneTransitionLoad = new Phaser.Events.EventEmitter();

tabKey = {
    isTabDown: 'tab_is_down',
    
};

accessTabKey = new Phaser.Events.EventEmitter();

