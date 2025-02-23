const Footer = () => {
  return (
    <footer className="container">
      <p className="text-center p-2 text-[8px] md:text-sm">
        لغة العرب &copy; {new Date().getFullYear()}. جميع الحقوق محفوظة. تم
        إنشاؤه بواسطة{" "}
        <a
          // href="https://www.joe-official.site"
          href="#"
          target="_blank"
          className="text-violet-700"
        >
          JOE
        </a>
      </p>
    </footer>
  );
};
export default Footer;
