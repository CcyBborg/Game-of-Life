const initGame = (function() {
    const LIVE_CLASS = 'live-cell';
    const grid = document.createElement('tbody');
    let matrix = [];
    const DEAD_MATRIX = [];
    let timerId = null;
    let stepCount = 0;

    function init({
        rowsLength,
        colsLength,
        container,
        playButton,
        resetButton,
        label
    }) {
        updateStepCount(0);
        for (let row = 0; row < rowsLength; row++) {
            DEAD_MATRIX.push([]);
            matrix.push([]);
            const rowElement = document.createElement('tr');
            for (let col = 0; col < colsLength; col++) {
                const colElement = document.createElement('td');
                [colElement.dataset.row, colElement.dataset.col] = [row, col];
                rowElement.append(colElement);
                DEAD_MATRIX[row][col] = iteration.DEAD;
                matrix[row][col] = iteration.DEAD;
            }
            grid.append(rowElement);
        }
    
        grid.addEventListener('click', function ({ target }) {
            if (target.tagName === 'TD') {
                const [row, col] = [Number(target.dataset.row), Number(target.dataset.col)];
                if (matrix[row][col] === iteration.LIVE) {
                    target.classList.remove(LIVE_CLASS);
                    matrix[row][col] = iteration.DEAD;
                } else {
                    target.classList.add(LIVE_CLASS);
                    matrix[row][col] = iteration.LIVE;
                }
            }
        });

        playButton.addEventListener('click', function () {
            if (timerId) {
                pauseGame();
            } else {
                startGame();
            }
        });

        resetButton.addEventListener('click', function() {
            pauseGame();
            matrix = DEAD_MATRIX.map(e => e.map(e => e));
            mapMatrixToGrid(matrix, grid);
            updateStepCount(0);
        });

        function updateStepCount(value) {
            stepCount = value;
            label.innerText = stepCount;
        }

        function startGame() {
            timerId = setInterval(() => {
                updateStepCount(stepCount + 1);
                nextIteration();
            }, 500);
            playButton.classList.add('pause');
        }

        function pauseGame() {
            clearInterval(timerId);
            timerId = null;
            playButton.classList.remove('pause');
        }

        function nextIteration() {
            matrix = iteration(matrix);
            mapMatrixToGrid(matrix, grid);
        }

        container.append(grid);
    }
    
    function mapMatrixToGrid(matrix, grid) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === iteration.LIVE) {
                    getGridCell(grid, row, col).classList.add(LIVE_CLASS);
                } else {
                    getGridCell(grid, row, col).classList.remove(LIVE_CLASS);
                }
            }
        }
    }
    
    function getGridCell(grid, row, col) {
        return grid.rows[row].cells[col];
    }
    
    return init;
})();