const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {
    app.get('/api/admin', function (req, res) {
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM Account JOIN Trainer ON email = ?', [req.email], function (err, rows) {
                if (err) {
                    console.log("Error Selecting : %s ", err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(rows));
            });
        });
    });

    app.post('/api/admin/add', function (req, res) {
        let input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            let data = trainerInputHandler(input);
            console.log('save request...', data);
            connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            connection.query("INSERT INTO Admin set ?", [data.admin], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify('success'));
        });
    });

    app.get('/api/trainer/delete/:id', function (req, res) {
        let email = req.params.email;
        req.getConnection(function (err, connection) {
            connection.query("DELETE FROM Account WHERE email = ?", [email], function (err) {
                if (err) {
                    console.log("Error deleting : %s ", err);
                }
                res.redirect('/api/trainer');
            });
        });
    });

    app.get('/api/trainer/edit/:id', function (req, res) {
        let email = req.params.email;
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM Account JOIN Trainer ON email = ?', [email], function (err, rows) {
                if (err) {
                    console.log("Error Selecting : %s ", err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(rows));
            });
        });
    });

    app.post('/api/trainer/edit/:id', function (req, res) {
        let input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            let data = trainerInputHandler(input);
            console.log('save request...', data);
            i
            connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            connection.query("INSERT INTO Trainer set ?", [data.trainer], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        });
    });

    function trainerInputHandler(input) {
        return {
            account: {
                accountVars: accountInputHandler(input),
                accountType: "admin"
            },
            admin: {
                email: input.email
            },
            userAccountPhoneNumbers: {
                phoneNumbersInputHandler
            },
        };
    }

}; // end of module
