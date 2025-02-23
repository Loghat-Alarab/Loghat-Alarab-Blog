import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface TwoFactorOTPProps {
  otp?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "";

export const TwoFactorOTP = ({ otp }: TwoFactorOTPProps) => {
  return (
    <Html>
      <Head />
      <Preview>Two Factor Authentication</Preview>
      <Tailwind>
        <Body dir="rtl" className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Verify Your Identity
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Enter the following code to finish logging in.
            </Text>
            <Section className="bg-[rgba(0,0,0,.05)] rounded-md w-[280px] align-middle mx-auto mt-4 mb-3">
              <Text className="text-black inline-block text-4xl font-bold -tracking-tighter leading-10 pb-2 my-0 mx-auto w-full text-center">
                {otp}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
