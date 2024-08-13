import { ThemeTemplateParameters } from "../../miniChartsContainer";
import { MiniStackedArea } from "./miniStackedArea";
import { ChartType } from "@gmtre-datagrid/core";

export class MiniNormalizedArea extends MiniStackedArea {

    static chartType: ChartType = 'normalizedArea';
    static readonly data = MiniStackedArea.data.map(stack => {
        const sum = stack.reduce((p, c) => p + c, 0);
        return stack.map(v => v / sum * 16);
    });

    constructor(container: HTMLElement, fills: string[], strokes: string[], themeTemplateParameters: ThemeTemplateParameters, isCustomTheme: boolean, data: number[][] = MiniNormalizedArea.data) {
        super(container, fills, strokes, themeTemplateParameters, isCustomTheme, data, "normalizedAreaTooltip");
    }
}
