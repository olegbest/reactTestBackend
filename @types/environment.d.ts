declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      STATIC_URL: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: number;
    }
  }
}

export {};
