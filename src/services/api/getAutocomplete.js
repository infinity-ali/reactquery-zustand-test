import axios from "axios";
export const getCountries = async () => {
    let response = await axios.get("https://19a2ca130bfc45c69943218a2b269060.api.mockbin.io/");
    console.log("response:", response);
    return response
}