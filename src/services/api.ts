import axios from "axios";
import { BandFormValues } from "../hooks/useBandForm";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


export async function sendGenerateTextAndPhotoRequest(prompt: BandFormValues) {
    try {
        // Generate text request
        const response_text = await api.post("/generate_text/", { prompt });
        if (!response_text.data.output) throw new Error("Failed to generate text");

        // Generate photo request
        const response_photo = await api.post("/generate_photo/", { prompt });
        if (!response_photo.data.output) throw new Error("Failed to generate photo");

        return { text: response_text.data.output, photo: response_photo.data.output }; // Assuming second request gives photo
    } catch (error: unknown) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch generated content");
    }
}
