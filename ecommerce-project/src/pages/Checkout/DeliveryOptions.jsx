import axios from "axios";
import { formatMoney } from "../../utils/Money";
import dayjs from "dayjs";
export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
    const API_URL = import.meta.env.VITE_API_URL;
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE Shipping';
                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                }
                const updateDeliveryOption = async () => {
                    await axios.put(`${API_URL}/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id
                    });
                    await loadCart();
                };
                return (
                    <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                        <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}
                            onChange={() => { }}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                );
            })
            }
        </div>
    )
}
