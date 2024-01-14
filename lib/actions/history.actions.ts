"use server";

import HistoryModal from "../models/history.model";
import UserModal from "../models/user.model";
import { connectToDb } from "../mongoose";

interface Params {
    query: string, 
    user: string,
};


export const postHistory = async ({query, user}: Params) => {
    try {
        connectToDb();

        const createdHistory = await HistoryModal.create({
            query,
            user,
        });

        await UserModal.findByIdAndUpdate(user, {
            $push: { history: createdHistory._id },
        });

    } catch (error: any) {
        throw new Error(`Failed to push history: ${error.message}`);
    }
}