const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require( 'body-parser');
const app = express();
const multer = require('multer');

const port = 3001;
// Serve static files (e.g., CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

// Use body-parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: false }));
// Create a function to generate multer storage configuration
const createImageStorage = (folderPath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath); // Specify the destination folder
    },
    filename: (req, file, cb) => {
      const imageName = file.originalname;
      cb(null, imageName); // Keep the original name of the uploaded file
    },
  });
};

// Define storage for uploaded images
const upload = multer({ storage: createImageStorage('public/uploads') });
const aboutUpload = multer({ storage: createImageStorage('public/uploads/about-image') });
const ServiceUpload = multer({ storage: createImageStorage('public/uploads/gallery-img') });
const contactUpload = multer({ storage: createImageStorage('public/uploads/home-image') });
// MySQL database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'final',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the database');
});

// Modify your route to display data from different tables
app.get('/', (req, res) => {
  const sqlHome = 'SELECT * FROM home';
  const sqlAbout = 'SELECT * FROM about';
  const sqlcoffee = 'SELECT * FROM coffees';
  const sqlservice = 'SELECT * FROM services';
  const sqlpromo ='SELECT * FROM promo';
  const sqlteam ='SELECT * FROM team';
  const sqlfooter ='SELECT * FROM footer';
  const sqllogo = 'SELECT * FROM logo';
  
  // Use Promise.all to execute both queries concurrently
  db.query(sqllogo, (err, logoResult) => {
    if (err) {
      console.error('unable to execute home query:'+err.message);
      return;
    }

      db.query(sqlHome, (err, homeResult) => {
        if (err) {
          console.error('Unable to execute home query: ' + err.message);
          return;  
        }
    
      db.query(sqlAbout, (err, aboutResult) => {
        if (err) {
          console.error('Unable to execute about query: ' + err.message);
          return;
        }
   
      db.query(sqlcoffee, (err, coffeeResult) =>{
        if (err){
          console.error("unable to execute coffee query" + err.message);
         return;
        } 

        db.query(sqlservice, (err, serviceResult) => {
          if (err)  {
            console.error ("unable to execute service query " + err.message );
            return ;
          }
          db.query(sqlpromo, (err, promoResult) => {
            if (err)  {
              console.error ("unable to execute service query " + err.message );
              return ;
            }
            db.query(sqlteam, (err, teamResult) => {
              if (err)  {
                console.error ("unable to execute service query " + err.message );
                return ;
              }
              db.query(sqlfooter, (err, footerResult) => {
                if (err)  {
                  console.error ("unable to execute service query " + err.message );
                  return ;
                }
          
        res.render('index',{ home: homeResult, about: aboutResult, coffees: coffeeResult, services: serviceResult, promo: promoResult, team: teamResult, footer: footerResult, logo: logoResult })
                });
               });
             });
           });
         });
        });
      });
    });
  });
    app.get('/about', (req, res)=>{
      const sqlhabouthme =' SELECT * FROM about2';

      db.query(sqlhabouthme, (err, about2Result)=>{
        if(err) {
          console.error(`Error executing the SQL statement ` +err.message);
          return;
        }
        res.render('about', {about2: about2Result});
      });
    });

    app.get('/gallery', (req, res) =>{
      const sqlgallery = 'SELECT *FROM gallery';
      db.query(sqlgallery, (err, galleryResult) =>{
        if(err) {
          console.error('error executing the query' +err.message);
          return;
        }
        res.render('gallery',{gallery: galleryResult});
      });
    });
    app.get('/service', (req, res) =>{
      const sqlservice2 = 'SELECT *FROM service';
      db.query(sqlservice2, (err, service2Result) =>{
        if(err) {
          console.error('error executing the query' +err.message);
          return;
        }
        res.render('service',{service: service2Result});
      });
    });

    app.get('/contact', (req, res) =>{
      const sqlcontact = 'SELECT *FROM contact';
      db.query(sqlcontact, (err, contactResult) =>{
        if(err) {
          console.error('error executing the query' +err.message);
          return;
        }
        res.render('contact',{contact: contactResult});
      });
    });
    app.get('/login', (req, res) =>{
      const sqllog = ' SELECT * FROM users';

      db.query(sqllog, (err, logResult) =>{
        if(err){
          console.error('unable to get login' +err.message);
          return;
        }
        res.render('login',{users: logResult});
      })
    })

    app.get('/indexdash', (req, res) =>{
      const sqlindexdash = 'SELECT *FROM home';
      db.query(sqlindexdash, (err, indexdashResult) =>{
        if(err) {
          console.error('error executing the query' +err.message);
          return;
        }
        res.render('indexdash',{home: indexdashResult});
      });
    });



app.get('/dashboard', (req, res)  => {
  const sqllogo = 'SELECT *FROM logo';
  const sqlHome = 'SELECT * FROM home';
  const sqlAbout = 'SELECT * FROM about';
  const sqlcoffee = 'SELECT * FROM coffees';
  const sqlservice = 'SELECT * FROM  services';
  const sqlpromo = 'SELECT * FROM  promo';
  const sqlteam ='SELECT * FROM  team';
  const sqlfooter ='SELECT * FROM footer';
  const sqlabout2 ='SELECT * FROM about2';
  const sqlgallery ='SELECT * FROM gallery';
  const sqlservice2 ='SELECT * FROM service';
  const sqlcontact ='SELECT * FROM contact';

  // Use Promise.all to execute both queries concurrently
  db.query(sqllogo, (err, logoResult) =>{
    if (err){
      console.error('unable to execute logo query:' + err.message);
      return;
    }

      db.query(sqlHome, (err, homeResult) => {
        if (err) {
          console.error('Unable to execute home query: ' + err.message);
          return;
        } 
    

      db.query(sqlAbout, (err, aboutResult) => {
        if (err) {
          console.error('Unable to execute about query: ' + err.message);
          return;
        } 


      db.query(sqlcoffee, (err, coffeeResult)=>{
        if (err){
          console.error("unable to execute coffee query" + err.message);
          return;
        }   
        db.query(sqlservice, (err, serviceResult)=>{
          if (err ){
            console.log ('unable to execute service query' +err+message);
            return;
          }
          db.query(sqlpromo, (err, promoResult)=>{
            if (err ){
              console.log ('unable to execute service query' +err+message);
              return;
            }

            db.query(sqlteam, (err, teamResult)=>{
              if (err ){
                console.log ('unable to execute service query' +err+message);
                return;
              }
              db.query(sqlabout2, (err, about2Result)=>{
                if (err ){
                  console.log ('unable to execute service query' +err+message);
                  return;
                }
                db.query(sqlgallery, (err, galleryResult)=>{
                  if (err ){
                    console.log ('unable to execute service query' +err+message);
                    return;
                  }
                  db.query(sqlservice2, (err, service2Result)=>{
                    if (err ){
                      console.log ('unable to execute service query' +err+message);
                      return;
                    }
                    db.query(sqlcontact, (err, contactResult)=>{
                      if (err ){
                        console.log ('unable to execute service query' +err+message);
                        return;
                      }
                      db.query(sqlfooter, (err, footerResult)=>{
                        if (err ){
                          console.log ('unable to execute service query' +err+message);
                          return;
                        };
        res.render('dashboard', { home: homeResult, about: aboutResult, coffees: coffeeResult, services: serviceResult, promo: promoResult, team: teamResult, about2: about2Result, gallery: galleryResult, service: service2Result, contact: contactResult, footer: footerResult, logo: logoResult});
                        });
                     });
                   });
                  });
                });
              });
            });
         });
        }); 
       });
     });
   });
});
app.post('/add-homepage', upload.single('homeImage'), (req, res) => {
  const { title, description } = req.body;
  const homeImage = req.file.originalname;

  const query = 'INSERT INTO home (title, description, image) VALUES (?, ?, ?)';
  db.query(query, [title, description, homeImage], (err, result) => {
    if (err) {
      console.error('Error inserting content: ' + err.message);
      return;
    }
    res.redirect('/dashboard'); // Redirect to the dashboard page after insertion
  });
});
// Handle POST request to add data to the dashboard
app.post('/add-content',upload.single('aboutImage'), (req, res) => {
  // Retrieve data from the request body
  const { title, texts } = req.body;
  const aboutImage=  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlInsert = 'INSERT INTO about (title, texts, image) VALUES (?, ?, ?)';
  db.query(sqlInsert, [title, texts, aboutImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});
//coffees entry 
//logo structure 
app.post('/add-logo',upload.single('logoImage'), (req, res) => {
  // Retrieve data from the request body
  const { name } = req.body;
  const logoImage=  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlInsert = 'INSERT INTO logo ( name, image) VALUES (?, ?)';
  db.query(sqlInsert, [name, logoImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});
//end of it👌👌
app.post('/add-coffee',upload.single('coffeeImage'), (req, res) => {
  // Retrieve data from the request body
  const { name, cost } = req.body;
  const coffeeImage=  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlenter= 'INSERT INTO coffees (name, cost, imag) VALUES (?, ?, ?)';
  db.query(sqlenter, [name, cost, coffeeImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});
app.post('/add-service',upload.single('serviceImage'), (req, res) => {
  // Retrieve data from the request body
  const { title, subtitle, description } = req.body;
  const serviceImage =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlenter= 'INSERT INTO services (title, subtitle, description, image) VALUES (?, ?, ?, ?)';
  db.query(sqlenter, [title, subtitle, description, serviceImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-promo', (req, res) => {
  // Retrieve data from the request body
  const { title, subtitle, description } = req.body;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlpromo= 'INSERT INTO promo (title, subtitle, description) VALUES (?, ?, ?)';
  db.query(sqlpromo, [title, subtitle, description], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-member',upload.single('teamImage'), (req, res) => {
  // Retrieve data from the request body
  const { title, description, name, work } = req.body;
  const teamImage =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlmember= 'INSERT INTO team (title, description, name, work, image) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlmember, [title, description, name, work, teamImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-about',upload.single('about2Image'), (req, res) => {
  // Retrieve data from the request body
  const { welcome, description } = req.body;
  const about2Image =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlmember= 'INSERT INTO about2 (welcome, description, image) VALUES (?, ?, ?)';
  db.query(sqlmember, [welcome, description, about2Image], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-footer',upload.single('footerImage'), (req, res) => {
  // Retrieve data from the request body
  const {location, contact, email, about } = req.body;
  const footerImage =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlmember= 'INSERT INTO footer (location, contact, email, about, image) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlmember, [location, contact, email, about, footerImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');FF
  });
});

app.post('/add-about2',upload.single('about2Image'), (req, res) => {
  // Retrieve data from the request body
  const {welcome,description } = req.body;
  const about2Image =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlabout2= 'INSERT INTO about2 (welcome,description, image) VALUES (?, ?, ?)';
  db.query(sqlabout2, [welcome, description, about2Image], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-gallery',upload.single('galleryImage'), (req, res) => {
  // Retrieve data from the request body
  const {title, description } = req.body;
  const galleryImage =  req.file.originalname ;

  // Perform any necessary data validation and processing here

  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlgallery= 'INSERT INTO gallery (title, description, image) VALUES (?, ?, ?)';
  db.query(sqlgallery, [title, description, galleryImage], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});

app.post('/add-services2',upload.single('services2Image'), (req, res) => {
  // Retrieve data from the request body
  const {title, description } = req.body;
  const services2Image =  req.file.originalname ;
  // Perform any necessary data validation and processing here
  // Insert the data into the database (assuming you have a 'dashboard' table)
  const sqlservice2 = 'INSERT INTO service ( title, description, image) VALUES (?, ?, ?)';
  db.query(sqlservice2, [title, description, services2Image], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    } 
    // After successful insertion, redirect to the dashboard page
    res.redirect('/dashboard');
  });
});
app.post ('/add-user-admin',upload.single('userImage'), (req, res)=>{
  const {	firstname,	lastname,	email,	number,	passscode} = req.body;
const  userImage  =req.file.originalname;
  const sqllog = 'INSERT INTO users ( 	firstname,	lastname,	email,	number,	passscode,	image) VALUES (?, ?, ?, ?, ?, ?) ';

  db.query(sqllog, [	firstname,	lastname, 	email,	number,	passscode,	userImage] , (err, result)=>{
    if(err){
      console.error('ERROR INSERTING USER', +err.message);
      return;
    }
  })
})
// Route to handle updating homepage content
app.post('/update-homepage/:id', (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;

  const query = 'UPDATE home SET title = ?, description = ? WHERE id = ?';
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error('Error updating homepage content: ' + err.message);
      return;
    }
    res.redirect('/indexdash'); // Redirect to the dashboard page after updating
  });
});

// Route to handle deleting homepage content
app.post('/delete-homepage/:id', (req, res) => {
  const id = req.params.id;

  // Check if the _method field is set to DELETE
  if (req.body._method === 'DELETE') {
    const query = 'DELETE FROM home WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting homepage content: ' + err.message);
        return;
      }
      res.redirect('/indexdash'); // Redirect to the dashboard page after deletion
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  
});
