"use client";
import { useSession } from "next-auth/react";
import ClientApp from "../ClientApp"; // Importe o ClientApp

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default function ProfilePageWithClientApp() {
  return (
    <ClientApp>
      <ProfilePage />
    </ClientApp>
  );
}
