import Navbar from "@/components/header";
import useAuthValidation from "@/hooks/useAuthValidatation";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const MapLayout = async ({
    children,
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) => {
    const userId = useAuthValidation();

    const userInfo = await fetchUser(userId);

    if (!userInfo?.onboarded) {
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

export default MapLayout;