export interface GameDetails {
    teams:{
        home: {
            name: string,
            logo: string
        },
        away: {
            name: string,
            logo: string
        }
    },
    goals:{
        home: number
        away: number
    }
}
