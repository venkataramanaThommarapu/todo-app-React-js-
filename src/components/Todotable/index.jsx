import React, { useEffect } from 'react';
// import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../../Pages/Home/ModalDelete';
import { deleteTodo, getallTodos } from '../../services/apis';
import * as moment from 'moment'

import { useState } from 'react';
import { Box, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';





function Todotable(props) {
    const { data } = props;
    const navigatesto = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [getallTodos, setgetallTodo] = useState([])
    const [backuptitle, setBackuptitle] = useState([])


    useEffect(() => {
        setgetallTodo([...data])
        setBackuptitle([...data])
    }, [data])

    function gotoTodoform(item) {
        localStorage.setItem('selectedTodoForEdit', JSON.stringify(item));
        navigatesto(`/todo/${item.id}`)
    }


    const handleDeleteModel = (item) => {
        setSelectedRow(item);
        setOpen(true);
    }

    const onConfirm = () => {
        if (selectedRow && selectedRow.id) {
            deleteTodo(selectedRow.id)
                .then(res => {
                    alert("Deleted Successfully")
                    setOpen(false);
                    window.location.reload();
                }).catch(error => console.error(error))
        }
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const onSearch = (event) => {
        const value = event.target.value.toLowerCase();
        let filteredtitle = backuptitle;
        if (value) {
            filteredtitle = backuptitle.filter(getallTodos => {
                return (
                    getallTodos.title.toString().includes(value)
                )
            })
        };

        setgetallTodo(filteredtitle)
    }




    return (
        <>
            <Box>
                <Box mb={2} p={1} borderRadius={1} sx={{ bgcolor: 'background.default' }} >
                    <TextField variant="outlined" id="Search" label="Search by title"
                        size={'small'} fullWidth onKeyUp={onSearch} />
                </Box>

                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead sx={{ background: "gray" }}>
                            <TableRow >
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>title</b></TableCell>
                                <TableCell><b>completed</b></TableCell>
                                <TableCell><b>target</b></TableCell>
                                <TableCell><b>updatedAt</b></TableCell>
                                <TableCell><b>createdAt</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getallTodos && getallTodos
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <tr key={item.id} className={item.completed ? 'table-td-success' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.completed ? 'Done' : 'Incomplete'}</td>
                                        <td>{moment(item.target).format("l")}</td>
                                        <td>{moment(item.updatedAt).format("l")}</td>
                                        <td>{moment(item.createdAt).format("l")}</td>
                                        <td>
                                            <button className='border-0 mx-2' onClick={() => gotoTodoform(item)}><i className="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button className='border-0' onClick={() => { handleDeleteModel(item) }}><i className="bi bi-trash3 text-danger "></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </TableBody>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            // component="div"
                            count={getallTodos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Table>
                </TableContainer>

                <ModalDelete show={open} onHide={() => setOpen(false)} onConfirm={onConfirm} />
            </Box>
        </>
    )
}

export default Todotable