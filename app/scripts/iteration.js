const iteration = (function () {
    const [LIVE, DEAD] = [1, 0];

    function iteration(matrix) {
        const nextMatrix = [];

        for (let row = 0; row < matrix.length; ++row) {
            nextMatrix.push([]);
            for (let col = 0; col < matrix[row].length; ++col) {
                const neighboursCount = countNeighbours(matrix, row, col);

                if (neighboursCount === 3 || (neighboursCount === 2 && matrix[row][col] === LIVE)) {
                    nextMatrix[row][col] = LIVE;
                } else {
                    nextMatrix[row][col] = DEAD;
                }
            }
        }

        return nextMatrix;
    }

    function countNeighbours(matrix, row, col) {
        let count = 0;

        // Upper-left cell
        if (isInBounds(matrix, row - 1, col - 1) && matrix[row - 1][col - 1] === LIVE) {
            count++;
        }
        // Upper cell
        if (isInBounds(matrix, row - 1, col) && matrix[row - 1][col] === LIVE) {
            count++;
        }
        // Upper-right cell
        if (isInBounds(matrix, row - 1, col + 1) && matrix[row - 1][col + 1] === LIVE) {
            count++;
        }
        // Right cell
        if (isInBounds(matrix, row, col + 1) && matrix[row][col + 1] === LIVE) {
            count++;
        }
        // Right-bottom cell
        if (isInBounds(matrix, row + 1, col + 1) && matrix[row + 1][col + 1] === LIVE) {
            count++;
        }
        // Bottom cell
        if (isInBounds(matrix, row + 1, col) && matrix[row + 1][col] === LIVE) {
            count++;
        }
        // Bottom-left cell
        if (isInBounds(matrix, row + 1, col - 1) && matrix[row + 1][col - 1] === LIVE) {
            count++;
        }
        // Left cell
        if (isInBounds(matrix, row, col - 1) && matrix[row][col - 1] === LIVE) {
            count++;
        }

        return count;
    }

    function isInBounds(matrix, i, j) {
        return (i >= 0 && i < matrix.length) && (j >= 0 && j < matrix[i].length);
    }

    Object.defineProperty(iteration, 'LIVE', {
        configurable: false,
        writable: false,
        value: LIVE
    });
    Object.defineProperty(iteration, 'DEAD', {
        configurable: false,
        writable: false,
        value: DEAD
    });

    return iteration;
})();
