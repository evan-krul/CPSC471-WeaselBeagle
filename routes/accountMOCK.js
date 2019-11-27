module.exports = function(app){

    app.post('/api/users/shelter_emp/authenticate', function(req, res){
      console.log(req.body);
        var user = JSON.parse(JSON.stringify(req.body));

        let body = {
            id: 1,
            email: user.email,
            firstName: "Evan",
            lastName: "Krul",
            password: user.password
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(body));

    });


    //other routes..
};
