const TokenizeBoolean = require('./tokenize-boolean');

const stringInputOutputMap = {
    "my or name and is or suhail" : "my or name and is or suhail",
    "มิตซูบิชิ OR มิตซุบิชิ": "มิตซูบิชิ OR มิตซุบิชิ",
    '"Vivek Kumar" OR ("Assistant General" OR "助理总干事" OR "助理總幹事" AND ("National Trades Union Congress" OR "國家工會聯盟大會" OR NTUC OR "#NTUC" OR "職總" OR "职总" OR "@NTUC" OR "@ntuc"))': ''
};

const tstr2 = '"นิสสันจู๊ค" NOT "Juke Box" AND car OR KNOR';
const tstr = 'มมิตซูบิชิ OR มิตซุบิชิ OR "มิต ซู บิ ชิ" OR "มิต ซุบิ ชิ"';

const finalString = new TokenizeBoolean().parse(tstr);
console.log(tstr,'===',finalString);

//console.log(new TokenizeBoolean().tokenize('url:mycar'));














