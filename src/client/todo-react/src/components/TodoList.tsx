import * as React from 'react';
import { Itodo } from '../types';
import * as moment from 'moment';
import './TodoList.css';
export interface ItodoListProps {
    todos: Itodo[];
    onEdit: (todo: Itodo) => void;
    onDelete: (todo: Itodo) => void;
    toggleTodo: (todo: Itodo) => void;
}

export const TodoList = ({ todos, onEdit, onDelete, toggleTodo }: ItodoListProps) => (
    <ul className="TodoList">
        {
            todos.map((todo: Itodo) => {
                return (
                    <li key={todo.id}>
                        {`${todo.text}${todo.completedAt ? ' completed ' + moment(todo.completedAt).fromNow() : ''}`}
                        <div>{moment(todo.createdAt).fromNow()}</div>
                        <button type="button" onClick={() => { onEdit(todo); }}>Modify</button>
                        <button type="button" onClick={() => { onDelete(todo); }}> Remove</button>
                    </li>
                );
            })
        }
    </ul>
);