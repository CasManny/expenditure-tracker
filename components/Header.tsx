import { checkUser } from "@/lib/checkuser";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = async () => {

  const user = await checkUser()

  return (
    <nav className="navbar">
          <div className="navbar-container">
              <h2>Expense Tracker</h2>
              <div>
                  <SignedOut>
                      <SignInButton />
                  </SignedOut>
                  <SignedIn>
                      <UserButton />
                  </SignedIn>
              </div>
      </div>
    </nav>
  );
};

export default Header;
