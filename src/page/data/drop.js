export function getMapDrop(str) {
  var drops = []
  for (var i = 0; i < dropData.length; i++) {
    var item = dropData[i]
    if (str.indexOf(item.code) >= 0) {
      drops.push(item)
    }
  }
  return drops
}
export var dropData = [
  {
    "code" : 50001,
    "icon" : "https:\/\/img8.99.com\/yhkd\/syzs\/e_huobi_img_shuijing.png",
    "name" : "水晶",
    "description" : "参与冒险即可获得，可在冒险模式中进行消费"
  },
  {
    "code" : 50002,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/tili.png",
    "name" : "体力",
    "description" : "参与冒险之旅需要消耗体力，有体力了才好打怪兽"
  },
  {
    "code" : 50003,
    "icon" : "https:\/\/img6.99.com\/yhkd\/syzs\/e_huobi_img_jingpo.png",
    "name" : "英雄精华",
    "description" : "英雄分解可得，用于英雄技能升级"
  },
  {
    "code" : 50004,
    "icon" : "https:\/\/img7.99.com\/yhkd\/syzs\/e_huobi_img_junxian.png",
    "name" : "荣誉点",
    "description" : "参与混沌遗迹即可获得，可以用于荣誉商店消费"
  },
  {
    "code" : 50005,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/supar_exp.png",
    "name" : "特大经验药水",
    "description" : "喝了能增加英雄5000经验值，喝太多容易引起腹胀"
  },
  {
    "code" : 50006,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/exp.png",
    "name" : "冒险经验",
    "description" : "参与冒险即可获得，提高冒险等级可以提高英雄等级上限"
  },
  {
    "code" : 50007,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/e_huobi_img_moshi.png",
    "name" : "魔石",
    "description" : "参与冒险即可获得，可在冒险模式中进行消费"
  },
  {
    "code" : 50008,
    "icon" : "https:\/\/img6.99.com\/yhkd\/syzs\/e_huobi_img_jingji.png",
    "name" : "竞技场积分",
    "description" : "参与竞技场即可获得，可以用于竞技场商店消费"
  },
  {
    "code" : 50009,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/white_shoe.png",
    "name" : "随机白色鞋子",
    "description" : "随机获得一件白色品质鞋子"
  },
  {
    "code" : 50010,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/white_kuzi.png",
    "name" : "随机白色裤子",
    "description" : "随机获得一件白色品质裤子"
  },
  {
    "code" : 50011,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/white_cloth.png",
    "name" : "随机白色胸甲",
    "description" : "随机获得一件白色品质胸甲"
  },
  {
    "code" : 50012,
    "icon" : "https:\/\/img5.99.com\/yhkd\/syzs\/white_weapon.png",
    "name" : "随机白色长剑",
    "description" : "随机获得一件白色品质长剑"
  },
  {
    "code" : 50013,
    "icon" : "0",
    "name" : "随机白色项链",
    "description" : "随机获得一件白色品质项链"
  },
  {
    "code" : 50014,
    "icon" : "0",
    "name" : "随机白色戒指",
    "description" : "随机获得一件白色品质戒指"
  },
  {
    "code" : 50015,
    "icon" : "https:\/\/img7.99.com\/yhkd\/syzs\/blue_shoe.png",
    "name" : "随机蓝色鞋子",
    "description" : "随机获得一件蓝色品质鞋子"
  },
  {
    "code" : 50016,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/bule_kuzi.png",
    "name" : "随机蓝色裤子",
    "description" : "随机获得一件蓝色品质裤子"
  },
  {
    "code" : 50017,
    "icon" : "https:\/\/img6.99.com\/yhkd\/syzs\/blue_cloth.png",
    "name" : "随机蓝色胸甲",
    "description" : "随机获得一件蓝色品质胸甲"
  },
  {
    "code" : 50018,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/blue_weapon.png",
    "name" : "随机蓝色长剑",
    "description" : "随机获得一件蓝色品质长剑"
  },
  {
    "code" : 50019,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/blue_necklace.png",
    "name" : "随机蓝色项链",
    "description" : "随机获得一件蓝色品质项链"
  },
  {
    "code" : 50020,
    "icon" : "https:\/\/img8.99.com\/yhkd\/syzs\/blue_ring.png",
    "name" : "随机蓝色戒指",
    "description" : "随机获得一件蓝色品质戒指"
  },
  {
    "code" : 50021,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/rare_shoe.png",
    "name" : "随机紫色鞋子",
    "description" : "随机获得一件紫色品质鞋子"
  },
  {
    "code" : 50022,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/rare_kuzi.png",
    "name" : "随机紫色裤子",
    "description" : "随机获得一件紫色品质裤子"
  },
  {
    "code" : 50023,
    "icon" : "https:\/\/img8.99.com\/yhkd\/syzs\/rare_cloth.png",
    "name" : "随机紫色胸甲",
    "description" : "随机获得一件紫色品质胸甲"
  },
  {
    "code" : 50024,
    "icon" : "https:\/\/img6.99.com\/yhkd\/syzs\/rare_weapon.png",
    "name" : "随机紫色长剑",
    "description" : "随机获得一件紫色品质长剑"
  },
  {
    "code" : 50025,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/rare_necklace.png",
    "name" : "随机紫色项链",
    "description" : "随机获得一件紫色品质项链"
  },
  {
    "code" : 50026,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/rare_ring.png",
    "name" : "随机紫色戒指",
    "description" : "随机获得一件紫色品质戒指"
  },
  {
    "code" : 50027,
    "icon" : "https:\/\/img5.99.com\/yhkd\/syzs\/gold_shoe.png",
    "name" : "随机金色鞋子碎片",
    "description" : "随机获得若干金色品质的鞋子碎片"
  },
  {
    "code" : 50028,
    "icon" : "https:\/\/img7.99.com\/yhkd\/syzs\/gold_kuzi.png",
    "name" : "随机金色裤子碎片",
    "description" : "随机获得若干金色品质的裤子碎片"
  },
  {
    "code" : 50029,
    "icon" : "https:\/\/img4.99.com\/yhkd\/syzs\/gold_cloth.png",
    "name" : "随机金色胸甲碎片",
    "description" : "随机获得若干金色品质的胸甲碎片"
  },
  {
    "code" : 50030,
    "icon" : "https:\/\/img8.99.com\/yhkd\/syzs\/gold_weapon.png",
    "name" : "随机金色长剑碎片",
    "description" : "随机获得若干金色品质的长剑碎片"
  },
  {
    "code" : 50031,
    "icon" : "https:\/\/img9.99.com\/yhkd\/syzs\/gold_necklace.png",
    "name" : "随机金色项链碎片",
    "description" : "随机获得若干金色品质的项链碎片"
  },
  {
    "code" : 50032,
    "icon" : "https:\/\/img6.99.com\/yhkd\/syzs\/gold_ring.png",
    "name" : "随机金色戒指碎片",
    "description" : "随机获得若干金色品质的戒指碎片"
  }
]
