"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navigation() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session?.user?.refreshToken) {
      try {
        await fetch(
          "https://auth.chamika31.me/realms/test/protocol/openid-connect/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: "test",
              client_secret: "Bfoob64FmRNA5hoJy16XlNxddZTOi3nJ",
              refresh_token: session.user.refreshToken,
            }),
          }
        );
      } catch (error) {
        console.error("Failed to logout from Keycloak", error);
      }
    }
    
    await signOut({ redirect: false });
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Food Delivery
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Menu
            </Link>

            {session ? (
              <div className="text-gray-600 hover:text-gray-800 transition-colors">
                <p>Welcome, {session?.user?.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <button
                className="text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => signIn("keycloak", { callbackUrl: "/redirect" })}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
