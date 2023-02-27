
export const userQuery = (userId: string | null) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export const categoriesQuery = () => {
  const query = `*[_type == 'category']`;
  return query;
};

export const feedQuery = (categoryId?: string, searchTerm?: string) => {
  return categoryId || searchTerm
    ? `*[_type == 'pin' && category[]._ref match (*[_type=='category' && categoryTitle match '${categoryId}'][0]._id) || title match '${searchTerm}' || about match '${searchTerm}*'] | order(_createdAt desc)`
    : `*[_type == 'pin'] | order(_createdAt desc)`;
};

export const fetchUserData = (userId: string) => {
 
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};



/* `*[_type == 'pin' && category[]._ref match '${categoryId}' || title match '${searchTerm}' || about match '${searchTerm}*'] | order(_createdAt desc)` */
