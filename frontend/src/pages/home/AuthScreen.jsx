import { Link } from "react-router-dom"

const AuthScreen = () => {
  return <div className='hero-bg relative'>
      {/* navbar */}
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <img src='/netflix.logo.png' alt='netflix logo' className='w-32 md:w-52' />
        <Link to={"/login"} className='text-white bg-red-600 py-1 px-2 rounded'>
        Sign In
        </Link>
      </header>
      {/*hero*/}

       <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
         <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited Videos, TV shows and more</h1>
         <p className='text-lg mb-4'>Watch Anywhere. Cancel Anytime</p>
         <p className='mb-4'> Ready to watch? Enter your email to create or restart your membership.</p>

       </div>
    </div>
} 

export default AuthScreen
