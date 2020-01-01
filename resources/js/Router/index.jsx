import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Cart from "../components/Cart";
import Shipping from "../components/Shipping"


class Router extends Component {

    render() {

        return (
            <BrowserRouter>
                < Switch>
                    <Route path='/cart'
                           exact component={Cart}
                    />
                    <Route path='/shipping'
                           component={Shipping}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
};

export default Router;
