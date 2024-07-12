// Define shapes
const SHAPES = [
    [
        [1, 0],
        [1, 1],
        [1, 1]
    ],
    [
        [2, 2, 2],
        [0, 0, 2],
        [0, 0, 2],
    ],
    [
        [3, 3],
        [0, 3],
        [3, 3]
    ],
    [
        [6, 0],
        [6, 0],
        [6, 0],
        [6, 6]
    ],
    [
        [0, 4],
        [4, 4],
        [0, 4],
        [0, 4]
    ],
    [
        [7, 7],
        [7, 7],
        [7, 7]
    ],
    [
        [5, 5, 0],
        [0, 5, 0],
        [0, 5, 5]
    ],
    [
        [8, 0],
        [8, 8],
        [0, 8],
        [0, 8]
    ]
]

// check if the shape fits into the grid
const fits = (grid, shape, row_start, col_start) => {
    // check if shape doesn't extend outside the border
    if (row_start + shape.length > grid.length || col_start + shape[0].length > grid[0].length) {
        return false
    }

    // check if shape overlaps with other shapes
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
            if (shape[i][j] !== 0 && grid[row_start + i][col_start + j] !== 0) {
                return false
            }
        }
    }

    return true
}

// insert the shape into the grid
const add_shape = (grid, shape, row_start, col_start) => {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
            if (shape[i][j] !== 0) {
                grid[row_start + i][col_start + j] = shape[i][j]
            }
        }
    }
}

// find the next 0 in grid
const findNextBlank = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                return [i, j]
            }
        }
    }

    // no more 0's in grid
    return [-1, -1]
}

// rotate the shape by 90 degrees
function rotate90(Shape) {

    var temp = new Array(Shape[0].length); // number of columns
    var i = 0;

    for (i = 0; i < temp.length; i++) {
        temp[i] = [];
    }

    for (i = 0; i < Shape.length; i++) {

        for (let j = 0; j < Shape[0].length; j++) {

            temp[j][i] = Shape[i][Shape[i].length - 1 - j];
        }
    }

    return temp;
}

// Populate "solutions" with all possible solutions recursively
const findSolutions = (solutions, grid, shapes, row_start, col_start) => {
    // base case if shapes are all exhausted
    if (shapes.length <= 0) {
        solutions.push(grid)
        return
    }

    // base case if iterating through the last row
    if (row_start >= 6) {
        return
    }

    // loop through all possible starting shapes including rotations
    shapes.map((shape, index) => {
        // test shape reflections
        for (let j = 0; j < 2; j++) {
            // test all the rotations of the shape
            for (let i = 0; i < 4; i++) {

                // Skip rotations for certain shapes due to duplicate rotations or reflections
                if (shape[0][0] === 7 && (i >= 2 || j >= 1)) {
                    continue
                }
                if (i >= 2 && shape[1][1] === 5) {
                    continue
                }
                if (j >= 1 && shape[0][0] === 3) {
                    continue
                }
                if (j >= 1 && (shape[0][0] === 2 || shape[0][shape[0].length - 1] === 2)) {
                    continue
                }

                // Skip rotations for the first shape if the first cell is 0
                if (row_start === 0 && col_start === 0 && shape[0][0] === 0) {
                    shape = rotate90(shape)
                    continue
                }

                var offset = 0

                if (shape[0][0] === 0 && shape[0][1] === 0) {
                    offset = 2
                } else if (shape[0][0] === 0) {
                    offset = 1
                }

                // Check if the shape fits in grid
                if (fits(grid, shape, row_start, col_start - offset)) {
                    // deep copy grid and shapes to sperate recursive calls
                    const deep_copy_grid = JSON.parse(JSON.stringify(grid))
                    const deep_copy_shapes = JSON.parse(JSON.stringify(shapes))

                    // add shape to grid
                    add_shape(deep_copy_grid, shape, row_start, col_start - offset)

                    // remove shape from shapes array
                    deep_copy_shapes.splice(index, 1)

                    var new_row_start = row_start
                    var new_col_start = col_start - offset

                    // find next blank cell
                    const next_blank = findNextBlank(deep_copy_grid)
                    new_row_start = next_blank[0]
                    new_col_start = next_blank[1]

                    // recursively call function
                    findSolutions(solutions, deep_copy_grid, deep_copy_shapes, new_row_start, new_col_start)
                }

                // rotate shape
                shape = rotate90(shape)
            }
            // reflect shape
            shape.map(function (arr) { return arr.reverse(); });
        }
        return null
    })
}

export {
    findNextBlank,
    findSolutions,
    SHAPES
}

