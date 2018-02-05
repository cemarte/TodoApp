import * as React from 'react';
import { Itodo, ItodoAppState } from '../types/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { saveTodoInit, createTodo, editTodo, cancelEdit, updateTodoInit } from '../actions/index';
import { Form, Button, Input, Icon, Card } from 'antd';

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
            <Card title={isEdit ? 'Update ToDo' : 'Add ToDo'}>
                <Form layout="inline" onSubmit={(e) => { e.preventDefault(); onSave!(todo, isEdit); }}>
                    <Form.Item>
                        <Input
                            type="text"
                            name="todo-name"
                            value={todo!.text}
                            onChange={(e) => onChange!('text', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => onSave!(todo, isEdit)}
                        >
                            <Icon type="save" /> {isEdit ? 'Update ToDo' : 'Add ToDo'}
                        </Button>
                        <Button onClick={() => onCancel!(todo)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    } else {
        return <Button onClick={onAdd}><Icon type="plus" /> Add</Button>;
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