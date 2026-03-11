import axios from "axios";
import { Incident, ApiResponse } from "../types";

export const submitIncident = async (
  incident: Incident
): Promise<ApiResponse<Incident>> => {

  try {

    // simulation délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const successRate = Math.random();

    if (successRate < 0.9) {

      const savedIncident: Incident = {
        ...incident,
        id: Math.random().toString(36).substring(2, 9)
      };

      // simulation requête axios
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        savedIncident
      );

      return {
        success: true,
        data: savedIncident
      };

    } else {

      throw new Error("Erreur HTTP 500 simulée");

    }

  } catch (error) {

    return {
      success: false,
      error: "Erreur serveur simulée"
    };

  }

};