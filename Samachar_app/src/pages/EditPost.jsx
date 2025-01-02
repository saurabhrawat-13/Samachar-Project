import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../appWrite/databaseService';
import { BounceLoader } from 'react-spinners'

function EditPost() {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (slug) {
            databaseService.getSinglePost(slug).then((post) => {
                setPost(post)
                setLoader(false)
            })
        } else {
            navigate("/")
            setLoader(false)
        }

    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : <div className='p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
        <BounceLoader
            color={"rgba(9, 184, 80)"}
            loading={loader}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}

export default EditPost