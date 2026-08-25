import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import UpdateComponent from "../../components/product/UpdateComponent";

const UpdatePage = () => {
  const { pno } = useParams();
  return (
    <Container>
      <Header />
      <UpdateComponent pno={pno} />
    </Container>
  );
};

export default UpdatePage;
