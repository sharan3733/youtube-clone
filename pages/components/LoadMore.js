import { amount } from "@/lib/config"

export default function LoadMore({videos, setVideos}){
    return (
        <div className= 'flex justify-center'>
            <button
            className="border px-8 py-2 my-10 mr-2 font-bold rounded-full"
            onClick={async () =>{
                const url = `/api/videos?skip=${videos.length}`
                const res = await fetch(url)
                const data = await res.json()
                setVideos([...videos, ...data])
            }}
            >
                Load more
            </button>
        </div>
    )
}