/** Вызов fileReader далее fileTransmitter, при этом вызовы выполнены в Бесконечном цикле с имеющимся в цикле 
 * блоком setTimeout на 11 мин в котором и вызываются вышеуказанные ф-ции
*/

const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const transmitFluorimetrData = require('./fileTransmitter');
const readFileWrapp = require('./fileReader');

main = async() => {

    let lastDate = '';

    console.log(`Script is Start DEVELOP is ${process.env.DEVELOP}`);

    while(true){
        try{

            const res = await readFileWrapp(process.env.DIRPATH, process.env.DELIMETR);
            
            if(process.env.DEVELOP){
                if(lastDate != res.date && res.Fv_Fm != ' undef'){
                    await transmitFluorimetrData(process.env.URL_SOURCE_DEV, res); 
                    console.log(`Данные считанны и отправленны! (data:${res.date}, Fv/Fm:${res.Fv_Fm})`);
                    lastDate = res.date;
                }
            }else{
                if(lastDate != res.date && res.Fv_Fm != ' undef'){
                    await transmitFluorimetrData(process.env.URL_SOURCE_PROD, res);
                    console.log(`Данные считанны и отправленны! (data:${res.date}, Fv/Fm:${res.Fv_Fm})`); 
                    lastDate = res.date;
                }
            }
        }catch(error) {
            console.log(error);
        }
    }
}

main();