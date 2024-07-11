import React, { useEffect, useState } from 'react'

import Dropdown from './components/Dropdown'

const CALENDAR_DATA = [
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
]



// const NOV_20_GRID = [
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 9, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 9, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0],
// ]

const HARDCODED_SHAPE_GRID = [
    [1, 2, 2, 2, 3, 3],
    [1, 1, 6, 2, 0, 3],
    [1, 1, 6, 2, 3, 3, 4],
    [7, 7, 6, 5, 5, 4, 4],
    [7, 7, 6, 6, 5, 0, 4],
    [7, 7, 8, 8, 5, 5, 4],
    [8, 8, 8]
]

const MONTH_MAP = new Map([
    ['Jan', 0],
    ['Feb', 1],
    ['Mar', 2],
    ['Apr', 3],
    ['May', 4],
    ['Jun', 5],
    ['Jul', 6],
    ['Aug', 7],
    ['Sep', 8],
    ['Oct', 9],
    ['Nov', 10],
    ['Dec', 11]
])

const DAY_MAP = new Map([
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
    [7, 6],
    [8, 7],
    [9, 8],
    [10, 9],
    [11, 10],
    [12, 11],
    [13, 12],
    [14, 13],
    [15, 14],
    [16, 15],
    [17, 16],
    [18, 17],
    [19, 18],
    [20, 19],
    [21, 20],
    [22, 21],
    [23, 22],
    [24, 23],
    [25, 24],
    [26, 25],
    [27, 26],
    [28, 27],
    [29, 28],
    [30, 29],
    [31, 30]
])

const Calendar = () => {
    // use memo to calcualte solutions

    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);


    const BLANK_GRID = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0],
    ]    

    // Block out the selected month and days for shapes to avoid
    const modify_date_position = (month, day) => {

        const blank = [...BLANK_GRID]

        const month_row = Math.floor(month / 6);
        const month_col = month % 6;

        const date_row = Math.floor((day) / 7) + 2;
        const date_col = (day) % 7;

        // Set cells to 9 which is an unset Shape (no background)
        blank[month_row][month_col] = 9;
        blank[date_row][date_col] = 9

        return blank
    }

    const month_day_calendar = modify_date_position(month, day);


    return (
        <>
            <div className='calendar-container'>
                <div className='calendar'>
                    {
                        CALENDAR_DATA.map((row, row_index) => {
                            return <div key={'calendar-row-' + row_index} className='row'>
                                {
                                    row.map((cell_val, col_index) => {
                                        return <div key={'calendar-col-' + col_index} className='cell calendar-cell'>
                                            {cell_val}
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className='shape-grid-container'>
                    <div className='shape-grid'>
                        {
                            month_day_calendar.map((row, row_index) => {
                                return <div key={'shapes-row-' + row_index} className='row'>
                                    {
                                        row.map((cell_val, col_index) => {
                                            return <div key={'shapes-col-' + col_index} className={'cell shape-' + cell_val} />
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='month-day-selection'>
                <Dropdown values={MONTH_MAP} setState={setMonth} />
                <Dropdown values={DAY_MAP} setState={setDay} />
            </div>
        </>
    )
}

export default Calendar
