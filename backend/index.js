const express = require('express');
const mongooss = require("mongoose");
const cors = require('cors');
const RegisterModel =require ('./models/Register')

const app = express();
app.use(cors());
app.use(express.json());

mongooss.connect('mongodb+srv://Sagar:%40Sagar%400531@cluster0.jwxnkib.mongodb.net/form', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/users', async (req, res) => {
    try {
      const users = await RegisterModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.post('/register' , (req, res) =>{
    const{ firstName,
    lastName,
    email,
    mobile,
    address1,
    address2,
    state,
    city,
    country,
    zipCode}= req.body ;
    RegisterModel.findOne({email: email})
    .then(user=> {
        if (user){
            res.json("allready have been registered")
        }else{
            RegisterModel.create({firstName: firstName, lastName: lastName, email: email, mobile: mobile, address1: address1, address2: address2 , state: state, city: city, country: country, zipCode:zipCode})
            .then(result => res.json("account created successfully"))
            .catch(err=> res.json(err))
        }
    }).catch(err=> res.json(err))
})

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await RegisterModel.deleteOne({ _id: userid });
    res.json("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/updateUser", async (req, res) => {
  const { userid, data } = req.body;
  try {
    await RegisterModel.updateOne({ _id: userid }, { $set: data });
    res.json("User updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(3001, () => {
    console.log("server listening")
}); 
