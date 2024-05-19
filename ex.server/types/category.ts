export type Category = keyof typeof categoryDays;


export const isCategory = (value: string): value is Category => {
  const categoryNames: string[] = categories.map((category) => category.name)
  return value in categoryNames;
}
const categories = [
  { name: "fruits", icon: "🍉" },
  { name: "vegetables", icon: "🥑" },
  { name: "dairy", icon: "🧀" },
  { name: "meat", icon: "🥩" },
  { name: "fish", icon: "🐟" },
  { name: "pantry", icon: "🥫" },
  { name: "wine", icon: "" },
  { name: "ice_cream", icon: "" },
] as const;

export const categoryDays = {
  fruits: {
    expiryDate: 30,
  },
  vegetables: {
    expiryDate: 14,
  },
  dairy: {
    expiryDate: 10,
  },
  meat: {
    expiryDate: 360,
  },
  fish: {
    expiryDate: 180,
  },
  pantry: {
    expiryDate: 360,
  },
  wine: {
    expiryDate: 1855,
  },
  ice_cream: {
    expiryDate: 45,
  },
} as const satisfies Record<
  (typeof categories)[number]["name"],
  { expiryDate: number }
>;
