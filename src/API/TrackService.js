import axios from "axios";

const URL = 'https://soundtrack-table.herokuapp.com/api/playlist';

export default class TrackService {
    static async getAll(limit = 5, page = 1) {
        const res = await axios.get(URL, {
            params: {
                page: page,
                limit: limit
            }
        })
        return res.data
    }

    static async create(body) {
        await axios.post(URL, body);
    }
}