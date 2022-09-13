import React, { useEffect, useState } from "react";
import "./CreateTask.css";
import Select from "react-select";
import banner from "./asset/task.png";
import axios from "axios";
import config from "../../../config.json"
import person from "./asset/person.svg";
import idea from "./asset/Group 322.svg";
import satellitee from "./asset/Group 324.svg";
import batches from "./asset/Group 328.svg";
import taskes from "./asset/Group 451.svg";
import dates from "./asset/Group 334.svg";
import Loading from "../../../components/loading/Loading";
import swal from "sweetalert";

// import idea from "./asset/Group .svg"
const CreateIdeaForm = () => {
  const url = config.server_url;
  const [addBtn, setAddBtn] = useState(false);
  const [items, setItems] = useState([0]);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
 const [loading,setLoading] = useState(false)
  const handleMultipleProducts = (e) => {
    e.preventDefault();
    console.log(selected, quantity);
    if (selected && quantity) {
      setError("");
      setAddBtn(true);
      setItems([...items, items.length]);
      setSelected("");
      setQuantity("");
    } else if (selected && !quantity) {
      setQuantity("");
      setError("Please select the quantity");
    } else if (quantity && !selected) {
      setSelected("");
      setError("Please select the product");
    } else {
      setError("Please select the product");
    }
  };
  const [task, setTask] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [batch, setBatches] = useState([]);
  const [satellite, setSatellite] = useState([]);
  const [satelliteId, setSatelliteId] = useState("");

  const [ideaId, setIdeaId] = useState("");
  const [supervisor, SetSupervisor] = useState([]);
  const [type, setType] = useState([]);

  console.log("check task", task);
  useEffect(() => {
    getIdeaFarm();
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await axios.get(`${url}/show-tasks`);
    console.log("tasks are", response.data.data);
    setTasks(response.data.data);
  };
  const getIdeaFarm = async () => {
    const response = await axios.get(`${url}/show-idea-farms`);
    setTask(response.data.data);
    console.log(response.data.data);
  };

  const handleIdeaFarms = async (e) => {
    let value = e.target.value;
    setIdeaId(value);
    console.log("test value", value);

    const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
    console.log(res.data.data);
    setSatellite(res.data.data);
  };
  const handleSatelliteFarms = async (e) => {
    let value = e.target.value;
    setSatelliteId(value);
    const response = await axios.get(
      `${url}/show-batches?satellite_farm_id='${value}'`
    );
    setBatches(response.data.data);
  };

  const handleBatchFarms = async (e) => {
    let value = e.target.value;
    const response = await axios.get(
      `${url}/show-supervisors?satellite_farm_id='${satelliteId}'&idea_farm_id='${ideaId}'`
    );
    console.log("check response", response);
    SetSupervisor(response.data.data);
  };

  const handleTypeFarms = (e) => {
    const gettask = async () => {
      const response = await axios.get(`${url}/show-tasks?satellite_farm_id=2`);
      setType(response.data.data);
      console.log("check type", response);
    };
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let data = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      let name = e.target[i].name;

      let value = e.target[i].value;

      data[e.target[i].name] = e.target[i].value;
    }
    console.log("data tes", data);
    const res = await axios.post(`${url}/add-task`, data);
    
    if(res.data.status === true){
      setLoading(false)
      swal(`Task assigned successfully`, "", "success", {
       closeOnClickOutside: false,
       className: "warning-swal",
   }).then((value) => {
       if (value) {
           window.location.reload();
       } else return;
   });
   }else {
     setLoading(false)
     swal(`Something went wrong`, "", "warning", {
      closeOnClickOutside: false,
      className: "warning-swal",
  }).then((value) => {
      if (value) {
          window.location.reload();
      } else return;
  });
   }
  };
  return (
      <>
    <div className="create-form1">
      <form onSubmit={(e) => formSubmit(e)}>
        <h3 className="table_heading">Create Task</h3>
        <div className="task-grid-container">
          <div className="task-grid">
            <div>
              <div className="task-address-grid-container">
                <div className="task-single-inp">
                  <img src={idea} alt="" className="icon" />
                  <span className="vertical-line"></span>
                  <select
                    name="name"
                    onChange={(e) => handleIdeaFarms(e)}
                    required
                  >
                    <option>Select Idea Farm</option>
                    {task.map((elem) => (
                      <option value={elem.value} key={elem.value}>
                        {elem.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="task-single-inp">
                  <img src={satellitee} alt="" className="icon" />
                  <span className="vertical-line"></span>
                  <select
                    name="satellite_name"
                    onChange={(e) => handleSatelliteFarms(e)}
                    required
                  >
                    <option value="">Select satellite farm</option>
                    {satellite.map((elem) => (
                      <option value={elem.value} key={elem.value}>
                        {elem.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="task-single-inp">
                  <img src={batches} alt="" className="icon" />
                  <span className="vertical-line"></span>
                  <select
                    name="batch_id"
                    onChange={(e) => handleBatchFarms(e)}
                    required
                  >
                    <option value="">Select Batch ID</option>
                    {batch.map((elem) => (
                      <option value={elem.value} key={elem.value}>
                        {elem.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="task-single-inp">
                  <img src={person} alt="" className="icon" />
                  <span className="vertical-line"></span>
                  <select name="supervisor_id" required>
                    <option value="">Select supervisor name</option>
                    {supervisor.map((elem) => (
                      <option value={elem.supervisor_id} key={elem.id}>
                        {elem.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="task-single-inp">
                  <img src={taskes} alt="" className="icon" />
                  <span className="vertical-line"></span>
                  <select
                    name="task_type"
                    onChange={(e) => handleTypeFarms(e)}
                    required
                  >
                    <option value="">Task Type</option>
                    {tasks.map((elem) => (
                      <option value={elem.task_name} key={elem.id}>
                        {elem.task_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="task-single-inp">
                  <textarea
                    name="task_description"
                    placeholder="Type Description"
                    required
                  ></textarea>
                </div>
                <div className="task-single-inp">
                  <img src={dates} alt="" className="icon" />
                  <span className="vertical-line"></span>

                  <input
                    name="date"
                    type="datetime-local"
                    className="create_stock_shipped_date width_25"
                    placeholder="Shipped Date"
                    required
                  />
                  <div className="hatchery-btn">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="task-grid">
            <img className="banner" src={banner} alt="" />
          </div>
        </div>
      </form>
    </div>
{
    loading && <Loading />
}
    </>
  );
};

export default CreateIdeaForm;
