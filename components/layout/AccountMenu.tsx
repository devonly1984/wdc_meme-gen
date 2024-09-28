import { CircleUser } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { auth, signIn, signOut } from "@/auth"

const AccountMenu = async () => {
    const session = await auth();
    if (!session) {

        return (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button>Login</Button>
          </form>
        );
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default AccountMenu