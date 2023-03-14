import React from 'react'
import { useState, useEffect } from 'react';
import Todotable from '../../components/Todotable';
import Button from 'react-bootstrap/Button';
import { getallTodos } from '../../services/apis';
import GridTable from '../../components/GridTable';
import { useDispatch } from 'react-redux';
import { getTodoCount } from '../../Reducer/MyReducer';
import { GetAppContext } from '../../context/appContext';




function Home() {
    const dispatch = useDispatch()
    const { toggleTheme } = GetAppContext();
    const [data, setData] = useState([]);
    const [showtable, setShowtable] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getallTodos().then(res => {
            setData(res.data)
            console.log(res.data.length)
            dispatch(getTodoCount(res.data.length))
        }).catch(error => console.error(error))
    }


    return (
        <>
            <div className='d-flex justify-content-end'>
                <Button variant="primary" className='mx-5 mt-4' onClick={toggleTheme}> Theme</Button>
            </div>
            <div className='m-5 mt-3'>
                <Todotable data={data} />
            </div>
        </>

    )
}

export default Home