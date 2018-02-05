import * as moment from 'moment';

export interface Itodo {
    id: string;
    text: string;
    createdAt: string;
    assignee: string;
    completedAt?: string;
    isDone: boolean;
    dueDate?: string;
}
export class TodoTask implements Itodo {
    id: string;
    text: string;
    createdAt: string;
    assignee: string;
    completedAt?: string;
    isDone: boolean = false;
    dueDate?: string;
    constructor(text: string) {
        this.id = 'f7325ca6-67fb-4271-8b51-1ee47a6bce7d';
        this.text = text;
        this.createdAt = moment().toISOString();
    }
}
export type FilterType = 'DONE' | 'TODO' | 'ALL';

export interface ItodoAppState {
    todos: Itodo[];
    selectedTodo?: Itodo;
    filter: FilterType;
    tasks: number;
    error?: string;
    isEdit: boolean;
}