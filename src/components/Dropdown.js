import React from 'react'

const Dropdown = ({ values, setState }) => {


    const handleOnChange = (e) => {
        setState(e.target.value)
    }

    return (
        <div className='months dropdown'>
            <select onChange={handleOnChange}>
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
