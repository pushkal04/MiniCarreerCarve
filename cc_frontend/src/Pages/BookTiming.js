import React, { useState, useEffect } from 'react'
import Navbar from '../Navigation/Navbar.js'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './BookTiming.css'
const BookTiming = () => {
  const [mentorNames, setMentorNames] = useState([]);
  const [student_name, setStudentName] = useState("");
  const [mentor_name, setMentorName] = useState("");
  const [duration, setDuration] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getMentorNames')
      .then(response => response.json())
      .then((data) => setMentorNames(data))
    
      fetch('http://localhost:8080/getBookingTable')
      .then(response => response.json())
      .then((data) => setRows(data))
  }, [])

  const data =
  {
    "name": student_name,
    "mname": mentor_name,
    "duration": duration.toString()
  }

  const handleBook = () => {
    //console.log(JSON.stringify(data));
    fetch('http://localhost:8080/tryBooking',{
      method:'POST',
      headers:{
        "Content-type":"application/json",
        Accept:"application/json"
      },
      body:JSON.stringify(data)
    }).then(response=>response.json())
    .then((res)=>console.log(res))
    .then(() => window.location.reload())

    setStudentName("");
    setMentorName("");
    setDuration("");
  }

  return (
    <div>
      <Navbar />
      <div className='page'>
        <div className='studentForm'>
          <h2>Book Mentor</h2>
          <label>Student name </label>
          <input type="text" value={student_name}
            onChange={(e) => setStudentName(e.target.value)} />

          <label>Select mentor </label>
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" value={mentor_name} onChange={(e) => setMentorName(e.target.value)}>
              <option selected>Open this select menu</option>
              {mentorNames.map((item) => {
                return <option value = {item}>{item}</option>
              })}
            </select>
            <label for="floatingSelect">Available Mentors</label>
          </div>

          <label>Select Time </label>
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option selected>Open this select menu</option>
              <option value = {30}>30</option>
              <option value = {45}>45</option>
              <option value = {60}>60</option>
            </select>
            <label for="floatingSelect">Available Duration</label>
          </div>
          <button className = "btn btn-success" onClick={handleBook}>Book</button>
        </div>


        <div className = "divtable">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col">Mentor Name</th>
                <th scope="col">Student Name</th>
                <th scope="col">From Time</th>
                <th scope="col">To Time</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item) => {
                  return (
                    <tr key={item.mentorID}>
                    <td>{item.mentorName}</td>
                    <td>{item.studentrName}</td>
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

export default BookTiming