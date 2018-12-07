var faker = require("faker")

for (let i = 0; i < 10; i++) {
    let str = `${faker.commerce.productName()} - $${faker.commerce.price()}`
    console.log(str)
}

for (let i = 0; i < 10; i++) {
    console.log(faker.fake(`{{commerce.productName}} - {{commerce.price}}`))
}

