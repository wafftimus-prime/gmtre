import { ExcelContentType, ExcelOOXMLTemplate } from '@gmtre-datagrid/core';

const contentTypeFactory: ExcelOOXMLTemplate = {
    getTemplate(config: ExcelContentType) {
        const {name, ContentType, Extension, PartName} = config;

        return {
            name,
            properties: {
                rawMap: {
                    Extension,
                    PartName,
                    ContentType
                }
            }
        };
    }
};

export default contentTypeFactory;
