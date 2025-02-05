#  To-Do App

A **full-stack** To-Do application built with **Next.js**, **Prisma**, and **PostgreSQL**.

---

##  Getting Started

### **Prerequisites**
Ensure you have the following installed on your machine:
- **[Node.js (Latest LTS)](https://nodejs.org/)**
- **[Docker & Docker Compose](https://www.docker.com/get-started/)**

---

## Installation & Setup

Follow these steps to set up and run the application:

1. **Clone the repository**
   ```sh
   git clone https://github.com/korbendalas/golden_apple
   cd golden_apple
   ```
2. **`env.example` to `.env`**
   ```sh
   cp .env.example .env
   ```


3. **Start the PostgreSQL database (via Docker)**
   ```sh
   docker-compose up -d
   ```

4. **Install dependencies**
   ```sh
   npm install
   ```

5. **Generate Prisma Client**
   ```sh
   npm run prisma:migrate
   ```

6. **Seed the database with demo users and tasks**
   ```sh
   npm run prisma:seed
   ```

7. **Start the development server**
   ```sh
   npm run dev
   ```

---

##  Demo User Accounts

You can log in using the following demo accounts:

| Email               | Password  |
|---------------------|----------|
| `user1@example.com` | password1 |
| `user2@example.com` | password2 |

---

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Next.js API Routes, Server Actions
- **Database:** PostgreSQL (via Docker)
- **ORM:** Prisma

---

## Scripts

| Command                     | Description |
|-----------------------------|------------|
| `docker-compose up -d`      | Starts the PostgreSQL database container |
| `npm install`               | Installs dependencies |
| `npm run prisma:generate`   | Generates the Prisma client |
| `npm run prisma:seed`       | Seeds the database with demo data |
| `npm run dev`               | Starts the Next.js development server |

---

