import Header from "./_components/Header.jsx";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
