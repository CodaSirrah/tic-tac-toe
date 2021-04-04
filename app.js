/*
PseudoCode...
create 3 functions, either factory or modules: gameBoard(), players() and displayController().
gameBoard() keeps track of the grid and what type has been placed on it.
players() creates each player and assigns them a type (naughts or crosses).
displayController() is responsible for displaying the initial grid and displaying any updates.
*/

const cells = document.getElementsByClassName("gridCell");
let endState = false;

const player = (name, type) => {
    return {name, type};
};

const player1 = player("Tom", "❌");
const player2 = player("Ben", "⭕");
let currentPlayer = player1;
let selectables = document.getElementsByClassName("select");

const displayController = (() => {
    const displayGameboard = () => {
        const main = document.createElement("section");
        main.setAttribute("id", "main");
        const gameGrid = document.createElement("div");
        gameGrid.setAttribute("id", "gameGrid");
        main.appendChild(gameGrid);
        document.querySelector("#gridSpace").appendChild(main);
        for (i = 1; i <= 9; i++) {
            let cell = document.createElement("div");
            cell.setAttribute("id", `cell${i}`);
            cell.classList.add("gridCell");
            gameGrid.appendChild(cell);
            // tracks state of the game.
            cell.addEventListener("click", () => {
                game(cell).gameState();
            });
        };
    }
    const displayReset = () => {
        document.createElement("div");
        const resetContainer = document.createElement("div");
        const resetText = document.createElement("p");
        const resetSymbol = document.createElement("p");
        resetText.innerHTML = "Reset"
        resetSymbol.innerHTML = "↻";
        resetText.classList.add("reset");
        resetSymbol.classList.add("reset")
        resetContainer.classList.add("resetContainer");
        resetContainer.classList.add("resetFadeIn");
        resetContainer.appendChild(resetText);
        resetContainer.appendChild(resetSymbol);
        document.querySelector("#tags").appendChild(resetContainer);
        resetContainer.addEventListener("click", () => {
            game().resetGrid();
        })
    }
    
    const displayWelcome = () => {
        let titleContainer = document.createElement("div");
        let titleTag = document.createElement("h1");
        let startContainer = document.createElement("div");
        let startButton = document.createElement("button");
        let container = document.createElement("div");
        container.classList.add("titleContainer");
        titleContainer.classList.add("titleContainer");
        titleTag.classList.add("titleTag");
        startContainer.classList.add("startContainer");
        startButton.classList.add("startButton");
        titleTag.innerHTML = "Tic Tac Toe";
        startButton.innerHTML = "Start Game?";
        titleContainer.appendChild(titleTag);
        startContainer.appendChild(startButton);
        container.appendChild(titleContainer);
        container.appendChild(startContainer);
        document.querySelector("#tags").appendChild(container);
        startButton.addEventListener("click", () => {
            startContainer.style.cssText = "animation: fadeOut 0.2s linear forwards;"
            container.classList.add("pushUp");
            container.style.cssText = "pointer-events: none";
            displayController.displayGameboard();
            displayController.displayReset();
            displayController.displayOpponent();
        });
    };

    const displayOpponent = () => {
        let opponentContainer = document.createElement("div");
        let opponentGrid = document.createElement("div");
        let aiTag = document.createElement("button");
        let playerTag = document.createElement("button");
        let vsTag = document.createElement("button");
        opponentContainer.setAttribute("id", "opponentContainer");
        opponentGrid.classList.add("opponentGrid");
        aiTag.classList.add("select");
        aiTag.classList.add("AI");
        playerTag.classList.add("select");
        playerTag.classList.add("human");
        vsTag.classList.add("vs");  
        aiTag.innerHTML = "Computer"
        playerTag.innerHTML = "Player";
        vsTag.innerHTML = "OR";
        opponentGrid.appendChild(playerTag);
        opponentGrid.appendChild(vsTag);
        opponentGrid.appendChild(aiTag);
        opponentContainer.appendChild(opponentGrid);
        document.querySelector("#tags").appendChild(opponentContainer);
        selectables[1].classList.add("currentSelection");
        selectables[0].addEventListener("click", () => {
            selectables[0].classList.add("currentSelection");
            selectables[1].classList.remove("currentSelection");
        })
        selectables[1].addEventListener("click", () => {
            selectables[1].classList.add("currentSelection");
            selectables[0].classList.remove("currentSelection");
        })
    }
    return {
        displayWelcome,
        displayGameboard,
        displayReset,
        displayOpponent
        };
    })();
displayController.displayWelcome();

const cellArray = document.getElementsByClassName("gridCell");

const game = cell => {
    markCell = (type) => {
        cell.setAttribute("data-type", type);
    };
    checkEmptyCell = () => {
        if (cell.dataset.type === "❌" || cell.dataset.type === "⭕") return false;
        else return true;
    };
    paintCell = (currentPlayer) => {
        cell.innerHTML = currentPlayer;
    };
    
    checkResult = (player, playerType) => {
        if (cellArray[0].dataset.type === playerType && cellArray[1].dataset.type === playerType && 
            cellArray[2].dataset.type === playerType ||
            cellArray[3].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[5].dataset.type === playerType || 
            cellArray[6].dataset.type === playerType && cellArray[7].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
                endState = true;
                return victoryState(playerType);
        } else if (cellArray[0].dataset.type === playerType && cellArray[3].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType ||
            cellArray[1].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[7].dataset.type === playerType ||
            cellArray[2].dataset.type === playerType && cellArray[5].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
                endState = true;
                return victoryState(playerType);
            } else if (cellArray[0].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
                cellArray[8].dataset.type === playerType ||
                cellArray[2].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType) {
                endState = true;
                return victoryState(playerType);
            } else {
                let gridSpace = 9;
                for (i = 0; i <= 8; i++) {
                    if (cellArray[i].innerHTML === "❌" || cellArray[i].innerHTML === "⭕")  gridSpace -= 1;
                }
                if (gridSpace <= 0)  {
                    endState = true;
                    return drawState();
                }
                else return false;
            }
    };

    gameState = () => {
        // Player vs Player
        if (document.getElementsByClassName("currentSelection")[0].childNodes[0].nodeValue === "Player") {
        if (game(cell).checkEmptyCell() === true) {
            if (currentPlayer === player1) {
            game(cell).markCell(player1.type);
            game(cell).paintCell(`${currentPlayer.type}`);
            game().checkResult(currentPlayer, currentPlayer.type);
            currentPlayer = player2; 
            } else if (currentPlayer === player2) {
            game(cell).markCell(player2.type);
            game(cell).paintCell(`${currentPlayer.type}`);
            game().checkResult(currentPlayer, currentPlayer.type);
            currentPlayer = player1;
            }
        }
        
    } 
    // Player vs Computer
    else if (document.getElementsByClassName("currentSelection")[0].childNodes[0].nodeValue === "Computer") {
        currentPlayer = player1;
        if (game(cell).checkEmptyCell() === true) {
            game(cell).markCell(player1.type);
            game(cell).paintCell(`${currentPlayer.type}`);
            game().checkResult(currentPlayer, currentPlayer.type);
            if (endState === false) 
            game().playAI();
            game().checkResult(player2, player2.type);
            } 
        }
    };

    victoryState = playerType => {
        let victoryContainer = document.createElement("div");
        let victoryMessage = document.createElement("p");
        victoryMessage.innerHTML = "The winner is " + playerType;
        victoryMessage.classList.add("victoryMsg");
        victoryContainer.appendChild(victoryMessage);
        victoryContainer.classList.add("victoryContainer");
        gameGrid.appendChild(victoryContainer);
        victoryContainer.addEventListener("click", (e) => {
            game().resetGrid();
        })
    };

    drawState = () => {
        let victoryContainer = document.createElement("div");
        let victoryMessage = document.createElement("p");
        victoryMessage.innerHTML = "It's a draw!";
        victoryMessage.classList.add("victoryMsg");
        victoryContainer.appendChild(victoryMessage);
        victoryContainer.classList.add("victoryContainer");
        gameGrid.appendChild(victoryContainer);
        victoryContainer.addEventListener("click", (e) => {
            game().resetGrid();
        })
    };

    resetGrid = () => {
        document.getElementById("main").remove();
        displayController.displayGameboard();
        endState = false;
    }

    playAI = () => {
        let newArray = [];
        for (i = 0; i <= cellArray.length -1; i++ ) {
            if (game(cellArray[i]).checkEmptyCell() === false) {
            newArray.push("Full")
            } else { 
                newArray.push("Empty");
            }
         } 
        let x = 0;
        do {
           x = Math.floor(Math.random() * 9 )
        } while (newArray[x] !== "Empty"); 
            game(cellArray[x]).markCell(player2.type);
            game(cellArray[x]).paintCell(player2.type);
        
        
    
    }
    return {checkEmptyCell, markCell, paintCell, checkResult, gameState, resetGrid, playAI};
};