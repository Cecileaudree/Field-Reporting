// Interface pour les coordonnées géographiques
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Interface pour une entrée du journal
export interface JournalEntry {
  id?: string;
  description: string;
  photoUri: string | null;
  location: Coordinates | null;
  timestamp: number;
}

// Type générique pour les réponses d'API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}