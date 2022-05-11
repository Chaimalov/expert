import { emoji_rgba } from "../assets/color"

export default function Category({ category, icon, onClick }) {
    const color = emoji_rgba(icon)
    return (
        <label>
            <div
                className="category"
                style={{ "--hue": color }}
                onClick={() => {
                    onClick(category)
                }}
            >
                <div className="icon">{icon}</div>
                <div>
                    <h2>{category}</h2>
                </div>
            </div>
            <input
                type="radio"
                value={category}
                name="category"
                id={category} />
        </label>
    )
}       
