import { URL_BASE } from "@/constants/glabals";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<any | null>([]);
  const [categories, setCategories] = useState<any | null>([]);
  const [filterTags, setFilterTags] = useState<any | null>([]);
  const [cartItems, setCartItems] = useState<any | null>([]);

  useEffect(() => {
    updateProducts(setProducts);
    updateCategories(setCategories);
    updateFilterTags(setFilterTags);
    updateCartItems(setCartItems);
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        categories,
        setCategories,
        filterTags,
        setFilterTags,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export function updateProducts(callback) {
  fetch(`${URL_BASE}/api/products`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.products);
      callback(data.products);
    });
}
export function updateCategories(callback) {
  fetch(`${URL_BASE}/api/products/get_categories`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.categories);
      callback(data.categories);
    });
}
export function updateFilterTags(callback) {
  fetch(`${URL_BASE}/api/products/get_filter_tag_categories`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.filter_tag_categories);
      callback(data.filter_tag_categories);
    });
}

export function updateCartItems(callback) {
  fetch(`${URL_BASE}/api/cartItems`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.cart_items);
      callback(data.cart_items);
    });
}
