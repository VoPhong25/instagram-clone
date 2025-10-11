import { useNavigate } from 'react-router-dom'
const StoryCircle = () => {
  const navigate=useNavigate()
  const handleNavigate=() => {
    navigate("/story")
  }

  return (
    <div onClick={handleNavigate} className="cursor-pointer flex flex-col items-center">
        <img className="w-16 h-16 rounded-full " src="https://cdn.pixabay.com/photo/2025/06/25/17/47/hiding-9680458_1280.jpg" alt="" />
        <p>username</p>
    </div>
  )
}

export default StoryCircle