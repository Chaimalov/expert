import { colorFromEmoji } from "../assets/color"

export default function Category({ group, category, value, icon, onClick }) {

    const color = colorFromEmoji(icon)
    return (
        <label
            className="category"
            style={{ "--hue": color }}
            onClick={() => {
                onClick(value)
            }}>
            <div className="icon">{icon}</div>
            <h3>{category}</h3>

            <input
                type="radio"
                name={group}
            />
        </label>
    )
}       
