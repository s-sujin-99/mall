import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";
import { Button, Card, Container } from "react-bootstrap";
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutComponent = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  /*
  const handleClickLogout = () => {
    dispatch(logout());
    navigate({ pathname: "/" }, { replace: true });
  };
  */
  const { doLogout, moveToPath } = useCustomLogin();
  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
  };
  return (
    <Container className="p-5">
      <Card className="text-center">
        <Card.Header>Logout Component</Card.Header>
        <Card.Body>
          <Card.Title>로그아웃을진행합니다.</Card.Title>
          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-primary" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LogoutComponent;
