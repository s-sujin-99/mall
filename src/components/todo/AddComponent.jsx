import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { postAdd } from "../../api/todoApi";
import { Container, Form, Button } from "react-bootstrap";
import InfoModal from "../common/InfoModal";

const initState = { title: "", writer: "", dueDate: "" };

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();
  const [infoModalOn, setInfoModalOn] = useState(false);

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    // console.log(todo)
    postAdd(todo)
      .then((result) => {
        console.log(result);
        setResult(result.TNO);
        setInfoModalOn(true);

        setTodo({ ...initState }); // 초기화
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
  };

  return (
    <Container className="p-5">
      <InfoModal
        show={infoModalOn}
        title={`ADD RESULT`}
        content={`New ${result} Added`}
        callbackFn={() => closeModal()}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChangeTodo}
            placeholder="Enter Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            name="writer"
            type="text"
            value={todo.writer}
            onChange={handleChangeTodo}
            placeholder="Enter Writer"
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>DUEDATE</Form.Label>
          <Form.Control
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChangeTodo}
            placeholder="Enter dueDate"
          />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            moveToList({ page: 1 });
          }}
        >
          목록
        </Button>
      </div>
    </Container>
  );
};

export default AddComponent;
