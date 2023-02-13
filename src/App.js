import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircle,
  faCircleCheck, faPen, faTrashCan 
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  // States declaration

  const [toDo, setToDo] = useState([
    {id:1,task:"Go to church",status:false},
    {id:2,task:"Cook",status:true},
    {id:3,task:"Pray",status:false}
  ])
  const [newTask, setNewTask]=useState('');
  const[updateData, setUpdateData]=useState('')


//Functions Declaration 
  const addTask=()=>{
    if(newTask){
      let number = toDo.length+1;
      let newInput = {id:number, task:newTask, status:false}
      setToDo([...toDo,newInput]);
      setNewTask('')
    }

  }
  const deleteTask = (id) => {
    let newTask = toDo.filter(task=>task.id!==id)
    setToDo(newTask)
   
  }
  const markDone = (id) => {
    let newStatus = toDo.map(task=>{
      if(task.id === id){
        return({...task,status:!task.status})
      }
      return task;
    })
   setToDo(newStatus);
  }
 
  const changeTask = (e) => {
    let newEntry ={
      id: updateData.id,
      task: e.target.value,
      status: updateData ?true:false

    }
    setUpdateData(newEntry)
  
  }
  const updateTask = () => {
    let filterEntry = [...toDo].filter(task=>task.id !== updateData.id )
    let updatedObject =[...filterEntry,updateData]
    setToDo(updatedObject)
    setUpdateData('')
   
  }

 
  return (
    <div className="App">
      <br/><br/>
      <h2>ToDo List App</h2>
      <br/><br/>
      <div className='top-content'>
      <div className='form-div'>
        {updateData?( <input value={updateData.task} className='form' onChange={(e)=>{
          changeTask(e)}}/>):( <input value={newTask} className='form' onChange={(e)=>{
          setNewTask(e.target.value)}}/>)}
        
      </div>
      <div className='button-div'>
        <button onClick={addTask} className='add-task'>Add Task</button>
      </div>
      <div className='button-div'>
        <button onClick={updateTask} className='add-task'>Update</button>
      </div>
      </div>
      {toDo && toDo.length ? '' : 'No Tasks...'}
      {toDo && toDo.map((task,index)=>{
        return(
         
        <React.Fragment>
         
          <div className='content'>
          <div className='tasks'>
            <div className={task.status ? 'done' : 'undone'}>
            <span className='taskNumber'>{index + 1} </span>
            <span className='taskText'>{task.task}</span>
            </div>
            <div className='iconsWrap'>
              {task.status ? ( <span title='Completed' onClick={()=>{markDone(task.id); }}>
              <FontAwesomeIcon className='font' icon={faCircleCheck}  />
              </span>) : ( <span title='Not Completed' onClick={()=>{markDone(task.id); }}>
              <FontAwesomeIcon className='font' icon={faCircle}  />
              </span>)}
             {task.status ? null : ( <span title='Edit' onClick={()=>setUpdateData({
              id:task.id,
              task: task.task,
              status: task.status ? true:false
             })}>
              <FontAwesomeIcon className='font' icon={faPen} />
              </span>)}
             
              <span title='Delete' onClick={()=>deleteTask(task.id)}>
              <FontAwesomeIcon className='font' icon={faTrashCan} />
             
              </span>

            </div>
          </div>
          </div>
        </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;
