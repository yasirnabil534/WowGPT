import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const tabElements = [
    {
      name: 'Text Prompt',
      path: '/text-prompt',
    },
    {
      name: 'Stream Prompt',
      path: '/stream-prompt'
    }
  ];

  const navigate = useNavigate();

  return (
    <div className='flex overflow-hidden'>
      <div className='w-60 h-screen'>
        <div className='text-2xl font-bold text-center p-2 text-white bg-black'>
          WowGPT
        </div>
        <div className='flex flex-col w-full justify-between items-center h-[calc(100vh-48px)]'>
          <div className="bg-gray-500 text-white w-full h-full flex flex-col items-center overflow-auto">
            {tabElements.map((item) => {
              return (
                <div className='p-2 w-full text-center cursor-pointer hover:bg-gray-400 hover:text-black border-b' onClick={() => navigate(item.path)}>
                  {item.name}
                </div>
              )
            })}
          </div>
          <div className='text-sm text-white text-center bg-gray-700 w-full p-2'>&copy; Copyright: Yasir Uddin Ahamed</div>
        </div>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home