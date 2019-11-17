module.exports = function (app) {
    app.get('/customers', function (req, res) {
        req.getConnection(function (err, connection) {

            var query = connection.query('SELECT * FROM customer', function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);
                //console.log(rows);
                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(rows));
                //res.end(JSON.stringify(rows));

            });
            //console.log(query.sql);
        });
    });


    app.get('/customers/add', function (req, res) {

        var input = JSON.parse(JSON.stringify(req.body));

        req.getConnection(function (err, connection) {

            var data = {

                name: input.name,
                address: input.address,
                email: input.email,
                phone: input.mobile

            };
            console.log('save request...', data);

            var query = connection.query("INSERT INTO customer set ? ", data, function (err, rows) {

                if (err)
                    console.log("Error inserting : %s ", err);

                //res.redirect('/customers');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify('success'));

            });

            // console.log(query.sql); get raw query

        });
    });

    app.get('/customers/delete/:id', function (req, res) {

        var id = req.params.id;

        req.getConnection(function (err, connection) {

            connection.query("DELETE FROM customer  WHERE id = ? ", [id], function (err, rows) {

                if (err)
                    console.log("Error deleting : %s ", err);

                res.redirect('/customers');

            });

        });
    });


    app.get('/customers/edit/:id', function (req, res) {

        var id = req.params.id;

        req.getConnection(function (err, connection) {

            var query = connection.query('SELECT * FROM customer WHERE id = ?', [id], function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                // res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(rows));

            });

            //console.log(query.sql);
        });
    });

    app.post('/customers/edit/:id', function (req, res) {

        var input = JSON.parse(JSON.stringify(req.body));
        var id = req.params.id;

        req.getConnection(function (err, connection) {

            var data = {

                name: input.name,
                address: input.address,
                email: input.email,
                phone: input.phone

            };

            connection.query("UPDATE customer set ? WHERE id = ? ", [data, id], function (err, rows) {

                if (err)
                    console.log("Error Updating : %s ", err);

                res.redirect('/customers');

            });

        });
    });
};
