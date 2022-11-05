import React from 'react'
import { atom, selector, useRecoilValue } from 'recoil'
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoListFilters from './TodoListFilters';
import TodoListStats from './TodoListStats';

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
})

const filterdTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoList = () => {
  const todoList = useRecoilValue(filterdTodoListState);
  console.log("todoList", todoList);  

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
export default TodoList;