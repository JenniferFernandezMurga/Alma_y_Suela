# StepWise: Your Personal Shoe Recommender

StepWise is a web application designed to help you find the perfect pair of shoes. By answering a few simple questions about your needs and preferences, our recommendation engine will suggest the best options from our curated database of footwear.

## Key Features

*   **Personalized Recommendations:** Get shoe suggestions tailored to your specific needs, whether for running, hiking, casual wear, or formal events.
*   **Detailed Shoe Profiles:** View comprehensive information for each shoe, including specifications, user reviews, and photos.
*   **Easy-to-Use Interface:** Our intuitive and responsive design makes it easy to find what you're looking for, on any device.

## Tech Stack

*   **Backend:**
    *   Flask
    *   SQLAlchemy
    *   PostgreSQL
*   **Frontend:**
    *   React
    *   Vite
    *   Bootstrap

## Getting Started

### Prerequisites

*   Python 3.8+
*   Node.js 14+
*   PostgreSQL

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stepwise.git
    cd stepwise
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up the database:**
    *   Create a PostgreSQL database.
    *   Copy `.env.example` to `.env` and fill in your database credentials.
    *   Run database migrations:
        ```bash
        flask db upgrade
        ```

5.  **Run the development server:**
    ```bash
    flask run
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment

For production deployment, it is recommended to use a WSGI server like Gunicorn for the Flask backend and to serve the static frontend files through a web server like Nginx.

---

Happy shoe shopping!
