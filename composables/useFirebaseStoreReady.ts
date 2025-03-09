import { watch } from "vue";
import type { FirebaseStorage } from "firebase/storage";

export function waitForFirebaseStore(): Promise<FirebaseStorage> {
  return new Promise((resolve) => {
    const { $firebaseStore } = useNuxtApp();
    if ($firebaseStore) {
      resolve($firebaseStore);
    } else {
      const unwatch = watch(
        () => useNuxtApp().$firebaseStore,
        (newVal) => {
          if (newVal) {
            unwatch();
            resolve(newVal);
          }
        }
      );
    }
  });
}
