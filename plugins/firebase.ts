import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    console.log("Initializing Firebase...");

    const config = useRuntimeConfig().public;

    const firebaseConfig: FirebaseConfig = {
      apiKey: config.apiKey as string,
      authDomain: config.authDomain as string,
      projectId: config.projectId as string,
      storageBucket: config.storageBucket as string,
      messagingSenderId: config.messagingSenderId as string,
      appId: config.appId as string,
      measurementId: config.measurementId as string,
    };

    if (import.meta.env.DEV) {
      // 這邊的程式碼只會在開發模式下執行
      console.log(firebaseConfig);
    }

    if (!getApps().length) {
      try {
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        console.log("Firebase initialized");
        const storage = getStorage(app);
        nuxtApp.provide("firebaseStore", storage);
      } catch (error) {
        console.error(`Firebase init error: ${JSON.stringify(error, null, 2)}`);
      }
    }
  }
});
