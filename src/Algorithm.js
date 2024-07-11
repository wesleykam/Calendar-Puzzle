import React from 'react'

import shapeRotations from './Shapes'

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
        [2, 0, 0],
        [2, 0, 0],
    ],
    [
        [3, 3],
        [3, 0],
        [3, 3]
    ],
    [
        [4, 0],
        [4, 0],
        [4, 4],
        [4, 0]
    ],
    [
        [5, 5, 0],
        [0, 5, 0],
        [0, 5, 5]
    ],
    [
        [6, 0],
        [6, 0],
        [6, 0],
        [6, 6]
    ],
    [
        [7, 7],
        [7, 7],
        [7, 7]
    ],
    [
        [8, 0],
        [8, 8],
        [0, 8],
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

const findSolutions = (grid, shapes) => {
    // loop through all possible starting shapes including rotations

    // check if shape fits in the grid

    // check if shape overlaps with other shapes

    // if shape fits and does not overlap, add to the grid

    // remove shape from the array so it cannot be chosen again

    // recursively call function

    // if no shapes left, return grid
}


export default Algorithm
