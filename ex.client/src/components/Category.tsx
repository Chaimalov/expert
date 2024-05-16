import { colorFromEmoji } from "../utils/color";

interface CategoryProps extends React.PropsWithChildren {
  design: "compact",
  group: string,
  category: string,
  value: string,
  icon: string,
  onClick: (value: string) => void,
}

export const Category: React.FC<CategoryProps> = ({ design, group, category, value, icon, onClick }) => {
  const [color] = colorFromEmoji(icon);
  
  return (
    <label
      className={`category ${design}`}
      style={{ "--hue": color.toString() }}
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
