type CheckItem = {
  id: number;
  name: string;
  text: string;
  textTag: string;
  textClass: string;
};

export interface Chapter {
  chapterId: number;
  title: string;
  titleTag: string;
  titleClass: string;
  content: string[];
  checkList?: CheckItem[];
  memo?: {
    hashtag: string;
    hashtagClass: string;
    text: string;
    textClass: string;
    img?: string;
  }[];
}
