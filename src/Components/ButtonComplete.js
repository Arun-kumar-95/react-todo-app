// DEFINING THE COMPLETED TODO BUTTON  FUNCTIONAL COMPONENT
const UpdateTodoButton = (props) => {
  // DEFINGING THE UI FOR THE COMPLETED BUTTON
  return (
    <>
      <button className="btn btn-complete" onClick={props.handleTaskStatus}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png"
          alt="tick icon"
          className="complete-icon"
        />
      </button>
    </>
  );
};
// MAKING THE DEFAULT EXPORT
export default UpdateTodoButton;
