import React, { useEffect, useState } from 'react'
import databaseService from '../appWrite/databaseService';
import { Container, PostCard } from "../components/index"
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners'

function AllPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        databaseService.getALLPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [navigate])

    if (loading) {
        return(
        <div className='p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
            <BounceLoader
                color={"rgba(9, 184, 80)"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>)

    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap columns-4'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 sm:w-full md:w-1/2 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )

    }

}

export default AllPosts