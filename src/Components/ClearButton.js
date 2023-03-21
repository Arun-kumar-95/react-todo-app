// DEFINGING THE CLEAR BUTTON FUNCTIONAL COMPONENT
const ClearButton = (props) => {
  // DESCTRUCTING THE PROPS
  const { todos, clearTodos } = props;
  // DEFINGING THE UI FOR THE
  return (
    <>
      {/* SHOW THE CLEAR BUTTON ONLY THERE EXISTS ATLEAST ONE TODO*/}
      {todos.length > 0 && (
        <button className="clear-all-todos" onClick={clearTodos}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2267/2267901.png"
            alt="clear todos"
          />
        </button>
      )}
    </>
  );
};

// MAKING THE EXPORT DEFAULT
export default ClearButton;
