import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../hooks/useTodo';

const TodoApp: React.FC = () => {
  const {
          data,
          error,
          inputRef,
          onClickAdd,
          onChangeTick,
          onClickDelete,
          onClickUpdateContent
        } = useTodo()

  const Items = useMemo(() => {
    if (!data) return <p>no data.</p>;
    return data.todos.map((item) => {
      return (
        <TodoItem
          key={item.id}
          item={item}
          onChangeTick={onChangeTick}
          onClickDelete={onClickDelete}
          onClickUpdateContent={onClickUpdateContent}
        />
      )
    })
  }, [data, onChangeTick, onClickDelete, onClickUpdateContent])

  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>
        <input type="text" ref={inputRef} />
        <button type="button" onClick={onClickAdd}>Add</button>
      </div>
      <ul>
        {Items}
      </ul>
    </>
  );
}

export default TodoApp;