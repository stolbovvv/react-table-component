import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';
import { Panel } from 'components/panel/panel';
import { Table } from 'components/table/table';

function App() {
  return (
    <>
      <Header />
      <main>
        <Panel />
        <Table />
      </main>
      <Footer />
    </>
  );
}

export { App };
