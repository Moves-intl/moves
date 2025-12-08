import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";

import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Blogs from "@/pages/Blogs";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import StudentDashboard from "@/pages/StudentDashboard";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Consultation from "@/pages/services/Consultation";
import UniversityDetails from "@/pages/UniversityDetails";
import Universities from "@/pages/Universities";
import Destinations from "@/pages/Destinations";
import DestinationDetails from "@/pages/DestinationDetails";
import BlogDetails from "@/pages/BlogDetails";
import CourseComparison from "@/pages/CourseComparison";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Sitemap from "@/pages/Sitemap";
import ContactSubmissions from "@/pages/admin/contact/ContactSubmissions";
import PageView from "@/pages/PageView";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import Scholarships from "@/pages/Scholarships";
import ScholarshipDetails from "@/pages/ScholarshipDetails";

// Student Dashboard Pages
import Dashboard from "@/pages/student/Dashboard";
import Applications from "@/pages/student/Applications";
import SavedCourses from "@/pages/student/SavedCourses";
import Profile from "@/pages/student/Profile";
import Settings from "@/pages/student/Settings";
import Counselling from "@/pages/student/Counselling";
import CounsellingBookings from "@/pages/admin/counselling/CounsellingBookings";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProfile from "@/pages/admin/profile/Profile";
import AdminSettings from "@/pages/admin/settings/Settings";
import TeamManagement from "@/pages/admin/team/TeamManagement";
import CoursesList from "@/pages/admin/courses/CoursesList";
import CourseForm from "@/pages/admin/courses/CourseForm";
import UniversitiesList from "@/pages/admin/universities/UniversitiesList";
import UniversityForm from "@/pages/admin/universities/UniversityForm";
import DestinationsList from "@/pages/admin/destinations/DestinationsList";
import DestinationForm from "@/pages/admin/destinations/DestinationForm";
import ServicesList from "@/pages/admin/services/ServicesList";
import ServiceForm from "@/pages/admin/services/ServiceForm";
import BlogsList from "@/pages/admin/blogs/BlogsList";
import BlogForm from "@/pages/admin/blogs/BlogForm";
import PagesList from "@/pages/admin/pages/PagesList";
import PageForm from "@/pages/admin/pages/PageForm";
import MediaLibrary from "@/pages/admin/media/MediaLibrary";

import RoleGuard from "@/components/admin/RoleGuard";
import StudyAreasManager from "@/pages/admin/courses/StudyAreasManager";
import StudyLevelsManager from "@/pages/admin/courses/StudyLevelsManager";
import BlogCategoriesManager from "@/pages/admin/blogs/BlogCategoriesManager";
import ApplicationsList from "@/pages/admin/applications/ApplicationsList";
import MarketingConsents from "@/pages/admin/marketing/MarketingConsents";
import AllUsers from "@/pages/admin/users/AllUsers";
import StaffProfile from "@/pages/StaffProfile";
import EventsList from "@/pages/admin/events/EventsList";
import EventForm from "@/pages/admin/events/EventForm";
import EventRegistrationsPage from "@/pages/admin/events/EventRegistrationsPage";
import ScholarshipsList from "@/pages/admin/scholarships/ScholarshipsList";
import ScholarshipForm from "@/pages/admin/scholarships/ScholarshipForm";
import CareersList from "@/pages/admin/careers/CareersList";
import CareerForm from "@/pages/admin/careers/CareerForm";
import Careers from "@/pages/Careers";
import CareerDetails from "@/pages/CareerDetails";
import Reviews from "@/pages/Reviews";
import AdminNotificationsPage from "@/pages/admin/notifications/NotificationsPage";
import StudentNotificationsPage from "@/pages/student/NotificationsPage";
import Campaign from "@/pages/admin/campaign/Campaign";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:slug" element={<CourseDetails />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:id" element={<ServiceDetails />} />
                <Route
                  path="services/consultation"
                  element={<Consultation />}
                />
                <Route path="consultation" element={<Consultation />} />
                <Route path="universities" element={<Universities />} />
                <Route
                  path="universities/:slug"
                  element={<UniversityDetails />}
                />
                <Route path="destinations" element={<Destinations />} />
                <Route
                  path="destinations/:slug"
                  element={<DestinationDetails />}
                />
                <Route path="blogs/:id" element={<BlogDetails />} />
                <Route
                  path="course-comparison"
                  element={<CourseComparison />}
                />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route path="sitemap" element={<Sitemap />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:slug" element={<EventDetails />} />
                <Route path="scholarships" element={<Scholarships />} />
                <Route
                  path="scholarships/:slug"
                  element={<ScholarshipDetails />}
                />
                <Route path="careers" element={<Careers />} />
                <Route path="careers/:slug" element={<CareerDetails />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="staff/:id" element={<StaffProfile />} />
                <Route path="pages/:slug" element={<PageView />} />
              </Route>
              <Route path="/student-dashboard" element={<StudentDashboard />}>
                <Route path="home" element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
                <Route path="saved-courses" element={<SavedCourses />} />
                <Route
                  path="notifications"
                  element={<StudentNotificationsPage />}
                />
                <Route path="counselling" element={<Counselling />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route
                  path="notifications"
                  element={<AdminNotificationsPage />}
                />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route
                  path="team"
                  element={
                    <RoleGuard allowedRoles={["admin"]}>
                      <TeamManagement />
                    </RoleGuard>
                  }
                />
                <Route path="courses" element={<CoursesList />} />
                <Route path="courses/new" element={<CourseForm />} />
                <Route path="courses/:id/edit" element={<CourseForm />} />
                <Route
                  path="courses/study-areas"
                  element={<StudyAreasManager />}
                />
                <Route
                  path="courses/study-levels"
                  element={<StudyLevelsManager />}
                />
                <Route path="universities" element={<UniversitiesList />} />
                <Route path="universities/new" element={<UniversityForm />} />
                <Route
                  path="universities/:id/edit"
                  element={<UniversityForm />}
                />

                <Route path="destinations" element={<DestinationsList />} />
                <Route path="destinations/new" element={<DestinationForm />} />
                <Route
                  path="destinations/:id/edit"
                  element={<DestinationForm />}
                />
                <Route path="careers" element={<CareersList />} />
                <Route path="careers/new" element={<CareerForm />} />
                <Route path="careers/:id/edit" element={<CareerForm />} />
                <Route path="applications" element={<ApplicationsList />} />
                <Route path="counselling" element={<CounsellingBookings />} />
                <Route path="events" element={<EventsList />} />
                <Route path="events/new" element={<EventForm />} />
                <Route path="events/:id/edit" element={<EventForm />} />
                <Route
                  path="events/:eventId/registrations"
                  element={<EventRegistrationsPage />}
                />
                <Route path="scholarships" element={<ScholarshipsList />} />
                <Route path="scholarships/new" element={<ScholarshipForm />} />
                <Route
                  path="scholarships/:id/edit"
                  element={<ScholarshipForm />}
                />
                <Route path="services" element={<ServicesList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/:id/edit" element={<ServiceForm />} />
                <Route path="blogs" element={<BlogsList />} />
                <Route path="blogs/new" element={<BlogForm />} />
                <Route path="blogs/:id/edit" element={<BlogForm />} />
                <Route
                  path="blogs/categories"
                  element={<BlogCategoriesManager />}
                />
                <Route path="pages" element={<PagesList />} />
                <Route path="pages/new" element={<PageForm />} />
                <Route path="pages/:id/edit" element={<PageForm />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="marketing" element={<MarketingConsents />} />
                <Route
                  path="campaign"
                  element={
                    <RoleGuard allowedRoles={["admin", "editor"]}>
                      <Campaign />
                    </RoleGuard>
                  }
                />
                <Route
                  path="users"
                  element={
                    <RoleGuard allowedRoles={["admin"]}>
                      <AllUsers />
                    </RoleGuard>
                  }
                />
                <Route path="contact" element={<ContactSubmissions />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
