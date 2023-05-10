import { useRouter } from "next/router"

export default function SubscribedButton({ user, subscribed }) {
    const router = useRouter()
    return (
        <>
            {subscribed ? (
                <button
                    className={`bg-green-500 px-3 py-2 rounded-md`}
                    onClick={async () => {
                        await fetch('/api/unsubscribe', {
                            body: JSON.stringify({
                                unsubscribeTo: user.id,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                        })

                        router.reload(window.location.pathname)
                    }}
                >
                    Subscribed

                </button>
            ) : (
                <button
                    className='bg-red-500 px-3 py-2 rounded-md'
                    onClick={async () => {
                        await fetch('/api/subscribe', {
                            body: JSON.stringify({
                                subscribeTo: user.id,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST'
                        })

                        router.reload(window.location.pathname)
                    }}
                >
                    Subscribe
                </button>
            )}
        </>
    )
}