import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


const getLocalItem =()=>{
  let list = localStorage.getItem("lists");
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }else {
    return [];
  }

}
const App = () => {
  const [data,setData] = useState();
const [record,setRecord] = useState(getLocalItem());
  const handleInput=(e)=>{
    setData(e.target.value);

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
   
    if(!data){
      alert("please enter something!");
    }else {
       setRecord([...record,data]);
    setData("");
      
    }


  }
  const handleDelete=(id)=>{
    const updated = record.filter((cur,i)=> {
      return i !== id;
    });
    setRecord(updated);

  }

  const removeAll=()=>{
    setRecord([]);
  }

  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(record))

  },[record]);
  return (
    <div className="container text-center">
      <h2>Todo-list</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <input className="p-1 m-3 w-50" type="text" value={data} onChange={handleInput}/>
        <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
      <div>
        {
          record.map((cur,i)=>{
            return(
              <div key={i}>
              <p className="bg-info navbar p-2  w-50 mx-auto" style={{fontSize:"20px"}}>{cur} <i style={{cursor:"pointer",fontSize:"20px"}} className="fa fa-trash" onClick={()=>{handleDelete(i)}}></i></p>
              </div>
              )
          })
        }
      </div>
      <button type="submit" className="btn btn-danger w-50" onClick={removeAll}>Remove All</button>
    </div>
  )
}

export default App;
