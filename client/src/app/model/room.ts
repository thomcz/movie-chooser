import { State } from "./states";
import { MovieDb } from "./moviedb";

export class Room {
    roomId: string;
    state: State;
    choosenMovie: MovieDb;

    constructor(roomId: string, state: State) {
        this.roomId = roomId
        this.state = state
    }
}