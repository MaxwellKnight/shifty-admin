export interface IBaseAgent {
    teamId: number,
    name: string,
    username: string,
    password: string,
    role: string,
    isStudent: boolean,
    isMobile: boolean
    contact: {
        phone: string,
        email: string,
        emergency?: string,
        addr?: {
            street: string,
            city: string,
            zip: Number,
        }
    },
    weeklyLimit: {
        nightCount: number,
        totalCount: number,
        limit: number
    },
    createdAt?: Date,
    updatedAt?: Date
}