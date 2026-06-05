# How to Add New Books to PageTurner

This guide explains how to add new books to your PageTurner website.

## Step 1: Add Book Data to `books.js`

Open the `books.js` file and add a new book object to the `BOOKS` array.

### Book Object Structure:

```javascript
{
  id: 25,                                    // Unique ID (increment for each new book)
  title: "Your Book Title",                  // Book title
  author: "Author Name",                     // Author name
  category: "AI",                            // Category (AI, Programming, Business, Finance, Trading, Marketing, Productivity, Cyber Security)
  price: 0,                                  // Always 0 (books are free)
  rating: 4.8,                               // Rating from 0 to 5
  reviews: 1234,                             // Number of reviews/readers
  format: ["PDF", "EPUB"],                   // Available formats
  pages: 450,                                // Number of pages
  cover: "https://image-url.jpg",            // Book cover image URL
  description: "Brief description of the book...",
  badge: "New",                              // Optional: "Bestseller", "Popular", "Hot", "Trending", "New", "Updated", or null
  featured: true,                            // true = show on home page, false = only in books list
  toc: ["Chapter 1", "Chapter 2", ...],     // Table of contents
  learn: ["Skill 1", "Skill 2", ...]        // What readers will learn
}
```

### Example:

```javascript
{
  id: 25,
  title: "Advanced Machine Learning",
  author: "Dr. Jane Smith",
  category: "AI",
  price: 0,
  rating: 4.9,
  reviews: 567,
  format: ["PDF", "EPUB"],
  pages: 520,
  cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=420&fit=crop",
  description: "Master advanced ML techniques including deep learning, computer vision, and NLP. Perfect for professionals looking to level up.",
  badge: "New",
  featured: true,
  toc: [
    "Fundamentals of Neural Networks",
    "Convolutional Networks",
    "Recurrent Networks",
    "Transformers",
    "Production Deployment"
  ],
  learn: [
    "Build and train neural networks",
    "Implement computer vision models",
    "Deploy ML models to production",
    "Optimize for performance"
  ]
}
```

## Step 2: Add Book Cover Image

1. Host your book cover image on an image service:
   - **Free options**: Unsplash, Pexels, Pixabay, imgbb.com, imgur.com
   - **Custom images**: Upload to Cloudinary, AWS S3, or similar

2. Copy the image URL and use it in the `cover` field in books.js

3. Recommended image size: **300x420 pixels** (width x height)

## Step 3: Provide Download/Read Options

### For Read Online Feature:
Create an online reader (e.g., using pdfjs or Issuu) that displays your book content directly on the website.

### For Download Feature:
1. Host your book files (PDF, EPUB, MOBI) on a server or CDN
2. When user clicks "Download", provide links to these files
3. Currently, the download feature shows a demo alert - you can update `handleDownload()` in `main.js` to link actual files:

```javascript
function handleDownload(id) {
  const book = BOOKS.find(b => b.id === id);
  if (book) {
    showToast(`⬇ Downloading ${book.title}...`);
    // Replace with actual download link
    window.location.href = `https://your-server.com/downloads/book-${id}.pdf`;
  }
}
```

## Step 4: Available Categories

When adding a book, use one of these category names:
- `AI` - Artificial Intelligence & Machine Learning
- `Programming` - Software Development & Coding
- `Business` - Entrepreneurship & Business
- `Finance` - Personal Finance & Investing
- `Trading` - Stock/Crypto/Forex Trading
- `Marketing` - Digital Marketing & Growth
- `Productivity` - Productivity & Personal Development
- `Cyber Security` - Cybersecurity & Hacking

## Step 5: Badge Options

Choose one badge for your book (or use `null` for no badge):
- `"Bestseller"` - Best selling books
- `"Popular"` - Highly rated books
- `"Hot"` - Trending now
- `"Trending"` - Rising in popularity
- `"New"` - Recently added
- `"Updated"` - Recently updated
- `null` - No badge

## Complete Example - Full Book Entry

```javascript
{
  id: 26,
  title: "Web Development Masterclass",
  author: "Alex Johnson",
  category: "Programming",
  price: 0,
  rating: 4.7,
  reviews: 892,
  format: ["PDF", "EPUB", "MOBI"],
  pages: 580,
  cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=420&fit=crop",
  description: "Complete guide to modern web development. Learn HTML5, CSS3, JavaScript, React, Node.js, and databases. Build production-ready web applications from scratch.",
  badge: "Popular",
  featured: true,
  toc: [
    "HTML5 Fundamentals",
    "CSS3 & Responsive Design",
    "JavaScript ES6+",
    "React & Frontend Frameworks",
    "Node.js & Backend",
    "Databases & SQL",
    "Deployment & DevOps"
  ],
  learn: [
    "Build responsive websites",
    "Master modern JavaScript",
    "Create React applications",
    "Build backend APIs",
    "Work with databases",
    "Deploy applications"
  ]
}
```

## Best Practices

✅ **Do:**
- Use unique IDs for each book (increment from the last ID)
- Keep descriptions concise but descriptive (100-200 characters)
- Use realistic ratings (0-5 with decimals like 4.8)
- Add 5-8 items in both `toc` and `learn` arrays
- Use high-quality cover images (at least 300x420px)
- Choose appropriate categories and badges
- Set `featured: true` for important/new books

❌ **Don't:**
- Use duplicate IDs
- Leave fields empty (use empty arrays [] if needed)
- Set price to anything other than 0 (books are free)
- Use irrelevant categories
- Upload very large images (optimize first)

## Testing Your New Book

1. Save your changes to `books.js`
2. Refresh your website in the browser
3. Go to the **Books** page to see your new book in the grid
4. If `featured: true`, it will also appear on the home page
5. Click on the book to view details
6. Test the "Read Online" and "Download" buttons

## File Locations

- **Add books**: `/books.js` - Add to the `BOOKS` array
- **Modify styling**: `/style.css`
- **Edit home page**: `/index.html`
- **View read/download logic**: `/main.js` - Look for `handleReadOnline()` and `handleDownload()` functions

## Example: Quick Adding Multiple Books

To add multiple books at once, paste this template and modify each entry:

```javascript
// Book Template - Copy and modify for each new book
{
  id: XX,
  title: "Book Title Here",
  author: "Author Name",
  category: "Category",
  price: 0,
  rating: 4.5,
  reviews: 500,
  format: ["PDF", "EPUB"],
  pages: 400,
  cover: "https://image-url-here.jpg",
  description: "Book description here.",
  badge: null,
  featured: false,
  toc: ["Chapter 1", "Chapter 2", "Chapter 3"],
  learn: ["Learn point 1", "Learn point 2", "Learn point 3"]
}
```

## Need Help?

- **Upload images**: Visit https://imgur.com or https://imgbb.com
- **Find book covers**: Unsplash.com or Pexels.com
- **Format validation**: Check browser console (F12) for errors
- **Book data**: Make sure all required fields are filled

## Next Steps

1. ✅ Add book data to `books.js`
2. ✅ Get cover image URL
3. ✅ Test on your website
4. ✅ Customize read online & download features
5. ✅ Promote your new books!

Happy adding! 📚
