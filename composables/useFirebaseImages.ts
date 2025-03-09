import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { waitForFirebaseStore } from "~/composables/useFirebaseStoreReady";
import type { FirebaseStorage } from "firebase/storage";
import type { ServerImages } from "~/types";

export function useFirebaseImages() {
  // 使用 useState 建立全域的 serverImages 狀態（全域快取）
  const serverImages = useState<ServerImages>("serverImages", () => ({}));

  // 如果 serverImages 已經有值就不重複初始化
  if (Object.keys(serverImages.value).length > 0) {
    return { serverImages };
  }

  function formatFirebaseImageUrl(url: string) {
    const match = url.match(/\/o\/([^?]+)/);
    if (match && match[1]) {
      const filePath = decodeURIComponent(match[1]);
      // 如果 serverImages 物件中沒有此 key，就先以陣列方式設定
      if (!serverImages.value[filePath]) {
        serverImages.value[filePath] = [url];
      }
    }
    return url;
  }

  async function setImages(folderName: string, storage: FirebaseStorage) {
    try {
      const listRef = storageRef(storage, folderName);
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );
      if (urls.length) {
        serverImages.value[folderName] = urls.map((url) => {
          formatFirebaseImageUrl(url);
          return url;
        });
      }
    } catch (error) {
      console.error(`取得 ${folderName} 資料夾圖片 URL 失敗：`, error);
    }
  }

  function initialFirebaseImages(storage: FirebaseStorage) {
    // talents
    const folders = [
      "images",
      "ascendancies",
      "jobs",
      "talents/daughterOfOshabi",
      "talents/deadEye",
      "talents/necromancer",
    ];

    folders.forEach((folder) => {
      setImages(folder, storage);
    });
  }

  onMounted(async () => {
    try {
      const firebaseStore = await waitForFirebaseStore();
      initialFirebaseImages(firebaseStore);
    } catch (error) {
      console.error("取得 Firebase Store 失敗：", error);
    }
  });

  return { serverImages };
}
