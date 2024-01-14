import express from "express";
import data from './data/MOCK.json' assert {type: "json"};

const app = express();

const PORT = 3000;

//--------- middleware ------
app.use(express.static("public"));
//----
app.use('/images', express.static('images'));
//---
//app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ---- ROUTES
// -- get
app.get('/', (req, res) => {
    res.json(data)
});

//--- POST express.json and urlencoded
app.post('/item', (req, res) => {
    console.log(req.body)
    res.send(req.body);
})

// -- get - download method
app.get('/dowload', (req, res) => {
    res.download("images/mountains_2.jpeg")
});

// -- get
app.get('/redirect', (req, res) => {
    res.redirect('http://www.linkedin.com')
});

// Route chaining --------
app
    .route('/class')
    .get((req, res) => {
    //res.send("retrieve class info")
    throw new Error();
})
    .post((req, res) => {
    res.send('this is a POST request at /class')
})
    .put((req, res) => {
    res.send('this is a PUT request at /class')
});

// GET with next()
app.get('/next', (req, res, next) => {
    console.log('response will be sent by next function');
    next();
}, (req, res) => {
    res.send('second callback')

});

// -- new GET with routing params
app.get('/class/:id', (req, res) => {
    //console.log(req.params)
    const studentId = Number(req.params.id);//number function to convert string to int

    const student = data.filter((student) => student.id === studentId)
    res.send(student);
});


//-- post
//app.post('/create', (req, res) => {
//    res.send('this is a POST request at /create')
//});

//-- put
//app.put('/edit', (req, res) => {
//    res.send('this is a PUT request at /edit')
//});

//--  delete
app.delete('/delete', (req, res) => {
    res.send('this is a DELETE request at /delete')
});


//........... error handling middleware ........
app.use((err, req, res, next) => {
    console.error(err.stack);//tracing where the error was
    res.status(500).send('something went wrong..');
})

app.listen(PORT, () => {
    console.log(`the server is listening on ${PORT}`)
    //console.log(data)
})