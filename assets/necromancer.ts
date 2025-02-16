const talentData = [
  {
    chapter: "Act 1",
    content: [
      {
        text: "冰霜脈衝 + 秘能波動輔助",
        tagClasses: "text-blue-500",
      },
      {
        text: "拿完跑水後",
        tagClasses: "text-white",
      },
      {
        text: "召喚幻影輔助 | + 神聖火舌圖騰 + | 燃燒輔助",
        tagClasses: "text-blue-500 | text-red-500 | text-blue-500",
      },
      {
        text: "烈焰之牆",
        tagClasses: "text-blue-500",
      },
      {
        text: "霜濂之瞬 + 秘能波動輔助 | (只需 2 等)",
        tagClasses: "text-blue-500 | text-white",
      },
      {
        text: "寒霜爆 + 秘能波動輔助",
        tagClasses: "text-blue-500",
      },
      {
        text: "打完船長後",
        tagClasses: "text-white",
      },
      {
        text: "赦免 + | 附加冰冷傷害 + | 附加閃電傷害",
        tagClasses: "text-red-500 | text-green-500 | text-blue-500",
      },
      {
        text: "丟掉 | 冰霜脈衝 | 神聖火舌圖騰 | 烈焰之牆 | 寒霜爆",
        tagClasses:
          "pr-2 | pr-2 text-blue-500 | pr-2 text-red-500 | pr-2 text-blue-500 | text-blue-500",
      },
    ],
    images: [
      {
        type: "tip",
        src: "/images/tip1.png",
        alt: "talent",
        className: "mx-auto mt-4 block",
      },
      {
        type: "tip",
        src: "/images/tip2.png",
        alt: "talent",
        className: "mx-auto mt-4 block",
      },
      {
        type: "build",
        src: "/images/build1.png",
        alt: "talent",
        className: "mx-auto mt-4 block",
      },
    ],
    memo: [],
  },
  {
    chapter: "Act 2",
    content: [
      {
        text: "拿到邪影寶石後",
        tagClasses: "text-white",
      },
      {
        text: "純淨之捷 + | 附加閃電傷害 | (附加冰冷傷害) + | 幻影召喚輔助",
        tagClasses:
          "text-red-500 | text-blue-500 | text-green-500 | text-blue-500",
      },
      {
        text: "閃電之捷",
        tagClasses: "text-blue-500",
      },
      {
        text: "跑完織網者巢穴",
        tagClasses: "text-white",
      },
      {
        text: "褻瀆 + | 秘能波動輔助 + 快速施放",
        tagClasses: "ml-5 text-green-500 | ml-5 text-blue-500",
      },
    ],
    images: [],
    memo: [],
  },
  {
    chapter: "Act 3",
    content: [
      {
        text: "打格拉維奇將軍後",
        tagClasses: "text-white",
      },
      {
        text: "脆弱",
        tagClasses: "text-red-500",
      },
      {
        text: "號召 喚醒幽魂(河道抓冥河銀背獸)",
        tagClasses: "text-blue-500",
      },
      {
        text: "解完圖書館黃金之頁",
        tagClasses: "text-white",
      },
      {
        text: "純淨之捷 + | 豢養狂熱 + 召喚幻影輔助 + | 癱瘓輔助",
        tagClasses: "text-red-500 | text-blue-500 | text-red-500",
      },
      {
        text: "重盾衝鋒 or 躍擊 + | 快速攻擊",
        tagClasses: "text-red-500 | text-green-500",
      },
      {
        text: "堅定 | (點完光環圈可開)",
        tagClasses: "text-red-500 | text-white",
      },
    ],
    images: [],
    memo: [],
  },
  // {
  //   chapter: "Default",
  //   content: [
  //     {
  //       text: "洞色連線不夠不用強求",
  //       tagClasses: "text-right text-3xl",
  //     },
  //     {
  //       text: "打福爾拿旗子 => 開啟礦坑門後",
  //       tagClasses: "text-white",
  //     },
  //     {
  //       text: "食腐魔像 + 豢養狂熱 + | 癱瘓輔助",
  //       tagClasses: "text-blue-500 | text-red-500",
  //     },
  //     {
  //       text: "赦免 + | 召喚幻影輔助 + 附加閃電傷害 + 快速施放",
  //       tagClasses: "text-red-500 | text-blue-500",
  //     },
  //     {
  //       text: "純淨之捷",
  //       tagClasses: "text-red-500",
  //     },
  //     {
  //       text: "喚醒幽魂 + 召喚生命輔助",
  //       tagClasses: "text-blue-500",
  //     },
  //     {
  //       text: "霜濂之瞬/ | 重盾衝鋒 or 躍擊 + | 快速攻擊/ | 號召",
  //       tagClasses:
  //         "text-blue-500 | text-red-500 | text-green-500 | text-blue-500",
  //     },
  //   ],
  //   images: [
  //     {
  //       type: "build",
  //       src: "/images/build2.png",
  //       alt: "talent",
  //       className: "mx-auto mt-4 block",
  //     },
  //     {
  //       type: "build",
  //       src: "/images/build3.png",
  //       alt: "talent",
  //       className: "mx-auto mt-4 block",
  //     },
  //   ],
  //   memo: [],
  // },
];

export default talentData;
