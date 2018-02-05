import { createSelector } from 'reselect';
import { ItodoAppState, Itodo, FilterType } from '../types/index';

const todosSelector = (state: ItodoAppState) => state.todos;
const filterSelector = (state: ItodoAppState) => state.filter;

export const getFilteredTodos = createSelector(
    todosSelector,
    filterSelector,
    (todos: Itodo[], filter: FilterType) => {
        switch (filter) {
            case 'DONE': {
                return todos.filter((t) => t.isDone);
            }
            case 'TODO': {
                return todos.filter((t) => !t.isDone);
            }
            default: {
                return todos;
            }
        }
    }
);

const tasksSelector = (state: ItodoAppState) => state.tasks;

export const isBusy = createSelector(
    tasksSelector,
    (tasks: number) => tasks > 0
);