const TokenizeBoolean = require('./tokenize-boolean');


const tstr = 'มมิตซูบิชิ OR มิตซุบิชิ OR "มิต ซู บิ ชิ" OR "มิต ซุบิ ชิ"';
const tstr2 = '"นิสสันจู๊ค" NOT "Juke Box" AND car OR KNOR';


// Sample output 1
const finalString = new TokenizeBoolean().parse(tstr);
console.log(tstr,'===',finalString);

// Sample output 2
const finalString2 = new TokenizeBoolean().parse(tstr2);
console.log(tstr,'===',finalString2);
















