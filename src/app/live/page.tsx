import { cookies } from "next/headers";
import LiveDashboardClient from "./LiveDashboardClient";

export default async function LiveEventPage() {
  const cookieStore = await cookies();
  
  const adminSession = cookieStore.get("acm_admin_session");
  const eventTicket = cookieStore.get("acm_event_ticket");

  if (adminSession?.value === "true") {
    return <LiveDashboardClient role="COORDINATOR" />;
  }

  if (eventTicket?.value) {
    return <LiveDashboardClient role="STUDENT" />;
  }

  // Allow guest access so event details can be shown without forced login
  return <LiveDashboardClient role="GUEST" />;
}
