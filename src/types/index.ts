// Coordonnées géographiques
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Incident signalé par l'agent
export interface Incident {
  id?: string;
  description: string;
  photoUri: string;
  location: Coordinates;
  timestamp: number;
}

// Réponse générique de l'API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
