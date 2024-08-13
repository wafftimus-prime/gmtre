import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from './apps.types';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppsService
{
    private _shortcuts: ReplaySubject<App[]> = new ReplaySubject<App[]>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for shortcuts
     */
    get shortcuts$(): Observable<App[]>
    {
        return this._shortcuts.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    getAll(): Observable<App[]>
    {
        return this._httpClient.get<App[]>('api/common/shortcuts').pipe(
            tap((shortcuts) =>
            {
                this._shortcuts.next(shortcuts);
            }),
        );
    }

    /**
     * Create a shortcut
     *
     * @param shortcut
     */
    create(shortcut: App): Observable<App>
    {
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpClient.post<App>('api/common/shortcuts', {shortcut}).pipe(
                map((newApp) =>
                {
                    // Update the shortcuts with the new shortcut
                    this._shortcuts.next([...shortcuts, newApp]);

                    // Return the new shortcut from observable
                    return newApp;
                }),
            )),
        );
    }

    /**
     * Update the shortcut
     *
     * @param id
     * @param shortcut
     */
    update(id: string, shortcut: App): Observable<App>
    {
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpClient.patch<App>('api/common/shortcuts', {
                id,
                shortcut,
            }).pipe(
                map((updatedApp: App) =>
                {
                    // Find the index of the updated shortcut
                    const index = shortcuts.findIndex(item => item.id === id);

                    // Update the shortcut
                    shortcuts[index] = updatedApp;

                    // Update the shortcuts
                    this._shortcuts.next(shortcuts);

                    // Return the updated shortcut
                    return updatedApp;
                }),
            )),
        );
    }

    /**
     * Delete the shortcut
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpClient.delete<boolean>('api/common/shortcuts', {params: {id}}).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted shortcut
                    const index = shortcuts.findIndex(item => item.id === id);

                    // Delete the shortcut
                    shortcuts.splice(index, 1);

                    // Update the shortcuts
                    this._shortcuts.next(shortcuts);

                    // Return the deleted status
                    return isDeleted;
                }),
            )),
        );
    }
}
