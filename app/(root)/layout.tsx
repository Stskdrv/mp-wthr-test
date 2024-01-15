import useAuthValidation from "@/hooks/useAuthValidatation";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const RootLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const userId = useAuthValidation();

    const userInfo = await fetchUser(userId);

    if (userInfo && userInfo.onboarded) redirect(`/map`);

    return (
        <>
            {children}
        </>
    )
};

export default RootLayout;