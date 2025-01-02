import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, RTE, SelectOption, Button } from "./index"
import databaseService from '../appWrite/databaseService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners'

function PostForm({ post }) {
    const [loader, setLoader] = useState(false)

    const { handleSubmit, register, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }

    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.authStore.userData)

    const submit = async (data) => {
        setLoader(true)
        if (post) {
            const image = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
            if (image) {
                databaseService.deleteFile(post.featuredImage)
            }

            const newPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: image ? image.$id : undefined
            }
            )

            if (newPost) {
                setLoader(false)
                navigate(`/post/${newPost.$id}`);
            }


        } else {

            const image = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
            if (image) {
                const fileId = image.$id
                data.featuredImage = fileId
                const newPost = await databaseService.createPost(
                    {
                        ...data,
                        userId: userData.$id
                    },
                )
                if (newPost) {
                    setLoader(false)
                    navigate(`/post/${newPost.$id}`);
                }

            }

        }
    }


    const slugTransForm = useCallback((value) => {
        if (value && typeof (value) === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, [])



    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransForm(value.title), { shouldValidate: true })
            }
            return () => subscription.unsubscribe();

        })
    }, [watch, slugTransForm, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 relative">

                {loader && <div className='absolute inset-0 items-center justify-center p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
                    <RingLoader
                        color={"rgba(9, 184, 80)"}
                        loading={loader}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>}

                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransForm(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />

            </div>

            <div className="w-1/3 px-2">
                <Input
                    type='file'
                    label="Featured Image :"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="mb-4"
                    {...register("image", { required: !post })}

                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <SelectOption
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}

                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
    )
}

export default PostForm


