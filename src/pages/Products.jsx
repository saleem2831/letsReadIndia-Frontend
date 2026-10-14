

// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import '../styles/products.css'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Toast from '../components/Toast'
// import { getProducts } from '../services/api'
// import { useCart } from '../context/CartContext'

// export default function Products() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [toast, setToast] = useState(null)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     setLoading(true)
//     getProducts().then(res => {
//       setProducts(res)
//       setLoading(false)
//     })
//   }, [])

//   useEffect(() => {
//     if (selectedCategory === 'all') {
//       setFilteredProducts(products)
//     } else {
//       setFilteredProducts(products.filter(p => p.category === selectedCategory))
//     }
//   }, [products, selectedCategory])

//   const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

//   return (
//     <>
//       <Navbar />
//       <div className="products-page">
//         {/* Hero Section */}
//         <section className="products-hero">
//           <div className="products-hero-content">
//             <h1>Our Products</h1>
//             <p>Carefully crafted learning resources to support your child's reading journey</p>
//           </div>
//         </section>

//         {/* Products Content */}
//         <section className="products-content">
//           <div className="products-container">
//             {loading ? (
//               <div className="products-loading">
//                 <div className="products-spinner"></div>
//                 <p>Loading products...</p>
//               </div>
//             ) : (
//               <>
//                 {/* Filter Section */}
//                 <div className="filter-section">
//                   <h3>Filter by Category</h3>
//                   <div className="filter-buttons">
//                     {categories.map(category => (
//                       <button
//                         key={category}
//                         className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
//                         onClick={() => setSelectedCategory(category)}
//                       >
//                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Products Grid */}
//                 <div className="products-wrapper">
//                   {filteredProducts.length > 0 ? (
//                     <div className="products-grid">
//                       {filteredProducts.map(p => (
//                         <div key={p.id} className="product-card">
//                           <div className="product-img-wrapper">
//                             <div className="product-img">
//                               {p.primary_image ? (
//                                 <img
//                                   src={p.primary_image}
//                                   alt={p.name}
//                                   loading="lazy"
//                                   onError={(e) => (e.target.src = '/placeholder.png')}
//                                 />
//                               ) : (
//                                 <div className="no-image">📦</div>
//                               )}
//                             </div>
//                             <div className="product-overlay">
//                               <Link to={`/products/${p.id}`} className="view-details-btn">
//                                 View Details
//                               </Link>
//                             </div>
//                           </div>

//                           <div className="product-info">
//                             <h2>{p.name}</h2>
//                             <p className="product-desc">{p.description}</p>
                            
//                             {/* <div className="product-rating">
//                               <span className="stars">⭐⭐⭐⭐⭐</span>
//                               <span className="rating-text">(24 reviews)</span>
//                             </div> */}

//                             <div className="card-footer">
//                               <div className="price-section">
//                                 <span className="price">₹{p.price}</span>
//                                 <span className="original-price">₹{Math.round(p.price * 1.2)}</span>
//                               </div>
//                               <button 
//                                 className="add-to-cart-btn"
//                                 onClick={() => {
//                                   addToCart(p)
//                                   setToast(`${p.name} added to cart successfully!`)
//                                 }}
//                               >
//                                 Add to Cart
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="no-products">
//                       <p>No products found in this category</p>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="products-cta">
//           <div className="cta-container">
//             <h2>Looking for something specific?</h2>
//             <p>Contact our support team to find the perfect product for your needs</p>
//             <div className="cta-buttons">
//               <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
//               <a href="https://wa.me/917058587080" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Chat on WhatsApp</a>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//       {toast && (
//         <Toast 
//           message={toast} 
//           onClose={() => setToast(null)}
//         />
//       )}
//     </>
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

function getProductImages(product) {
  let images = product.images || []

  if (typeof images === 'string') {
    try {
      images = JSON.parse(images)
    } catch {
      images = [images]
    }
  }

  if (!Array.isArray(images)) {
    images = images ? [images] : []
  }

  const urls = images
    .map(image => {
      if (typeof image === 'string') return image

      return (
        image?.url ||
        image?.image_url ||
        image?.imageUrl ||
        image?.src ||
        ''
      )
    })
    .filter(Boolean)

  const allImages = [
    ...(product.primary_image ? [product.primary_image] : []),
    ...urls,
  ]

  return [...new Set(allImages)]
}

function ProductImageCarousel({ product }) {
  const images = getProductImages(product)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [product.id])

  const previousImage = () => {
    setActiveIndex(index =>
      index === 0 ? images.length - 1 : index - 1
    )
  }

  const nextImage = () => {
    setActiveIndex(index =>
      index === images.length - 1 ? 0 : index + 1
    )
  }

  return (
    <div className="product-img-wrapper">
      <div className="product-img">
        {images.length > 0 ? (
          <img
            src={images[activeIndex]}
            alt={`${product.name} - image ${activeIndex + 1}`}
            loading="lazy"
            onError={event => {
              event.currentTarget.onerror = null
              event.currentTarget.src = '/placeholder.png'
            }}
          />
        ) : (
          <div className="no-image">📦</div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="product-image-arrow product-image-prev"
            onClick={previousImage}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          <button
            type="button"
            className="product-image-arrow product-image-next"
            onClick={nextImage}
            aria-label="Next image"
          >
            &#10095;
          </button>

          <span className="product-image-counter">
            {activeIndex + 1} / {images.length}
          </span>

          <div className="product-image-dots">
            {images.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={`product-image-dot ${
                  activeIndex === index ? 'active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="product-overlay">
        <Link
          to={`/products/${product.id}`}
          className="view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [toast, setToast] = useState(null)

  const { addToCart } = useCart()

  useEffect(() => {
    let mounted = true

    getProducts()
      .then(res => {
        if (mounted) {
          setProducts(Array.isArray(res) ? res : [])
        }
      })
      .catch(error => {
        console.error('Failed to load products:', error)

        if (mounted) setProducts([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const categories = [
    'all',
    ...new Set(products.map(p => p.category).filter(Boolean)),
  ]

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory)

  const formatPrice = price =>
    Number(price || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const formatOriginalPrice = price =>
    Math.round(Number(price || 0) * 1.2).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })

  return (
    <>
      <Navbar />

      <main className="products-page">
        {/* Hero */}
        <section className="products-hero">
          <div className="products-hero-content">
            <h1>Our Products</h1>
            <p>
              Carefully crafted learning resources to support your child's
              reading journey
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="products-content">
          <div className="products-container">
            {loading ? (
              <div className="products-loading">
                <div className="products-spinner" />
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                {/* Category filters */}
                <div className="filter-section">
                  <h3>Filter by Category</h3>

                  <div className="filter-buttons">
                    {categories.map(category => (
                      <button
                        key={category}
                        type="button"
                        className={`filter-btn ${
                          selectedCategory === category ? 'active' : ''
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() +
                          category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product grid */}
                <div className="products-wrapper">
                  {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                      {filteredProducts.map(product => {
                        const price = Number(product.price) || 0

                        return (
                          <article
                            key={product.id}
                            className="product-card"
                          >
                            <ProductImageCarousel product={product} />

                            <div className="product-info">
                              <h2 title={product.name}>
                                {product.name}
                              </h2>

                              <p className="product-desc">
                                {product.description}
                              </p>

                              <div className="card-footer">
                                <div className="price-section">
                                  <span className="price">
                                    {formatPrice(price)}
                                  </span>

                                  <span className="original-price">
                                    {formatOriginalPrice(price)}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  className="add-to-cart-btn"
                                  onClick={() => {
                                    addToCart(product)
                                    setToast(
                                      `${product.name} added to cart successfully!`
                                    )
                                  }}
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </article>
                        )
                      })}
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

        {/* Contact CTA */}
        <section className="products-cta">
          <div className="cta-container">
            <h2>Looking for something specific?</h2>
            <p>
              Contact our support team to find the perfect product for
              your needs
            </p>

            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>

              <a
                href="https://wa.me/917058587080"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

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