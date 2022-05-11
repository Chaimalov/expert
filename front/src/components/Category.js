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
            <h2>{category}</h2>

            <input
                type="radio"
                value={category}
                name="category" />
        </label>
    )
}       
