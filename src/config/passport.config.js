import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
import { createHash, validatePassword } from "../utils.js";
import UserModel from "../Dao/models/user.model.js"
import CartManagerDao from "../Dao/cartManagerDao.js"

const LocalStrategy = local.Strategy;
const cartManagerDao = new CartManagerDao;

const initializePassport = () => {
   passport.use('register', new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },

      async (req, userName, password, done) => {
         const { first_name, last_name, email, age, rol } = req.body;

         try {
            const user = await UserModel.findOne({ email: userName });

            if (user) {
               console.log('El usuario existe');
               return done(null, false);
            }
            const newUser = {
               first_name,
               last_name,
               email,
               age,
               password: createHash(password),
               rol: rol || "user"
            }

            const result = await UserModel.create(newUser);
            return done(null, result);

         } catch (error) {
            return done('Error al registrar el usuario' + error);
         }
      }
   ));

   passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
         const user = await UserModel.findOne({ email: username });
         const existCart = await cartManagerDao.getCartProdById(user.cartId);
         console.log(user);
         const uid = user._id;

         if (!user) {
            console.log('No existe el usuario');
            return done(null, false);
         }

         if (!validatePassword(password, user)) return done(null, false);

         if (!existCart) {
            const cart = await cartManagerDao.createCart();
            user.cartId = cart._id;
            await UserModel.updateOne({ _id: uid }, { $set: user });
         }

         return done(null, user);

      } catch (error) {
         return done('Error al loguear el usuario' + error);
      }
   }));

   passport.serializeUser((user, done) => {
      done(null, user._id);
   });

   passport.deserializeUser(async (id, done) => {
      const user = await UserModel.findById(id);
      done(null, user);
   });

   //  GitHub
   passport.use('github', new GitHubStrategy({
      clientID: 'Iv1.4d7db75525315792',
      clientSecret: '80d331783760103957142163739fb99df14370c5',
      callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
   }, async (accessTokn, refreshToken, profile, done) => {
      try {
         // console.log(profile); //Para ver la info que viene de github
         const user = await UserModel.findOne({ email: profile._json.email });

         if (!user) {
            // const email = profile._json.email == null ? profile._json.username : null;
            const newUser = {
               first_name: profile._json.name,
               last_name: '',
               email: profile._json.email,
               age: 18,
               password: '',
            }
            const result = await UserModel.create(newUser);
            done(null, result);
         } else {
            done(null, user);
         }
      } catch (error) {
         return done(null, error);
      }
   }))
}

export default initializePassport;