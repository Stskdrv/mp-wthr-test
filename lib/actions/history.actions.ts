"use server";

import HistoryModel from "../models/history.model";
import { connectToDb } from "../mongoose";

interface Params {
    data: {
        lat: string | undefined;
        lng: string | undefined;
        searchQuery: string;
    }, 
    userId: string,
};


export const postHistory = async ({ data, userId }: Params) => {
    try {
        connectToDb();

        // TODO: in future ensure that the user with the given userId exists
 
        await HistoryModel.create({
            userId,
            data,
        });

    } catch (error: any) {
        throw new Error(`Failed to push history: ${error.message}`);
    }
};


export async function fetchUserHistory(clerkId: string) {
    try {
        connectToDb();
        
        const history = await HistoryModel.find({ userId: clerkId })
            .sort({ createdAt: -1 });
        
        return JSON.stringify(history);
    } catch (error: any) {
        throw new Error("Error fetching user history:" + error.message);
    }
}
