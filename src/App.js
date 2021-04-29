
import './App.css';
import { useState,useEffect } from "react";
import AXIOS from "axios";
import Modal from "react-modal";

function App() {

  const getData = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const json = await res.json();
    setUsers(json);
 
  };

  useEffect(() => {
    getData();
    console.log("we are live")
  }, [])

  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState([])
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [delId, setDelId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const addUser = (e) => {
    e.preventDefault();

    let data = {
      id: Math.floor(Math.random() * 1000),
      name,
      job
    };

    if (users === null) {
      AXIOS.post("http://localhost:3000/posts",data)
      .then((res)=>{
        console.log("it worked"+res);
      })
      let arr = [data];
      setUsers(arr);
    } else {
      AXIOS.post("http://localhost:3000/posts",data)
      .then((res)=>{
        console.log(res);
      })
      let arr = [data, ...users];

      setUsers(arr);
    }

    setName("");
    setJob("");
  };

  const deleteUser = (id) => {
    setOpenDeleteModal(true);
    // console.log(delId)
    setDelId(id);
  };

  const editUser = (id)=>{
    setOpenUpdateModal(true)
    AXIOS.get("http://localhost:3000/posts/"+id).then((res)=>{
    setResponse(res.data)
    })
  }

  const closeModal = (e) => {
    e.preventDefault();
    setOpenDeleteModal(false);
    setOpenUpdateModal(false);
  };

  const confirmModal = () => {
    let removeUser = [...users].filter((user) => user.id !== delId);
    AXIOS.delete("http://localhost:3000/posts/"+delId);
    setUsers(removeUser);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <div className="App">
      <h2>signup </h2>
      <form>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="your job"
          value={job}
          onChange={(event) => setJob(event.target.value)}
        />
        <button disabled={!name || !job} onClick={addUser}>
          Add user
        </button>
        <Modal
          isOpen={openDeleteModal}
          ariaHideApp={false}
          className="mymodal"
          overlayClassName="myoverlay"
        >
          <h2>Do you really wanna delete this user?</h2>
          <button className="sm-btn" onClick={confirmModal}>
            yes
          </button>
          <button
            className="sm-btn"
            style={{ marginLeft: "12px" }}
            onClick={closeModal}
          >
            no
          </button>
        </Modal>
        <Modal
         isOpen={openUpdateModal}
         ariaHideApp={false}
         >
        <h2>update user</h2>
        <label>name</label>
        <input type="text" value={response.name} onChange={(event) => setName(event.target.value)} />
        <label>Job</label>
        <input type="text" value={response.job} onChange={(event) => setJob(event.target.value)}/>
        <button className="sm-btn">
           Update
          </button>
          <button
            className="sm-btn"
            style={{ marginLeft: "12px" }}
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal>
      </form>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>Job</th>
            <th></th>
          </tr>

          {users.map((info) => (
            <tr key={info.id}>
              <th>
                <label>
                {info.name}
                </label>
                </th>
              <th>{info.job}</th>
              <th>
                {" "}
                <button
                  className="sm-btn"
                  onClick={() => {
                    editUser(info.id);
                  }}
                >
                  edit
                </button>
                <button
                  className="sm-btn"
                  style={{marginLeft:"12px"}}
                  onClick={() => {
                    deleteUser(info.id);
                  }}
                >
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     
    </>
  );
}

export default App;
