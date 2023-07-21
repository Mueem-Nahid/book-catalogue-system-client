export interface IBook {
   _id?: number;
   title: string;
   author: string;
   genre: string;
   publicationDate: string;
   image: string;
   reviews?: object
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
