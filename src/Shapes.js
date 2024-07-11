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
    [[
        [1, 0],
        [1, 1],
        [1, 1]
    ]],
    [[
        [2, 2, 2],
        [2, 0, 0],
        [2, 0, 0],
    ]],
    [[
        [3, 3],
        [3, 0],
        [3, 3]
    ]],
    [[
        [4, 0],
        [4, 0],
        [4, 4],
        [4, 0]
    ]],
    [[
        [5, 5, 0],
        [0, 5, 0],
        [0, 5, 5]
    ]],
    [[
        [6, 0],
        [6, 0],
        [6, 0],
        [6, 6]
    ]],
    [[
        [7, 7],
        [7, 7],
        [7, 7]
    ]],
    [[
        [8, 0],
        [8, 8],
        [0, 8],
        [0, 8],
        [0, 8]
    ]]
]

const shapeRotations = SHAPES.map(shape => {
    shape.push(rotateN90(shape[shape.length - 1]))
    shape.push(rotateN90(shape[shape.length - 1]))
    shape.push(rotateN90(shape[shape.length - 1]))
    return shape
})

export default shapeRotations
