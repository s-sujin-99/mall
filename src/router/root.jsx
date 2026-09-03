import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loading";

// lazy가 걸리면 Loading 페이지 보여주기
const MainPage = lazy(() => import("../pages/MainPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
//  todo 관련 페이지
const ListPage = lazy(() => import("../pages/todo/ListPage"));
const ReadPage = lazy(() => import("../pages/todo/ReadPage"));
const AddPage = lazy(() => import("../pages/todo/AddPage"));
const UpdatePage = lazy(() => import("../pages/todo/UpdatePage"));
// product 관련 페이지
const ProductListPage = lazy(() => import("../pages/product/ListPage"));
const ProductAddPage = lazy(() => import("../pages/product/AddPage"));
const ProductReadPage = lazy(() => import("../pages/product/ReadPage"));
const ProductUpdatePage = lazy(() => import("../pages/product/UpdatePage"));
// member 관련 페이지
const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"));
const MemberUpdate = lazy(() => import("../pages/member/UpdatePage"));

//kakao
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));
const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={<Loading />}>
        <AboutPage />
      </Suspense>
    ),
  },

  {
    path: "/todo/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ListPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/read/:tno",
    element: (
      <Suspense fallback={<Loading />}>
        <ReadPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/add",
    element: (
      <Suspense fallback={<Loading />}>
        <AddPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/update/:tno",
    element: (
      <Suspense fallback={<Loading />}>
        <UpdatePage />
      </Suspense>
    ),
  },
  {
    path: "/product/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductListPage />
      </Suspense>
    ),
  },
  {
    path: "/product/add",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductAddPage />
      </Suspense>
    ),
  },
  {
    path: "/product/read/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductReadPage />
      </Suspense>
    ),
  },
  {
    path: "/product/update/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductUpdatePage />
      </Suspense>
    ),
  },
  {
    path: "/member/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/member/logout",
    element: (
      <Suspense fallback={<Loading />}>
        <LogoutPage />
      </Suspense>
    ),
  },
  {
    path: "/member/kakao",
    element: (
      <Suspense fallback={<Loading />}>
        <KakaoRedirect />
      </Suspense>
    ),
  },
  {
    path: "/member/update",
    element: (
      <Suspense fallback={Loading}>
        <MemberUpdate />
      </Suspense>
    ),
  },
]);

export default root;
