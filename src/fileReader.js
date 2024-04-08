const math = require('mathjs');
const fs = require('fs');

/* Поиск нового файла созданного FlurometrTool в заданной директории
    (путь к директории где храняться файлы задается в файле .env в переменную 
    DIRPATH)
*/
module.exports = readFileWrapp = (filePath, delimetr) => {


    let fileInfo = {
        date: '',
        Fv_Fm: '0'
    }

    /**
    * 1. Чтение каталога с файлами 
    * */
    let files = fs.readdirSync(filePath);

    /**
    * 2. Поиск последне-созданного файла в директории filePath
    * */
                    
    // Если в директории больше 1-го файла
    if(files.length > 1){ 

        let iterationCounter = 0;
        let mathValue = 0;
        let fullNameLastFile;
        while(iterationCounter < 2){

            if(iterationCounter == 0){

                let mathArr = [];
                for(let i=0; i<files.length; i++){
                     if(`${files[i]}`.split('.')[1] == 'fmd'){
                        mathArr.push(fs.statSync(`${filePath}${delimetr}${files[i]}`).birthtimeMs);
                    }
                }

                mathValue = math.max(mathArr);
            }

            else if(iterationCounter == 1){
                for(let i=0; i<files.length; i++){
                    if(fs.statSync(`${filePath}${delimetr}${files[i]}`).birthtimeMs == mathValue){
                        fullNameLastFile = `${filePath}${delimetr}${files[i]}`;
                    }
                }
            }

            iterationCounter++;
        }


                /** Парсинг файла 
                 * (При условии, что данные в файле представленны в виде:
                 * 
                 *  Fluorimeter data file Ver. 1.3
                     DATE = 23:09:27 30.10.2023
                        LED = BLUE
                        F0 = 176
                        Fm = 200
                    Fv/Fm = 0.12
                    ...
                    
                )*/
                



        let res = fs.readFileSync(fullNameLastFile);

        let date;
        let FvFm;
    
        FvFm = res.toString().split("\r\n")[5].split("=")[1];
        date = res.toString().split("\r\n")[1].split("=")[1];
    
        fileInfo.date = date;
        fileInfo.Fv_Fm = FvFm;

        }

    return fileInfo

}