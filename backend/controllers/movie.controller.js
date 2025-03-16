import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req,res){
    try{
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random()* data.results.length)];
        res.json({success:true, content: randomMovie});
    }catch(error){
        res.status(500).json({success: false, message: error});
    }
}

export async function getMovieTrailer(req,res){
    try{
        const {id} = req.params;
        let trailers = {};
        console.log("kjb: "+id);
        try{
             trailers = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
            // console.log("kjn: ",trailers);
        }catch(error){
            console.log("error here");
            console.log(error);
        }
        
        res.status(200).json({success: true, trailers: trailers.results});
    }catch(error){
        res.status(500).json({success:false, message:error});
    }
}


export async function getMovieDetails(req,res){
    try{
        const {id} = req.params;
        const details = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success:true, details:details});

    }catch(error){
        res.status(500).json({success:false, message:error});
    }

}

export async function getSimilarMovies(req,res){
    try{
        const {id} = req.params;
        const similarMovies = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similarMovies: similarMovies});
    }catch(error){
        res.status(500).json({success:false, message:error});
    }
    
}

// export async function getMoviesByCategory(req,res){
//     const {category} = req.params;
//     try{
// 		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
//         res.status(200).json({success :true, content:data.results});
//     }catch(error){
//         res.status(500).json({success:fail,message:error});
//     }
// }

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}