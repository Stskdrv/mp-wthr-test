import Navbar from "@/components/header";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MapLayout = async ({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const userInfo = await fetchUser(userId);

    if (!userInfo.onboarded) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
};

export default MapLayout;