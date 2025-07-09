import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';


const Task = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log('Error : ', err));
    }, []);

    return (
        <div className='div'>
            <div className="url-container">
                {products.map((product) => (
                    <Card className="url-card bg-success-subtle" key={product.id}>
                        <Card.Img variant='top' id='img1' src={product.image} />
                        <Card.Body>
                            <Card.Title>{setProducts.title}</Card.Title>
                            <Card.Text>₹{product.price}</Card.Text>
                            <Button variant="primary">Buy now</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};
export default Task;