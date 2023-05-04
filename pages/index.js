
import { getVideos } from '@/lib/data'
import prisma from '@/lib/prisma'
import Videos from './components/Videos'
import Heading from './components/Heading'
import LoadMore from './components/LoadMore'
import { useState } from 'react'


export default function Index({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos)
  return (
    <div>
  
       <Heading />
      {videos.length === 0 && (
        <p className='flex justify-center mt-20'>No videos found!</p>
      )}
      <Videos videos={videos}/>
      <LoadMore videos={videos} setVideos={setVideos}/>
     
      </div>
  )
}

export async function getServerSideProps() {
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
     initialVideos: videos,
    },
  }
}