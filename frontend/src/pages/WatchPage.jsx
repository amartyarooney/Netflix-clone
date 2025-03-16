import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useContentStore } from "../../store/content";
import axios from "axios";

const WatchPage = () => {

    const {id} = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);

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
                    setSimilarContent([]);
                }
            }
        }
        getSimilarContent();
    }, []);
         
    console.log("similr: ", similarContent);
    return  <div> HI </div>
  
}

export default WatchPage
