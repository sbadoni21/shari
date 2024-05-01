'use client'
import React, { useEffect, useState } from "react";
import { getDocs, query, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; 
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import {
  bigHighlightedLineModel,
  galleryModel,
  listModel,
  paragraphModel,
  routineModel,
  smallItalicLineModel,
  stepModel,
} from "../../models/dataModels";

const Blogs = () => {
  const [routineData, setRoutineData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleOpenDialog = (model) => {
    setSelectedModel(model);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(collection(db, "routines"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => {
          const routine = doc.data();
          return {
            title: routine.title,
            uid: routine.uid,
            description: routine.description,
            heroImage: routine.heroImage,
            timestamp: routine.timestamp
          };
        });
        setRoutineData(data);
      }
    };

    fetchRoutineData();
  }, []);

  return (
    <div className='p-20'>
      <Button onClick={() => handleOpenDialog(routineModel)}>Blog Main Detials</Button>
      <Button onClick={() => handleOpenDialog(bigHighlightedLineModel)}>Big Highlighted Line</Button>
      <Button onClick={() => handleOpenDialog(galleryModel)}>Gallery</Button>
      <Button onClick={() => handleOpenDialog(listModel)}>List</Button>
      <Button onClick={() => handleOpenDialog(paragraphModel)}>Paragraph</Button>
      <Button onClick={() => handleOpenDialog(smallItalicLineModel)}>Small Italic Line</Button>
      <Button onClick={() => handleOpenDialog(stepModel)}>Steps</Button>
     <DataEntryDialog open={openDialog} handleClose={handleCloseDialog} model={selectedModel} />
    </div>
  );
}
const DataEntryDialog = ({ open, handleClose, model }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({});
    handleClose();
  };

  return (
    <dialog open={open} onClose={handleClose}>
      <h1>Add Data</h1>
      <div>
        {model && Object.keys(model)?.map((key) => (
          <TextField
            key={key}
            label={key}
            value={formData[key] || ""}
            onChange={(e) => handleInputChange(key, e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        ))}
      </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </dialog>
  );
};


export default Blogs;
