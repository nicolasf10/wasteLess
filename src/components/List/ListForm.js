import React, { useState, useEffect, useRef } from 'react'

function ListForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            text: input
        });

        setInput('');
    }

    return (
        <form className='list-form' onSubmit={handleSubmit}>
            {props.edit ? (
            <>
            <input
                type='text'
                placeholder='Update item'
                value={input}
                name='text'
                className='item-input edit'
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='item-button edit'>Update</button>
            </>) : 
            (<>
            <input
                type='text'
                placeholder='Add item'
                value={input}
                name='text'
                className='item-input'
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='item-button'>Add item</button>
            </>)
            }

            
        </form>
    );
}

export default ListForm
