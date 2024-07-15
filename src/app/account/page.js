import Link from "next/link";

const Page = () => {
    return (
        <div className="w-h-full bg-img">
            <h1>Authentication Page</h1>
            <p><Link href="/account/register">SignUp</Link> & <Link href="/account/login">SignIn</Link></p>
        </div>
    )
}

export default Page