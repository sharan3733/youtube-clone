import { useRouter } from "next/router";
import Link from "next/link";


export default function Heading() {
    const router = useRouter()

    return (
        <header className="h-14 flex pt-5 px-5 pb-2">
            <div className="text-xl">
                {router.asPath ==='/' ? (
                    <p>YouTube clone</p>
                ) : (
                    <Link href={`/`} className='underline'>Home</Link>
                )}
            </div>
        </header>
    )
}