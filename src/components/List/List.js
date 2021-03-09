import React, { useState, useEffect } from 'react';
import Item from './Item';
import ListForm from './ListForm';
import { useAuth0 } from '@auth0/auth0-react';

function List(props) {
  const [items, setItems] = useState([]);
  const [createdItem, setCreatedItem] = useState([]);
  const [deletedItem, setDeletedItem] = useState([]);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
      const url = "http://127.0.0.1:5000/" + KEY + '/user/' + props.type + '/' + user.sub + '/0'

      fetch(url, {
        method: 'GET'
      }).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        console.log(res.status, res.data)

        var startItems = []

        for (const value of res.data) {
          startItems.push({id: value.id, text: value.product})
        }

        setItems(startItems)
    }));
    }
  }, [createdItem, deletedItem]);

  const addItem = item => {
    if (!item.text || /ˆ\s*$/.test(item.text)) {
      return;
    }

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
    const url = "http://127.0.0.1:5000/" + KEY + '/user/' + props.type + '/' + user.sub + '/0'
    console.log(url)
      fetch(url, {
        method: 'PUT',
        //make sure to serialize your JSON body
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({product: item.text, date: date})
      }).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            console.log(res.data)
            const newItems = [{id: res.data.id, text:item.txt}, ...items]
            setCreatedItem({id: res.data.id, text:item.txt})
            setItems(newItems);
        }));
      };

  const updateItem = (itemId, newValue) => {
    if (!newValue.text || /ˆ\s*$/.test(newValue.text)) {
      return;
    }

    const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
    const url = "http://127.0.0.1:5000/" + KEY + '/user/' + props.type + '/' + user.sub + '/' + itemId

    fetch(url, {
      method: 'PATCH',
      //make sure to serialize your JSON body
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({product: newValue.text})
    }).then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
      ));

    setItems(prev => prev.map(listItem => (listItem.id === itemId ? newValue : listItem)))
  }

  const removeItem = item => {
    const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
    const url = "http://127.0.0.1:5000/" + KEY + '/user/' + props.type + '/' + user.sub + '/' + item.id

    fetch(url, {
        method: 'DELETE',
        //make sure to serialize your JSON body
        headers: { 'Content-Type': 'application/json' }
      }).then(
        console.log(item.id)
      ).then(response => 
          setDeletedItem(item.id)
        );

    if (props.type === 'list') {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
      const url = "http://127.0.0.1:5000/" + KEY + '/user/' + 'inventory' + '/' + user.sub + '/0'
      console.log(url)
        fetch(url, {
          method: 'PUT',
          //make sure to serialize your JSON body
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({product: item.value, date: date})
        }).then(response => 
          response.json().then(data => {
            props.refresh();
          }
          ));
      };
  }

  return (
    <>
      <h1>{props.title}</h1>
      <ListForm onSubmit={addItem} />
      <Item 
        items={items}
        // completeItem={completeItem}
        removeItem={removeItem}
        updateItem={updateItem}
      />
    </>
  )
}

export default List