const ExcelJs = require('exceljs');
const newLocation = "New ResLocation";
async function excelTest() {
    let output = { row: -1, column: -1 };
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('/home/toobler/Downloads/accommodation-import-sample-sheet (7).xlsx');
    const workSheet = workbook.getWorksheet('Accommodation Management Sheet');
    // workSheet.eachRow((row,rowNumber)=>{
    //     row.eachCell((cell,colNumber)=>{
    //         if(){

    //         }
    //         });  
    //     });

    workSheet.addRow(['residential', newLocation, '2'])
    await workbook.xlsx.writeFile('/home/toobler/Downloads/accommodation-import-sample-sheet (7).xlsx');
};
module.exports = { excelTest , newLocation};





