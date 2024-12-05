import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from '../../utils/axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../features/tasks/getTasksSlice';
import { useTranslation } from 'react-i18next';

export default function AddTask() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
          className='myBox'
          margin='normal'
          required
          fullWidth
          label={t('Title')}
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          className='myBox'
          margin='normal'
          required
          fullWidth
          label={t('Description')}
          id='description'
          value={description}
          onChange={handleDecriptionChange}
        />
        <a href='#' className='myButton' onClick={() => handleAddTask()}>
          {t('Add a task')}
        </a>
      </Box>
    </Box>
  );
}
