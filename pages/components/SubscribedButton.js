import { useRouter } from "next/router"

export default function SubscribedButton({ user }) {
    return (
        <>
            <button
                className='bg-red-500 px-3 py-2 rounded-med'
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
                Subscribed
            </button>
        </>
    )
}