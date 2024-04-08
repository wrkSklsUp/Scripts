/**Передача запроса POST с данными от флюориметра на ресурс распологаемый по адресу:
 * URL = ...
 */
const axios = require('axios');

module.exports = transmitFluorimetrData = async(URL,obj) => {
    let result = await axios.post(URL, obj);
    return result;
}
