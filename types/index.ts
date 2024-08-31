import * as contentful from "contentful";

// export type AuthorEntrySkeleton = {
//   contentTypeId: "author";
//   fields: {
//     name: contentful.EntryFieldTypes.Text;
//     picture: contentful.Asset;
//   };
// };

export type CategoryEntrySkeleton = {
  contentTypeId: "category";
  fields: {
    name: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Symbol;
    type: contentful.EntryFieldTypes.Text;
  };
};

export type PostEntrySkeleton = {
  contentTypeId: "post";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    type: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Symbol;
    category: contentful.EntryFieldTypes.EntryLink<CategoryEntrySkeleton>;
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

export interface ICategory {
  fields: {
    name: string;
    slug: string;
    type: string;
  };
}
