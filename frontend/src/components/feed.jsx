import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './masonryLayout'
import Spinner from './spinner'

const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        if(categoryId){
            const query = searchQuery(categoryId)
            client.fetch(query).then((data) => {
                setPins(data); 
                setLoading(false);
            })
        }else{
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            })
        }
    }, [categoryId]);
    
    console.log("pins", pins);

    if(loading) return <Spinner message="we are adding new ideas to your feed!" />
    
    return (
        <div>
            <MasonryLayout pins={pins} />
        </div>
    );
}

export default Feed;
