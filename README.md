# Phaser-Adventure
Repository for Phaser top-down adventure style game

Created by Calvin Richards and Claire Buck

Refer to the slides for November 18th to get more info on what to put in here (also helpful for the design doc)


KEY STRUCTURES:
    The central structure of the game is the player inventory system, which also handles how player data
    is passed between scenes.

    There will be a DOOR object that has a value tied to one of the houses. Corresponding function in the 
    city class that takes in the door value. 

FILES:
    City.js is the central scene from which other scenes can be launched, although City does not end 
    until the end of the game. 
        House_1-4.js are the homes that the player can enter within the town. 
    
    UI.js is the UI/Inventory file that runs externally to the main scenes. It manages state so that you don't
    have to deal with passing tons of variables / objects between the main scenes.

    