'use server'

import UserModal from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import HistoryModal from "@/lib/models/history.model";

interface Params {
    userId: string;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    tel: string;
}

export async function fetchUser(userId: string | null) {
    try {
        connectToDb();

        return await UserModal.findOne({ id: userId });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};


export const updateUser = async ({
    userId,
    firstname,
    lastname,
    address,
    email,
    tel,
}: Params) => {
    try {
        connectToDb();

        await UserModal.findOneAndUpdate(
            { id: userId },
            {
                firstname: firstname.toLowerCase(),
                lastname: lastname.toLowerCase(),
                address,
                email,
                tel,
                onboarded: true,
            },
            { upsert: true } // that means update is exists or insert in DB
        );
        
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
};

export async function fetchUserHistory(userId: string) {
    try {
        connectToDb();

        // Find all history queries searched by the user with the given userId
        const history = await UserModal.findOne({ id: userId }).populate({
            path: "history",
            model: HistoryModal,
        });

        return history;
    } catch (error: any) {
        throw new Error("Error fetching user history:", error);
    }
}
