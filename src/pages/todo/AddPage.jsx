import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/todo/ReadComponent";
import { useParams } from "react-router-dom";
import AddComponent from "../../components/todo/AddComponent";

const AddPage = () => {
  const { tno } = useParams();
  return (
    <Container>
      <Header />
      <AddComponent />
    </Container>
  );
};

export default AddPage;
