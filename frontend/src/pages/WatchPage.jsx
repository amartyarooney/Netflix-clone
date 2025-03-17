import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useContentStore } from "../../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WatchPage = () => {

    const {id} = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    // const [movieDetails, setMovieDetails] = useState([]);


    const {contentType} = useContentStore();

    useEffect(()=>{
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailer`);
                // console.log(res);
                setTrailers(res.data.trailers);

            } catch (error) {
                // console.log(error.message12w32);
                if(error.message.includes(404)){
                    setTrailers([]);
                }
            }
        };
        getTrailers();
    },[contentType, id]);
    // console.log("trailerss: ",trailers);
   
    useEffect(() => {
        const getSimilarContent = async () =>{
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                console.log("res: ", res);
                setSimilarContent(res.data.similarMovies.results);
            } catch (error) {
                if(error.message.includes(404)){
                    setSimilarContent(null);
                }
            }
        }
        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () =>{
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.details);
            } catch (error) {
                if(error.message.includes(404)){
                    setContent([]);
                }
            }
        }
        getContentDetails();
    }, [contentType, id]);
         
    const handleNext = () => {
        if(currentTrailerIdx >= 0)
            setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
    const handlePrev = () => {
        if(currentTrailerIdx <= trailers.length-1)
            setCurrentTrailerIdx(currentTrailerIdx - 1);
    }

    return  <div className='bg-black min-h-screen text-white'>
                <Navbar/>
                {trailers.length > 0 && (
                    <div className='flex justify-between items-center mb-4 cursor:pointer '>
                        <button className={` bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded cursor:pointer
                            ${currentTrailerIdx === 0 ? " opacity-50 cursor-not-allowed " : ""}}`}
                            disabled={currentTrailerIdx === 0}
                            onClick={handlePrev}
                            >
                            <ChevronLeft  size={24}  />
                        </button>

                        <button className={` bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                            ${currentTrailerIdx === trailers.length-1 ? " opacity-50 cursor-not-allowed " : ""}}`}
                            disabled={currentTrailerIdx === trailers.length-1} 

                            onClick={handleNext}>
                            <ChevronRight  size={24} />
                            {console.log("gvvhjjhb: ",trailers.length , currentTrailerIdx )}
                        </button>
                    </div>
                )}
            </div>
  
}

export default WatchPage
