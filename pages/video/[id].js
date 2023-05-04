import prisma from "@/lib/prisma";
import { getVideo } from "@/lib/data";
import Link from "next/link";
import timeago from "@/lib/timeago";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function SingleVideo({ video }) {
  if (!video) return <p className="text-center p-5">Video does not exist</p>;
  return (
    <>
      <header className="h-14 flex pt-5 px-5 pb-2">
        <Link href={`/`} className="underline">
          Home
        </Link>
        <div className="grow"></div>
        </header>

        <div className="h-screen flex">
          <div className="flex w-full flex-col mb-4 border-t border-r border-b border-3 border-black pl-0 bg-black">
            <div className="relative pt-[60%]">
              <ReactPlayer
                className="react-player absolute top-0 left-0"
                url={video.url}
                width="100%"
                height="100%"
                controls={true}
                light={video.thumbnail}
              />
            </div>

            <div className="px-5 mt-5">
                <div className="flex">
                    <div>
                        <p className="text-2xl font-bold">{video.title}</p>
                        <div className="text-gray-400">
                            {video.views} views .{' '}
                            {timeago.format(new Date(video.createdAt))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-between border-t border-gray-500 mt-5 pt-5'>
                    <Link href={`/channel/${video.author.username}`} className='flex'>
                        {video.author.image &&(
                            <img
                               className="w-16 h-16 mt-2 mr-2 rounded-full"
                               src={video.author.image}
                               />
                        )}
                    <span className="mt-6 ml-2 text-xl">{video.author.name}</span>
                    </Link>
                </div>
            </div>
          </div>
        </div>
     
      
    </>
  )
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));

  return {
    props: {
      video,
    },
  };
}
