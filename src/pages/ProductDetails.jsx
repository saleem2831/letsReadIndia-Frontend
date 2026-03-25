// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import '../styles/productDetails.css'
// import Layout from '../components/Layout'
// import { getProductById } from '../services/api'

// export default function ProductDetails() {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)

//   useEffect(() => {
//     getProductById(id).then(res => setProduct(res))
//   }, [id])

//   if (!product) return <p className="container">Loading...</p>

//   return (
//     <Layout>
//       <div className="details-page container">
//         <div className="details-grid">

//           <div className="details-img">
//             {product.image && <img src={product.image} alt={product.name} />}
//           </div>

//           <div className="details-info">
//             <h1>{product.name}</h1>
//             <p>{product.description}</p>
//             <h2>₹{product.price}</h2>

//             <button>Add to Cart</button>
//           </div>

//         </div>
//       </div>
//     </Layout>
//   )
// }

// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import '../styles/productDetails.css'
// import Layout from '../components/Layout'
// import { getProductById } from '../services/api'
// import { useCart } from '../context/CartContext'

// export default function ProductDetails() {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     getProductById(id).then(res => setProduct(res))
//   }, [id])

//   if (!product) return <p className="container">Loading...</p>

//   return (
//     <Layout>
//       <div className="details-page container">
//         <div className="details-grid">

//           <div className="details-img">
//             {product.image && (
//               <img src={product.image} alt={product.name} />
//             )}
//           </div>

//           <div className="details-info">
//             <h1>{product.name}</h1>
//             <p>{product.description}</p>
//             <h2>₹{product.price}</h2>

//             <button onClick={() => addToCart(product)}>
//               Add to Cart
//             </button>
//           </div>

//         </div>
//       </div>
//     </Layout>
//   )
// }
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productDetails.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [toast, setToast] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    getProductById(id).then(res => setProduct(res))
  }, [id])

  const handleAddToCart = () => {
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setToast(`${quantity} x ${product.name} added to cart successfully!`)
      setQuantity(1)
    }
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pd-loading-container">
          <div className="pd-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pd-page">
        {/* Hero Section */}
        <section className="pd-hero">
          <div className="pd-breadcrumb">
            <span>Home</span>
            <span className="pd-separator">›</span>
            <span>Products</span>
            <span className="pd-separator">›</span>
            <span className="pd-current">{product.name}</span>
          </div>
        </section>

        {/* Product Details Content */}
        <section className="pd-content">
          <div className="pd-container">
            {/* Image Section */}
            <div className="pd-img-section">
              <div className="pd-zoom-container">
                {product.primary_image && (
                  <img
                    className="pd-main-image"
                    src={product.primary_image}
                    alt={product.name}
                  />
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="pd-thumbs">
                  {product.images.map((img, i) => {
                    const isActive = img.image_url === product.primary_image
                    return (
                      <img
                        key={i}
                        src={img.image_url}
                        alt="thumb"
                        className={`pd-thumb-img ${isActive ? 'pd-active-thumb' : ''}`}
                        onClick={() =>
                          setProduct({
                            ...product,
                            primary_image: img.image_url
                          })
                        }
                      />
                    )
                  })}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="pd-info-section">
              <div className="pd-category">
                <span className="pd-category-badge">{product.category || 'Books'}</span>
              </div>

              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating">
                <div className="pd-stars">⭐⭐⭐⭐⭐</div>
                <span className="pd-rating-text">(128 reviews)</span>
              </div>

              <div className="pd-price-section">
                <span className="pd-current-price">₹{product.price}</span>
                <span className="pd-original-price">₹{Math.round(product.price * 1.2)}</span>
                <span className="pd-discount-badge">-{Math.round(((Math.round(product.price * 1.2) - product.price) / Math.round(product.price * 1.2)) * 100)}% OFF</span>
              </div>

              <div className="pd-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="pd-actions">
                <div className="pd-qty-selector">
                  <button 
                    className="pd-qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input 
                    type="text" 
                    className="pd-qty-input" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="pd-qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="pd-add-btn"
                  onClick={handleAddToCart}
                >
                  <span className="pd-btn-icon">🛒</span>
                  <span className="pd-btn-text">Add to Cart</span>
                </button>
              </div>

              <div className="pd-meta">
                <div className="pd-meta-item">
                  <span className="pd-meta-icon">📦</span>
                  <span className="pd-meta-text">Free Shipping</span>
                </div>
                <div className="pd-meta-item">
                  <span className="pd-meta-icon">🔄</span>
                  <span className="pd-meta-text">7-Day Returns</span>
                </div>
                <div className="pd-meta-item">
                  <span className="pd-meta-icon">✅</span>
                  <span className="pd-meta-text">Verified Quality</span>
                </div>
              </div>
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
