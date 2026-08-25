import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import UpdateComponent from "../../components/todo/UpdateComponent";

const UpdatePage = () => {
  const { tno } = useParams();
  const { moveToList, moveToRead } = useCustomMove();
  return (
    <Container>
      <Header />
      <UpdateComponent
        tno={tno}
        moveToList={moveToList}
        moveRead={moveToRead}
      />
    </Container>
  );
};

export default UpdatePage;
