import * as contentful from "contentful";

export type TypeEntrySkeleton = {
  contentTypeId: "type";
  fields: {
    name: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Symbol;
  };
};

export type CategoryEntrySkeleton = {
  contentTypeId: "category";
  fields: {
    name: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Symbol;
    type: contentful.EntryFieldTypes.EntryLink<TypeEntrySkeleton>;
  };
};

export type PostEntrySkeleton = {
  contentTypeId: "post";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Symbol;
    type: contentful.EntryFieldTypes.EntryLink<TypeEntrySkeleton>;
    category?: contentful.EntryFieldTypes.EntryLink<CategoryEntrySkeleton>;
    description: contentful.EntryFieldTypes.Text;
    coverImage: contentful.EntryFieldTypes.AssetLink;
    content: contentful.EntryFieldTypes.RichText;
    date: contentful.EntryFieldTypes.Date;
    special: contentful.EntryFieldTypes.Boolean;
  };
};

export interface IAsset {
  fields: {
    title: string;
    description: string;
    file: {
      fileName: string;
      contentType: string;
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface IType {
  fields: {
    name: string;
    slug: string;
    type: string;
  };
}

export interface ICategory {
  fields: {
    name: string;
    slug: string;
    type: IType;
  };
}

export interface Post {
  _id: string;
  slug: string;
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      image?: string;
    };
    content: string;
    createdAt: Date;
  }[];
  reviews: {
    user: string;
    rating: number;
  }[];
  views: {
    user: string;
  }[];
  favorites: {
    user: string;
  }[];
}
