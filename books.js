const BOOKS = [
  {
    id: 1,
    title: "Deep Learning Mastery",
    author: "Dr. Sarah Chen",
    category: "AI",
    price: 0,
    rating: 4.9,
    reviews: 2341,
    format: ["PDF", "EPUB"],
    pages: 520,
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=420&fit=crop",
    description: "Master the fundamentals and advanced techniques of deep learning. From neural networks to transformers, this comprehensive guide takes you from beginner to expert with hands-on projects.",
    badge: "Bestseller",
    featured: true,
    toc: ["Neural Network Fundamentals","Convolutional Networks","Recurrent Networks","Transformers & Attention","GANs & Diffusion Models","Deployment & Production"],
    learn: ["Build neural networks from scratch","Implement CNNs, RNNs, and Transformers","Train models on real datasets","Deploy ML models to production"]
  },
  {
    id: 2,
    title: "Python for Data Science",
    author: "Marcus Webb",
    category: "Programming",
    price: 0,
    rating: 4.8,
    reviews: 1876,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 445,
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=420&fit=crop",
    description: "The definitive guide to Python for data analysis, visualization, and machine learning. Covers pandas, NumPy, matplotlib, scikit-learn, and more.",
    badge: "Popular",
    featured: true,
    toc: ["Python Basics Refresher","NumPy & Pandas","Data Visualization","Statistical Analysis","Machine Learning with sklearn","Real-world Projects"],
    learn: ["Manipulate data with pandas","Visualize insights with matplotlib","Build ML pipelines","Work with real datasets"]
  },
  {
    id: 3,
    title: "The AI Entrepreneur",
    author: "Elena Kovacs",
    category: "Business",
    price: 0,
    rating: 4.7,
    reviews: 1203,
    format: ["PDF", "EPUB"],
    pages: 380,
    cover: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=420&fit=crop",
    description: "How to build profitable AI-powered businesses in 2024 and beyond. Discover proven frameworks for identifying AI opportunities, validating ideas, and scaling to millions.",
    badge: "New",
    featured: true,
    toc: ["AI Business Landscape","Finding Your Niche","Building AI Products","Go-to-Market Strategy","Funding & Scaling","Case Studies"],
    learn: ["Identify AI business opportunities","Build and launch AI products","Create sustainable revenue streams","Scale your AI startup"]
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    author: "Raj Patel",
    category: "Cyber Security",
    price: 0,
    rating: 4.9,
    reviews: 987,
    format: ["PDF", "EPUB"],
    pages: 610,
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=420&fit=crop",
    description: "The complete guide to cybersecurity from ethical hacking to defense strategies. Prepare for CEH, CISSP, and CompTIA Security+ certifications.",
    badge: "Trending",
    featured: false,
    toc: ["Security Fundamentals","Network Security","Web Application Security","Ethical Hacking","Incident Response","Compliance & Governance"],
    learn: ["Perform penetration testing","Secure networks and applications","Respond to security incidents","Prepare for certifications"]
  },
  {
    id: 5,
    title: "Algorithmic Trading Secrets",
    author: "James Thornton",
    category: "Trading",
    price: 0,
    rating: 4.8,
    reviews: 743,
    format: ["PDF", "EPUB"],
    pages: 490,
    cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=420&fit=crop",
    description: "Build automated trading systems that generate consistent returns. Learn quantitative analysis, backtesting, and live trading strategy implementation.",
    badge: "Hot",
    featured: true,
    toc: ["Markets & Microstructure","Strategy Development","Backtesting Frameworks","Risk Management","Live Trading Systems","Portfolio Optimization"],
    learn: ["Code trading algorithms in Python","Backtest strategies rigorously","Manage risk professionally","Deploy live trading bots"]
  },
  {
    id: 6,
    title: "Personal Finance Revolution",
    author: "Amelia Stone",
    category: "Finance",
    price: 0,
    rating: 4.7,
    reviews: 3241,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 320,
    cover: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=420&fit=crop",
    description: "Transform your financial life with proven strategies for budgeting, investing, and building wealth. From debt elimination to financial independence.",
    badge: "Bestseller",
    featured: false,
    toc: ["Money Mindset","Budgeting Systems","Debt Payoff Strategies","Investing Basics","Building Wealth","Financial Independence"],
    learn: ["Create a bulletproof budget","Eliminate debt strategically","Invest for long-term wealth","Achieve financial independence"]
  },
  {
    id: 7,
    title: "Growth Marketing Playbook",
    author: "Sophie Laurent",
    category: "Marketing",
    price: 0,
    rating: 4.6,
    reviews: 1542,
    format: ["PDF", "EPUB"],
    pages: 410,
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=420&fit=crop",
    description: "The modern marketer's complete guide to growth hacking, digital advertising, SEO, content marketing, and building brands that scale to millions.",
    badge: "Popular",
    featured: false,
    toc: ["Growth Fundamentals","SEO & Content","Paid Advertising","Social Media Growth","Email Marketing","Analytics & Optimization"],
    learn: ["Build growth funnels","Master SEO and content","Run profitable ad campaigns","Analyze and optimize results"]
  },
  {
    id: 8,
    title: "Atomic Productivity",
    author: "David Kim",
    category: "Productivity",
    price: 0,
    rating: 4.8,
    reviews: 4521,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 290,
    cover: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=420&fit=crop",
    description: "Build unbreakable habits, eliminate distractions, and achieve 10x productivity using science-backed systems used by top performers worldwide.",
    badge: "Bestseller",
    featured: true,
    toc: ["The Productivity Trap","Habit Architecture","Deep Work Systems","Energy Management","Digital Minimalism","The 90-Day System"],
    learn: ["Build lasting habits","Eliminate distractions","Achieve deep focus","Design your ideal workday"]
  },
  {
    id: 9,
    title: "JavaScript: The Future",
    author: "Alex Morrison",
    category: "Programming",
    price: 0,
    rating: 4.7,
    reviews: 2103,
    format: ["PDF", "EPUB"],
    pages: 580,
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=420&fit=crop",
    description: "Master modern JavaScript from ES6+ to cutting-edge patterns. Covers async/await, modules, TypeScript integration, performance optimization, and the latest web APIs.",
    badge: "Updated",
    featured: false,
    toc: ["Modern JS Fundamentals","Async Programming","Functional Patterns","TypeScript Integration","Performance & Bundle Size","Full-Stack JS"],
    learn: ["Write modern ES2024+ JavaScript","Master async programming","Integrate TypeScript","Optimize for performance"]
  },
  {
    id: 10,
    title: "ChatGPT & LLM Engineering",
    author: "Nina Walsh",
    category: "AI",
    price: 0,
    rating: 4.9,
    reviews: 3876,
    format: ["PDF", "EPUB"],
    pages: 460,
    cover: "https://images.unsplash.com/photo-1675557009483-d43dfb7e0e7c?w=300&h=420&fit=crop",
    description: "The complete guide to building production-ready LLM applications. Master prompt engineering, RAG systems, fine-tuning, and deploying AI into real products.",
    badge: "Hot",
    featured: true,
    toc: ["LLM Fundamentals","Prompt Engineering","RAG Systems","Fine-tuning Models","Building LLM Apps","Production Deployment"],
    learn: ["Engineer expert-level prompts","Build RAG applications","Fine-tune open-source LLMs","Deploy AI to production"]
  },
  {
    id: 11,
    title: "Stock Market Mastery",
    author: "Robert Chen",
    category: "Trading",
    price: 0,
    rating: 4.6,
    reviews: 1234,
    format: ["PDF", "EPUB"],
    pages: 540,
    cover: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=420&fit=crop",
    description: "From zero to profitable trader. Master technical analysis, fundamental analysis, options trading, and build a diversified portfolio that beats the market.",
    badge: null,
    featured: false,
    toc: ["Market Fundamentals","Technical Analysis","Fundamental Analysis","Options Strategies","Portfolio Building","Tax Optimization"],
    learn: ["Read charts like a pro","Analyze company financials","Trade options profitably","Build a winning portfolio"]
  },
  {
    id: 12,
    title: "Zero to One Business",
    author: "Maria Gonzalez",
    category: "Business",
    price: 0,
    rating: 4.8,
    reviews: 2876,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 360,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=420&fit=crop",
    description: "The modern entrepreneur's playbook for starting, building, and scaling a profitable business from scratch in the digital age.",
    badge: "Popular",
    featured: false,
    toc: ["Finding Your Idea","Validating Markets","Building Your MVP","Getting First Customers","Scaling Operations","Exit Strategies"],
    learn: ["Validate business ideas fast","Build minimum viable products","Acquire customers cost-effectively","Scale operations efficiently"]
  },
  {
    id: 13,
    title: "React 19 Complete Guide",
    author: "Thomas Reed",
    category: "Programming",
    price: 0,
    rating: 4.9,
    reviews: 1654,
    format: ["PDF", "EPUB"],
    pages: 620,
    cover: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&h=420&fit=crop",
    description: "Master React 19 with hooks, server components, suspense, and modern patterns. Build production-grade applications with the latest React features.",
    badge: "New",
    featured: false,
    toc: ["React Fundamentals","Hooks Deep Dive","Server Components","State Management","Performance Optimization","Full-Stack React"],
    learn: ["Master React hooks","Build with server components","Optimize React performance","Ship production React apps"]
  },
  {
    id: 14,
    title: "Crypto & Web3 Decoded",
    author: "Lucas Wright",
    category: "Finance",
    price: 0,
    rating: 4.5,
    reviews: 987,
    format: ["PDF", "EPUB"],
    pages: 430,
    cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=420&fit=crop",
    description: "Demystify blockchain, cryptocurrency, DeFi, and Web3. From Bitcoin basics to advanced DeFi strategies and NFT markets — your complete crypto guide.",
    badge: null,
    featured: false,
    toc: ["Blockchain Fundamentals","Bitcoin & Ethereum","DeFi Protocols","NFTs & Digital Assets","Crypto Trading","Tax & Compliance"],
    learn: ["Understand blockchain deeply","Navigate DeFi safely","Trade crypto profitably","Comply with regulations"]
  },
  {
    id: 15,
    title: "Ethical Hacking Bootcamp",
    author: "Priya Sharma",
    category: "Cyber Security",
    price: 0,
    rating: 4.8,
    reviews: 1432,
    format: ["PDF", "EPUB"],
    pages: 680,
    cover: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=300&h=420&fit=crop",
    description: "Become a certified ethical hacker. Master penetration testing, vulnerability assessment, social engineering, and bug bounty hunting.",
    badge: "Trending",
    featured: false,
    toc: ["Hacking Mindset","Reconnaissance","Scanning & Enumeration","Exploitation","Post-Exploitation","Bug Bounty Hunting"],
    learn: ["Conduct penetration tests","Discover vulnerabilities","Exploit and report findings","Earn from bug bounties"]
  },
  {
    id: 16,
    title: "Social Media Empire",
    author: "Chloe Davis",
    category: "Marketing",
    price: 0,
    rating: 4.6,
    reviews: 2109,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 340,
    cover: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=420&fit=crop",
    description: "Build a massive following across Instagram, TikTok, YouTube, and LinkedIn. Monetize your audience and turn social media into a full-time income.",
    badge: "Hot",
    featured: false,
    toc: ["Platform Strategy","Content Creation","Audience Building","Monetization Methods","Brand Partnerships","Scaling Your Influence"],
    learn: ["Grow followers organically","Create viral content","Monetize your audience","Land brand partnerships"]
  },
  {
    id: 17,
    title: "The Mindful High Performer",
    author: "Zen Masters Collective",
    category: "Productivity",
    price: 0,
    rating: 4.7,
    reviews: 3765,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 310,
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=420&fit=crop",
    description: "Combine mindfulness, neuroscience, and peak performance strategies to unlock your potential while maintaining mental clarity and well-being.",
    badge: null,
    featured: false,
    toc: ["The Performance Paradox","Mindfulness Science","Flow State Mastery","Stress & Recovery","The 5AM Framework","Sustainable Excellence"],
    learn: ["Enter flow state on demand","Manage stress effectively","Design recovery rituals","Sustain peak performance"]
  },
  {
    id: 18,
    title: "Cloud Architecture Pro",
    author: "Kevin Zhang",
    category: "Programming",
    price: 0,
    rating: 4.8,
    reviews: 1087,
    format: ["PDF", "EPUB"],
    pages: 560,
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=420&fit=crop",
    description: "Design and build scalable cloud systems on AWS, GCP, and Azure. Master microservices, Kubernetes, serverless, and DevOps practices.",
    badge: "Updated",
    featured: false,
    toc: ["Cloud Fundamentals","AWS Architecture","Microservices Design","Kubernetes at Scale","Serverless Patterns","DevOps & CI/CD"],
    learn: ["Design cloud architectures","Deploy with Kubernetes","Build serverless systems","Implement DevOps pipelines"]
  },
  {
    id: 19,
    title: "AI Image Generation Mastery",
    author: "Aria Nakamura",
    category: "AI",
    price: 0,
    rating: 4.7,
    reviews: 4321,
    format: ["PDF", "EPUB"],
    pages: 380,
    cover: "https://images.unsplash.com/photo-1687360440135-73e7c8ead77f?w=300&h=420&fit=crop",
    description: "Master Midjourney, DALL-E, Stable Diffusion, and Sora. Create stunning AI art, generate commercial images, and build AI creative workflows.",
    badge: "Hot",
    featured: false,
    toc: ["AI Art Fundamentals","Midjourney Mastery","Stable Diffusion","DALL-E & GPT-4V","Commercial Use Cases","Building AI Workflows"],
    learn: ["Master AI image tools","Write expert prompts","Create commercial art","Build AI creative pipelines"]
  },
  {
    id: 20,
    title: "Forex Trading Blueprint",
    author: "Victor Santos",
    category: "Trading",
    price: 0,
    rating: 4.5,
    reviews: 876,
    format: ["PDF", "EPUB"],
    pages: 480,
    cover: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=300&h=420&fit=crop",
    description: "Master forex trading with professional strategies. Learn price action, institutional order flow, risk management, and build a consistent trading edge.",
    badge: null,
    featured: false,
    toc: ["Forex Market Structure","Price Action Trading","Institutional Flow","Risk Management","Trading Psychology","Building Your System"],
    learn: ["Read forex charts expertly","Follow institutional money","Manage trading risk","Develop mental edge"]
  },
  {
    id: 21,
    title: "Startup Fundraising Bible",
    author: "Andrew Mitchell",
    category: "Business",
    price: 0,
    rating: 4.8,
    reviews: 654,
    format: ["PDF", "EPUB"],
    pages: 420,
    cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=420&fit=crop",
    description: "Raise millions from VCs, angels, and institutional investors. Master pitch decks, term sheets, due diligence, and negotiating your best deal.",
    badge: "New",
    featured: false,
    toc: ["Funding Landscape","Investor Psychology","Crafting Your Pitch","The Fundraising Process","Term Sheet Negotiation","Post-Investment Growth"],
    learn: ["Create compelling pitch decks","Find the right investors","Negotiate term sheets","Close funding rounds"]
  },
  {
    id: 22,
    title: "Network Security Mastery",
    author: "Dana Foster",
    category: "Cyber Security",
    price: 0,
    rating: 4.7,
    reviews: 1123,
    format: ["PDF", "EPUB"],
    pages: 510,
    cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=420&fit=crop",
    description: "Defend enterprise networks against sophisticated attacks. Master firewalls, IDS/IPS, zero trust architecture, and incident response.",
    badge: null,
    featured: false,
    toc: ["Network Fundamentals","Firewall Architecture","Intrusion Detection","Zero Trust Design","Threat Hunting","Incident Response"],
    learn: ["Design secure networks","Implement zero trust","Hunt for threats","Respond to incidents"]
  },
  {
    id: 23,
    title: "Email Marketing That Converts",
    author: "Isabella Ross",
    category: "Marketing",
    price: 0,
    rating: 4.6,
    reviews: 1876,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 290,
    cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=420&fit=crop",
    description: "Build a high-converting email list and automated sequences that generate passive income. Master copywriting, segmentation, and advanced automation.",
    badge: "Popular",
    featured: false,
    toc: ["List Building Strategy","Welcome Sequences","Copywriting for Email","Segmentation & Personalization","Automation Workflows","Revenue Optimization"],
    learn: ["Build a responsive email list","Write emails that sell","Automate your campaigns","Optimize for revenue"]
  },
  {
    id: 24,
    title: "The Wealthy Investor",
    author: "Patricia Moore",
    category: "Finance",
    price: 0,
    rating: 4.9,
    reviews: 2543,
    format: ["PDF", "EPUB", "MOBI"],
    pages: 440,
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=420&fit=crop",
    description: "Build generational wealth through diversified investing. Master stocks, real estate, REITs, index funds, and alternative investments for lasting financial freedom.",
    badge: "Bestseller",
    featured: false,
    toc: ["Wealth Building Mindset","Stock Market Investing","Real Estate Strategies","Index Funds & ETFs","Alternative Investments","Estate Planning"],
    learn: ["Invest across asset classes","Build passive income","Protect and grow wealth","Plan your financial legacy"]
  }
];

const CATEGORIES = ["All","AI","Programming","Cyber Security","Trading","Finance","Business","Marketing","Productivity"];

const TESTIMONIALS = [
  {
    name: "Alexandra Torres",
    role: "Data Scientist at Google",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    text: "The Deep Learning Mastery book completely transformed my career. I went from a junior analyst to a senior data scientist in 8 months. The content is incredibly practical and up-to-date."
  },
  {
    name: "James Harrington",
    role: "Indie Founder",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    text: "I've spent thousands on courses and books. PageTurner's collection is hands-down the best value I've found. Built my first SaaS to $10k MRR using the AI Entrepreneur guide."
  },
  {
    name: "Priya Mehta",
    role: "Cybersecurity Engineer",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "Passed my CISSP on the first attempt after studying the Cybersecurity Fundamentals book. The practice scenarios are exceptional. Worth every penny."
  },
  {
    name: "Marcus Johnson",
    role: "Day Trader",
    avatar: "https://i.pravatar.cc/80?img=4",
    rating: 5,
    text: "Algorithmic Trading Secrets paid for itself within a week. My trading returns are up 47% since implementing the strategies. Unbelievable quality for the price."
  },
  {
    name: "Sophie Andersson",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/80?img=9",
    rating: 5,
    text: "The Growth Marketing Playbook is our team's bible now. We've tripled our organic traffic and cut our CAC in half in just 4 months."
  },
  {
    name: "Chen Wei",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    text: "React 19 and Cloud Architecture books are the most current and comprehensive I've found anywhere. Instant download, beautiful formatting, and constantly updated."
  }
];

function getBookById(id) {
  return BOOKS.find(b => b.id === parseInt(id));
}

function getFeaturedBooks() {
  return BOOKS.filter(b => b.featured);
}

function getBooksByCategory(cat) {
  if (cat === "All") return BOOKS;
  return BOOKS.filter(b => b.category === cat);
}

function searchBooks(query) {
  const q = query.toLowerCase();
  return BOOKS.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q) ||
    b.description.toLowerCase().includes(q)
  );
}

function getRelatedBooks(book, limit = 4) {
  return BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, limit);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="star full">★</i>';
  if (half) html += '<i class="star half">★</i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="star empty">★</i>';
  return html;
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}

function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

function toggleWishlist(id) {
  let wl = getWishlist();
  const idx = wl.indexOf(id);
  if (idx > -1) wl.splice(idx, 1);
  else wl.push(id);
  localStorage.setItem('wishlist', JSON.stringify(wl));
  return idx === -1;
}

function isWishlisted(id) {
  return getWishlist().includes(id);
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function addToCart(id) {
  let cart = getCart();
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}
