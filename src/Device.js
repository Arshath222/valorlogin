import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from "react";

const rows = [
  {
    deviceName: 'VP100',
    Manufacturer: 'Valor Paytech',
    Feature: 'Bluetooth',
    Status: 'Active'
  },
  {
    deviceName: 'VL100',
    Manufacturer: 'Verifone',
    Feature: 'WIFI',
    Status: 'In-Active',
  },
  {
    deviceName: 'VP300',
    Manufacturer: 'mswipe',
    Feature: 'Smart swipe',
    Status: 'Active',
  },
  {
    deviceName: 'VL110',
    Manufacturer: 'mPOS',
    Feature: 'Portable',
    Status: 'In-Active',
  },
  {
    deviceName: 'VP500',
    Manufacturer: 'World POS',
    Feature: 'Android',
    Status: 'Active',
  },
];


export default function BasicTable() {
  const [openForm, setOpenForm] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedDevice, setEditedDevice] = useState(null);
  const [deviceList, setDeviceList] = useState([]);

  React.useEffect(()=>{
    setDeviceList(rows) 
},[])

  const handleOpenForm = () => {
    setOpenForm(true);
    setEditRow(null);
    setEditedDevice(null);
  };


  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleEdit = (index, row) => {
    setEditRow(index);
    setEditedDevice(row);
    setOpenForm(true);
  };

  const handleDelete = (index) =>{
    const updatedDeviceList = [...deviceList];
    updatedDeviceList.splice(index,1);
    setDeviceList(updatedDeviceList);
  }

  const handleSave = () => {
    const updatedRows = [...rows];
    updatedRows[editRow] = editedDevice;
    setOpenForm(false);
    setDeviceList (updatedRows) ;
  };

  const handleAddSave = () => {
    const updatedDeviceList = [...deviceList,editedDevice];
    setDeviceList(updatedDeviceList);
    setOpenForm(false);
  }

  return (
    <>
   
      <Button variant="contained" onClick={handleOpenForm}>Add Device</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          
            <TableRow>
              <TableCell align="left">
                <Checkbox />
              </TableCell>
              <TableCell>Device Name</TableCell>
              <TableCell align="left">Manufacturer</TableCell>
              <TableCell align="left">Feature</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceList.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                
                  <Checkbox />
                </TableCell>
                <TableCell>{row.deviceName}</TableCell>
                <TableCell align="left">{row.Manufacturer}</TableCell>
                <TableCell align="left">{row.Feature}</TableCell>
                <TableCell align="left">{row.Status}</TableCell>
                <TableCell align="left">
                
                <Button
  variant="outlined"
  size="small"
  style={{
    padding: '4px', 
    backgroundColor: 'greenyellow',
    Width: '100px', 
    fontSize: '0.75rem', 
  }}
  onClick={() => handleEdit(i, row)}
>
  Edit
</Button>

<Button
  variant="outlined"
  size="small"
  style={{
    padding: '4px', 
    backgroundColor: 'orange',
    Width: '100px', 
    fontSize: '0.75rem', 
  }}
   onClick={()=>handleDelete(i)}  

>
  Delete
</Button>


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editRow !== null ? 'Edit Device' : 'Add New Device'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Device Name"
            fullWidth
            value={editedDevice ? editedDevice.deviceName : ''}
            onChange={(e) => setEditedDevice({...editedDevice, deviceName: e.target.value})}
          />
          <TextField
            label="Manufacturer"
            fullWidth
            value={editedDevice ? editedDevice.Manufacturer : ''}
            onChange={(e) => setEditedDevice({...editedDevice, Manufacturer: e.target.value})}
          />
          <TextField
            label="Feature"
            fullWidth
            value={editedDevice ? editedDevice.Feature : ''}
            onChange={(e) => setEditedDevice({...editedDevice, Feature: e.target.value})}
          />
          <TextField
            label="Status"
            fullWidth
            value={editedDevice ? editedDevice.Status : ''}
            onChange={(e) => setEditedDevice({...editedDevice, Status: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={
           editRow !== null ? handleSave:handleAddSave}>Save</Button>
        </DialogActions>
      </Dialog>
     
    </>
  );
}
