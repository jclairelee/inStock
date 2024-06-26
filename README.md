# Instock Inventory Management Web App
   
This collaborative project was undertaken at BrainStation by Team Fernie, comprising four developers: Cindy, Daisy, Muskan, and Claire. Over the course of one week, we efficiently managed tasks using the JIRA agile development workflow. Daily stand-ups and meetings were conducted via Slack to ensure consistent progress and effective communication.

[Instock Demo Live](https://instock-fernie.netlify.app) | [Instock Demo Video](https://www.youtube.com/watch?v=mkDwSbr5Rcg) 

[Frontend](https://github.com/jclairelee/inStock) | [Backend](https://github.com/jclairelee/inStock-server)

![Inventory List](./src/assets/screenshot/2.png)
![Warehouse List](./src/assets/screenshot/4.png)
![Add New Inventory](./src/assets/screenshot/1.png)
![Edit Warehouse](./src/assets/screenshot/6.png)
![Delete Warehouse](./src/assets/screenshot/5.png)

### What we learned: 

Throughout this project, we recognized the critical importance of enhancing our communication skills to boost overall efficiency. Dealing with merge conflicts in our shared repository proved to be a valuable learning experience. These challenges prompted us to adopt a more cautious and proactive approach in subsequent tasks to avoid pitfalls. Our checklist before merging or pushing code now includes a fundamental question: "Which branch and order am I currently working on?" We have also cultivated a habit of meticulously reviewing each commit and maintaining open communication within the team at all times.

## Tech Stack

### Frontend:

- React
- SASS
- DOM manipulation
  

### Backend:

- Node.js
- Express.js
- Knex.js
- mySQL database

## Installation

### backend Setup

1. Install server dependencies:

   Run `npm install` from inside the directory:

   ```bash
   $ npm install
   ```

2. Create a new MySQL Database called 'instock'.

3. Set environment variables:

   Create a `.env` file as:

   ```shell
   DB_LOCAL_DBNAME = <your_db_username>
   DB_LOCAL_USER = <your_db_password>
   DB_LOCAL_PASSWORD = <your_db_password>
   ```

4. Seed your data

   ```bash
   $ npm run migrate
   ```

5. Run seeds
   ```bash
   $ npm run seed
   ```
6. Start the server:
   ```bash
   $ npm start
   ```

### frontend Setup

7. Install client dependencies:

   Run `npm install` from inside the directory.

   ```bash
      $ npm install
   ```

8. Start the React app:
   ```bash
   $ npm start
   ```
