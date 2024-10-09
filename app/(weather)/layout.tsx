import Navbar from "@/components/header";
import useAuthValidation from "@/hooks/useAuthValidatation";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const WeatherLayout = async ({
    children,
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) => {
    const userId = useAuthValidation();

    const userInfo = await fetchUser(userId);

    if (!userInfo || !userInfo.onboarded) {
        redirect('/');
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-[25vh]">
                {children}
            </div>
        </>
    )
};

export default WeatherLayout;