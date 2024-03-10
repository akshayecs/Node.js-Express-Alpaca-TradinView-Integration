const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt')

const handleUsersignUp = async(args) => {
    try {
        const { username, email, password, api_key, api_secret } = args.data;
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Hash the api_key
        const hashedAPIkey= await bcrypt.hash(api_key, 10);

        // Hash the secret_key
        const hashedAPISecret = await bcrypt.hash(api_secret, 10);
    
        // Create user in the database
        const user = new User({uuid:uuidv4(), Username:username, Email:email, Password: hashedPassword, ApiKey:hashedAPIkey, SecretKey:hashedAPISecret });
        const response = await user.save();
    
        return {
            status:200,
            message:'User Created Successfully',
            data:response
        }
        // res.status(200).send({message: 'User created successfully',data:response});
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Internal server error');
    }
     
}


const handleUserLogin = async(args) => {
    try {
        const { email, password } =args.data;
        // Find user by email
        const user = await User.findOne({ Email:email });
        // Check if user exists and verify password
        if (user && await bcrypt.compare(password, user.Password)) {
          return {
            status:200,
            message:'User Logged in Successfully',
          }
        } else {
            return {
                status:401,
                message:'Invalid email or password',
            }
        //   res.status(401).json({ message: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {
    handleUsersignUp,
    handleUserLogin
}