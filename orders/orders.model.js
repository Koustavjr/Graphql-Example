const orders=[{
    date:'2005-05-05',
    subtotal: 90.22,
    items:[{
        
            product:{
                id: 'redshoe',
                description:'Red Shoe',
                price: 42.12,
            },
            quantity: 2
        
    }]
}]

function getAllOrders()
{
    return orders;
}

module.exports={
    getAllOrders,
}