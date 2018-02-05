import { Action } from 'redux';
import { ItodoAppState, TodoTask } from '../types/index';
import { Reducer } from 'redux';
import {
    IfetchTodosSuccess,
    IfetchTodosError,
    IsaveTodoSuccess,
    IupdateTodoSuccess,
    IdeleteTodoSuccess,
    IeditTodo,
    ItodoClicked,
    ItoggleTodo,
    IfilterChange
} from '../actions/index';

export const todoStore: Reducer<ItodoAppState> = (state: ItodoAppState, action: Action): ItodoAppState => {
    switch (action.type) {
        case 'HIDE_ERRO': {
            return {
                ...state,
                error: undefined
            };
        }
        case 'FILTER_CHANGE': {
            let a = action as IfilterChange;
            let { value } = a;
            localStorage.setItem('todos.filter', value);
            return {
                ...state,
                filter: value
            };
        }
        case 'TOGGLE_TODO': {
            let a = action as ItoggleTodo;
            let { todo } = a;
            return {
                ...state,
                todos: state.todos.map((t) => {
                    if (todo === t) {
                        return { ...t, isDone: !t.isDone };
                    }
                    return t;
                })
            };
        }
        case 'TODO_CLICKED': {
            let a = action as ItodoClicked;
            let { todo } = a;
            return {
                ...state,
                selectedTodo: todo,
                isEdit: true
            };

        }
        case 'CREATE_TODO':
            return {
                ...state,
                selectedTodo: new TodoTask('New To-Do')
            };
        case 'EDIT_TODO': {
            let a = action as IeditTodo;
            let { field, value } = a;
            let { selectedTodo } = state;
            let newState = Object.assign({}, selectedTodo, { [field]: value });
            return {
                ...state,
                selectedTodo: newState
            };
        }
        case 'CANCEL': {
            return {
                ...state,
                selectedTodo: new TodoTask('New To-Do'),
                isEdit: false
            };
        }
        case 'FETCH_TODOS': {
            return { ...state, tasks: state.tasks + 1 };
        }
        case 'FETCH_TODOS_SUCCESS': {
            let a = action as IfetchTodosSuccess;
            let { todos } = a;
            return {
                ...state,
                todos,
                tasks: Math.max(state.tasks - 1, 0)
            };
        }
        case 'FETCH_TODOS_ERROR':
        case 'SAVE_TODO_ERROR':
        case 'UPDATE_TODO_ERROR':
        case 'DELETE_TODO_ERROR':
            {
                let a = action as IfetchTodosError;
                let { error } = a;
                return {
                    ...state,
                    tasks: state.tasks - 1,
                    error
                };
            }
        case 'SAVE_TODO': {
            return { ...state, tasks: state.tasks + 1 };
        }
        case 'SAVE_TODO_SUCCESS': {
            let a = action as IsaveTodoSuccess;
            let { todo } = a;
            return {
                ...state,
                todos: [todo, ...state.todos],
                tasks: Math.max(state.tasks - 1, 0),
                isEdit: false,
                selectedTodo: new TodoTask('New To-Do')
            };
        }
        case 'UPDATE_TODO': {
            return { ...state, tasks: state.tasks + 1 };
        }
        case 'UPDATE_TODO_SUCCESS': {
            let a = action as IupdateTodoSuccess;
            let { todo } = a;
            return {
                ...state,
                tasks: Math.max(state.tasks - 1, 0),
                todos: state.todos.map(t => {
                    if (todo.id === t.id) {
                        return Object.assign({}, t, todo);
                    } else {
                        return t;
                    }
                }),
                isEdit: false,
                selectedTodo: new TodoTask('New To-Do')
            };
        }

        case 'DELETE_TODO': {
            return { ...state, tasks: state.tasks + 1 };
        }
        case 'DELETE_TODO_SUCCESS': {
            let a = action as IdeleteTodoSuccess;
            let { todo } = a;
            let i = state.todos.indexOf(todo);
            return {
                ...state,
                todos: [...state.todos.slice(0, i), ...state.todos.slice(i + 1)],
                tasks: Math.max(state.tasks - 1, 0)
            };
        }

        default:
            break;
    }
    return state;
};