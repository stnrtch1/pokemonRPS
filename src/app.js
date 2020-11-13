//TO DO
/*
    - Game is over when either the player's or AI's HP reaches 0
    - Disable all leftover buttons and enable a new game button
*/

//html elements
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

let btnConfirm;
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
let txtAIHealth;
let txtAIMaxHealth;

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

//--------------------------------------------------------------PRIVATE FUNCTIONS
function setupGame(){
    txtTurnCount.innerHTML = turnCount;
    txtMaxTurns.innerHTML = maxTurns;
    txtPlayerHealth.innerHTML = playerHealth;
    txtPlayerMaxHealth.innerHTML = playerMaxHealth;
    txtAIHealth.innerHTML = aiHealth;
    txtAIMaxHealth.innerHTML = aiMaxHealth;
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

    console.log(enemyMoveTypes);
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

function roundReset(){
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

function gameOver(){
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
        console.log(playerTypes);
    }
    
}

//remove type function
function removeType($index){
    if($index == 0){
        console.log("First Type Removed");
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
        console.log("Second Type Removed");
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

function onConfirmTypes(){
    console.log("Types locked in");
    console.log("Types: " + playerTypes);

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
    console.log("Enemy Types: " + enemyTypeCount);
    for (let i=0; i < enemyTypeCount;i++){
        let typeCount = enemyTypeArray.length;
        let typeIndex = Math.floor(Math.random() * typeCount);
        let type = enemyTypeArray[typeIndex];
        //with the type selected, push it into the enemy type array and then push it out of the full type pool
        enemyTypes.push(type);
        enemyTypeArray.splice(typeIndex,1);
    }

    console.log(enemyTypes);

    //now let's give the AI some moves to use
    giveAIMoveSet();

    //setup the game counters
    setupGame();

}

function onAttack($moveIndex){
    console.log("Move Index Used: " + $moveIndex);
    let typeUsed = document.getElementById("move"+$moveIndex);
    typeUsed.disabled = true;
    let typeText = typeUsed.innerHTML;
    console.log("Move Type Used: " + typeText);
    txtTextbox.innerHTML += "You used " + typeText + "! <br>";

    compareTypes(typeText,0);
    
    //check if the AI is out of HP
    if(aiHealth <= 0){
        //ai is at or below 0 hp, player wins the game
        txtTextbox.innerHTML += "AI is out of HP. Player wins!";
        btnNewGame.style.display = "Block";
        gameOver();
    }else{
        aiAttack();

        if(playerHealth <= 0){
            //player is at 0 or less HP, AI wins the game
            txtTextbox.innerHTML += "Player is out of HP. AI wins!";
            btnNewGame.style.display = "Block";
            gameOver();
        }else{
            turnCount++;
            if(turnCount > 3){
                //return the player to type selection screen
                console.log("Round is over.");
                roundReset();
            }else{
                txtTurnCount.innerHTML = turnCount;
            }
        }
        
    }
    
}

function onResetGame(){
    /*
        On hitting New Game:
        - HP and Turn Values need to be reset
        - Moves need to be cleared
        - Selected Types need to be cleared
        - Enemy Moves and Types need to be cleared
    */
    //reset hp and turn counters
    playerHealth = playerMaxHealth;
    aiHealth = aiMaxHealth;

    //clear the players moves
    roundReset();

    //hide the new game button when done
    btnNewGame.style.display = "None";
}

function main(){
    txtTurnCount = document.getElementById("turnCount");
    txtMaxTurns = document.getElementById("maxTurns");
    txtPlayerHealth = document.getElementById("playerHealth");
    txtPlayerMaxHealth = document.getElementById("playerMaxHealth");
    txtAIHealth = document.getElementById("aiHealth");
    txtAIMaxHealth = document.getElementById("aiMaxHealth");

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

    btnConfirm = document.getElementsByClassName("confirm__button")[0];
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

    btnConfirm.addEventListener("click", onConfirmTypes);
    btnNewGame.addEventListener("click", onResetGame);

    btnMove1.addEventListener("click", () => {onAttack(1);});
    btnMove2.addEventListener("click", () => {onAttack(2);});
    btnMove3.addEventListener("click", () => {onAttack(3);});
    btnMove4.addEventListener("click", () => {onAttack(4);});
    btnMove5.addEventListener("click", () => {onAttack(5);});
    
    console.log("Wassup? I'm here.");
}


main();