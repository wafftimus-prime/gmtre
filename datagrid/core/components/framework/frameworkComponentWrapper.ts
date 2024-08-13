import { IComponent } from "../../interfaces/iComponent";
import { ComponentType } from "./componentTypes";

/**
 * B the business interface (ie IHeader)
 * A the agGridComponent interface (ie IHeaderComp). The final object acceptable by ag-grid
 */
export interface FrameworkComponentWrapper {
    wrap<A extends IComponent<any>>(frameworkComponent: { new(): any } | null,
                                    methodList: string[],
                                    optionalMethodList: string[],
                                    componentType: ComponentType
    ): A;
}

export interface WrappableInterface {
    hasMethod(name: string): boolean;

    callMethod(name: string, args: IArguments): void;

    addMethod(name: string, callback: Function): void;
}

export abstract class BaseComponentWrapper<F extends WrappableInterface> implements FrameworkComponentWrapper {
    public wrap<A extends IComponent<any>>(OriginalConstructor: { new(): any },
                                    mandatoryMethodList: string[],
                                    optionalMethodList: string[] = [],
                                    componentType: ComponentType): A {
        const wrapper: F = this.createWrapper(OriginalConstructor, componentType);

        mandatoryMethodList.forEach((methodName => {
            this.createMethod(wrapper, methodName, true);
        }));

        optionalMethodList.forEach((methodName => {
            this.createMethod(wrapper, methodName, false);
        }));

        return wrapper as any as A;

    }

    public unwrap(comp: any): any {
        return comp;
    }

    abstract createWrapper(OriginalConstructor: { new(): any }, componentType: ComponentType): F;

    private createMethod(wrapper: F, methodName: string, mandatory: boolean): void {
        wrapper.addMethod(methodName, this.createMethodProxy(wrapper, methodName, mandatory));
    }

    protected createMethodProxy(wrapper: F, methodName: string, mandatory: boolean): Function {
        return function() {
            if (wrapper.hasMethod(methodName)) {
                return wrapper.callMethod(methodName, arguments);
            }

            if (mandatory) {
                console.warn('AG Grid: Framework component is missing the method ' + methodName + '()');
            }
            // multiple features rely on this returning `null` rather than `undefined`,
            // so that they can differentiate whether the underlying component has implemented a void method or not
            return null;
        };
    }
}
