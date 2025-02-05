import axios from "axios";
import { BandFormValues } from "../hooks/useBandForm";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LastMetadata {
  generated_text: string;
  photo_url: string;
  capitalized_words_count: number;
  words_followed_by_numbers_count: number;
  year_parity: string;
  name: string;
  band: string;
  year: number;
}

export interface Metadata {
  text: string;
  photo: string;
  capitalizedWordsCount: number;
  wordsFollowedByNumbersCount: number;
  yearParity: string;
}

export async function sendGenerateTextAndPhotoRequest(prompt: BandFormValues) {
  try {
    // Generate text request
    const response_text = await api.post("/generate_text/", { prompt });
    if (!response_text.data) throw new Error("Failed to generate text");

    // Extract relevant data from text response
    const {
      generated_text,
      capitalized_words_count,
      words_followed_by_numbers_count,
      year_parity,
    } = response_text.data.data;

    // Generate photo request
    const response_photo = await api.post("/generate_photo/", { prompt });
    if (!response_photo.data) throw new Error("Failed to generate photo");

    // Assuming the second response provides a photo URL
    const photoUrl = baseURL + "/" + response_photo.data.data;

    response_text.data.data.photo_url = response_photo.data.data;
    response_text.data.data.name = prompt.name;
    response_text.data.data.band = prompt.band;
    response_text.data.data.year = prompt.year;

    // Store metadata
    storeMetadata(response_text.data.data)
      .then((response) => {
        console.log("Metadata stored successfully", response);
      })
      .catch((error) => {
        console.error("Error storing metadata", error);
      });

    return {
      text: generated_text,
      photo: photoUrl,
      capitalizedWordsCount: capitalized_words_count,
      wordsFollowedByNumbersCount: words_followed_by_numbers_count,
      yearParity: year_parity,
    };
  } catch (error: unknown) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch generated content");
  }
}

export async function storeMetadata(metadata: LastMetadata) {
  try {
    const response = await api.post("/store_metadata/", metadata);
    return response.data; // return the response, which might include confirmation or the document ID
  } catch (error) {
    console.error("Error storing metadata:", error);
    throw new Error("Failed to store metadata");
  }
}

export async function getLastMetadata() {
  try {
    const response = await api.get("/get_last_metadata/");
    return response.data; // Returns the metadata object
  } catch (error) {
    console.error("Error fetching last metadata:", error);
    throw new Error("Failed to fetch last metadata");
  }
}
