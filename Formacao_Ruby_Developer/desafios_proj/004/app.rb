require_relative "./product"
require_relative "./market"

product = Product.new
product.name = 'Ruby'
product.price = 24.34

Market.new(product.name, product.price).buy
