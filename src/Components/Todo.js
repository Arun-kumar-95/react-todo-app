// DEFINGING THE TODO FUNCTIONAL COMPONENT
const Todo = (props) => {
  // DESCTRUCTRING THE PROPS
  const { todos, handleUpdate, handleDelete } = props;

  // DEFINGING THE UI
  return (
    <div className="todo-list">
    {/* LOOP THROUGH ALL TODOS  IF NOT EMPTY */}
    {todos &&
      
        todos.map((todo, index) => (
          
          <div
            className="todo-item"
            id={index + 1}
            key={index}
            onClick={handleUpdate}
            style={{ backgroundColor: todo.background }}
          >
            <span className="delete-todo" id={index + 1} onClick={handleDelete}>
              &times;
            </span>
             {/* IF THE TODO IS COMPLETED THEN  */}
            {todo.completed ? (
              <div className="todo completed">
                <p>{todo.title}</p>
              </div>
            ) : (
              <div className="todo">
                <p>{todo.title}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

// MAKING THE DEFAULT EXPORTS
export default Todo;
