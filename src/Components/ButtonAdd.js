// DESFINING THE ADD BUTTON FUNCTIONAL COMPONET 
const AddButton = (props) => {
  // DEFINGING THE UI FOR THE ADD BUTTON
  return (
    <>
      <button type="submit" className="btnSubmit" onClick={props.handleSubmit}>
        Add Todo
      </button>
    </>
  );
};
// MAKING THE DEFAULT EXPORTS
export default AddButton;
