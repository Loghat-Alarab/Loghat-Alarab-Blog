import Link from "next/link";

interface SwitchButtonProps {
  href: string;
  label: string;
  title: string;
}

export const SwitchButton = ({ href, label, title }: SwitchButtonProps) => {
  return (
    <p className="whitespace-nowrap text-center">
      {title}{" "}
      <Link href={href} replace className="text-primary underline mx-1">
        {label}
      </Link>
    </p>
  );
};
