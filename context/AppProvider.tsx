import { URL_BASE } from "@/constants/glabals";
import AsyncStorage from "@react-native-async-storage/async-storage/lib/module/index";
import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext<any>(null);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<any | null>([]);
  const [categories, setCategories] = useState<any | null>([]);
  const [filterTags, setFilterTags] = useState<any | null>([]);
  const [cartItems, setCartItems] = useState<any | null>([]);
  const [wishlistItems, setWishlistItems] = useState<any | null>([]);

  useEffect(() => {
    updateProducts(setProducts);
    updateCategories(setCategories);
    updateFilterTags(setFilterTags);
    updateCartItems(setCartItems);
    updateWishlistItems(setWishlistItems);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then((jsonValue) => {
      if (jsonValue == null) return;
      const id = JSON.parse(jsonValue).id;

      fetch(`${URL_BASE}/api/users/view/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data.user);
        });
    });
  }, []);

  useEffect(() => {
    if (user != null) {
      const jsonValue = JSON.stringify(user);
      AsyncStorage.setItem("user", jsonValue);
    } else {
      AsyncStorage.removeItem("user");
    }
  }, [user]);
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
        wishlistItems,
        setWishlistItems,
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

export function updateWishlistItems(callback) {
  fetch(`${URL_BASE}/api/wishlistItems`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.wishlist_items);
      callback(data.wishlist_items);
    });
}
