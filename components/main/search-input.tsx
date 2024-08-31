"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchInput = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const search = () => {
    const params = new URLSearchParams({
      query: text,
    });

    router.push(`/search?${params.toString()}`);

    setOpen(false);
    setText("");
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon">
            <Search />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2 bg-card" align="end">
          <Input
            placeholder="ابحث"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={() => search()} size="icon" className="p-2">
            <Search />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default SearchInput;
