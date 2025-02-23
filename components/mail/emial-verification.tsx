import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface EmailVerificationProps {
  verificationLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "";

export const EmailVerification = ({
  verificationLink,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>قم بتأكيد البريد الإلكتروني الخاص بك</Preview>
      <Tailwind>
        <Body dir="rtl" className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo-main.svg`}
                height="50"
                alt="Loghat Alarab"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-[#9D966D] text-[24px] font-bold text-center p-0 my-[30px] mx-0">
              تأكيد البريد الإلكتروني
            </Heading>
            <Text className="text-[#9D966D] text-[14px] leading-[24px]">
              اضغط على الزر لتأكيد البريد الإلكتروني
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#9D966D] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verificationLink}
              >
                تأكيد
              </Button>
            </Section>
            <Text className="text-[#9D966D] text-[14px] leading-[24px]">
              أو قم بنسخ الرابط و وضعه في المتصفح:{" "}
              <Link
                href={verificationLink}
                className="text-blue-600 no-underline"
              >
                {verificationLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
