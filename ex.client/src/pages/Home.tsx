import { Category, Product } from '@expert/common';
import { createRef, useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { CategoriesList, ProductsList } from '../components';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { Categories } from '../utils';
import { Loading } from './Loading';

export const Home: React.FC = () => {
  const searchRef = createRef<HTMLInputElement>();
  const [filteredList, setFilteredList] = useState<Product[]>([]);

  const goTo = useNavigate();

  const { user } = useAuth();
  const { products } = useProducts();

  useEffect(() => {
    if (!products) return;

    setFilteredList(products);
  }, [products, user]);

  const isNameMatched = (name: string) =>
    name.includes(searchRef.current!.value);

  const filterList = () => {
    const filteredProducts = products.filter(
      (item) =>
        isNameMatched(item.name) || item.nameVariation.find(isNameMatched)
    );

    setFilteredList(filteredProducts);
  };

  const isProductFound = () => {
    return Boolean(filteredList?.length);
  };

  const filterByCategory = (category: Category | null) => {
    const filteredProducts = !category
      ? products
      : products.filter((product) => product.category === category);

    setFilteredList(filteredProducts);
  };

  if (!products) return <Loading />;

  return (
    <div className="grid justify-center gap-4">
      <header className="grid text-center p-8">
        <h1 className="text-5xl font-extrabold">this is expert</h1>
        <h3>expiry dates by the experts</h3>
      </header>

      <form
        className="grid grid-cols-[1fr_auto] m-auto w-[calc(100%-2rem)] max-w-xl items-center"
        onSubmit={(e) => {
          e.preventDefault();
          return (
            isProductFound() || goTo(`/products/${searchRef.current!.value}`)
          );
        }}
      >
        <input
          type="search"
          name="search"
          ref={searchRef}
          placeholder="search for an item"
          onChange={filterList}
          className="rounded-full focus:outline-brand border-2 row-start-1 col-start-1 col-span-2 border-grey p-4"
        />
        <button
          type="submit"
          className="row-start-1 col-start-2 p-4 text-brand"
        >
          <BiSearchAlt2 />
        </button>
      </form>
      <CategoriesList
        categories={[...Categories, { name: null, icon: '🗑️' }]}
        onClick={filterByCategory}
        group="category"
        design="compact"
        className="m-auto"
      />
      <ProductsList list={filteredList} />
    </div>
  );
};
