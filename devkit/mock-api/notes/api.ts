import { Injectable } from '@angular/core';
import { GmtreMockApiService, GmtreMockApiUtils } from '../config';
import { labels as labelsData, notes as notesData } from './data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NotesMockApi {
  private _labels: any[] = labelsData;
  private _notes: any[] = notesData;

  /**
   * Constructor
   */
  constructor(private _gmtreMockApiService: GmtreMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Labels - GET
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService
      .onGet('api/apps/notes/labels')
      .reply(() => [200, cloneDeep(this._labels)]);

    // -----------------------------------------------------------------------------------------------------
    // @ Labels - POST
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService
      .onPost('api/apps/notes/labels')
      .reply(({ request }) => {
        // Create a new label
        const label = {
          id: GmtreMockApiUtils.guid(),
          title: request.body.title,
        };

        // Update the labels
        this._labels.push(label);

        return [200, cloneDeep(this._labels)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Labels - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService
      .onPatch('api/apps/notes/labels')
      .reply(({ request }) => {
        // Get label
        const updatedLabel = request.body.label;

        // Update the label
        this._labels = this._labels.map((label) => {
          if (label.id === updatedLabel.id) {
            return {
              ...label,
              title: updatedLabel.title,
            };
          }

          return label;
        });

        return [200, cloneDeep(this._labels)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Labels - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService
      .onDelete('api/apps/notes/labels')
      .reply(({ request }) => {
        // Get label id
        const id = request.params.get('id');

        // Delete the label
        this._labels = this._labels.filter((label) => label.id !== id);

        // Go through notes and delete the label
        this._notes = this._notes.map((note) => ({
          ...note,
          labels: note.labels.filter((item:any) => item !== id),
        }));

        return [200, cloneDeep(this._labels)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Note Tasks - POST
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService
      .onPost('api/apps/notes/tasks')
      .reply(({ request }) => {
        // Get note and task
        let updatedNote = request.body.note;
        const task = request.body.task;

        // Update the note
        this._notes = this._notes.map((note) => {
          if (note.id === updatedNote.id) {
            // Update the tasks
            if (!note.tasks) {
              note.tasks = [];
            }

            note.tasks.push({
              id: GmtreMockApiUtils.guid(),
              content: task,
              completed: false,
            });

            // Update the updatedNote with the new task
            updatedNote = cloneDeep(note);

            return {
              ...note,
            };
          }

          return note;
        });

        return [200, updatedNote];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Notes - GET
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService.onGet('api/apps/notes/all').reply(() => {
      // Clone the labels and notes
      const labels = cloneDeep(this._labels);
      let notes = cloneDeep(this._notes);

      // Attach the labels to the notes
      notes = notes.map((note) => ({
        ...note,
        labels: note.labels.map((labelId:any) =>
          labels.find((label) => label.id === labelId)
        ),
      }));

      return [200, notes];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Notes - POST
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService.onPost('api/apps/notes').reply(({ request }) => {
      // Get note
      const note = request.body.note;

      // Add an id
      note.id = GmtreMockApiUtils.guid();

      // Push the note
      this._notes.push(note);

      return [200, note];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Notes - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService.onPatch('api/apps/notes').reply(({ request }) => {
      // Get note
      const updatedNote = request.body.updatedNote;

      // Update the note
      this._notes = this._notes.map((note) => {
        if (note.id === updatedNote.id) {
          return {
            ...updatedNote,
          };
        }

        return note;
      });

      return [200, updatedNote];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Notes - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._gmtreMockApiService.onDelete('api/apps/notes').reply(({ request }) => {
      // Get the id
      const id = request.params.get('id');

      // Find the note and delete it
      this._notes.forEach((item, index) => {
        if (item.id === id) {
          this._notes.splice(index, 1);
        }
      });

      // Return the response
      return [200, true];
    });
  }
}