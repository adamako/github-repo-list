import { Footer, Header } from "./components/molecules";
import { RepositoryView } from "./views";

function App() {
  return (
    <div className="container mx-auto px-20">
      <Header />
      <RepositoryView />
      <Footer />
    </div>
  );
}

export default App;
