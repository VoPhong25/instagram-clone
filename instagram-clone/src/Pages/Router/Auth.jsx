
import Signin from '../../Components/Rester/Signin'
import Signup from '../../Components/Rester/Signup'
import ForgotPassword from '../../Components/Rester/ForgotPassword' 
import { useLocation } from 'react-router-dom'

const Auth = () => {
    const location = useLocation();
    return (
        <div>
            <div className='flex items-center justify-center h-[100vh] space-x-5'>
                <div>
                    <div className='h-[35.3rem] w-[23rem]'>
                        <img className='h-full w-full'
                            src="https://images.pexels.com/photos/15226550/pexels-photo-15226550.jpeg" alt="" />
                        <div className='mobileWallpaper'>
                        </div>
                    </div>
                </div>
                
                <div className='w-[40vw] lg:w-[23vw]'>
                    {location.pathname === "/login" ? <Signin /> : 
                     location.pathname === "/signup" ? <Signup /> :
                     location.pathname === "/forgotpassword" ? <ForgotPassword /> : null} 
                </div>
            </div>
        </div>
    )
}

export default Auth