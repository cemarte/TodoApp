import { Itodo, FilterType } from '../types/index';
import { Dispatch } from 'redux';

export interface IshowError {
    type: 'SHOW_ERROR';
    error: string;
}
export interface IhideError {
    type: 'HIDE_ERROR';
}
export function showError(error: string): IshowError {
    return {
        type: 'SHOW_ERROR',
        error
    };
}
export function hideError(): IhideError {
    return {
        type: 'HIDE_ERROR'
    };
}
export interface ItoggleTodo {
    type: 'TOGGLE_TODO';
    todo: Itodo;
}
export function toggleTodo(todo: Itodo): ItoggleTodo {
    return {
        type: 'TOGGLE_TODO',
        todo
    };
}
export function toggleTodoUpdate(todo: Itodo) {
    return async (dispatch: Dispatch<{}>) => {
        await dispatch(updateTodoInit({ ...todo, isDone: !todo.isDone }));
        return dispatch(toggleTodo(todo));
    };
}
export interface IfilterChange {
    type: 'FILTER_CHANGE';
    value: FilterType;
}
export function filterChange(value: FilterType): IfilterChange {
    return {
        type: 'FILTER_CHANGE',
        value
    };
}
export interface IcreateTodo {
    type: 'CREATE_TODO';
}

export function createTodo() {
    return {
        type: 'CREATE_TODO'
    };
}
export interface IeditTodo {
    type: 'EDIT_TODO';
    field: string;
    // tslint:disable-next-line:no-any
    value: any;
}
// tslint:disable-next-line:no-any
export function editTodo(field: string, value: any) {
    return {
        type: 'EDIT_TODO',
        field,
        value
    };
}
export interface IcancelEdit {
    type: 'CANCEL';
}
export function cancelEdit(todo: Itodo) {
    return {
        type: 'CANCEL'
    };
}
export interface ItodoClicked {
    type: string;
    todo: Itodo;
}
export function todoClicked(todo: Itodo): ItodoClicked {
    return {
        type: 'TODO_CLICKED',
        todo
    };
}
export interface IfetchTodosSuccess {
    type: string;
    todos: Itodo[];
}
export function fetchTodosSuccess(todos: Itodo[]) {
    return {
        type: 'FETCH_TODOS_SUCCESS',
        todos
    };
}
export interface IfetchTodosError {
    type: string;
    error: string;
}
// tslint:disable-next-line:no-any
export function fetchTodosError(e: any) {
    return {
        type: 'FETCH_TODOS_ERROR',
        error: e
    };
}
export interface IfetchTodos {
    type: string;
}
export function fetchTodos(): IfetchTodos {
    return {
        type: 'FETCH_TODOS'
    };
}
export function fetchTodosInit() {
    return async (dispatch: Dispatch<{}>) => {
        try {
            dispatch(fetchTodos());
            const response = await fetch('/api/todo', { mode: 'cors' });
            if (response.ok) {
                let todos = await response.json();
                dispatch(fetchTodosSuccess(todos));
            } else {
                dispatch(fetchTodosError(response.statusText));
            }
        } catch (e) {
            dispatch(fetchTodosError(e.text));

        }
    };
}

export interface IsaveTodo {
    type: string;
}
export function saveTodo(): IsaveTodo {
    return {
        type: 'SAVE_TODO'
    };
}
export function updateTodo(): IupdateTodo {
    return {
        type: 'UPDATE_TODO'
    };
}
export interface IsaveTodoSuccess {
    type: string;
    todo: Itodo;
}
export function saveTodoSuccess(todo: Itodo) {
    return {
        type: 'SAVE_TODO_SUCCESS',
        todo
    };
}
export function updateTodoSuccess(todo: Itodo) {
    return {
        type: 'UPDATE_TODO_SUCCESS',
        todo
    };
}
export interface IsaveTodoError {
    type: string;
    error: string;
}
export function saveTodoError(error: string) {
    return {
        type: 'SAVE_TODO_ERROR',
        error
    };
}
export function updateTodoError(error: string) {
    return {
        type: 'SAVE_TODO_ERROR',
        error
    };
}
export function saveTodoInit(todo: Itodo) {
    return async (dispatch: Dispatch<{}>) => {
        try {
            dispatch(saveTodo());
            const response = await fetch(
                '/api/todo',
                {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    mode: 'cors',
                    body: JSON.stringify(todo)
                });
            if (response.ok) {
                let data = await response.json();
                dispatch(saveTodoSuccess(data));
            } else {
                dispatch(saveTodoError(response.statusText));
            }
        } catch (e) {
            dispatch(saveTodoError(e.text));
        }
    };
}
export interface IupdateTodo {
    type: string;
}

export interface IupdateTodoSuccess {
    type: string;
    todo: Itodo;
}

export interface IupdateTodoError {
    type: string;
    error: string;
}
export function updateTodoInit(todo: Itodo) {
    return async (dispatch: Dispatch<{}>) => {
        try {
            dispatch(updateTodo());
            const response = await fetch(
                `/api/todo/${todo.id}${todo.isDone ? '?done=true' : ''}`,
                {
                    method: 'PUT',
                    headers: [['Content-Type', 'application/json']],
                    mode: 'cors',
                    body: JSON.stringify(todo)
                });
            if (response.ok) {
                let data = await response.json();
                dispatch(updateTodoSuccess(data));
            } else {
                dispatch(updateTodoError(response.statusText));
            }

        } catch (e) {
            dispatch(updateTodoError(e.text));

        }
    };
}
export interface IdeleteTodo {
    type: 'DELETE_TODO';
    id: string;
}

export function deleteTodoInit(todo: Itodo) {
    return async (dispatch: Dispatch<{}>) => {
        try {
            dispatch(deleteTodo(todo));
            const response = await fetch(
                `/api/todo/${todo.id}`,
                {
                    method: 'DELETE',
                    headers: [['Content-Type', 'application/json']],
                    mode: 'cors'
                });
            if (response.ok) {
                // let data = await response.json();
                dispatch(deleteTodoSuccess(todo));
            } else {
                dispatch(deleteTodoError(response.statusText));
            }

        } catch (e) {
            dispatch(deleteTodoError(e.text));

        }
    };
}
export function deleteTodo(todo: Itodo): IdeleteTodo {
    return {
        type: 'DELETE_TODO',
        id: todo.id
    };
}

export interface IdeleteTodoSuccess {
    type: 'DELETE_TODO_SUCCESS';
    todo: Itodo;
}
export function deleteTodoSuccess(todo: Itodo): IdeleteTodoSuccess {
    return {
        type: 'DELETE_TODO_SUCCESS',
        todo
    };
}
export interface IdeleteTodoError {
    type: 'DELETE_TODO_ERROR';
    error: string;
}

// tslint:disable-next-line:no-any
export function deleteTodoError(error: any): IdeleteTodoError {
    return {
        type: 'DELETE_TODO_ERROR',
        error
    };
}