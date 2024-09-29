import { Menu, Package2, Search } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import SearchInput from "../shared/SearchInput";
import AccountMenu from "./AccountMenu";
import { auth } from "@/auth";

const Header = async () => {
const session = await auth();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/search?q="
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse
        </Link>
        {session && <Link href="/favorite">Favorites</Link>}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/search?q="
              className="text-muted-foreground hover:text-foreground"
            >
              Browse
            </Link>
            {session && <Link href="/favorite">Favorites</Link>}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          className="ml-auto flex-1 sm:flex-initial"
          action={async (formData: FormData) => {
            "use server";
            const search = formData.get("search");
            redirect(`/search?q=${search}`);
          }}
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SearchInput />
          </div>
        </form>
        <ModeToggle />
        <AccountMenu />
      </div>
    </header>
  );
};
export default Header;
