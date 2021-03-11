import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect} from 'react';
import CommunitiesPost from './CommunitiesPost';
import './CommunitiesFeed.css';
import { RiCloseCircleLine } from 'react-icons/ri';

const CommunitiesFeed = (props) => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    const [posts, setPosts] = useState([])

    const [forceVar, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    /* form data states */
    const initialUpdateState = {product: '', quantity: '', request_type: 'asking', contactInformation: ''}
    const [formData, setFormData] = useState(initialUpdateState);

    const [displayPostForm, setDisplayPostForm] = useState(false)

    const gatherPosts = () => {
        const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
        const url = "http://127.0.0.1:5000/" + KEY + '/community/posts/'+ props.community_id + '/' + user.sub + '/0'
    
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

            var startPosts = []
    
            for (const value of res.data) {
                startPosts.push(value)
            }
    
            setPosts(startPosts)
        }));
    }

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect()
        }

        gatherPosts()
    }, [forceVar])

    const gatherImage = (product) => {
        const apiKey = 'a39a612f4e0d4fecbb8d1ffa2cb64c50'
        const recipe_url = 'https://api.spoonacular.com/food/ingredients/search?apiKey=' + apiKey + '&number=1&query=' + product

        try {
            fetch(recipe_url)
            .then(response => response.json())
            .then(data => {
                if (typeof data.results[0] === 'undefined') {
                    alert("No image was found for your product. Your post will not contain a picture.")
                    return('');
                }
                console.log(data)
                alert('Found image for your product!')
                console.log(`https://spoonacular.com/cdn/ingredients_500x500/${data.results[0].image}`)
                return(`https://spoonacular.com/cdn/ingredients_500x500/${data.results[0].image}`)
            })
        }
        catch(err) {
            alert("No image was found for your product. Your post will not contain a picture.")
            return('');
        }
    }

    var productImgUrl = ''

    const addPost = (event) => {
        event.preventDefault();

        setDisplayPostForm(false)

        console.log(formData)

        const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
        const url = "http://127.0.0.1:5000/" + KEY + '/community/posts/'+ props.community_id + '/' + user.sub + '/0'

        const apiKey = 'a39a612f4e0d4fecbb8d1ffa2cb64c50'
        const recipe_url = 'https://api.spoonacular.com/food/ingredients/search?apiKey=' + apiKey + '&number=1&query=' + formData.product

        fetch(recipe_url)
        .then(response => response.json())
        .then(data => {
            if (typeof data.results[0] === 'undefined') {
                alert("No image was found for your product. Your post will not contain a picture.")
            }
            console.log(`https://spoonacular.com/cdn/ingredients_500x500/${data.results[0].image}`)
            productImgUrl = `https://spoonacular.com/cdn/ingredients_500x500/${data.results[0].image}`
        }).then(_ => {
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            product: `${formData.product}|${formData.contactInformation}`,
            quantity: formData.quantity,
            image: `${user.picture}|${productImgUrl}`,
            request_type: formData.request_type,
            status: 'active'
          }),
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }).then(response => 
          response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
            forceUpdate()
        }));
        
        setFormData({product: '', quantity: '', request_type: 'asking', contactInformation: ''})
    })

    }

    const deletePost = (post_id) => {
        console.log("Deleting post...")

        const KEY = 'NJOBRDvlgJ1K4Z2BsA4JXyvVKdwW9ouV'
        const url = "http://127.0.0.1:5000/" + KEY + '/community/posts/'+ props.community_id + '/' + user.sub + '/' + post_id

        fetch(url, {
            method: 'DELETE',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }).then(response => (
              forceUpdate()
          ));
    }

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    console.log(props)

    return (
        <div className='full-feed'>
            <div className='top-feed'>
                <h1 className='feed-title'>{props.community_id} feed:</h1>
                <button className='addButtonCommunity' onClick={() => setDisplayPostForm(!displayPostForm)}>Add Post</button>
                <div style={{display: (displayPostForm ? 'block' : 'none')}} className='postForm'>
                    <h1 className='postFormTitle'>Create a post:</h1>
                    <RiCloseCircleLine onClick={() => setDisplayPostForm(!displayPostForm)} className='close-form-icon'/>
                    <form id='postForm' onSubmit={addPost}>
                        <div className='postFormInputContainer'>
                            <input required className='postFormInput' name='product' onChange={handleInputChange} value={formData.product} type='text' placeholder='Product' />
                        </div>
                        <div className='postFormInputContainer'>
                            <input requred className='postFormInput' name='quantity' onChange={handleInputChange} value={formData.quantity} type='text' placeholder='Quantity' />
                        </div>
                        <div className='postFormInputContainer'>
                            <input required className='postFormInput' name='contactInformation' onChange={handleInputChange} value={formData.contactInformation} type='text' placeholder='Contact or pick-up note' />
                        </div>
                        <br></br>
                        <div className='postFormInputContainer'>
                            <select className='postFormSelect' name='request_type' onChange={handleInputChange} value={formData.request_type}>
                                <option value='asking' defaultValue>Asking</option>
                                <option value='giving'>Giving</option>
                            </select>
                        </div>
                        <br></br>
                        <div className='postFormInputContainer'>
                            <button className='postFormSubmit' >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='all-posts'>
                {posts.map(post => 
                    <CommunitiesPost key={post.id} onDelete={deletePost} post={post}/>
                )}
            </div>
        </div>
    )
}

export default CommunitiesFeed
