import { useQualities } from "../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { getQuality } = useQualities();
    return (
        <>
            {qualities.map((colorBlock) => {
                const qual = getQuality(colorBlock);
                return (
                    <span
                        className={`badge bg-${qual.color} mx-2 fs-6`}
                        key={qual._id}
                    >
                        {qual.name}
                    </span>
                );
            })}
        </>
    );
};
export default Qualities;
