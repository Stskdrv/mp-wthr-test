import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import Navbar from "./navbar";

const Header = async () => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const userInfo = await fetchUser(userId);

    if (!userInfo.onboarded) redirect('/');
    
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Navbar />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Header;