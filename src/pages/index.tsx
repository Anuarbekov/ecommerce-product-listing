import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import ProductListing from "@/components/ProductListing";
import { Product } from "@/types/Product";

interface HomePageProps {
  initialProducts: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ initialProducts }) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      <Header cart={cart} />
      <ProductListing initialProducts={initialProducts} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3030/products?page=1");
  const initialProducts: Product[] = await res.json();
  return { props: { initialProducts } };
};

export default HomePage;
