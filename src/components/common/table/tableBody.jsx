import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderComponent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].iter);
    };
    return (
        <tbody>
            {data.map((item) => {
                return (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => {
                            return <td key={column}>{renderComponent(item, column)}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};
export default TableBody;
