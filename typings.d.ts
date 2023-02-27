export interface User {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  picture: string;
  sub: string;
}

export interface SanityUser {
  _id: string;
  _type: 'user';
  family_name: string;
  given_name: string;
  email: string;
  image: string;
}

interface Image {
  _key: string;
  _type: 'image';
  asset?: {
    url: string;
  };
}

export interface Comment {
  _id: string;
  postedBy: string;
  comment: [string];
}

export interface Category {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _aupdatedAt: string;
  categoryTitle: string;
  catImage: Image;
}

export interface newPinCat {
  _key?: string;
  _ref: string;
  _type: 'reference';
}

export interface Pin {
  title: string;
  category: newPinCat[];
  image: Image;
  about: string;
  destination: string;
  comment: Comment[];
  userId: string;
  postedBy: {
    _ref: string;
    _type: 'postedBy';
  };
  save: [
    {
      _ref: string;
      postedBy: SanityUser;
      userId: string;
    }
  ];
  _type: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}
