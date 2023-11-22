import type { ModalState } from 'types/modal';
import { useSelector } from 'react-redux';
import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';
import { Panel } from 'components/panel/panel';
import { Table } from 'components/table/table';
import { Modal } from 'components/modal/modal';

function App() {
  const isModalOpen = useSelector((state: { modal: ModalState }) => state.modal.isOpen);

  return (
    <>
      <Header />
      <main>
        <Panel />
        <Table />
      </main>
      <Footer />
      {isModalOpen && <Modal />}
    </>
  );
}

export { App };
