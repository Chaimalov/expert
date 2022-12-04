import { colorFromEmoji } from "../utils/color";

export function Category({ design, group, category, value, icon, onClick }) {
  const color = colorFromEmoji(icon);
  return (
    <label
      className={`category ${design}`}
      style={{ "--hue": color }}
      onClick={() => {
        onClick(value);
      }}
    >
      <div className="icon">{icon}</div>
      {design !== "compact" && <h3>{category}</h3>}

      <input type="radio" name={group} />
    </label>
  );
}
