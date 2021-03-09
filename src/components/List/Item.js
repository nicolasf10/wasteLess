import React, { useState } from 'react';
import ListForm from './ListForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { GiCookingPot } from 'react-icons/gi';

function Item({items, completeItem, removeItem, updateItem}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        findRecipe()
        updateItem(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    const findRecipe = (ingredient) => {
        const apiKey = 'e8e9caad08934b97b5019757a0647419'
        const recipe_url = 'https://api.spoonacular.com/recipes/search?apiKey=' + apiKey + '&number=1&query=' + ingredient

        try {
            fetch(recipe_url)
            .then(response => response.json())
            .then(data => {
                if (typeof data.results[0] === 'undefined') {
                    alert("I'm sorry. No recipe was found. :(")
                    return;
                }
                console.log(data)
                window.open(
                    data.results[0].sourceUrl, "_blank"); 
            })
        }
        catch(err) {
            alert("I'm sorry, but no recipe was found.")
        }
    }

    

    if (edit.id) {
        return <ListForm edit={edit} onSubmit={submitUpdate} />
    }

    return items.map((item, index) => (
        <div className={'item-row'} key={index}>
            <div key={item.id} onClick={() => completeItem(item.id)}>
                {item.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => removeItem({id: item.id, value: item.text})} className='delete-icon'/>
                <TiEdit onClick={() => setEdit({id: item.id, value:item.text})} className='text-icon'/>
                <GiCookingPot onClick={() => findRecipe(item.text)} className='recipe-icon icons' />
            </div>
        </div>
    ))
}

export default Item
