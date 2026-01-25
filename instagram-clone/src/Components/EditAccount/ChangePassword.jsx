import React from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, useToast, Heading } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePasswordAction } from '../../Redux/User/Action'; // Import action vừa tạo

// Validation Schema
const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required("Confirm password is required")
});

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const handleSubmit = async (values, actions) => {
        const token = localStorage.getItem("token")
        const data = {
            jwt: token,
            data: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword}
        };

        const result = await dispatch(changePasswordAction(data));

        if (result.success) {
            toast({
                title: "Success",
                description: "Password changed successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/account/edit"); 
        } else {
            toast({
                title: "Error",
                description: result.message, 
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        actions.setSubmitting(false);
    };

    return (
        <div className='flex justify-center py-10'>
            <div className='w-full max-w-md p-6 border rounded-lg shadow-md bg-white'>
                <Heading as="h3" size="lg" className='text-center mb-6'>Change Password</Heading>
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => (
                        <Form className='space-y-4'>
                            <Field name="currentPassword">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.currentPassword && form.touched.currentPassword}>
                                        <FormLabel>Current Password</FormLabel>
                                        <Input {...field} type="password" placeholder="Enter current password" />
                                        <FormErrorMessage>{form.errors.currentPassword}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="newPassword">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                                        <FormLabel>New Password</FormLabel>
                                        <Input {...field} type="password" placeholder="Enter new password" />
                                        <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                          
                            <Field name="confirmPassword">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <Input {...field} type="password" placeholder="Confirm new password" />
                                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Button 
                                mt={4} 
                                colorScheme="blue" 
                                width="full" 
                                type="submit" 
                                isLoading={formikProps.isSubmitting}
                            >
                                Update Password
                            </Button>
                            
                            <Button 
                                variant="ghost" 
                                width="full" 
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ChangePassword;