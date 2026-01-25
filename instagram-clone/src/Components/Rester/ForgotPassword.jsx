import { Box, Button, FormControl, FormErrorMessage, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { resetPasswordWithCodeAction, sendVerificationCodeAction } from '../../Redux/Auth/Action';

const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
})

const codeSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
})

const ForgotPassword = () => {
    const [step, setStep] = useState(1); 
    const [savedEmail, setSavedEmail] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleSendCode = async (values, actions) => {
    
        const isSuccess = await dispatch(sendVerificationCodeAction(values.email));
        
        if (isSuccess) { 
            setSavedEmail(values.email);
            setStep(2); 
            toast({ title: "Verification code sent!", status: "success", duration: 7000 });
        } else {
            toast({ title: "Email not found or error", status: "error", duration: 7000 });
        }
        actions.setSubmitting(false);
    };

    const handleVerifyAndReset = async (values, actions) => {
        const data = {
            email: savedEmail,
            code: values.code 
        };

        const isSuccess = await dispatch(resetPasswordWithCodeAction(data));

        if (isSuccess) {
            toast({
                title: "Success!",
                description: "New password sent to your email. Please login.",
                status: "success",
                duration: 7000,
                isClosable: true
            });
    
            navigate("/login");
        } else {
            toast({
                title: "Failed",
                description: "Invalid verification code.",
                status: "error",
                duration: 7000
            });
            actions.setFieldError('code', 'Invalid code');
        }
        actions.setSubmitting(false);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='border w-full max-w-md p-8 bg-white rounded-xl shadow-lg'>
                <Box display={'flex'} flexDirection={"column"} alignItems={'center'}>
                    <Text fontSize="2xl" mb={4} fontWeight="bold" color="blue.600">
                        {step === 1 ? "Forgot Password" : "Verify Code"}
                    </Text>

                    {step === 2 && (
                        <Text fontSize="sm" mb={4} textAlign="center" color="gray.600">
                            We have sent a code to <b>{savedEmail}</b>.<br/>
                            Enter it below to receive a new password.
                        </Text>
                    )}

                    <Formik
                        initialValues={step === 1 ? { email: "" } : { code: "" }}
                        validationSchema={step === 1 ? emailSchema : codeSchema}
                        onSubmit={step === 1 ? handleSendCode : handleVerifyAndReset}
                    >
                        {(formikProps) => (
                            <Form className='w-full space-y-4'>
                                <VStack spacing={4}>
                                    {step === 1 && (
                                        <Field name="email">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <Input {...field} placeholder='Enter your email' />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    )}
                                    {step === 2 && (
                                        <Field name="code">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.code && form.touched.code}>
                                                    <Input 
                                                        {...field} 
                                                        placeholder='Enter Verification Code' 
                                                        textAlign="center" 
                                                        letterSpacing="2px"
                                                    />
                                                    <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    )}

                                    <Button 
                                        width="full" 
                                        colorScheme='blue' 
                                        type='submit' 
                                        isLoading={formikProps.isSubmitting}
                                    >
                                        {step === 1 ? "Send Code" : "Confirm & Get New Password"}
                                    </Button>

                                    {step === 2 && (
                                        <Button variant="link" size="sm" onClick={() => setStep(1)}>
                                            Change Email
                                        </Button>
                                    )}
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </div>
        </div>
    )
}

export default ForgotPassword