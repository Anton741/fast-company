// import PropTypes from "prop-types";

const GroupList = ({
    professions,
    onFilter,
    selectedProfession,
    valueProperty,
    contentProperty
}) => {
    return (
        <ul className="list-group">
            {Object.keys(professions).map((item) => {
                return (
                    <li
                        className={
                            selectedProfession ===
                            professions[item][contentProperty]
                                ? "list-group-item active"
                                : "list-group-item "
                        }
                        key={professions[item][valueProperty]}
                        onClick={() => onFilter(professions[item][contentProperty])}
                        role="button">
                        {professions[item][contentProperty]}
                    </li>
                );
            })}
        </ul>
    );
};

GroupList.defaultProps = {
    contentProperty: "name",
    valueProperty: "_id"
};

// GroupList.PropTypes = {
//     professions: PropTypes.object.isRequired,
//     onFilter: PropTypes.func.isRequired,
//     selectedProfession: PropTypes.object.isRequired,
//     valueProperty: PropTypes.string.isRequired,
//     contentProperty: PropTypes.string.isRequired
// };

export default GroupList;
