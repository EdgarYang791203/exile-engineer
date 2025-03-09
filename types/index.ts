import type { FirebaseStorage } from "firebase/storage";

export interface ServerImages {
  [key: string]: string[];
}

export type CheckItem = {
  id: number;
  name: string;
  text: string;
  textTag: string;
  textClass: string;
};

export type MemoItem = {
  memoTag: string;
  memoClass: string;
  hashtag: string;
  hashtagClass: string;
  textTag: string;
  text: string;
  textClass: string;
  img?: string;
};

export interface Chapter {
  chapterId: number;
  title: string;
  titleTag: string;
  titleClass: string;
  content: string[];
  checkList?: CheckItem[];
  memo?: MemoItem[];
}

interface Window {
  MSStream?: any;
}

declare module "#app/nuxt" {
  interface NuxtApp {
    $firebaseStore: FirebaseStorage;
  }
}
