
import { PrismaClient, ProjectCategory, ProjectStatus,  } from '@prisma/client'

const prisma = new PrismaClient()

const projectsData = [
  // Architecture Projects
  {
    id: 'arch-001',
    title: '揚州京華城商業步行街',
    description: '揚州京華城商業步行街設計項目，融合現代商業空間與傳統文化元素',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%89%AC%E5%B7%9E2-vI05vKpR7HnrN5LXzcj2AiuxDzHK2w.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%89%AC%E5%B7%9E2-vI05vKpR7HnrN5LXzcj2AiuxDzHK2w.png'
    ],
    year: 2023,
    location: 'Yangzhou Commercial District',
    city: '扬州',
    client: '京华城集团',
    architect: 'JustArchi Design',
    area: '15,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '揚州京華城商業步行街位於揚州市核心商業區，是一個集購物、餐飲、娛樂於一體的現代化商業綜合體。設計融合了揚州傳統園林文化與現代商業空間理念，創造出獨特的城市商業體驗空間。',
    concept: '設計以"園林商街"為核心概念，將揚州古典園林的空間營造手法運用到現代商業空間中，通過迂迴曲折的動線設計、虛實相間的空間層次，以及精心設置的景觀節點，營造出步移景異的購物體驗。建築外立面採用現代材料演繹傳統元素，玻璃幕牆與石材的結合既保持了現代感，又呼應了揚州的文化底蘊。',
    features: [
      '融合傳統園林空間佈局理念',
      '創新性的步行街動線設計',
      '現代材料演繹傳統建築語彙',
      '多層次的商業空間體驗',
      '可持續發展的綠色建築技術'
    ],
    tags: ['商業建築', '步行街設計', '文化融合', '城市更新'],
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: 'arch-002',
    title: '上海世博會阿曼館',
    description: '2010年上海世博會阿曼國家館設計，展現阿曼傳統文化與現代建築的完美融合',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%96%E5%8D%9A-JYp0UcEuzZkaW50W3ldDlztwAlY3jn.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%96%E5%8D%9A-JYp0UcEuzZkaW50W3ldDlztwAlY3jn.png'
    ],
    year: 2010,
    location: 'Shanghai Expo Oman Pavilion',
    city: '上海',
    client: '阿曼蘇丹國政府',
    architect: 'JustArchi Design',
    area: '3,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '阿曼館是2010年上海世博會上極具特色的國家館之一，設計靈感來源於阿曼傳統建築中的庭院空間和伊斯蘭建築幾何美學。建築以白色為主調，簡潔而優雅，完美詮釋了阿曼文化的精髓。',
    concept: '設計概念源自阿曼傳統建築中的"Sahn"（庭院）空間，通過現代建築語言重新詮釋傳統阿拉伯建築的空間精神。建築採用模組化設計，由多個幾何體塊組合而成，形成豐富的光影變化。白色的外立面不僅體現了阿曼建築的傳統色彩，也在炎熱的上海夏季提供了良好的熱反射效果。內部空間通過中庭的設置，引入自然光線，營造出寧靜而神聖的氛圍。',
    features: [
      '現代演繹阿曼傳統庭院空間',
      '幾何模組化的建築構成',
      '純淨的白色建築語言',
      '自然光線的巧妙運用',
      '文化展示與建築空間的完美結合'
    ],
    tags: ['世博建築', '文化建築', '國際項目', '傳統與現代'],
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: 'arch-003',
    title: '鄭州城市綜合體',
    description: '鄭州新區大型城市綜合體項目，打造集辦公、商業、居住於一體的城市新地標',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E9%83%91%E5%B7%9E-FDqRYPcaLG5DWsVpjEFPjmbrY4mieT.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E9%83%91%E5%B7%9E-FDqRYPcaLG5DWsVpjEFPjmbrY4mieT.png'
    ],
    year: 2022,
    location: 'Zhengzhou Urban Complex',
    city: '郑州',
    client: '鄭州城投集團',
    architect: 'JustArchi Design',
    area: '120,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '鄭州城市綜合體項目位於鄭州市新區核心地段，是一個集高端辦公、精品商業、豪華酒店和服務式公寓於一體的大型城市綜合開發項目。項目致力於打造鄭州新的城市地標和商務中心。',
    concept: '設計以"城市客廳"為核心理念，通過垂直城市的概念，將不同功能有機整合在統一的建築群中。建築採用現代簡約的設計語言，通過體塊的穿插和錯落，形成豐富的城市天際線。裙樓部分設計為開放式商業街區，與城市街道無縫銜接，塔樓部分則通過玻璃幕牆和金屬材料的運用，展現出現代都市的時尚感。項目還特別注重可持續發展，採用了多項綠色建築技術。',
    features: [
      '多功能城市綜合體設計',
      '垂直城市空間組織',
      '開放式裙樓商業設計',
      '現代簡約的建築語言',
      '綠色建築技術應用'
    ],
    tags: ['城市綜合體', '辦公建築', '商業建築', '現代建築'],
    isFeatured: false,
    sortOrder: 3
  },
  {
    id: 'arch-004',
    title: '蘇州河城市設計',
    description: '蘇州河濱水區域城市設計項目，重塑城市水岸空間，打造宜人的濱水生活環境',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8B%8F%E5%B7%9E-X20w3X5FeCjxY9lypW631N5gtuSECq.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8B%8F%E5%B7%9E-X20w3X5FeCjxY9lypW631N5gtuSECq.png'
    ],
    year: 2021,
    location: 'Suzhou River Urban Design',
    city: '上海',
    client: '上海市城市規劃局',
    architect: 'JustArchi Design',
    area: '50,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '蘇州河城市設計項目旨在重新激活蘇州河沿岸的城市空間，通過精心的規劃設計，將這一歷史悠久的河道打造成為上海市民休閒娛樂和文化交流的重要場所。',
    concept: '設計以"河韻新生"為主題，通過對蘇州河沿岸空間的重新設計，創造出層次豐富的濱水體驗。項目採用分段式設計策略，每個段落都有其獨特的主題和功能定位。通過步道系統、觀景平台、休憩空間和文化設施的有機組合，形成連續而富有變化的濱水景觀帶。設計特別注重歷史文脈的保護和傳承，在改造中保留和展示了蘇州河的工業遺產和文化記憶。',
    features: [
      '分段式濱水空間設計',
      '歷史文脈的保護與傳承',
      '多層次的濱水體驗空間',
      '生態修復與環境改善',
      '公共藝術與文化設施融合'
    ],
    tags: ['城市設計', '濱水空間', '歷史保護', '生態修復'],
    isFeatured: false,
    sortOrder: 4
  },

  // Interior Projects
  {
    id: 'int-001',
    title: '法國哈金森 Fab House',
    description: '法國哈金森蘇州工廠展示中心室內設計，展現工業美學與現代設計的完美結合',
    category: ProjectCategory.INTERIOR,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B3%95%E5%9B%BD-Da2pkjjvh2zFIuwERVyYpfANTsu0Xi.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B3%95%E5%9B%BD-Da2pkjjvh2zFIuwERVyYpfANTsu0Xi.png'
    ],
    year: 2023,
    location: 'Hutchinson Fab House, Suzhou',
    city: '苏州',
    client: '法國哈金森集團',
    architect: 'JustArchi Design',
    area: '2,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '哈金森Fab House是法國哈金森集團在蘇州工廠的展示中心和創新實驗室，室內設計需要體現企業的創新精神和工業美學，同時營造出適合創意工作和商務接待的專業環境。',
    concept: '設計以"工業詩學"為核心概念，將哈金森集團的工業基因與現代設計美學相結合。空間採用開放式佈局，通過工業材料如金屬、混凝土和玻璃的運用，營造出現代工業風格的室內環境。設計特別注重功能性和靈活性，通過可移動隔斷和多功能家具，實現空間的多樣化使用。照明設計採用軌道燈和工業風格燈具，既滿足了功能需求，又增強了空間的工業美感。',
    features: [
      '開放式工業風格設計',
      '靈活的多功能空間佈局',
      '工業材料的現代運用',
      '創新的照明設計方案',
      '企業文化的空間化表達'
    ],
    tags: ['工業風設計', '企業展示空間', '現代室內設計', '創新實驗室'],
    isFeatured: true,
    sortOrder: 5
  },
  {
    id: 'int-002',
    title: '桃園崇德佛堂',
    description: '桃園崇德佛堂室內空間設計，營造寧靜莊嚴的宗教氛圍與現代功能需求的平衡',
    category: ProjectCategory.INTERIOR,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%A1%83%E5%9B%AD-3zEzdhu9daQCZqhf6HxjoIjmVbfvFA.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%A1%83%E5%9B%AD-3zEzdhu9daQCZqhf6HxjoIjmVbfvFA.png'
    ],
    year: 2022,
    location: 'Taoyuan Chongde Buddha Hall',
    city: '桃園',
    client: '崇德佛堂管理委員會',
    architect: 'JustArchi Design',
    area: '800㎡',
    status: ProjectStatus.COMPLETED,
    brief: '桃園崇德佛堂是一個集宗教活動、文化教育和社區服務於一體的現代佛教空間。室內設計需要在保持傳統宗教氛圍的同時，滿足現代使用功能和安全標準的要求。',
    concept: '設計以"禪意現代"為指導思想，通過簡約而莊重的設計語言，營造出適合冥想和修行的寧靜環境。空間採用對稱式佈局，體現佛教建築的莊嚴感。材料選擇上以天然木材、石材為主，配以柔和的間接照明，創造出溫馨而神聖的氛圍。設計特別注重聲學環境的營造，通過吸音材料和空間形態的設計，確保誦經和講法活動的聲學效果。功能區域包括大雄寶殿、講經堂、禪修室和接待區等，各區域既相對獨立又有機聯繫。',
    features: [
      '傳統與現代的完美融合',
      '對稱式莊嚴空間佈局',
      '天然材料的溫馨運用',
      '專業的聲學環境設計',
      '多功能宗教空間整合'
    ],
    tags: ['宗教建築', '室內設計', '傳統文化', '現代功能'],
    isFeatured: false,
    sortOrder: 6
  },

  // Planning Projects
  {
    id: 'plan-001',
    title: '莆田白塘湖旅遊規劃',
    description: '莆田白塘湖風景區旅遊總體規劃，打造集生態保護、文化傳承、休閒旅遊於一體的綜合性景區',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8E%86%E7%94%B0%E7%99%BD%E5%A1%98%E6%B9%96%E6%97%85%E9%81%8A%E8%A6%8F%E5%8A%83-llbn0jaYYqFqH38kCjPN8Tjr4M52xI.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8E%86%E7%94%B0%E7%99%BD%E5%A1%98%E6%B9%96%E6%97%85%E9%81%8A%E8%A6%8F%E5%8A%83-llbn0jaYYqFqH38kCjPN8Tjr4M52xI.png'
    ],
    year: 2023,
    location: 'Putian Baitang Lake Tourism Plan',
    city: '莆田',
    client: '莆田市文化和旅遊局',
    architect: 'JustArchi Design',
    area: '1,200公頃',
    status: ProjectStatus.COMPLETED,
    brief: '白塘湖旅遊規劃項目旨在將莆田白塘湖地區打造成為福建省重要的生態旅遊目的地，通過合理的空間佈局和功能配置，實現生態保護與旅遊開發的和諧統一。',
    concept: '規劃以"湖光山色、文化莆田"為主題，通過"一湖三區五帶"的空間結構，構建完整的旅遊體系。一湖即白塘湖核心水體，三區包括生態保護區、文化展示區和休閒度假區，五帶則是環湖景觀帶、文化體驗帶、休閒娛樂帶、生態教育帶和服務配套帶。規劃特別注重莆田地方文化的挖掘和展示，通過景觀節點、建築小品和體驗活動，讓遊客深度感受莆田的歷史文化魅力。同時，規劃堅持生態優先原則，嚴格保護湖泊生態環境，實現可持續發展。',
    features: [
      '生態保護與旅遊開發並重',
      '地方文化的深度挖掘展示',
      '"一湖三區五帶"空間結構',
      '多元化旅遊體驗設計',
      '可持續發展理念貫穿始終'
    ],
    tags: ['旅遊規劃', '生態保護', '文化旅遊', '可持續發展'],
    isFeatured: true,
    sortOrder: 7
  },
  {
    id: 'plan-002',
    title: '上海吳中路地鐵上蓋',
    description: 'TOD模式的綜合開發項目，以地鐵站為核心的混合用途城市開發規劃',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E5%90%B4%E4%B8%AD%E8%B7%AF-nEVBGrmzNZc5GtfSQnlO9gooWbKcDm.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E5%90%B4%E4%B8%AD%E8%B7%AF-nEVBGrmzNZc5GtfSQnlO9gooWbKcDm.png'
    ],
    year: 2022,
    location: 'Shanghai Wuzhong Rd Metro TOD',
    city: '上海',
    client: '上海地鐵集團',
    architect: 'JustArchi Design',
    area: '15公頃',
    status: ProjectStatus.COMPLETED,
    brief: '吳中路地鐵上蓋項目是上海市重要的TOD（Transit-Oriented Development）示範項目，旨在通過地鐵站點周邊的高密度混合開發，實現公共交通導向的可持續城市發展模式。',
    concept: '規劃以"立體城市"為核心理念，通過垂直分層和水平分區的空間組織策略，在有限的土地上實現住宅、辦公、商業、文化等多種功能的有機整合。設計採用"站城一體化"的設計策略，將地鐵站與上蓋建築無縫連接，形成立體的城市空間網絡。項目特別注重步行友好性設計，通過連廊系統、地下空間和公共廣場的設置，為市民提供便捷舒適的步行環境。綠色建築技術的應用和雨水管理系統的設計，體現了項目對環境可持續性的重視。',
    features: [
      'TOD模式的典型應用',
      '站城一體化設計策略',
      '立體化城市空間組織',
      '步行友好的環境設計',
      '綠色可持續技術應用'
    ],
    tags: ['TOD開發', '綜合體規劃', '公共交通', '城市更新'],
    isFeatured: false,
    sortOrder: 8
  },
  {
    id: 'plan-003',
    title: '萬華區政中心規劃',
    description: '台北萬華區新政務中心總體規劃，打造現代化、人性化的政務服務環境',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%87%E8%8A%B1-WuoGT9SHBP7Cl74np1Slvq8zgXUY7p.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%87%E8%8A%B1-WuoGT9SHBP7Cl74np1Slvq8zgXUY7p.png'
    ],
    year: 2021,
    location: 'Wanhua Municipal Center Plan',
    city: '台北',
    client: '台北市萬華區公所',
    architect: 'JustArchi Design',
    area: '5公頃',
    status: ProjectStatus.COMPLETED,
    brief: '萬華區政中心規劃項目旨在為萬華區創建一個集政務服務、文化展示、社區活動於一體的現代化區政中心，提升政府服務效率和市民滿意度。',
    concept: '規劃以"親民政府"為設計理念，通過開放透明的建築設計和人性化的空間配置，打破傳統政府建築的威嚴感，營造親和友善的政務環境。空間佈局採用"一軸兩翼"的結構，主軸為公共服務大廳和市民廣場，兩翼分別為辦公區和文化活動區。設計特別注重無障礙環境的營造，確保所有市民都能便利地享受政務服務。建築採用現代簡約的設計語言，通過大量玻璃和開放空間的運用，體現政府的透明度和開放性。景觀設計融入萬華地區的歷史文化元素，增強市民的歸屬感和認同感。',
    features: [
      '開放透明的政務環境設計',
      '"一軸兩翼"的空間佈局',
      '全面的無障礙環境設計',
      '現代簡約的建築語言',
      '融入地方文化的景觀設計'
    ],
    tags: ['政務建築', '公共建築', '城市規劃', '社區服務'],
    isFeatured: false,
    sortOrder: 9
  }
]

async function main() {
  console.log('開始種子數據插入...')
  
  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    })
    console.log(`已插入項目: ${project.title}`)
  }
  
  console.log('種子數據插入完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })