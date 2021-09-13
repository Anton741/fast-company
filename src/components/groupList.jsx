import propTypes from "prop-types";
const GroupList = ({
    professions,
    onFilter,
    selectedProfession,
    valueProperty,
    contentProperty
}) => {
    return (
        <ul className="list-group ">
            {Object.keys(professions).map((item) => {
                return (
                    <li
                        className={
                            selectedProfession ===
                            professions[item][contentProperty]
                                ? "list-group-item active"
                                : "list-group-item list-group-item-action"
                        }
                        key={professions[item][valueProperty]}
                        onClick={() =>
                            onFilter(professions[item][contentProperty])
                        }
                        role="button"
                    >
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

GroupList.PropTypes = {
    professions: propTypes.oneOfType([propTypes.object, propTypes.array]),
    onFilter: propTypes.func.isRequired,
    selectedProfession: propTypes.object.isRequired,
    valueProperty: propTypes.string.isRequired,
    contentProperty: propTypes.string.isRequired
};

export default GroupList;
