import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";

const options: Options = {
  renderMark: {
    [MARKS.CODE]: (node) => {
      return (
        <pre>
          <code>{node}</code>
        </pre>
      );
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find((item) =>
          // @ts-ignore
          item.marks?.find((mark) => mark.type === "code")
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        );
      }

      return <p>{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link href={`/post/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        );
      }
    },

    [INLINES.HYPERLINK]: (node, children) => {
      // const text = node.content.find((item) => item.nodeType === "text")?.value;
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },

    // [BLOCKS.EMBEDDED_ENTRY]: (node) => {
    //   if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
    //     return (
    //       <iframe
    //         height="400"
    //         width="100%"
    //         src={node.data.target.fields.embedUrl}
    //         title={node.data.target.fields.title}
    //         allowFullScreen={true}
    //       />
    //     );
    //   }
    // },

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className="w-full"
        />
      );
    },
  },
};

const RichText = ({ content }: { content: Document }) => {
  return <>{documentToReactComponents(content, options)}</>;
};

export default RichText;
