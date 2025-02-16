const talentData = [
  {
    chapter: "Act 1",
    content: [
      {
        text: "腐蝕箭(Lv1) + 放血 | (Lv4 鳥蛋) |  + 快速攻擊輔助 | (Lv8 衝出監牢)",
        tagClasses: "text-green-500 | text-white | text-green-500 | text-white",
      },
      {
        text: "幻步 | (Lv4 醫藥箱)",
        tagClasses: "text-green-500 | text-white",
      },
      {
        text: "毒藥 + 齊射輔助 + 機率中毒輔助 | (Lv12 海妖)",
        tagClasses: "text-green-500 | text-white",
      },
    ],
    memo: [
      "增加投射物數量不要換掉，38 等後換高階版",
      "機率中毒輔助用到補滿中毒機率再換傷害輔助，毒藥基礎 40% 毒捷 40% 天賦(遊俠外圈 + 刺客交界外圈) 40%",
      "章節檢查換藥水洗恢復量，天賦要點三秒回生命藥劑充能防斷水",
      "(可選)凋零之步掛凋零、幻步 => 盾衝",
    ],
  },
  {
    chapter: "Act 2",
    content: [
      {
        text: "痛苦之捷 | (魔力保留 20%) |  鮮血狂怒 | (Lv16 黑色入侵者)",
        tagClasses: "text-green-500 | text-white | text-white",
      },
      {
        text: "召喚探測機獸 | (魔力保留 35%) |  (Lv16 盤根錯節)",
        tagClasses: "text-blue-500 | text-white | text-white",
      },
      {
        text: "猛毒投射物輔助 => 致命異常輔助 | (Lv18 清理蜘蛛)",
        tagClasses: "text-green-500 | text-white",
      },
      {
        text: "惡意 | (魔力保留 50%) |  病疫之難 | (打王用) |  (Lv24 第三章節迷失的愛情)",
        tagClasses:
          "text-blue-500 | text-white | text-green-500 | text-white | text-white",
      },
    ],
    memo: [
      "天賦至少點一圈保留效用，遊俠刺客中間那圈 24%，可用魔力 15%，為了更順暢最好再點一圈魔力專精拿 12% 保留效用。",
      "如不點魔力專精，技能串一顆 '活栓' (31 等圖書館取得或用買的)",
      "如生存不足須點第二圈保留，除痛苦之捷留著其餘開堅定、優雅、反抗之旗(新版本可能不適)，點異能魔力(吞噬之冠) + 神聖祝福串惡意",
    ],
  },
  {
    chapter: "Act 3",
    content: [],
    memo: [
      "跑昇華時可以準備綠色技能去置換彈炸之毒藥(消耗藥劑充能固定)，可以解放雙投射物數量輔助。",
    ],
  },
  {
    chapter: "Act 4",
    content: [
      {
        text: "四連過度： | 毒藥 + 高階多重投射輔助(數量輔助) + 致命異常輔助 + |  活栓",
        tagClasses: "text-white | text-green-500 | text-red-500",
      },
      {
        text: "有彈炸之毒藥後： | 毒藥 + 高階多重投射輔助(數量輔助) + 高階齊射(數量輔助) + |  活栓",
        tagClasses: "text-white | text-green-500 | text-red-500",
      },
      {
        text: "六連優先度： | 毒藥(異變) + 高階多重投射輔助(數量輔助) + 高階齊射(數量輔助) + 致命異常輔助 + 猛毒投射物 + 虛空操縱 | 或 | 無邊異能",
        tagClasses: "text-white | text-green-500 | text-white | text-blue-500",
      },
    ],
    memo: ["缺魔力先串活栓，等無情昇華拿追獵三秒回三充能再裝第二個數量輔助"],
  },
  {
    chapter: "Act 8",
    content: [],
    memo: [
      "60 等後使用不朽生命藥劑洗出增加恢復量(66%)及減少恢復率，之後就可單生命藥劑配四瓶功能藥劑使用。",
      "此流派裝備需求少(無法用武器)，只須注意生命抗性換裝。",
    ],
    images: [],
  },
];

export default talentData;
