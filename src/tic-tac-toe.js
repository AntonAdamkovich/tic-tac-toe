class TicTacToe {
    constructor() {
        this._gameField = this.createGameField(3);
        this._firstPlayerSymbol = "x";
        this._secondPlayerSymbol = "o";
        this._firstPlayerMove = true;
        //this._winner = null;
    }

    getCurrentPlayerSymbol() {
        return this._firstPlayerMove ? this._firstPlayerSymbol : this._secondPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if(!this._gameField[rowIndex][columnIndex]){
            this._gameField[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this._firstPlayerMove = !this._firstPlayerMove;
        }
    }

    isFinished() {
        return this.getWinner() || this.noMoreTurns() ? true : false;
    }

    getWinner() {
        var gameSize = this._gameField.length,
        fieldsMiddle = Math.floor(this._gameField.length / 2),
        middleSymbol = this._gameField[fieldsMiddle][fieldsMiddle],
        symbolForCompare,
        symbolRowCounter,
        symbolColCounter,
        leftDiagonalCounter = 0,
        rightDiagonalCounter = 0,
        winner;

        //going throuht game field
        for(var i = 0; i < gameSize; i++){
            symbolForCompare = this._gameField[i][i];
            symbolRowCounter = 0;
            symbolColCounter = 0;

            //going throut rows and columns to check
            for(var j = 0; j < gameSize; j++){
                //count how much symbols in row
                if(this._gameField[i][j] === symbolForCompare){
                    symbolRowCounter++
                }
                //count how much symbols in column
                if(this._gameField[j][i] === symbolForCompare){
                    symbolColCounter++;
                }
            }
            //check column or a row for 3 same symbols
            if(symbolRowCounter == gameSize || symbolColCounter == gameSize){
                winner = symbolForCompare;
            }
            //check left diagonal
            if(this._gameField[i][i] === middleSymbol){
                leftDiagonalCounter++;
            }
            //check right diagonal
            if(this._gameField[i][gameSize - i - 1] === middleSymbol){
                rightDiagonalCounter++;
            }

        }
        //check diagonals for 3 same symbols
        if(leftDiagonalCounter == gameSize || rightDiagonalCounter == gameSize){
            winner = winner || middleSymbol;
        }

        return winner || null;
    }

    noMoreTurns() {
        var symbolsCount = 0,
        maxSymbolsCount = Math.pow(this._gameField.length, 2);

        for(var i = 0; i < this._gameField.length; i++){
            for(var j = 0; j < this._gameField[i].length; j++){
                if(this._gameField[i][j]){
                    symbolsCount++;
                }
            }
        }
        return symbolsCount == maxSymbolsCount;
    }

    isDraw() {
        return !this.getWinner() && this.noMoreTurns();
    }

    getFieldValue(rowIndex, colIndex) {
        return this._gameField[rowIndex][colIndex] || null;
    }

    createGameField(size){
        var result = [],
        row;

        for(var i = 0; i < size; i++){
            row = [];
            /*for(var j = 0; j < size; j++){
              row.push(null);
            }*/
            result.push(row);
        }
        return result;
    }
}

module.exports = TicTacToe;
