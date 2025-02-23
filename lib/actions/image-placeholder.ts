"use server";
import "server-only";

import { getPlaiceholder } from "plaiceholder";

export const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const plaiceholder = await getPlaiceholder(buffer, { size: 10 });

  return plaiceholder;
};
