import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateComponent = () => {
    const [inputData, setInputData] = useState({id: '', name: '', email: ''});
    const {id} = useParams()

    const navigate = useNavigate();

    useEffect(() => { 
        axios.get('https://crud-api-3jh9.onrender.com/users'+ id)
        .then(res => {
            setInputData(res.data);
            console.log("Data: ", res.data);
        }).catch(err => {
            console.log(err.message)
        })

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Event: ", event);
        axios.put('https://crud-api-3jh9.onrender.com/users/'+id, inputData)
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
        placeholder="name" type="text" name='id' disabled value={inputData.id} onChange={(e) => setInputData({...inputData, id: e.target.value})}/>
        </div>
        <div className='form-control mb-3'>
            <input className="border-gray-500 px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm" 
        placeholder="name" type="text" name='name' value={inputData.name} onChange={(e) => setInputData({...inputData, name: e.target.value})}/>
        </div>
        <div className='form-control mb-3'>
            <input className="border-gray-500 px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm" 
        placeholder="email" type="email" name='email' value={inputData.email} onChange={(e) => setInputData({...inputData, email: e.target.value})}/>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-content-end">
            Update</button>
      </form>
    </div>
  )
}

export default UpdateComponent
