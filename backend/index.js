// Package Imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');


// Create a new Express application
const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phd_sms_app',
    port: 3307,
    password: '123456',
    database: 'phd_sms'
});


/*
mysql> desc admins;
+----------+--------------------------------------------------------------+------+-----+---------+----------------+
| Field    | Type                                                         | Null | Key | Default | Extra          |
+----------+--------------------------------------------------------------+------+-----+---------+----------------+
| admin_id | int                                                          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255)                                                 | NO   |     | NULL    |                |
| email    | varchar(255)                                                 | NO   | UNI | NULL    |                |
| password | varchar(255)                                                 | YES  |     | NULL    |                |
| role     | enum('Super_Admin','Admin')                                  | NO   |     | NULL    |                |
| access   | enum('All','Registration','Extension','Accounts','Vivavoce') | NO   |     | NULL    |                |
+----------+--------------------------------------------------------------+------+-----+---------+----------------+
6 rows in set (0.01 sec)

mysql> desc guides;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| guide_id | int          | NO   | PRI | NULL    |       |
| name     | varchar(255) | NO   |     | NULL    |       |
| email    | varchar(255) | NO   | UNI | NULL    |       |
| phone    | varchar(15)  | YES  |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
4 rows in set (0.00 sec)

mysql> desc students;
+----------------+--------------+------+-----+---------+-------+
| Field          | Type         | Null | Key | Default | Extra |
+----------------+--------------+------+-----+---------+-------+
| admn_no        | int          | NO   | PRI | NULL    |       |
| name           | varchar(255) | NO   |     | NULL    |       |
| mode           | varchar(50)  | YES  |     | NULL    |       |
| year           | int          | NO   |     | NULL    |       |
| branch         | varchar(50)  | YES  |     | NULL    |       |
| guide_id       | int          | YES  | MUL | NULL    |       |
| co_guide_id    | int          | YES  | MUL | NULL    |       |
| phone          | varchar(15)  | YES  |     | NULL    |       |
| email          | varchar(255) | NO   | UNI | NULL    |       |
| address        | text         | YES  |     | NULL    |       |
| gender         | varchar(10)  | YES  |     | NULL    |       |
| category       | varchar(50)  | YES  |     | NULL    |       |
| type           | varchar(50)  | YES  |     | NULL    |       |
| qualification  | varchar(255) | YES  |     | NULL    |       |
| research_topic | text         | YES  |     | NULL    |       |
+----------------+--------------+------+-----+---------+-------+
15 rows in set (0.01 sec)

mysql> desc subjects;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| subject_id | int          | NO   | PRI | NULL    | auto_increment |
| name       | varchar(255) | NO   |     | NULL    |                |
| credits    | int          | YES  |     | NULL    |                |
| mode       | varchar(255) | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

*/

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Database connected...');
});


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || 'Bearer ' + '';
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, 'phd-sms-secret-key123', { expiresIn: '1d' });
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const query = `SELECT * FROM admins WHERE email = '${email}' AND password = '${password}'`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                const admin = result[0];
                const payload = { ...admin };
                // console.log(payload);
                const token = jwt.sign(payload, 'phd-sms-secret-key123');
                return res.status(200).json({ token, admin });
            }
            return res.status(401).json({ message: 'Invalid username or password' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while logging in' });
    }
});

app.get('/students', verifyToken, (req, res) => {
    try {
        const page = req.params.page || 1;
        const limit = Math.min(req.params.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const countQuery = 'SELECT COUNT(*) as totalCount FROM students';
        db.query(countQuery, (countErr, countResults) => {
            if (countErr) {
                console.log(countErr);
                res.status(500).json({ error: 'Unable to get data...' });
                return;
            }
            const totalCount = countResults[0].totalCount;
            const query = `SELECT * FROM students LIMIT ${limit} OFFSET ${offset}`;
            db.query(query, (err, results) => {
                res.status(200).json({ totalCount, students: results });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching students' });
    }
});

app.post('/students/add', verifyToken, function (req, res) {
    try {
        const { admn_no, name, mode, year, branch, guide_id, co_guide_id, phone, email, address, gender, category, type, qualification, research_topic } = req.body;

        if (!admn_no || !name || !mode || !year || !branch || !guide_id || !co_guide_id || !phone || !email || !address || !gender || !category || !type || !qualification || !research_topic) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const query = `INSERT INTO Students (admn_no, name, mode, year, branch, guide_id, co_guide_id, phone, email, address, gender, category, type, qualification, research_topic)
        VALUES (${admn_no}, '${name}', '${mode}', ${year}, '${branch}', ${guide_id}, ${co_guide_id}, '${phone}', '${email}', '${address}', '${gender}', '${category}', '${type}', "${qualification}", '${research_topic}');`;
        // console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while adding the student' });
            }
            // console.log(result);
            res.status(200).json({ message: 'Student added successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding student' });
    }
});

app.get('/guides', verifyToken, async (req, res) => {
    try {
        const query = `SELECT * FROM guides`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json({ guides: result });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching guides' });
    }
});

app.post('/guides/add', verifyToken, async function (req, res) {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const query = `INSERT INTO Guides (name, email, phone) VALUES ('${name}', '${email}', '${phone}');`;
        // console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while adding the guide' });
            }
            // console.log(result);
            res.status(200).json({ message: 'Guide added successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding guide' });
    }
});

app.get('/admins', verifyToken, (req, res) => {
    try {
        const query = `SELECT * FROM admins`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json({ admins: result });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching admins' });
    }
});


app.listen(port, () => console.log(`PhD SMS app listening on port ${port}!`))