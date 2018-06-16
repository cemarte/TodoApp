import * as React from 'react';
import { Itodo, ItodoAppState } from '../types/index';
import { TodoList } from '../components/TodoList';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { todoClicked, deleteTodoInit, toggleTodoUpdate, hideError } from '../actions/index';
import { getFilteredTodos, isBusy } from '../selectors/index';
import './FilteredTodos.css';
export interface IfilteredTodosProps {
    todos?: Itodo[];
    filter?: string;
    isBusy?: boolean;
    error?: string;
    onEdit?: (todo: Itodo) => void;
    onDelete?: (todo: Itodo) => void;
    toggleTodo?: (todo: Itodo) => void;
    removeMessage?: () => void;
}

export class FilteredTodos extends React.Component<IfilteredTodosProps> {
    render(): JSX.Element {

        if (this.props.isBusy) {
            return (
                <div className="spin-container">
                    ...Loading
                </div>
            );
        } else {
            return (
                <TodoList
                    todos={this.props.todos!}
                    onEdit={this.props.onEdit!}
                    onDelete={this.props.onDelete!}
                    toggleTodo={this.props.toggleTodo!}
                />
            );

        }
    }
}

const mapStateToProps = (state: ItodoAppState) => {
    return {
        todos: getFilteredTodos(state),
        isBusy: isBusy(state),
        error: state.error,
        filter: state.filter
    };
};

interface IdispatchToProps {
    onEdit?: (todo: Itodo) => void;
    onDelete?: (todo: Itodo) => void;
    toggleTodo?: (todo: Itodo) => void;
    removeMessage?: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<ItodoAppState>): IdispatchToProps => {
    return {
        onEdit: (todo: Itodo) => { dispatch(todoClicked(todo)); },
        onDelete: (todo: Itodo) => { dispatch(deleteTodoInit(todo)); },
        toggleTodo: (todo: Itodo) => { dispatch(toggleTodoUpdate(todo)); },
        removeMessage: () => { dispatch(hideError()); }
    };
};

export default connect<{}, {}>(mapStateToProps, mapDispatchToProps)(FilteredTodos);