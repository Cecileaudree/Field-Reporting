import axios from "axios";
import { Incident, ApiResponse } from "../types";

// Instance Axios centralisée
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Envoie un incident signalé au serveur (POST /posts)
export const submitIncident = async (
  data: Incident
): Promise<ApiResponse<Incident>> => {
  try {
    const response = await apiClient.post("/posts", data);
    // Axios encapsule la réponse dans .data
    return {
      success: true,
      data: response.data as Incident,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Erreur réseau inconnue",
    };
  }
};