import { JournalEntry, ApiResponse } from "../types/indesx";

export const submitJournalEntry = async (
  entry: JournalEntry
): Promise<ApiResponse<JournalEntry>> => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const successRate = Math.random();

      // 90% de succès
      if (successRate < 0.9) {

        const savedEntry: JournalEntry = {
          ...entry,
          id: Math.random().toString(36).substring(2, 9) // faux ID
        };

        resolve({
          success: true,
          data: savedEntry
        });

      } else {

        reject({
          success: false,
          error: "Erreur serveur simulée (HTTP 500)"
        });

      }

    }, 1500);

  });

};