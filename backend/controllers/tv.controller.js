import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTv(req,res){
    try{    
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random()* data.results.length)];
        res.status(200).json({success: true, content:randomTv});
    }catch(error){
        res.status(404).json({success:false, error:error});
    }
    
}

export async function getTvTrailers(req,res){ //working
    try{
        const {id} = req.params;
        const tvTrailers = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({success:true, tvTrailers:tvTrailers});
    }catch(error){
        res.status(404).json({success: false, error:error});
    }
}

export async function getTvDetails(req,res){ 
    try{
        const {id} = req.params;
        const tvDetails = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true, tvDetails:tvDetails});
    }catch(error){
        res.status(404).json({success: false, error:error});
    }   

}

export async function getSimilarTv(req,res){
    try{
        const {id} = req.params;
        const similarTv = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true, similarTv:similarTv});
    }catch(error){
        res.status(404).json({success: false, error:error});
    }
    
}


export async function getTvByCategory(req,res){
    try{
        const {category} = req.params;
        console.log("cate: " + category)
        const tvByCategory = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true, content:tvByCategory});
    }catch(error){
        res.status(404).json({success: false, error:error});
    }
}

