/* export const userQuery = (userId: string | null) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};
 */
export const categoriesQuery = () => {
  const query = `*[_type == 'category']`;
  return query;
};

export const feedQuery = (categoryId?: string, searchTerm?: string) => {
  return categoryId || searchTerm
    ? `*[_type == 'pin' && category[]._ref match (*[_type=='category' && categoryTitle match '${categoryId}'][0]._id) || title match '${searchTerm}' || about match '${searchTerm}*'] | order(_createdAt desc)`
    : `*[_type == 'pin'] | order(_createdAt desc)`;
}; // get all pictures or filtered by category or search

export const fetchUserData = (userId: string) => {
  return `*[_type == 'user' && _id == '${userId}']`;
}; //get user info

export const pinDetailQuery = (pinId: string) => {
  return `*[_type == 'pin' && _id == '${pinId}']`;
};

export const fetchCommentImage = (ref: string) => {
  return `*[_type == 'user' && _id == '${ref}']`;
};

export const userPinsHistory = (userId: string) => {
  return `*[_type == 'pin' && userId == '${userId}'] | order(_createdAt desc)`;
};

export const userSavedHistory = (userId: string) => {
  return `*[_type == 'pin' && '${userId}' in save[].userId] | order(_createdAt desc)`;
}
