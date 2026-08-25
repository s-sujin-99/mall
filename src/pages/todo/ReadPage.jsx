import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/todo/ReadComponent";
import { useParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove"; 

const ReadPage = () => {
  const { tno } = useParams();

  const { moveToUpdate, moveToList } = useCustomMove();

  return (
    <Container>
      <Header />
      {/* 컴포넌트에 props로 정확히 전달 */}
      <ReadComponent
        tno={tno}
        moveToUpdate={moveToUpdate}
        moveToList={moveToList}
      />
    </Container>
  );
};

export default ReadPage;
