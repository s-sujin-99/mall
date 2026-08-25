import { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import {
  API_SERVER_HOST,
  getOne,
  putOne,
  deleteOne,
} from "../../api/productApi";
import FetchingModal from "../common/FetchingModel";
import useCustomMove from "../../hooks/useCustomMove";
import InfoModal from "../common/InfoModal";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const UpdateComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  const [result, setResult] = useState(null);

  // 이동용 함수
  const { moveToProductRead, moveToProductList } = useCustomMove();

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      console.log("불러온 데이터:", data);
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    // delFlag인 경우 문자열 "true"/"false"를 boolean으로 변환
    if (name === "delFlag") {
      product[name] = value === "true";
    } else {
      product[name] = value;
    }
    setProduct({ ...product });
  };

  // 기존 이미지 삭제 함수
  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName,
    );
    setProduct({ ...product, uploadFileNames: resultFileNames });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    // 1. 새로 업로드할 파일들 추가
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 2. 상품 기본 정보 추가
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    // 3. 유지할 기존 이미지 파일명들 추가
    if (product.uploadFileNames && product.uploadFileNames.length > 0) {
      for (let i = 0; i < product.uploadFileNames.length; i++) {
        formData.append("uploadFileNames", product.uploadFileNames[i]);
      }
    }

    console.log("🚀 [디버깅] 서버로 수정 요청 전송 시작...");
    setFetching(true);

    putOne(pno, formData)
      .then((data) => {
        console.log("✨ [디버깅] 서버 통신 성공! 응답 데이터:", data);
        setFetching(false);
        // 페칭 모달이 완전히 사라진 후 InfoModal이 안정적으로 뜰 수 있도록 setTimeout 적용
        setTimeout(() => {
          setResult("Modified");
        }, 100);
      })
      .catch((err) => {
        console.error("❌ [디버깅] 서버 통신 에러 발생:", err);
        if (err.response) {
          console.error("에러 상세 내용 (Response Data):", err.response.data);
          console.error("에러 상태 코드 (Status):", err.response.status);
        }
        setFetching(false);
        alert(
          `수정 실패! 콘솔창의 에러를 확인해주세요. (사유: ${err.message})`,
        );
      });
  };
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(pno)
      .then((data) => {
        console.log("삭제 결과:", data);
        setFetching(false);
        // 삭제 성공 시 모달을 띄우지 않고 곧바로 리스트로 이동
        moveToProductList({ page: 1 });
      })
      .catch((err) => {
        console.error("삭제 에러:", err);
        setFetching(false);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };

  const closeModal = () => {
    if (result === "Modified") {
      setResult(null);
      moveToProductRead(pno);
    } else if (result === "Deleted") {
      setResult(null);
      moveToProductList({ page: 1 });
    }
  };

  return (
    <Container className="p-5">
      <h3 className="mb-4">Product Update Component</h3>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <InfoModal
          show={true}
          title={result}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            name="pname"
            value={product.pname}
            type="text"
            placeholder="Enter name"
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            placeholder="Enter price"
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            name="pdesc"
            value={product.pdesc}
            as="textarea"
            rows={5}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DELETE FLAG</Form.Label>
          <Form.Select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple={true} />
        </Form.Group>
      </Form>

      <Row className="d-flex justify-content-center mt-5 gap-4">
        {product.uploadFileNames?.map((imgFile, i) => (
          <Card style={{ width: "14rem", height: "16rem" }} key={i}>
            <Button
              variant="outline-danger"
              size="sm"
              className="m-2"
              onClick={() => deleteOldImages(imgFile)}
            >
              DELETE
            </Button>
            <Card.Body className="d-flex justify-content-center align-items-center">
              <img
                alt="img"
                style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
                src={`${host}/api/product/view/s_${imgFile}`}
              />
            </Card.Body>
          </Card>
        ))}
      </Row>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickDelete}
        >
          DELETE
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleClickModify}
        >
          Update
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => moveToProductList()}
        >
          LIST
        </button>
      </div>
    </Container>
  );
};

export default UpdateComponent;
