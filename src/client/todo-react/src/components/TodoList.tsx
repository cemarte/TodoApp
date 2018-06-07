import * as React from 'react';
import { Itodo } from '../types';
import { List, Icon, Checkbox } from 'antd';
import * as moment from 'moment';

export interface ItodoListProps {
    todos: Itodo[];
    onEdit: (todo: Itodo) => void;
    onDelete: (todo: Itodo) => void;
    toggleTodo: (todo: Itodo) => void;
}
export const TodoList = ({ todos, onEdit, onDelete, toggleTodo }: ItodoListProps) => (
    <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(todo: Itodo) => (
            <List.Item
                style={{ padding: '2em', textDecoration: todo.isDone ? 'line-through' : 'none' }}
                actions={[
                    <a key={1} onClick={() => { onEdit(todo); }}> <Icon type="edit" /> Modify</a>,
                    <a key={2} onClick={() => { onDelete(todo); }}> <Icon type="delete" /> Remove</a>
                ]}
            >
                <List.Item.Meta
                    key={todo.id}
                    title={
                        `${todo.text}${todo.completedAt ? ' completed ' + moment(todo.completedAt).fromNow() : ''}`}
                    description={todo.assignee}
                    avatar={<Checkbox checked={todo.isDone} onChange={() => { toggleTodo(todo); }}>Done?</Checkbox>}
                />
                <div>{moment(todo.createdAt).fromNow()}</div>
            </List.Item >
        )}
    />
);