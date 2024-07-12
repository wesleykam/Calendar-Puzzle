import React from 'react'

function rotateN90(a) {

    var temp = new Array(a[0].length); // number of columns
    var i = 0;

    for (i = 0; i < temp.length; i++) {
        temp[i] = [];
    }

    for (i = 0; i < a.length; i++) {

        for (let j = 0; j < a[0].length; j++) {

            temp[j][i] = a[i][a[i].length - 1 - j];
        }
    }

    return temp;
}

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

const NOV_20 = [
    [0, 0, 0, 0, 0, 0, -1],
    [0, 0, 0, 0, 9, 0, -1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, -1, -1, -1, -1],
]

const firstShape_grid = [
    [1, 0, 0, 0, 0, 0, -1],
    [1, 1, 0, 0, 9, 0, -1],
    [1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, -1, -1, -1, -1],
]

const secondShape_grid = [
    [1, 2, 2, 2, 0, 0, -1],
    [1, 1, 0, 2, 9, 0, -1],
    [1, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, -1, -1, -1, -1],
]

const solutions = []

const fits = (grid, shape, row_start, col_start) => {
    // console.log(grid)
    // console.log(shape)
    // console.log(row_start, col_start)

    // check if shape fits in the grid
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

const add_shape = (grid, shape, row_start, col_start) => {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
            if (shape[i][j] !== 0) {
                grid[row_start + i][col_start + j] = shape[i][j]
            }
        }
    }
}

const findNextBlank = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                return [i, j]
            }
        }
    }

    return [-1, -1]
}

const findSolutions = (solutions, grid, shapes, row_start, col_start) => {



    // return
    // console.log('shapes', shapes)
    // base case
    if (shapes.length <= 0) {
        solutions.push(grid)
        console.log(shapes)
        console.log(grid)
        console.log(solutions)
        return
    }

    if (row_start >= 6) {
        return
    }

    // loop through all possible starting shapes including rotations
    shapes.map((shape, index) => {

        // check if shape fits in the grid
        // check if shape overlaps with other shapes
        // test all the rotations of the shape
        for (let i = 0; i < 4; i++) {
            // Skip rotations for the first shape if the first cell is 0
            if (row_start === 0 && col_start === 0 && shape[0][0] === 0) {
                shape = rotateN90(shape)
                continue
            }
            
            // Skip rotations for certain shapes
            if ((shape[0][0] === 5 || shape[0][0] === 7) && i >= 2) {
                continue
            }

            // Check if the shape fits in grid
            if (fits(grid, shape, row_start, col_start)) {
                // deep copy grid and shapes to sperate recursive calls
                const deep_copy_grid = JSON.parse(JSON.stringify(grid))
                const deep_copy_shapes = JSON.parse(JSON.stringify(shapes))

                // add shape to grid
                add_shape(deep_copy_grid, shape, row_start, col_start)

                // remove shape from shapes array
                deep_copy_shapes.splice(index, 1)

                var new_row_start = row_start
                var new_col_start = col_start

                // find next blank cell
                const next_blank = findNextBlank(deep_copy_grid)
                new_row_start = next_blank[0]
                new_col_start = next_blank[1]

                if (new_col_start === 6) {
                    new_col_start -= 1
                }

                if (new_row_start === 6) {
                    new_row_start -= 1
                }

                // recursively call function
                findSolutions(solutions, deep_copy_grid, deep_copy_shapes, new_row_start, new_col_start)
            }

            // rotate shape
            shape = rotateN90(shape)
        }
    })
}


// const Algorithm = findSolutions(solutions, NOV_20, SHAPES, 0, 0)

export {
    firstShape_grid,
    secondShape_grid,
    findNextBlank,
    findSolutions,
    SHAPES
}

