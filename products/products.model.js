const products=[
    {
    id: 'redshoe',
    description:'Red Shoe',
    price: 42.12,
    review:[]
},
{
    id: 'bluejean',
    description:'Blue jeans',
    price: 55.55,
    review:[]
}
]

function getAllProducts()
{
    return products;
}
function getProductsByPrice(min,max)
{
    return products.filter((product)=>{
        return product.price>=min && product.price<=max;
    })
}

function getProductById(id)
{
    return products.find((product)=>{
        return product.id===id;
    });
}

function addNewProduct(id,description,price)
{
    const newProduct=
    {
        id,
        description,
        price,
        review:[]
    }
    products.push(newProduct);
    
    return newProduct;
}

function addNewProductReview(id,rating,comment)
{
    const matchProduct=getProductById(id);
    if(matchProduct)
    {
        const newProductReview={
            rating,
            comment
        }
        matchProduct.review.push(newProductReview);
        return newProductReview;
    }
   
}
module.exports={
    getAllProducts,
    getProductsByPrice,
    getProductById,
    addNewProduct,
    addNewProductReview
}