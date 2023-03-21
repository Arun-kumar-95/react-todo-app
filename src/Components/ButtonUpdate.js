// DEFINGING THE UPDATE BUTTON FUNCTIONAL COMPONENT
const ButtonUpdate = (props) => {
  // DESCTRCTUERING THE PROPS
  const { handleUpdateTask } = props;
  //DEFINGING THE UI FOR THE COMPONENT
  return (
    <>
      <button type="submit" className="btnSubmit" onClick={handleUpdateTask}>
        Update Todo
      </button>
    </>
  );
};

// MAKING THE EXPORT DEFAULT
export default ButtonUpdate;
