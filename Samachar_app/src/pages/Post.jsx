import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appWrite/databaseService"
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { BounceLoader } from 'react-spinners'

export default function Post() {
    const [post, setPost] = useState(null);
    console.log(post)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.authStore.userData);
    //console.log(userData?.$id)
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(isAuthor)
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (slug) {
            databaseService.getSinglePost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoader(false)
                }
                else {
                    navigate("/");
                    setLoader(false)
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoader(true)
        databaseService.deletPost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage);
                setLoader(false)
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
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