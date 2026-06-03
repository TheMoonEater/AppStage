import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetail() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        api.get(`products/${id}/`)
            .then(res => setProduct(res.data));

    }, []);

    if (!product) return <h1>Chargement...</h1>;

    const addToCart = () => {

        api.post("cart-items/add/", {

            user_id: 1,
            product_id: product.id

        })

        .then(() => alert("Ajouté au panier"));
    };

    return (

        <div>

            <h1>{product.nom}</h1>

            <p>{product.description}</p>

            <h2>{product.prix} DA</h2>

            <button onClick={addToCart}>
                Ajouter au panier
            </button>

        </div>
    );
}

export default ProductDetail;