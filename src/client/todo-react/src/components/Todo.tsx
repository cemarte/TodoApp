import * as React from 'react';

export const Todo = ({ onClick, isDone, text }: { onClick: () => void, isDone: boolean, text: string }) => (
    <li onClick={onClick} style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{text}</li>
);
