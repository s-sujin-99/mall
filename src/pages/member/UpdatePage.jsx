import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import UpdateComponent from "../../components/member/UpdateComponent";

const UpdatePage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5 p-5">
        <UpdateComponent />
      </div>
    </Container>
  );
};
export default UpdatePage;
