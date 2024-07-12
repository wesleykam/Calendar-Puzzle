import React, { useEffect, useMemo, useState } from 'react'

import Dropdown from './components/Dropdown'
import { findSolutions, findNextBlank, SHAPES } from './Algorithm'

const CALENDAR_DATA = [
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
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
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [solutionIndex, setSolutionIndex] = useState(0);


    // Block out the selected month and days for shapes to avoid
    const modify_date_position = (month, day) => {

        const BLANK_GRID = [
            [0, 0, 0, 0, 0, 0, -1],
            [0, 0, 0, 0, 0, 0, -1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, -1, -1, -1, -1],
        ]

        const month_row = Math.floor(month / 6);
        const month_col = month % 6;

        const date_row = Math.floor((day) / 7) + 2;
        const date_col = (day) % 7;

        // Set cells to 9 which is an unset Shape (no background)
        BLANK_GRID[month_row][month_col] = 9;
        BLANK_GRID[date_row][date_col] = 9

        return BLANK_GRID
    }

    const month_day_calendar = modify_date_position(month, day);

    // Generate solutions only when month and day change
    const solutions = useMemo(() => {
        const new_solutions = []

        const [row_start, col_start] = findNextBlank(month_day_calendar)
        findSolutions(new_solutions, month_day_calendar, SHAPES, row_start, col_start)

        return new_solutions
    }, [month_day_calendar]);

    // Generate new solution map when day and month change (new solutions are generated)
    const solutionMap = useMemo(() => {
        // Create a map of solutions for the drop-down
        const solMap = new Map();

        for(var i=0; i<solutions.length; i++) {
            solMap.set(i+1, i);
        }

        return solMap;

    }, [solutions.length])

    useEffect(() => {
        // Reset value in solution index drop-down
        document.getElementById('selected-solution').value = 0;
        // console.log(document.getElementById('selected-solution'))
    }, [day, month])

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
                            solutions[solutionIndex].map((row, row_index) => {
                                return <div key={'shapes-row-' + row_index} className='row'>
                                    {
                                        row.map((cell_val, col_index) => {
                                            return <div key={'shapes-row-col-'+row_index+'-'+col_index} className={'cell shape shape-'+cell_val} />
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='solution-count'>Solution Count: {solutions.length}</div>

            <div className='solution-selection'>
                <div className='solution-label'>Solution:</div>
                <Dropdown label='solution' values={solutionMap} setState={setSolutionIndex} />
            </div>

            <div className='month-day-selection'>
                <Dropdown label='month' values={MONTH_MAP} setState={setMonth} />
                <Dropdown label='day' values={DAY_MAP} setState={setDay} />
            </div>
        </>
    )
}

export default Calendar
