import _ from "lodash";
import { Link } from "react-router-dom";

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
                            if (column === "name") {
                                return <td key={column}><Link to = {`/users/${item._id}`} >{item[column]}</Link></td>;
                            }
                            return <td key={column}>{renderComponent(item, column)}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};
export default TableBody;
