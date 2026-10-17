import { Container, LinkButton } from '../components/ui';

export function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-blue-600">404</p>
      <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-gray-600">That page doesn't exist. Head back home or explore our spaces.</p>
      <div className="mt-8 flex justify-center gap-3"><LinkButton to="/">Home</LinkButton><LinkButton to="/services" variant="outline">Explore spaces</LinkButton></div>
    </Container>
  );
}
