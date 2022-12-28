import React from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    // Transform from Firebase response to required format
    const createTask = (taskText, taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: 'https://react-http-72a7f-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', 
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      },      
    }
    sendTaskRequest(requestConfig, createTask.bind(null, taskText));
  
    /*
    // Transform from Firebase response to required format
    const createTask = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };
    sendTaskRequest(requestConfig, createTask);
    */
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
