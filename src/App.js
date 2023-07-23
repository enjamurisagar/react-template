import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

//icons
import {HiPencilAlt} from 'react-icons/hi'
import { RiDeleteBin2Line } from "react-icons/ri";

const App = () => {

  const [data, setData] = useState([]);
  const [task, setTask] = useState({
    newTask:""
  })

  const getData = () =>{
    axios
      .get("https://to-do-api-ek9r.onrender.com/tasks")
      .then((res) => setData(res.data))
      .catch((err) => err.message);
  }
  useEffect(()=>{
    getData();
  },[])
  // console.log(data)

  const postTask = async(e) =>{
    if(task.newTask.trim()){

    e.preventDefault();
    await axios
      .post("https://to-do-api-ek9r.onrender.com/tasks", task)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
      getData();
      setTask({newTask:""})
    }else window.alert("Task cannot be empty")
  }
  const [edit, setEdit] = useState(false);  
  const [editText, setEditText] = useState({
    newTask:"",
    id:""
  })


  const editPressed = (item) =>{
    setEdit(true);
    editText.newTask = item.newTask
    editText.id = item._id

  }
  console.log(editText)


  const editSubmit = async (e) =>{
    e.preventDefault();
    await axios
      .put(`https://to-do-api-ek9r.onrender.com/tasks/${editText.id}`, editText)
      .then((res) => console.log(res))
      .catch((err) => err.message);

    setEdit(false);
    getData();
  }

  const deleteTask = async(item) =>{
    await axios
      .delete(`https://to-do-api-ek9r.onrender.com/tasks/${item._id}`)
      .then((res) => console.log(res))
      .catch((err) => err.message);
    getData();
  }

  return (
    <div>
      <h1>ToDo App !!! Try now</h1>
      <form>
        <input
        
          className="input"
          type="text"
          value={task.newTask}
          placeholder="Add a ToDo ..."
          onChange={(e) => setTask({ newTask: e.target.value })}
        />
        <button className="btn" onClick={postTask}>
          Add
        </button>
      </form>
      {data.length ? (
        data.map((item) => (
          <div className="tasks" key={item._id}>
            <div className="task">
              <p>{item.newTask}</p>
            </div>
            <div className="btns">
              <button className="edit" onClick={() => editPressed(item)}>
                <HiPencilAlt />
              </button>
              <button className="delete" onClick={() => deleteTask(item)}>
                <RiDeleteBin2Line />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="tasks">
          <div className="task">
            <p>Your Tasks Here ...</p>
          </div>
          <div className="btns">
            {/* <button className="edit">
              <HiPencilAlt />
            </button>
            <button className="delete">
              <RiDeleteBin2Line />
            </button> */}
          </div>
        </div>
      )}

      {/* edit */}
      {edit && (
        <div className="edit-container">
          <div className="edit-wrapper">
            <h2>Change the text and Update</h2>
            <div className="edit-input-div">
            <input
              type="text"
              value={editText.newTask}
              onChange={(e) => setEditText(old =>( {...old, newTask: e.target.value }))}
            /></div>
            <div className="edit-btns">
              <button className="edit-update btn" onClick={editSubmit}>
                Submit
              </button>
              <button className="btn edit-delete" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App