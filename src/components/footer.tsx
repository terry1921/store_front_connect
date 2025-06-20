export function AppFooter() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Terry1921 Store Front Connect. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
