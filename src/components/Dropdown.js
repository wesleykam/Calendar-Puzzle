import React from 'react'

const Dropdown = ({ label, values, setState }) => {


    const handleOnChange = (e) => {
        setState(e.target.value)
    }

    return (
        <div id={label} className='dropdown'>
            <select id={'selected-'+label} onChange={handleOnChange}>
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
