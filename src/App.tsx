import React, { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import './App.css';
import Kanban from './components/Kanban/Kanban';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [text, setText] = useState('');
  const [state, setState] = useState<any>({
    todo: {
      title: 'Todo',
      items: [],
    },
    inprogress: {
      title: 'In Progress',
      items: [],
    },
    done: {
      title: 'Done',
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev: any) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    if (text !== '') {
      setState((prev: any) => {
        return {
          ...prev,
          todo: {
            title: 'Todo',
            items: [
              {
                id: v4(),
                name: text,
              },
              ...prev.todo.items,
            ],
          },
        };
      });
    }

    setText('');
  };

  const removeItems = () => {
    setState((prev: any) => {
      return {
        ...prev,
        done: {
          title: 'Done',
          items: [],
        },
      };
    });
  };

  return (
    <div className="App">
      <NavBar addItem={addItem} text={text} setText={setText} />
      <Kanban state={state} handleDragEnd={handleDragEnd} />
      <button className="remove-button" onClick={removeItems}>
        Clear
      </button>
    </div>
  );
}

export default App;
