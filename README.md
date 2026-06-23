# Allivin Laboratories Website

Premium pharmaceutical manufacturing website with a React frontend, Express backend, MongoDB schemas, JWT admin authentication, product/gallery/content APIs, dark mode, filtering, search, and a modern admin dashboard.

## Tech Stack

- Frontend: React, React Router, Axios, Tailwind CSS, Framer Motion, Lucide React
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Bcrypt
- Authentication: JWT protected admin routes

## Folder Structure

```text
allivin-laboratories/
  client/
    src/
      components/
      context/
      data/
      pages/
      services/
      App.jsx
      main.jsx
      index.css
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      server.js
```

## Setup

1. Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

2. Configure backend environment:

```bash
cd server
copy .env.example .env
```

Update `MONGODB_URI`, `JWT_SECRET`, and admin seed credentials if needed.

3. Seed admin and starter content:

```bash
cd server
npm run seed
```

Default admin:

- Email: `admin@allivinlabs.com`
- Password: `Admin@12345`

4. Run both apps:

```bash
cd server
npm run dev
```

In a second terminal:

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5000`.

## Production Notes

- Replace demo image URLs with owned manufacturing, product, certification, and facility images.
- Set a strong `JWT_SECRET`.
- Use HTTPS, secure cookies or hardened token storage, rate limiting, and production CORS origins.
- Store uploads in cloud storage such as S3/Cloudinary for production.
