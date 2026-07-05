# 🏨 InnSight 

**Description :**
> A modern hotel booking frontend built with React and Tailwind CSS v4. Features advanced search, dynamic price/rating filters, pagination, and a persistent dark mode.

---

## ✨ Features

* **Dynamic Hotel Grid:** Displays available hotels with images, pricing, ratings, and location.
* **Detailed Property Pages:** Dynamic routing to view dedicated details and descriptions for individual hotels.
* **Advanced Search & Filtering:**
  * Global text search by hotel name or location.
  * Dropdown filtering for specific cities.
  * Exact match and range limits for both **Price** and **Star Ratings**.
* **Sorting:** Order results dynamically by Price (Low/High) or Rating.
* **Smart Pagination:** Navigate through large datasets with a numbered pagination strip and previous/next controls.
* **Dark Mode:** A persistent Light/Dark mode toggle that saves user preferences to local storage.
* **Fully Responsive:** Mobile-first design that scales perfectly to tablets and desktops.

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) (Bootstrapped with [Vite](https://vitejs.dev/))
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **API Communication:** Native `fetch` API

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/YOUR-USERNAME/innsight.git](https://github.com/YOUR-USERNAME/innsight.git)

```

2. Navigate into the directory:
```bash
cd innsight

```


3. Install the dependencies:
```bash
npm install

```


4. Start the development server:
```bash
npm run dev

```


5. Open your browser and visit `http://localhost:5173`

## 📡 API Integration

This frontend is designed to consume a standard RESTful API (e.g., built with Django REST Framework). It handles the following query parameters:

* `?search=` (Text search)
* `?location=` (Exact location match)
* `?order_by=` (Sorting by price/rating)
* `?price=`, `?min_price=`, `?max_price=` (Price filtering)
* `?rating=`, `?min_rating=`, `?max_rating=` (Rating filtering)
* `?limit=`, `?skip=` (Pagination)
