export interface UserInterface {
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    history: HistoryInterface[];
    tel: string;
    onboarded: boolean;
}


export interface UserResponseInterface extends Omit<UserInterface, 'history' | 'onboarded'> {
    id: string;
}


export interface HistoryInterface {
    user: UserInterface;
    query: string;
    createdAt: Date;
}