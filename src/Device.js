import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List } from '@mui/material';
import { useState,useEffect } from "react";
import ListIcon from '@mui/icons-material/List';
import { Navigate, useNavigate } from 'react-router-dom';

export default function BasicTable() {
  const [openForm, setOpenForm] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedDevice, setEditedDevice] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const devices = localStorage.getItem("devices") ? JSON.parse(localStorage.getItem("devices")) : []
    setDeviceList(devices);
  }, []);

 

  const open = Boolean(anchorEl);
  const handleClick = (event,index) => {
    setAnchorEl(event.currentTarget);
    setEditRow(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

 

  const handleDelete = (index) => {
    const updatedDeviceList = [...deviceList];
    updatedDeviceList.splice(index, 1);
    localStorage.setItem('devices',JSON.stringify(updatedDeviceList));
    setDeviceList(updatedDeviceList);
  };

  const Navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('devices');
    Navigate('/');
  }

  const handleSave = () => {
    if(!editedDevice || !editedDevice.deviceName || !editedDevice.Manufacturer || !editedDevice.Feature || !editedDevice.Status){
      alert('Please fill all the fields');
      return;
    }
    const updatedRows = [...deviceList];
    updatedRows[editRow] = editedDevice;
    setOpenForm(false);
    localStorage.setItem('devices',JSON.stringify(updatedRows));
    setDeviceList(updatedRows);
  };

  const handleAddSave = () => {
  if(!editedDevice || !editedDevice.deviceName || !editedDevice.Manufacturer || !editedDevice.Feature || !editedDevice.Status){
    alert('Please fill all the fields');
    return;
  }
    const updatedDeviceList = [...deviceList, editedDevice];
    localStorage.setItem('devices',JSON.stringify(updatedDeviceList));
    setDeviceList(updatedDeviceList);
    setOpenForm(false);
  
  };

  const handleHeaderCheckboxChange = () => {
    const updatedDeviceList = deviceList.map(device => ({
      ...device,
      checked: !selectAll
    }));
    setDeviceList(updatedDeviceList);
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    const updatedDeviceList = [...deviceList];
    updatedDeviceList[index].checked = !updatedDeviceList[index].checked;
    setDeviceList(updatedDeviceList);
    const allChecked = updatedDeviceList.every(device => device.checked);
    setSelectAll(allChecked);
  };
 

  return (
    <>
      <div style={{ marginRight: 'auto', display:'flex',justifyContent:'space-between' }}> 
      <Button className = "add-button" variant="contained" onClick={handleOpenForm}>Add Device</Button>
    <Button onClick={handleLogout}>Logout</Button>
  </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  checked={selectAll}
                  onChange={handleHeaderCheckboxChange}
                />
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
                  <Checkbox
                    checked={row.checked || false}
                    onChange={() => handleCheckboxChange(i)}
                  />
                  
                </TableCell>
                <TableCell>{row.deviceName}</TableCell>
                <TableCell align="left">{row.Manufacturer}</TableCell>
                <TableCell align="left">{row.Feature}</TableCell>
                <TableCell align="left">{row.Status}</TableCell>
                <TableCell align="left">
                  
                
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e)=>handleClick(e,i)}>
                       <ListIcon/>
                  </Button>

                  
                  {i===editRow && (<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleEdit(i, row)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(i)}>Delete</MenuItem>
        
      </Menu>)}
                </TableCell>
              </TableRow>
            ))}   
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editRow !== null ? 'Edit Device' : 'Add New Device'}</DialogTitle>
        <DialogContent sx={{ '& > :not(style)': { marginBottom: '20px' } }}>
          <TextField
            label="Device Name"
            variant="outlined"
            fullWidth
            
            value={editedDevice ? editedDevice.deviceName : ''}
            onChange={(e) => setEditedDevice({ ...editedDevice, deviceName: e.target.value })}
          />
          <TextField
            label="Manufacturer"
            variant="outlined"
            fullWidth
            
            value={editedDevice ? editedDevice.Manufacturer : ''}
            onChange={(e) => setEditedDevice({ ...editedDevice, Manufacturer: e.target.value })}
          />
          <TextField
            label="Feature"
            variant="outlined"
            fullWidth
            
            value={editedDevice ? editedDevice.Feature : ''}
            onChange={(e) => setEditedDevice({ ...editedDevice, Feature: e.target.value })}
          />
          <TextField
            label="Status"
            variant="outlined"
            fullWidth
           
            value={editedDevice ? editedDevice.Status : ''}
            onChange={(e) => setEditedDevice({ ...editedDevice, Status: e.target.value })}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={editRow !== null ? handleSave : handleAddSave}>Save</Button>
  
        </DialogActions>
   
      </Dialog>
    </>
  );
}
