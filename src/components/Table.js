import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TableComponent = () => {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);

    const [apiFail, setApiFail] = useState({
        status: false, err: ''
    })

    useEffect(() => {
        setApiFail({status: false, err: ''});
        axios.get('https://crud-api-3jh9.onrender.com/users')
        .then(res => {
            if(res.data.length) {
                setColumns(Object.keys(res.data[0]))
                setRecords(res.data)
            }
        })
        .catch(err => {
            setApiFail({status: true, err: err.message || 'Something went wrong in api'})
        })
    }, [])

    const handleDelete = (id) => {
        const cnfm = window.confirm('Do you want to delete this record');
        if(cnfm) {
            axios.delete('https://crud-api-3jh9.onrender.com/users/'+ id)
            .then(res => {
                alert('Deleted Successfully');
                console.log("res: ", res);
                // navigate('/');
                const result = records.filter(record => record.id !== id);
                setRecords(result);
            })
            .catch(err => console.log(err.message))
        }
    }

    if(apiFail?.status) {
        return <h2 className='mt-5 text-xl text-red-500'>{apiFail?.err}</h2>
    }

  return (
    <div>
      <div className='flex justify-end'>
          <Link to="/add" as={Link}>
             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-content-end">Add</button>
          </Link>
      </div>
      {
          (!records.length && <h2 className='mt-5 text-xl text-red-500'>No records found...</h2>)
      }
      {
          records.length !== 0 &&
        <table className="border-collapse border border-slate-500 text-center w-full mt-6">
            <thead>
                <tr>
                    {
                        columns.map((col, i) => (
                            <th className='border' key={i}>{col}</th>
                        ))
                    }
                    <th className='border'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                records.map((data, i) =>(
                        <tr key={i} className="odd:bg-white even:bg-slate-50">
                            <td className='border'>{data.id}</td>
                            <td className='border'>{data.name}</td>
                            <td className='border'>{data.email}</td>
                            <td className='border py-2'>
                                <Link className='text-white font-medium rounded-lg text-sm px-5 py-1 mr-1 mb-1 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-content-end'
                                    to={`/update/${data.id}`}>Update</Link>
                                <button type='button' className='text-white font-medium rounded-lg text-sm px-5 py-1 mr-1 mb-1 mt-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 justify-content-end'
                                    onClick={() => handleDelete(data.id)}> Delete</button>
                            </td>
                            
                        </tr>
                    ) )
                }
            </tbody>
            </table>
    }
    </div>
  )
}

export default TableComponent
