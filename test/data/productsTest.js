import {products, Product, Clothing, Appliance, loadProducts} from "../../data/products.js";

describe("test suite: products", () => {
  beforeAll((done) => {
    loadProducts(() => {
      done();
    })
  })
  it ("testing if products class is correct", () => {
    expect(products.at(0)).toEqual(new Product({id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]}))
  });

  it("testing if products Class contains correct extraInfoHTML", () => {
    expect(products.at(0).extraInfoHTML()).toEqual('');
  })
});

describe ("test suite: Clothing classs", () => {
  it("determine if innerHTML is correct", () => {
    products.forEach((productDetails) => {
      if (productDetails instanceof Clothing) {
        expect(productDetails.extraInfoHTML()).toContain("images/clothing-size-chart.png");
      }
    })
  });
})

describe ("test suite: Appliance classs", () => {
  it("determine if innerHTML is correct", () => {
    products.forEach((productDetails) => {
      if (productDetails instanceof Appliance) {
        expect(productDetails.extraInfoHTML()).toContain("images/appliance-warranty.png");
        expect(productDetails.extraInfoHTML()).toContain("images/appliance-instruction");
      }
    })
  });
})
