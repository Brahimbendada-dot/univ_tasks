import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";

import axios from 'axios';
import CommentModel from './CommentModel';

const Dashboard = () => {
  const [modules, setModules] = useState([])
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [showCommentModel, setShowCommentModel] = useState({
    show:false,
    name:'',
    description:'',
    id:''
  })


  const getTasksOfSpecificModule = (id) => {
    axios.get(`https://univ-tasks.onrender.com/api/v1/tasks/moduletasks/${id}`)
      .then(res => {
        setTasks(res.data.data.tasks);
        setLoading(false)// res.data is the correct way to access the data // Logging the data to the console
        console.log(tasks)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      });
  }

  const downloadFile = (id, index, filename) => {
    axios.get(`https://univ-tasks.onrender.com/api/v1/tasks/downloadFiles/${id}/${index}`, { responseType: 'blob' })
      .then(res => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const link = document.createElement("a");

        // Create a URL for the blob and set it as the href
        link.href = window.URL.createObjectURL(blob);
        link.download = filename; // Set the filename for download

        // Append the link to the body (necessary for Firefox)
        document.body.appendChild(link);
        link.click(); // Simulate a click on the link to start the download

        // Clean up by removing the link and revoking the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      })
      .catch(error => {
        console.error('Download error:', error); // Improved error logging
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true)
    axios.get("https://univ-tasks.onrender.com/api/v1/modules")
      .then(res => {
        setModules(res.data.data.modules);
        setLoading(false) // res.data is the correct way to access the data // Logging the data to the console
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      });
  }, []); // Dependency array ensures this runs only once after the first render

  console.log(modules)
  return (
    <>
      <section className='section'>
        <section className='left__section'>
          <img className='image__profile' src='/images/bccb2d2d-50ad-45e8-8ba3-d075cf2f8884.jfif' alt='Profile' />
          <h4>Ibrahim Bendada</h4>
          <h6>brahimbendada024@gmail.com</h6>
          {loading && modules ? <div>...</div> :
            modules.map((module, index) => (
              <button className="module__button" key={index} onClick={() => getTasksOfSpecificModule(module._id)}>{module.name}</button>
            ))
          }
        </section>
        <section className='right__section'>
          <p>Note: In this Current new version you can add comment feedback for any home work</p>
          {showCommentModel.show? <CommentModel onClose={() => setShowCommentModel(false)} name={showCommentModel.name} description={showCommentModel.description} id={showCommentModel.id}/>: <></>}
          {tasks && loading ? <div>...</div> :
            tasks.map((task, _task_index) => (
              <div key={_task_index} className='task'>
                <div className='task__name'>
                  <span className='coloriage__span'>{task.name} ({task.description})</span>
                  <Link onClick={() => setShowCommentModel({show:true, name:task.name, description:task.description, id:task._id})} key={_task_index}><FaRegComment /></Link>
                </div>
                <div>
                  {task.files.map((file, _file_index) => (
                    <div key={_file_index} className='tasks__files'>
                      <div className='file__color__name'>{file}</div>
                      <button className="download__button" key={_file_index} onClick={() => downloadFile(task._id, _file_index, file)}><PiDownloadSimpleBold /></button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </section>
      </section>
    </>
  );
};

export default Dashboard;
