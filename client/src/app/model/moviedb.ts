export class MovieDb {
    title: string;    
    imdbId: string;
    user: string;
    roomId: string;
    votes: number;

    constructor(title: string, imdbId: string, user: string, roomId: string) {
        this.title = title;
        this.imdbId = imdbId;
        this.user = user;
        this.roomId = roomId;
        this.votes = 0;
    }
}