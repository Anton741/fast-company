import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, currentSort, columns, data, children }) => {
    return (
        <table className="table flex-grow-1">
            {children || (
                <>
                    <TableHeader
                        onSort={onSort}
                        currentSort={currentSort}
                        columns={columns}
                    />
                    <TableBody data={data} columns={columns} />
                </>
            )}
        </table>
    );
};

export default Table;
