const Qualities = (props) => {
    return (
        <td>
            {props.qualities.map((colorBlock) => {
                return (
                    <span className={props.onClass(colorBlock.color)} key = {colorBlock._id}>
                        {colorBlock.name}
                    </span>
                );
            })}
        </td>
    );
};
export default Qualities;
