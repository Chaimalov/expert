import { colorFromEmoji } from "../assets/color"

export default function Category({ category, icon, onClick }) {
    const color = colorFromEmoji(icon)
    return (
        <label
            className="category"
            style={{ "--hue": color }}
            onClick={() => {
                onClick(category)
            }}>
            <div className="icon">{icon}</div>
            <h3>{category}</h3>

            <input
                type="radio"
                value={category}
                name="category" />
        </label>
    )
}       
