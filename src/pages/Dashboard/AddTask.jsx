import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from '../../utils/axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../features/tasks/getTasksSlice';

export default function AddTask() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    //   const allData = {
    //     title: data.get('title'),
    //     description: data.get('description'),
    //     status: 'OPEN',
    //   };
    //   console.log('allData', allData);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDecriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddTask = async () => {
    if (title && description) {
      await axios.post('/tasks', { title, description });

      dispatch(getTasks());
    }
  };
  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          required
          fullWidth
          label='Title'
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Description'
          id='description'
          value={description}
          onChange={handleDecriptionChange}
        />
        <Button onClick={() => handleAddTask()} variant='outlined'>
          Add a task
        </Button>
      </Box>
    </Box>
  );
}