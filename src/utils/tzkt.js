import axios from "axios";

export const fetchStorage = async () => {
    try {
        const res = axios.get("https://api.jakartanet.tzkt.io/v1/contracts/KT1CXeshbqQRP9J2AkxNph9MgKMmuJfNGu6a/storage");
        return res;
    } catch (err) {
        throw err;
    }
};
