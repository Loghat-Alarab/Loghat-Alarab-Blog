import { Metadata } from "next";

import { socials } from "@/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "عن الكاتب",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <section className="mx-auto px-4 pt-14 md:pt-20 pb-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        عن الكاتب
      </h1>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-48 h-48">
              <AvatarImage src="/author.jpg" alt="Author" />
              <AvatarFallback>معتصم</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl mb-2">
                معتصم أحمد السيد إبراهيم
              </CardTitle>
              <p className="text-xl text-right text-muted-foreground mb-4">
                مهندس مدني
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                {socials.map(({ name, link, Icon }) => (
                  <Button key={name} variant="outline" size="icon" asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 lg:*:text-xl px-2 list-disc marker:text-primary">
            <li>كتب العديد من القصص والمقالات.</li>
            <li>
              سبق أن نُشر له رواية ورقية بعنوان &quot;منزل علي علام&quot;.
            </li>
            <li>
              سبق أن نُشر له نوڤيلا على منصة بوكيان بعنوان &quot;الرابط&quot;.
            </li>
            <li>
              شارك في كتب مشتركة للخواطر والقصص أبرزها &quot;سرائر متباينة&quot;
              لدى دار قيس للنشر والتوزيع.
            </li>
            <li>
              نشر مجموعة قصصية لدى منصة اللارواية
              بعنوان&quot;حكاوي القهوة&quot;.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
