import { Search } from "lucide-react";

import Form from "next/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchInput = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="lg:hidden" size="icon">
            <Search />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <Form className="flex gap-2 bg-card" action="/search">
            <Input placeholder="ابحث" name="query" />
            <Button type="submit" size="icon" className="p-2">
              <Search />
            </Button>
          </Form>
        </PopoverContent>
      </Popover>
      <Form className="lg:flex gap-2 hidden" action="/search">
        <Input
          className="placeholder:text-black bg-white text-black"
          placeholder="ابحث"
          name="query"
        />
        <Button variant="secondary" type="submit" size="icon" className="p-2">
          <Search />
        </Button>
      </Form>
    </div>
  );
};
export default SearchInput;
