import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        api.get("orders/")
            .then(res => {

                setOrders(res.data);

            })

            .catch(err => {

                console.log(err);

            });

    }, []);

    return (

        <div>

            <h1>Mes Commandes</h1>

            {orders.map(order => (

                <div
                    key={order.id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px",
                        padding: "10px"
                    }}
                >

                    <h3>
                        Commande #{order.id}
                    </h3>

                    <p>
                        Total : {order.total}
                    </p>

                    <p>
                        Statut : {order.statut}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default Dashboard;