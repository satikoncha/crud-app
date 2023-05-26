import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddComponent = () => {
    const [inputData, setInputData] = useState({name: '', email: ''});

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://crud-api-3jh9.onrender.com/users', inputData)
        .then(res => {
            alert('Record added successfully');
            navigate('/')
        }).catch(err => {
            console.log(err.message)
        })
    }
  return (
    <div>
      <h2 className='text-xl text-green mt-3 mb-3'>Add Record</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-control mb-3'>
            <input className="border-gray-500 px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm" 
        placeholder="name" type="text" onChange={(e) => setInputData({...inputData, name: e.target.value})}/>
        </div>
        <div className='form-control mb-3'>
            <input className="border-gray-500 px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm" 
        placeholder="email" type="email" onChange={(e) => setInputData({...inputData, email: e.target.value})}/>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-content-end">Add</button>
      </form>
    </div>
  )
}

export default AddComponent
