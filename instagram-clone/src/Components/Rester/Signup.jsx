import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { signupAction } from '../../Redux/Auth/Action'
import { useEffect } from 'react'
import { getUserProfileAction } from '../../Redux/User/Action'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email adress").required("email is equired"),
       username: Yup.string()
        .required("Username is required"),

    fullname: Yup.string()
        .required("Full name is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("password is required")
})
const Signup = () => {
    const initialValues = { email: "", username: "", fullname: "", password: "" }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  auth = useSelector(store => store.auth)
    const toast = useToast();

    const handleNavigate = () => navigate("/login")

    const handleSubmit = (values, action) => {
        console.log("values: ", values)
        dispatch(signupAction(values))
        action.setSubmitting(false);

    };

    useEffect(() => {
        if (auth.signup?.username) {
            
            toast({
                title:  `Account created. ${auth.signup.username}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            navigate("/login")
        }

    }, [auth.signup])

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

                                <Field name="username">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.username && form.touched.username
                                        }>
                                            <Input
                                                className='w-full'
                                                {...field}
                                                id="username"
                                                placeholder='Username'>
                                            </Input>
                                            <FormErrorMessage>
                                                {form.errors.username}
                                            </FormErrorMessage>

                                        </FormControl>)}
                                </Field>

                                <Field name="fullname">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.fullname && form.touched.fullname
                                        }>
                                            <Input
                                                className='w-full'
                                                {...field}
                                                id="fullname"
                                                placeholder='Full name'>
                                            </Input>
                                            <FormErrorMessage>
                                                {form.errors.fullname}
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
                                                id="password"
                                                type="password"
                                                placeholder='Password'>
                                            </Input>
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>

                                        </FormControl>)}
                                </Field>
                                <p className='text-center text-sm'>People who use our service may have uploaded your contact information to Instagram. <span className='text-blue-600'>Learn more</span></p>
                                <p className='text-center text-sm'>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                                <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formikProps.isSubmitting}>
                                    Sign Up
                                </Button>

                            </Form>}

                    </Formik>
                </Box>
            </div>
            <div className='border w-full border-slate-300 mt-5'>
                <p className='text-center py-2 font-semibold'>Have an account? <span onClick={handleNavigate} className='ml-2  text-blue-800 cursor-pointer'>Login</span></p>
            </div>
        </div>
    )
}

export default Signup