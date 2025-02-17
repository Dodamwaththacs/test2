"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navigation() {
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

    // Sign out from NextAuth

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
            <Link href="/user" className="text-xl font-bold text-gray-800">
              Food Delivery
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/user"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/user/orders"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Orders
            </Link>

            <Link
              href="/user/cart"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cart
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {session.user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("keycloak", { callbackUrl: "/redirect" })}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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
