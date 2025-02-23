interface FilterLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: FilterLayoutProps) => {
  return <section className="pt-14 md:pt-20 px-4">{children}</section>;
};
export default FilterLayout;
