import { useDispatch, useSelector } from 'react-redux';
import './SearchComponents.css'
import SearchUserCard from './SearchUserCard'
import { useEffect } from 'react';
import { searchUserAction } from '../../Redux/User/Action';
const SearchComponents = () => {
    const dispatch = useDispatch();
  const token = localStorage.getItem("token")

  const user =useSelector(store=>store.user)

  const handleSearch=(e)=>{
      dispatch(searchUserAction({jwt:token,query:e.target.value}))
  }
console.log("searchUser:", user.searchUser);


  return (
    <div className='searchContainer'>
        <div className='px-3 pb-5'>
            <h1 className='text-xl pb-5'>Search</h1>
            <input onChange={handleSearch} className='searchInput' type="text" placeholder="Search..."/>
        </div>
        <hr />
        <div className='px-3 mt-3'>
          
          {user.searchUser?.map((item) => <SearchUserCard user={item}/>)}
        </div>
    </div>
  )
}

export default SearchComponents