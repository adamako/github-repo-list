import { Footer, Header } from "./components/molecules";
import { RepositoryView } from "./views";

function App() {
  return (
    <div className="container mx-auto lg:px-20">
      <Header />
      <RepositoryView />
      <Footer />
    </div>
  );
}

export default App;
