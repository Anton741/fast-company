const Qualities = (props) => {
  return (
    <td>
      {props.qualities.map((colorBlock) => {
        return (
          <span className={props.onClass(colorBlock.color)}>
            {colorBlock.name}
          </span>
        );
      })}
    </td>
  );
};
export default Qualities;
