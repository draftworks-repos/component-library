import Image from "next/image";
import ToggleNav from "./Components/toggleNav";
import AdminDashboard from "./Components/AdminDashboard";
import TestimonialCarousel from "./Components/Testimonials/TestimonialCarousel";
import PoemCards from "./Components/OverlayCards/PoemCards";

export default function Home() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
