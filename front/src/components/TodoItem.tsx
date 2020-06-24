import React, { ChangeEvent, MouseEvent, useState, useRef, useCallback } from 'react';
import { Todo } from '../hooks/useTodo'

type Props = {
  item: Todo,
  onChangeTick: (e: ChangeEvent<HTMLInputElement>) => void,
  onClickDelete: (e: MouseEvent<HTMLSpanElement>) => void,
  onClickUpdateContent: (id: number, content: string) => void
}

const TodoItem: React.FC<Props> = ({ item, onChangeTick, onClickDelete, onClickUpdateContent }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickUpdate = useCallback(() => {
    if (inputRef.current) {
      onClickUpdateContent(item.id, inputRef.current!.value)
      setEditing(false)
    }
  }, [onClickUpdateContent, item.id, setEditing])

  return (
    <li key={item.id}>
      <input type="checkbox" value={item.id} checked={item.done} onChange={onChangeTick} />
      { editing ?
          <>
            <input type="text" ref={inputRef} defaultValue={item.content} style={{ marginRight: '0.5rem' }} />
            <span data-id={item.id} onClick={() => setEditing(false)} style={{ cursor: 'pointer', marginRight: '0.5rem' }}>quit</span>
            <span data-id={item.id} onClick={onClickUpdate} style={{ cursor: 'pointer', marginRight: '0.5rem' }}>update</span>
          </>
        :
          <>
            <span style={{ marginRight: '0.5rem' }}>{ item.content }</span>
            <span data-id={item.id} onClick={() => setEditing(true)} style={{ cursor: 'pointer', marginRight: '0.5rem' }}>edit</span>
          </>
      }
      <span data-id={item.id} onClick={onClickDelete} style={{ cursor: 'pointer' }}>×</span>
    </li>
  )
}

export default TodoItem;