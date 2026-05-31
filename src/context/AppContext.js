import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { useData } from "./DataContext";
import { supabase } from "@/utils/supabase";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { user } = useAuth();
    const { products } = useData();
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("tnature_cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("tnature_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Fetch and Sync Wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) {
                // If not logged in, load wishlist from localStorage
                const savedWishlist = localStorage.getItem("tnature_wishlist");
                if (savedWishlist) {
                    try {
                        const ids = JSON.parse(savedWishlist);
                        if (Array.isArray(ids) && products.length > 0) {
                            const items = ids
                                .map((id) => products.find((p) => p.id === id))
                                .filter(Boolean);
                            setWishlistItems(items);
                        }
                    } catch (e) {
                        console.error("Failed to parse localStorage wishlist", e);
                    }
                } else {
                    setWishlistItems([]);
                }
                return;
            }

            setWishlistLoading(true);
            try {
                // If logged in, first sync any localStorage items to Supabase
                const savedWishlist = localStorage.getItem("tnature_wishlist");
                if (savedWishlist) {
                    try {
                        const ids = JSON.parse(savedWishlist);
                        if (Array.isArray(ids) && ids.length > 0) {
                            const rows = ids.map(id => ({ user_id: user.id, product_id: id }));
                            const { error: syncError } = await supabase
                                .from("wishlist")
                                .upsert(rows, { onConflict: "user_id,product_id" });

                            if (syncError) {
                                console.error("Error syncing wishlist:", syncError.message);
                            } else {
                                toast.success("Synced local wishlist with your account!");
                            }
                        }
                    } catch (e) {
                        console.error("Failed to sync localStorage wishlist", e);
                    } finally {
                        localStorage.removeItem("tnature_wishlist");
                    }
                }

                // Fetch final consolidated wishlist from Supabase
                const { data, error } = await supabase
                    .from("wishlist")
                    .select("*")
                    .eq("user_id", user.id);

                if (error) throw error;

                if (data && products.length > 0) {
                    const items = data
                        .map((item) => products.find((p) => p.id === item.product_id))
                        .filter(Boolean);
                    setWishlistItems(items);
                } else {
                    setWishlistItems([]);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error.message);
            } finally {
                setWishlistLoading(false);
            }
        };

        fetchWishlist();
    }, [user, products]);

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                toast.info(`Updated ${product.name} quantity in cart`);
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            toast.success(`Added ${product.name} to cart`);
            return [...prevItems, { ...product, quantity }];
        });
        // setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
            const itemToRemove = prevItems.find((item) => item.id === productId);
            if (itemToRemove) {
                toast.warn(`Removed ${itemToRemove.name} from cart`);
            }
            return prevItems.filter((item) => item.id !== productId);
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.info("Cart cleared");
    };

    const addToWishlist = async (product) => {
        if (!user) {
            // LocalStorage fallback for guests
            setWishlistItems((prev) => {
                if (prev.some((item) => item.id === product.id)) {
                    toast.info(`${product.name} is already in your wishlist`);
                    return prev;
                }
                const newWishlist = [...prev, product];
                localStorage.setItem("tnature_wishlist", JSON.stringify(newWishlist.map(i => i.id)));
                toast.success(`${product.name} added to wishlist (guest)`);
                return newWishlist;
            });
            return;
        }

        try {
            const { error } = await supabase
                .from("wishlist")
                .insert([{ user_id: user.id, product_id: product.id }]);

            if (error) {
                if (error.code === "23505") {
                    toast.info(`${product.name} is already in your wishlist`);
                    return;
                }
                throw error;
            }

            setWishlistItems((prev) => [...prev, product]);
            toast.success(`${product.name} added to wishlist`);
        } catch (error) {
            toast.error(`Failed to add to wishlist: ${error.message}`);
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!user) {
            // Remove from localStorage fallback for guests
            setWishlistItems((prev) => {
                const newWishlist = prev.filter((item) => item.id !== productId);
                localStorage.setItem("tnature_wishlist", JSON.stringify(newWishlist.map(i => i.id)));
                toast.warn(`Removed item from wishlist`);
                return newWishlist;
            });
            return;
        }

        try {
            const { error } = await supabase
                .from("wishlist")
                .delete()
                .eq("user_id", user.id)
                .eq("product_id", productId);

            if (error) throw error;

            setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
            toast.warn(`Removed item from wishlist`);
        } catch (error) {
            toast.error(`Failed to remove from wishlist: ${error.message}`);
        }
    };

    const toggleWishlist = async (product) => {
        const exists = wishlistItems.some((item) => item.id === product.id);
        if (exists) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartSubtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <AppContext.Provider
            value={{
                cartItems,
                isCartOpen,
                toggleCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartSubtotal,
                setIsCartOpen,
                wishlistItems,
                wishlistLoading,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
