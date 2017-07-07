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
 details = '( ("#DBS" OR ("#星展" OR "#星 展") OR "# 星 展" OR "@DBS" OR ("@星展" OR "@ 星 展") OR "@ 星 展" OR "DBS" OR "星 展") AND ("Social Enterprise Grant" OR "社會 企業 獎勵 計劃") )';
// details = 'car AND publications:bbc.co.in';
// details = '("Nissan Juke" OR "นิสสัน จู๊ค" OR "Juke" OR "จู๊ค" OR "จุ๊ค") AND ((("ราคา" OR "มูลค่า") AND ("ขายต่อ" OR "มือสอง" OR "ไม่ตก" OR "เทิร์น" OR "Turn" OR "ตก" OR "ฮวบ" OR "เต้นท์" OR "Tent" OR "เต๊นท์" OR "ลง" OR "ฝากขาย")) OR "ขายง่าย" OR "ขายคล่อง")';
// details = '"นิสสัน จู๊ค" OR "Juke Box" AND car OR KNOR';


// Sample output 1
const finalString = new TokenizeBoolean().parse(details);
console.log(details);
console.log( '=======================:::' )
console.log(finalString);