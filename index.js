const Player = (playerNumber,marker) =>{
    let arr = [];
    const getNumber = () => playerNumber;
    const getMarker = () => marker;
    const getOccupied = () => arr;
    const setOccupied = (x) => {
        return (x==='reset' ? arr=[] : arr.push(x));
    }
        return{
        getNumber,
        getMarker,
        getOccupied,
        setOccupied,
    }
};

const startGameBtn = document.querySelector('#new-game');

startGameBtn.addEventListener('click',()=>{
    gameBoard.resetBoard();
})

const gameBoard = (()=>{
    let gameState = ['','','','','','','','',''];
    let boardContainer = document.querySelector('#board-container');
    let playerOneLabel = document.querySelector('#player-1');
    let playerTwoLabel = document.querySelector('#player-2');
    let message = document.createElement('span');
    const lowerContainer = document.querySelector('#lower-container');

    let playerOne = Player(1,'X');
    let playerTwo = Player(2,'O');

    let turn = playerOne.getNumber();

    let playerOneCount = [];
    let playerTwoCount = [];

    const renderBoard = () => {
        
        for(let i=0;i<gameState.length;i++){

            let boardCell = document.createElement('div');
            boardCell.setAttribute('class','board-cell');
            boardCell.setAttribute('data-index',i);

            switch(gameState[i]){
                case '':
                    boardCell.textContent = '';
                    break;
                case 'X':
                    boardCell.textContent = 'X';
                    break;
                case 'O':
                    boardCell.textContent = 'O';
                    break;
            }
            
            boardCell.addEventListener('click', ()=>{
                let index = boardCell.dataset.index;
                if(boardCell.textContent==='' && turn=== 1){
                    playerOne.setOccupied(index);
                    updateGameState(playerOne,index);
                }
                else if(boardCell.textContent===''&& turn=== 2){
                    playerTwo.setOccupied(index);
                    updateGameState(playerTwo, index);
                }
            })
            
            boardContainer.appendChild(boardCell);
        };
    };

    //move = index of move on board array
    const updateGameState = (player,move) =>{

        let first = boardContainer.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = boardContainer.firstElementChild; 
        } 

        if(player.getNumber()===1){
            gameState.splice(move, 1, 'X');
            turn = playerTwo.getNumber();
            playerOneLabel.removeAttribute('class','active');
            playerTwoLabel.setAttribute('class', 'active');
            checkGame(playerOne);
        }
        else{
            gameState.splice(move, 1, 'O');
            turn = playerOne.getNumber();
            playerTwoLabel.removeAttribute('class','active');
            playerOneLabel.setAttribute('class', 'active');
            checkGame(playerTwo);
        }
        renderBoard();
    }
    
    const checkGame = (player) =>{
        
        let playerArray = player.getOccupied();
        
        playerArray = playerArray.map(x => parseInt(x,10));
        let winningSets = [[0,1,2],
                           [3,4,5],
                           [6,7,8],
                           [0,3,6],
                           [1,4,7],
                           [2,5,8],
                           [0,4,8],
                           [2,4,6]]
        for(let i=0; i<winningSets.length; i++){
            
            if(playerArray.includes(winningSets[i][0]) &&
               playerArray.includes(winningSets[i][1]) &&
               playerArray.includes(winningSets[i][2])){
                 
                
                message.textContent = `Player ${player.getNumber()} Wins!`;
                message.setAttribute('id', 'win-message')
                lowerContainer.appendChild(message)
                
            } 
        }
    };
    

    const resetBoard = () => {
        let first = boardContainer.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = boardContainer.firstElementChild; 
        } 
        playerTwoLabel.removeAttribute('class','active');
        playerOneLabel.setAttribute('class', 'active');

        gameState = ['-','-','-','-','-','-','-','-','-'];
        turn = playerOne.getNumber();
        playerOne.setOccupied('reset');
        playerTwo.setOccupied('reset');
        lowerContainer.removeChild(message)
        playerOneCount=[];
        playerTwoCount=[];
        renderBoard();
    }

    return{
        renderBoard,
        resetBoard,
    };
})();

gameBoard.renderBoard();



