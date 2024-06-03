import { colorFromEmoji } from "../utils";

interface CategoryProps extends React.PropsWithChildren {
  design?: "compact" | "regular";
  group: string;
  category: string | null;
  icon: string;
  onClick: () => void;
}

export const CategoryButton: React.FC<CategoryProps> = ({
  design,
  group,
  category,
  icon,
  onClick,
}) => {
  const [color] = colorFromEmoji(icon);

  return (
    <label
      className={`category ${design}`}
      style={{ "--hue": color.toString() }}
      onClick={() => onClick()}
    >
      <div className="icon">{icon}</div>
      {design !== "compact" && <h3>{category}</h3>}

      <input type="radio" name={group} />
    </label>
  );
};
