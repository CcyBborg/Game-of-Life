const initGame = (function() {
    const GRID_COLS = 65;
    const GRID_ROWS = 30;
    const LIVE_CLASS = 'live-cell';

    const grid = document.createElement('tbody');

    let matrix;

    function init({
        container,
        playButton
    }) {
        matrix = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            matrix.push([]);
            const rowElement = document.createElement('tr');
            for (let col = 0; col < GRID_COLS; col++) {
                const colElement = document.createElement('td');
                colElement.dataset.row = row;
                colElement.dataset.col = col;
                rowElement.append(colElement);
                matrix[row][col] = iteration.DEAD;
            }
            grid.append(rowElement);
        }
        container.append(grid);

        grid.addEventListener('click', function (event) {
            if (event.target.tagName === 'TD') {
                const [row, col] = [Number(event.target.dataset.row), Number(event.target.dataset.col)];
                if (matrix[row][col] === iteration.LIVE) {
                    event.target.classList.remove(LIVE_CLASS);
                    matrix[row][col] = iteration.DEAD;
                } else {
                    event.target.classList.add(LIVE_CLASS);
                    matrix[row][col] = iteration.LIVE;
                }
            }
        });

        playButton.addEventListener('click', function() {
            const timerId = setInterval(nextIteration, 500);
        });
    }

    function nextIteration() {
        matrix = iteration(matrix);
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                if (matrix[row][col] === iteration.LIVE) {
                    grid.rows[row].cells[col].classList.add(LIVE_CLASS);
                } else {
                    grid.rows[row].cells[col].classList.remove(LIVE_CLASS);
                }
            }
        }
    }

    return init;
})();
