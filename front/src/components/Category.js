import { emoji_rgba } from "../assets/color"

export default function Category({ category, icon, israel }) {
    const color = emoji_rgba(icon)
    return (
        <button type="button" className="category" style={{ "--hue": color }} onDoubleClick={israel(icon)}>
            <div className="icon">{icon}</div>
            <div>
                <h2>{category}</h2>
            </div>
        </button>
    )
}
