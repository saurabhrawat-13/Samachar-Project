
import React, { useEffect, useState } from 'react'
import databaseService from "../appWrite/databaseService";
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners'

function Home() {
    const [posts, setPosts] = useState([])
    const isLogin = useSelector((state) => state.authStore.isLogin)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            databaseService.getALLPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    setLoading(false)
                }
                else{
                    setLoading(false)
                }
            })

        }else{
            setLoading(false)
            setPosts([])
        }
       

    }, [isLogin, navigate])

    if (loading) {
        return (<div className='p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
            <BounceLoader
                color={"rgba(9, 184, 80)"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>)

    } else if (posts.length === 0 && !isLogin) {

        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
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

export default Home

