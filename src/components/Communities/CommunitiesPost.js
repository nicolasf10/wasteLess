import React from 'react';
import './CommunitiesFeed.css';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useAuth0 } from '@auth0/auth0-react';


function CommunitiesPost(props) {
    const { user } = useAuth0();

    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log("Product Image:")
    console.log(props.post.image.split("|")[1])

    return (
        <div className='individual-post'>
            {/* <h1 style={{color: 'red'}}>Post</h1> */}
            <div className='postUserArea'>
                <img src={props.post.image.split("|")[0]} className='userPicture' alt={user.name} />
                <h2 className='postUsername'>{jsUcfirst(user.name)}</h2>
                <RiCloseCircleLine style={{display: (user.sub === props.post.username ? 'inline-block' : 'none')}} onClick={() => props.onDelete(props.post.id)} className='delete-post-icon'/>
            </div>
            <div className='postContent'>
                <h2 className='postProduct'>Product: {jsUcfirst(props.post.product.split("|")[0])} | Quantity: {props.post.quantity}</h2>
                <h2 className='postContactInformation'>Contact Info: {props.post.product.split("|")[1]}</h2>
                <h2 className='postRequestType'>Type: {jsUcfirst(props.post.request_type)}</h2>
                <img src={props.post.image.split("|")[1]} alt={props.post.product} className='productImage' style={{display: (props.post.image.split("|")[1] !== '' ? 'block' : 'none')}}/>
            </div>
            {/* <p style={{color: 'pink'}}>{JSON.stringify(props)}</p> */}
        </div>
    )
}

export default CommunitiesPost
