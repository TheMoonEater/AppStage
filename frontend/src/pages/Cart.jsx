import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {

    const [cart, setCart] = useState(null);

    useEffect(() => {

        api.get("carts/1/")
            .then(res => setCart(res.data));

    }, []);

    if (!cart) return <h2>Chargement...</h2>;

    return (

        <div>

            <h1>Panier</h1>

            {cart.items.map(item => (

                <div key={item.id}>

                    {item.product_name}

                    x

                    {item.quantite}

                </div>

            ))}

        </div>
    );
}

export default Cart;