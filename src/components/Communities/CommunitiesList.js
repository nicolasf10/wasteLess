import React, { useState, useEffect } from 'react';
import './CommunitiesList.css';
import { useAuth0 } from '@auth0/auth0-react';
import CommunityItem from './CommunityItem';

const CommunitiesList = () => {
    const { user, isAuthenticated } = useAuth0();

    const [input, setInput] = useState('');

    const [communities, setCommunities] = useState([]);

    const [forceVar, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [displayNew, setDisplayNew] = useState(false);

    
    
    useEffect(() => {
        if (isAuthenticated) {
          const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
          const url = "http://127.0.0.1:5000/" + KEY + '/community/member/0/' + user.sub
    
          fetch(url, {
            method: 'GET'
          }).then(response => 
            response.json().then(data => ({
                data: data,
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                status: response.status
            })
        ).then(res => {
            console.log(res.status, res.data)

            var startCommunities = []
    
            for (const value of res.data) {
                startCommunities.push({id: value.id, community_id: value.community_id, username: value.username})
            }
    
            setCommunities(startCommunities)
        }));
        }
      }, [forceVar]);

      const handleChange = e => {
        setInput(e.target.value)
      }

      const addCommunity = (event) => {
        event.preventDefault();
        console.log(input)

        if (input === '') {
            return;
        }

        const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'

        const url = "http://127.0.0.1:5000/" + KEY + '/community/create/' + input

        console.log("Seeing if community exists.")
        fetch(url, {
            method: 'GET'
          }).then(response => 
            response.json().then(data => ({
                data: data,
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                status: response.status
            })
        ).then(res => {
            console.log(res.status, res.data)
    
            if (res.status === 200) {
                console.log("Adding you new community.")
                alert("Adding you to this community!")
                
                const url = "http://127.0.0.1:5000/" + KEY + '/community/member/' + input + '/' + user.sub

                fetch(url, {
                    method: 'PUT',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                       },
                }).then(response => 
                    response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    console.log(res.status, res.data)
                    forceUpdate()
                }));
            } else {
                console.log("Creating new community.")
                const newCommunityName = prompt('New community name:');

                if (newCommunityName === null) {
                    return;
                }
                console.log(input)
                const url = "http://127.0.0.1:5000/" + KEY + '/community/create/' + input
                
                console.log("Making PUT request to create community")
                fetch(url, {
                    method: 'PUT',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                       },
                    status: response.status,
                    body: JSON.stringify({name: newCommunityName, admin: user.sub})
                }).then(response => 
                    response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    console.log(res.status, res.data)

                    const url = "http://127.0.0.1:5000/" + KEY + '/community/member/' + input + '/' + user.sub

                    fetch(url, {
                        method: 'PUT',
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                           },
                        status: response.status
                    }).then(response => 
                        response.json().then(data => ({
                            data: data,
                            status: response.status
                        })
                    ).then(res => {
                        console.log(res.status, res.data)
                        forceUpdate()
                    }));
                }));
            }
        }));
        forceUpdate()
        setInput('');
      }

    const deleteCommunity = (community_id) => {
        console.log(community_id)
        const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
        const url = "http://127.0.0.1:5000/" + KEY + '/community/member/' + community_id + '/' + user.sub

        fetch(url, {
            method: 'DELETE',
            //make sure to serialize your JSON body
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }).then(
            forceUpdate()
        );

    }

    return (
        <div className='communitiesList'>
            <h1 className='communitiesListTitle'>Your communities:</h1>
            <div style={{display: (displayNew ? 'block' : 'none')}} className='communityFormContainer'>
                <button onClick={() => setDisplayNew(!displayNew)} className='closeAddCommunity'>-</button>
                <form id="communityForm" className='communityForm' onSubmit={addCommunity}>
                    <h2 className='communityFormTitle'>Community Id:</h2>
                    <div className='communityFormControls'>
                        <input className='communityFormInput' onChange={handleChange} value={input} type="text" placeholder="Community username" />
                        <button className='communityFormSubmit'>Submit</button>
                    </div>
                </form>
            </div>
            <div className='containerList'>
                <button onClick={() => setDisplayNew(!displayNew)} className='addCommunity'>+</button>
                {communities.map(community => (
                    <div key={community.community_id} className='communityItem'>
                        <CommunityItem onDelete={deleteCommunity} id={community.community_id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommunitiesList
