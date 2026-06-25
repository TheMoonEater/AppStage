import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] =
        useState(null);

    const loadCart = async () => {

        try {

            const username =
                localStorage.getItem(
                    "username"
                );

            const res = await api.get(
                `carts/my_cart/?username=${username}`
            );

            setCart(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        loadCart();

    }, []);

    const removeItem = async (id) => {

        try {

            await api.delete(
                `cart-items/${id}/remove/`
            );

            loadCart();

        } catch (error) {

            console.log(error);
        }
    };

    if (!cart)
        return <h2>Chargement...</h2>;

    const total =
        cart.items.reduce(
            (sum, item) =>
                sum +
                item.prix *
                item.quantite,
            0
        );

    return (

        <div className="cart-page">

            <h1 className="cart-title">
                Mon Panier
            </h1>

            {

                cart.items.length === 0 ? (

                    <div className="empty-cart">

                        <h2>
                            Votre panier est vide
                        </h2>

                    </div>

                ) : (

                    <>

                        {

                            cart.items.map(item => (

                                <div
                                    key={item.id}
                                    className="cart-product-card"
                                >

                                    <h3>
                                        {item.product_name}
                                    </h3>

                                    <p>
                                        Quantité :
                                        {" "}
                                        {item.quantite}
                                    </p>

                                    <p>
                                        Prix :
                                        {" "}
                                        {item.prix?.toLocaleString()}
                                        {" "}
                                        DA
                                    </p>

                                    <button
                                        className="btn-danger"
                                        onClick={() =>
                                            removeItem(
                                                item.id
                                            )
                                        }
                                    >
                                        Supprimer
                                    </button>

                                </div>

                            ))

                        }

                        <div className="cart-summary">

                            <h2>
                                Total panier :
                                {" "}
                                {total.toLocaleString()}
                                {" "}
                                DA
                            </h2>

                            <p>
                                Effectuez votre scoring
                                avant la demande Murabaha
                            </p>

                            <button
                                className="btn-primary"
                                onClick={() =>
                                    navigate("/scoring")
                                }
                            >
                                Faire un scoring
                            </button>

                        </div>

                    </>

                )

            }

        </div>

    );
}

export default Cart;