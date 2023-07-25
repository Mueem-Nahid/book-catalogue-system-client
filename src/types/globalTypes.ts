export interface IBook {
   _id: string;
   title: string;
   author: string;
   genre: string;
   publicationDate: string;
   image: string;
   reviews?: object;
   isWishlisted?: boolean
}


export interface IUserInfo {
   id: string,
   email: string,
   name: string
}

export interface IUser {
   userInfo: IUserInfo | null;
   accessToken: string | null
}

export interface IReview {
   _id: string;
   reviewedBy: {
      _id: string;
      name: string;
   };
   review: string;
   createdAt: Date;
   updatedAt: string;
}

export type IBookGenre = 'Fiction' | 'Non-Fiction' | 'Young Adult (YA)' | 'Children\'s' | 'Poetry' |
   'Classic Literature' | 'Graphic Novels/Comics' | 'Mystery/Thriller' | 'Science and Technology' |
   'Biography' | 'Romance' | 'Self-Help/Motivational' | 'Fantasy' | 'Science Fiction' | 'Horror';
