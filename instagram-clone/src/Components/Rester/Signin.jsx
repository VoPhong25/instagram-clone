import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { loginAction } from '../../Redux/Auth/Action';
import { useEffect } from 'react';
import { getUserProfileAction } from '../../Redux/User/Action';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email adress").required("email is equired"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("password is required")
})

const Singin = () => {
    const initialValues = { email: "", password: "" };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  user  = useSelector(store => store.user)
    const error = useSelector(store=>store.auth.error)
    const jwt = localStorage.getItem("token");

    const handleSubmit = (values, action) => {
        dispatch(loginAction(values))
        action.setSubmitting(false);
    }
    useEffect(() => {
        if (jwt)
            dispatch(getUserProfileAction(jwt))

    }, [jwt])

    useEffect(() => {
        if (!user.reqUser) return;
        if (user.reqUser?.username) {
            navigate(`/${user.reqUser?.username}`)
        }
    }, [jwt, user.reqUser])

    const handleNavigate = () => navigate("/signup")
    const handleForgotPassword = () => navigate("/forgotpassword")
    return (
        <div>
            <div className='border'>
                <Box
                    p={8}
                    display={'flex'}
                    flexDirection={"column"}
                    alignItems={'center'}>
                    <img
                        className='mb-3'
                        src="https://i.imgur.com/zqpwkLQ.png" alt="" />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps) =>
                            <Form className='space-y-3.5'>
                                {error && (
                                    <div className="w-full p-2 mb-2 text-sm text-center text-red-600">
                                        {error}
                                    </div>
                                )}
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email
                                        }>
                                            <Input
                                                className='w-full'
                                                {...field}
                                                id="email"
                                                placeholder='Mobile number or email'>
                                            </Input>
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>

                                        </FormControl>)}
                                </Field>

                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password
                                        }>
                                            <Input
                                                className='w-full'
                                                {...field}
                                                type="password"
                                                id="password"
                                                placeholder='Password'>
                                            </Input>
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>

                                        </FormControl>)}
                                </Field>
                                <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formikProps.isSubmitting}>
                                    Log in
                                </Button>

                            </Form>}

                    </Formik>
                </Box>
            </div>
            <div className=' mt-5'>
                <p className='text-center py-2 font-semibold cursor-pointer' onClick={handleForgotPassword}>Forgotten your password? </p>
            </div>
            <div className='border w-full border-slate-300 mt-5'>
                <p className='text-center py-2 font-semibold'>Don't have an account? <span onClick={handleNavigate} className='ml-2  text-blue-800 cursor-pointer'>Sign Up</span></p>
            </div>
        </div>
    )
}

export default Singin