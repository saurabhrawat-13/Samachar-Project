import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appWrite/authService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Logo, Input, Button } from '../components/index';
import { useForm } from 'react-hook-form';
import { RingLoader } from 'react-spinners'

function SignIn() {
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const create = async (data) => {
        try {
            setLoader(true)
            setError("")
            const response = await authService.createAccount(data);
            if (response) {
                const data = authService.getCurrentUser();
                dispatch(login(data))
                setLoader(false)
                navigate('/')
            }

        } catch (error) {
            setLoader(false)
            setError(error.message)

        }

    }
    return (
        <div className="relative flex items-center justify-center">
            {loader && <div className='absolute inset-0 items-center justify-center p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
                <RingLoader
                    color={"rgba(9, 184, 80)"}
                    loading={loader}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>}
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" color={true} />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignIn