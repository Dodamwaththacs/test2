import {Navigation} from "@/components/UserNavBar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="p-4">{children}</main>
    </div>
  );
}
