import { ExcelOOXMLTemplate } from '@gmtre-datagrid/core';

const mergeCellFactory: ExcelOOXMLTemplate = {
    getTemplate(ref: string) {
        return {
            name: 'mergeCell',
            properties: {
                rawMap: {
                    ref: ref
                }
            }
        };
    }
};

export default mergeCellFactory;
