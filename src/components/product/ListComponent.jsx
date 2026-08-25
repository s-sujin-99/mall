import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/productApi";
import { Card, Container, Row } from "react-bootstrap";
import { API_SERVER_HOST } from "../../api/productApi";
import PageComponent from "../../components/product/PageComponent";
import FetchingModal from "../common/FetchingModel";
import { exceptionHandle } from "../common/exceptionHandle";

const host = API_SERVER_HOST;
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
      });
  }, [page, size, refresh]);
  // useEffect((result) => {
  //   console.log(result);
  // });
  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="d-flex justify-content-around mt-5 gap-4">
          {serverData?.dtoList?.map((product) => {
            // 2. 이미지가 존재할 때만 안전하게 썸네일 경로 지정
            const hasImage =
              product.uploadFileNames && product.uploadFileNames.length > 0;
            const imgSrc = hasImage
              ? `${host}/api/product/view/s_${product.uploadFileNames[0]}`
              : "https://via.placeholder.com/150"; // 이미지가 없을 때 대체 이미지

            return (
              <Card
                className="p-3 shadow-sm"
                style={{ width: "14rem", height: "22rem", cursor: "pointer" }}
                key={product.pno} // 3. key는 반복되는 최상단 태그에 위치
                onClick={() => moveToProductRead(product.pno)}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: "0.9rem" }}>
                    PNO : {product.pno}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    NAME : {product.pname}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "0.9rem" }}>
                    PRICE : {product.price}원
                  </Card.Title>
                </Card.Body>
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="product"
                    src={imgSrc}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Card>
            );
          })}
        </Row>
        <PageComponent
          serverData={serverData}
          moveToList={moveToProductList}
        ></PageComponent>
      </Container>
    </>
  );
};

export default ListComponent;
