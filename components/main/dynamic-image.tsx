import Image from "next/image";

import { IAsset } from "@/types";
import { getImage } from "@/lib/actions";

const DynamicImage = async ({
  image,
  alt,
  className,
  fill,
}: {
  image: IAsset;
  alt?: string;
  className?: string;
  fill?: boolean;
}) => {
  const url = `https:${image.fields.file.url}`;
  const { base64 } = await getImage(url);

  return (
    <Image
      src={url}
      alt={alt ? alt : image.fields.title}
      placeholder="blur"
      blurDataURL={base64}
      fill={fill}
      width={fill ? undefined : image.fields.file.details.image.width}
      height={fill ? undefined : image.fields.file.details.image.height}
      className={className}
    />
  );
};
export default DynamicImage;
