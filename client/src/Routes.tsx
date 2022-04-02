import {
    BrowserRouter as Router,
    Route,
    
} from "react-router-dom";

import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/catalog";

export function Routes() {
    return (
        <Router>
            <Route path="/cart">
                <Cart/>
            </Route>
            <Route path="/catalog">
                <Catalog/>
            </Route>
        </Router>
    )
}