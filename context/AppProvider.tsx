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
  const [filterTagCategories, setFilterTagCategories] = useState<any | null>(
    []
  );
  const [cartItems, setCartItems] = useState<any | null>([]);
  const [wishlistItems, setWishlistItems] = useState<any | null>([]);

  const [orders, setOrders] = useState<any | null>([]);
  const [orderItems, setOrderItems] = useState<any | null>([]);

  useEffect(() => {
    updateProducts(setProducts);
    updateCategories(setCategories);
    updateFilterTags(setFilterTags);
    updateFilterTagCategories(setFilterTagCategories);
    updateCartItems(setCartItems);
    updateWishlistItems(setWishlistItems);
    updateOrders(setOrders);
    updateOrdersItems(setOrderItems);
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
          if (data?.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        })
        .catch(() => {
          setUser(null);
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
        filterTagCategories,
        setFilterTagCategories,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
        orders,
        setOrders,
        orderItems,
        setOrderItems,
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
      // console.log(data.products);
      callback(data.products);
    });
}
export function updateCategories(callback) {
  fetch(`${URL_BASE}/api/products/get_categories`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.categories);
      callback(data.categories);
    });
}
export function updateFilterTags(callback) {
  fetch(`${URL_BASE}/api/products/get_filter_tags`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.filter_tags);
      callback(data.filter_tags);
    });
}
export function updateFilterTagCategories(callback) {
  fetch(`${URL_BASE}/api/products/get_filter_tag_categories`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.filter_tag_categories);
      callback(data.filter_tag_categories);
    });
}

export function updateCartItems(callback) {
  fetch(`${URL_BASE}/api/cartItems`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.cart_items);
      callback(data.cart_items);
    });
}

export function updateWishlistItems(callback) {
  fetch(`${URL_BASE}/api/wishlistItems`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.wishlist_items);
      callback(data.wishlist_items);
    });
}
export function updateOrders(callback) {
  fetch(`${URL_BASE}/api/orders`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      callback(data);
    });
}

export function updateOrdersItems(callback) {
  fetch(`${URL_BASE}/api/OrderItems`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.order_items);
      callback(data.order_items);
    });
}
