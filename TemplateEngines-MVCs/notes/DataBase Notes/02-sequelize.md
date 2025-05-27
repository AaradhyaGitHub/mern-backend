What is Sequelize?

3rd party package for object relational mapping. It's a library
It does heavy lifting sql work for us and maps it to jS objects with convinience methods
We don't have to write SQL

User object with name, age, email, password can be mapped into user table ith those attributes mapped

We get models, we get to define which data define models. Ex: User, Product
We can instanciate these Models. Ex: const user = User.build()
We can run queries. Ex: User.findAll()
We can associate: User.hasMany(Product)
