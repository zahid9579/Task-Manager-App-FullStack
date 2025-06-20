import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import './AddTask.css'

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



//   Data fetching here
  const onSubmit = async(data) => {
   try {
     const response = await axios.post("http://127.0.0.1:5000/api/task/create/", data);
     console.log({"msg": "Task Created"},response.data)
     reset();

   } catch (error) {
    console.log(error)
    
   }
  };

  return (
    <>
      <div>
        <h1>Create A Task</h1>

        {/* Creating a From to Add Task  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the Task..."
              {...register("title", { required: "This field is required" })}
            />
            {errors.title && (
              <div style={{ color: "red" }}>{errors.title.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              placeholder="Enter the description..."
              {...register("description", {
                required: "This field is required",
              })}
            />
            {errors.description && (
              <div style={{ color: "red" }}>{errors.description.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="assignedTo">AssignedTo: </label>
            <input
              type="text"
              id="assignedTo"
              placeholder="Assigne to..."
              {...register("assignedTo", {
                required: "This field is required",
              })}
            />
            {errors.assignedTo && (
              <div style={{ color: "red" }}>{errors.assignedTo.message}</div>
            )}
          </div>
          

          {/* Dropdown To choose based on status */}
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" {...register("status")} defaultValue="">
              <option value="">-- Select --</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <button type="submit">Create Task</button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
