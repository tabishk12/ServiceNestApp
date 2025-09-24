import UserModel from '../models/user.model.js';
import generateToken from '../utils/generate-token.util.js';

/**
 * @desc		Auth user
 * @route		POST /api/v1/users/login
 * @access	public
 */
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

/**
 * @desc		Register user
 * @route		POST /api/v1/users
 * @access	public
 */
const registerUser = async (req, res) => {
  const { name , email , contact , location , image , password , confirmPassword } = req.body;

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    res.status(400); // BAD REQUEST (client error)
    throw new Error('User already exists');
  }

  const user = await UserModel.create({ name,email,contact,location,imageUrl:image, password,confirmPassword});

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      isAdmin: user.isAdmin,
    });
    console.log("User registered successfully:", user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

/**
 * @desc		Logout user
 * @route		POST /api/v1/users
 * @access	private
 */
const logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
};

/**
 * @desc		Get user profile
 * @route		GET /api/v1/users/profile
 * @access	private
 */
const getUserProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    res.status(200).json({user});
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

/**
 * @desc		Update user profile
 * @route		PUT /api/v1/users/profile
 * @access	private
 */
const updateUserProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.imageUrl = req.body.image || user.imageUrl;
    user.location = req.body.location || user.location;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

/**
 * @desc		Get all users
 * @route		GET /api/v1/users
 * @access	private/admin
 */
const getUsers = async (req, res) => {
  res.send('Get all users');
};

/**
 * @desc		Get user by ID
 * @route		GET /api/v1/users/:id
 * @access	private/admin
 */
const getUserById = async (req, res) => {
  res.send('Get user by ID');
};

/**
 * @desc		Update user
 * @route		PUT /api/v1/users/:id
 * @access	private/admin
 */
const updateUser = async (req, res) => {
  res.send('Update user');
};

/**
 * @desc		Delete user
 * @route		DELETE /api/v1/users/:id
 * @access	private/admin
 */
const deleteUser = async (req, res) => {
  res.send('Delete user');
};

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};
