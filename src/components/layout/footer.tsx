export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} RetroForge Portfolio. All rights reserved.</p>
          <p>SYSTEM.NORMAL.OPERATION</p>
        </div>
      </div>
    </footer>
  );
}
