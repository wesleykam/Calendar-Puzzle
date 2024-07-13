import React from 'react'

const Dropdown = ({ label, values, setState, setSolutionIndex }) => {

    // Change states when dropdown selection changes
    const handleOnChange = (e) => {
        setState(e.target.value)

        // Set the solution index back to 0 when month or day change to avoid out of index
        if (label === 'month' || label === 'day') {
            document.getElementById('selected-solution').value = 0
            setSolutionIndex(0)
        }
    }

    return (
        <div id={label} className='dropdown'>
            <select id={'selected-' + label} onChange={handleOnChange}>
                {
                    Array.from(values.entries()).map((sets, index) => {
                        return <option key={index}
                            value={sets[1]}>{sets[0]}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Dropdown
