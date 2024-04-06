const express=require('express');
//const {buildSchema}=require('graphql');
const path=require('path');
//const {graphqlHTTP}=require('express-graphql');
//const app = express();
const {makeExecutableSchema}=require('@graphql-tools/schema');
const {loadFilesSync}=require('@graphql-tools/load-files');
const { ApolloServer }=require('apollo-server-express');


const typesArray=loadFilesSync('**/*.graphql',{
    extensions:['graphql'],
});
const resolversArray=loadFilesSync(path.join(__dirname,'**/*.resolvers.js'));



const root={
    products:require('./products/products.model'),
orders: require('./orders/orders.model')
}

// using apollo server

async function startApolloServer()
{
    const app =express();

    // we want this schema to decide how the apollo server will react to graphql request
    const schema=makeExecutableSchema(
        {
            typeDefs:typesArray,
            resolvers: resolversArray
    
        });

        const server= new ApolloServer({
            schema
        });

        await server.start(); // this will tell the apollo server to be prepared to handle incoming graphql operations
        server.applyMiddleware({app,path:'/graphql'});//connects apollo's graphql middleware with express server
        
        app.listen(3000,()=>{
            console.log('Running GraphQL server...');
        });

    }
startApolloServer();





// Code with graphql server    
/*const schemaText=`
type Query
{
   products:[Product]
   orders:[Order]
}
/*type Product
{
    id:ID
    description: String!
    review:[Review]
    price: Float!
}
type Review
{
    rating: Int!
    comment: String
}
type Order
{
    date: String!
    subtotal: Float!
    items:[OrderItem]
}
type OrderItem
{
    product:Product!
    quantity: Int!
}
`;*/


//const typesArray=loadFilesSync(path.join(__dirname,'**/*.graphql'));


/*const schema=buildSchema(`
    type Query
    {
       products:[Product]
       orders:[Order]
    }
    type Product
    {
        id:ID
        description: String!
        review:[Review]
        price: Float!
    }
    type Review
    {
        rating: Int!
        comment: String
    }
    type Order
    {
        date: String!
        subtotal: Float!
        items:[OrderItem]
    }
    type OrderItem
    {
        product:Product!
        quantity: Int!
    }
`);*/


/*const schema=makeExecutableSchema(
    {
        //typeDefs:[schemaText]
        typeDefs:typesArray,
        resolvers: resolversArray
        
        
        /*{
            Query:{
                products:(parent)=>
                {
                    console.log('Getting products....');
                    return parent.products;
                },
                orders:(parent)=>
                {
                    console.log('getting orders...');
                    return parent.orders;
                }
                // implementing ASYNC function 
                products: async(parent)=>
                {
                    console.log('Getting products....');
                    const product = await Promise.resolve(parent.products);
                    return product;
                },
                orders:async(parent)=>
                {
                    console.log('getting orders...');
                    const order=await Promise.resolve(parent.orders);
                    return order;
                }
            }
        }

    });*/

// using graphql server
    /*app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));*/


/*app.listen(3000,()=>{
    console.log('Running GraphQL server...');
});*/

