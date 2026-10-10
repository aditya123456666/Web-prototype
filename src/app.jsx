import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

/* =========================================================
   DATA PRODUK
========================================================= */

const products = [
  {
    id: 1,
    name: "Wireless Headphone",
    price: 499000,
    category: "Elektronik",
    rating: 4.8,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description:
      "Headphone wireless dengan suara jernih, bass yang kuat, dan desain nyaman digunakan sehari-hari.",
    stock: 20,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 799000,
    category: "Elektronik",
    rating: 4.7,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description:
      "Smartwatch modern dengan fitur monitoring aktivitas, notifikasi, dan desain elegan.",
    stock: 15,
  },
  {
    id: 3,
    name: "Classic Backpack",
    price: 329000,
    category: "Fashion",
    rating: 4.6,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description:
      "Tas ransel klasik yang cocok digunakan untuk kuliah, kerja, maupun aktivitas sehari-hari.",
    stock: 30,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 649000,
    category: "Fashion",
    rating: 4.9,
    reviews: 215,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Sepatu running ringan dengan sol nyaman dan cocok untuk olahraga maupun penggunaan harian.",
    stock: 25,
  },
  {
    id: 5,
    name: "Minimalist Chair",
    price: 899000,
    category: "Furniture",
    rating: 4.5,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    description:
      "Kursi minimalis dengan desain modern dan ergonomis untuk ruang kerja atau ruang belajar.",
    stock: 10,
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: 579000,
    category: "Rumah",
    rating: 4.7,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    description:
      "Coffee maker praktis untuk membuat kopi berkualitas di rumah dengan pengoperasian sederhana.",
    stock: 18,
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 729000,
    category: "Elektronik",
    rating: 4.8,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description:
      "Keyboard mechanical dengan feel mengetik nyaman dan desain compact yang stylish.",
    stock: 22,
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 249000,
    category: "Rumah",
    rating: 4.4,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description:
      "Lampu meja minimalis dengan pencahayaan nyaman untuk belajar dan bekerja.",
    stock: 35,
  },
];

/* =========================================================
   HELPER
========================================================= */

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

/* =========================================================
   ICONS
   Dibuat sendiri agar tidak perlu library tambahan.
========================================================= */

function SearchIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

function HomeIcon({ size = 19 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M9 21v-7h6v7" />
    </svg>
  );
}

function CreditCardIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function MenuIcon({ size = 23 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowLeftIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-base font-bold text-slate-900 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold">{product.rating}</span>
          <span className="text-slate-400">({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-lg font-extrabold text-indigo-600">
            {formatRupiah(product.price)}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN LAYOUT
========================================================= */

function MainLayout({
  children,
  cart,
  search,
  setSearch,
  categories,
  category,
  setCategory,
}) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-black text-white">
              E
            </div>

            <div className="hidden sm:block">
              <div className="text-lg font-black leading-none text-slate-900">
                E-Commerce
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Simple Shopping
              </div>
            </div>
          </Link>

          {/* SEARCH */}
          <div className="relative mx-auto hidden w-full max-w-xl md:block">
            <SearchIcon
              size={19}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="absolute left-0 top-0 h-11 w-11 rounded-xl border border-slate-200 bg-slate-100 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <HomeIcon size={18} />
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <ShoppingCartIcon size={18} />
              Cart

              {totalCartItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalCartItems}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <CreditCardIcon size={18} />
              Checkout
            </NavLink>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="ml-auto rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileMenu ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="px-4 pb-4 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-3 text-slate-400">
              <SearchIcon size={18} />
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (
          <div className="border-t border-slate-200 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                🏠 Dashboard
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                🛒 Cart ({totalCartItems})
              </Link>

              <Link
                to="/checkout"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                💳 Checkout
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto min-h-[calc(100vh-160px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <div>
            © 2026 E-Commerce App. Semua hak dilindungi.
          </div>

          <div>
            React + React Router + TailwindCSS
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  products,
  search,
  category,
  setCategory,
  categories,
  onAddToCart,
}) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Semua" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <div>
      {/* HERO */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-14">
        <div className="max-w-2xl">
          <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider">
            Simple E-Commerce
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
            Temukan Produk Favoritmu
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
            Belanja produk pilihan dengan tampilan sederhana, cepat, dan
            nyaman. Pilih produk, masukkan ke keranjang, lalu checkout.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              Lihat Produk
            </a>

            <Link
              to="/cart"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Buka Keranjang
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="products" className="mt-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Product Collection
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Semua Produk
            </h2>
          </div>

          {/* CATEGORY */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT */}
        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <div className="text-5xl">🔍</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Produk tidak ditemukan
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Coba gunakan kata kunci pencarian yang lain.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   PRODUCT DETAIL
========================================================= */

function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
        <div className="text-6xl">😕</div>
        <h1 className="mt-4 text-2xl font-black">Produk tidak ditemukan</h1>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  function handleAdd() {
    onAddToCart(product, quantity);
  }

  return (
    <div>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeftIcon size={18} />
        Kembali
      </button>

      {/* DETAIL */}
      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        {/* IMAGE */}
        <div className="aspect-square bg-slate-100 lg:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col p-6 sm:p-10">
          <span className="w-fit rounded-full bg-indi
