const TokenizeBoolean = require('./tokenize-boolean');


// const tstr = 'มมิตซูบิชิ OR มิตซุบิชิ OR "มิต ซู บิ ชิ" OR "มิต ซุบิ ชิ"';
// const tstr2 = '"นิสสันจู๊ค" NOT "Juke Box" AND car OR KNOR';


//details = '("台新" AND "富裕 會員")';
//details = '((DBS OR "星展") AND (不能登入 OR 不能领 OR 失望 OR 慢 OR 抱怨 OR 拒绝 OR 故障 OR 未回应 OR 未授权 OR 没效率 OR 没解决 OR 烂 OR 等很久 OR 解决不了 OR 资料外泄 OR 资料外流 OR 麻烦))';
//details = '"Vivek Kumar" OR ("Assistant General" OR "助理总干事" OR "助理總幹事" AND ("National Trades Union Congress" OR "國家工會聯盟大會" OR NTUC OR "#NTUC" OR "職總" OR "职总" OR "@NTUC" OR "@ntuc"))';
// details = '("Dolphin Island" OR "เกาะ โลมา" OR "海豚岛" OR "海豚島" OR "イルカ島" OR "돌고래 섬" OR "डॉल्फिन द्वीप" OR "Pulau Dolfin" OR "டால்பின் தீவு")  NOT (Italy OR #Italy)';
// details = '(("華僑永亨" OR "匯瘋" OR "匯風" OR "滙窿") AND (貸款實際年利率 OR 貿易 OR 貿易營運資金 OR 貿易融資 OR 貿易金融 OR 資本市場 OR 資產管理 OR 資金池 OR 資金虛擬集中 OR 跟單托收 OR 跨行資金歸集 OR 進口融資 OR 金融貿易 OR 銀團貸款 OR 銀行保管 OR 銀行團貸款 OR 銀行投資業務 OR 銀行擔保 OR 銀行結匯 OR 銀行結算 OR 銀行透支 OR 電子商務 OR 香港業務經理 OR 香港經理 OR AsianInsights OR ConsumerOutlook OR DBSView OR Economygrowth OR Economyprediction OR FederalReserve OR FocusSelection OR Investmentdecisions OR MarketResearch OR MarketSentiments OR PortfolioAnalysis OR PortfolioManagement OR ProductInsights OR ProductRecommendations OR Researchpublications OR "#AsianInsights" OR "#DBSYES" OR 一帶一路 OR 亞洲思維 OR 亞洲灼見 OR 亞幣 OR 亞洲匯市 OR 外匯投資 OR 投資展望 OR 日圓 OR 景氣 OR 歐元 OR 經濟 OR 美元 OR 股市 OR 風險性資產)) OR (("World best digital bank" OR "World\'s best digital bank" OR "最佳數碼銀行") AND ("Eddie Hui" OR "Erwin Huang" OR "GLO travel" OR "SK Lam" OR "business class" OR JEMS OR SME OR Semk OR accelerator OR comic OR iWealth OR story OR 企業賬戶 OR 創業 OR 創辦人 OR 基金會 OR 故事 OR 海外轉賬 OR 漫畫 OR 理想人生 OR 理財服務 OR 社創 OR 精彩人生 OR 精簡理財 OR 莊偉忠 OR 許夏林 OR 退休 OR 銀行服務 OR 馬露明 OR 黃岳永))';
// details = 'มมิตซูบิชิ OR มิตซุบิชิ OR "มิต ซู บิ ชิ" OR "มิต ซุบิ ชิ"';
// details = 'มิตซูบิชิ OR มิตซุบิชิ';
// details = 'hello"AND ';
// details = '中国父亲的情书目前有以下可下载的格式：1.信件大小（8 1/2“x 11”）繁体中文2页PDF ...';
// details = ' "UNILAND" ';
// details = '( ("#DBS" OR ("#星展" OR "#星 展") OR "# 星 展" OR "@DBS" OR ("@星展" OR "@ 星 展") OR "@ 星 展" OR "DBS" OR "星 展") AND ("Social Enterprise Grant" OR "社會 企業 獎勵 計劃") )';
// details = 'car AND publications:bbc.co.in';
// details = '("Nissan Juke" OR "นิสสัน จู๊ค" OR "Juke" OR "จู๊ค" OR "จุ๊ค") AND ((("ราคา" OR "มูลค่า") AND ("ขายต่อ" OR "มือสอง" OR "ไม่ตก" OR "เทิร์น" OR "Turn" OR "ตก" OR "ฮวบ" OR "เต้นท์" OR "Tent" OR "เต๊นท์" OR "ลง" OR "ฝากขาย")) OR "ขายง่าย" OR "ขายคล่อง")';
// details = '"นิสสัน จู๊ค" OR "Juke Box" AND car OR KNOR';

//details = 'his name is unknown';
//details = `RT @itonooyy: พรีวิวรายการ Taxi มาแล้วว เตรียมพบกับสกิลวาไรตี้ขั้นเทพของหนุ่มๆ ทั้ง 5 คน ที่จะมาทำให้เราหัวเราะจนท้องแข็ง ในวันที่ 12 ก.ค.…`;
// details = `#อาชีพไหนก็ออกได้
// #ใช้เงินน้อย
// #ผ่อนสบาย
// #ปรึกษาฟรีจ้า`;
// details = `🎉🎉แคมเปญดี ๆตอนรับ เดือน มิ.ย กับสยามนิสสันมหานคร
// มาแล้วค่ะ🎉🎉
// 🌟ใช้เงินออกรถเพียง 15,999 บาท ผ่านง่าย ออกได้จริง ที่ไหนไม่ได้มาทางนี้ "ตรงตามเงื่อนไข" รับรถได้เลย ทราบผลและรับรถได้ภายใน 1-3 วัน กรุณาอ่านรายละเอียดด้านล่างให้ครบถ้วน
// ✅ บริษัทฟรีดาวน์ให้ 15% ค่ะ (รวมทุกอย่างแล้ว 15,999 บาท`; 
//details = ':(';
//details = ':)';
//details = '#CircusSocial';
//details = '#CircusSocial is introducing one of many new features on our platform, 20/Twenty- the…🚘';
//details = "Audi's OR \"BMW's\"";
//details = "Audis'";
//details = '[DBS]';
//details = 'BMW: OR BMW; OR BMW. OR {BMW}';
//details = '"Max+" OR "Coke +" OR "C-class" OR "Audi_D"';
//details = '(car/bike) OR theatre';
//details = 'Organi?ation';
//details = 'post-author.name:"mcdonalds"';
//details = 'post.url:cnn';
//details = 'Audi,BMW,Mercedes';
//details = '(Nissan OR "จู๊ค จู๊ค") -Car';
//details = 'Audi +Car';
//details = '"Nissan Juke"~5 OR "จู๊ค จู๊ค"~5';
//details = '"Nissan Juke" OR นิ ส สัน จู๊ค OR "Ju ke" OR "จู๊ค" OR "จุ ๊ค" OR @nissan OR $nissan OR %nissan OR ขาย ต่อ';
//details = '(publications:"The Straits Times") AND (MIPL OR "mapletree investments" OR "mapletree investment" OR "#mapletreesingapore" OR "mapletree invest" OR "mapletree real estate" OR "mapletree property" OR MapleTree OR "#Mapletree" OR "@mapletree" OR "@mapletreesg" OR "*丰 树*" OR "丰树" OR "丰树产业" OR "丰树房产" OR "丰树地产" OR "丰树房地产" OR "丰树物业" OR "丰树信托" OR "丰树新加坡" OR "新加坡丰树" OR "丰树产业" OR "丰树集团" OR "豐樹" OR "豐樹產業" OR "#新加坡豐樹" OR "豐樹房產" OR "豐樹地產" OR "豐樹房地產" OR "豐樹物業" OR "豐樹信託" OR "豐樹新加坡" OR "新加坡豐樹" OR "豐樹產業" OR "豐樹集團")';
//details = '"#renault" OR $Renault OR *renault';
//details = '(("Navara" OR "นาวาร่า" OR "นาวารา" OR (("Nissan" OR "นิสสัน" OR "Navara" OR "นาวาร่า" OR "นาวารา") AND ("คิงแคบ" OR "คิงแคป" OR "คิงแค็ป" OR "คิงแค็บ" OR "King Cap" OR "King Cab" OR "KC" OR "Double Cab" OR "Double Cap" OR "DC" OR "ดับเบิ้ล แคป" OR "ดับเบิ้ล แค็ป" OR "ดับเบิ้ลแค็ป" OR "ดับเบิ้ล แคบ" OR "ดับเบิ้ลแค็บ" OR "ดับเบิ้ล แค็บ" OR "Black Edition" OR "แบล็ค เอดิชั่น" OR "แบล็ค อิดิชั่น" OR "แบล็ค อิดิชัน" OR "Sportech" OR "Sport Tech" OR "สปอร์ตเทค" OR "สปอร์ทเทค" OR "กระบะ" OR "กะบะ" OR "ปิคอัพ" OR "ปิ๊คอัพ" OR "ปิกอัพ" OR "ปิ๊กอัพ"))) AND ("ศูนย์บริการ" OR "ตัวแทน" OR "บริการ" OR "คิวยาว" OR "รอนาน" OR "เฉื่อย" OR "ประทับใจ" OR "เสียความรู้สึก"))';
//details = '("#Renault" OR "#renault" OR Renault OR "#renaultthailand" OR "@renault" OR "@renaultthailand" OR (("เรโนลท์" OR "เร โนลท์") AND ("รถยนต์" OR "รถ"))) NOT ("adele renault" OR "hot deal" OR "ขายรถมือสอง" OR "ราคาสุดคุ้ม" OR "ดาวน์ฟรี" OR "โปรโมชั่นแรงๆ" OR "ขาย" OR "โปรแรง" OR "on sales" OR "ขายรถราคาถูก" OR "รับซื้อรถ" OR "ผ่อนฟรี" OR "ผ่อนสบาย" OR "สนใจติดต่อ" OR "พร้อมของแถม" OR "แถมฟรี" OR "ดาวน์เริ่มต้น" OR "ส่วนลดเยอะ" OR "#promotion" OR "ฟรีประกัน" OR "ปิดการขาย" OR "ของแท้" OR "ราคาถูก" OR "ขายถูก" OR "ขายรถเก่า" OR "ฟรีดาวน์" OR "#checkraka" OR "#onetwocar" OR "พร้อมส่ง" OR "จัดส่งฟรี" OR "ขายปลีกในราคาขายส่ง" OR "ติดต่อสอบถามและสั่งซื้อสินค้า")';
//details = '"星理財！大阪旅遊趣" OR "星申辦" OR "星申辦萬元旅遊金" OR "星展點亮財庫" OR "匯豐" OR "中信" OR "中信卡" OR "哩遇白金卡" OR "寰旅世界卡" OR "尊尚世界卡" OR "花旗卡" OR "花旗現金回饋" OR "饗樂卡" OR "#innovatewithdbs" OR "99sme" OR "innovatewithdbs" OR "sme99" OR "星易貸"';
//details = '("#내나이가어때서" OR "내나이가어때서") NOT ("지노" OR "#10bet" OR "my652.com" OR "AZ885ㆍCOM" OR "파칭코")';
//details = '("Coca-Cola" OR "အိုင္ ကိုလာ" OR "အိုင္ကိုလာ" OR "ကိုကာကိုလာ" OR "ကုတ္လိုက္ထ္" OR "ကုတ္္ဇီးရိုး" OR "ဖန္တ" OR "စပရိုက္")';
//details = '("Keppel Land" OR "Keppel Bay" OR "The View Riviera Point" OR "The View @ Riviera Point" OR "West Vista Residence" OR "吉宝置业" OR "ケッペルランド" OR "ケッペル湾" OR "ビューリビエラポイント" OR "ウエストビスタレジデンス" OR keppel OR "Keppel Corp") NOT ("Keppel Road" OR oil OR Marine)';
//details = '("thuốc" AND ("nặng-nhẹ" OR "đầm" OR "đằm" OR "thơm" OR "đắng" OR "khét" OR "ngọt ở đầu top" OR "ngọt nhẹ nơi đầu môi" OR "chắc lỏng")';
//details = '(DBS OR "#DBSBank" OR "#DBSBank" OR "#DBSBank_TW" OR "#DBSBank_Taiwan" OR "#DBSTW" OR "#DBSTaiwan" OR "#DBS_TW" OR "#DBS_Taiwan" OR "@DBSBank_TW" OR "@DBSBank_Taiwan" OR "@DBSTW" OR "@DBSTaiwan" OR "@DBS_TW" OR "@DBS_Taiwan" OR "DBSTW" OR "DBSTaiwan" OR "DBS_TW" OR "DBS_Taiwan" OR 星展 OR 星展銀行) NOT ("#dragonball" OR "#dbz" OR "#dbzfunny" OR "#shockdbs" OR "#dbz" OR "#dragonball" OR "dragonball" OR "#dbz" OR "dbz" OR "@crazydbs" OR "@dbzcore" OR "@dbz" OR "@dbz_vidz" OR "#goku" OR "#dragonballz" OR "dragonballz" OR "@legendarywarriorgoku" OR "#piccolo" OR "@insanedbz" OR "#gokublack" OR "#vegeta")';
//details = 'I am very happy😊 today 👫';
//details = 'My name is zeeze :) and I am very happy :D:)';
//details = '"Breeze Thailand" OR handlers:BreezeThailand';
//details ='a:"v"';
//details = "CDL’s";
//details = 'DBS OR "#DBSBank"';
//details = "城市发展有限公司";
//details = 'publications:sttimes'
//details= '"Employees\' Union"~5' 
//details = 'Patents (Amendment) Bill'
details = '#星展';
// Sample output 1
const finalString = new TokenizeBoolean().parse(details);
console.log(details);
console.log( '=======================:::')
console.log(finalString);
