import Image from "next/image";
import ToggleNav from "./Components/toggleNav";
import AdminDashboard from "./Components/AdminDashboard";
import TestimonialCarousel from "./Components/Testimonials/TestimonialCarousel";

export default function Home() {
  return (
    <div>
      <AdminDashboard />
      <TestimonialCarousel />
    </div>
  );
}
