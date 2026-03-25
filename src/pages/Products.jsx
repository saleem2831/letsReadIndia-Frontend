// import './Products.css'

// export default function Products() {
//   return (
//     <div className="products-page">
//       <h1>Our Products</h1>

//       <div className="products-grid">
//         {[1,2,3,4].map(i => (
//           <div className="product-card" key={i}>
//             <div className="product-img"></div>

//             <h2>Learning Kit {i}</h2>
//             <p>Fun and engaging educational kit.</p>

//             <div className="card-footer">
//               <span>₹499</span>
//               <button>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import '../styles/products.css'
// import Layout from '../components/Layout'
// import { getProducts } from '../services/api'

// export default function Products() {
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     getProducts().then(res => setProducts(res))
//   }, [])

//   return (
//     <Layout>
//       <div className="products-page container">
//         <h1>Our Products</h1>

//         <div className="products-grid">
//           {products.map(p => (
//             <div key={p.id} className="product-card">
//               <div className="product-img">
//                 {p.image && <img src={p.image} alt={p.name} />}
//               </div>

//               <h2>{p.name}</h2>
//               <p>{p.description}</p>

//               <div className="card-footer">
//                 <span>₹{p.price}</span>
//                 <Link to={`/products/${p.id}`}>
//                   <button>View</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   )
// }

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/products.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { getProducts } from '../services/api'
import { useCart } from '../context/CartContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    getProducts().then(res => {
      setProducts(res)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory))
    }
  }, [products, selectedCategory])

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  return (
    <>
      <Navbar />
      <div className="products-page">
        {/* Hero Section */}
        <section className="products-hero">
          <div className="products-hero-content">
            <h1>Our Products</h1>
            <p>Carefully crafted learning resources to support your child's reading journey</p>
          </div>
        </section>

        {/* Products Content */}
        <section className="products-content">
          <div className="products-container">
            {loading ? (
              <div className="products-loading">
                <div className="products-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                {/* Filter Section */}
                <div className="filter-section">
                  <h3>Filter by Category</h3>
                  <div className="filter-buttons">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="products-wrapper">
                  {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                      {filteredProducts.map(p => (
                        <div key={p.id} className="product-card">
                          <div className="product-img-wrapper">
                            <div className="product-img">
                              {p.primary_image ? (
                                <img
                                  src={p.primary_image}
                                  alt={p.name}
                                  loading="lazy"
                                  onError={(e) => (e.target.src = '/placeholder.png')}
                                />
                              ) : (
                                <div className="no-image">📦</div>
                              )}
                            </div>
                            <div className="product-overlay">
                              <Link to={`/products/${p.id}`} className="view-details-btn">
                                View Details
                              </Link>
                            </div>
                          </div>

                          <div className="product-info">
                            <h2>{p.name}</h2>
                            <p className="product-desc">{p.description}</p>
                            
                            <div className="product-rating">
                              <span className="stars">⭐⭐⭐⭐⭐</span>
                              <span className="rating-text">(24 reviews)</span>
                            </div>

                            <div className="card-footer">
                              <div className="price-section">
                                <span className="price">₹{p.price}</span>
                                <span className="original-price">₹{Math.round(p.price * 1.2)}</span>
                              </div>
                              <button 
                                className="add-to-cart-btn"
                                onClick={() => {
                                  addToCart(p)
                                  setToast(`${p.name} added to cart successfully!`)
                                }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-products">
                      <p>No products found in this category</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="products-cta">
          <div className="cta-container">
            <h2>Looking for something specific?</h2>
            <p>Contact our support team to find the perfect product for your needs</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <a href="https://wa.me/917058587080" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      {toast && (
        <Toast 
          message={toast} 
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
