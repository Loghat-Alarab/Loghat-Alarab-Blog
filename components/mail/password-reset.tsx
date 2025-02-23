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

interface PasswordResetProps {
  resetLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const PasswordReset = ({ resetLink }: PasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Preview>إعادة تعيين كلمة المرور</Preview>
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
              إعادة تعيين كلمة المرور
            </Heading>
            <Text className="text-[#9D966D] text-[14px] leading-[24px]">
              اضغط على الزر لإعادة تعيين كلمة المرور
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#9D966D] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetLink}
              >
                إعادة تعيين
              </Button>
            </Section>
            <Text className="text-[#9D966D] text-[14px] leading-[24px]">
              أو قم بنسخ الرابط و وضعه في المتصفح:{" "}
              <Link href={resetLink} className="text-blue-600 no-underline">
                {resetLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
