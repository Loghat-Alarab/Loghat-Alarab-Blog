import { FaWhatsapp, FaFacebookF } from "react-icons/fa";

export const LIMIT = 9;

export const FINISH_READING = 3 * 60 * 1000;
// export const FINISH_READING = 3 * 1000;

export const links = [
  {
    label: "الرئيسية",
    href: "/",
  },
  {
    label: "الأعمال",
    href: "/works",
  },
  {
    label: "عن الكاتب",
    href: "/about",
  },
];

export const socials = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/moatsem.ahmed.315",
    Icon: FaFacebookF,
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/+201271925025",
    Icon: FaWhatsapp,
  },
  // {
  // name: "Linkedin",
  //   link: "https://www.linkedin.com/",
  //   Icon: FaLinkedinIn,
  // },
];
