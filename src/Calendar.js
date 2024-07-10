import React from 'react'

const CALENDAR_DATA = [
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
]

// const BLANK_GRID = [
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0]
// ]

function Calendar() {
    return (
        <div className='calendar-container'>
            {
                CALENDAR_DATA.map((row, rowIndex) => {
                    return <div key={'row-' + rowIndex} className='row'>
                        {
                            row.map((cellValue, colIndex) => {
                                return <div key={colIndex} className='cell'>
                                    {cellValue}
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

export default Calendar
