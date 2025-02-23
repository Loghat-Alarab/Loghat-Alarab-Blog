import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { SwitchButton } from "@/components/auth/switch-button";

interface AuthWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  switchButtonHref: string;
  switchButtonLabel: string;
  switchButtonTitle: string;
  showSocials?: boolean;
}

export const AuthWrapper = ({
  children,
  headerLabel,
  switchButtonHref,
  switchButtonLabel,
  switchButtonTitle,
  showSocials,
}: AuthWrapperProps) => {
  return (
    <div className="w-full max-w-xs flex flex-col gap-4">
      <Header label={headerLabel} />
      <SwitchButton
        title={switchButtonTitle}
        href={switchButtonHref}
        label={switchButtonLabel}
      />
      {children}
      {showSocials && <Social />}
    </div>
  );
};
