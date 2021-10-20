import _ from "lodash";

const Pagination = ({ pageSize, itemCount, onChangePage, currentPage }) => {
    const countPages = _.range(1, Math.ceil(itemCount / pageSize) + 1);

    return (
        <>
            <nav>
                <ul className="pagination pagination-sm">
                    {countPages.map((page) => (
                        <li
                            className={
                                currentPage === page
                                    ? "page-item active"
                                    : "page-item"
                            }
                            key = {page}
                        >
                            <button
                                className="page-link"
                                onClick={() => onChangePage(page)}
                            >
                                {page}{" "}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};
export default Pagination;
