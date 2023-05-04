import Image from "next/image"

export default function Video({video}) {
    return (
        <div className=''>
            <div className='px-5 pb-5'>
               {video.thumbnail &&(
                <Image
                className='mb-2 cursor-pointer'
                src={video.thumbnail}
                width='800'
                height='450'
                />
               )}
               
               <div className='flex'>
                {video.author.image && (
                    <img 
                    className='w-10 h-10 mt-2 mr-2 rounded-full'
                    src={video.author.image}
                    />
                )}
                <div>
                    <p className="text-lg font-bold text-white">{video.title}</p>
                    <div className="">
                        <div className="">
                            <div className="text-gray-400">
                                <span className="mr-2 underline">{video.author.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
               </div>
            </div>
                
        
        <p className="text-lg font-bold text-white">{video.title}</p>
        </div>
    )
}