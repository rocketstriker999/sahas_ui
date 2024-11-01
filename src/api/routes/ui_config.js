const libExpress = require('express')

const router = libExpress.Router()


router.get("/header-texts", (req, res) => {
    res.status(200).json({
        "header_title": "Sahas Smart Studies",
        "header_tagline": "Learn Digitally",
        "header_description": "Lorem ipsum placeholder text."
    })
})

router.get("/product-categories", (req, res) => {

    res.status(200).json([
        { categoryName: "cat1", categoryIcon: "pi pi-fw pi-sign-in" },
        { categoryName: "cat2", categoryIcon: "pi pi-fw pi-sign-in" },
        { categoryName: "cat3", categoryIcon: "pi pi-fw pi-sign-in" }
    ])

})

router.get("/hero-images", (req, res) => {

    res.status(200).json([
        "https://placehold.co/100x100/black/FFFFFF/png",
        "https://placehold.co/100x100/orange/FFFFFF/png",
        "https://placehold.co/100x100/blue/FFFFFF/png"
    ])

})


router.get("/showcase-products", (req, res) => {
    res.status(200).json([
        {
            categoryName: "cat1", 
            categoryIcon: "pi pi-fw pi-sign-in",
            modelProducts: [
               {
                productId:1,
                productPrice:100,
                buyers:188,
                ratings:4,
                publisher:"Jhon Doe1",
                title:"prodcut 1",
                imageURL:"https://placehold.co/100x100/black/FFFFFF/png",
               },
               {
                productId:2,
                productPrice:100,
                buyers:188,
                ratings:4,
                publisher:"Jhon Doe2",
                title:"prodcut 2",
                imageURL:"https://placehold.co/100x100/black/FFFFFF/png",
               }
            ]
        }
      
    ])
})

router.get("/top-testimonies",(req,res)=>{

    res.status(200).json([
        {
            testimonyId:1,
            userName:"User1",
            recordedDate:"22-04-2024",
            testimony:"This is sample testimony for product 1 and This is Second Line For Testing",
            productName:"Product 1"
        },
        {
            testimonyId:2,
            userName:"User2",
            recordedDate:"22-04-2024",
            testimony:"This is sample testimony for product 1 and This is Second Line For Testing",
            productName:"Product 3"
        },
        {
            testimonyId:3,
            userName:"User3",
            recordedDate:"22-04-2024",
            testimony:"This is sample testimony for product 1 and This is Second Line For Testing",
            productName:"Product 2"
        }
    ])

})

module.exports = router;