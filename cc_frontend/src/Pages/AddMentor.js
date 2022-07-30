import React, { useState, useEffect } from 'react'
import Navbar from '../Navigation/Navbar.js'
import { TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './AddMentor.css'

const AddMentor = () => {
  const [name, setName] = useState("");
  const [fTime, setFtime] = useState(new Date());
  const [tTime, settTime] = useState(new Date());
  const [rows, setRows] = useState([]);
  const handleChange = (newValue) => {
    setFtime(newValue);
  };
  const handleChange1 = (newValue) => {
    settTime(newValue);
  };

  const data={
    "name": name,
    "tfrom": ((fTime.getHours()<10? `0${fTime.getHours()}` : fTime.getHours())+':'+(fTime.getMinutes()<10? `0${fTime.getMinutes()}` : fTime.getMinutes())+':'+'00').toString(),
    "tto": ((tTime.getHours()<10? `0${tTime.getHours()}` : tTime.getHours())+':'+(tTime.getMinutes()<10? `0${tTime.getMinutes()}` : tTime.getMinutes())+':'+'00').toString()
  }


  useEffect(() => {
    fetch('http://localhost:8080/getMentorTable')
      .then(response => response.json())
      .then((data) => setRows(data))
  }, [])

  const handleAddMentor = () => {

    fetch('http://localhost:8080/addMentorSlot',{
      method:'POST',
      headers:{
        "Content-type":"application/json",
        Accept:"application/json"
      },
      body:JSON.stringify(data)
    }).then(response=>response.json())
    .then((res)=>console.log(res))
    .then(() => window.location.reload())

  }

  return (
    <div >
      <Navbar />
      <div className = "page">
      <div className="cardForm">
        <h2>Add Mentor</h2>
        <label>Mentor name </label>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
        <h4>Select Time Available</h4>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <label>Available From</label>
          <TimePicker
            labelId="select-from-time"
            label=""
            value={fTime}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} style={{ paddingTop: '10px' }} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <label>Available To</label>
          <TimePicker
            labelId="select-to-time"
            label=""
            value={tTime}
            onChange={handleChange1}
            style={{ paddingTop: '10px' }}
            renderInput={(params) => <TextField {...params} style={{ paddingTop: '10px' }} />}
          />
        </LocalizationProvider>
        <button onClick={handleAddMentor} className = "btn btn-success">Submit</button>
        </div>
        <div className = "divtable">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col">Mentor Name</th>
                <th scope="col">Available From</th>
                <th scope="col">Available To</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item) => {
                  return (
                    <tr key={item.mentorID}>
                    <td>{item.mentorName}</td>
                    <td>{item.fTime}</td>
                    <td>{item.tTime}</td>
                  </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        </div>
      </div>
  )
}

export default AddMentor
