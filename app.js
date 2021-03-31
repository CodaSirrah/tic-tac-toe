/*
PseudoCode...
create 3 functions, either factory or modules: gameBoard(), players() and displayController().
gameBoard() keeps track of the grid and what type has been placed on it.
players() creates each player and assigns them a type (naughts or crosses).
displayController() is responsible for displaying the initial grid and displaying any updates.
*/
const gameGrid = document.getElementById("gameGrid");
const cells = document.getElementsByClassName("gridCell");

const player = (name, type) => {
    return {name, type};
};

const player1 = player("Tom", "o");
const player2 = player("Ben", "x");
let currentPlayer = player1;

const displayController = (() => {
    const grid = [1, 2, 3, 4, 5 ,6 ,7, 8, 9];
    const displayGameboard = () => {
        for (i = 1; i <= grid.length; i++) {
            let cell = document.createElement("div");
            cell.setAttribute("data-cell", i);
            cell.setAttribute("id", `cell${i}`);
            cell.classList.add("gridCell");
            gameGrid.appendChild(cell);
            cell.addEventListener("click", () => {
                if (game(cell).checkEmptyCell() === true) {
                    if (currentPlayer === player1) {
                    game(cell).markCell(player1.type);
                    game(cell).paintCell();
                    game().checkWin(currentPlayer, currentPlayer.type);
                    game().checkDraw();
                    currentPlayer = player2; 
                    } else if (currentPlayer === player2) {
                    game(cell).markCell(player2.type);
                    game(cell).paintCell();
                    game().checkWin(currentPlayer, currentPlayer.type);
                    game().checkDraw();
                    currentPlayer = player1;
                    }
                }
            });
        };
    };
    return {
        displayGameboard
        };
    })();

displayController.displayGameboard();
const cellArray = document.getElementsByClassName("gridCell");

const game = (cell) => {
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
    
    checkWin = (player, playerType) => {
        if (cellArray[0].dataset.type === playerType && cellArray[1].dataset.type === playerType && 
            cellArray[2].dataset.type === playerType ||
            cellArray[3].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[5].dataset.type === playerType || 
            cellArray[6].dataset.type === playerType && cellArray[7].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
        return alert(`${player.name} wins!`);
        } else if (cellArray[0].dataset.type === playerType && cellArray[3].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType ||
            cellArray[1].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[7].dataset.type === playerType ||
            cellArray[2].dataset.type === playerType && cellArray[5].dataset.type === playerType &&
            cellArray[8].dataset.type === playerType) {
                return alert(`${player.name} wins!`);
            } else if (cellArray[0].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
                cellArray[8].dataset.type === playerType ||
                cellArray[2].dataset.type === playerType && cellArray[4].dataset.type === playerType &&
            cellArray[6].dataset.type === playerType) {
                return alert(`${player.name} wins!`);
            }
            else {
                return false;
            };
    };

    checkDraw = () => {
        let gridSpace = 9;
        for (i = 0; i <= 8; i++) {
            if (cellArray[i].innerHTML === "x" || cellArray[i].innerHTML === "o")  gridSpace -= 1;
        }
        if (gridSpace <= 0) return alert("It is a draw!");
    }

    return {checkEmptyCell, markCell, paintCell, checkWin, checkDraw};
};

