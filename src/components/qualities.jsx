const Qualities = (props) => {
  return (
    <>
      {props.qualities.map((colorBlock) => {
        return (
          <span className={`badge bg-${colorBlock.color} mx-2 fs-6`} key = {colorBlock._id}>
            {colorBlock.name}
          </span>
        );
      })}
    </>
  );
};
export default Qualities;
