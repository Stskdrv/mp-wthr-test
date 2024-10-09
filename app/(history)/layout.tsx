import Navbar from "@/components/header";
import useAuthValidation from "@/hooks/useAuthValidatation";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const SearchLayout = async ({
    children,
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) => {
    const userId = useAuthValidation();

    const userInfo = await fetchUser(userId);

    if (!userInfo || !userInfo.onboarded) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-5">
                {children}
            </div>
        </>
    )
};

export default SearchLayout;