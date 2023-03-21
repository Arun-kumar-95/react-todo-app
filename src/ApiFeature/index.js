// REQUEST URL
const URL = "https://jsonplaceholder.typicode.com/posts";
// SHOW ALL TODOS
export const getALLTodos = async () => {
  try {
    // MAKING THE REQUEST TO GET ALL TODOS OF USER ID 1
    const response = await fetch(URL + `?userId=1`);
    // CONVERTING THE RESPONSE TO JSON
    const data = await response.json();
    // SENDING THE RESPONSE
    return {
      success: true,
      data,
    };
  } catch (err) {
    // CATCH IF ERROR OCCURS
    return err.message;
  }
};

// CREATE NEW TODOS
export const createNewTodo = async (todoTitle) => {
  try {
    // DATA TO SEND WHILE MAKING REQUEST
    const dataToSend = {
      title: todoTitle,
      userId: 1,
    };
    // MAKING THE POST REQUEST
    const response = await fetch(URL + `?userId=1`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // CONVERTING THE RESPONSE TO JSON
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (err) {
    // CATCH IF ERROR OCCURS
    return err.message;
  }
};

// UPDATE  TODOS

export const updateTodo = async (id, todoTitle) => {
  // CONVERTING THE ID TO NUMBER
  let index = Number(id);
  try {
    // MAKING THE DATA WAT TO SEND
    const dataToUpdate = {
      title: todoTitle,
      userId: 1,
    };
    // MAKING THE PUT REQUEST TO THE SERVER
    const response = await fetch(URL + `/${index}`, {
      method: "PUT",
      body: JSON.stringify(dataToUpdate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // CONVERTINF THE RESPONSE TO JSON
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (err) {
    // CATCH IF ERROR OCCURS
    return err.message;
  }
};

// DELETE TODOS

export const deleteTodo = async (id) => {
  // CONVERTING THE ID TO NUMBER
  let index = Number(id) - 1;
  try {
    // MAKING THE DELETE REQUEST TO THE SERVER
    await fetch(URL + `/${index}`, {
      method: "DELETE",
    });
    // RETURN THE RESPONSE
    return {
      success: true,
    };
  } catch (err) {
    // CATCH IF ERROR OCCURS
    return err.message;
  }
};

// CREATING THE FUNCTION TO GREATE RANDON COLOR
export const generateRandomHexColor = () => {
  function color() {
    // CREATING THE VALUE
    let hexvalue = Math.floor(Math.random() * 238).toString(16);
    // RETURN THE FUNCTION
    return hexvalue;
  }
  // CALLING THE FUNCTION AND CONCATINATING VIA #
  return "#" + color() + color() + color();
};
