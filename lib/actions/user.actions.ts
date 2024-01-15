'use server'

import UserModal from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import HistoryModel from "@/lib/models/history.model";

interface Params {
    clerkId: string;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    tel: string;
}

export async function fetchUser(clerkId: string | null) {
    try {
        connectToDb();
        

        return await UserModal.findOne({ clerkId });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};


export const updateUser = async ({
    clerkId,
    firstname,
    lastname,
    address,
    email,
    tel,
}: Params) => {
    try {
        connectToDb();

        await UserModal.findOneAndUpdate(
            { clerkId },
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