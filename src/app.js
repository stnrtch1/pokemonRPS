//import CookieManager from CookieManager file
import {cookieManager} from "./CookieManager.js";

//CookieManager object
let cookieManagerObject = cookieManager;

//jQuery Functions
let jQueryFunc = {};

//json array that will be used for saving stuff into the cookie
let jsonArray;

//sound object
let soundObject = new Audio();
let soundArray = [];

//html elements
let divHowToPlay;
let divOptions;
let divGame;
let divSelection;
let divBattlezone;

let btnNormal;
let btnFighting;
let btnFlying;
let btnPoison;
let btnGround;
let btnRock;
let btnBug;
let btnGhost;
let btnSteel;
let btnFire;
let btnWater;
let btnGrass;
let btnElectric;
let btnPsychic;
let btnIce;
let btnDragon;
let btnDark;
let btnFairy;

let btnSelectedTypeOne;
let btnSelectedTypeTwo;

let btnHowToPlay;
let btnOptions;
let btnOptionsConfirm;
let btnConfirm;
let btnNextRound;
let btnNewGame;

let btnMove1;
let btnMove2;
let btnMove3;
let btnMove4;
let btnMove5;

let txtTextbox;
let txtTurnCount;
let txtMaxTurns;
let txtPlayerHealth;
let txtPlayerMaxHealth;
let txtPlayerWins;
let txtAIHealth;
let txtAIMaxHealth;
let txtAIWins;

let frmHealth;
let frmAttack;
let frmTurns;
let txtError;

//type arrays
let typeArray = ["Normal","Fighting","Flying","Poison","Ground","Rock","Bug","Ghost","Steel","Fire","Water","Grass","Electric","Psychic","Ice","Dragon","Dark","Fairy"];
let playerTypes = [];
let enemyTypes = [];
let enemyMoveTypes = [];

//counters
let turnCount = 1;
let maxTurns = 3;
let playerHealth = 500;
let playerMaxHealth = 500;
let aiHealth = 500;
let aiMaxHealth = 500;
let baseDamage = 40;

//player stats
let playerWins = 0;
let aiWins = 0;

//--------------------------------------------------------------PRIVATE FUNCTIONS
function setupGame(){
    txtTurnCount.innerHTML = turnCount;
    txtMaxTurns.innerHTML = maxTurns;
    txtPlayerHealth.innerHTML = playerHealth;
    txtPlayerMaxHealth.innerHTML = playerMaxHealth;
    txtAIHealth.innerHTML = aiHealth;
    txtAIMaxHealth.innerHTML = aiMaxHealth;
}

function sectionSwap(){
    //both the type selection screen and battle screen aren't supposed to be on at the same time.
    //Let's clutter the screen less by making only one active at a time.
    //By default, the type selection screen is active first and when the player hits okay, then it swaps to the battle screen
    //Once the battle screen hits the end of the third turn, then the player hits a button to go back to the type selection screen
    
    //getComputedStyle gets the computed styles from the window and allows them to values to be checked
    // if(window.getComputedStyle(divSelection).display === "block"){
    //     divSelection.style.display = "none";
    //     divBattlezone.style.display = "block";
    // }else{
    //     divSelection.style.display = "block";
    //     divBattlezone.style.display = "none";
    // }
}

function enableTypes($type,$mode){
    //$type is the selected type
    //$mode decides what is done with the type:
    //0 = just that type enabled
    //1 = every type except the selected type
    let typeButtons = document.getElementsByClassName("select__type");
    for (let i = 0; i < typeButtons.length; i++){
        if($mode == 0){
            if(typeButtons[i].innerHTML == $type){
                typeButtons[i].disabled = false;
            }
        }else if ($mode == 1){
            if(typeButtons[i].innerHTML != $type){
                typeButtons[i].disabled = false;
            }
        }
        
    }
}

function giveAIMoveSet(){
    //first, any types that the enemy has should be added to the moveset
    let tempTypeArray = [...typeArray];
    for (let i=0;i<enemyTypes.length;i++){
        enemyMoveTypes.push(enemyTypes[i]);
        let typeIndex = tempTypeArray.indexOf(enemyTypes[i]);
        tempTypeArray.splice(typeIndex,1);
    }

    //now, give the rest of the moves
    while (enemyMoveTypes.length != 5){
        let typeCount = tempTypeArray.length;
        let typeIndex = Math.floor(Math.random() * (typeCount));
        let type = tempTypeArray[typeIndex];
        enemyMoveTypes.push(type);
        tempTypeArray.splice(typeIndex,1);
    }

    console.log("Enemy Moves: " + enemyMoveTypes);
}

function compareTypes($type,$mode){
    /*
        MODE INDEX:
        0: The types being compared belong to the AI
        1: The types being compared belong to the Player
    */

    //Take the move and compare it to what the enemy's types are
    //first check if the opponent has one type or two
    let defendingTypes = [];
    let attackingTypes = [];
    if($mode == 0){
        attackingTypes = [...playerTypes];
        defendingTypes = [...enemyTypes];
    }else if($mode == 1){
        attackingTypes = [...enemyTypes];
        defendingTypes = [...playerTypes];
    }

    let enemyTypeCount = defendingTypes.length;
    let damageMultiplier = [];
    for (let i=0; i < enemyTypeCount; i++){
        let enemyType = defendingTypes[i];
        if($type=="Normal"){
            if(enemyType=="Rock"||enemyType=="Steel"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Ghost"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Fighting"){
            if(enemyType=="Normal"||enemyType=="Rock"||enemyType=="Steel"||enemyType=="Ice"||enemyType=="Dark"){
                damageMultiplier.push(2);
            }else if(enemyType=="Flying"||enemyType=="Poison"||enemyType=="Bug"||enemyType=="Psychic"||enemyType=="Fairy"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Ghost"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Flying"){
            if(enemyType=="Fighting"||enemyType=="Bug"||enemyType=="Grass"){
                damageMultiplier.push(2);
            }else if(enemyType=="Rock"||enemyType=="Steel"||enemyType=="Electric"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Poison"){
            if(enemyType=="Grass"||enemyType=="Fairy"){
                damageMultiplier.push(2);
            }else if(enemyType=="Poison"||enemyType=="Ground"||enemyType=="Rock"||enemyType=="Ghost"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Steel"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Ground"){
            if(enemyType=="Poison"||enemyType=="Rock"||enemyType=="Steel"||enemyType=="Fire"||enemyType=="Electric"){
                damageMultiplier.push(2);
            }else if(enemyType=="Bug"||enemyType=="Grass"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Flying"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Rock"){
            if(enemyType=="Flying"||enemyType=="Bug"||enemyType=="Fire"||enemyType=="Ice"){
                damageMultiplier.push(2);
            }else if(enemyType=="Fighting"||enemyType=="Ground"||enemyType=="Steel"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Bug"){
            if(enemyType=="Grass"||enemyType=="Psychic"||enemyType=="Dark"){
                damageMultiplier.push(2);
            }else if(enemyType=="Fighting"||enemyType=="Flying"||enemyType=="Poison"||enemyType=="Ghost"||enemyType=="Steel"||enemyType=="Fire"||enemyType=="Fairy"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Ghost"){
            if(enemyType=="Ghost"||enemyType=="Psychic"){
                damageMultiplier.push(2);
            }else if(enemyType=="Dark"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Normal"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Steel"){
            if(enemyType=="Rock"||enemyType=="Ice"||enemyType=="Fairy"){
                damageMultiplier.push(2);
            }else if(enemyType=="Steel"||enemyType=="Fire"||enemyType=="Water"||enemyType=="Electric"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Fire"){
            if(enemyType=="Bug"||enemyType=="Steel"||enemyType=="Grass"||enemyType=="Ice"){
                damageMultiplier.push(2);
            }else if(enemyType=="Rock"||enemyType=="Fire"||enemyType=="Water"||enemyType=="Dragon"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Water"){
            if(enemyType=="Ground"||enemyType=="Rock"||enemyType=="Fire"){
                damageMultiplier.push(2);
            }else if(enemyType=="Water"||enemyType=="Grass"||enemyType=="Dragon"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Grass"){
            if(enemyType=="Ground"||enemyType=="Rock"||enemyType=="Water"){
                damageMultiplier.push(2);
            }else if(enemyType=="Flying"||enemyType=="Poison"||enemyType=="Bug"||enemyType=="Steel"||enemyType=="Fire"||enemyType=="Grass"||enemyType=="Dragon"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Electric"){
            if(enemyType=="Flying"||enemyType=="Water"){
                damageMultiplier.push(2);
            }else if(enemyType=="Grass"||enemyType=="Electric"||enemyType=="Dragon"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Ground"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Psychic"){
            if(enemyType=="Fighting"||enemyType=="Poison"){
                damageMultiplier.push(2);
            }else if(enemyType=="Steel"||enemyType=="Psychic"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Dark"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Ice"){
            if(enemyType=="Flying"||enemyType=="Ground"||enemyType=="Grass"||enemyType=="Dragon"){
                damageMultiplier.push(2);
            }else if(enemyType=="Steel"||enemyType=="Fire"||enemyType=="Water"||enemyType=="Ice"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Dragon"){
            if(enemyType=="Dragon"){
                damageMultiplier.push(2);
            }else if(enemyType=="Steel"){
                damageMultiplier.push(0.5);
            }else if(enemyType=="Fairy"){
                damageMultiplier.push(0);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Dark"){
            if(enemyType=="Ghost"||enemyType=="Psychic"){
                damageMultiplier.push(2);
            }else if(enemyType=="Fighting"||enemyType=="Dark"||enemyType=="Fairy"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }else if($type=="Fairy"){
            if(enemyType=="Fighting"||enemyType=="Dragon"||enemyType=="Dark"){
                damageMultiplier.push(2);
            }else if(enemyType=="Poison"||enemyType=="Steel"||enemyType=="Fire"){
                damageMultiplier.push(0.5);
            }else{
                damageMultiplier.push(1);
            }
        }
    }

    
    let damageDone = baseDamage;
    //check if the move is a STAB move
    if(attackingTypes.includes($type)){
        //if so, give it a 50% damage boost
        damageDone = damageDone * 1.5;
    }
    //if there is only one type being compared, set the second type damage multiplier to 1
    if(damageMultiplier[1] == undefined){
        damageMultiplier.push(1);
    }
    //add the text to tell how effective the move type is
    if(damageMultiplier[0]*damageMultiplier[1] == 4){
        txtTextbox.innerHTML += "It's extremely effective!<br>";
    }else if(damageMultiplier[0]*damageMultiplier[1] == 2){
        txtTextbox.innerHTML += "It's super effective!<br>";
    }else if(damageMultiplier[0]*damageMultiplier[1] == 0.5){
        txtTextbox.innerHTML += "It's not very effective...<br>";
    }else if(damageMultiplier[0]*damageMultiplier[1] == 0.25){
        txtTextbox.innerHTML += "It's extremely not effective...<br>";
    }else if(damageMultiplier[0]*damageMultiplier[1] == 0){
        txtTextbox.innerHTML += "It had no effect...<br>";
    }
    //now multiply the base damage by the damage multipliers
    for(let i = 0;i<damageMultiplier.length;i++){
        damageDone = damageDone * damageMultiplier[i];
    }

    txtTextbox.innerHTML += "It did " + damageDone + " damage!<br>";

    if($mode == 0){
        aiHealth = aiHealth - damageDone;
        txtAIHealth.innerHTML = aiHealth;
    }else if($mode == 1){
        playerHealth = playerHealth - damageDone;
        txtPlayerHealth.innerHTML = playerHealth;
    }


}

function aiAttack(){
    //pick a random move for the ai to use
    let moveCount = enemyMoveTypes.length;
    let moveIndex = Math.floor(Math.random() * moveCount);
    let selectedMove = enemyMoveTypes[moveIndex];

    txtTextbox.innerHTML += "AI used " + selectedMove + "! <br>";
    //now compare the move to the player's type(s)
    compareTypes(selectedMove,1);
    //remove the move from the movelist
    enemyMoveTypes.splice(moveIndex,1);
}

function clearMoves(){
    //clear the player and ai types
    playerTypes.length = 0;
    enemyTypes.length = 0;
    //now clear the movesets
    enemyMoveTypes.length = 0;
    let moveSet = document.getElementsByClassName("move");
    let i = 0;
    while(i!=moveSet.length){
        let classText = moveSet[i].innerHTML;
        moveSet[i].innerHTML = "?";
        moveSet[i].classList.remove("move--"+classText);
        moveSet[i].disabled = true;
        i++;
    }

    //now lets re-enable all the type selection buttons
    //first clear the selected type buttons
    btnSelectedTypeOne.classList.remove("selected__type--"+btnSelectedTypeOne.innerHTML);
    btnSelectedTypeOne.innerHTML = "?";
    btnSelectedTypeOne.disabled = true;
    if (btnSelectedTypeTwo.innerHTML != "?"){
        btnSelectedTypeTwo.classList.remove("selected__type--"+btnSelectedTypeTwo.innerHTML);
        btnSelectedTypeTwo.innerHTML = "?";
        btnSelectedTypeTwo.disabled = true;
    }

    //now reactivate all type selection buttons
    let typeButtons = document.getElementsByClassName("select__type");
    for (let i = 0; i < typeButtons.length; i++){
        typeButtons[i].disabled = false;
    }

    //reset the turn counter and clear the battle text
    turnCount = 1;
    txtTextbox.innerHTML = "";
}

function disableMoves(){
    //this function disables all leftover buttons
    //get all move buttons and disable the ones that aren't disabled already
    let moveSet = document.getElementsByClassName("move");
    let i = 0;
    while(i!=moveSet.length){
        if(moveSet[i].disabled == false){
            moveSet[i].disabled = true;
        }
        i++;
    }

    //show what the opponent's types were once the round/game is over
    if(enemyTypes.length == 1){
        if (enemyTypes[0] == "Electric" || enemyTypes[0] == "Ice"){
            //just for you people who want proper grammar
            txtTextbox.innerHTML += "Your opponent was an " + enemyTypes[0] + " type that round.";
        } else{
            txtTextbox.innerHTML += "Your opponent was a " + enemyTypes[0] + " type that round.";
        } 
    }else{
        if (enemyTypes[0] == "Electric" || enemyTypes[0] == "Ice"){
            //just for you people who want proper grammar
            txtTextbox.innerHTML += "Your opponent was an " + enemyTypes[0] + " and " + enemyTypes[1] + " type that round.";
        } else{
            txtTextbox.innerHTML += "Your opponent was a " + enemyTypes[0] + " and " + enemyTypes[1] + " type that round.";
        } 
    }
}

function resetGame(){
    //this function is called when the game needs to be reset when the options form is set
    //reset hp and turn counters
    playerHealth = playerMaxHealth;
    aiHealth = aiMaxHealth;

    //clear the players moves
    clearMoves();

    //hide the new game/round buttons when done
    btnNewGame.style.display = "None";
    btnNextRound.style.display = "None";

    //return to the selection screen
    divSelection.style.display = "block";
    divBattlezone.style.display = "none";
    
}

//SAVING AND LOADING COOKIE DATA
function updateWins($winner){
    if($winner == 0){
        playerWins++;
    }else if($winner == 1){
        aiWins++;
    }

    txtPlayerWins.innerHTML = playerWins;
    txtAIWins.innerHTML = aiWins;

    saveData();
}

function saveData(){
    //grab the wins and put it into an array
    //then jsonify the array and send it to the cookie
    let saveArray = [];
    saveArray.push(playerWins,aiWins);
    jsonArray = JSON.stringify(saveArray);
    cookieManagerObject.setCookie("stats", jsonArray, 365);
    
}

function loadData(){
    //grab the data and put it to the wins
    let loadArray = [];
    jsonArray = cookieManagerObject.getCookie("stats");
    loadArray = JSON.parse(jsonArray);

    playerWins = loadArray[0];
    aiWins = loadArray[1];

    txtPlayerWins.innerHTML = playerWins;
    txtAIWins.innerHTML = aiWins;
}

//--------------------------------------------------------------EVENT LISTENERS
//add type function
function addType($type){
    if(playerTypes.length != 2){
        if(playerTypes.length == 0){
            //if no types are selected, add this type to the first section
            btnSelectedTypeOne.innerHTML = $type;
            btnSelectedTypeOne.classList.add("selected__type--" + $type);
            //add the type to the selected type array
            playerTypes.push($type);
            btnSelectedTypeOne.disabled = false;
            btnConfirm.disabled = false;
        } else if(playerTypes.length == 1){
            //if one type is already selected, add this to the second section and disable the remaining buttons
            btnSelectedTypeTwo.innerHTML = $type;
            btnSelectedTypeTwo.classList.add("selected__type--" + $type);
            //add the type to the selected type array
            playerTypes.push($type);
            btnSelectedTypeTwo.disabled = false;
            //Grab all unused buttons and disable them all when two types are selected
            let typeButtons = document.getElementsByClassName("select__type");
            for (let i = 0; i < typeButtons.length; i++){
                //only disable the buttons that are not disabled already
                if(typeButtons[i].disabled == false){
                    typeButtons[i].disabled = true;
                }
            }
            //console.log(typeButtons);
        }
        
        let selectedBtn = document.getElementById($type);
        selectedBtn.disabled = true;
        //console.log(playerTypes);
    }
    
}

//remove type function
function removeType($index){
    if($index == 0){
        //console.log("First Type Removed");
        //what happens with the first type removed, changes depending if there is one or two types selected
        //if there is one type, then you just clear the button and re-enable the type button
        //if there is two types, then you clear the old first type, then move the second type to the first button and re-enable all the other type buttons
        if(playerTypes.length > 1){
            //here if there is two types
            //replace the first button with the second
            let originalType = btnSelectedTypeOne.innerHTML;
            let replacedType = btnSelectedTypeTwo.innerHTML;
            btnSelectedTypeOne.innerHTML = replacedType;
            btnSelectedTypeTwo.innerHTML = "?";
            btnSelectedTypeTwo.disabled = true;
            
            btnSelectedTypeOne.classList.remove("selected__type--"+ originalType);
            btnSelectedTypeOne.classList.add("selected__type--"+ replacedType);
            btnSelectedTypeTwo.classList.remove("selected__type--"+ replacedType);
            //now re-enable all the other buttons
            enableTypes(replacedType,1);
        }else{
            //here if there is only one type
            let removeType = btnSelectedTypeOne.innerHTML;
            btnSelectedTypeOne.classList.remove("selected__type--"+ removeType);
            btnSelectedTypeOne.innerHTML = "?";
            btnSelectedTypeOne.disabled = true;
            btnConfirm.disabled = true;
            //re-enable the removed type
            enableTypes(removeType,0);
        }
        playerTypes.splice(0,1);
    }else if($index == 1){
        //removed the second type from the selected group
        //console.log("Second Type Removed");
        playerTypes.splice(1,1);
        let removeType = btnSelectedTypeTwo.innerHTML;
        btnSelectedTypeTwo.classList.remove("selected__type--"+ removeType);
        btnSelectedTypeTwo.innerHTML = "?";
        btnSelectedTypeTwo.disabled = true;

        //get the first type from the array and then re-enable all buttons except that type
        let type = btnSelectedTypeOne.innerHTML;
        enableTypes(type,1);
    }
}

function onOptionsConfirm(){
    //check the values submitted in the form before doing anything
    let health = frmHealth.value;
    let attack = frmAttack.value;
    let turns = frmTurns.value;

    if((health == "")||(attack == "")||(turns == "")){
        txtError.innerHTML = "One or more values are empty!";
    }else{
        if((health <= 0)||(attack <= 0)||(turns <= 0)){
            txtError.innerHTML = "One or more values are set to or are less than zero!";
        }else{
            //everything is good to go
            //take the values from the form and put them into the game
            playerMaxHealth = frmHealth.value;
            aiMaxHealth = frmHealth.value;
            baseDamage = frmAttack.value;
            maxTurns = frmTurns.value;

            //now restart the current game
            resetGame();

            //clear error text
            txtError.innerHTML = "";
            
            jQueryFunc.ToggleOptions();


            
        }
    }

    
}

function onConfirmTypes(){
    //console.log("Types locked in");
    //console.log("Types: " + playerTypes);

    btnConfirm.disabled = true;

    let tempTypeArray = [...typeArray];
    //This function takes the types from the selectedTypes array and puts them into the move buttons for the battle screen
    let moveSet = document.getElementsByClassName("move");
    for (let i = 0; i < 5; i++){
        if(playerTypes[i] != undefined){
            //if there is a value in the selectedType Array, add it to a button
            moveSet[i].innerHTML = playerTypes[i];
            moveSet[i].classList.add("move--"+playerTypes[i]);
            moveSet[i].disabled = false;
            //remove the type from the full types array so it doesn't get selected again
            let typeIndex = tempTypeArray.indexOf(playerTypes[i]);
            tempTypeArray.splice(typeIndex,1);
        }else{
            //with no more array types, the rest of the moves will be randomized
            let typeCount = tempTypeArray.length;
            let typeIndex =  Math.floor(Math.random() * (typeCount));
            let type = tempTypeArray[typeIndex];
            moveSet[i].innerHTML = type;
            moveSet[i].classList.add("move--"+type);
            moveSet[i].disabled = false;
            //remove the type from the typeArray so it doesn't get picked again
            tempTypeArray.splice(typeIndex,1);
        }
    }

    //Now that the player's types are selected, let's select the types for the AI
    let enemyTypeArray = [...typeArray];
    //There will be a 50/50 chance that either the AI has one type or two
    let enemyTypeCount = Math.floor(Math.random() * (2)) + 1;
    //console.log("Enemy Types: " + enemyTypeCount);
    for (let i=0; i < enemyTypeCount;i++){
        let typeCount = enemyTypeArray.length;
        let typeIndex = Math.floor(Math.random() * typeCount);
        let type = enemyTypeArray[typeIndex];
        //with the type selected, push it into the enemy type array and then push it out of the full type pool
        enemyTypes.push(type);
        enemyTypeArray.splice(typeIndex,1);
    }

    console.log("Enemy Types: " + enemyTypes);

    //now let's give the AI some moves to use
    giveAIMoveSet();

    //setup the game counters
    setupGame();

    //swap the game view
    // sectionSwap();
    jQueryFunc.SectionSwap();

}

function onAttack($moveIndex){
    //console.log("Move Index Used: " + $moveIndex);
    let typeUsed = document.getElementById("move"+$moveIndex);
    typeUsed.disabled = true;
    let typeText = typeUsed.innerHTML;
    //console.log("Move Type Used: " + typeText);
    txtTextbox.innerHTML += "You used " + typeText + "! <br>";

    compareTypes(typeText,0);
    soundArray.push(typeText);
    
    //check if the AI is out of HP
    if(aiHealth <= 0){
        //ai is at or below 0 hp, player wins the game
        txtTextbox.innerHTML += "AI is out of HP. Player wins! <br>";
        btnNewGame.style.display = "Block";
        disableMoves();
        updateWins(0);
    }else{
        aiAttack();

        if(playerHealth <= 0){
            //player is at 0 or less HP, AI wins the game
            txtTextbox.innerHTML += "Player is out of HP. AI wins! <br>";
            btnNewGame.style.display = "Block";
            disableMoves();
            updateWins(1);
        }else{
            turnCount++;
            if(turnCount > maxTurns){
                //return the player to type selection screen
                console.log("Round is over.");
                btnNextRound.style.display = "Block";
                disableMoves();
                //roundReset();
            }else{
                txtTurnCount.innerHTML = turnCount;
            }
        }
        
    }
    
}

function onNextRound(){
    //clear the moves and types
    clearMoves();

    //hide the next round button
    btnNextRound.style.display = "none";

    //swap the game view
    // sectionSwap();
    jQueryFunc.SectionSwap();

}

function onNewGame(){
    //reset hp and turn counters
    playerHealth = playerMaxHealth;
    aiHealth = aiMaxHealth;

    //clear the players moves
    clearMoves();

    //hide the new game button when done
    btnNewGame.style.display = "None";

    //swap the game view
    // sectionSwap();
    jQueryFunc.SectionSwap();

}


//--------------------------------------------------------------MAIN FUNCTION
function main(){
    txtTurnCount = document.getElementById("turnCount");
    txtMaxTurns = document.getElementById("maxTurns");
    txtPlayerHealth = document.getElementById("playerHealth");
    txtPlayerMaxHealth = document.getElementById("playerMaxHealth");
    txtPlayerWins = document.getElementById("playerWins");
    txtAIHealth = document.getElementById("aiHealth");
    txtAIMaxHealth = document.getElementById("aiMaxHealth");
    txtAIWins = document.getElementById("aiWins");
    

    //get existing data from cookie if it exists
    if (cookieManagerObject.getCookie("stats") === undefined){
        //if there is no cookie, create a new one for use
        console.log("No Cookie Located. Creating New One.");
        saveData();
    } else{
        //if there is a cookie, then grab the data and set it
        console.log("Cookie Located. Loading Data.");
        loadData();
    }

    divHowToPlay = document.getElementsByClassName("howtoplay__text")[0];
    divOptions = document.getElementsByClassName("options__form")[0];
    divGame = document.getElementsByClassName("game")[0];
    divSelection = document.getElementsByClassName("selection")[0];
    divBattlezone = document.getElementsByClassName("battlezone")[0];

    frmHealth = document.getElementById("frmHealth");
    frmAttack = document.getElementById("frmAttack");
    frmTurns = document.getElementById("frmTurns");
    txtError = document.getElementsByClassName("optionsForm__error")[0];

    //initialize event listeners
    btnSelectedTypeOne = document.getElementsByClassName("selected__type")[0];
    btnSelectedTypeTwo = document.getElementsByClassName("selected__type")[1];

    btnNormal = document.getElementById("Normal");
    btnFighting = document.getElementById("Fighting");
    btnFlying = document.getElementById("Flying");
    btnPoison = document.getElementById("Poison");
    btnGround = document.getElementById("Ground");
    btnRock = document.getElementById("Rock");
    btnBug = document.getElementById("Bug");
    btnGhost = document.getElementById("Ghost");
    btnSteel = document.getElementById("Steel");
    btnFire = document.getElementById("Fire");
    btnWater = document.getElementById("Water");
    btnGrass = document.getElementById("Grass");
    btnElectric = document.getElementById("Electric");
    btnPsychic = document.getElementById("Psychic");
    btnIce = document.getElementById("Ice");
    btnDragon = document.getElementById("Dragon");
    btnDark = document.getElementById("Dark");
    btnFairy = document.getElementById("Fairy");

    btnHowToPlay = document.getElementsByClassName("howtoplay__button")[0];
    btnOptions = document.getElementsByClassName("options__button")[0];
    btnOptionsConfirm = document.getElementsByClassName("optionsForm__confirm")[0];
    btnConfirm = document.getElementsByClassName("confirm__button")[0];
    btnNextRound = document.getElementsByClassName("nextround__button")[0];
    btnNewGame = document.getElementsByClassName("reset__button")[0];

    btnMove1 = document.getElementById("move1");
    btnMove2 = document.getElementById("move2");
    btnMove3 = document.getElementById("move3");
    btnMove4 = document.getElementById("move4");
    btnMove5 = document.getElementById("move5");

    txtTextbox = document.getElementsByClassName("textbox")[0];

    btnSelectedTypeOne.addEventListener("click", () =>{removeType(0);});
    btnSelectedTypeTwo.addEventListener("click", () =>{removeType(1);});

    btnNormal.addEventListener("click", () => {addType("Normal");});
    btnFighting.addEventListener("click", () => {addType("Fighting");});
    btnFlying.addEventListener("click", () => {addType("Flying");});
    btnPoison.addEventListener("click", () => {addType("Poison");});
    btnGround.addEventListener("click", () => {addType("Ground");});
    btnRock.addEventListener("click", () => {addType("Rock");});
    btnBug.addEventListener("click", () => {addType("Bug");});
    btnGhost.addEventListener("click", () => {addType("Ghost");});
    btnSteel.addEventListener("click", () => {addType("Steel");});
    btnFire.addEventListener("click", () => {addType("Fire");});
    btnWater.addEventListener("click", () => {addType("Water");});
    btnGrass.addEventListener("click", () => {addType("Grass");});
    btnElectric.addEventListener("click", () => {addType("Electric");});
    btnPsychic.addEventListener("click", () => {addType("Psychic");});
    btnIce.addEventListener("click", () => {addType("Ice");});
    btnDragon.addEventListener("click", () => {addType("Dragon");});
    btnDark.addEventListener("click", () => {addType("Dark");});
    btnFairy.addEventListener("click", () => {addType("Fairy");});

    btnOptionsConfirm.addEventListener("click", onOptionsConfirm);
    btnConfirm.addEventListener("click", onConfirmTypes);
    btnNextRound.addEventListener("click", onNextRound);
    btnNewGame.addEventListener("click", onNewGame);

    btnMove1.addEventListener("click", () => {onAttack(1);});
    btnMove2.addEventListener("click", () => {onAttack(2);});
    btnMove3.addEventListener("click", () => {onAttack(3);});
    btnMove4.addEventListener("click", () => {onAttack(4);});
    btnMove5.addEventListener("click", () => {onAttack(5);});
    
    console.log("Cheating are you? Tsk tsk");
}


main();

//JQUERY FUNCTIONS
$(document).ready(function(){
    console.log("JQuery Loaded!");

    let sectionSwap = function(){
        if($(divSelection).is(":visible")){
            $(divSelection).fadeOut(function(){
                $(divBattlezone).fadeIn();
            });
        }else{
            $(divBattlezone).fadeOut(function(){
                $(divSelection).fadeIn();
            });
        }
            
    }
    jQueryFunc.SectionSwap = sectionSwap;

    function toggleOptions(){
        if($(divGame).is(":visible")){
            $(divGame).fadeOut(function(){
                $(divOptions).fadeIn();
                //populate the form data with the current values
                frmHealth.value = playerMaxHealth;
                frmAttack.value = baseDamage;
                frmTurns.value = maxTurns;
                $(btnOptions).text("Close Options");
            });
        }else{
            $(divOptions).fadeOut(function(){
                $(divGame).fadeIn();
                $(btnOptions).text("Open Options");
            });
        }
    }
    jQueryFunc.ToggleOptions = toggleOptions;

    //slideToggle how to play section
    $(btnHowToPlay).click(function(){
        $(divHowToPlay).slideToggle(500, function(){
            if($(divHowToPlay).is(":visible")){
                $(btnHowToPlay).text("Hide This Section");
            }else{
                $(btnHowToPlay).text("How to Play");
            }
        });
    });

    //fadeToggle option section
    $(btnOptions).click(function(){
        toggleOptions();
    });

});