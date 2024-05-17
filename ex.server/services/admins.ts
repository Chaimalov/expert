const admins = ["JuqJmsvnsIZ6ZOr67QYj2QTTswt1", "LpBAJ3f8e2ejrkCHUOfULFkyN7h1"];

export const isAdmin = (userId: string) => {
  return admins.includes(userId);
};
