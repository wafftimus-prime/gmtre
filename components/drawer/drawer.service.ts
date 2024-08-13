import { Injectable } from '@angular/core';
import { GmtreDrawerComponent } from './drawer.component';

@Injectable({providedIn: 'root'})
export class GmtreDrawerService
{
    private _componentRegistry: Map<string, GmtreDrawerComponent> = new Map<string, GmtreDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: GmtreDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): GmtreDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
