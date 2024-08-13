import { ExcelOOXMLTemplate } from '@gmtre-datagrid/core';

const sheetFactory: ExcelOOXMLTemplate = {
    getTemplate(name: string, idx: number) {
        const sheetId = (idx + 1).toString();
        return {
            name: "sheet",
            properties: {
                rawMap: {
                    "name": name,
                    "sheetId": sheetId,
                    "r:id": `rId${sheetId}`
                }
            }
        };
    }
};

export default sheetFactory;
