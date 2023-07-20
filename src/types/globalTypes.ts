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
   email: string,
   name: string
}

export interface IUser {
   userInfo: IUserInfo | null;
   accessToken: string | null
}
