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

mysql> desc account_details;
+-------------+---------------+------+-----+---------+-------+
| Field       | Type          | Null | Key | Default | Extra |
+-------------+---------------+------+-----+---------+-------+
| StudentID   | varchar(20)   | YES  | MUL | NULL    |       |
| DDNumber    | varchar(20)   | YES  |     | NULL    |       |
| AmountPaid  | decimal(10,2) | YES  |     | NULL    |       |
| DatePaid    | date          | YES  |     | NULL    |       |
| PaymentType | varchar(20)   | YES  |     | NULL    |       |
+-------------+---------------+------+-----+---------+-------+

mysql> desc guide_changes;
+----------------+-------------+------+-----+---------+----------------+
| Field          | Type        | Null | Key | Default | Extra          |
+----------------+-------------+------+-----+---------+----------------+
| id             | int         | NO   | PRI | NULL    | auto_increment |
| student_id     | varchar(50) | NO   | MUL | NULL    |                |
| old_guide_id   | int         | NO   | MUL | NULL    |                |
| new_guide_id   | int         | NO   | MUL | NULL    |                |
| date_of_change | date        | NO   |     | NULL    |                |
+----------------+-------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

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
            // const query = `SELECT * FROM students LIMIT ${limit} OFFSET ${offset}`;
            // Get Students data, and respective name from the guide_id and co_guide_id fields from guides table
            const query = `SELECT s.*, g1.name as guide_name, g2.name as co_guide_name FROM students s LEFT JOIN guides g1 ON s.guide_id = g1.guide_id LEFT JOIN guides g2 ON s.co_guide_id = g2.guide_id LIMIT ${limit} OFFSET ${offset}`;
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
        const { admn_no, name, mode, year, branch, guide_id, phone, address, gender, category, research_topic, qualification, doa, fatherORhusband, email } = req.body;
        let { status, co_guide_id } = req.body;
        // console.log(req.body);
        if (!admn_no || !name || !mode || !year || !branch || !guide_id || !phone || !address || !gender || !category || !research_topic || !qualification || !doa || !fatherORhusband) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        status = status || null;
        co_guide_id = co_guide_id || 0;

        const query = `INSERT INTO Students (admn_no, name, mode, year, branch, guide_id, co_guide_id, phone, email, address, gender, category, research_topic, qualification, doa, fatherORhusband, status) VALUES (${admn_no}, '${name}', '${mode}', ${year}, '${branch}', ${guide_id}, ${co_guide_id}, '${phone}', '${email || ''}, '${address}', '${gender}', ${category}', '${research_topic}', '${qualification}', '${doa}', '${fatherORhusband}', '${status}');`;
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

app.get('/students/:id', (req, res) => {
    try {
        const id = req.params.id;
        // const query = `SELECT * FROM students WHERE admn_no = ${id}`;
        // const query = `SELECT * FROM students WHERE admn_no = '${id}'`; 
        // Get data from table if only the id is present in table, also retrieve guide and co_guide names from guide_id and co_guide_id from guides table
        const query = `SELECT s.*, g1.name as guide_name, g2.name as co_guide_name FROM students s LEFT JOIN guides g1 ON s.guide_id = g1.guide_id LEFT JOIN guides g2 ON s.co_guide_id = g2.guide_id WHERE s.admn_no = '${id}'`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json({ student: result });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching student' });
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
        const { name, designation, college, phone, email } = req.body;

        if (!name || !designation || !college) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        // Get count of guides
        const countQuery = `SELECT COUNT(*) as count FROM guides`;
        db.query(countQuery, (err, countResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error occurred while adding guide' });
            }
            const guide_id = countResult[0].count;
            const query = `INSERT INTO Guides (guide_id, name, designation, college, phone, email) VALUES ( ${guide_id}, '${name}', '${designation}', '${college}', '${phone || ''}', '${email || ''}');`;
            // console.log(query);
            db.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: 'Error occured while adding the guide' });
                }
                // console.log(result);
                res.status(200).json({ message: 'Guide added successfully' });
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding guide' });
    }
});

app.put('/guides/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, designation, college, phone, email } = req.body;

        if (!name || !designation || !college) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const query = `UPDATE Guides SET name = '${name}', designation = '${designation}', college = '${college}', phone = '${phone}', email = '${email}' WHERE guide_id = ${id};`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while updating the guide' });
            }
            res.status(200).json({ message: 'Guide updated successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while updating guide' });
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

app.post('/admins/add', verifyToken, async (req, res) => {
    try {
        const { name, email, password, role, access } = req.body;

        if (!name || !email || !password || !role || !access) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const query = `INSERT INTO Admins (name, email, password, role, access) VALUES ('${name}', '${email}', '${password}', '${role}', '${access}');`;
        // console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while adding the admin' });
            }
            // console.log(result);
            res.status(200).json({ message: 'Admin added successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding admin' });
    }
});

app.delete('/admins/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM Admins WHERE admin_id = ${id
            }`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while deleting the admin' });
            }
            res.status(200).json({ message: 'Admin deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while deleting admin' });
    }
});

app.put('/admins/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, role, access } = req.body;

        if (!name || !email || !password || !role || !access) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        // console.log(email);

        const query = `UPDATE Admins SET name = '${name}', email = '${email}', password = '${password}', role = '${role}', access = '${access}' WHERE admin_id = ${id};`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while updating the admin' });
            }
            res.status(200).json({ message: 'Admin updated successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while updating admin' });
    }
});

app.post('/accounts/add', verifyToken, async (req, res) => {
    try {
        const { StudentID, DDNumber, AmountPaid, DatePaid } = req.body;

        if (!StudentID || !DDNumber || !AmountPaid || !DatePaid) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const query = `INSERT INTO Account_Details (StudentID, DDNumber, AmountPaid, DatePaid) VALUES ('${StudentID}', '${DDNumber}', ${AmountPaid}, '${DatePaid}');`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while adding the account details' });
            }
            res.status(200).json({ message: 'Account details added successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding account details' });
    }
});

app.get('/accounts', verifyToken, async (req, res) => {
    try {
        // Limit to latest 50 records
        const query = `SELECT * FROM account_details ORDER BY DatePaid DESC LIMIT 50;`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json({ accounts: result });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching account details' });
    }
});

app.delete('/accounts/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM Account_Details WHERE StudentID = '${id}';`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while deleting the account details' });
            }

            res.status(200).json({ message: 'Account details deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while deleting account details' });
    }
});

app.get('/accounts/:student_id', verifyToken, async (req, res) => {
    try {
        const student_id = req.params.student_id;
        // const query = `SELECT * FROM account_details WHERE StudentID = '${student_id}';`;
        // Chronological order
        const query = `SELECT * FROM account_details WHERE StudentID = '${student_id}' ORDER BY DatePaid ASC;`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            // After getting account details, get the student records, where for each year he have to pay 2 terms of fee.
            // From the start of 6 months cycle, student can pay fee until 7th month, else if the student pay within 10 days after 7th month of cycle - fine of Rs. 500
            // If student pay between 10-20 days after 7th month of cycle - fine of Rs. 1000
            // If student pay after 20 days and below 30 days after 7th month of cycle - fine of Rs. 1500
            // If student pay after 30 days of 7th month of cycle - fine of 1/3 of fee(i.e., Rs. 20,000)
            // We should calculate the amount to be paid from date of admission, and then calculate the amount to be paid for each year after adding fines too.
            // Finally return the amount to be paid yet by the student, and the history of fines if present

            // Get student data
            const studentQuery = `SELECT * FROM students WHERE admn_no = '${student_id}'`;
            db.query(studentQuery, (err, studentResult) => {
                if (err) {
                    console.log(err);
                }
                const student = studentResult[0];
                // console.log(student);

                // Get the fines history of the student
                const feeHistory = [];
                // Totalt to be paid by the student
                let amountToBePaid = 0;

                const dateOfAdmission = new Date(student.doa);
                const today = new Date();
                const months = (today.getFullYear() - dateOfAdmission.getFullYear()) * 12 + (today.getMonth() - dateOfAdmission.getMonth());

                // Iterate for every term (6 months) from date of admission to today, then calculate the fine to be paid
                // Go through each year, and account recirds, if the record is not present in that period add fee to be paid+fine

                // Calculate the number of terms elapsed since admission
                const termsElapsed = Math.floor(months / 6);

                let j = 1;

                // Loop through each term and calculate the fee and fines
                for (let i = 0; i < termsElapsed; i++) {
                    // Calculate the fee for the term (assuming fixed fee amount)
                    const termFee = 20000; // For a fixed fee amount of Rs. 20000 per term

                    // Calculate the deadline for payment (7th month of the term)
                    const deadline = new Date(dateOfAdmission);
                    deadline.setMonth(deadline.getMonth() + (i + 1) * 6 + 1);
                    // console.log(dateOfAdmission.toLocaleDateString(), deadline.toLocaleDateString());
                    if (j < result.length && result[j].DatePaid < deadline) {
                        feeHistory.push({
                            term: i + 1,
                            fineAmount: 0,
                            deadline: deadline.toLocaleDateString(),
                            dayPaid: result[j].DatePaid.toLocaleDateString(),
                            daysLate: 0
                        });
                        j++;
                        continue;
                    }

                    // Calculate the fine amount based on the payment rules
                    let fine = 0;
                    let nextPaidDate;
                    let fineToBePaid = 0;
                    if (j < result.length) {
                        nextPaidDate = new Date(result[j].DatePaid);
                    } else {
                        nextPaidDate = new Date();
                    }
                    const daysLate = Math.max(0, Math.floor((nextPaidDate - deadline) / (1000 * 60 * 60 * 24)));

                    if (daysLate > 0) {
                        if (daysLate <= 10) {
                            fine = 500;
                        } else if (daysLate <= 20) {
                            fine = 1000;
                        } else if (daysLate <= 30) {
                            fine = 1500;
                        } else {
                            fine = Math.floor(termFee / 3); // 1/3 of the fee amount
                        }
                    }

                    if (j < result.length) {
                        if (fineToBePaid <= result[j].AmountPaid) {
                            fineToBePaid = 0;
                        }
                        else {
                            fineToBePaid = fineToBePaid - result[j].AmountPaid;
                        }
                    } else {
                        fineToBePaid = termFee + fine;
                    }

                    // Add the term fee and fine to the total amount to be paid
                    amountToBePaid += termFee + fine;

                    // If fine is greater than 0, add a fine record to the fines history
                    if (fine > 0) {
                        feeHistory.push({
                            term: i + 1,
                            fineAmount: fine,
                            deadline: deadline.toLocaleDateString(),
                            dayPaid: nextPaidDate.toLocaleDateString(),
                            daysLate: daysLate,
                            fineToBePaid
                        });
                    }
                    j++;
                }

                res.status(200).json({ account_details: result, student, dateOfAdmission: dateOfAdmission.toLocaleDateString(), amountToBePaid, feeHistory });
            });
            // res.status(200).json({ accounts: result });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching account details' });
    }
});

// Change Guides Requests
app.get('/guide_changes', verifyToken, async (req, res) => {
    try {
        const query = `SELECT * FROM guide_changes`;
        db.query(query, async (err, result) => {
            if (err) {
                console.log(err);
            }
            // Get old/new guide_id->guide name from guides table
            const guideChanges = [];
            for (const change of result) {
                const { student_id, old_guide_id, new_guide_id, date_of_change } = change;
                const oldGuideQuery = `SELECT name FROM guides WHERE guide_id = ${old_guide_id}`;
                const newGuideQuery = `SELECT name FROM guides WHERE guide_id = ${new_guide_id}`;

                const oldGuideResult = await new Promise((resolve, reject) => {
                    db.query(oldGuideQuery, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });

                const newGuideResult = await new Promise((resolve, reject) => {
                    db.query(newGuideQuery, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });

                guideChanges.push({
                    student_id,
                    old_guide_id: {
                        id: old_guide_id,
                        name: oldGuideResult[0].name
                    },
                    new_guide_id: {
                        id: new_guide_id,
                        name: newGuideResult[0].name
                    },
                    date_of_change
                });
            }

            res.status(200).json({ guide_changes: guideChanges });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching guide changes' });
    }
});

app.post('/guide_changes/add', verifyToken, async function (req, res) {
    try {
        const { student_id, new_guide_id, date_of_change } = req.body;

        // Get old_guide_id from students table
        const oldGuideQuery = `SELECT guide_id FROM students WHERE admn_no = '${student_id}'`;
        let old_guide_id = 0;
        db.query(oldGuideQuery, (err, oldGuideResult) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error occured while fetching the old guide' });
            }
            old_guide_id = oldGuideResult[0].guide_id;
            if (!student_id || !new_guide_id || !date_of_change) {
                return res.status(400).json({ message: 'Please fill all the fields' });
            }

            // Add new Guide change into table
            const addQuery = `INSERT INTO Guide_Changes (student_id, old_guide_id, new_guide_id, date_of_change) VALUES ('${student_id}', ${old_guide_id}, ${new_guide_id}, '${date_of_change}');`;
            // Update student table in guide_id
            const updateQuery = `UPDATE Students SET guide_id = ${new_guide_id} WHERE admn_no = '${student_id}';`;
            db.query(addQuery, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: 'Error occured while adding the guide change request' });
                }
                db.query(updateQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message: 'Error occured while updating the student guide' });
                    }
                    res.status(200).json({ message: 'Guide change request added successfully', guide_change: result.guide_change });
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while adding guide change request' });
    }
});

app.get('/guide_changes/:studentId', verifyToken, async (req, res) => {
    try {
        const studentId = req.params.studentId;
        // Sort from datein reverse chronological order
        // const query = `SELECT * FROM guide_changes WHERE student_id = '${studentId}'`;
        const query = `SELECT * FROM guide_changes WHERE student_id = '${studentId}' ORDER BY date_of_change DESC`;
        db.query(query, async (err, result) => {
            if (err) {
                console.log(err);
            }
            // res.status(200).json({ guide_changes: result });
            // Lookup the old and new guides id->guide name from guides table
            const guideChanges = [];
            for (const change of result) {
                const { student_id, old_guide_id, new_guide_id, date_of_change } = change;
                const oldGuideQuery = `SELECT name FROM guides WHERE guide_id = ${old_guide_id}`;
                const newGuideQuery = `SELECT name FROM guides WHERE guide_id = ${new_guide_id}`;

                const oldGuideResult = await new Promise((resolve, reject) => {
                    db.query(oldGuideQuery, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });

                const newGuideResult = await new Promise((resolve, reject) => {
                    db.query(newGuideQuery, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });

                guideChanges.push({
                    student_id,
                    old_guide_id: {
                        id: old_guide_id,
                        name: oldGuideResult[0].name
                    },
                    new_guide_id: {
                        id: new_guide_id,
                        name: newGuideResult[0].name
                    },
                    date_of_change
                });
            }
            res.status(200).json({ guide_changes: guideChanges });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while fetching guide changes' });
    }
});

app.listen(port, () => console.log(`PhD SMS app listening on port ${port}!`))