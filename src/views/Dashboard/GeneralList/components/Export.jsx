 import { utils, writeFileXLSX } from "xlsx";

export const exportExcel = (data, sheetName, fileName) => {
       
        const ws = utils.json_to_sheet(data);
       
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, sheetName);
        writeFileXLSX(wb, `${fileName}.xlsx`);        
    }; 

