export interface UniqUsersModel {
    users: number;
    usersFull: {
        id: number;
        address: string;
        createdAt: string;
        updatedAt: string;
    }[];
}
