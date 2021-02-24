import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: true,
    isSalesteam:false,
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: false,
    isSalesteam:false,
  },
  {
    name: 'jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: false,
    isSalesteam:false,
  },
  {
    name: 'Ayush Dev',
    email: 'ayush@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: false,
    isSalesteam:false,
  },
]

export default users
  