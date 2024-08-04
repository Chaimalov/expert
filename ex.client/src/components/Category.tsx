import { colorFromEmoji } from '../utils';

interface CategoryProps extends React.PropsWithChildren {
  design?: 'compact' | 'regular';
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
      className="p-2 rounded-lg text-2xl bg-custom/20 grayscale hover:grayscale-0 cursor-pointer"
      style={{ '--customColor': color.toString() }}
      onClick={() => onClick()}
    >
      {icon}
      {design !== 'compact' && <h3>{category}</h3>}

      <input type="radio" name={group} hidden />
    </label>
  );
};
