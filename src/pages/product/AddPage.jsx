import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/product/ReadComponent";
import { useParams } from "react-router-dom";
import AddComponent from "../../components/product/AddComponent";
import useCustomMove from "../../hooks/useCustomMove";
const AddPage = () => {
  const { tno } = useParams();
  const { moveToProductList } = useCustomMove();
  return (
    <Container>
      <Header />
      <AddComponent moveToProductList={moveToProductList} />
    </Container>
  );
};

export default AddPage;
