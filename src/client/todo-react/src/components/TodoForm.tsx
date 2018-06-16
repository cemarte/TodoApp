import * as React from 'react';
import { Itodo, ItodoAppState } from '../types/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { saveTodoInit, createTodo, editTodo, cancelEdit, updateTodoInit } from '../actions/index';
import './TodoForm.css';

export interface ItodoFormProps {
    todo?: Itodo;
    isEdit?: boolean;
    onAdd?: () => {};
    // tslint:disable-next-line:no-any
    onChange?: (field: string, value: any) => {};
    onSave?: (todo: Itodo, isEdit?: boolean) => {};
    onCancel?: (todo: Itodo) => {};
}

export const TodoForm = ({ todo, isEdit, onAdd, onChange, onSave, onCancel }: ItodoFormProps) => {
    if (todo) {
        return (
            <form
                className="TodoForm"
                title={isEdit ? 'Update ToDo' : 'Add ToDo'}
                onSubmit={(e) => { e.preventDefault(); onSave!(todo, isEdit); }}
            >
                <div>
                    <label htmlFor="todo-name">Text</label>
                    <input
                        type="text"
                        id="todo-name"
                        name="todo-name"
                        value={todo!.text}
                        onChange={(e) => onChange!('text', e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="primary"
                        onClick={() => onSave!(todo, isEdit)}
                    >
                        <i className="save" /> {isEdit ? 'Update ToDo' : 'Add ToDo'}
                    </button>
                    <button onClick={() => onCancel!(todo)}>Cancel</button>
                </div>
            </form>
        );
    } else {
        return <button onClick={onAdd}><i className="plus" /> Add</button>;
    }
};

const mapStateToProps = (state: ItodoAppState) => {
    return {
        todo: state.selectedTodo,
        isEdit: state.isEdit
    };
};

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: ItodoFormProps) => {
    return {
        onAdd: () => {
            dispatch(createTodo());
        },
        // tslint:disable-next-line:no-any
        onChange: (field: string, value: any) => {
            dispatch(editTodo(field, value));
        },
        onSave: (todo: Itodo, isEdit?: boolean) => {
            if (isEdit) {
                dispatch(updateTodoInit(todo));
            } else {
                dispatch(saveTodoInit(todo));
            }
        },
        onCancel: (todo: Itodo) => {
            dispatch(cancelEdit(todo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);