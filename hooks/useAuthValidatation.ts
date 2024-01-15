import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const useAuthValidation = () => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    return userId;
};

export default useAuthValidation;