import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { postAdd } from "../../api/productApi";
import FetchingModal from "../common/FetchingModel";
import InfoModal from "../common/InfoModal";

const initState = { pname: "", pdesc: "", price: 0, files: [] };

// ✅ 수정 1: props를 객체 구조분해 할당 ({ moveToProductList })으로 받기
const AddComponent = ({ moveToProductList }) => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    setFetching(true);
    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result); // 서버가 준 번호가 담기면서 result가 truthy가 됨
    });
  };

  const closeModal = () => {
    console.log("2. closeModal 버튼 클릭됨!"); // <-- 모달 닫기 버튼 누를 때 찍히는지 확인
    setResult(null);
    if (moveToProductList) {
      moveToProductList({ page: 1 });
    } else {
      console.error("3. moveToProductList 함수가 존재하지 않습니다!");
    }
  };

  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <InfoModal
          show={true}
          title={"Product Add Result"}
          content={`${result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="pname"
            type="text"
            value={product.pname}
            onChange={handleChangeProduct}
            placeholder="Enter pname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="pdesc"
            value={product.pdesc}
            as="textarea"
            rows={4}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            onChange={handleChangeProduct}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple={true} />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2 ">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
      </div>
    </Container>
  );
};

export default AddComponent;
