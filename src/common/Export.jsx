 import { utils, writeFileXLSX } from "xlsx";

export const exportExcel = (data, sheetName, fileName) => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, sheetName);
        writeFileXLSX(wb, `${fileName}.xlsx`);        
    }; 

export const submisionsFullDataset = (data) => {
    const dataset = data.map((item) => ({
        No: item.entryNumber + ' / ' + new Date(item.createdAt).getFullYear(),
        Nombre: item.child.childName + item.child.childLastname,
        Sexo: item.child.sex,
        Año_de_vida: item.child.year_of_life,
        Madre: item.child.parents[0].parentName,
        Centro_de_Trabajo: item.child.parents[0].workName || '',
        Dirección: item.child.childAdress,
        Consejo_Popular: item.child.cPopular,
        Caso_Social: item.socialCase ? 'X' : '',
        Estado: item.status,
        Circulo: item.child.circulo || '' 
        }));
        return dataset;
    };

    export const circulosFullDataset = (data) => {
            const dataset = data.map((item) => ({
            No: item.number,
            Nombre: item.name ,
            Cap2: item.normed_capacity2,
            Mat2: item.matricula2,
            H_2: item.girls2,
            V_2: item.matricula2 - item.girls2,
            Cap3: item.normed_capacity3,
            Mat3: item.matricula3,
            H_3: item.girls3,
            V_3: item.matricula3 - item.girls3,
            Cap4: item.normed_capacity4,
            Mat4: item.matricula4,
            H_4: item.girls4,
            V_4: item.matricula4 - item.girls4,
            Cap5: item.normed_capacity5,
            Mat5: item.matricula5,
            H_5: item.girls5,
            V_5: item.matricula5 - item.girls5,
            Cap6: item.normed_capacity6,
            Mat6: item.matricula6,
            H_6: item.girls6,
            V_6: item.matricula6 - item.girls6,
            }));  
         
        return dataset;
        };