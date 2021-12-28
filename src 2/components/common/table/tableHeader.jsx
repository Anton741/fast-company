const TableHeader = ({ onSort, currentSort, columns }) => {
    const handlSort = (item) => {
        if (currentSort.iter === item) {
            onSort(() => ({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ order: "asc", iter: item });
        }
    };
    function addArrow(item) {
        if (item === currentSort.iter) {
            if (currentSort.order === "desc") {
                return <i className="bi bi-caret-down-fill"></i>;
            }
            return <i className="bi bi-caret-up-fill"></i>;
        }
        return undefined;
    }
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    return (
                        <th
                            key={column}
                            scope="col"
                            onClick={() =>
                                columns[column].iter
                                    ? handlSort(columns[column].iter)
                                    : undefined
                            }
                            role={columns[column].iter ? "button" : undefined}
                        >
                            {columns[column].name}
                            {addArrow(columns[column].iter)}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
