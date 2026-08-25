import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/product/ReadComponent";
import { useParams } from "react-router-dom";

const ReadPage = () => {
  const { pno } = useParams();

  return (
    <Container>
      <Header />
      {/* 컴포넌트에 props로 정확히 전달 */}
      <ReadComponent pno={pno} />
    </Container>
  );
};

export default ReadPage;
