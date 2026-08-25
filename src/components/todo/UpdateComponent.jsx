import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/todoApi";
import { Container, Form, Button } from "react-bootstrap";
import InfoModal from "../common/InfoModal";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

const UpdateComponent = ({ tno, moveToList, moveToRead }) => {
  const [todo, setTodo] = useState({ ...initState });
  const [result, setResult] = useState(null);

  // 💡 모달 상태 및 닫기 분기용 상태 추가
  const [infoModalOn, setInfoModalOn] = useState(false);
  const [type, setType] = useState(""); // "Modified" 또는 "Deleted"

  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
  }, [tno]);

  const handleClickUpdate = () => {
    putOne(todo).then((data) => {
      console.log("update result: ", data);
      setResult("Modified");
      setType("modified");
      setInfoModalOn(true);
    });
  };

  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      console.log("delete result: ", data);
      setResult("Deleted");
      setType("deleted");
      setInfoModalOn(true);
    });
  };

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };

  const closeModal = () => {
    setInfoModalOn(false);
    if (type === "deleted") {
      moveToList({ page: 1 });
    } else {
      moveToRead(tno);
    }
  };

  return (
    <Container className="p-5">
      <InfoModal
        show={infoModalOn}
        title={`RESULT`}
        content={`${result}`}
        callbackFn={closeModal}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TNO</Form.Label>
          <Form.Control
            value={tno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            value={todo.writer ?? ""}
            type="text"
            placeholder="Enter writer"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={todo.title ?? ""}
            placeholder="Enter title"
            onChange={handleChangeTodo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="dueDate"
            value={todo.dueDate ?? ""}
            type="date"
            onChange={handleChangeTodo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>COMPLETE</Form.Label>
          <Form.Select
            name="complete"
            value={todo.complete ? "Y" : "N"} // 💡 Y 또는 N으로 매칭
            onChange={handleChangeTodoComplete}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <Button variant="secondary" type="button" onClick={handleClickUpdate}>
          수정하기
        </Button>
        <Button variant="danger" type="button" onClick={handleClickDelete}>
          삭제하기
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            moveToList();
          }}
        >
          목록가기
        </Button>
      </div>
    </Container>
  );
};

export default UpdateComponent;
