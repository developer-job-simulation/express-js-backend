import request from "supertest";

import { test } from "uvu";
import * as assert from "uvu/assert";
const req = request("http://localhost:3000/pokemon");

// Tests

test("Get Pokemon by ID", async () => {
  let res = await req.get("/482");
  assert.is(res.status, 200);
  assert.equal(res.body, {
    id: 482,
    name: { english: "Azelf", japanese: "アグノム", chinese: "亚克诺姆", french: "Créfadet" },
    type: ["Psychic"],
    base: { HP: 75, Attack: 125, Defense: 70, "Sp. Attack": 125, "Sp. Defense": 70, Speed: 115 },
  });
});

test("Get Pokemon by ID (Invalid Input)", async () => {
  let res = await req.get("/cow");
  assert.is(res.status, 400);
  assert.equal(res.body, { error: "Invalid ID" });
});

test("Get Pokemon by ID (Not Found)", async () => {
  let res = await req.get("/99999999");
  assert.is(res.status, 404);
  assert.equal(res.body, {
    error: "Not found",
  });
});

test("Get Pokemon by Name", async () => {
  let res = await req.get("/name/mew");
  assert.is(res.status, 200);
  assert.equal(res.body, {
    id: 151,
    name: { english: "Mew", japanese: "ミュウ", chinese: "梦幻", french: "Mew" },
    type: ["Psychic"],
    base: { HP: 100, Attack: 100, Defense: 100, "Sp. Attack": 100, "Sp. Defense": 100, Speed: 100 },
  });
});

test("Get Pokemon by Name (Not Found)", async () => {
  let res = await req.get("/name/webdevwithseb");
  assert.is(res.status, 404);
  assert.equal(res.body, {
    error: "Not found",
  });
});

test("Get Pokemon by Type", async () => {
  let res = await req.get("/type/fairy");
  assert.is(res.status, 200);
  assert.equal(res.body, [
    {
      id: 35,
      name: { english: "Clefairy", japanese: "ピッピ", chinese: "皮皮", french: "Mélofée" },
      type: ["Fairy"],
      base: { HP: 70, Attack: 45, Defense: 48, "Sp. Attack": 60, "Sp. Defense": 65, Speed: 35 },
    },
    {
      id: 36,
      name: { english: "Clefable", japanese: "ピクシー", chinese: "皮可西", french: "Mélodelfe" },
      type: ["Fairy"],
      base: { HP: 95, Attack: 70, Defense: 73, "Sp. Attack": 95, "Sp. Defense": 90, Speed: 60 },
    },
    {
      id: 39,
      name: { english: "Jigglypuff", japanese: "プリン", chinese: "胖丁", french: "Rondoudou" },
      type: ["Normal", "Fairy"],
      base: { HP: 115, Attack: 45, Defense: 20, "Sp. Attack": 45, "Sp. Defense": 25, Speed: 20 },
    },
    {
      id: 40,
      name: { english: "Wigglytuff", japanese: "プクリン", chinese: "胖可丁", french: "Grodoudou" },
      type: ["Normal", "Fairy"],
      base: { HP: 140, Attack: 70, Defense: 45, "Sp. Attack": 85, "Sp. Defense": 50, Speed: 45 },
    },
    {
      id: 122,
      name: { english: "Mr. Mime", japanese: "バリヤード", chinese: "魔墙人偶", french: "M. Mime" },
      type: ["Psychic", "Fairy"],
      base: { HP: 40, Attack: 45, Defense: 65, "Sp. Attack": 100, "Sp. Defense": 120, Speed: 90 },
    },
    {
      id: 173,
      name: { english: "Cleffa", japanese: "ピィ", chinese: "皮宝宝", french: "Mélo" },
      type: ["Fairy"],
      base: { HP: 50, Attack: 25, Defense: 28, "Sp. Attack": 45, "Sp. Defense": 55, Speed: 15 },
    },
    {
      id: 174,
      name: { english: "Igglybuff", japanese: "ププリン", chinese: "宝宝丁", french: "Toudoudou" },
      type: ["Normal", "Fairy"],
      base: { HP: 90, Attack: 30, Defense: 15, "Sp. Attack": 40, "Sp. Defense": 20, Speed: 15 },
    },
    {
      id: 175,
      name: { english: "Togepi", japanese: "トゲピー", chinese: "波克比", french: "Togepi" },
      type: ["Fairy"],
      base: { HP: 35, Attack: 20, Defense: 65, "Sp. Attack": 40, "Sp. Defense": 65, Speed: 20 },
    },
    {
      id: 176,
      name: { english: "Togetic", japanese: "トゲチック", chinese: "波克基古", french: "Togetic" },
      type: ["Fairy", "Flying"],
      base: { HP: 55, Attack: 40, Defense: 85, "Sp. Attack": 80, "Sp. Defense": 105, Speed: 40 },
    },
    {
      id: 183,
      name: { english: "Marill", japanese: "マリル", chinese: "玛力露", french: "Marill" },
      type: ["Water", "Fairy"],
      base: { HP: 70, Attack: 20, Defense: 50, "Sp. Attack": 20, "Sp. Defense": 50, Speed: 40 },
    },
    {
      id: 184,
      name: { english: "Azumarill", japanese: "マリルリ", chinese: "玛力露丽", french: "Azumarill" },
      type: ["Water", "Fairy"],
      base: { HP: 100, Attack: 50, Defense: 80, "Sp. Attack": 60, "Sp. Defense": 80, Speed: 50 },
    },
    {
      id: 209,
      name: { english: "Snubbull", japanese: "ブルー", chinese: "布鲁", french: "Snubbull" },
      type: ["Fairy"],
      base: { HP: 60, Attack: 80, Defense: 50, "Sp. Attack": 40, "Sp. Defense": 40, Speed: 30 },
    },
    {
      id: 210,
      name: { english: "Granbull", japanese: "グランブル", chinese: "布鲁皇", french: "Granbull" },
      type: ["Fairy"],
      base: { HP: 90, Attack: 120, Defense: 75, "Sp. Attack": 60, "Sp. Defense": 60, Speed: 45 },
    },
    {
      id: 280,
      name: { english: "Ralts", japanese: "ラルトス", chinese: "拉鲁拉丝", french: "Tarsal" },
      type: ["Psychic", "Fairy"],
      base: { HP: 28, Attack: 25, Defense: 25, "Sp. Attack": 45, "Sp. Defense": 35, Speed: 40 },
    },
    {
      id: 281,
      name: { english: "Kirlia", japanese: "キルリア", chinese: "奇鲁莉安", french: "Kirlia" },
      type: ["Psychic", "Fairy"],
      base: { HP: 38, Attack: 35, Defense: 35, "Sp. Attack": 65, "Sp. Defense": 55, Speed: 50 },
    },
    {
      id: 282,
      name: { english: "Gardevoir", japanese: "サーナイト", chinese: "沙奈朵", french: "Gardevoir" },
      type: ["Psychic", "Fairy"],
      base: { HP: 68, Attack: 65, Defense: 65, "Sp. Attack": 125, "Sp. Defense": 115, Speed: 80 },
    },
    {
      id: 298,
      name: { english: "Azurill", japanese: "ルリリ", chinese: "露力丽", french: "Azurill" },
      type: ["Normal", "Fairy"],
      base: { HP: 50, Attack: 20, Defense: 40, "Sp. Attack": 20, "Sp. Defense": 40, Speed: 20 },
    },
    {
      id: 303,
      name: { english: "Mawile", japanese: "クチート", chinese: "大嘴娃", french: "Mysdibule" },
      type: ["Steel", "Fairy"],
      base: { HP: 50, Attack: 85, Defense: 85, "Sp. Attack": 55, "Sp. Defense": 55, Speed: 50 },
    },
    {
      id: 439,
      name: { english: "Mime Jr.", japanese: "マネネ", chinese: "魔尼尼", french: "Mime Jr" },
      type: ["Psychic", "Fairy"],
      base: { HP: 20, Attack: 25, Defense: 45, "Sp. Attack": 70, "Sp. Defense": 90, Speed: 60 },
    },
    {
      id: 468,
      name: { english: "Togekiss", japanese: "トゲキッス", chinese: "波克基斯", french: "Togekiss" },
      type: ["Fairy", "Flying"],
      base: { HP: 85, Attack: 50, Defense: 95, "Sp. Attack": 120, "Sp. Defense": 115, Speed: 80 },
    },
    {
      id: 546,
      name: { english: "Cottonee", japanese: "モンメン", chinese: "木棉球", french: "Doudouvet" },
      type: ["Grass", "Fairy"],
      base: { HP: 40, Attack: 27, Defense: 60, "Sp. Attack": 37, "Sp. Defense": 50, Speed: 66 },
    },
    {
      id: 547,
      name: { english: "Whimsicott", japanese: "エルフーン", chinese: "风妖精", french: "Farfaduvet" },
      type: ["Grass", "Fairy"],
      base: { HP: 60, Attack: 67, Defense: 85, "Sp. Attack": 77, "Sp. Defense": 75, Speed: 116 },
    },
    {
      id: 669,
      name: { english: "Flabébé", japanese: "フラベベ", chinese: "花蓓蓓", french: "Flabébé" },
      type: ["Fairy"],
      base: { HP: 44, Attack: 38, Defense: 39, "Sp. Attack": 61, "Sp. Defense": 79, Speed: 42 },
    },
    {
      id: 670,
      name: { english: "Floette", japanese: "フラエッテ", chinese: "花叶蒂", french: "FLOETTE" },
      type: ["Fairy"],
      base: { HP: 54, Attack: 45, Defense: 47, "Sp. Attack": 75, "Sp. Defense": 98, Speed: 52 },
    },
    {
      id: 671,
      name: { english: "Florges", japanese: "フラージェス", chinese: "花洁夫人", french: "Florges" },
      type: ["Fairy"],
      base: { HP: 78, Attack: 65, Defense: 68, "Sp. Attack": 112, "Sp. Defense": 154, Speed: 75 },
    },
    {
      id: 682,
      name: { english: "Spritzee", japanese: "シュシュプ", chinese: "粉香香", french: "Fluvetin" },
      type: ["Fairy"],
      base: { HP: 78, Attack: 52, Defense: 60, "Sp. Attack": 63, "Sp. Defense": 65, Speed: 23 },
    },
    {
      id: 683,
      name: { english: "Aromatisse", japanese: "フレフワン", chinese: "芳香精", french: "Cocotine" },
      type: ["Fairy"],
      base: { HP: 101, Attack: 72, Defense: 72, "Sp. Attack": 99, "Sp. Defense": 89, Speed: 29 },
    },
    {
      id: 684,
      name: { english: "Swirlix", japanese: "ペロッパフ", chinese: "绵绵泡芙", french: "Sucroquin" },
      type: ["Fairy"],
      base: { HP: 62, Attack: 48, Defense: 66, "Sp. Attack": 59, "Sp. Defense": 57, Speed: 49 },
    },
    {
      id: 685,
      name: { english: "Slurpuff", japanese: "ペロリーム", chinese: "胖甜妮", french: "Cupcanaille" },
      type: ["Fairy"],
      base: { HP: 82, Attack: 80, Defense: 86, "Sp. Attack": 85, "Sp. Defense": 75, Speed: 72 },
    },
    {
      id: 700,
      name: { english: "Sylveon", japanese: "ニンフィア", chinese: "仙子伊布", french: "Nymphali" },
      type: ["Fairy"],
      base: { HP: 95, Attack: 65, Defense: 65, "Sp. Attack": 110, "Sp. Defense": 130, Speed: 60 },
    },
    {
      id: 702,
      name: { english: "Dedenne", japanese: "デデンネ", chinese: "咚咚鼠", french: "DEDENNE" },
      type: ["Electric", "Fairy"],
      base: { HP: 67, Attack: 58, Defense: 57, "Sp. Attack": 81, "Sp. Defense": 67, Speed: 101 },
    },
    {
      id: 703,
      name: { english: "Carbink", japanese: "メレシー", chinese: "小碎钻", french: "Strassie" },
      type: ["Rock", "Fairy"],
      base: { HP: 50, Attack: 50, Defense: 150, "Sp. Attack": 50, "Sp. Defense": 150, Speed: 50 },
    },
    {
      id: 707,
      name: { english: "Klefki", japanese: "クレッフィ", chinese: "钥圈儿", french: "Trousselin" },
      type: ["Steel", "Fairy"],
      base: { HP: 57, Attack: 80, Defense: 91, "Sp. Attack": 80, "Sp. Defense": 87, Speed: 75 },
    },
    {
      id: 716,
      name: { english: "Xerneas", japanese: "ゼルネアス", chinese: "哲尔尼亚斯", french: "Xerneas" },
      type: ["Fairy"],
      base: { HP: 126, Attack: 131, Defense: 95, "Sp. Attack": 131, "Sp. Defense": 98, Speed: 99 },
    },
    {
      id: 719,
      name: { english: "Diancie", japanese: "ディアンシー", chinese: "蒂安希", french: "Diancie" },
      type: ["Rock", "Fairy"],
      base: { HP: 50, Attack: 100, Defense: 150, "Sp. Attack": 100, "Sp. Defense": 150, Speed: 50 },
    },
    {
      id: 730,
      name: { english: "Primarina", japanese: "アシレーヌ", chinese: "西狮海壬", french: "Oratoria" },
      type: ["Water", "Fairy"],
      base: { HP: 80, Attack: 74, Defense: 74, "Sp. Attack": 126, "Sp. Defense": 116, Speed: 60 },
    },
    {
      id: 742,
      name: { english: "Cutiefly", japanese: "アブリー", chinese: "萌虻", french: "Bombydou" },
      type: ["Bug", "Fairy"],
      base: { HP: 40, Attack: 45, Defense: 40, "Sp. Attack": 55, "Sp. Defense": 40, Speed: 84 },
    },
    {
      id: 743,
      name: { english: "Ribombee", japanese: "アブリボン", chinese: "蝶结萌虻", french: "Rubombelle" },
      type: ["Bug", "Fairy"],
      base: { HP: 60, Attack: 55, Defense: 60, "Sp. Attack": 95, "Sp. Defense": 70, Speed: 124 },
    },
    {
      id: 755,
      name: { english: "Morelull", japanese: "ネマシュ", chinese: "睡睡菇", french: "Spododo" },
      type: ["Grass", "Fairy"],
      base: { HP: 40, Attack: 35, Defense: 55, "Sp. Attack": 65, "Sp. Defense": 75, Speed: 15 },
    },
    {
      id: 756,
      name: { english: "Shiinotic", japanese: "マシェード", chinese: "灯罩夜菇", french: "Lampignon" },
      type: ["Grass", "Fairy"],
      base: { HP: 60, Attack: 45, Defense: 80, "Sp. Attack": 90, "Sp. Defense": 100, Speed: 30 },
    },
    {
      id: 764,
      name: { english: "Comfey", japanese: "キュワワー", chinese: "花疗环环", french: "Guérilande" },
      type: ["Fairy"],
      base: { HP: 51, Attack: 52, Defense: 90, "Sp. Attack": 82, "Sp. Defense": 110, Speed: 100 },
    },
    {
      id: 778,
      name: { english: "Mimikyu", japanese: "ミミッキュ", chinese: "谜拟Ｑ", french: "Denticrisse" },
      type: ["Ghost", "Fairy"],
      base: { HP: 55, Attack: 90, Defense: 80, "Sp. Attack": 50, "Sp. Defense": 105, Speed: 96 },
    },
    {
      id: 785,
      name: { english: "Tapu Koko", japanese: "カプ・コケコ", chinese: "卡璞・鸣鸣", french: "Tokopiyon" },
      type: ["Electric", "Fairy"],
      base: { HP: 70, Attack: 115, Defense: 85, "Sp. Attack": 95, "Sp. Defense": 75, Speed: 130 },
    },
    {
      id: 786,
      name: { english: "Tapu Lele", japanese: "カプ・テテフ", chinese: "卡璞・蝶蝶", french: "Tokotoro" },
      type: ["Psychic", "Fairy"],
      base: { HP: 70, Attack: 85, Defense: 75, "Sp. Attack": 130, "Sp. Defense": 115, Speed: 95 },
    },
    {
      id: 787,
      name: { english: "Tapu Bulu", japanese: "カプ・ブルル", chinese: "卡璞・哞哞", french: "Tokopisco" },
      type: ["Grass", "Fairy"],
      base: { HP: 70, Attack: 130, Defense: 115, "Sp. Attack": 85, "Sp. Defense": 95, Speed: 75 },
    },
    {
      id: 788,
      name: { english: "Tapu Fini", japanese: "カプ・レヒレ", chinese: "卡璞・鳍鳍", french: "Cosmog" },
      type: ["Water", "Fairy"],
      base: { HP: 70, Attack: 75, Defense: 115, "Sp. Attack": 95, "Sp. Defense": 130, Speed: 85 },
    },
    {
      id: 801,
      name: { english: "Magearna", japanese: "マギアナ", chinese: "玛机雅娜", french: "Marshadow" },
      type: ["Steel", "Fairy"],
      base: { HP: 80, Attack: 95, Defense: 115, "Sp. Attack": 130, "Sp. Defense": 115, Speed: 65 },
    },
  ]);
});

test("Get Pokemon by Type (Invalid Type)", async () => {
  let res = await req.get("/type/webdevwithseb");
  assert.is(res.status, 400);
  assert.equal(res.body, {
    error: "Bad request",
  });
});

test("Get Pokemon by HP (Success)", async () => {
  let res = await req.get("/hp?[gte]=200&[gt]=250");
  assert.is(res.status, 200);
  assert.equal(res.body, [
    {
      id: 242,
      name: { english: "Blissey", japanese: "ハピナス", chinese: "幸福蛋", french: "Leuphorie" },
      type: ["Normal"],
      base: { HP: 255, Attack: 10, Defense: 10, "Sp. Attack": 75, "Sp. Defense": 135, Speed: 55 },
    },
  ]);
});

test("Get Pokemon by HP (Failure)", async () => {
  let res = await req.get("/hp?[gte]=200&[gt]=250&[lt]=20");
  assert.is(res.status, 404);
  assert.equal(res.body, { error: "Not found" });
});

test("Get Pokemon by HP (Invalid Comparator)", async () => {
  let res = await req.get("/hp?[badComparator]=200");
  assert.is(res.status, 400);
  assert.equal(res.body, { error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]' });
});

test.run();
