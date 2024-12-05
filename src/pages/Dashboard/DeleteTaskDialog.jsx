import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTasks } from '../../features/tasks/tasksSlice';
import axios from '../../utils/axios';
import { useTranslation } from 'react-i18next';
import '../styling/Box.scss';
import '../styling/Dialog.scss';

export default function AlertDialog({ open, setOpen, selectedTaskId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);


  const deleteTask = async () => {
    await axios.delete(`/tasks/${selectedTaskId}`);
    dispatch(getTasks());
    setOpen(false);
  };

  const style = {};
  if (!open) {
    style.display = 'none';
  }

  return (
    <div className='divDialog'>
      <div
        className='dialog'
        ref={wrapperRef}
        style={style}
        onClose={() => setOpen(false)}
      >
        <div className='dialogTitle'>Delete task</div>
        <div className='dialogContent'>
          <p>
            Are you sure you want to delete the task with id: {selectedTaskId} ?
          </p>
        </div>
        <div className='dialogButtons'>
          <a href='#' className='myButton' onClick={() => setOpen(false)}>
            {t(' Disagree')}
          </a>
          <a href='#' className='myButton' onClick={() => deleteTask()}>
            {t('Agree')}
          </a>
        </div>
      </div>
    </div>
  );
  // <Dialog open={open} onClose={() => setOpen(false)}>
  //   <div className='myBox'></div>
  //   <DialogTitle>Delete task</DialogTitle>

  //   <Divider />
  //   <DialogContent>
  //     <DialogContentText>
  //       Are you sure you want to delete the task with id: {selectedTaskId} ?
  //     </DialogContentText>
  //   </DialogContent>

  //   <Divider />

  //   <DialogActions>
  //     <a href='#' className='myButton' onClick={() => setOpen(false)}>
  //       {t(' Disagree')}
  //     </a>
  //     <a href='#' className='myButton' onClick={() => deleteTask()}>
  //       {t('Agree')}
  //     </a>
  //   </DialogActions>
  // </Dialog>
}
