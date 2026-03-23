const sectionIds = ['hero', 'about', 'schedule', 'organizers', 'faq', 'rsvp'] as const;

function App() {
  return (
    <main className="app-shell" aria-label="Build Guild Dubai">
      {sectionIds.map((sectionId) => (
        <section key={sectionId} id={sectionId} className="section-placeholder" aria-hidden="true" />
      ))}
    </main>
  );
}

export default App;
