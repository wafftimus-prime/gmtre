// Implemented by Column and ProvidedColumnGroup. Allows the groups to contain a list of this type for it's children.
// See the note at the top of Column class.
import { ColumnInstanceId } from "../entities/column";
import { ColumnGroupShowType } from "../entities/columnGroup";
import { ProvidedColumnGroup } from "../entities/providedColumnGroup";

export interface IProvidedColumn {
    isVisible(): boolean;
    getInstanceId(): ColumnInstanceId;
    getColumnGroupShow(): ColumnGroupShowType | undefined;
    getId(): string;
    setOriginalParent(originalParent: ProvidedColumnGroup | null): void;
}
