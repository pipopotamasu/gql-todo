import React, { useMemo } from 'react';
import { useTodo } from '../hooks/useTodo';

const TodoApp: React.FC = () => {
  const { data, error, inputRef, onClickAdd, onChangeTick } = useTodo()

  const Items = useMemo(() => {
    if (!data) return <p>no data.</p>;
    return data.todos.map((item) => {
      return (
        <li key={item.id}>
          <input type="checkbox" value={item.id} checked={item.done} onChange={onChangeTick} />
          <span>{ item.content }</span>
        </li>
      )
    })
  }, [data, onChangeTick])

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