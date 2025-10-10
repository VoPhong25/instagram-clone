import SuggetionCard from "./SuggetionCard"

const HomeRight = () => {
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div>
              <img className="w-12 h-12 rounded-full" src="https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794_640.jpg" alt="" />
            </div>
            <div className="ml-2">
              <p className="font-semibold">username</p>
              <p className="opacity-60">FullName</p>
            </div>
          </div>
          <div>
            <p className='text-sm font-semibold text-blue-700 '>Switch</p>
          </div>
        </div>
      <div className="space-y-5 mt-10">
            {[1,1,1,1,1].map((item) => <SuggetionCard/>)}
      </div>
      </div>
    </div>
  )
}

export default HomeRight