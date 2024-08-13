import { Autowired, Component, PostConstruct } from "@gmtre-datagrid/core";
import { ChartTranslationKey, ChartTranslationService } from "../../../services/chartTranslationService";
import { _Scene } from "ag-charts-community";

const CANVAS_CLASS = 'ag-chart-mini-thumbnail-canvas';
const ERROR_MESSAGE = 'AG Grid - chart update failed';

export abstract class MiniChart extends Component {

    @Autowired('chartTranslationService')
    protected chartTranslationService: ChartTranslationService;

    protected readonly size: number = 58;
    protected readonly padding: number = 5;
    protected readonly root: _Scene.Group = new _Scene.Group();
    protected readonly scene: _Scene.Scene;

    constructor(container: HTMLElement, protected tooltipName: ChartTranslationKey) {
        super();

        const scene = new _Scene.Scene({
            width: this.size,
            height: this.size
        });

        scene.canvas.element.classList.add(CANVAS_CLASS);
        scene.setRoot(this.root);
        scene.setContainer(container);

        this.scene = scene;
    }

    @PostConstruct
    protected init(): void {
        this.scene.canvas.element.title = this.chartTranslationService.translate(this.tooltipName);

        // Necessary to force scene graph render as we are not using the standalone factory.
        this.scene.render()
            .catch((e: Error) => {
                console.error(`${ERROR_MESSAGE}`, e);
            });
    }

    abstract updateColors(fills: string[], strokes: string[]): void;
}
