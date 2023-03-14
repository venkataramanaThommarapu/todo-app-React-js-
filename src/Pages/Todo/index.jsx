import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { addTodo, editTodo } from '../../services/apis';
import { useParams } from 'react-router-dom';
import * as moment from 'moment'
// import DatePicker from 'react-bootstrap-date-picker';
import { useNavigate } from 'react-router-dom';


const todoFormPayload = {
    title: "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    target: new Date(),
}




function CreateTodo(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todoForm, setTodoForm] = useState({ ...todoFormPayload });
    const [isEditmode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const selectedStringfyTodoItem = localStorage.getItem('selectedTodoForEdit');
            const selectedTodoItem = JSON.parse(selectedStringfyTodoItem);

            if (selectedTodoItem.id == id) {
                const todoFormEditForm = {
                    ...todoFormPayload,
                    title: selectedTodoItem.title,
                    completed: selectedTodoItem.completed,
                    updatedAt: new Date(),
                    createdAt: selectedTodoItem.createdAt,
                    target: new Date(selectedTodoItem.target),
                }

                setTodoForm({ ...todoFormEditForm })
            }
        } else {
            setIsEditMode(false)
        }
    }, [])


    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setTodoForm({
            ...todoForm,
            [name]: value
        })
    }

    const handleCheckChange = (event) => {
        let name = event.target.name;
        let value = event.target.checked;

        setTodoForm({
            ...todoForm,
            [name]: value
        })
    }


    const addNewTodo = () => {
         let one=document.getElementById("para")
        let two=document.getElementById("input")
        
        addTodo(todoForm).then(res => {
            console.log("res==0", res);
            alert("New Record Added Successfully");
            navigate('/')

        }).catch(error => console.error(error))
    }


    const updateTodo = () => {
        let one=document.getElementById("para")
        let two=document.getElementById("input")
        if(two.value.length == 0){
            one.textContent="this can't be empty"

        } else{

        
        editTodo(id, todoForm).then(res => {
            console.log("edit==0", res);
            alert("Record Updated Successfully");
            navigate('/')
        }).catch(error => console.error(error))
    }

    }

    const dateForPicker = (dateString) => {
        return moment(new Date(dateString)).format('YYYY-MM-DD')
    };


    return (
        <Container className='my-5 w-75'>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id="input" placeholder="Enter Title" name='title' value={todoForm.title} onChange={handleChange} Required/>
                    <p id="para"></p>
                    <Form.Group className="mt-2" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Completed" name="completed" checked={todoForm.completed} onChange={handleCheckChange} />
                    </Form.Group>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Target</Form.Label>
                    <Form.Control type="date" placeholder="Target" required name='target' value={todoForm.target ? dateForPicker(todoForm.target) : ''} onChange={handleChange}  />
                </Form.Group>

                <Button variant="primary" onClick={() => { isEditmode ? updateTodo() : addNewTodo() }}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default CreateTodo;