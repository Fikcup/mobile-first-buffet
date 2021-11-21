import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Menu = ({ token }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            await axios.get(`/api/categories`)
                .then(data => {
                    setCategories(data.data);
                });
        }

        async function createCart() {
            const decoded = jwt.verify(token, process.env.REACT_APP_SECRET);
            const user = decoded.id;

            await axios.post(`/api/carts`, {
                userUuid: user
            });
        }

        getCategories();
        createCart();
    }, []);
    
    return (
        <div>
            {categories.map((category, index) => {
                return (
                    <NavLink to={category.uuid} key={category.uuid + index}>
                        <div>
                            <h1>{category.name}</h1>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
}

export default Menu;