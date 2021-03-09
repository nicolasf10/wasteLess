import React from 'react';
import './CommunitiesList.css';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CommunityItem = (props) => {
    console.log(props)
    return (
        <div className='communityRow'>
            <Link style={{textDecoration: 'none'}} to={`/communities-posts/${props.id}`}>
                <h1 className='communityName'>{props.id}</h1>
            </Link>
            <div className='iconsCommunity'>
                <RiCloseCircleLine style={{display: 'inlineBlock'}} onClick={() => props.onDelete(props.id)} className='delete-icon'/>
            </div>
        </div>
    )
}

export default CommunityItem
