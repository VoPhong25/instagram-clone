import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction, getUserProfileAction, removeAvtUserAction } from '../../Redux/User/Action';

import ChangeProfilePhotoModal from './ChangeProfilePhotoModal';
import { uploadToCloudinary } from '../../Config/UploadToCloudinary';
import { useNavigate } from 'react-router-dom';

const EditAccountDetails = () => {
  const user = useSelector(store => store.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
  });
  useEffect(() => {
    if (!token) return;
    dispatch(getUserProfileAction(token))
  }, [token]);


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, },

      }
      dispatch(editUserAction(data))
      toast({
        title: "Account updated...",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  })

  useEffect(() => {
    if (user.reqUser) {
      setInitialValues({
        fullname: user.reqUser.fullname || "",
        username: user.reqUser.username || "",
        email: user.reqUser.email || "",
        bio: user.reqUser.bio || "",
        mobile: user.reqUser.mobile || "",
        gender: user.reqUser.gender || "",
        website: user.reqUser.website || "",
      });
    }
  }, [user.reqUser]);


  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image)
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    }
    dispatch(editUserAction(data))
    onClose();
  }
  async function handleRemovePhoto() {
    setImageFile(null);
    dispatch(removeAvtUserAction(token))
    onClose();
  }
  const handleChangePassword = () => {
    navigate("/account/change-password")
  }


  return (
    <div className=' rounded-md p-10 px-32'>
      <div className="flex items-center gap-6 mb-10 mt-10">
        <div className='w-[12%]'>        <img
          className="w-12 h-12 rounded-full object-cover"
          src={imageFile || user.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
          alt=""
        /></div>

        <div className=''>
          <p className="font-semibold text-sm">{user.reqUser?.username}</p>
          <p
            onClick={onOpen}
            className="text-sm text-blue-500 font-semibold cursor-pointer"
          >
            Change Profile Photo
          </p>
        </div>
        <button
          onClick={handleChangePassword}
          className="w-fit py-2 px-4 border-6 border-gray-300 text-gray-700 bg-white hover:bg-gray-200 font-medium rounded-md transition duration-200 cursor-pointer"
        >
          Change Password
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">
          <FormControl className='flex' id='fullname'>
            <FormLabel className='w-[15%]'>Fullname</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Fullname'
                className='w-full'
                type='text' {...formik.getFieldProps("fullname")}
              />
              <FormHelperText className='text-xs'>
                Help people discover your account by using the name you're know by: either
                your full name, nickname, or bussiness name.
              </FormHelperText>
              <FormHelperText className='text-xs'>
                You can only change youir name twice within 14 days
              </FormHelperText>

            </div>
          </FormControl>
          <FormControl className='flex' id='username'>
            <FormLabel className='w-[15%]'>Username</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Username'
                className='w-full'
                type='text' {...formik.getFieldProps("username")}
              />
              <FormHelperText className='text-xs'>
                In most cases, you'll be able to change your username back to ashok.zanrmariya for another 14 days, Lean more
              </FormHelperText>

            </div>
          </FormControl>
          <FormControl className='flex' id='website'>
            <FormLabel className='w-[15%]'>Website</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Website'
                className='w-full'
                type='text' {...formik.getFieldProps("website")}
              />
              <FormHelperText className='text-xs'>
                Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.
              </FormHelperText>


            </div>
          </FormControl>

          <FormControl className='flex' id='bio'>
            <FormLabel className='w-[15%]'>Bio</FormLabel>
            <div className='w-full'>
              <Textarea placeholder='Bio'
                className='w-full'
                type='text'
                {...formik.getFieldProps("bio")} />
            </div>
          </FormControl>

          <div className='py-10'>
            <p className='font-bold text-sm'>Personal information</p>
            <p className='text-xs'>
              Provide your persinal information, even if the account is used for a bussiness
            </p>
          </div>
          <FormControl className='flex' id='email'>
            <FormLabel className='w-[15%]'>Email address</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Email'
                className='w-full'
                type='text' {...formik.getFieldProps("email")}
              />


            </div>
          </FormControl>
          <FormControl className='flex' id='mobile'>
            <FormLabel className='w-[15%]'>Phone number</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Phone number'
                className='w-full'
                type='text' {...formik.getFieldProps("mobile")}
              />

            </div>
          </FormControl>

          <FormControl className='flex' id='gender'>
            <FormLabel className='w-[15%]'>Gender</FormLabel>
            <div className='w-full'>
              <Input
                placeholder='Gender'
                className='w-full'
                type='text' {...formik.getFieldProps("gender")}
              />

            </div>
          </FormControl>
          <div>
            <Button colorScheme='blue' type="submit" className=''>Submit</Button>
          </div>
        </Stack>
      </form>
      <ChangeProfilePhotoModal
        handleProfileImageChange={handleProfileImageChange}
        handleRemovePhoto={handleRemovePhoto}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default EditAccountDetails