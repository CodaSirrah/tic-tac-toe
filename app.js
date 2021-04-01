/*
PseudoCode...
create 3 functions, either factory or modules: gameBoard(), players() and displayController().
gameBoard() keeps track of the grid and what type has been placed on it.
players() creates each player and assigns them a type (naughts or crosses).
displayController() is responsible for displaying the initial grid and displaying any updates.
*/

const cells = document.getElementsByClassName("gridCell");

const player = (name, type) => {
    return {name, type};
};

const player1 = player("Tom", "o");
const player2 = player("Ben", "x");
let currentPlayer = player1;

const displayController = (() => {
    const displayGameboard = () => {
        const main = document.createElement("section");
        main.setAttribute("id", "main");
        const gameGrid = document.createElement("div");
        gameGrid.setAttribute("id", "gameGrid");
        main.appendChild(gameGrid);
        document.querySelector("body").appendChild(main);
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
        
    };
    const displayWelcome = () => {
        let titleContainer = document.createElement("div");
        let titleMessage = document.createElement("h1");
        let startContainer = document.createElement("div");
        let startButton = document.createElement("button");
        let container = document.createElement("div");
        container.classList.add("titleContainer");
        titleContainer.classList.add("titleContainer");
        titleMessage.classList.add("titleMessage");
        startContainer.classList.add("startContainer");
        startButton.classList.add("startButton");
        titleMessage.innerHTML = "Tic Tac Toe";
        startButton.innerHTML = "Start Game?";
        titleContainer.appendChild(titleMessage);
        startContainer.appendChild(startButton);
        container.appendChild(titleContainer);
        container.appendChild(startContainer);
        document.querySelector("body").appendChild(container);
        startButton.addEventListener("click", () => {
            startContainer.remove();
            container.classList.add("startAnimation");
            container.style.cssText = "pointer-events: none";
            displayController.displayGameboard();
        });
    };
    
    return {
        displayWelcome,
        displayGameboard
        };
    })();
displayController.displayWelcome();
// displayController.displayGameboard();

const cellArray = document.getElementsByClassName("gridCell");

const game = cell => {
    markCell = (type) => {
        cell.setAttribute("data-type", type);
    };
    checkEmptyCell = () => {
        if (cell.dataset.type === "x" || cell.dataset.type === "o") {
            return false;
        }
        else {
            return true;
        }
    };
    paintCell = () => {
        cell.innerHTML = `${currentPlayer.type}`;
    };
    
    checkResult = (player, playerType) => {
        if (cellArray[0].dataset.type === playerType && cellArray[1].dataset.type === playerType && 
            cellArray[2].dataset.type === playerType ||
            cellArray[3].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[5].dataset.type === playerType || 
            cellArray[6].dataset.type === playerType && cellArray[7].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
                return victoryScreen(playerType);
        } else if (cellArray[0].dataset.type === playerType && cellArray[3].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType ||
            cellArray[1].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[7].dataset.type === playerType ||
            cellArray[2].dataset.type === playerType && cellArray[5].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
                return victoryScreen(playerType);
            } else if (cellArray[0].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
                cellArray[8].dataset.type === playerType ||
                cellArray[2].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType) {
                return victoryScreen(playerType);
            } else {
                let gridSpace = 9;
                for (i = 0; i <= 8; i++) {
                    if (cellArray[i].innerHTML === "x" || cellArray[i].innerHTML === "o")  gridSpace -= 1;
                }
                if (gridSpace <= 0) return drawScreen();

            }
    };

    gameState = () => {
        if (game(cell).checkEmptyCell() === true) {
            if (currentPlayer === player1) {
            game(cell).markCell(player1.type);
            game(cell).paintCell();
            game().checkResult(currentPlayer, currentPlayer.type);
            
            currentPlayer = player2; 
            } else if (currentPlayer === player2) {
            game(cell).markCell(player2.type);
            game(cell).paintCell();
            game().checkResult(currentPlayer, currentPlayer.type);
            
            currentPlayer = player1;
            }
        }
    };

    victoryScreen = playerType => {
        let victoryContainer = document.createElement("div");
        let victoryMessage = document.createElement("p");
        victoryMessage.innerHTML = "The winner is " + playerType;
        victoryMessage.classList.add("victoryMsg");
        victoryContainer.appendChild(victoryMessage);
        victoryContainer.classList.add("victoryContainer");
        gameGrid.appendChild(victoryContainer);
        victoryContainer.addEventListener("click", (e) => {
            document.getElementById("main").remove();
            displayController.displayGameboard();
            
        })
    };

    drawScreen = () => {
        let victoryContainer = document.createElement("div");
        let victoryMessage = document.createElement("p");
        victoryMessage.innerHTML = "It's a draw!";
        victoryMessage.classList.add("victoryMsg");
        victoryContainer.appendChild(victoryMessage);
        victoryContainer.classList.add("victoryContainer");
        gameGrid.appendChild(victoryContainer);
        victoryContainer.addEventListener("click", (e) => {
            document.getElementById("main").remove();
            displayController.displayGameboard();
        })
    };
    
    return {checkEmptyCell, markCell, paintCell, checkResult, gameState};
};