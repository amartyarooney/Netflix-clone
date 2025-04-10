import { useState } from "react";
import { Link } from "react-router-dom";
import {LogOut, Menu, Search} from "lucide-react";
import { useAuthStore } from "../../store/authUser";
import { useContentStore } from "../../store/content";


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const {user, logout} = useAuthStore();
    
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const toggleSearchBar = () => setSearchBarVisible(!searchBarVisible);

    const {contentType,setContentType} = useContentStore();
    console.log("contentType:", contentType);

    return (<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center gap-10 z-50'>
            <Link to="/">
                <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
            </Link>
            {/*desktop navbar items*/}
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to="/" className='hover:underline' onClick={()=> setContentType("movie")}>
                    Movies
                </Link>
                <Link to="/" className='hover:underline' onClick={()=> setContentType("tv")}>
                    TV Shows
                </Link>
                <Link to="/history">
                    Search History
                </Link>
            </div>

        </div>
        <div className='flex gap-2 items-center z-50'>
      
            
            {!searchBarVisible && <Search className="size-6 cursor-pointer" onClick={toggleSearchBar} />  }
            {searchBarVisible && (  
                    <div className='flex gap-2 items-center z-50' >
                        <Search className='size-6 cursor-pointer' />
                        <input placeholder='search movie...'></input>
                    </div>
            )}         
            
            <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer' />
              <LogOut className='size-6 cursor-pointer' onClick={logout} />
            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu } />
            </div>
        </div>
        
        

        {/*mobile navbar  */}
        {isMobileMenuOpen && (  
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link to={"/"} className='black hover:underline p-2' onClick={toggleMobileMenu}
                    >Movies</Link>
                     <Link to={"/"} className='black hover:underline p-2' onClick={toggleMobileMenu}
                    >Tv Shows</Link>
                     <Link to={"/history "} className='black hover:underline p-2' onClick={toggleMobileMenu}
                    >Search History</Link>
            </div>

        )}
    </header>
    );
};

export default Navbar
