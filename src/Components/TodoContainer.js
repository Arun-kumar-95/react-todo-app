// IMPORTING THE STYLES
import "../styles.css";

// IMPORTING THE TOAS AND TOAST CONTAINER FOR SENDING THE ALERT MESSAGE
import { ToastContainer, toast } from "react-toastify";
// IMPORTING THE CSS FOR THE TOAST NOTIFICATION
import "react-toastify/dist/ReactToastify.css";

// IMPORTING THE REACT , USE STATE AND USE EFFECT HOOK FROM REACT
import React, { useState, useEffect } from "react";
import Todo from "./Todo";

// IMPORTING THE APP FEATURES
import ClearButton from "./ClearButton";
import {
  getALLTodos,
  createNewTodo,
  deleteTodo,
  updateTodo,
  generateRandomHexColor,
} from "../ApiFeature";
import ButtonUpdate from "./ButtonUpdate";
import AddButton from "./ButtonAdd";
import UpdateTodoButton from "./ButtonComplete";

// DEFING THE APP FUNCTION
const TodoContainer = () => {
  // DEFINGI THE STATE TO KEEP TODOS
  const [todos, setTodos] = useState([]);

  // DEFING THE STATE FOR ADDING THE NEW TASK WHILE CREATING THE NEW TODOS
  const [task, setTask] = useState({});
  // DEFINING THE STATE USED WHEN WE WANT TO UPDATE THE TODOS
  const [update, setUpdate] = useState(false);
  // INITIALIZING THE UPDATED TO ID
  let updateTodoId = null;

  // MAKING THE FETCH REQUEST TO COLLECT ALL THE TODOS OF USER ID I
  useEffect(() => {
    // DEFINING THE ASYNC FUNCTION TO GET ALL THE TODOS
    const allTodos = async () => {
      // MAKING THE REQUEST TO THE API TO GET ALL THE TODOS
      const responseData = await getALLTodos();
      // DESTRUCTURING THE RESULTS FROM RESPONSE
      const { success, data } = responseData;

      // ALL ALL TODOS TO THE LIST IF THE REQUEST IS SUCCESS
      if (success) {
        // ADDING ALL TODOS VIA SET TODOS FUNCTION
        setTodos(data);
      }
    };
    // CALLING THE ALL TODOS FUNCTION FOR ONCE WHEN THE PAGE RENDERS
    allTodos();
  }, []);

  // DEFINING THE FUNCTION FOR INPUT WHICH TRIGGERS WHEN THERE IS ANY CHANGE OCCURS INSIDE INPUT
  const handleChange = (e) => {
    // SETTING THE NAME OF THE INPUT
    const name = e.target.name;
    // GETTING THE VALUE OF THE INPUT
    const value = e.target.value;
    // ADDING TO THE TASK VIA SET TASK FUNCTION TO KEEP TRACK OF THE INPUT VALUES
    setTask((values) => ({ ...values, [name]: value }));
  };

  // DEFING THE SUBMIT FUNCTION WHICH TRIGGERS WHEN THE FORM IS SUBMITTING
  const handleSubmit = async (e) => {
    // PREVENT THE DEFAULT BEHAVIOR TO THE FORM
    e.preventDefault();
    
//     CHECK FOR EMPTY TODO 
     if (task.todoTitle === undefined) {
      toast("Cann't create Empty Todo");
      return;
    }
    
    // DESCTRUCTURING THE TODO TITLE FROM THE TASK
    const { todoTitle } = task;
    // MAKING THE API CALL TO CREATE NEW TODO ITEM
    const todoItem = await createNewTodo(todoTitle);
    // DESCRECTURING FROM TODO ITEM
    const { title, userId, id } = todoItem.data;
    // CREATING THE BACKGROUND COLOR BY GENERATE RANDOEM COLOR FUNCTION
    const background = generateRandomHexColor();
    // ADDING THE COMPLETE AND BACKGROUND TO THE NEW TODO ITEM
    setTodos([{ title, userId, id, completed: false, background }, ...todos]);

    // SETTING THE SET TASK TO EMPTY
    setTask({});
    // THROWING THE MESSAGE AFTER SUCCESSFULCREATION OF THE TODOS
    toast("Todo Created");
  };

  // DEFINGING THE DELETE FUNCTION
  const handleDelete = async (e) => {
    // PREVENTING THE CLICK EVENT FROM PROPAGATING TO THE PARENT
    e.stopPropagation();
    // CONVERTING THE DELET TODO ITEM ID TO NUMBER
    const id = Number(e.target.id);
    // MAKING AN API CALL TO DELETE THE TODOS
    const response = await deleteTodo(id);
    // IF THE RESPONSE IS SUCCESS
    if (response.success) {
      //remove the item from the todo list
      const data = todos.filter((item, index) => {
        return index !== id - 1;
      });

      // return the new todo list and update the state
      setTodos(data);
      // thow success delete message
      toast("Todo Deleted Successfully");
    }
  };

  // DEFINING THE DELETE HANDLE FUNCTION
  const handleUpdate = async (e) => {
    // UPDATING THE TODO ITEM  FROM NULL TO THE NUMBER
    updateTodoId = e.target.id;
    //  EXTRACTING THE TODOTITLE
    const todoTitle = e.target.children[1].textContent.trim();

    // Setting the set update to true
    setUpdate(true);
    // place the item that has to update inside TASK
    setTask({ todoTitle, updateTodoId });
  };

  // DEFING THE FUNCTION TO UPDATE THE TODO ITEM
  const handleUpdateTask = async (e) => {
    // PREVENTING THE DEFAULT BEHAVIOUR OF THE FORM
    e.preventDefault();

    // DESTRUCTIONG THE TASK
    const { todoTitle, updateTodoId } = task;
    // MAKING THE API CALL TO UPDATE THE TODOS
    const response = await updateTodo(updateTodoId, todoTitle);

    if (response.success) {
      // DESTRUCTURING TITLE FROM RESPONSE DATA
      const { title } = response.data;
      // find the item and update the title based on id
      todos.forEach((item, index) => {
        if (index === updateTodoId - 1) {
          item.title = title;
        }
        // UPDATING THE TODOS LIST
        setTodos([...todos]);
      });

      // return the new todo list and update the state
      setTask({});
      // SETTING THE UPDATE STATE TO FALSE
      setUpdate(false);
      // THROWING THE MESSAGE AFTER UPDATITION
      toast("Todo Updated Successfully");
    }
  };

  // DEFING THE FUNCTION TO CLEAR ALL TODOS
  const clearTodos = () => {
    // SETTING THE EMPTY TODOS LIST
    setTodos([]);
    // THROWING THE MESSAGE AFTER DELETING ALL TODOS
    toast("All Todos Deleted");
  };

  // DEFINING THE FUNCTION FOR CHANGING THE TODOS STATUS
  const handleTaskStatus = (e) => {
    // PREVENT THE DEFAULT BEHAVIOUS
    e.preventDefault();
    // DESCTRUCTURING THE UPDATE TODO ID
    const { updateTodoId } = task;
    // SEARCH FOR THE TODOS TO MAKE CHANGE THE ITEM COMPLETE STATUS
    todos.forEach((item, index) => {
      if (index === updateTodoId - 1) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
      // SETTING THE NEW TODO LIST
      setTodos([...todos]);
    });
    // MAKING THE TASK LIST EMPTY AFTER CHANGING
    setTask({});
    // SETTING THE UPDATE STATUS TO FALSE
    setUpdate(false);
    // THROWING THE MESSAGE AFTER CHANGES
    toast("Todo Status Changed");
  };

  // DEFING THE UI FOR THE APPLICATION
  return (
    <div className="app-container">
      <ToastContainer />
      <div className="app-title">
        <h1>Todo App</h1>
      </div>

      {/* DEFINIG  THE UI FRO THE TODO CONTAINER*/}
      <div className="todoContainer">
        <div className="todo-form"></div>

        {/* DEFINIG  THE UI FRO THE FORM*/}
        <form>
          <label htmlFor="todoTitle">Title:</label>
          <input
            type="text"
            name="todoTitle"
            placeholder="Write todo here.. "
            value={task.todoTitle}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {/* IF UPDATE IS TRUE THEN SHOW UPDATE BUTTON  */}
          {update ? (
            <div className="controls">
              {/* UPDATE TODO BUTTON  */}
              <ButtonUpdate handleUpdateTask={handleUpdateTask} />
              {/* MARK TODOS COMPLETED BUTTON */}
              <UpdateTodoButton handleTaskStatus={handleTaskStatus} />
            </div>
          ) : (
            <AddButton handleSubmit={handleSubmit} />
          )}
        </form>

        {/* DEFINIG  THE UI FRO TODO ITEM */}
        <Todo
          todos={todos}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />

        <ClearButton todos={todos} clearTodos={clearTodos} />
      </div>
    </div>
  );
};

export default TodoContainer;
