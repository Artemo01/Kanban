import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import './Kanban.css';

const Kanban = (props: any) => {
  return (
    <div className="kanban-wrapper">
      <DragDropContext onDragEnd={props.handleDragEnd}>
        {_.map(props.state, (data, key) => {
          return (
            <div className="kanban-column" key={key}>
              <h3 className="kanban-column-title">{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={'droppable-colum'}
                    >
                      {data.items.map((el: any, index: number) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              console.log(snapshot);
                              return (
                                <div
                                  className="kanban-item"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className="kanban-status"
                                    style={
                                      data.title === 'Todo'
                                        ? { backgroundColor: 'green' }
                                        : data.title === 'In Progress'
                                        ? { backgroundColor: '#E6CC24' }
                                        : { backgroundColor: '#A90000' }
                                    }
                                  />
                                  <p className="kanban-name">{el.name}</p>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
