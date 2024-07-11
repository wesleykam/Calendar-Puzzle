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

const HARDCODED_SHAPE_GRID = [
    [1, 2, 2, 2, 3, 3],
    [1, 1, 6, 2, 0, 3],
    [1, 1, 6, 2, 3, 3, 4],
    [7, 7, 6, 5, 5, 4, 4],
    [7, 7, 6, 6, 5, 0, 4],
    [7, 7, 8, 8, 5, 5, 4],
    [8, 8, 8]
]

function Calendar() {
    return (
        <>
            <div className='calendar-container'>
                <div className='calendar'>
                    {
                        CALENDAR_DATA.map((row, rowIndex) => {
                            return <div key={'calendar-row-' + rowIndex} className='row'>
                                {
                                    row.map((cellValue, colIndex) => {
                                        return <div key={'calendar-col-' + colIndex} className='cell calendar-cell'>
                                            {cellValue}
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='shape-grid-container'>
                <div className='shape-grid'>
                    {
                        HARDCODED_SHAPE_GRID.map((row, rowIndex) => {
                            return <div key={'shapes-row-' + rowIndex} className='row'>
                                {
                                    row.map((cell, colIndex) => {
                                        return <div key={'shapes-col-' + colIndex} className={'cell shape-' + cell} />
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar
